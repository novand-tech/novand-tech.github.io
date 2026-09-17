import os

replacements = {
    'Equipment distributors and manufacturer sales teams are incentivized to sell whatever product has the highest margin or aging warehouse inventory. This routinely results in over-provisioned chassis, proprietary feature lock-in, or under-powered switches that lack adequate PoE budgets for future security expansions.': 'توزیع‌کنندگان تجهیزات و تیم‌های فروش سازندگان معمولاً انگیزه دارند تا محصولاتی را با بالاترین حاشیه سود یا موجودی قدیمی انبار به فروش برسانند. این امر اغلب به طراحی‌های فراتر از نیاز، وابستگی به ویژگی‌های انحصاری، یا سوئیچ‌های ضعیفی که بودجه توان PoE کافی برای توسعه‌های امنیتی آینده ندارند، منجر می‌شود.',
    'Novand operates as an independent technical advocate. We calculate switching backplanes, packet per second (pps) throughput, thermal loads, and storage write-endurance directly against your operational requirements.': 'نوند به عنوان یک مدافع فنی مستقل عمل می‌کند. ما ظرفیت سوئیچینگ، توان عملیاتی بسته‌ها در ثانیه (pps)، بارهای حرارتی و مقاومت خواندن/نوشتن ذخیره‌سازی را مستقیماً بر اساس نیازهای عملیاتی شما محاسبه می‌کنیم.'
}

with open('src/pages/consulting.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/consulting.astro', 'w', encoding='utf-8') as f:
    f.write(content)
