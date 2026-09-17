with open('src/components/layout/Header.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('absolute left-0', 'absolute left-0 rtl:right-0 rtl:left-auto')

with open('src/components/layout/Header.astro', 'w', encoding='utf-8') as f:
    f.write(content)
