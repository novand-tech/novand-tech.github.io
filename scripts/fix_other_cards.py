import re

with open('src/components/cards/ProjectCard.astro', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace('project.technologies.slice', '(project.technologies || []).slice')
with open('src/components/cards/ProjectCard.astro', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/components/cards/SolutionCard.astro', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace('solution.corePillars.slice', '(solution.corePillars || []).slice')
text = text.replace('solution.keyChallengesSolved.slice', '(solution.keyChallengesSolved || []).slice')
text = text.replace('solution.technologies.slice', '(solution.technologies || []).slice')
with open('src/components/cards/SolutionCard.astro', 'w', encoding='utf-8') as f:
    f.write(text)

