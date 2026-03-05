# Nova Digital Agency - PRD

## Original Problem Statement
بناء موقع وكالة رقمية Nova متكامل (Frontend + Backend) مع:
- تصميم داكن احترافي (#21242D خلفية، #CBCCC8/#A6A39D نصوص، #3B4961 عناصر تفاعلية)
- دعم RTL للغة العربية مع خيار الإنجليزية
- نموذج تواصل مع إرسال بريد إلكتروني وحفظ بقاعدة البيانات

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Shadcn/UI
- **Backend**: FastAPI + MongoDB + Resend Email
- **Database**: MongoDB (contacts collection)

## User Personas
1. **أصحاب الأعمال الصغيرة** - يبحثون عن حلول رقمية بأسعار معقولة
2. **الشركات الناشئة** - تحتاج مواقع وأنظمة مخصصة
3. **المحترفون** - يريدون مواقع بورتفوليو احترافية

## Core Requirements (Static)
- ✅ Hero Section مع صورة روبوت وCTA
- ✅ قسم من نحن مع إحصائيات
- ✅ القيم الجوهرية (الابتكار، الإبداع، التركيز على العميل)
- ✅ الخدمات مع الأسعار (6 خدمات)
- ✅ قسم Nova Bot
- ✅ فريق العمل (صمود السلامين)
- ✅ معرض الأعمال (3 مشاريع)
- ✅ نموذج التواصل مع إشعار بريد إلكتروني
- ✅ زر واتساب عائم
- ✅ تبديل اللغة (عربي/إنجليزي)

## What's Been Implemented (March 5, 2026)
- [x] Full responsive website with all sections
- [x] Arabic RTL support with language toggle
- [x] Contact form with Resend email integration
- [x] MongoDB storage for contact submissions
- [x] WhatsApp floating button
- [x] Smooth scroll navigation
- [x] Animations with Framer Motion
- [x] Dark theme with specified color palette

## API Endpoints
- GET /api/ - Health check
- GET /api/services - List services
- GET /api/team - Team members
- GET /api/projects - Portfolio projects
- POST /api/contact - Submit contact form
- GET /api/contacts - List all contacts

## Prioritized Backlog

### P0 (Critical) - DONE
- ✅ All core sections implemented
- ✅ Contact form working

### P1 (Important)
- [ ] Admin dashboard for managing contacts
- [ ] Real Nova Bot AI integration
- [ ] Multi-language content management

### P2 (Nice to have)
- [ ] Blog section
- [ ] Testimonials section
- [ ] Live chat widget
- [ ] SEO optimization

## Next Tasks
1. تحديث رقم الواتساب الحقيقي
2. إضافة مشاريع حقيقية للمعرض
3. إنشاء لوحة تحكم لإدارة الطلبات
4. تكامل Nova Bot مع AI حقيقي
