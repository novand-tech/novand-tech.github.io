import re

with open('src/layouts/ServiceLayout.astro', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('service.specifications.map', '(service.specifications || []).map')
text = text.replace('service.whatWeProvide.map', '(service.whatWeProvide || []).map')
text = text.replace('service.detailedCapabilities.map', '(service.detailedCapabilities || []).map')
text = text.replace('cap.points.map', '(cap.points || []).map')
text = text.replace('service.applications.map', '(service.applications || []).map')
text = text.replace('relatedServices.map', '(relatedServices || []).map')
text = text.replace('service.process.map', '(service.process || []).map')
text = text.replace('service.features.map', '(service.features || []).map')

with open('src/layouts/ServiceLayout.astro', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/layouts/SolutionLayout.astro', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('solution.challenges.map', '(solution.challenges || []).map')
text = text.replace('solution.approach.map', '(solution.approach || []).map')

with open('src/layouts/SolutionLayout.astro', 'w', encoding='utf-8') as f:
    f.write(text)

