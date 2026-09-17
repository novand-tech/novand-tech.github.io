import os

replacements = {
    'Facility Solutions & Environments | Novand': 'راهکارها و محیط‌های اجرایی | Novand',
    'Engineered technology solutions designed around physical architecture and operational demands across Business, Education, Residential, Healthcare, Hospitality, and Specialized Facilities.': 'راهکارهای مهندسی فناوری بر اساس معماری فیزیکی و نیازهای عملیاتی در حوزه‌های تجاری، آموزشی، مسکونی، درمانی، اقامتی و تاسیسات خاص.',
    'Solutions': 'راهکارها',
    'Environmental Architectures': 'معماری محیطی',
    'Technology Systems Adapted to Facility Realities': 'انطباق سیستم‌های فناوری با واقعیت‌های محیط',
    'A high-density office requires vastly different cabling and RF planning than an acoustic auditorium, an electromagnetic hospital wing, or an industrial cold-storage warehouse. We design around your building\'s physical constraints.': 'یک دفتر کاری با تراکم بالا به برنامه‌ریزی کابل‌کشی و امواج RF کاملاً متفاوتی نسبت به یک سالن آکوستیک، بخش بیمارستانی یا سردخانه صنعتی نیاز دارد. ما طراحی‌ها را دقیقاً بر اساس محدودیت‌های فیزیکی ساختمان شما انجام می‌دهیم.',
    'Architectural Considerations': 'ملاحظات معماری',
    'Environmental Comparison Matrix': 'ماتریس مقایسه محیطی',
    'Understanding how environmental factors dictate cabling choices, wireless propagation models, and equipment enclosures.': 'درک چگونگی تاثیر عوامل محیطی بر انتخاب نوع کابل‌کشی، مدل‌های انتشار بی‌سیم و رک‌های تجهیزات.',
    'Acoustic & Aesthetic': 'آکوستیک و زیبایی‌شناسی',
    'Residential, executive suites, and boutique hospitality environments mandate invisible infrastructure: concealed cable pathways, flush-mount architectural speakers, silent passive cooling, and discreet tactile keypad interfaces.': 'محیط‌های مسکونی، سوئیت‌های مدیریتی و هتل‌های بوتیک نیازمند زیرساخت‌های نامرئی هستند: مسیرهای کابل‌کشی مخفی، اسپیکرهای توکار معماری، خنک‌کننده‌های بدون صدا (پسیو) و کیبوردهای لمسی ظریف.',
    'Density & Roaming': 'تراکم و رومینگ',
    'Higher education campuses and enterprise offices face high-density client contention and rapid AP roaming. We engineer 5GHz/6GHz micro-cell coverage models with 802.11k/v/r fast transitions.': 'پردیس‌های دانشگاهی و دفاتر سازمانی با تراکم بالای کاربران و رومینگ سریع اکسس‌پوینت‌ها مواجه‌اند. ما مدل‌های پوشش مایکرو-سلول 5GHz/6GHz را با انتقال سریع 802.11k/v/r مهندسی می‌کنیم.',
    'Thermal & Harsh Industrial': 'محیط‌های حرارتی و صنعتی سخت',
    'Data centers, distribution centers, and mechanical rooms experience airborne particulate, wide temperature deltas, and heavy vibration. We specify NEMA/IP-rated enclosures, ruggedized switches, and armored fiber.': 'مراکز داده، مراکز توزیع و اتاق‌های مکانیکی با ذرات معلق، نوسانات شدید دمایی و لرزش بالا روبه‌رو هستند. ما از رک‌های دارای استاندارد NEMA/IP، سوئیچ‌های صنعتی مقاوم و فیبرهای زره‌دار (Armored) استفاده می‌کنیم.',
    'Discuss Your Specific Facility Requirements': 'درباره نیازهای خاص تاسیسات خود گفتگو کنید',
    'Our engineers can conduct site surveys and review MEP (mechanical, electrical, plumbing) drawings to ensure seamless technology coordination.': 'مهندسین ما می‌توانند بازدیدهای میدانی انجام داده و نقشه‌های تاسیساتی (مکانیکی، الکتریکی، لوله‌کشی) را برای هماهنگی یکپارچه فناوری بررسی کنند.',
    'Request a Consultation': 'درخواست مشاوره',
}

with open('src/pages/solutions/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/solutions/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)
