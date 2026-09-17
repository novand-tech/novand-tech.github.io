import re

with open('src/pages/services/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'SYS // 01': 'سیستم // ۰۱',
    'SYS // 02': 'سیستم // ۰۲',
    'SYS // 03': 'سیستم // ۰۳',
    'SYS // 04': 'سیستم // ۰۴',
    'SYS // 05': 'سیستم // ۰۵',
    'SYS // 06': 'سیستم // ۰۶',
    'SYS // 07': 'سیستم // ۰۷',
    'Ready to Scope a Multi-حوزه تخصصی System?': 'آماده بررسی یک سیستم چندتخصصی هستید؟',
    'Engineering Standards Across All حوزه تخصصیs': 'استانداردهای مهندسی در تمامی حوزه‌های تخصصی'
}

for eng, per in replacements.items():
    content = content.replace(eng, per)

with open('src/pages/services/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)
