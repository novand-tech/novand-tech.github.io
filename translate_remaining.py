import re
import glob

replacements = {
    # brand.astro
    'Horizontal Lockup': 'نشانواره افقی',
    'Laser Etching on Chassis': 'حکاکی لیزری روی شاسی',
    'Approved Practices (DO)': 'روش‌های تایید شده (بایدها)',
    'Always use the official <strong class="text-white">Dark Lockup</strong> on dark backgrounds and the <strong class="text-white">Light Lockup</strong> on white or light backgrounds.': 'همیشه از <strong class="text-white">نشانواره تاریک</strong> رسمی روی پس‌زمینه‌های تیره و <strong class="text-white">نشانواره روشن</strong> روی پس‌زمینه‌های سفید یا روشن استفاده کنید.',
    'Maintain the specified exclusion clearspace around the emblem in all layouts.': 'حریم فضای خالی مشخص شده در اطراف نماد را در تمام طرح‌ها حفظ کنید.',
    'Use the <strong class="text-white">Monochrome Black</strong> format for physical laser etching on aluminum network racks and single-color forms.': 'از فرمت <strong class="text-white">مشکی تک‌رنگ</strong> برای حکاکی لیزری فیزیکی روی رک‌های آلومینیومی شبکه و فرم‌های تک‌رنگ استفاده کنید.',
    'Utilize the official Persian typography lockup for Iranian and regional documentation.': 'از نشانواره رسمی با تایپوگرافی فارسی برای مستندات منطقه‌ای و ایران استفاده کنید.',
    "Prohibited Modifications (DON'T)": 'تغییرات ممنوعه (نبایدها)',
    'Never stretch, squish, or distort the geometric proportions of the monogram or wordmark.': 'هرگز تناسبات هندسی مونوگرام یا نماد متنی را نکشید، فشرده نکنید یا تغییر ندهید.',
    'Never substitute arbitrary gradient colors (e.g. purple, orange) for the Cyan-Emerald optical bus.': 'هرگز رنگ‌های گرادیان دلخواه (مانند بنفش، نارنجی) را جایگزین رنگ‌های فیروزه‌ای-زمردی مسیر نوری نکنید.',
    'Never place the full-color dark emblem on high-contrast busy photography without a darkening overlay.': 'هرگز نماد تاریک تمام‌رنگ را روی تصاویر پس‌زمینه شلوغ با کنتراست بالا بدون لایه تیره قرار ندهید.',
    'Never alter the individual positions or angles of the circuit traces and terminal nodes.': 'هرگز موقعیت یا زاویه خطوط مدار و گره‌های پایانی را تغییر ندهید.',
    'Media &amp; Corporate Inquiries': 'ارتباطات رسانه‌ای و سازمانی',
    'Need Custom Asset Formats or Co-Branding Approval?': 'به فرمت‌های سفارشی یا تایید برند مشترک نیاز دارید؟',
    'For editorial features, conference sponsorship kits, vector engineering blueprints, or partner co-branding reviews, our team is available to assist.': 'برای انتشار مقالات، کیت‌های حمایت مالی کنفرانس، نقشه‌های مهندسی وکتور، یا بررسی برندینگ مشترک با شرکا، تیم ما آماده کمک است.',
    'Download All Assets (.ZIP)': 'دانلود تمام فایل‌ها (.ZIP)',
    'Contact Brand Team': 'تماس با تیم برند',
    'Copied to clipboard!': 'در کلیپ‌بورد کپی شد!',
    
    # projects.astro
    'Detailed technical case models demonstrating our unified approach to structured cabling, networking, security, and automation deployments.': 'مدل‌های فنی دقیقی که رویکرد یکپارچه ما را در استقرارهای کابل‌کشی ساختاریافته، شبکه، امنیت و اتوماسیون نشان می‌دهند.',
    'Projects & Case Models': 'پروژه‌ها و مدل‌های کاربردی',
    'Engineering Archetypes': 'الگوهای مهندسی',
    'Case Models & Deployments': 'مدل‌های کاربردی و پیاده‌سازی‌ها',
    'Technical blueprints and operational case models illustrating converged infrastructure in production environments.': 'طرح‌های فنی و مدل‌های کاربردی عملیاتی که زیرساخت‌های یکپارچه در محیط‌های واقعی را نشان می‌دهند.',
    
    # services.astro
    'Comprehensive technical disciplines spanning smart automation, enterprise networking, physical security, audio distribution, and IT infrastructure management.': 'تخصص‌های فنی جامع شامل اتوماسیون هوشمند، شبکه سازمانی، امنیت فیزیکی، توزیع صوتی و مدیریت زیرساخت فناوری اطلاعات.',
    'Services & Disciplines': 'خدمات و تخصص‌ها',
    'Engineering Disciplines': 'تخصص‌های مهندسی',
    'Technical Service Catalog': 'کاتالوگ خدمات فنی',
    'Comprehensive infrastructure engineering across the physical and logical technology stack.': 'مهندسی جامع زیرساخت در لایه‌های فناوری فیزیکی و منطقی.',
    'Request Technical Assessment': 'درخواست ارزیابی فنی',
    
    # solutions.astro
    'Specialized engineering solutions tailored to the distinct operational, physical, and regulatory constraints of corporate, residential, healthcare, and industrial facilities.': 'راهکارهای مهندسی تخصصی متناسب با محدودیت‌های عملیاتی، فیزیکی و قانونی خاص در تاسیسات تجاری، مسکونی، درمانی و صنعتی.',
    'Target Environments & Solutions': 'محیط‌های هدف و راهکارها',
    'Target Environments': 'محیط‌های هدف',
    'Environment-Specific Engineering': 'مهندسی خاص محیط',
    'Infrastructure standards adapted to the physical, acoustic, and security realities of specific facility types.': 'استانداردهای زیرساختی سازگار با واقعیت‌های فیزیکی، آکوستیک و امنیتی انواع خاص تاسیسات.',
    'Discuss Your Environment': 'بررسی محیط شما',
}

files_to_translate = glob.glob('src/pages/*.astro')

for filepath in files_to_translate:
    if '/en/' in filepath: continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for eng, per in replacements.items():
        content = content.replace(eng, per)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

