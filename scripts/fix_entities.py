import os
import glob

files = glob.glob('src/**/*.astro', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace('&bull;', '•').replace('&bull', '•')
    new_content = new_content.replace('&check;', '✓').replace('&check', '✓')
    new_content = new_content.replace('&darr;', '↓').replace('&darr', '↓')

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed entities in {filepath}")
