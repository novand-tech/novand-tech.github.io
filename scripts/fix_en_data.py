import re

with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

en_start = content.find('const projectsDataEn: Project[] = [')

if en_start != -1:
    en_block = content[en_start:]
    en_block = en_block.replace('"تکمیل شده"', '"Completed"')
    en_block = en_block.replace('"سازمانی"', '"Enterprise"')
    en_block = en_block.replace('"مشاوره"', '"Consulting"')
    en_block = en_block.replace('"پیاده‌سازی"', '"Implementation"')
    en_block = en_block.replace('"اجرای موفقیت‌آمیز"', '"Successful completion"')
    
    content = content[:en_start] + en_block

with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(content)
