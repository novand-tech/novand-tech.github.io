import os, re

def fix_imports(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it's in /en/ (depth 3), we add one ../
    # src/pages/en/index.astro -> needs to change '../layouts' to '../../layouts'
    # Wait, let's just do a regex replace for the known paths:
    # '../components' -> '../../components'
    # '../layouts' -> '../../layouts'
    # '../data' -> '../../data'
    # '../../components' -> '../../../components' (for /en/services/[slug].astro)
    
    depth = len(filepath.split('/')) - 3  # src/pages/en/index.astro -> 4-3=1
    
    if depth == 1:
        content = content.replace("'../", "'../../")
        content = content.replace('"../', '"../../')
    elif depth == 2:
        content = content.replace("'../../", "'../../../")
        content = content.replace('"../../', '"../../../')
        content = content.replace("'../", "'../../")
        content = content.replace('"../', '"../../')
        
    # restore any over-replacements (like if it was already ../../ from a previous bad script)
    # actually, I'll just use a more careful approach since I know they were copied verbatim.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk('src/pages/en'):
    for f in files:
        if f.endswith('.astro'):
            fix_imports(os.path.join(root, f))
