import re

urls = [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', # corporate network
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', # smart campus
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', # hospital security
    'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80', # industrial virtualization
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', # luxury residence
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'  # retail multi-site
]

with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Just replace them sequentially
for url in urls:
    content = re.sub(r'featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31\?auto=format&fit=crop&w=1200&q=80"', f'featuredImage: "{url}"', content, count=1)

for url in urls:
    content = re.sub(r'featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31\?auto=format&fit=crop&w=1200&q=80"', f'featuredImage: "{url}"', content, count=1)

with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(content)

