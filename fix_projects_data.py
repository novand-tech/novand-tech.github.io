import re

with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# I want to target only the Persian array `projectsDataFa`
# I'll just use simple replace since the English ones are in a different array if they exist?
# Actually, wait, let's just replace all instances in the whole file because 'Completed', 'Enterprise' etc. might be just strings.
# Wait, if they are in English array too, they will be translated. Better to only do it for `projectsDataFa` block.

fa_start = content.find('const projectsDataFa: Project[] = [')
fa_end = content.find('export function getProjectsData', fa_start)

if fa_start != -1 and fa_end != -1:
    fa_block = content[fa_start:fa_end]
    fa_block = fa_block.replace('"Completed"', '"تکمیل شده"')
    fa_block = fa_block.replace('"Enterprise"', '"سازمانی"')
    fa_block = fa_block.replace('"Consulting"', '"مشاوره"')
    fa_block = fa_block.replace('"Implementation"', '"پیاده‌سازی"')
    fa_block = fa_block.replace('"Successful completion"', '"اجرای موفقیت‌آمیز"')
    fa_block = fa_block.replace('"Education"', '"آموزشی"')
    fa_block = fa_block.replace('"Residential"', '"مسکونی"')
    fa_block = fa_block.replace('"Commercial"', '"تجاری"')
    fa_block = fa_block.replace('"Healthcare"', '"درمانی"')
    fa_block = fa_block.replace('"Industrial"', '"صنعتی"')
    
    content = content[:fa_start] + fa_block + content[fa_end:]

with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(content)
