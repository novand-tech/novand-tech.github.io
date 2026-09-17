import os

replacements = {
    'Schedule an Advisory Call': 'درخواست مشاوره',
    'Explore Advisory Domains &darr;': 'بررسی حوزه‌های مشاوره ↓',
    'The Danger of Vendor Sales Reps': 'خطر وابستگی به نمایندگان فروش',
    'Specification Driven by Engineering Math, Not Sales Quotas': 'تعیین مشخصات بر اساس مهندسی، نه سهمیه فروش',
    'Most IT hardware today is sold through channel partners heavily incentivized by margins and proprietary recurring licenses. This often results in "over-engineering for the sake of sales" or "under-engineering to win a low-bid."': 'بیشتر سخت‌افزارهای IT امروزه از طریق واسطه‌هایی به فروش می‌رسند که انگیزه‌های زیادی برای سودآوری و لایسنس‌های انحصاری دارند. این امر غالباً منجر به "فروش تجهیزات مازاد" یا "افت کیفیت برای برنده شدن در مناقصه" می‌شود.',
    'We decouple architectural design from hardware sales. Our advisory mandates are focused solely on ensuring the equipment specified matches your exact technical requirements and budget realities.': 'ما طراحی معماری را از فروش سخت‌افزار جدا می‌کنیم. تمرکز مشاوره‌های ما صرفاً بر این است که تجهیزات تعیین‌شده دقیقاً با نیازهای فنی و واقعیت‌های بودجه شما تطابق داشته باشد.',
    'Ensuring fanless or active cooling matches enclosure ambient temps.': 'اطمینان از تطابق خنک‌کننده (اکتیو/پسیو) با دمای محیط رک.',
    'Factoring in mandatory renewals, license tiers, and maintenance contracts.': 'محاسبه تمدیدهای اجباری، سطوح لایسنس و قراردادهای پشتیبانی.',
    'Hardware Lifecycle Horizon:': 'افق چرخه عمر سخت‌افزار:',
    'Operating Temperature Windows:': 'بازه دمای عملیاتی:',
    'Preventing vendor lock-out codes on optical SFP+ / QSFP28 modules.': 'جلوگیری از قفل‌شدگی ماژول‌های نوری (SFP+ / QSFP28) توسط برندها.',
    'Total Cost of Ownership (TCO):': 'هزینه کل مالکیت (TCO):',
    'Transceiver Interoperability:': 'سازگاری فرستنده‌گیرنده‌ها:',
    'Verification of vendor EOL/EOS roadmaps.': 'بررسی نقشه‌راه پایان تولید/پشتیبانی (EOL/EOS) سازنده.',
}

with open('src/pages/consulting.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/consulting.astro', 'w', encoding='utf-8') as f:
    f.write(content)
