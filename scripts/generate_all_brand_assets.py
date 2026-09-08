import os
import subprocess
import base64

PUBLIC_BRANDING = 'public/branding'
DIST_BRANDING = 'dist/branding'
os.makedirs(PUBLIC_BRANDING, exist_ok=True)
os.makedirs(DIST_BRANDING, exist_ok=True)

# Load Vazirmatn fonts as base64
with open('public/fonts/Vazirmatn-Bold.ttf', 'rb') as f:
    vazir_bold_b64 = base64.b64encode(f.read()).decode('ascii')
with open('public/fonts/Vazirmatn-Regular.ttf', 'rb') as f:
    vazir_reg_b64 = base64.b64encode(f.read()).decode('ascii')

vazir_css = f'''
  @font-face {{
    font-family: 'Vazirmatn';
    font-style: normal;
    font-weight: 700;
    src: url('data:font/ttf;base64,{vazir_bold_b64}') format('truetype');
  }}
  @font-face {{
    font-family: 'Vazirmatn';
    font-style: normal;
    font-weight: 400;
    src: url('data:font/ttf;base64,{vazir_reg_b64}') format('truetype');
  }}
'''

def render_svg_and_png(filename_svg, filename_png, svg_content, width=None, height=None):
    pub_svg = os.path.join(PUBLIC_BRANDING, filename_svg)
    pub_png = os.path.join(PUBLIC_BRANDING, filename_png)
    
    with open(pub_svg, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    cmd = ['rsvg-convert', pub_svg, '-o', pub_png]
    if width:
        cmd.extend(['-w', str(width)])
    if height:
        cmd.extend(['-h', str(height)])
    subprocess.run(cmd, check=True)
    
    # Also mirror to dist
    dist_svg = os.path.join(DIST_BRANDING, filename_svg)
    dist_png = os.path.join(DIST_BRANDING, filename_png)
    with open(dist_svg, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    subprocess.run(['cp', pub_png, dist_png], check=True)
    print(f"Generated: {filename_svg} and {filename_png}")

# 1. Horizontal Lockup (Dark Background)
svg_horiz_dark = """<svg width="1000" height="280" viewBox="0 0 1000 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="circ-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2b5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <rect width="1000" height="280" rx="16" fill="#0d1417" />
  
  <!-- Emblem at cx=140, cy=140, scaled ~1.85 -->
  <g transform="translate(48, 48) scale(1.85)">
    <path d="M50 18 L22 38 V68 H48" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#circ-grad-dark)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#circ-grad-dark)" stroke-width="3.5" fill="#0d1417" />
    <path d="M45 84 H60 L76 68" stroke="url(#circ-grad-dark)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#circ-grad-dark)" stroke-width="3.5" fill="#0d1417" />
    <path d="M61 90 H70 L77 83" stroke="url(#circ-grad-dark)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#circ-grad-dark)" stroke-width="3.5" fill="#0d1417" />
  </g>

  <!-- Typography -->
  <g transform="translate(265, 0)">
    <text x="0" y="132" fill="#ffffff" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="52" font-weight="700" letter-spacing="1">NOVAND</text>
    <text x="2" y="174" fill="#00d2b5" font-family="'Space Grotesk', monospace, sans-serif" font-size="18" font-weight="600" letter-spacing="4">INTEGRATED TECH &amp; INFRASTRUCTURE</text>
  </g>
</svg>"""

render_svg_and_png('novand-logo-horizontal-dark.svg', 'novand-logo-horizontal-dark.png', svg_horiz_dark)

# 2. Horizontal Lockup (Light Background)
svg_horiz_light = """<svg width="1000" height="280" viewBox="0 0 1000 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="circ-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00a896" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
  </defs>
  <rect width="1000" height="280" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
  
  <!-- Emblem at cx=140, cy=140, scaled ~1.85 -->
  <g transform="translate(48, 48) scale(1.85)">
    <path d="M50 18 L22 38 V68 H48" stroke="#0d1417" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#0d1417" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#0d1417" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#circ-grad-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#circ-grad-light)" stroke-width="3.5" fill="#ffffff" />
    <path d="M45 84 H60 L76 68" stroke="url(#circ-grad-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#circ-grad-light)" stroke-width="3.5" fill="#ffffff" />
    <path d="M61 90 H70 L77 83" stroke="url(#circ-grad-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#circ-grad-light)" stroke-width="3.5" fill="#ffffff" />
  </g>

  <!-- Typography -->
  <g transform="translate(265, 0)">
    <text x="0" y="132" fill="#0d1417" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="52" font-weight="700" letter-spacing="1">NOVAND</text>
    <text x="2" y="174" fill="#008f7a" font-family="'Space Grotesk', monospace, sans-serif" font-size="18" font-weight="600" letter-spacing="4">INTEGRATED TECH &amp; INFRASTRUCTURE</text>
  </g>
</svg>"""

render_svg_and_png('novand-logo-horizontal-light.svg', 'novand-logo-horizontal-light.png', svg_horiz_light)

# 3. Stacked Lockup (Dark)
svg_stacked_dark = """<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="circ-grad-stack-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2b5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" rx="24" fill="#0d1417" />
  
  <!-- Emblem Centered at cx=300, cy=240, scale 3.2 -->
  <g transform="translate(136.8, 67.2) scale(3.2)">
    <path d="M50 18 L22 38 V68 H48" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#circ-grad-stack-dark)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#circ-grad-stack-dark)" stroke-width="3.5" fill="#0d1417" />
    <path d="M45 84 H60 L76 68" stroke="url(#circ-grad-stack-dark)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#circ-grad-stack-dark)" stroke-width="3.5" fill="#0d1417" />
    <path d="M61 90 H70 L77 83" stroke="url(#circ-grad-stack-dark)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#circ-grad-stack-dark)" stroke-width="3.5" fill="#0d1417" />
  </g>

  <!-- Centered Typography -->
  <text x="300" y="450" fill="#ffffff" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="44" font-weight="700" letter-spacing="2" text-anchor="middle">NOVAND</text>
  <text x="300" y="492" fill="#00d2b5" font-family="'Space Grotesk', monospace, sans-serif" font-size="16" font-weight="600" letter-spacing="4" text-anchor="middle">INTEGRATED TECH &amp; INFRASTRUCTURE</text>
</svg>"""

render_svg_and_png('novand-logo-stacked-dark.svg', 'novand-logo-stacked-dark.png', svg_stacked_dark)

# 4. Stacked Lockup (Light)
svg_stacked_light = """<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="circ-grad-stack-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00a896" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
  
  <!-- Emblem Centered at cx=300, cy=240, scale 3.2 -->
  <g transform="translate(136.8, 67.2) scale(3.2)">
    <path d="M50 18 L22 38 V68 H48" stroke="#0d1417" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#0d1417" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#0d1417" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#circ-grad-stack-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#circ-grad-stack-light)" stroke-width="3.5" fill="#ffffff" />
    <path d="M45 84 H60 L76 68" stroke="url(#circ-grad-stack-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#circ-grad-stack-light)" stroke-width="3.5" fill="#ffffff" />
    <path d="M61 90 H70 L77 83" stroke="url(#circ-grad-stack-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#circ-grad-stack-light)" stroke-width="3.5" fill="#ffffff" />
  </g>

  <!-- Centered Typography -->
  <text x="300" y="450" fill="#0d1417" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="44" font-weight="700" letter-spacing="2" text-anchor="middle">NOVAND</text>
  <text x="300" y="492" fill="#008f7a" font-family="'Space Grotesk', monospace, sans-serif" font-size="16" font-weight="600" letter-spacing="4" text-anchor="middle">INTEGRATED TECH &amp; INFRASTRUCTURE</text>
</svg>"""

render_svg_and_png('novand-logo-stacked-light.svg', 'novand-logo-stacked-light.png', svg_stacked_light)

# 5. Monochrome White (Pure white on transparent)
svg_mono_white = """<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(76, 76) scale(4.4)">
    <path d="M50 18 L22 38 V68 H48" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#ffffff" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#ffffff" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#ffffff" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#ffffff" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="#ffffff" stroke-width="3.5" fill="none" />
    <path d="M45 84 H60 L76 68" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="#ffffff" stroke-width="3.5" fill="none" />
    <path d="M61 90 H70 L77 83" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="#ffffff" stroke-width="3.5" fill="none" />
  </g>
</svg>"""

render_svg_and_png('novand-logo-monochrome-white.svg', 'novand-logo-monochrome-white.png', svg_mono_white)

# 6. Monochrome Black (Pure black on transparent)
svg_mono_black = """<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(76, 76) scale(4.4)">
    <path d="M50 18 L22 38 V68 H48" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#000000" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#000000" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#000000" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#000000" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#000000" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="#000000" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="#000000" stroke-width="3.5" fill="none" />
    <path d="M45 84 H60 L76 68" stroke="#000000" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="#000000" stroke-width="3.5" fill="none" />
    <path d="M61 90 H70 L77 83" stroke="#000000" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="#000000" stroke-width="3.5" fill="none" />
  </g>
</svg>"""

render_svg_and_png('novand-logo-monochrome-black.svg', 'novand-logo-monochrome-black.png', svg_mono_black)

# 7. Square Light Badge (1080x1080)
svg_square_light = """<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="circ-grad-sq-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00a896" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <pattern id="light-grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1080" height="1080" fill="#ffffff" />
  <rect width="1080" height="1080" fill="url(#light-grid)" />
  <circle cx="540" cy="540" r="390" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
  <g transform="translate(230, 230) scale(6.2)">
    <path d="M50 18 L22 38 V68 H48" stroke="#0d1417" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#0d1417" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#0d1417" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#0d1417" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#circ-grad-sq-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#circ-grad-sq-light)" stroke-width="3.5" fill="#f8fafc" />
    <path d="M45 84 H60 L76 68" stroke="url(#circ-grad-sq-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#circ-grad-sq-light)" stroke-width="3.5" fill="#f8fafc" />
    <path d="M61 90 H70 L77 83" stroke="url(#circ-grad-sq-light)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#circ-grad-sq-light)" stroke-width="3.5" fill="#f8fafc" />
  </g>
</svg>"""

render_svg_and_png('novand-logo-square-light.svg', 'novand-logo-square-light.png', svg_square_light)

# 8. Persian Horizontal Lockup (Dark)
svg_horiz_fa = f"""<svg width="1000" height="280" viewBox="0 0 1000 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>{vazir_css}</style>
    <linearGradient id="circ-grad-horiz-fa" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2b5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <rect width="1000" height="280" rx="16" fill="#0d1417" />
  
  <!-- Typography on the left: text-anchor=end at x=730 -->
  <g id="text-block">
    <text x="730" y="118" fill="#ffffff" font-family="'Vazirmatn', sans-serif" font-size="52" font-weight="700" text-anchor="end">نُوَند</text>
    <text x="540" y="110" fill="#f4f2f1" fill-opacity="0.5" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="300" text-anchor="end">| Novand</text>
    <text x="730" y="174" fill="#00d2b5" font-family="'Vazirmatn', sans-serif" font-size="22" font-weight="700" text-anchor="end">راهکارهای یکپارچه فناوری و مهندسی زیرساخت</text>
  </g>

  <!-- Emblem on right at cx=870, cy=140, scaled ~1.85 -->
  <g transform="translate(778, 48) scale(1.85)">
    <path d="M50 18 L22 38 V68 H48" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#circ-grad-horiz-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#circ-grad-horiz-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M45 84 H60 L76 68" stroke="url(#circ-grad-horiz-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#circ-grad-horiz-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M61 90 H70 L77 83" stroke="url(#circ-grad-horiz-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#circ-grad-horiz-fa)" stroke-width="3.5" fill="#0d1417" />
  </g>
</svg>"""

render_svg_and_png('novand-logo-horizontal-persian.svg', 'novand-logo-horizontal-persian.png', svg_horiz_fa)
print("All extended brand logos rendered successfully!")
