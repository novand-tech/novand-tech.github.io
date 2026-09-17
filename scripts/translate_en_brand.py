import os

replacements = {
    'نسخه فارسی': 'Persian Version',
    'لوگو افقی نُوَند فارسی': 'Novand Horizontal Persian Logo',
    'فارسی RTL': 'Persian RTL',
    'لوگوتایپ افقی فارسی · نُوَند': 'Persian Horizontal Logotype · Novand',
    'ترکیب نشان رسمی و تایپوگرافی وزیرمتن به همراه شعار «راهکارهای یکپارچه فناوری و مهندسی زیرساخت» ویژه سربرگ‌ها و مکاتبات رسمی.': 'Combination of the official emblem and Vazirmatn typography with the slogan "Integrated Technology & Infrastructure Engineering Solutions" for letterheads and official correspondence.',
    'لوگو رسمی دارای نام نُوَند': 'Official Logo with Novand Name',
    'نشان با عنوان': 'Emblem with Title',
    'نشان رسمی دارای عنوان · نُوَند': 'Official Emblem with Title · Novand',
    'نشان مربعی با حاشیه فنی به همراه نام «نُوَند» و عبارت «راهکارهای یکپارچه فناوری و مهندسی زیرساخت» ویژه معرفی برند در شبکه‌های اجتماعی.': 'Square emblem with technical border along with the name "Novand" and the phrase "Integrated Technology & Infrastructure Engineering Solutions" for social media.',
    'بنر لینکدین و شبکه اجتماعی نُوَند': 'Novand LinkedIn & Social Media Banner',
    'بنر فارسی': 'Persian Banner',
    'بنر شبکه‌های اجتماعی فارسی (RTL)': 'Persian Social Media Banner (RTL)',
    'بنر افقی ۱۲۰۰×۶۳۰ راست‌چین با خط وزیرمتن، شامل حوزه‌های هوشمندسازی، فیبر نوری، سرور، امنیت فیزیکی و تأمین تجهیزات IT.': 'RTL 1200x630 horizontal banner covering smart automation, fiber optics, servers, physical security, and IT equipment procurement.',
    'قالب استوری اینستاگرام نُوَند': 'Novand Instagram Story Template',
    'استوری فارسی': 'Persian Story',
    'قالب عمودی و استوری فارسی': 'Persian Vertical & Story Template',
    'طراحی عمودی ۹:۱۶ با چیدمان دقیق نشان مرکزی، عنوان فارسی و معرفی جامع خوشه‌های تخصصی هوشمندسازی، فیبر نوری، سرور و تأسیسات.': '9:16 vertical design with central emblem, Persian title, and comprehensive introduction of smart automation, fiber optics, server, and facility clusters.',
    'نمونه عنوان رسمی': 'Official Title Sample',
    'نُوَند': 'Novand',
    'راهکارهای یکپارچه فناوری و مهندسی زیرساخت': 'Integrated Technology & Infrastructure Engineering Solutions',
    'حروف الفبا': 'Alphabet',
    '۰۱۲۳۴۵۶۷۸۹ · هوشمندسازی تأسیسات': '0123456789 · Facility Automation',
}

with open('src/pages/en/brand.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/en/brand.astro', 'w', encoding='utf-8') as f:
    f.write(content)
