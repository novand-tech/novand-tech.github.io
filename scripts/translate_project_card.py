with open('src/components/cards/ProjectCard.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('const { project, index } = Astro.props;', 'const { project, index } = Astro.props;\nconst isEn = Astro.url.pathname.startsWith("/en");')
content = content.replace('>Environment:<', '>{isEn ? "Environment:" : "محیط:"}<')
content = content.replace('>Review Case Model<', '>{isEn ? "Review Case Model" : "بررسی نمونه پروپوزال"}<')
content = content.replace('href={`/projects/${project.slug}`}', 'href={isEn ? `/en/projects/${project.slug}` : `/projects/${project.slug}`}')

with open('src/components/cards/ProjectCard.astro', 'w', encoding='utf-8') as f:
    f.write(content)
