import re

with open('src/layouts/ServiceLayout.astro', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('service.relatedServices.includes', '(service.relatedServices || []).includes')
text = text.replace('service.features.map', '(service.features || []).map')

with open('src/layouts/ServiceLayout.astro', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/layouts/SolutionLayout.astro', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('solution.corePillars.map', '(solution.corePillars || []).map')
text = text.replace('solution.typicalComponents.map', '(solution.typicalComponents || []).map')
text = text.replace('solution.keyChallengesSolved.map', '(solution.keyChallengesSolved || []).map')
text = text.replace('solution.technologies.map', '(solution.technologies || []).map')

with open('src/layouts/SolutionLayout.astro', 'w', encoding='utf-8') as f:
    f.write(text)

