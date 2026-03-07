# Nova Digital Agency Website - PRD

## Original Problem Statement
Full-stack website for a digital agency named "Nova" with a modern, professional design. Arabic-speaking user. White background with blue accents color scheme.

## Core Requirements
1. Hero Section with "ابتكار رقمي بلا حدود" title, CTAs, and 3D robot background
2. About Nova Section
3. Services Section with cards and starting prices
4. Pricing Table (3 tiers)
5. Nova Bot Section
6. Portfolio Section (dynamic, fetched from API)
7. Contact Form (saves to DB + email via Resend)
8. Animated Statistics Section (count-up on scroll)
9. Responsive Design (mobile-friendly)
10. Ramadan Theme (greeting banner + hanging decorations)
11. Admin Dashboard with visitor tracking & portfolio management

## Tech Stack
- Frontend: React, Tailwind CSS, Shadcn/UI, framer-motion, react-countup, react-router-dom
- Backend: FastAPI, MongoDB (motor), Pydantic, PyJWT, bcrypt
- Integrations: Resend (email), ip-api.com (geolocation)
- Deployment: Emergent Native (Kubernetes)

## What's Been Implemented
- Full website with all sections (Hero, About, Services, Pricing, Nova Bot, Portfolio, Contact, Footer)
- Contact form integrated with Resend email + MongoDB
- Animated number counters on Stats section
- Custom favicon with Nova logo
- Mobile menu navigation (fixed)
- Privacy Policy & Terms links in footer (placeholder)
- Ramadan greeting banner (auto-disappears after 1.5s, responsive)
- Ramadan decorations (hanging crescents, stars, lanterns)
- WhatsApp floating button
- **Admin Dashboard (Feb 2026)**:
  - Login page at /admin (somood@novaway.agency)
  - Automatic visitor tracking (IP, country, city, device, browser, OS, referrer, time)
  - Visitors tab with stats cards + table
  - Portfolio management (add/edit/delete projects)
  - Contacts viewer
  - JWT-based authentication
- Portfolio section now fetches from API (dynamic, manageable from dashboard)

## DB Schema
- contacts: {id, name, email, phone, service, message, created_at, status}
- visitors: {id, ip, country, city, device, browser, os, referrer, page, visited_at}
- portfolio: {id, title_ar, title_en, description_ar, description_en, image, category_ar, category_en, link, created_at}

## Architecture
```
/app/
├── backend/
│   ├── .env (RESEND_API_KEY, MONGO_URL, DB_NAME)
│   ├── requirements.txt
│   ├── server.py
│   └── tests/test_admin_dashboard.py
└── frontend/
    ├── .env (REACT_APP_BACKEND_URL)
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── App.js (React Router: /, /admin, /admin/dashboard)
        ├── index.css
        ├── context/LanguageContext.js
        ├── pages/
        │   ├── AdminLogin.js
        │   └── AdminDashboard.js
        └── components/
            ├── Navbar.js
            ├── HeroSection.js
            ├── AboutSection.js
            ├── ServicesSection.js
            ├── PricingSection.js
            ├── NovaBotSection.js
            ├── PortfolioSection.js (dynamic from API)
            ├── ContactSection.js
            ├── Footer.js
            ├── WhatsAppButton.js
            ├── RamadanGreeting.js
            ├── RamadanDecorations.js
            └── ui/ (Shadcn components)
```

## Admin Credentials
- Email: somood@novaway.agency
- Password: Somood@123
- URL: /admin

## API Endpoints
- POST /api/auth/login - Admin login
- POST /api/visitors/track - Track visitor (public)
- GET /api/admin/visitors - List visitors (protected)
- GET /api/admin/visitors/stats - Visitor stats (protected)
- GET /api/portfolio - List portfolio (public)
- POST /api/admin/portfolio - Create project (protected)
- PUT /api/admin/portfolio/{id} - Update project (protected)
- DELETE /api/admin/portfolio/{id} - Delete project (protected)
- GET /api/admin/contacts - List contacts (protected)
- POST /api/contact - Submit contact form (public)

## Backlog
- P1: Privacy Policy & Terms pages (currently placeholder links)
- P2: Domain linking (novaway.agency) - platform-level task
