import re

# fix Header.astro
with open('src/components/layout/Header.astro', 'r', encoding='utf-8') as f:
    content = f.read()

new_navLinks = """
const isEn = currentPath.startsWith('/en');

const navLinks = isEn ? [
  { label: 'Projects', href: '/en/projects' },
  { label: 'About', href: '/en/about' },
  { label: 'Consulting', href: '/en/consulting' },
  { label: 'Contact', href: '/en/contact' },
] : [
  { label: 'پروژه‌ها', href: '/projects' },
  { label: 'درباره ما', href: '/about' },
  { label: 'مشاوره', href: '/consulting' },
  { label: 'تماس', href: '/contact' },
];
"""
content = re.sub(r'const navLinks = \[\s+.*?\];', new_navLinks, content, flags=re.DOTALL)

content = content.replace("Integrated Tech & Infrastructure", "{isEn ? 'Integrated Tech & Infrastructure' : 'فناوری یکپارچه و زیرساخت'}")
content = content.replace("<span>Services</span>", "<span>{isEn ? 'Services' : 'خدمات'}</span>")
content = content.replace("Core Engineering Disciplines", "{isEn ? 'Core Engineering Disciplines' : 'حوزه‌های مهندسی'}")
content = content.replace("View All Services &rarr;", "{isEn ? 'View All Services &rarr;' : 'مشاهده همه خدمات &larr;'}")

content = content.replace("<span>Solutions</span>", "<span>{isEn ? 'Solutions' : 'راهکارها'}</span>")
content = content.replace("By Facility Environment", "{isEn ? 'By Facility Environment' : 'بر اساس محیط'}")
content = content.replace("All Solutions &rarr;", "{isEn ? 'All Solutions &rarr;' : 'همه راهکارها &larr;'}")

content = content.replace("Technical Inquiries", "{isEn ? 'Technical Inquiries' : 'سوالات فنی'}")
content = content.replace("Request Consultation", "{isEn ? 'Request Consultation' : 'درخواست مشاوره'}")
content = content.replace("Consultation", "{isEn ? 'Consultation' : 'مشاوره'}")
content = content.replace("Overview of Services", "{isEn ? 'Overview of Services' : 'مروری بر خدمات'}")
content = content.replace("Overview of Solutions", "{isEn ? 'Overview of Solutions' : 'مروری بر راهکارها'}")

content = content.replace("Projects & Case Models", "{isEn ? 'Projects & Case Models' : 'پروژه‌ها و نمونه‌ها'}")
content = content.replace("About & Methodology", "{isEn ? 'About & Methodology' : 'درباره و متدولوژی'}")
content = content.replace("Equipment Advisory & Consulting", "{isEn ? 'Equipment Advisory & Consulting' : 'مشاوره و تامین تجهیزات'}")
content = content.replace("Contact & Operations", "{isEn ? 'Contact & Operations' : 'تماس و عملیات'}")

content = content.replace('href="/services"', 'href={isEn ? "/en/services" : "/services"}')
content = content.replace('href={`/services/${service.slug}`}', 'href={isEn ? `/en/services/${service.slug}` : `/services/${service.slug}`}')
content = content.replace('href="/solutions"', 'href={isEn ? "/en/solutions" : "/solutions"}')
content = content.replace('href={`/solutions/${solution.slug}`}', 'href={isEn ? `/en/solutions/${solution.slug}` : `/solutions/${solution.slug}`}')
content = content.replace('href="/projects"', 'href={isEn ? "/en/projects" : "/projects"}')
content = content.replace('href="/about"', 'href={isEn ? "/en/about" : "/about"}')
content = content.replace('href="/consulting"', 'href={isEn ? "/en/consulting" : "/consulting"}')
content = content.replace('href="/contact"', 'href={isEn ? "/en/contact" : "/contact"}')
content = content.replace('href="/contact#consultation"', 'href={isEn ? "/en/contact#consultation" : "/contact#consultation"}')

with open('src/components/layout/Header.astro', 'w', encoding='utf-8') as f:
    f.write(content)

# fix Footer.astro
with open('src/components/layout/Footer.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('const companyData = getCompanyData(Astro.url.pathname);', 'const companyData = getCompanyData(Astro.url.pathname);\nconst isEn = Astro.url.pathname.startsWith("/en");', 1)
content = content.replace('Architecture · Systems · Infrastructure', "{isEn ? 'Architecture · Systems · Infrastructure' : 'معماری · سیستم‌ها · زیرساخت'}")

content = content.replace("Company", "{isEn ? 'Company' : 'شرکت'}")
content = content.replace("About Novand", "{isEn ? 'About Novand' : 'درباره نوند'}")
content = content.replace("Our Approach & Process", "{isEn ? 'Our Approach & Process' : 'رویکرد و فرآیند ما'}")
content = content.replace("Projects & Case Models", "{isEn ? 'Projects & Case Models' : 'پروژه‌ها و نمونه‌ها'}")
content = content.replace("Equipment Advisory", "{isEn ? 'Equipment Advisory' : 'مشاوره تجهیزات'}")
content = content.replace("Brand & Identity Kit", "{isEn ? 'Brand & Identity Kit' : 'برند و هویت بصری'}")
content = content.replace("Request Consultation", "{isEn ? 'Request Consultation' : 'درخواست مشاوره'}")
content = content.replace("Services", "{isEn ? 'Services' : 'خدمات'}")
content = content.replace("Solutions", "{isEn ? 'Solutions' : 'راهکارها'}")

content = content.replace("Telephone", "{isEn ? 'Telephone' : 'تلفن'}")
content = content.replace("Engineering Mail", "{isEn ? 'Engineering Mail' : 'ایمیل مهندسی'}")
content = content.replace("Facility Location", "{isEn ? 'Facility Location' : 'آدرس مرکز'}")
content = content.replace("Standard Operations", "{isEn ? 'Standard Operations' : 'ساعات کاری'}")
content = content.replace("All rights reserved. Engineering specifications subject to physical site constraints.", "{isEn ? 'All rights reserved. Engineering specifications subject to physical site constraints.' : 'تمامی حقوق محفوظ است. مشخصات مهندسی منوط به محدودیت‌های فیزیکی سایت می‌باشد.'}")

content = content.replace('href="/services"', 'href={isEn ? "/en/services" : "/services"}')
content = content.replace('href={`/services/${service.slug}`}', 'href={isEn ? `/en/services/${service.slug}` : `/services/${service.slug}`}')
content = content.replace('href="/solutions"', 'href={isEn ? "/en/solutions" : "/solutions"}')
content = content.replace('href={`/solutions/${solution.slug}`}', 'href={isEn ? `/en/solutions/${solution.slug}` : `/solutions/${solution.slug}`}')
content = content.replace('href="/projects"', 'href={isEn ? "/en/projects" : "/projects"}')
content = content.replace('href="/about"', 'href={isEn ? "/en/about" : "/about"}')
content = content.replace('href="/about#approach"', 'href={isEn ? "/en/about#approach" : "/about#approach"}')
content = content.replace('href="/consulting"', 'href={isEn ? "/en/consulting" : "/consulting"}')
content = content.replace('href="/contact"', 'href={isEn ? "/en/contact" : "/contact"}')
content = content.replace('href="/brand"', 'href={isEn ? "/en/brand" : "/brand"}')

with open('src/components/layout/Footer.astro', 'w', encoding='utf-8') as f:
    f.write(content)

