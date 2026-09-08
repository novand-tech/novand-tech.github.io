import re
import glob

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the closing --- and remove anything immediately after it that looks like a const assignment
    # Actually, let's just find the exact strings that were leaked:
    leaked_str = 'const isEn = Astro.url.pathname.startsWith("/en");\nconst companyData = getCompanyData(Astro.url.pathname);\n'
    # Wait, they might not have newlines. Let's use regex.
    # The second --- was replaced by `---\nconst isEn = Astro.url.pathname.startsWith("/en");`
    # Let's replace `---\nconst isEn = Astro.url.pathname.startsWith("/en");` with `---` for the SECOND occurrence.
    
    # Or more generally:
    new_content = re.sub(r'---\nconst isEn = Astro\.url\.pathname\.startsWith\("/en"\);', r'---', content)
    # Wait, the first one was also replaced. If I do this, it will remove BOTH!
    # Let's only fix the text *after* the closing `---`.
    
    parts = content.split('---')
    if len(parts) >= 3:
        # parts[0] is empty, parts[1] is frontmatter, parts[2] is HTML
        # In parts[2], remove the leaked JS variables.
        parts[2] = re.sub(r'^const isEn = Astro\.url\.pathname\.startsWith\("/en"\);', '', parts[2])
        parts[2] = re.sub(r'^const [a-zA-Z0-9_]+Data = get[a-zA-Z0-9_]+Data\(Astro\.url\.pathname\);', '', parts[2])
        # Sometimes they are on the same line because there was no newline
        
        # Let's do a more robust cleanup on parts[2]
        while True:
            parts[2] = parts[2].strip()
            if parts[2].startswith('const isEn = Astro.url.pathname.startsWith("/en");'):
                parts[2] = parts[2][len('const isEn = Astro.url.pathname.startsWith("/en");'):]
            elif re.match(r'^const [a-zA-Z0-9_]+Data = get[a-zA-Z0-9_]+Data\(Astro\.url\.pathname\);', parts[2]):
                parts[2] = re.sub(r'^const [a-zA-Z0-9_]+Data = get[a-zA-Z0-9_]+Data\(Astro\.url\.pathname\);', '', parts[2])
            elif parts[2].startswith('const allServices = servicesData;'):
                parts[2] = parts[2][len('const allServices = servicesData;'):]
            else:
                break
                
        new_content = parts[0] + '---' + parts[1] + '---\n' + parts[2]
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {filepath}")

for filepath in glob.glob('src/components/**/*.astro', recursive=True):
    fix_file(filepath)

