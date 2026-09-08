with open('src/components/cards/ServiceCard.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('const { service, index } = Astro.props;', 'const { service, index } = Astro.props;\nconst isEn = Astro.url.pathname.startsWith("/en");')
content = content.replace('>Specifications & Scope<', '>{isEn ? "Specifications & Scope" : "مشخصات و محدوده"}<')
content = content.replace('href={`/services/${service.slug}`}', 'href={isEn ? `/en/services/${service.slug}` : `/services/${service.slug}`}')
content = content.replace('href={`/services/${service.slug}#capabilities`}', 'href={isEn ? `/en/services/${service.slug}#capabilities` : `/services/${service.slug}#capabilities`}')

with open('src/components/cards/ServiceCard.astro', 'w', encoding='utf-8') as f:
    f.write(content)
