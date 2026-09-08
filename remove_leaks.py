import re
import glob
import os

files = glob.glob('src/**/*.astro', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = content.split('---')
    if len(parts) >= 3:
        # After the second '---', it's parts[2]
        html_part = '---'.join(parts[2:])
        
        # We want to remove any line starting with `const ` right at the beginning of html_part
        # Let's use a regex to replace `^\s*const\s+[a-zA-Z0-9_]+\s*=\s*get[a-zA-Z0-9_]+\(.*?\);\s*`
        new_html = html_part
        while True:
            new_html = new_html.lstrip()
            # Try to match `const foo = getBar(...);`
            m = re.match(r'^const\s+[a-zA-Z0-9_]+\s*=\s*get[a-zA-Z0-9_]+\(.*?\);[\r\n]*', new_html)
            if m:
                new_html = new_html[m.end():]
                continue
            
            # Match `const allServices = servicesData;`
            m2 = re.match(r'^const\s+[a-zA-Z0-9_]+\s*=\s*[a-zA-Z0-9_]+;[\r\n]*', new_html)
            if m2:
                new_html = new_html[m2.end():]
                continue

            break

        if new_html != html_part:
            new_content = parts[0] + '---' + parts[1] + '---\n' + new_html
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed leaks in {filepath}")

