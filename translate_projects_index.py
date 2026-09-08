import os

replacements = {
    'Category': 'دسته‌بندی',
    'Environment Archetype': 'نوع محیط و کاربری',
    'Integrated Disciplines:': 'سیستم‌های یکپارچه‌شده:',
    'Standardized Reference Models': 'مدل‌های مرجع استاندارد',
}

with open('src/pages/projects/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/projects/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)
