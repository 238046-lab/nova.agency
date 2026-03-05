from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'somoodsalameen140@gmail.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define Models
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

class ServiceItem(BaseModel):
    id: str
    name_ar: str
    name_en: str
    description_ar: str
    description_en: str
    price: str
    icon: str

class TeamMember(BaseModel):
    id: str
    name_ar: str
    name_en: str
    role_ar: str
    role_en: str
    image: str

class ProjectItem(BaseModel):
    id: str
    title_ar: str
    title_en: str
    description_ar: str
    description_en: str
    image: str
    link: Optional[str] = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "Nova API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    """Submit contact form and send email notification"""
    contact_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    # Prepare document for MongoDB
    contact_doc = {
        "id": contact_id,
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "service": request.service,
        "message": request.message,
        "created_at": created_at,
        "status": "new"
    }
    
    # Save to MongoDB
    await db.contacts.insert_one(contact_doc)
    logger.info(f"Contact saved to database: {contact_id}")
    
    # Send email notification
    try:
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
            <h2 style="color: #3B4961;">طلب جديد من موقع Nova</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
                <p><strong>الاسم:</strong> {request.name}</p>
                <p><strong>البريد الإلكتروني:</strong> {request.email}</p>
                <p><strong>الهاتف:</strong> {request.phone or 'غير محدد'}</p>
                <p><strong>الخدمة المطلوبة:</strong> {request.service or 'غير محدد'}</p>
                <p><strong>الرسالة:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px;">{request.message}</p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
                تم إرسال هذه الرسالة تلقائياً من موقع Nova
            </p>
        </body>
        </html>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "subject": f"طلب جديد من {request.name} - Nova",
            "html": html_content
        }
        
        email_result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully: {email_result.get('id')}")
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Don't fail the request if email fails, contact is already saved
    
    return ContactResponse(**{k: v for k, v in contact_doc.items() if k != '_id'})

@api_router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts():
    """Get all contact submissions"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

@api_router.get("/services", response_model=List[ServiceItem])
async def get_services():
    """Get all services"""
    services = [
        {
            "id": "1",
            "name_ar": "مواقع البورتفوليو",
            "name_en": "Portfolio Websites",
            "description_ar": "مواقع شخصية احترافية لعرض أعمالك ومهاراتك بأسلوب عصري وجذاب",
            "description_en": "Professional personal websites to showcase your work and skills",
            "price": "$350",
            "icon": "Briefcase"
        },
        {
            "id": "2",
            "name_ar": "المتاجر الإلكترونية",
            "name_en": "E-commerce Stores",
            "description_ar": "متاجر إلكترونية متكاملة مع نظام دفع آمن وإدارة مخزون",
            "description_en": "Complete online stores with secure payment and inventory management",
            "price": "$400",
            "icon": "ShoppingCart"
        },
        {
            "id": "3",
            "name_ar": "الأنظمة المخصصة",
            "name_en": "Custom Systems",
            "description_ar": "أنظمة برمجية مخصصة لإدارة أعمالك بكفاءة عالية",
            "description_en": "Custom software systems to manage your business efficiently",
            "price": "$1000",
            "icon": "Settings"
        },
        {
            "id": "4",
            "name_ar": "أتمتة وذكاء اصطناعي",
            "name_en": "AI & Automation",
            "description_ar": "حلول ذكية لأتمتة العمليات وتحسين الإنتاجية",
            "description_en": "Smart solutions to automate processes and improve productivity",
            "price": "+$200",
            "icon": "Bot"
        },
        {
            "id": "5",
            "name_ar": "الهوية البصرية",
            "name_en": "Visual Identity",
            "description_ar": "تصميم هوية بصرية كاملة تعكس قيم علامتك التجارية",
            "description_en": "Complete visual identity design reflecting your brand values",
            "price": "مخصص",
            "icon": "Palette"
        },
        {
            "id": "6",
            "name_ar": "إدارة التواصل الاجتماعي",
            "name_en": "Social Media Management",
            "description_ar": "إدارة حساباتك على منصات التواصل الاجتماعي باحترافية",
            "description_en": "Professional management of your social media accounts",
            "price": "مخصص",
            "icon": "Share2"
        }
    ]
    return services

@api_router.get("/team", response_model=List[TeamMember])
async def get_team():
    """Get team members"""
    team = [
        {
            "id": "1",
            "name_ar": "صمود السلامين",
            "name_en": "Sumood Salameen",
            "role_ar": "المديرة التنفيذية ومطورة البرمجيات",
            "role_en": "CEO & Software Developer",
            "image": "https://img.freepik.com/free-vector/hijab-woman-character_603843-1099.jpg"
        }
    ]
    return team

@api_router.get("/projects", response_model=List[ProjectItem])
async def get_projects():
    """Get portfolio projects"""
    projects = [
        {
            "id": "1",
            "title_ar": "موقع البروفيسور جرادات",
            "title_en": "Prof. Jaradat Website",
            "description_ar": "موقع أكاديمي شخصي مع نظام إدارة المحتوى",
            "description_en": "Personal academic website with CMS",
            "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
            "link": "#"
        },
        {
            "id": "2",
            "title_ar": "متجر الأناقة",
            "title_en": "Elegance Store",
            "description_ar": "متجر إلكتروني للأزياء والإكسسوارات",
            "description_en": "Fashion and accessories e-commerce store",
            "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
            "link": "#"
        },
        {
            "id": "3",
            "title_ar": "نظام إدارة العيادات",
            "title_en": "Clinic Management System",
            "description_ar": "نظام متكامل لإدارة المواعيد والمرضى",
            "description_en": "Complete system for appointments and patients",
            "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
            "link": "#"
        }
    ]
    return projects

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
