import re
def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("import { consultingData } from '../../data/consulting';", "import { getConsultingData } from '../../data/consulting';")
    content = content.replace("---", "---\nconst consultingData = getConsultingData(Astro.url.pathname);", 2)
    # The first one might be duplicate if I already injected isEn. Let's just do a regex replace.
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('src/components/sections/ConsultingTeaser.astro')
