import re

with open('src/layouts/SolutionLayout.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('title={`${solution.title} Solutions | Novand`}', 'title={`${solution.title} ${isEn ? "Solutions" : "راهکارها"} | Novand`}')
content = content.replace('Facility Environment', '{isEn ? "Facility Environment" : "محیط تاسیسات"}')

with open('src/layouts/SolutionLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/layouts/ServiceLayout.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('title={`${service.title} | Services | Novand`}', 'title={`${service.title} | ${isEn ? "Services" : "خدمات"} | Novand`}')

with open('src/layouts/ServiceLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content)
