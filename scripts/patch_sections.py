import re
import os

def process_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'const isEn = Astro.url.pathname.startsWith("/en");' not in content:
        content = content.replace('---', '---\nconst isEn = Astro.url.pathname.startsWith("/en");', 2)

    for eng, per in replacements.items():
        if isinstance(eng, str):
            content = content.replace(eng, f"{{isEn ? '{eng}' : '{per}'}}")
        else:
            # Handle regex
            pass
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

replacements_hero = {
    '01 // Architectural Engineering': '01 // مهندسی معماری',
    'Request Consultation': 'درخواست مشاوره',
    'Explore Services': 'بررسی خدمات',
    'Portfolios &rarr;': 'پورتفولیو &larr;',
    'Deterministic Cabling': 'کابل‌کشی پایدار',
    'Zero': 'صفر',
    'Cloud Lock-In': 'وابستگی ابری',
    'Open': 'باز',
    'Standard Buses': 'گذرگاه‌های استاندارد',
    'PHYSICAL LAYER // RACK-01': 'لایه فیزیکی // RACK-01',
    'SPECIFICATION STANDARDS': 'استانداردهای مشخصات',
    'STATUS: OPERATIONAL': 'وضعیت: عملیاتی',
}
process_file('src/components/sections/Hero.astro', replacements_hero)

replacements_whyus = {
    'Engineering Principles': 'اصول مهندسی',
    'Why Organizations Partner with Novand': 'چرا سازمان‌ها با نوند کار می‌کنند',
    'We do not make generic marketing promises. We deliver quantifiable engineering value based on standards adherence, architectural discipline, and vendor-neutral equipment selection.': 'ما به جای وعده‌های توخالی، ارزش مهندسی واقعی بر پایه استانداردها و بدون وابستگی به برند خاصی ارائه می‌دهیم.',
    'Vendor-Neutral Architecture': 'معماری مستقل از برند',
    'We specify hardware and protocols based strictly on reliability, documentation quality, MTBF ratings, and lifetime total cost of ownership—never on sales quotas or exclusive vendor kickbacks.': 'ما سخت‌افزار را صرفا براساس قابلیت اطمینان، کیفیت، طول عمر و هزینه مالکیت انتخاب می‌کنیم، نه حاشیه سود فروش.',
    'VERIFICATION': 'تاییدیه',
    'Documentation & Handover': 'مستندات و تحویل',
    'Every completed installation includes comprehensive as-built schematics, labeled port matrices, and root credential escrow runbooks.': 'در انتهای کار، مستندات کامل شامل نقشه‌های از-بیلت، جدول پورت‌ها و گذرواژه‌های اصلی به صورت امن تحویل می‌گردد.',
}
process_file('src/components/sections/WhyUsSection.astro', replacements_whyus)

