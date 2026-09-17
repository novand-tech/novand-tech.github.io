import re

with open('src/layouts/ServiceLayout.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Request a Technical Consultation', '{isEn ? "Request a Technical Consultation" : "درخواست مشاوره فنی"}')
content = content.replace('View Detailed Capabilities ↓', '{isEn ? "View Detailed Capabilities ↓" : "مشاهده قابلیت‌های دقیق ↓"}')

with open('src/layouts/ServiceLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content)

