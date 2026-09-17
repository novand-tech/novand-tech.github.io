import os

replacements = {
    'ATTENTION:': 'توجه:',
    'Multi-Discipline Infrastructure': 'زیرساخت جامع',
    'SUBMISSION RECEIVED:': 'درخواست دریافت شد:',
    'Corporate Operations & Contact': 'تماس و عملیات سازمانی',
    'Corporate Operations': 'عملیات سازمانی',
    'Official communications, technical support, and engineering consultation requests for Novand infrastructure services.': 'ارتباطات رسمی، پشتیبانی فنی و درخواست‌های مشاوره مهندسی خدمات زیرساخت نوند.',
    'Contact Information': 'اطلاعات تماس',
    'Global Operations': 'عملیات',
    'Engineering Facilities': 'تاسیسات مهندسی',
    'Reach out to our specialized engineering departments for technical assessments, infrastructure planning, or support escalations.': 'برای ارزیابی‌های فنی، برنامه‌ریزی زیرساخت یا ارجاعات پشتیبانی با دپارتمان‌های مهندسی تخصصی ما تماس بگیرید.',
    'Technical Support & Escalations': 'پشتیبانی فنی',
    'Active client support and hardware maintenance.': 'پشتیبانی فعال مشتریان و نگهداری سخت‌افزار.',
    'Infrastructure Consultation': 'مشاوره زیرساخت',
    'Architecture, networking, and security design.': 'طراحی معماری، شبکه و امنیت.',
    'General Operations & Vendor Relations': 'عملیات عمومی و تامین',
    'Administrative and procurement inquiries.': 'درخواست‌های اداری و تامین کالا.',
    'Request Engineering Consultation': 'درخواست مشاوره مهندسی',
    'Provide details regarding your facility or technology requirements. Our engineers will review the constraints and contact you to schedule a technical assessment.': 'جزئیات مربوط به تاسیسات یا نیازهای فناوری خود را ارائه دهید. مهندسان ما شرایط را بررسی کرده و برای برنامه‌ریزی یک ارزیابی فنی با شما تماس می‌گیرند.',
    'Full Name / Organization': 'نام کامل / سازمان',
    'Your Name or Company': 'نام شما یا شرکت',
    'Email Address': 'آدرس ایمیل',
    'Facility or Project Type': 'نوع پروژه یا تاسیسات',
    'Commercial Enterprise': 'تجاری و سازمانی',
    'Industrial / Manufacturing': 'صنعتی / تولیدی',
    'Residential Estate': 'مجتمع مسکونی',
    'Healthcare / Clinical': 'درمانی / بالینی',
    'Primary Infrastructure Interest': 'حوزه اصلی مورد نیاز',
    'Enterprise Networking': 'شبکه‌های سازمانی',
    'Physical Security & CCTV': 'امنیت فیزیکی و دوربین مداربسته',
    'Smart Automation & DALI-2': 'اتوماسیون هوشمند و DALI-2',
    'Audio & Power Distribution': 'توزیع صدا و برق',
    'General IT Consultation': 'مشاوره عمومی فناوری اطلاعات',
    'Project Details & Engineering Constraints': 'جزئیات پروژه و محدودیت‌های مهندسی',
    'Describe the current environment, specific technical challenges, or hardware requirements...': 'محیط فعلی، چالش‌های فنی خاص یا نیازهای سخت‌افزاری را شرح دهید...',
    'Submit Technical Request': 'ثبت درخواست فنی',
    'Due to high demand, our engineering assessment queue is currently 3-5 business days. For critical infrastructure down situations, please contact the Support Desk directly via phone.': 'به دلیل حجم بالای درخواست‌ها، زمان بررسی مهندسی در حال حاضر ۳ تا ۵ روز کاری است. در مواقع قطعی بحرانی زیرساخت، لطفاً مستقیماً از طریق تلفن با میز پشتیبانی تماس بگیرید.',
    'Thank you. Our engineering team will review your requirements and contact you shortly.': 'با تشکر. تیم مهندسی ما درخواست شما را بررسی کرده و به زودی با شما تماس خواهد گرفت.',
}

with open('src/pages/contact.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/contact.astro', 'w', encoding='utf-8') as f:
    f.write(content)
