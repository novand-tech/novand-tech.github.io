with open('src/components/layout/Footer.astro', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('---const solutionsData', '---\nconst solutionsData')
text = text.replace('getSolutionsData(Astro.url.pathname);const servicesData', 'getSolutionsData(Astro.url.pathname);\nconst servicesData')
text = text.replace('getServicesData(Astro.url.pathname);const companyData', 'getServicesData(Astro.url.pathname);\nconst companyData')
text = text.replace('getCompanyData(Astro.url.pathname);const isEn', 'getCompanyData(Astro.url.pathname);\nconst isEn')
text = text.replace('startsWith("/en");import', 'startsWith("/en");\nimport')

with open('src/components/layout/Footer.astro', 'w', encoding='utf-8') as f:
    f.write(text)
