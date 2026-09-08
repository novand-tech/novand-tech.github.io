import re

with open('src/data/consulting.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the English section back
def fix_en(match):
    en_section = match.group(0)
    en_section = en_section.replace('"تخصص فنی"', '"Technical Expertise"')
    en_section = en_section.replace('"آنالیز نیازها"', '"Requirements Analysis"')
    en_section = en_section.replace('"طراحی"', '"Design"')
    return en_section

content = re.sub(r'export const consultingDataEn = \{.*?\};', fix_en, content, flags=re.DOTALL)

with open('src/data/consulting.ts', 'w', encoding='utf-8') as f:
    f.write(content)

