import os, re

def fix_imports(filepath):
    orig_path = filepath.replace('src/pages/en/', 'src/pages/')
    if not os.path.exists(orig_path): return
    with open(orig_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # replace import paths that start with ../
    content = re.sub(r'from\s+([\'"])((?:\.\./)+)', lambda m: 'from ' + m.group(1) + '../' + m.group(2), content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk('src/pages/en'):
    for f in files:
        if f.endswith('.astro'):
            fix_imports(os.path.join(root, f))

