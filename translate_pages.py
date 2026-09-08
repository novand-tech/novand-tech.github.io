import re
import glob

replacements = {
    'Independent, vendor-neutral engineering advisory for evaluating, specifying, and procuring networking, server, physical security, automation, and IT hardware.': 'مشاوره مهندسی مستقل و بدون وابستگی به برند جهت ارزیابی، تعیین مشخصات و تهیه شبکه، سرور، امنیت فیزیکی، اتوماسیون و سخت‌افزارهای IT.',
    'Equipment Advisory & Infrastructure Consulting': 'مشاوره تجهیزات و زیرساخت',
    'Consulting & Equipment Advisory': 'مشاوره و تامین تجهیزات',
    'Independent Technical Advisory': 'مشاوره فنی مستقل',
    'Core Advisory Services': 'خدمات مشاوره اصلی',
    'Engineering Feasibility & Assessment': 'امکان‌سنجی مهندسی و ارزیابی',
    'We prevent costly architectural mistakes by conducting rigorous evaluations of proposed system designs, hardware bills of materials, and vendor quotations.': 'ما با ارزیابی دقیق طراحی‌های پیشنهادی سیستم، لیست قطعات و پیشنهادهای پیمانکاران، از اشتباهات پرهزینه معماری جلوگیری می‌کنیم.',
    'Review Capabilities': 'قابلیت‌های ارزیابی',
    'Bill of Materials (BOM) review and sanity checks': 'بررسی و تایید صحت لیست تجهیزات (BOM)',
    'Network topology and bottleneck analysis': 'تحلیل توپولوژی شبکه و گلوگاه‌ها',
    'Physical security blind-spot identification': 'شناسایی نقاط کور امنیت فیزیکی',
    'Vendor lock-in risk assessment': 'ارزیابی ریسک وابستگی به برند (Vendor Lock-in)',
    'Hardware Specification & Procurement': 'تعیین مشخصات و تامین سخت‌افزار',
    'We source and specify authentic, commercial-grade equipment tailored to your actual operational requirements, free from marketing influence or sales quotas.': 'ما تجهیزات اصلی و تجاری متناسب با نیازهای عملیاتی واقعی شما را به دور از تاثیر بازاریابی یا سهمیه فروش، تامین و مشخص می‌کنیم.',
    'Procurement Focus': 'حوزه‌های تامین',
    'Enterprise Routing, Switching, and Wireless': 'مسیریابی، سوئیچینگ و بی‌سیم سازمانی',
    'Server infrastructure, SAN/NAS storage, and virtualization clusters': 'زیرساخت سرور، ذخیره‌سازی SAN/NAS و کلاسترهای مجازی‌سازی',
    'CCTV, Access Control, and DALI-2 Smart Automation': 'دوربین مداربسته، کنترل تردد و اتوماسیون هوشمند DALI-2',
    'Fiber optics, structured copper cabling, and racking systems': 'فیبر نوری، کابل‌کشی ساختاریافته مسی و سیستم‌های رک',
    'Our Advisory Methodology': 'متدولوژی مشاوره ما',
    'Structured Engineering Approach': 'رویکرد ساختاریافته مهندسی',
    'We approach advisory engagements with the same rigor as active deployments, ensuring your technology strategy is grounded in physical realities.': 'ما با همان دقتی که در پروژه‌های اجرایی به کار می‌بریم، مشاوره‌ها را پیش می‌بریم و اطمینان حاصل می‌کنیم که استراتژی فناوری شما بر اساس واقعیت‌های فیزیکی بنا شده باشد.',
    'STAGE': 'مرحله',
    'Request Consultation': 'درخواست مشاوره',
    'Contact Engineering Office': 'تماس با دفتر مهندسی',
    
    # about.astro
    'About Novand & Engineering Methodology': 'درباره نوند و متدولوژی مهندسی',
    'A multi-disciplinary technology firm specializing in the architectural design, deployment, and management of converged physical infrastructure and enterprise systems.': 'یک شرکت فناوری چندرشته‌ای متخصص در طراحی معماری، پیاده‌سازی و مدیریت زیرساخت‌های یکپارچه فیزیکی و سیستم‌های سازمانی.',
    'About Novand': 'درباره نوند',
    'Engineering Capability Framework': 'چارچوب قابلیت‌های مهندسی',
    'The 4-Stage Deployment Methodology': 'متدولوژی ۴ مرحله‌ای استقرار',
    'Contact Engineering': 'تماس با مهندسی',
    'Engineering Methodologies': 'متدولوژی مهندسی',
    'Systems Architecture & Integration Principles': 'اصول معماری سیستم‌ها و یکپارچه‌سازی',
    'Our approach treats IT networks, smart automation, physical security, and infrastructure as a single, converged architectural system.': 'رویکرد ما شبکه‌های IT، اتوماسیون هوشمند، امنیت فیزیکی و زیرساخت را به عنوان یک سیستم یکپارچه واحد معماری می‌بیند.',
    
    # brand.astro
    'Brand Identity & Digital Assets | Novand': 'هویت برند و دارایی‌های دیجیتال | نوند',
    'Official logos, typography, color palettes, and visual guidelines for the Novand corporate identity.': 'لوگوهای رسمی، تایپوگرافی، پالت‌های رنگی و دستورالعمل‌های بصری هویت سازمانی نوند.',
    'Brand & Identity Kit': 'کیت برند و هویت بصری',
    'Brand & Visual Identity': 'برند و هویت بصری',
    'Corporate Assets': 'دارایی‌های سازمانی',
    'Official corporate assets, structural guidelines, and color palettes for the Novand brand.': 'دارایی‌های رسمی، ساختارهای راهنما و پالت رنگی برند نوند.',
    'Logomark Guidelines': 'دستورالعمل نشان‌واره',
    'Color Infrastructure': 'ساختار رنگی',
    'Primary Palette': 'پالت اصلی',
    'Secondary/Status': 'پالت فرعی/وضعیت',
    'Corporate Typeface': 'فونت‌های سازمانی',
    'Space Grotesk': 'Space Grotesk',
    'Vazirmatn': 'وزیرمتن',
    
    # projects.astro
    'Engineering Projects & Case Models | Novand': 'پروژه‌های مهندسی و نمونه‌ها | نوند',
    'Detailed technical case models demonstrating our unified approach to structured cabling, networking, security, and automation deployments.': 'مدل‌های فنی و نمونه‌هایی که رویکرد یکپارچه ما را در کابل‌کشی ساختاریافته، شبکه، امنیت و اتوماسیون نشان می‌دهند.',
    'Projects & Case Models': 'پروژه‌ها و نمونه‌ها',
    'Engineering Archetypes': 'الگوهای مهندسی',
    'Case Models & Deployments': 'نمونه‌کارها و پروژه‌ها',
    'Technical blueprints and operational case models illustrating converged infrastructure in production environments.': 'طرح‌های فنی و نمونه‌کارهای عملیاتی که زیرساخت همگرا در محیط‌های کاربردی را نشان می‌دهند.',
    
    # services.astro
    'Engineering & Technology Services | Novand': 'خدمات فناوری و مهندسی | نوند',
    'Comprehensive technical disciplines spanning smart automation, enterprise networking, physical security, audio distribution, and IT infrastructure management.': 'تخصص‌های جامع فنی شامل اتوماسیون هوشمند، شبکه‌های سازمانی، امنیت فیزیکی، توزیع صدا و مدیریت زیرساخت IT.',
    'Services & Disciplines': 'خدمات و تخصص‌ها',
    'Engineering Disciplines': 'حوزه‌های مهندسی',
    'Technical Service Catalog': 'کاتالوگ خدمات فنی',
    'Comprehensive infrastructure engineering across the physical and logical technology stack.': 'مهندسی یکپارچه زیرساخت در لایه‌های فناوری فیزیکی و منطقی.',
    'Request Technical Assessment': 'درخواست ارزیابی فنی',
    
    # solutions.astro
    'Infrastructure Solutions by Environment | Novand': 'راهکارهای زیرساخت بر اساس محیط | نوند',
    'Specialized engineering solutions tailored to the distinct operational, physical, and regulatory constraints of corporate, residential, healthcare, and industrial facilities.': 'راهکارهای تخصصی مهندسی متناسب با محدودیت‌های فیزیکی، عملیاتی و قانونی خاص در ساختمان‌های تجاری، مسکونی، درمانی و صنعتی.',
    'Target Environments & Solutions': 'محیط‌های هدف و راهکارها',
    'Target Environments': 'محیط‌های هدف',
    'Environment-Specific Engineering': 'مهندسی اختصاصی محیط',
    'Infrastructure standards adapted to the physical, acoustic, and security realities of specific facility types.': 'استانداردهای زیرساخت که با واقعیت‌های فیزیکی، آکوستیک و امنیتی نوع خاصی از تاسیسات تطبیق داده شده‌اند.',
    'Discuss Your Environment': 'درباره محیط خود گفتگو کنید',
}

files_to_translate = glob.glob('src/pages/*.astro')

for filepath in files_to_translate:
    if '/en/' in filepath: continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for eng, per in replacements.items():
        # Do not translate if it's within a script tag or some logic. Simple string replace is mostly safe.
        content = content.replace(eng, per)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

