import re

with open('src/layouts/ServiceLayout.astro', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '>Core Technical Summary<': '>{isEn ? "Core Technical Summary" : "خلاصه فنی پایه"}<',
    '>System Details<': '>{isEn ? "System Details" : "جزئیات سیستم"}<',
    '>Primary Function<': '>{isEn ? "Primary Function" : "عملکرد اصلی"}<',
    '>Architecture Segment<': '>{isEn ? "Architecture Segment" : "بخش معماری"}<',
    '>Deployment Phase<': '>{isEn ? "Deployment Phase" : "فاز استقرار"}<',
    '>Engineering Constraints & Parameters<': '>{isEn ? "Engineering Constraints & Parameters" : "محدودیت‌ها و پارامترهای مهندسی"}<',
    '>Architectural Context & Scope<': '>{isEn ? "Architectural Context & Scope" : "گستره و بافت معماری"}<',
    '>Scope of Delivery<': '>{isEn ? "Scope of Delivery" : "محدوده تحویل"}<',
    '>What We Engineer & Deliver<': '>{isEn ? "What We Engineer & Deliver" : "آنچه طراحی و تحویل می‌دهیم"}<',
    '>Technical Depth<': '>{isEn ? "Technical Depth" : "عمق فنی"}<',
    '>Detailed Technical Capabilities<': '>{isEn ? "Detailed Technical Capabilities" : "قابلیت‌های فنی و جزئیات"}<',
    '>Implementation Focus Points:<': '>{isEn ? "Implementation Focus Points:" : "نقاط تمرکز پیاده‌سازی:"}<',
    '>Operational Environments<': '>{isEn ? "Operational Environments" : "محیط‌های عملیاتی"}<',
    '>Where This Service is Deployed<': '>{isEn ? "Where This Service is Deployed" : "محل استقرار این سرویس"}<',
    '>Target Facility<': '>{isEn ? "Target Facility" : "تاسیسات هدف"}<',
    '>Integrated Ecosystem<': '>{isEn ? "Integrated Ecosystem" : "اکوسیستم یکپارچه"}<',
    '>Complementary Disciplines<': '>{isEn ? "Complementary Disciplines" : "حوزه‌های تخصصی مکمل"}<',
    '>View Specifications<': '>{isEn ? "View Specifications" : "مشاهده مشخصات"}<',
    '>Browse All Services<': '>{isEn ? "Browse All Services" : "مشاهده همه خدمات"}<',
    '>Request a Consultation<': '>{isEn ? "Request a Consultation" : "درخواست مشاوره"}<'
}

for k, v in replacements.items():
    content = re.sub(r'>\s*' + re.escape(k[1:-1]) + r'\s*<', v, content)

with open('src/layouts/ServiceLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/layouts/SolutionLayout.astro', 'r', encoding='utf-8') as f:
    content2 = f.read()

replacements2 = {
    '>Request a Consultation for This Environment<': '>{isEn ? "Request a Consultation for This Environment" : "درخواست مشاوره برای این محیط"}<',
    '>Typical System Architecture ↓<': '>{isEn ? "Typical System Architecture ↓" : "معماری معمول سیستم ↓"}<',
    '>Architecture Profile:<': '>{isEn ? "Architecture Profile:" : "پروفایل معماری:"}<',
    '>Operating Demands & Requirements<': '>{isEn ? "Operating Demands & Requirements" : "نیازها و پیش‌نیازهای عملیاتی"}<',
    '>Design Tenets<': '>{isEn ? "Design Tenets" : "اصول طراحی"}<',
    '>Core Engineering Pillars<': '>{isEn ? "Core Engineering Pillars" : "ارکان پایه مهندسی"}<',
    '>System Composition<': '>{isEn ? "System Composition" : "ترکیب سیستم"}<',
    '>Typical Subsystem Deployments<': '>{isEn ? "Typical Subsystem Deployments" : "استقرار زیرسیستم‌های معمول"}<',
    '>Operational Problem Solving<': '>{isEn ? "Operational Problem Solving" : "حل مسائل عملیاتی"}<',
    '>Key Challenges Solved<': '>{isEn ? "Key Challenges Solved" : "چالش‌های کلیدی رفع‌شده"}<',
    '>Common Facility Hurdle:<': '>{isEn ? "Common Facility Hurdle:" : "موانع رایج تاسیساتی:"}<',
    '>Our Engineering Resolution:<': '>{isEn ? "Our Engineering Resolution:" : "راهکار مهندسی ما:"}<',
    '>Integrated Service Mapping<': '>{isEn ? "Integrated Service Mapping" : "نگاشت سرویس‌های یکپارچه"}<',
    '>Recommended Engineering Services<': '>{isEn ? "Recommended Engineering Services" : "سرویس‌های مهندسی پیشنهادی"}<',
    '>View Discipline<': '>{isEn ? "View Discipline" : "مشاهده این حوزه"}<',
    '>Browse All Solutions<': '>{isEn ? "Browse All Solutions" : "مشاهده تمام راهکارها"}<',
    '>Request a Consultation<': '>{isEn ? "Request a Consultation" : "درخواست مشاوره"}<'
}

for k, v in replacements2.items():
    content2 = re.sub(r'>\s*' + re.escape(k[1:-1]) + r'\s*<', v, content2)

with open('src/layouts/SolutionLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content2)

