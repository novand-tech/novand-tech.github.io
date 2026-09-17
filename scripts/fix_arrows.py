import os
import glob

files = glob.glob('src/**/*.astro', recursive=True) + glob.glob('src/**/*.tsx', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace('&rarr;', '→').replace('&larr;', '←')
    new_content = new_content.replace('&rarr', '→').replace('&larr', '←')

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed arrows in {filepath}")
