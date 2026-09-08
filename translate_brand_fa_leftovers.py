import os

replacements = {
    'Borders &amp; Grid': 'حاشیه‌ها و گرید',
    'CAD Vector Schematic · 1080×1080 Grid': 'شماتیک وکتور CAD · شبکه 1080x1080',
    'Code &amp; Numbers': 'کد و اعداد',
    'Latin Primary &amp; Titles': 'فونت لاتین اصلی و عناوین',
    'Logos &amp; Lockups': 'نشان‌واره‌ها و ترکیب‌بندی‌ها',
    'Mobile &amp; Story Banner (EN)': 'بنر موبایل و استوری (انگلیسی)',
    'Persian Primary &amp; Identity': 'فونت اصلی فارسی و هویت برند',
    'Physical Infrastructure &amp; Dynamic Traces': 'زیرساخت فیزیکی و مسیرهای دینامیک',
    'Print &amp; Fabrication Minimums': 'حداقل‌های چاپ و ساخت',
    'Rules &amp; Sizing': 'قوانین و اندازه‌ها',
    'Surface &amp; Cards': 'سطوح و کارت‌ها',
    'Technical Specs &amp; Coordinates': 'مشخصات فنی و مختصات',
    'The Architectural Gable &amp; Envelope': 'سقف معماری و پوشش',
    'Typefaces &amp; Hierarchy': 'تایپ‌فیس‌ها و سلسله مراتب',
    'تایپوگرافی &amp; Structure': 'تایپوگرافی و ساختار',
    'نشانواره افقی · Dark': 'نشانواره افقی · تیره',
    'نشانواره افقی · Light': 'نشانواره افقی · روشن',
}

with open('src/pages/brand.astro', 'r', encoding='utf-8') as f:
    content = f.read()

for eng, per in replacements.items():
    content = content.replace(f'>{eng}<', f'>{per}<')
    content = content.replace(f'{eng}', f'{per}') # For unbracketed ones

with open('src/pages/brand.astro', 'w', encoding='utf-8') as f:
    f.write(content)
