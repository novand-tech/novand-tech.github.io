import re

with open('src/data/solutions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

parts = content.split('const solutionsDataEn')
fa_part = parts[0]
en_part = 'const solutionsDataEn' + parts[1]

# Now replace inside fa_part
replacements = {
    'Wi-Fi 6 Mesh': 'Wi-Fi 6 مِش',
    'PoE Lighting': 'روشنایی بر بستر شبکه (PoE)',
    'Smart HVAC Integration': 'یکپارچه‌سازی هوشمند تهویه (HVAC)',
    'Invisible AV': 'تجهیزات صوتی‌تصویری مخفی',
    'Fiber to the Room (FTTR)': 'فیبر نوری تا اتاق (FTTR)',
    'VLAN Segmentation': 'بخش‌بندی شبکه (VLAN)',
    'SIP Trunking': 'خطوط تلفن سازمانی (SIP Trunk)',
    'Enterprise Firewalls': 'فایروال‌های سازمانی',
    'Access Control': 'کنترل تردد',
    'Structured Cabling': 'کابل‌کشی ساخت‌یافته',
    'High-Density Wi-Fi': 'وای‌فای با تراکم بالا',
    'IP Paging Systems': 'سیستم‌های پیجینگ تحت شبکه (IP)',
    'Interactive Displays': 'نمایشگرهای تعاملی',
    'Automated Energy Management': 'مدیریت هوشمند انرژی',
    'Content Filtering': 'فیلترینگ محتوا',
    'HIPAA Compliant Networking': 'شبکه‌های منطبق با استاندارد',
    'LAN-TV/IPTV': 'تلویزیون تعاملی (IPTV / LAN-TV)',
    'Guest Portal Wi-Fi': 'پورتال کاربری وای‌فای',
    'Critical UPS Infrastructure': 'زیرساخت‌های برق اضطراری UPS',
    'Nurse Call Integration': 'یکپارچه‌سازی سیستم احضار پرستار',
    'Industrial IoT': 'اینترنت اشیای صنعتی (IIoT)',
    'Rugged Fiber Optics': 'کابل‌های فیبر نوری مقاوم (Armored)',
    'Directional RF/Wi-Fi': 'شبکه‌های بی‌سیم متمرکز جهت‌دار',
    'Thermal CCTV': 'دوربین‌های مداربسته حرارتی',
    'Automated Climate Control': 'کنترل خودکار شرایط محیطی',
    'Security': 'امنیت',
    'Efficiency': 'کارایی',
    'Scale': 'مقیاس‌پذیری',
    'Hardware': 'سخت‌افزار',
    'Software': 'نرم‌افزار',
    'Support': 'پشتیبانی',
    'Downtime': 'قطعی‌ها',
    'Costs': 'هزینه‌ها',
    'Complexity': 'پیچیدگی‌ها'
}

for eng, per in replacements.items():
    fa_part = fa_part.replace(f'"{eng}"', f'"{per}"')

new_content = fa_part + en_part
with open('src/data/solutions.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
