import re

with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

fa_start = content.find('const projectsDataFa: Project[] = [')
fa_end = content.find('export function getProjectsData', fa_start)

if fa_start != -1 and fa_end != -1:
    fa_block = content[fa_start:fa_end]
    fa_block = fa_block.replace('"Centralized Dashboard"', '"داشبورد متمرکز"')
    fa_block = fa_block.replace('"PoE Access Control"', '"کنترل دسترسی PoE"')
    fa_block = fa_block.replace('"IP Paging"', '"پیجینگ تحت شبکه (IP Paging)"')
    fa_block = fa_block.replace('"802.1X Auth"', '"احراز هویت 802.1X"')
    fa_block = fa_block.replace('"VLAN Segmentation"', '"بخش‌بندی VLAN"')
    fa_block = fa_block.replace('"SAN Storage"', '"ذخیره‌ساز SAN"')
    fa_block = fa_block.replace('"Enterprise"', '"سازمانی"')
    
    content = content[:fa_start] + fa_block + content[fa_end:]

with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(content)

