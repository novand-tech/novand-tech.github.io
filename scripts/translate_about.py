import re
import glob

replacements = {
    'Technology Systems Designed to Work Together': 'سیستم‌های فناوری طراحی شده برای کار یکپارچه',
    'The Integration Dilemma': 'چالش یکپارچه‌سازی',
    'The Problem with Fragmented Subcontractors': 'مشکل پیمانکاران پراکنده',
    'The Accountability Void': 'خلأ پاسخگویی',
    'When an organization contracts separate vendors for low-voltage cabling, corporate firewalls, IP cameras, audio, and HVAC automation, intermittent failures are met with blame-shifting.': 'وقتی سازمانی پیمانکاران جداگانه‌ای برای کابل‌کشی، فایروال‌ها، دوربین‌های IP، صدا و اتوماسیون HVAC استخدام می‌کند، خرابی‌های متناوب با شانه خالی کردن از مسئولیت مواجه می‌شوند.',
    'Modern technology environments are inherently interconnected. An IP security camera does not operate in isolation; it depends on certified Category 6A copper drops, precise Power-over-Ethernet (PoE) power budgets, isolated Layer 2 VLAN tagging, adequate network video recorder storage throughput, and clean uninterrupted power.': 'محیط‌های فناوری مدرن ذاتاً به هم پیوسته‌اند. یک دوربین امنیتی IP به تنهایی کار نمی‌کند؛ بلکه به کابل‌کشی تایید شده Cat 6A، بودجه توان دقیق PoE، تگ‌گذاری ایزوله VLAN لایه ۲، توان عملیاتی کافی ذخیره‌سازی NVR و برق بدون وقفه بستگی دارد.',
    '{companyData.name} was established to solve this fragmentation. By uniting physical cabling, network switching, Linux and virtualization systems, automation buses, physical access control, and audio systems under a single disciplined engineering methodology, we deliver systems that operate predictably from day one.': '{companyData.name} برای حل این پراکندگی تاسیس شد. با یکپارچه کردن کابل‌کشی فیزیکی، سوئیچینگ شبکه، سیستم‌های لینوکس و مجازی‌سازی، گذرگاه‌های اتوماسیون، کنترل تردد و سیستم‌های صوتی تحت یک متدولوژی مهندسی واحد، ما سیستم‌هایی ارائه می‌دهیم که از روز اول به صورت پیش‌بینی‌شده کار می‌کنند.',
    'We do not sell consumer gadgets, run generic helpdesks, or push recurring proprietary cloud subscriptions. We engineer permanent, deterministic physical and logical infrastructure tailored to the architectural characteristics of your facility.': 'ما گجت‌های مصرفی نمی‌فروشیم، مرکز پشتیبانی عمومی نداریم و اشتراک‌های ابری انحصاری را تحمیل نمی‌کنیم. ما زیرساخت‌های فیزیکی و منطقی پایدار و قطعی را متناسب با ویژگی‌های معماری تاسیسات شما مهندسی می‌کنیم.',
    'Delivery Protocol': 'پروتکل تحویل',
    'Our Four-Stage Engineering Methodology': 'متدولوژی مهندسی چهار مرحله‌ای ما',
    'Every facility project proceeds through an established, documented sequence to eliminate surprises and guarantee operational handover.': 'هر پروژه تاسیساتی از طریق یک توالی مشخص و مستند پیش می‌رود تا از غافلگیری جلوگیری شده و تحویل عملیاتی تضمین شود.',
    'PHASE //': 'فاز //',
    'Key Deliverables:': 'خروجی‌های کلیدی:',
    'Operating Standards': 'استانداردهای عملیاتی',
    'The Engineering Principles We Uphold': 'اصول مهندسی که به آن‌ها پایبندیم',
    'These standards guide every architectural schematic, cable pull, switch configuration, and server deployment.': 'این استانداردها هدایت‌گر هر نقشه معماری، کابل‌کشی، پیکربندی سوئیچ و استقرار سرور هستند.',
    'Principle 01': 'اصل ۰۱',
    'Principle 02': 'اصل ۰۲',
    'Principle 03': 'اصل ۰۳',
    'Deterministic Engineering Over Hope': 'مهندسی قطعی به جای امید و حدس',
    'We never guess bandwidth, thermal, or optical loss margins. Every copper link is certified with calibrated cable analyzers, every optical run is OTDR tested, and every server cluster is subjected to IO stress tests before production traffic is introduced.': 'ما هرگز پهنای باند، حرارت یا افت نوری را حدس نمی‌زنیم. تمام کابل‌های مسی با آنالایزرهای کالیبره تایید می‌شوند، مسیرهای نوری با OTDR تست می‌شوند و کلاسترهای سرور پیش از زیر بار رفتن تحت تست‌های استرس IO قرار می‌گیرند.',
    'Zero Artificial Vendor Lock-In': 'صفر وابستگی مصنوعی به برند',
    'We favor open standards—SIP, BACnet, DALI-2, 802.1Q, Linux POSIX, and NDAA compliant protocols—over closed, proprietary ecosystems that trap building owners into mandatory recurring per-seat licensing fees.': 'ما استانداردهای باز (مانند SIP، BACnet، DALI-2، 802.1Q و لینوکس POSIX) را به اکوسیستم‌های بسته و انحصاری که مالکان ساختمان را درگیر هزینه‌های اجباری لایسنس می‌کنند، ترجیح می‌دهیم.',
    'Complete Transparency & Ownership': 'شفافیت و مالکیت کامل',
    'Our clients own their infrastructure. Upon completion, we provide all root credentials, labeled as-built wiring diagrams, switch port allocation matrices, and configuration backups. You will never be held hostage by our team.': 'مشتریان ما مالک زیرساخت خود هستند. پس از اتمام کار، تمامی گذرواژه‌های اصلی، نقشه‌های دقیق از-بیلت، جدول تخصیص پورت‌ها و فایل‌های پشتیبان تنظیمات را ارائه می‌دهیم. شما هرگز گروگان تیم ما نخواهید بود.',
    'Engage an Infrastructure Engineering Partner': 'با یک شریک مهندسی زیرساخت همکاری کنید',
    'Let us review your technology blueprints, survey your physical site, and provide actionable technical recommendations.': 'اجازه دهید نقشه‌های فناوری شما را بررسی کنیم، سایت شما را ارزیابی کرده و توصیه‌های فنی عملی ارائه دهیم.',
    'Explore Our Disciplines': 'بررسی تخصص‌های ما',
    'Engineering Identity': 'هویت مهندسی',
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

