import os

replacements = {
    'The Novand identity bridges the structural permanence of modern physical facilities with the dynamic flow of high-speed optical routing and intelligent automation. This official kit provides comprehensive standards, geometry specifications, color tokens, and multi-purpose logos for media, architectural blueprints, digital products, and physical hardware.': 'هویت بصری نُوَند پل ارتباطی است میان استحکام ساختاری تاسیسات مدرن و جریان پویای مسیریابی نوری با سرعت بالا و اتوماسیون هوشمند. این کیت رسمی، شامل استانداردهای جامع، مشخصات هندسی، متغیرهای رنگی، و نشان‌واره‌های چندمنظوره برای استفاده در رسانه‌ها، نقشه‌های معماری، محصولات دیجیتال، و سخت‌افزارهای فیزیکی می‌باشد.',
    'Every vector line and node corresponds to an engineering discipline in Novand’s capability stack, calculated along precise 45-degree isometric conduits.': 'هر خط و گره وکتور معادل یکی از حوزه‌های مهندسی در سبد قابلیت‌های نُوَند است که در امتداد مجراهای ایزومتریک دقیق با زاویه ۴۵ درجه محاسبه شده‌اند.',
    'The bold white roofline establishes physical presence, facility permanence, and structural sheltering. It represents data center buildings, smart corporate offices, and campus infrastructure.': 'خط سقف ضخیم و سفید نشان‌دهنده حضور فیزیکی، ماندگاری تاسیسات و پناهگاه ساختاری است. این عنصر نمایانگر ساختمان‌های دیتاسنتر، دفاتر هوشمند شرکتی، و زیرساخت‌های پردیس‌ها می‌باشد.',
    'A calibrated 2×2 grid signifying structured spaces, server rack chassis, and organizational discipline. It anchors the mark to real-world corporate architecture and workspace operations.': 'یک شبکه کالیبره‌شده ۲×۲ که نشان‌دهنده فضاهای ساخت‌یافته، شاسی رک‌های سرور، و نظم سازمانی است. این بخش، نشان را به معماری واقعی سازمانی و عملیات فضای کاری پیوند می‌دهد.',
    'Stepped diagonal pathways symbolize FTTH fiber optic trunk lines, high-frequency copper cabling, and active routing conduits carrying multi-gigabit traffic across the facility.': 'مسیرهای مورب و پله‌ای نمادی از خطوط فیبر نوری FTTH، کابل‌کشی مسی با فرکانس بالا، و مجراهای مسیریابی فعال هستند که ترافیک چند-گیگابیتی را در سراسر تاسیسات انتقال می‌دهند.',
    'Three distinct circular endpoints embody connected clients: IoT building automation sensors, CCTV &amp; security access controllers, and high-performance server clusters.': 'سه نقطه پایانی دایره‌ای مشخص نشان‌دهنده کلاینت‌های متصل هستند: سنسورهای اتوماسیون ساختمان IoT، دوربین‌های مداربسته و کنترلرهای دسترسی امنیتی، و کلاسترهای سرور با عملکرد بالا.',
    'Strict visual protection zones ensure that the Novand emblem retains maximum clarity and prominence across any application.': 'مناطق حریم امن بصری سخت‌گیرانه تضمین می‌کنند که نشان نُوَند حداکثر وضوح و برجستگی خود را در هر کاربردی حفظ می‌کند.',
    'The minimum exclusion margin corresponds to dimension X, defined as half the height of the primary building gable. No typography, secondary company logos, graphic borders, or photography edges may intrude into this zone.': 'حداقل حاشیه امن برابر با بعد X است که معادل نیمی از ارتفاع سقف اصلی ساختمان تعریف می‌شود. هیچ تایپوگرافی، لوگوی شرکت‌های ثانویه، حاشیه‌های گرافیکی، یا لبه‌های عکاسی نباید وارد این منطقه شوند.',
    'Calibrated logo formats for every physical and digital surface — from web navigation and software interfaces to physical metal chassis laser engraving and printed contracts.': 'فرمت‌های لوگوی کالیبره‌شده برای هر سطح فیزیکی و دیجیتال — از ناوبری وب و رابط‌های نرم‌افزاری گرفته تا حکاکی لیزری روی شاسی‌های فلزی فیزیکی و قراردادهای چاپی.',
    'Primary corporate identity for website headers, software dashboards, dark pitch decks, and partner presentation footers.': 'هویت سازمانی اصلی برای سرصفحه‌های وب‌سایت، داشبوردهای نرم‌افزاری، ارائه‌های تیره و پانویس‌های ارائه‌های شرکای تجاری.',
    'Engineered for white backgrounds, paper invoices, engineering proposals, client contracts, and light-mode slide decks.': 'طراحی‌شده برای پس‌زمینه‌های سفید، فاکتورهای کاغذی، پروپوزال‌های مهندسی، قراردادهای مشتریان و اسلایدهای ارائه‌های روشن.',
    'Vertical balance for conference stage rollups, exhibition entrance boards, square documentation covers, and mobile splash screens.': 'توازن عمودی مناسب برای رول‌آپ‌های صحنه کنفرانس، بردهای ورودی نمایشگاه‌ها، رویه مستندات مربعی، و صفحات شروع برنامه‌های موبایل.',
    'Vertical centered lockup on pure white chassis, ideal for equipment compliance certificates, product boxes, and printed manuals.': 'ترکیب عمودی متمرکز روی پس‌زمینه کاملاً سفید، ایده‌آل برای گواهی‌های تطابق تجهیزات، جعبه‌های محصول و دفترچه‌های راهنمای چاپی.',
    'The standalone emblem with transparent background and illuminated cyan-emerald conduits. Suitable for UI icons, web navigation, and custom layouts.': 'نشان مستقل با پس‌زمینه شفاف و مجراهای نورانی فیروزه‌ای-زمردی. مناسب برای آیکون‌های رابط کاربری، ناوبری وب و چیدمان‌های سفارشی.',
    'Enclosed on circular pedestal with subtle CAD background grid. Standard profile avatar for LinkedIn, GitHub, YouTube, and app icons.': 'محصور در یک پایه دایره‌ای با پس‌زمینه ظریف شبکه CAD. آواتار استاندارد برای لینکدین، گیت‌هاب، یوتیوب و آیکون‌های برنامه‌ها.',
    'Pure white pedestal chassis with high-contrast architectural strokes. Optimized for light-mode mobile home screen bookmarks and product packaging.': 'پایه کاملا سفید با خطوط معماری با کنتراست بالا. بهینه‌شده برای بوک‌مارک‌های صفحه اصلی موبایل در حالت روشن و بسته‌بندی محصولات.',
    'Single-color pure black on transparent. Specifically tailored for laser etching on aluminum network server racks, hardware faceplates, and thermal print.': 'تک‌رنگ مشکی خالص روی پس‌زمینه شفاف. به‌طور خاص برای حکاکی لیزری روی رک‌های آلومینیومی سرور شبکه، پنل‌های جلوی سخت‌افزار و چاپ حرارتی طراحی شده است.',
    'Single-color pure white on transparent. Essential for video watermarking, engineering photography overlays, and embroidery on dark uniforms.': 'تک‌رنگ سفید خالص روی پس‌زمینه شفاف. ضروری برای واترمارک ویدیوها، درج روی تصاویر عکاسی مهندسی و گلدوزی روی لباس‌های فرم تیره.',
    'Landscape 1.91:1 banner for link unfurls across LinkedIn, Twitter/X, Discord, Slack, and press article feature graphics.': 'بنر افقی ۱.۹۱:۱ برای پیش‌نمایش لینک در لینکدین، توییتر/X، دیسکورد، اسلک و گرافیک مقالات مطبوعاتی.',
    'Vertical 9:16 composition for Instagram Stories, WhatsApp status, mobile presentation splash cards, and conference totems.': 'ترکیب عمودی ۹:۱۶ برای استوری‌های اینستاگرام، وضعیت واتس‌اپ، کارت‌های شروع ارائه‌های موبایل و بنرهای ایستاده کنفرانس‌ها.',
    'بنر افقی ۱۲۰۰×۶۳۰ راست‌چین با خط وزیرمتن، شامل حوزه‌های هوشمندسازی، فیبر نوری، سرور، امنیت فیزیکی و تأمین تجهیزات IT.': 'بنر افقی ۱۲۰۰×۶۳۰ راست‌چین با خط وزیرمتن، شامل حوزه‌های هوشمندسازی، فیبر نوری، سرور، امنیت فیزیکی و تأمین تجهیزات IT.',
    'Click any color block to copy its hex value directly to your clipboard. Our palette is built on deep obsidian chassis with vibrant optical signal highlights.': 'روی هر بلوک رنگی کلیک کنید تا مقدار هگز آن مستقیماً در کلیپ‌بورد کپی شود. پالت ما بر روی بدنه‌های ابسیدین عمیق با هایلایت‌های سیگنال نوری پرطراوت بنا شده است.',
    'Base chassis canvas representing physical server racks and modern dark architecture.': 'بوم شاسی پایه که نشان‌دهنده رک‌های فیزیکی سرور و معماری مدرن تیره است.',
    'Elevated panel layer for cards, badges, and component frames with subtle visual depth.': 'لایه پنل برجسته برای کارت‌ها، بج‌ها و قاب‌های اجزا با عمق بصری ملایم.',
    'Structural path color and crisp primary typography with soft warmth to prevent eye fatigue.': 'رنگ مسیر ساختاری و تایپوگرافی واضح اصلی با گرمای ملایم برای جلوگیری از خستگی چشم.',
    'Active optical signal accent, representing fiber optic wavelengths and live network flow.': 'تاکید سیگنال نوری فعال، که نشان‌دهنده طول موج فیبر نوری و جریان شبکه زنده است.',
    'Gradient terminal anchor, representing system vitality and energy-efficient automation.': 'گرادیان نقطه‌های پایانی ترمینال، نمایانگر سرزندگی سیستم و اتوماسیون بهینه در مصرف انرژی.',
    'Precision dividers and schematic grid lines framing technical panels and UI containers.': 'جداکننده‌های دقیق و خطوط شبکه شماتیک که پنل‌های فنی و کانتینرهای رابط کاربری را قاب می‌کنند.',
    'Balanced typography pairing high-precision Latin geometric headings with elegant modern Persian typography and monospace engineering data specs.': 'تایپوگرافی متوازن که سرتیترهای هندسی لاتین با دقت بالا را با تایپوگرافی مدرن و ظریف فارسی و مشخصات داده‌های مهندسی تک‌عرض (Monospace) جفت می‌کند.',
    'Brand &amp; Identity System | Novand | نُوَند': 'سیستم برند و هویت بصری | Novand | نُوَند',
    'Design System · Brand Guidelines · Master Kit v2.4': 'سیستم طراحی · دستورالعمل‌های برند · کیت اصلی نسخه ۲.۴',
    'Brand Color Palette &amp; Tokens': 'پالت رنگ برند و متغیرها',
    'Explore Logo Assets': 'بررسی دارایی‌های لوگو',
    'Download Brand Pack (.ZIP 1.2 MB)': 'دانلود فایل‌های برند (.ZIP 1.2 MB)',
    'Download Complete Brand Kit (.ZIP)': 'دانلود بسته کامل برند (.ZIP)',
    'All Formats': 'همه فرمت‌ها',
    'Wordmarks &amp; Lockups': 'نشان‌واره‌ها و ترکیب‌بندی‌ها',
    'Monomarks &amp; Badges': 'مونو-مارک‌ها و نشان‌ها',
    'Social &amp; Media': 'شبکه‌های اجتماعی و رسانه‌ها',
    'Monochrome &amp; Print': 'تک‌رنگ و چاپ',
    'The ساختار of the Monogram': 'ساختار مونوگرام',
    'Converged Digital Flow.': 'جریان دیجیتال همگرا.',
    'Clearspace &amp; Brand Usage Rules': 'قوانین فضای امن و استفاده از برند',
    'Architectural Precision.': 'دقت معماری.',
    'SCALE: 1:1 MASTER': 'مقیاس: 1:1 مرجع',
    'SCALE: 1080x1080 · D65-RGB': 'مقیاس: 1080x1080 · D65-RGB',
    'Dark Mode': 'حالت تیره',
    'Light Mode': 'حالت روشن',
    'Download 1200×630 PNG': 'دانلود 1200×630 PNG',
    'Download 1080×1920 PNG': 'دانلود 1080×1920 PNG',
    'Download SVG': 'دانلود SVG',
    'Logomarks &amp; Extended Lockups': 'نشان‌واره‌ها و ترکیب‌های بسط‌یافته',
    'INTEGRATED TECH &amp; INFRASTRUCTURE': 'فناوری‌های یکپارچه و زیرساخت',
    'VLAN: 4096 · STATUS: OK': 'VLAN: 4096 · وضعیت: تایید',
    'FTTH-TRUNK // 10G-SFP+': 'FTTH-TRUNK // 10G-SFP+',
    'Square Dark': 'مربع تیره',
    'Square Light': 'مربع روشن',
    'Centered 1:1': 'مرکزی 1:1',
    'Centered Light': 'مرکزی روشن',
    'Transparent': 'شفاف',
    'PNG (Raster)': 'PNG (رستر)',
    'SVG (Vector)': 'SVG (وکتور)',
    'All rights reserved. Engineering specifications subject to physical site constraints.': 'تمامی حقوق محفوظ است. مشخصات مهندسی منوط به محدودیت‌های فیزیکی سایت می‌باشد.'
}

with open('src/pages/brand.astro', 'r', encoding='utf-8') as f:
    content = f.read()

for eng, per in replacements.items():
    content = content.replace(f'>{eng}<', f'>{per}<')
    content = content.replace(f'{eng}', f'{per}')

with open('src/pages/brand.astro', 'w', encoding='utf-8') as f:
    f.write(content)
