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
    'Architectural Case Models': 'مدل‌های معماری',
    'Representative Engineering Archetypes': 'الگوهای مهندسی شاخص',
    'Detailed technical blueprints illustrating how integrated networking, physical security, environmental controls, and virtualization operate in production facilities.': 'طرح‌های فنی دقیق که نشان می‌دهد چگونه شبکه‌بندی یکپارچه، امنیت فیزیکی، کنترل‌های محیطی و مجازی‌سازی در تاسیسات تولیدی عمل می‌کنند.',
    'Explore All Project Models &rarr;': 'بررسی تمام مدل‌های پروژه &larr;',
    'EDITORIAL REFERENCE:': 'مرجع:',
    'Case models below represent standardized engineering deployments and serve as functional templates for client facility planning.': 'مدل‌های زیر نشان‌دهنده استقرار مهندسی استاندارد بوده و به عنوان الگوهای کاربردی برای برنامه‌ریزی تاسیسات مشتریان عمل می‌کنند.',
}
process_file('src/components/sections/ProjectsSection.astro', reps)
