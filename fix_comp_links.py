import re
import glob

files = glob.glob('src/components/**/*.astro', recursive=True) + glob.glob('src/layouts/**/*.astro', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace href="/foo" with href={isEn ? "/en/foo" : "/foo"}
    # Ignore /en/, /branding/, /fonts/
    def replacer(match):
        path = match.group(1)
        if path.startswith('/en/') or path.startswith('/branding/') or path.startswith('/fonts/') or path == '/en':
            return match.group(0) # unchanged
        
        # if path is '/', it goes to '/en'
        en_path = '/en' if path == '/' else f'/en{path}'
        return f'href={{isEn ? "{en_path}" : "{path}"}}'
            
    new_content = re.sub(r'href="(/[^"]*)"', replacer, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed links in {filepath}")

