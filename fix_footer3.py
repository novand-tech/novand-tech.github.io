with open('src/components/layout/Footer.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("get{isEn ? 'Solutions' : 'راهکارها'}Data", "getSolutionsData")
content = content.replace("get{isEn ? 'Services' : 'خدمات'}Data", "getServicesData")
content = content.replace("get{isEn ? 'Company' : 'شرکت'}Data", "getCompanyData")
content = content.replace("{isEn ? 'Company' : 'شرکت'}Data.", "companyData.")

with open('src/components/layout/Footer.astro', 'w', encoding='utf-8') as f:
    f.write(content)
