import re
def process_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'const isEn = Astro.url.pathname.startsWith("/en");' not in content:
        content = content.replace('---', '---\nconst isEn = Astro.url.pathname.startsWith("/en");', 2)
    for eng, per in replacements.items():
        if isinstance(eng, str):
            content = content.replace(eng, f"{{isEn ? '{eng}' : '{per}'}}")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

reps = {
    'Integrated Architecture': 'معماری یکپارچه',
    'Engineering Principle: Single-Source Accountability': 'اصل مهندسی: پاسخگویی متمرکز',
    'Eliminating vendor finger-pointing between cabling technicians, network administrators, and building automation contractors by delivering a unified physical and logical system architecture.': 'جلوگیری از شانه خالی کردن پیمانکاران مختلف از طریق ارائه یک معماری سیستم جامع و یکپارچه در لایه‌های فیزیکی و منطقی.',
    'Learn About Our Methodology &rarr;': 'آشنایی با متدولوژی ما &larr;',
    'Deterministic Convergence': 'همگرایی قطعی',
    'Audio, surveillance, HVAC control, and employee data coexisting on segmented network fabrics without packet collision.': 'صدا، تصویر، کنترل تهویه و داده‌های سازمانی در کنار هم روی شبکه‌های مجزا بدون تداخل.',
    'Field-Tested Reliability': 'قابلیت اطمینان میدانی',
    'Commercial-grade hardware specified for continuous duty cycles in demanding commercial, institutional, and residential facilities.': 'سخت‌افزارهای تجاری ویژه برای چرخه‌های کاری مداوم در محیط‌های پرتقاضای تجاری و مسکونی.',
}
process_file('src/components/sections/AboutPositioning.astro', reps)
