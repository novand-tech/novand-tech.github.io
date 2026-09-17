import re
import glob

files = [
    'src/layouts/ServiceLayout.astro',
    'src/layouts/SolutionLayout.astro',
    'src/layouts/BaseLayout.astro',
    'src/components/ui/Breadcrumbs.astro'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'const isEn = Astro.url.pathname.startsWith' not in content:
        # insert at the top of the frontmatter
        parts = content.split('---', 2)
        if len(parts) >= 3:
            parts[1] = '\nconst isEn = Astro.url.pathname.startsWith("/en");\n' + parts[1]
            new_content = '---'.join(parts)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Added isEn to {filepath}")

