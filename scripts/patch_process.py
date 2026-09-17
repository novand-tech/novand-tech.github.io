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
    'Delivery Methodology': 'متدولوژی اجرا',
    'A Disciplined Engineering Workflow': 'گردش کار مهندسی منضبط',
    'Reliable systems are never accidental. We execute every engagement through a structured four-stage methodology that enforces rigor from initial site survey through post-commissioning lifecycle management.': 'سیستم‌های پایدار تصادفی به وجود نمی‌آیند. ما هر پروژه را از طریق یک متدولوژی چهار مرحله‌ای ساختاریافته اجرا می‌کنیم که از ارزیابی اولیه سایت تا مدیریت پس از راه‌اندازی را در بر می‌گیرد.',
    'STAGE //': 'مرحله //',
    'Deliverables:': 'خروجی‌ها:',
}
process_file('src/components/sections/ProcessSection.astro', reps)
