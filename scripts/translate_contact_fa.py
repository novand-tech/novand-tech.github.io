import os

replacements = {
    'Direct Engineering Access': 'دسترسی مستقیم مهندسی',
    'Initiate an مشاوره زیرساخت': 'درخواست مشاوره زیرساخت',
    'Whether you are evaluating low-voltage cabling options, planning an on-premises hypervisor cluster, or integrating commercial access control, our engineers will provide straightforward technical guidance.': 'چه در حال ارزیابی گزینه‌های کابل‌کشی جریان ضعیف باشید، چه برنامه‌ریزی برای کلاستر هایپروایزر محلی، یا یکپارچه‌سازی سیستم کنترل تردد تجاری، مهندسان ما راهنمایی‌های فنی صریح و کاربردی ارائه می‌دهند.',
    'Technical Inquiry & Project Scoping Form': 'فرم درخواست فنی و تعریف محدوده پروژه',
    'All inquiries are reviewed directly by practicing systems engineers.': 'تمامی درخواست‌ها مستقیماً توسط مهندسان سیستم شاغل بررسی می‌شوند.',
    'Please complete all required fields marked with an asterisk (*).': 'لطفاً تمامی فیلدهای الزامی که با ستاره (*) مشخص شده‌اند را تکمیل کنید.',
    'Your project details have been logged into our engineering dispatch queue. A systems engineer will respond within one business day.': 'جزئیات پروژه شما در صف ارجاع مهندسی ما ثبت شد. یک مهندس سیستم ظرف یک روز کاری با شما تماس خواهد گرفت.',
    'Organization / Facility': 'سازمان / تاسیسات',
    'Work Email': 'ایمیل کاری',
    'Primary Discipline': 'حوزه اصلی مورد نیاز',
}

with open('src/pages/contact.astro', 'r', encoding='utf-8') as f:
    content = f.read()
    
for eng, per in replacements.items():
    content = content.replace(eng, per)
    
with open('src/pages/contact.astro', 'w', encoding='utf-8') as f:
    f.write(content)
