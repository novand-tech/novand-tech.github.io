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
    'Direct Technical Engagement': 'تعامل فنی مستقیم',
    'Have a Technology Project in Mind?': 'پروژه فناوری در ذهن دارید؟',
    'Speak directly with engineering practitioners about your upcoming cabling, networking, security, automation, or server infrastructure requirements. We provide straightforward feasibility assessments and structured design guidance.': 'مستقیماً با کارشناسان مهندسی درباره نیازهای شبکه‌بندی، امنیت، اتوماسیون یا زیرساخت سرور خود صحبت کنید. ما ارزیابی‌های امکان‌سنجی شفاف و راهنمایی‌های طراحی ساختاریافته ارائه می‌دهیم.',
    'Request a Consultation': 'درخواست مشاوره',
    'Contact Engineering Team': 'تماس با تیم مهندسی',
    'Direct Inquiries:': 'سوالات مستقیم:',
    '&bull; Operations:': '&bull; عملیات:',
}
process_file('src/components/sections/CtaSection.astro', reps)
