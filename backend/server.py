from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import resend
import jwt
import bcrypt
import httpx
import asyncio
import logging
import os

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# ================== Load Environment ==================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ================== MongoDB Connection ==================

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
visits_collection = db["visits"]

# ================== Email Config ==================

resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'somoodsalameen140@gmail.com')

# ================== JWT Config ==================

JWT_SECRET = os.environ.get('JWT_SECRET', 'nova-secret-key-2024-very-secure')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# ================== Admin Credentials ==================

ADMIN_EMAIL = "somood@novaway.agency"

# هاش كلمة السر Somood@123
ADMIN_PASSWORD_HASH = "$2b$12$uSrj2JvTA.tcJB1eUVA0zuvUbvXcF1a0Hc0/wCp82/w3VXrtnOg7m"

# ================== FastAPI Setup ==================

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ================== Models ==================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: str
    status: str

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    token: str
    email: str

class VisitorTrack(BaseModel):
    referrer: Optional[str] = None
    page: Optional[str] = "/"

class VisitorResponse(BaseModel):
    id: str
    ip: str
    country: Optional[str] = None
    city: Optional[str] = None
    device: Optional[str] = None
    browser: Optional[str] = None
    os: Optional[str] = None
    referrer: Optional[str] = None
    page: Optional[str] = None
    visited_at: str

class PortfolioCreate(BaseModel):
    title_ar: str
    title_en: str
    description_ar: str
    description_en: str
    image: str
    category_ar: Optional[str] = None
    category_en: Optional[str] = None
    link: Optional[str] = None

class PortfolioResponse(BaseModel):
    id: str
    title_ar: str
    title_en: str
    description_ar: str
    description_en: str
    image: str
    category_ar: Optional[str] = None
    category_en: Optional[str] = None
    link: Optional[str] = None
    created_at: str

# ================== Auth Helpers ==================

def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def parse_user_agent(ua: str) -> dict:
    browser = "Unknown"
    os_name = "Unknown"
    device = "Desktop"

    ua_lower = ua.lower()

    if "mobile" in ua_lower or "android" in ua_lower or "iphone" in ua_lower:
        device = "Mobile"
    elif "tablet" in ua_lower or "ipad" in ua_lower:
        device = "Tablet"

    if "chrome" in ua_lower and "edg" not in ua_lower:
        browser = "Chrome"
    elif "firefox" in ua_lower:
        browser = "Firefox"
    elif "safari" in ua_lower and "chrome" not in ua_lower:
        browser = "Safari"
    elif "edg" in ua_lower:
        browser = "Edge"
    elif "opera" in ua_lower or "opr" in ua_lower:
        browser = "Opera"

    return {"browser": browser, "os": os_name, "device": device}

# ================== Routes ==================

@api_router.get("/")
async def root():
    return {"message": "Nova API is running"}

# -------- AUTH --------

@api_router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    if request.email != ADMIN_EMAIL:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not bcrypt.checkpw(request.password.encode(), ADMIN_PASSWORD_HASH.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(request.email)
    return LoginResponse(token=token, email=request.email)

# -------- VISITORS --------

@api_router.post("/visitors/track")
async def track_visitor(body: VisitorTrack, request: Request):
    ip = request.headers.get("x-forwarded-for", request.headers.get("x-real-ip", request.client.host))
    if "," in ip:
        ip = ip.split(",")[0].strip()

    ua = request.headers.get("user-agent", "")
    ua_info = parse_user_agent(ua)

    country = None
    city = None

    try:
        async with httpx.AsyncClient(timeout=3) as http_client:
            geo = await http_client.get(f"http://ip-api.com/json/{ip}?fields=country,city")
            if geo.status_code == 200:
                data = geo.json()
                country = data.get("country")
                city = data.get("city")
    except Exception:
        pass

    visitor_doc = {
        "id": str(uuid.uuid4()),
        "ip": ip,
        "country": country,
        "city": city,
        "device": ua_info["device"],
        "browser": ua_info["browser"],
        "os": ua_info["os"],
        "referrer": body.referrer,
        "page": body.page,
        "visited_at": datetime.now(timezone.utc).isoformat()
    }

    await db.visitors.insert_one(visitor_doc)
    return {"status": "tracked"}

@api_router.get("/admin/visitors", response_model=List[VisitorResponse])
async def get_visitors(email: str = Depends(verify_token)):
    visitors = await db.visitors.find({}, {"_id": 0}).sort("visited_at", -1).to_list(500)
    return visitors

@api_router.get("/admin/visitors/stats")
async def get_visitor_stats(email: str = Depends(verify_token)):
    total = await db.visitors.count_documents({})
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    today = await db.visitors.count_documents({"visited_at": {"$gte": today_start}})

    pipeline = [{"$group": {"_id": "$device", "count": {"$sum": 1}}}]
    device_stats = await db.visitors.aggregate(pipeline).to_list(10)
    devices = {d["_id"]: d["count"] for d in device_stats if d["_id"]}

    pipeline = [{"$group": {"_id": "$country", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}, {"$limit": 10}]
    country_stats = await db.visitors.aggregate(pipeline).to_list(10)
    countries = {c["_id"] or "Unknown": c["count"] for c in country_stats}

    return {"total": total, "today": today, "devices": devices, "countries": countries}

# -------- PORTFOLIO --------

@api_router.get("/portfolio", response_model=List[PortfolioResponse])
async def get_portfolio():
    projects = await db.portfolio.find({}, {"_id": 0}).sort("created_at", -1).to_list(50)
    if not projects:
        defaults = [
            {
                "id": "default-1",
                "title_ar": "متجر الأناقة",
                "title_en": "Elegance Store",
                "description_ar": "متجر إلكتروني للأزياء والإكسسوارات",
                "description_en": "Fashion and accessories e-commerce store",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
                "category_ar": "متجر إلكتروني",
                "category_en": "E-commerce",
                "link": "#",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "default-2",
                "title_ar": "نظام إدارة العيادات",
                "title_en": "Clinic Management System",
                "description_ar": "نظام متكامل لإدارة المواعيد والمرضى",
                "description_en": "Complete system for appointments and patients",
                "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
                "category_ar": "نظام مخصص",
                "category_en": "Custom System",
                "link": "#",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        return defaults
    return projects

@api_router.post("/admin/portfolio", response_model=PortfolioResponse)
async def create_portfolio(project: PortfolioCreate, email: str = Depends(verify_token)):
    doc = {
        "id": str(uuid.uuid4()),
        **project.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.portfolio.insert_one(doc)
    return {k: v for k, v in doc.items() if k != "_id"}

@api_router.put("/admin/portfolio/{project_id}", response_model=PortfolioResponse)
async def update_portfolio(project_id: str, project: PortfolioCreate, email: str = Depends(verify_token)):
    result = await db.portfolio.find_one({"id": project_id}, {"_id": 0})
    if not result:
        raise HTTPException(status_code=404, detail="Project not found")
    update_data = project.model_dump()
    await db.portfolio.update_one({"id": project_id}, {"$set": update_data})
    updated = await db.portfolio.find_one({"id": project_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/portfolio/{project_id}")
async def delete_portfolio(project_id: str, email: str = Depends(verify_token)):
    result = await db.portfolio.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"status": "deleted"}

# -------- CONTACTS --------

@api_router.get("/admin/contacts", response_model=List[ContactResponse])
async def get_admin_contacts(email: str = Depends(verify_token)):
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return contacts

# -------- CONTACT FORM --------

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(request_body: ContactRequest):
    contact_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    contact_doc = {
        "id": contact_id,
        "name": request_body.name,
        "email": request_body.email,
        "phone": request_body.phone,
        "service": request_body.service,
        "message": request_body.message,
        "created_at": created_at,
        "status": "new"
    }
    await db.contacts.insert_one(contact_doc)
    logger.info(f"Contact saved to database: {contact_id}")

    try:
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
            <h2 style="color: #3B4961;">طلب جديد من موقع Nova</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
                <p><strong>الاسم:</strong> {request_body.name}</p>
                <p><strong>البريد الإلكتروني:</strong> {request_body.email}</p>
                <p><strong>الهاتف:</strong> {request_body.phone or 'غير محدد'}</p>
                <p><strong>الخدمة المطلوبة:</strong> {request_body.service or 'غير محدد'}</p>
                <p><strong>الرسالة:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px;">{request_body.message}</p>
            </div>
        </body>
        </html>
        """

        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "subject": f"طلب جديد من {request_body.name} - Nova",
            "html": html_content
        }

        email_result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully: {email_result.get('id')}")

    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")

    return ContactResponse(**{k: v for k, v in contact_doc.items() if k != '_id'})

# ================== Include Router ==================

app.include_router(api_router)

# ================== CORS ==================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================== Shutdown ==================

app.include_router(api_router)
app.add_middleware(...)


# ================== Visits API ==================
from fastapi import Request
from datetime import datetime

@app.post("/api/track-visit")
async def track_visit(request: Request):
    client_host = request.client.host
    user_agent = request.headers.get("user-agent", "")
    referer = request.headers.get("referer", "")

    visit = {
        "ip": client_host,
        "user_agent": user_agent,
        "source": referer,
        "time": datetime.utcnow()
    }

    await visits_collection.insert_one(visit)
    return {"status": "ok"}


@app.get("/api/visits")
async def get_visits():
    visits = []
    async for v in visits_collection.find().sort("time", -1):
        v["_id"] = str(v["_id"])
        visits.append(v)
    return visits
    
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
