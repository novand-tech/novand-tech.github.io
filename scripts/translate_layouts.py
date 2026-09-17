import os

replacements_services = {
    "label: 'Services', href: '/services'": "label: isEn ? 'Services' : 'خدمات', href: isEn ? '/en/services' : '/services'",
    '>Core Technical Summary<': '>{isEn ? "Core Technical Summary" : "خلاصه فنی پایه"}<',
    '>System Details<': '>{isEn ? "System Details" : "جزئیات سیستم"}<',
    '>Primary Function<': '>{isEn ? "Primary Function" : "عملکرد اصلی"}<',
    '>Architecture Segment<': '>{isEn ? "Architecture Segment" : "بخش معماری"}<',
    '>Deployment Phase<': '>{isEn ? "Deployment Phase" : "فاز استقرار"}<',
    '>Engineering Constraints & Parameters<': '>{isEn ? "Engineering Constraints & Parameters" : "محدودیت‌ها و پارامترهای مهندسی"}<',
    '>Architectural Context & Scope<': '>{isEn ? "Architectural Context & Scope" : "گستره و بافت معماری"}<',
    '>Scope of Delivery<': '>{isEn ? "Scope of Delivery" : "محدوده تحویل"}<',
    '>What We Engineer & Deliver<': '>{isEn ? "What We Engineer & Deliver" : "آنچه طراحی و تحویل می‌دهیم"}<',
    'Specific deliverables and installations included in our {service.title.toLowerCase()} practice.': '{isEn ? `Specific deliverables and installations included in our ${service.title.toLowerCase()} practice.` : `خروجی‌ها و استقرار دقیق در حوزه ${service.title}.`}',
    'SPEC // ': '{isEn ? "SPEC // " : "مشخصه // "}',
    '>Technical Depth<': '>{isEn ? "Technical Depth" : "عمق فنی"}<',
    '>Detailed Technical Capabilities<': '>{isEn ? "Detailed Technical Capabilities" : "قابلیت‌های فنی و جزئیات"}<',
    'MODULE 0': '{isEn ? "MODULE" : "ماژول"} 0',
    '>Implementation Focus Points:<': '>{isEn ? "Implementation Focus Points:" : "نقاط تمرکز پیاده‌سازی:"}<',
    '>Operational Environments<': '>{isEn ? "Operational Environments" : "محیط‌های عملیاتی"}<',
    '>Where This Service is Deployed<': '>{isEn ? "Where This Service is Deployed" : "محل استقرار این سرویس"}<',
    '>Target Facility<': '>{isEn ? "Target Facility" : "تاسیسات هدف"}<',
    '>Integrated Ecosystem<': '>{isEn ? "Integrated Ecosystem" : "اکوسیستم یکپارچه"}<',
    '>Complementary Disciplines<': '>{isEn ? "Complementary Disciplines" : "حوزه‌های تخصصی مکمل"}<',
    '>View Specifications<': '>{isEn ? "View Specifications" : "مشاهده مشخصات"}<',
    'Discuss Your {service.title} Requirements': '{isEn ? `Discuss Your ${service.title} Requirements` : `گفتگو درباره نیازهای ${service.title}`}',
    'Our technical team can review your building schematics, existing equipment closets, and bandwidth requirements to establish an accurate scope of work.': '{isEn ? "Our technical team can review your building schematics, existing equipment closets, and bandwidth requirements to establish an accurate scope of work." : "تیم فنی ما می‌تواند با بررسی نقشه‌های ساختمان، رک‌های موجود و نیازمندی‌های پهنای باند، یک برآورد دقیق از کار ارائه دهد."}',
    '>Request a Consultation<': '>{isEn ? "Request a Consultation" : "درخواست مشاوره"}<',
    '>Browse All Services<': '>{isEn ? "Browse All Services" : "مشاهده همه خدمات"}<'
}

replacements_solutions = {
    "label: 'Solutions', href: '/solutions'": "label: isEn ? 'Solutions' : 'راهکارها', href: isEn ? '/en/solutions' : '/solutions'",
    '>Request a Consultation for This Environment<': '>{isEn ? "Request a Consultation for This Environment" : "درخواست مشاوره برای این محیط"}<',
    '>Typical System Architecture ↓<': '>{isEn ? "Typical System Architecture ↓" : "معماری معمول سیستم ↓"}<',
    '>Architecture Profile:<': '>{isEn ? "Architecture Profile:" : "پروفایل معماری:"}<',
    '// Verified Physical Standards': '{isEn ? "// Verified Physical Standards" : "// استانداردهای فیزیکی تایید شده"}',
    '>Operating Demands & Requirements<': '>{isEn ? "Operating Demands & Requirements" : "نیازها و پیش‌نیازهای عملیاتی"}<',
    '>Design Tenets<': '>{isEn ? "Design Tenets" : "اصول طراحی"}<',
    '>Core Engineering Pillars<': '>{isEn ? "Core Engineering Pillars" : "ارکان پایه مهندسی"}<',
    'PILLAR 0': '{isEn ? "PILLAR" : "رکن"} 0',
    '>System Composition<': '>{isEn ? "System Composition" : "ترکیب سیستم"}<',
    '>Typical Subsystem Deployments<': '>{isEn ? "Typical Subsystem Deployments" : "استقرار زیرسیستم‌های معمول"}<',
    '>Operational Problem Solving<': '>{isEn ? "Operational Problem Solving" : "حل مسائل عملیاتی"}<',
    '>Key Challenges Solved<': '>{isEn ? "Key Challenges Solved" : "چالش‌های کلیدی رفع‌شده"}<',
    '>Common Facility Hurdle:<': '>{isEn ? "Common Facility Hurdle:" : "موانع رایج تاسیساتی:"}<',
    '>Our Engineering Resolution:<': '>{isEn ? "Our Engineering Resolution:" : "راهکار مهندسی ما:"}<',
    '>Integrated Service Mapping<': '>{isEn ? "Integrated Service Mapping" : "نگاشت سرویس‌های یکپارچه"}<',
    '>Recommended Engineering Services<': '>{isEn ? "Recommended Engineering Services" : "سرویس‌های مهندسی پیشنهادی"}<',
    '>View Discipline<': '>{isEn ? "View Discipline" : "مشاهده این حوزه"}<',
    'Planning Infrastructure for a {solution.title} Facility?': '{isEn ? `Planning Infrastructure for a ${solution.title} Facility?` : `برنامه‌ریزی زیرساخت برای تاسیسات ${solution.title}؟`}',
    'Let our engineers assist with site surveys, structured cabling blueprints, and equipment recommendations.': '{isEn ? "Let our engineers assist with site surveys, structured cabling blueprints, and equipment recommendations." : "اجازه دهید مهندسان ما در بازدید از سایت، نقشه‌های کابل‌کشی ساخت‌یافته و پیشنهاد تجهیزات به شما کمک کنند."}',
    '>Browse All Solutions<': '>{isEn ? "Browse All Solutions" : "مشاهده تمام راهکارها"}<',
    '>Request a Consultation<': '>{isEn ? "Request a Consultation" : "درخواست مشاوره"}<'
}

with open('src/layouts/ServiceLayout.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements_services.items():
    content = content.replace(eng, per)
    
with open('src/layouts/ServiceLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content)
    

with open('src/layouts/SolutionLayout.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements_solutions.items():
    content = content.replace(eng, per)
    
with open('src/layouts/SolutionLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content)
