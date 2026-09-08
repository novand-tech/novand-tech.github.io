import re
with open('src/layouts/BaseLayout.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# find Astro.props assignment and add lang
if 'lang = ' not in content:
    content = content.replace('} = Astro.props;', '} = Astro.props;\nconst currentPath = Astro.url.pathname;\nconst lang = currentPath.startsWith("/en") ? "en" : "fa";\nconst dir = lang === "fa" ? "rtl" : "ltr";')

with open('src/layouts/BaseLayout.astro', 'w', encoding='utf-8') as f:
    f.write(content)
