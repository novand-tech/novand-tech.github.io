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
    'View Equipment Advisory Services': 'مشاهده خدمات مشاوره تجهیزات',
    'Request an Advisory Call': 'درخواست تماس مشاوره‌ای',
    'Technical Due Diligence &rarr;': 'بررسی فنی &larr;',
}
process_file('src/components/sections/ConsultingTeaser.astro', reps)
