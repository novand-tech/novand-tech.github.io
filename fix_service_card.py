import re

with open('src/components/cards/ServiceCard.astro', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('service.whatWeProvide.slice', '(service.whatWeProvide || []).slice')
text = text.replace('service.features.slice', '(service.features || []).slice')

with open('src/components/cards/ServiceCard.astro', 'w', encoding='utf-8') as f:
    f.write(text)

