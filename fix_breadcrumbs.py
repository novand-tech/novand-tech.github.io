import re

with open('src/components/ui/Breadcrumbs.astro', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '{item.label}': '{!isEn && item.label === "Services" ? "خدمات" : (!isEn && item.label === "Solutions" ? "راهکارها" : (!isEn && item.label === "Projects" ? "پروژه‌ها" : (!isEn && item.label === "Brand" ? "هویت بصری" : item.label)))}'
}

for eng, per in replacements.items():
    content = content.replace(eng, per)

with open('src/components/ui/Breadcrumbs.astro', 'w', encoding='utf-8') as f:
    f.write(content)
