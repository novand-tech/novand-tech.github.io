import re
def process_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'const isEn = Astro.url.pathname.startsWith("/en");' not in content:
        content = content.replace('---', '---\nconst isEn = Astro.url.pathname.startsWith("/en");', 2)
    for eng, per in replacements.items():
        if isinstance(eng, str):
            content = content.replace(eng, f"{{isEn ? '{eng}' : '{per}'}}")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

reps_solutions = {
    'Target Environments': 'محیط‌های هدف',
    'Solutions Tailored to Operating Realities': 'راهکارهای متناسب با واقعیت‌های عملیاتی',
    'Every facility imposes distinct acoustic, RF, physical, and regulatory constraints. We adapt our engineering standards directly to your operational environment.': 'هر محیط، محدودیت‌های آکوستیک، فرکانسی، فیزیکی و قانونی خاص خود را دارد. ما استانداردهای مهندسی خود را به طور مستقیم با محیط عملیاتی شما تطبیق می‌دهیم.',
    'Explore All Environments &rarr;': 'بررسی همه محیط‌ها &larr;',
}
process_file('src/components/sections/SolutionsSection.astro', reps_solutions)

reps_services = {
    'Core Disciplines': 'حوزه‌های اصلی',
    'Engineered Systems Across the Technology Stack': 'سیستم‌های مهندسی در لایه‌های مختلف فناوری',
    'From smart home automation and enterprise networking to physical security and hardware maintenance, our team delivers unified, end-to-end technology solutions.': 'از اتوماسیون خانه‌های هوشمند و شبکه‌های سازمانی تا امنیت فیزیکی و پشتیبانی سخت‌افزار، تیم ما راهکارهای فناوری یکپارچه و جامع ارائه می‌دهد.',
    'View All Services & Specifications &rarr;': 'مشاهده همه خدمات و مشخصات &larr;',
    'Direct Supply & Consulting:': 'تامین مستقیم و مشاوره:',
    'Need help sourcing enterprise hardware, networking tools, or smart home controllers? We procure genuine equipment at competitive pricing.': 'آیا برای تامین سخت‌افزار سازمانی، تجهیزات شبکه یا کنترل‌کننده‌های خانه هوشمند به کمک نیاز دارید؟ ما تجهیزات اصلی را با قیمت رقابتی تامین می‌کنیم.',
    'Request Equipment Procurement &rarr;': 'درخواست تامین تجهیزات &larr;',
}
process_file('src/components/sections/CoreServicesSection.astro', reps_services)

