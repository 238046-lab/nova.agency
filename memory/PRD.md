# Nova Digital Agency Website - PRD

## Original Problem Statement
Full-stack website for a digital agency named "Nova" with a modern, professional design. Arabic-speaking user. White background with blue accents color scheme.

## Core Requirements
1. Hero Section with "ابتكار رقمي بلا حدود" title, CTAs, and 3D robot background
2. About Nova Section
3. Services Section with cards and starting prices
4. Pricing Table (3 tiers)
5. Nova Bot Section
6. Portfolio Section
7. Contact Form (saves to DB + email via Resend to novvaway@gmail.com)
8. Animated Statistics Section (count-up on scroll)
9. Responsive Design (mobile-friendly)
10. Ramadan Theme (greeting banner + hanging decorations)

## Tech Stack
- Frontend: React, Tailwind CSS, Shadcn/UI, framer-motion, react-countup
- Backend: FastAPI, MongoDB (motor), Pydantic
- Integrations: Resend (email)
- Deployment: Emergent Native (Kubernetes)

## What's Been Implemented
- Full website with all sections (Hero, About, Services, Pricing, Nova Bot, Portfolio, Contact, Footer)
- Contact form integrated with Resend email + MongoDB
- Animated number counters on Stats section
- Custom favicon with Nova logo
- Mobile menu navigation (fixed)
- Privacy Policy & Terms links in footer (placeholder)
- Ramadan greeting banner (top banner)
- Ramadan decorations (hanging crescents, stars, lanterns) - COMPLETED Feb 2026
- WhatsApp floating button

## DB Schema
- contacts: {name, email, phone, service, message, submission_date}

## Architecture
```
/app/
├── backend/
│   ├── .env (RESEND_API_KEY, MONGO_URL, DB_NAME)
│   ├── requirements.txt
│   └── server.py
└── frontend/
    ├── .env (REACT_APP_BACKEND_URL)
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── App.js
        ├── index.css
        ├── context/LanguageContext.js
        └── components/
            ├── Navbar.js
            ├── HeroSection.js
            ├── AboutSection.js
            ├── ServicesSection.js
            ├── PricingSection.js
            ├── NovaBotSection.js
            ├── PortfolioSection.js
            ├── ContactSection.js
            ├── Footer.js
            ├── WhatsAppButton.js
            ├── RamadanGreeting.js
            ├── RamadanDecorations.js
            └── ui/ (Shadcn components)
```

## Backlog
- P1: Privacy Policy & Terms pages (currently placeholder links)
- P2: Domain linking (novaway.agency) - platform-level task
