import os

replacements = {
    'eyebrow: "تخصص فنی", focusAreas: ["آنالیز نیازها", "طراحی"] },': 'eyebrow: "Technical Expertise", focusAreas: ["Requirements Analysis", "Design"] },',
    'subheadline': 'subheadline',
}

with open('src/data/consulting.ts', 'r', encoding='utf-8') as f:
    content = f.read()
    
# Fix the missing 'subheadline' property
content = content.replace('const consultingDataFa = {', 'const consultingDataFa = {\n  subheadline: "مشاوره زیرساخت",')
content = content.replace('const consultingDataEn = {', 'const consultingDataEn = {\n  subheadline: "Infrastructure Advisory",')

content = content.replace('eyebrow: "تخصص فنی", focusAreas: ["آنالیز نیازها", "طراحی"] },', 'eyebrow: "Technical Expertise", focusAreas: ["Requirements Analysis", "Design"] },')
# wait, I should only replace that for the EN version. Let's do a better replace.

import re
def fix_en_data(text):
    # Only replace 'تخصص فنی' in consultingDataEn
    parts = text.split('const consultingDataEn = {')
    if len(parts) == 2:
        en_part = parts[1]
        en_part = en_part.replace('تخصص فنی', 'Technical Expertise')
        en_part = en_part.replace('آنالیز نیازها', 'Requirements Analysis')
        en_part = en_part.replace('طراحی', 'Design')
        return parts[0] + 'const consultingDataEn = {' + en_part
    return text

new_content = fix_en_data(content)
with open('src/data/consulting.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
