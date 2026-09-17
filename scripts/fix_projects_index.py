import re

with open('src/pages/projects/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'Project Reference Models & Archetypes | Novand': 'مدل‌های مرجع پروژه و الگوهای مهندسی | نُوَند',
    'Explore our architectural case models and engineering deployment archetypes across enterprise networking, smart building automation, physical security, and virtualized servers.': 'بررسی مدل‌های معماری و الگوهای استقرار مهندسی در حوزه‌های شبکه‌های سازمانی، اتوماسیون ساختمان‌های هوشمند، امنیت فیزیکی و سرورهای مجازی.',
    "label: 'Projects & Case Models'": "label: isEn ? 'Projects & Case Models' : 'پروژه‌ها و نمونه‌ها'",
    'Engineering Reference Registry': 'سیستم ثبت مرجع مهندسی',
    'Architectural Case Models & Deployment Blueprints': 'مدل‌های نمونه معماری و طرح‌های استقرار',
    'Rather than publishing promotional marketing summaries with NDA-encumbered client names, we present fully detailed engineering case models. Each profile outlines the physical challenge, the implemented subsystem topology, and the verified results.': 'به‌جای انتشار خلاصه‌های تبلیغاتی با نام مشتریان (به دلیل محرمانگی قراردادها)، ما مدل‌های دقیق مهندسی را ارائه می‌دهیم. هر پروفایل شامل چالش فیزیکی، توپولوژی زیرسیستم پیاده‌سازی شده و نتایج تاییدشده است.',
    'The four case profiles below reflect standard architectural implementations engineered by our practice. They serve as verified technical templates for client scoping and feasibility planning.': 'پروفایل‌های مورد زیر، استقرارهای استاندارد معماری مهندسی‌شده توسط تیم ما را نشان می‌دهند. این موارد به‌عنوان قالب‌های فنی تاییدشده برای تعیین محدوده پروژه و برنامه‌ریزی مشتریان استفاده می‌شوند.'
}

for eng, per in replacements.items():
    content = content.replace(f'>{eng}<', f'>{per}<')
    content = content.replace(f'"{eng}"', f'"{per}"')
    content = content.replace(f"'{eng}'", f"'{per}'")
    content = content.replace(eng, per)

content = content.replace('const projectsData = getProjectsData(Astro.url.pathname);', 'const isEn = Astro.url.pathname.startsWith("/en");\nconst projectsData = getProjectsData(Astro.url.pathname);')

with open('src/pages/projects/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)
