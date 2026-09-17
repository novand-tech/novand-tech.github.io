with open('astro.config.mjs', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'export default defineConfig({',
    "export default defineConfig({\n  site: 'https://novand-tech.github.io',"
)

with open('astro.config.mjs', 'w', encoding='utf-8') as f:
    f.write(content)
