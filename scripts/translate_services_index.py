import os

replacements = {
    'Discipline': 'حوزه تخصصی',
    'Primary Standards': 'استانداردهای پایه',
    'Verification Tools': 'ابزارهای اعتبارسنجی',
    'Delivery Artifact': 'خروجی تحویلی',
    'Smart Homes & Buildings': 'خانه‌ها و ساختمان‌های هوشمند',
    'Mobile IoT, DALI-2, BACnet, KNX, HDMI/HDBaseT': 'اینترنت اشیا (IoT)، DALI-2، BACnet، KNX، HDMI/HDBaseT',
    'Logic bus monitors, environmental sensors, lux meters': 'نمایشگرهای گذرگاه منطقی، سنسورهای محیطی، لوکس‌متر',
    'Appliance Profiles & Classroom Runbooks': 'پروفایل‌های تجهیزات و راهنمای کلاس‌های درس',
    'Network Infrastructure': 'زیرساخت شبکه',
    'CCNA & Network+, ANSI/TIA-568-D, FTTH': 'CCNA و Network+، ANSI/TIA-568-D، FTTH',
    'Fluke DSX-8000, OTDR Optical Loss, RF spectrum': 'تستر شبکه، تحلیل‌گر افت فیبر نوری، تحلیلگر طیف RF',
    'Certified Test Reports & Port Maps': 'گزارش‌های تست معتبر و نقشه پورت‌ها',
    'Enterprise IT & Application Services': 'فناوری اطلاعات سازمانی و نرم‌افزارها',
    'SIP / H.323, Microsoft AD, Citrix / VMware VDI': 'SIP / H.323، اکتیو دایرکتوری، Citrix / VMware VDI',
    'VoIP jitter analyzers, packet inspection probes': 'تحلیلگرهای Jitter در VoIP، مانیتورینگ بسته‌ها',
    'Dialplans, OTT Portals & Directory Matrix': 'برنامه‌های شماره‌گیری، پورتال‌های سازمانی و ماتریس دایرکتوری',
    'Systems Administration & Virtualization': 'مدیریت سیستم‌ها و مجازی‌سازی',
    'RedHat RHEL, Ubuntu Server, Docker, VMware ESXi': 'لینوکس (RHEL، اوبونتو)، داکر، VMware ESXi',
    'HP iLO, memtest86+, SMARTctl, IOzone, FIO': 'HP iLO، memtest86+، SMARTctl، IOzone، FIO',
    'Cluster Health Runbooks & Backup Restore Drills': 'دستورالعمل سلامت کلاستر و مانورهای بازیابی اطلاعات',
    'Smart Automation & Security': 'امنیت و اتوماسیون هوشمند',
    'NDAA Compliant, IP/WiFi/Analog CCTV, OSDP v2': 'تجهیزات منطبق با استانداردها، دوربین‌های IP/WiFi/آالوگ',
    'FLIR Thermal Cameras, hardware diagnostic analyzers': 'دوربین‌های حرارتی، تحلیلگرهای عیب‌یابی سخت‌افزار',
    'Camera Layout Schematics & Alarm Zone Maps': 'نقشه چیدمان دوربین‌ها و مناطق هشدار',
    'Audio Systems & Critical Power': 'سیستم‌های صوتی و برق اضطراری',
    'AES67, Dante IP, IEEE 519 Online Double-Conversion': 'AES67، Dante IP، یو‌پی‌اس‌های Online Double-Conversion',
    'Acoustic SPL meters, PDU telemetry, True RMS DMM': 'صدا سنج، تله‌متری PDU، مولتی‌مترهای True RMS',
    'Runtime Sizing Sheet & Zone Routing Matrix': 'محاسبات ظرفیت باتری و ماتریس مسیریابی زون‌ها',
    'Hardware Maintenance & Procurement': 'نگهداری و تامین سخت‌افزار',
    'Diagnostic Work Orders & Procurement Quotes': 'لیست کارهای عیب‌یابی و پیش‌فاکتورهای تامین',
    'ESD-safe diagnostics, SATA/NVMe recovery, PBX/Intercom': 'عیب‌یابی ایمن ESD، بازیابی اطلاعات SATA/NVMe، سانترال و اینترکام',
    'Hardware Lifecycle Horizon:': 'افق چرخه عمر سخت‌افزار:',
}

with open('src/pages/services/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/services/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)
