import os

replacements = {
    'Independent Due Diligence Checklist': 'چک‌لیست ارزیابی و بررسی مستقل',
    'Advisory Scope': 'حوزه‌های مشاوره',
    'Equipment Selection Disciplines': 'حوزه‌های تخصصی انتخاب تجهیزات',
    'We evaluate specifications across the full physical and logical technology infrastructure stack.': 'ما مشخصات تجهیزات را در تمامی لایه‌های فیزیکی و منطقی زیرساخت فناوری ارزیابی می‌کنیم.',
    'Evaluated Engineering Metrics:': 'شاخص‌های مهندسی ارزیابی‌شده:',
    'Consulting Workflow': 'فرآیند مشاوره',
    'The Technical Advisory Process': 'فرآیند مشاوره فنی',
    'How we guide procurement teams and facility executives from blank slate to verified bill of materials.': 'چگونگی هدایت تیم‌های تدارکات و مدیران تاسیسات از نقطه شروع تا رسیدن به یک لیست دقیق و تاییدشده تجهیزات (BOM).',
    'فاز // AUDIT': 'فاز // AUDIT',
    'Review Your Equipment Bill of Materials Before Purchasing': 'بررسی پیش‌فاکتور و لیست تجهیزات پیش از خرید',
    'Send us your architectural specifications, vendor quotes, or equipment schedules for an independent technical sanity check.': 'مشخصات معماری، پیش‌فاکتور فروشندگان، یا جدول زمان‌بندی تجهیزات خود را برای بررسی و ارزیابی فنی و مستقل برای ما ارسال کنید.',
    'Request an Equipment Advisory Review': 'درخواست بررسی مشاوره تجهیزات',
}

with open('src/pages/consulting.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/consulting.astro', 'w', encoding='utf-8') as f:
    f.write(content)
