import os

replacements = {
    'Overview': 'مروری بر برند',
    'Anatomy': 'ساختار',
    'Logos & Lockups': 'نشان‌واره‌ها و ترکیب‌بندی‌ها',
    'Asset Matrix': 'ماتریس دارایی‌ها',
    'Color Spectrum': 'طیف رنگی',
    'Color Matrix': 'ماتریس رنگ‌ها',
    'Color Tokens': 'متغیرهای رنگی',
    'Typefaces & Hierarchy': 'تایپ‌فیس‌ها و سلسله مراتب',
    'Usage Standards': 'استانداردهای استفاده',
    'Typography': 'تایپوگرافی',
    'Typography & Structure': 'تایپوگرافی و ساختار',
    'Rules & Sizing': 'قوانین و اندازه‌ها',
    'Technical Specs & Coordinates': 'مشخصات فنی و مختصات',
    'The Architectural Gable & Envelope': 'سقف معماری و پوشش',
    'The Quad Window Array': 'آرایه چهارپنجره‌ای',
    '45° Converged Circuit Traces': 'مسیرهای مداری همگرا با زاویه ۴۵ درجه',
    'Terminal Node Endpoints': 'نقطه‌های پایانی گره (Terminal)',
    'Clearspace Exclusion Zone (X = 0.5H)': 'منطقه حریم امن (X = 0.5H)',
    'Minimum Perimeter': 'حداقل پیرامون',
    'Digital Minimum Sizing': 'حداقل اندازه دیجیتال',
    'Print & Fabrication Minimums': 'حداقل‌های چاپ و ساخت',
    'Standalone Monomark': 'مونو-مارک مستقل',
    'Centered Stacked Lockup': 'ترکیب‌بندی مرکزی چیده شده روی هم',
    'Primary Stroke:': 'ضخامت خط اصلی:',
    'Terminals:': 'پایانه‌ها:',
    'Trace Conduits:': 'مجراهای مسیر:',
    'Master Monomark (Vector)': 'مونو-مارک اصلی (وکتور)',
    'Vector Mark': 'نشان وکتور',
    'Stacked Centered · Light': 'ترکیب مرکزی · روشن',
    'Stacked Centered · Dark': 'ترکیب مرکزی · تیره',
    'Logos & Lockups': 'نشان‌واره‌ها و ترکیب‌ها',
    'Monochrome Black · Etch': 'تک‌رنگ مشکی · حکاکی',
    'Monochrome White': 'تک‌رنگ سفید',
    'Light Chassis Badge': 'بج شاسی روشن',
    'Obsidian Chassis Badge': 'بج شاسی ابسیدین (تیره)',
    'CAD Vector Schematic · 1080x1080 Grid': 'شماتیک وکتور CAD · شبکه ۱۰۸۰×۱۰۸۰',
    'Social OpenGraph Banner (EN)': 'بنر شبکه‌های اجتماعی (انگلیسی)',
    'Mobile & Story Banner (EN)': 'بنر موبایل و استوری (انگلیسی)',
    'System Monospace': 'فونت هم‌عرض سیستمی (Monospace)',
    'Code & Numbers': 'کد و اعداد',
    'Latin Primary & Titles': 'فونت لاتین اصلی و عناوین',
    'Persian Primary & Identity': 'فونت اصلی فارسی و هویت برند',
    'Dual Language': 'دوزبانه',
    'Bold / Regular': 'ضخیم / معمولی',
    'Display Sample': 'نمونه نمایشی',
    'Tabular Numbers': 'اعداد جدولی',
    'Character Set': 'مجموعه کاراکترها',
    'Telemetry Sample': 'نمونه داده‌سنجی (Telemetry)',
    'Physical Infrastructure & Dynamic Traces': 'زیرساخت فیزیکی و مسیرهای دینامیک',
    'Status Healthy': 'وضعیت: سالم',
    'Routing Emerald': 'مسیریابی: زمردی',
    'Signal Active': 'سیگنال: فعال',
    'Signal Cyan': 'سیگنال: فیروزه‌ای',
    'Obsidian Dark': 'تیره ابسیدین',
    'Canvas Primary': 'پس‌زمینه اصلی',
    'Carbon Surface': 'سطح کربنی',
    'Surface & Cards': 'سطوح و کارت‌ها',
    'Architectural Off-White': 'سفید معماری',
    'Wireframe Slate': 'خاکستری وایرفریم',
    'Borders & Grid': 'حاشیه‌ها و گرید',
    'Cyan-Emerald Bus': 'گذرگاه فیروزه‌ای-زمردی'
}

with open('src/pages/brand.astro', 'r', encoding='utf-8') as f:
    content = f.read()

for eng, per in replacements.items():
    content = content.replace(f'>{eng}<', f'>{per}<')
    content = content.replace(f'{eng}', f'{per}') # For unbracketed ones

with open('src/pages/brand.astro', 'w', encoding='utf-8') as f:
    f.write(content)
