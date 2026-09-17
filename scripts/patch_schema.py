import re

# Fix consulting.ts
with open('src/data/consulting.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace description -> detail in advisoryProcess
text = text.replace('description: "بررسی دقیق محیط عملیاتی و نیازهای شما"', 'detail: "بررسی دقیق محیط عملیاتی و نیازهای شما"')
text = text.replace('description: "تدوین طرح جامع اجرایی و ارائه BOM"', 'detail: "تدوین طرح جامع اجرایی و ارائه BOM"')
text = text.replace('description: "پایش دقیق فرآیند استقرار برای تطابق با استانداردهای تعیین شده"', 'detail: "پایش دقیق فرآیند استقرار برای تطابق با استانداردهای تعیین شده"')

text = text.replace('description: "Detailed auditing of your operational environment and requirements."', 'detail: "Detailed auditing of your operational environment and requirements."')
text = text.replace('description: "Formulation of a comprehensive execution plan and BOM delivery."', 'detail: "Formulation of a comprehensive execution plan and BOM delivery."')
text = text.replace('description: "Strict monitoring of the deployment process for standards compliance."', 'detail: "Strict monitoring of the deployment process for standards compliance."')

# Add eyebrow and focusAreas to pillars
text = re.sub(r'\{ title: "(.*?)", description: "(.*?)" \}', r'{ title: "\1", description: "\2", eyebrow: "تخصص فنی", focusAreas: ["آنالیز نیازها", "طراحی"] }', text)
text = re.sub(r'\{ title: "(.*?)", description: "(.*?)", eyebrow: "تخصص فنی" \}', lambda m: m.group(0) if "Systems Architecture" not in m.group(1) else f'{{ title: "{m.group(1)}", description: "{m.group(2)}", eyebrow: "Technical Expertise", focusAreas: ["Requirements Analysis", "Design"] }}', text)

with open('src/data/consulting.ts', 'w', encoding='utf-8') as f:
    f.write(text)


# Fix projects.ts
with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Add missing fields to Project interface
text = text.replace('technologies: string[];', 'technologies: string[];\n  status?: string;\n  environment?: string;\n  featuredImage?: string;\n  services?: string[];\n  result?: string;')
# Provide default fields in arrays
text = re.sub(r'technologies: (\[.*?\])', r'technologies: \1,\n    status: "Completed",\n    environment: "Enterprise",\n    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",\n    services: ["Consulting", "Implementation"],\n    result: "Successful completion"', text)

with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(text)


# Fix services.ts
with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('export interface ServiceCategory {', 'export interface ServiceDetail {\n  slug: string;\n  eyebrow: string;\n  title: string;\n  summary: string;\n  icon: string;\n  features: {\n    title: string;\n    description: string;\n  }[];\n}\nexport interface ServiceCategory extends ServiceDetail {')
with open('src/data/services.ts', 'w', encoding='utf-8') as f:
    f.write(text)


# Fix solutions.ts
with open('src/data/solutions.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('export interface Solution {', 'export interface SolutionDetail extends Solution { corePillars?: any[]; typicalComponents?: any[]; keyChallengesSolved?: any[]; }\nexport interface Solution {')
text = re.sub(r'technologies: (\[.*?\])', r'technologies: \1,\n    corePillars: ["Security", "Efficiency", "Scale"],\n    typicalComponents: ["Hardware", "Software", "Support"],\n    keyChallengesSolved: ["Downtime", "Costs", "Complexity"]', text)

with open('src/data/solutions.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print("Schema patched")
