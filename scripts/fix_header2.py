import re
with open('src/components/layout/Header.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
content = content.replace("{isEn ? 'Request {isEn ? \\'Consultation\\' : \\'مشاوره\\'}' : 'درخواست مشاوره'}", "{isEn ? 'Request Consultation' : 'درخواست مشاوره'}")

with open('src/components/layout/Header.astro', 'w', encoding='utf-8') as f:
    f.write(content)
