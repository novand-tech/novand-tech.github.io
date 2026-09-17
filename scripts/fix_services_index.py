import re

with open('src/pages/services/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'Integrated Engineering Services | Novand': 'خدمات یکپارچه مهندسی | نُوَند',
    'Explore our core engineering services: smart home automation, passive & active networking, enterprise IT and VoIP, systems administration & virtualization, physical security, audio systems, and hardware maintenance.': 'کاوش در خدمات پایه مهندسی ما: اتوماسیون خانه‌های هوشمند، شبکه‌های پسیو و اکتیو، IT سازمانی و VoIP، مدیریت سیستم‌ها و مجازی‌سازی، امنیت فیزیکی، سیستم‌های صوتی و پشتیبانی سخت‌افزار.',
    "label: 'Services'": "label: isEn ? 'Services' : 'خدمات'",
    'Integrated Practice Catalog': 'فهرست خدمات یکپارچه',
    'Technology Systems Engineered to Operate as One': 'سیستم‌های فناوری مهندسی‌شده برای عملکرد یکپارچه',
    'We maintain deep in-house engineering expertise across seven core physical and logical domains. Rather than hiring multiple disparate contractors, our clients receive a unified, standards-compliant technology infrastructure.': 'ما در هفت حوزه کلیدی فیزیکی و منطقی دارای تخصص عمیق مهندسی درون‌سازمانی هستیم. مشتریان ما به‌جای استخدام چندین پیمانکار پراکنده، یک زیرساخت فناوری یکپارچه و منطبق بر استاندارد دریافت می‌کنند.',
    'Engineering Standards Across All Disciplines': 'استانداردهای مهندسی در تمامی حوزه‌های تخصصی',
    'Every installation is bound to industry specifications and verified with dedicated test instrumentation before client handover.': 'هر استقرار و نصب، مقید به مشخصات صنعتی بوده و پیش از تحویل به مشتری با تجهیزات تست تخصصی اعتبارسنجی می‌شود.',
    'Verification Baseline': 'مبنای اعتبارسنجی',
    'Bandwidth calculators, FoV plotters, door safety sensors': 'محاسبه‌گر پهنای‌باند، ترسیم‌گرهای میدان دید (FoV)، سنسورهای ایمنی درها',
    'Ready to Scope a Multi-Discipline System?': 'آماده بررسی یک سیستم چندتخصصی هستید؟',
    'Speak directly with engineering staff to review architectural drawings and establish requirements.': 'برای بررسی نقشه‌های معماری و تعیین نیازمندی‌ها، مستقیماً با تیم مهندسی گفتگو کنید.',
    'Request a Consultation': 'درخواست مشاوره',
    'SYS // 01': 'سیستم // ۰۱',
    'SYS // 02': 'سیستم // ۰۲',
    'SYS // 03': 'سیستم // ۰۳',
    'SYS // 04': 'سیستم // ۰۴',
    'SYS // 05': 'سیستم // ۰۵',
    'SYS // 06': 'سیستم // ۰۶',
    'SYS // 07': 'سیستم // ۰۷'
}

for eng, per in replacements.items():
    content = content.replace(f'>{eng}<', f'>{per}<')
    content = content.replace(f'"{eng}"', f'"{per}"')
    content = content.replace(f"'{eng}'", f"'{per}'")
    content = content.replace(eng, per)

with open('src/pages/services/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)
