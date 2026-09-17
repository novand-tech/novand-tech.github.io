import re

service_urls = {
    'smart-homes-buildings': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    'network-infrastructure': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'enterprise-services': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'infrastructure-administration': 'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80',
    'security-surveillance': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    'audio-power': 'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80' # reuse or change later
}

solution_urls = {
    'residential': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'business': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'education': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    'healthcare-hospitality': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    'specialized-facilities': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
}

# Update services
with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for slug, url in service_urls.items():
    content = re.sub(rf'slug:\s*"{slug}",\n', f'slug: "{slug}",\n    heroImage: "{url}",\n', content)

with open('src/data/services.ts', 'w', encoding='utf-8') as f:
    f.write(content)

# Update solutions
with open('src/data/solutions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for slug, url in solution_urls.items():
    content = re.sub(rf'slug:\s*"{slug}",\n', f'slug: "{slug}",\n    heroImage: "{url}",\n', content)

with open('src/data/solutions.ts', 'w', encoding='utf-8') as f:
    f.write(content)

