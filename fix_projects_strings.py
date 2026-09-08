import re

with open('src/pages/projects/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '01 // The Engineering Challenge': '{isEn ? "01 // The Engineering Challenge" : "۰۱ // چالش مهندسی"}',
    '02 // The Implemented Architecture': '{isEn ? "02 // The Implemented Architecture" : "۰۲ // معماری پیاده‌سازی شده"}',
    '03 // The Verified Outcome': '{isEn ? "03 // The Verified Outcome" : "۰۳ // نتیجه تایید شده"}',
    'Architecture Summary': '{isEn ? "Architecture Summary" : "خلاصه معماری"}',
    'Verified Technologies & Standards:': '{isEn ? "Verified Technologies & Standards:" : "تکنولوژی‌ها و استانداردهای تایید شده:"}',
    'Ready to Plan an Infrastructure Deployment?': '{isEn ? "Ready to Plan an Infrastructure Deployment?" : "آماده برنامه‌ریزی برای استقرار زیرساخت هستید؟"}',
    'Review our engineering runbooks and get an architectural bill of materials tailored to your building or facility.': '{isEn ? "Review our engineering runbooks and get an architectural bill of materials tailored to your building or facility." : "مستندات مهندسی ما را بررسی کنید و لیست تجهیزات معماری متناسب با ساختمان یا تاسیسات خود را دریافت کنید."}',
    'Explore Equipment Advisory': '{isEn ? "Explore Equipment Advisory" : "بررسی مشاوره تجهیزات"}',
    'Request a Consultation': '{isEn ? "Request a Consultation" : "درخواست مشاوره"}',
}

for eng, per in replacements.items():
    content = content.replace(eng, per)

with open('src/pages/projects/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)
