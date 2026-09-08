import re
import glob

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace `="{isEn ? '...' : '...'}"` with `={isEn ? '...' : '...'}`
    new_content = re.sub(r'="(\{isEn.*?\})"', r'=\1', content)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
            print(f"Fixed {filepath}")

for filepath in glob.glob('src/**/*.astro', recursive=True):
    fix_file(filepath)

