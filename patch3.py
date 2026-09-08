import re

with open('src/pages/contact.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the script block with the CDN approach
new_script = """<script is:inline>
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#contact-form', formId: 'xgaenjbn' });
</script>
<script src="https://unpkg.com/@formspree/ajax@1" defer is:inline></script>"""

content = re.sub(r'<script>.*?</script>', new_script, content, flags=re.DOTALL)

with open('src/pages/contact.astro', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patch 3 applied")
