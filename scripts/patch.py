import re

with open('src/pages/contact.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update form error and success containers
content = content.replace(
    '<div id="form-error" class="hidden p-4 bg-red-950/40 border border-red-800 text-xs font-mono text-red-300" role="alert">',
    '<div id="form-error" data-fs-error class="hidden p-4 bg-red-950/40 border border-red-800 text-xs font-mono text-red-300" role="alert">'
)

content = content.replace(
    '<div id="form-feedback" class="hidden p-4 bg-[#15120e] border border-[#f4f2f1]/30 text-xs font-mono text-[#f4f2f1]" role="alert">',
    '<div id="form-feedback" data-fs-success class="hidden p-4 bg-[#15120e] border border-[#f4f2f1]/30 text-xs font-mono text-[#f4f2f1]" role="alert">'
)

# 2. Add data-fs-field to inputs, selects, textareas and append the error span
# We can find each name="<name>" and replace the tag closing /> or > with data-fs-field />
def inject_data_fs(match):
    tag = match.group(0)
    name = re.search(r'name="([^"]+)"', tag).group(1)
    
    # Add data-fs-field
    if tag.endswith('/>'):
        tag = tag[:-2] + ' data-fs-field />'
    else:
        tag = tag[:-1] + ' data-fs-field>'
        
    error_span = f'\n                <span data-fs-error="{name}" class="text-xs text-red-400 font-mono mt-1 block empty:hidden"></span>'
    return tag + error_span

# find input, select, textarea with name="<name>"
content = re.sub(r'<input[^>]+name="[^"]+"[^>]*>', inject_data_fs, content)
content = re.sub(r'<select[^>]+name="[^"]+"[^>]*>', inject_data_fs, content)
content = re.sub(r'<textarea[^>]+name="[^"]+"[^>]*>', inject_data_fs, content)

# 3. Add data-fs-submit-btn to Button
content = content.replace(
    '<Button type="submit" variant="primary" size="lg" class="w-full" id="submit-btn">',
    '<Button type="submit" variant="primary" size="lg" class="w-full" id="submit-btn" data-fs-submit-btn>'
)

# 4. Replace script block
new_script = """<script>
  import { initForm } from '@formspree/ajax';
  initForm({ formElement: '#contact-form', formId: 'xgaenjbn' });
</script>"""

content = re.sub(r'<script>.*?</script>', new_script, content, flags=re.DOTALL)

with open('src/pages/contact.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched successfully")
