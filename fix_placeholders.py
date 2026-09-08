replacements = {
    'e.g. Alex Morgan, PE': 'مثلاً علی کریمی، مهندس شبکه',
    'e.g. Meridian Logistics Center': 'مثلاً مرکز داده پارس',
    'amorgan@facility.example.com': 'info@example.com',
    '+1 (555) 000-0000': '۰۲۱-۱۲۳۴۵۶۷۸',
}
with open('src/pages/contact.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/contact.astro', 'w', encoding='utf-8') as f:
    f.write(content)
