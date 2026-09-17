import re

with open('src/pages/contact.astro', 'r', encoding='utf-8') as f:
    content = f.read()

def fix_textarea(m):
    return f'data-fs-field></textarea>\n                <span data-fs-error="{m.group(1)}" class="text-xs text-red-400 font-mono mt-1 block empty:hidden"></span>'

content = re.sub(r'data-fs-field>\s*<span data-fs-error="([^"]+)"[^>]+></span></textarea>', fix_textarea, content)

spans_to_move = re.findall(r'<select[^>]+name="([^"]+)"[^>]*>.*?<span data-fs-error="\1"[^>]*></span>.*?</select>', content, flags=re.DOTALL)
for name in spans_to_move:
    span_str = f'                <span data-fs-error="{name}" class="text-xs text-red-400 font-mono mt-1 block empty:hidden"></span>'
    content = content.replace(span_str, '')
    content = re.sub(rf'(<select[^>]+name="{name}"[^>]*>.*?</select>)', rf'\1\n{span_str}', content, flags=re.DOTALL)

with open('src/pages/contact.astro', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patch 2 applied")
