import re
import glob

files = glob.glob('src/pages/en/**/*.astro', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace href="/foo" with href="/en/foo"
    # ONLY if it's not already href="/en/..." and not href="/branding/..." and not href="/fonts/..."
    
    def replacer(match):
        path = match.group(1)
        if path.startswith('/en/') or path.startswith('/branding/') or path.startswith('/fonts/') or path == '/en':
            return f'href="{path}"'
        elif path == '/':
            return 'href="/en"'
        else:
            return f'href="/en{path}"'
            
    new_content = re.sub(r'href="(/[^"]*)"', replacer, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed links in {filepath}")

