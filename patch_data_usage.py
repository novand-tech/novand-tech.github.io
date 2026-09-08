import os, re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    orig_content = content

    # Replace static imports with getter imports
    content = re.sub(r'import\s+\{\s*companyData\s*\}\s+from\s+[\'"](.*?)data/company[\'"];', r'import { getCompanyData } from "\1data/company";', content)
    content = re.sub(r'import\s+\{\s*servicesData\s*\}\s+from\s+[\'"](.*?)data/services[\'"];', r'import { getServicesData } from "\1data/services";', content)
    content = re.sub(r'import\s+\{\s*solutionsData\s*\}\s+from\s+[\'"](.*?)data/solutions[\'"];', r'import { getSolutionsData } from "\1data/solutions";', content)
    content = re.sub(r'import\s+\{\s*projectsData\s*\}\s+from\s+[\'"](.*?)data/projects[\'"];', r'import { getProjectsData } from "\1data/projects";', content)
    content = re.sub(r'import\s+\{\s*consultingServices(?:,\s*consultingHero)?\s*\}\s+from\s+[\'"](.*?)data/consulting[\'"];', r'import { getConsultingData } from "\1data/consulting";', content)

    # Inject data calls
    if 'getCompanyData' in content:
        if 'const companyData =' not in content:
            content = content.replace('---', '---\nconst companyData = getCompanyData(Astro.url.pathname);', 2)
            content = content.replace('---\nconst companyData = getCompanyData(Astro.url.pathname);\n---', '---\n---\nconst companyData = getCompanyData(Astro.url.pathname);') # fix duplicate

    if 'getServicesData' in content:
        if 'const servicesData =' not in content:
            content = re.sub(r'---', '---\nconst servicesData = getServicesData(Astro.url.pathname);', content, count=2)
            content = content.replace('---\nconst servicesData = getServicesData(Astro.url.pathname);\n---', '---\n---\nconst servicesData = getServicesData(Astro.url.pathname);')

    if 'getSolutionsData' in content:
        if 'const solutionsData =' not in content:
            content = re.sub(r'---', '---\nconst solutionsData = getSolutionsData(Astro.url.pathname);', content, count=2)

    if 'getProjectsData' in content:
        if 'const projectsData =' not in content:
            content = re.sub(r'---', '---\nconst projectsData = getProjectsData(Astro.url.pathname);', content, count=2)

    if 'getConsultingData' in content:
        if 'const consultingServices =' not in content:
            content = re.sub(r'---', '---\nconst { consultingServices, consultingHero } = getConsultingData(Astro.url.pathname);', content, count=2)

    # Clean up any bad insertions where `---` logic failed
    # Actually, a safer way to inject is right before the last `---` of the frontmatter.
    if orig_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith('.astro'):
            process_file(os.path.join(root, f))
