with open('src/components/cards/SolutionCard.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('const { solution } = Astro.props;', 'const { solution } = Astro.props;\nconst isEn = Astro.url.pathname.startsWith("/en");')
content = content.replace('>ENV // ARCH<', '>{isEn ? "ENV // ARCH" : "محیط // معماری"}<')
content = content.replace('>Explore Environment<', '>{isEn ? "Explore Environment" : "بررسی این محیط"}<')
content = content.replace('href={`/solutions/${solution.slug}`}', 'href={isEn ? `/en/solutions/${solution.slug}` : `/solutions/${solution.slug}`}')

with open('src/components/cards/SolutionCard.astro', 'w', encoding='utf-8') as f:
    f.write(content)
