import os
import base64
import subprocess
import shutil

# 1. Load Vazirmatn fonts as base64
with open('public/fonts/Vazirmatn-Bold.ttf', 'rb') as f:
    vazir_bold_b64 = base64.b64encode(f.read()).decode('ascii')

with open('public/fonts/Vazirmatn-Regular.ttf', 'rb') as f:
    vazir_reg_b64 = base64.b64encode(f.read()).decode('ascii')

vazir_css = f"""
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
"""

FONT_FAMILY_ATTR = 'font-family="\'Vazirmatn\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif"'

# SVG 1: Square Captioned Logo (1080x1080)
svg_logo = f"""<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>{vazir_css}    </style>
    <linearGradient id="sq-grad-fa" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2b5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>

  <rect width="1080" height="1080" fill="#0d1417" />

  <!-- Pedestal Circle -->
  <circle cx="540" cy="440" r="310" fill="#141b1f" stroke="#1a2327" stroke-width="1.5" />
  <circle cx="540" cy="440" r="310" fill="#00d2b5" opacity="0.03" />

  <!-- Emblem at (540, 440) -->
  <g transform="translate(285, 170) scale(5.0)">
    <path d="M50 18 L22 38 V68 H48" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#sq-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#sq-grad-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M45 84 H60 L76 68" stroke="url(#sq-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#sq-grad-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M61 90 H70 L77 83" stroke="url(#sq-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#sq-grad-fa)" stroke-width="3.5" fill="#0d1417" />
  </g>

  <!-- Official Persian Typography (Vazirmatn) -->
  <text x="540" y="860" fill="#ffffff" {FONT_FAMILY_ATTR} font-size="80" font-weight="700" text-anchor="middle">
    نُوَند
  </text>
  
  <text x="540" y="926" fill="#00d2b5" {FONT_FAMILY_ATTR} font-size="28" font-weight="700" text-anchor="middle">
    راهکارهای یکپارچه فناوری و مهندسی زیرساخت
  </text>

  <!-- Latin Sub-Brand in Subtle High-Tech Typography -->
  <text x="540" y="980" fill="#f4f2f1" fill-opacity="0.6" font-family="'Space Grotesk', monospace, sans-serif" font-size="17" letter-spacing="4" text-anchor="middle">
    NOVAND • INTEGRATED INFRASTRUCTURE &amp; SMART TECHNOLOGY
  </text>
</svg>
"""

# SVG 2: Persian Social Banner (1200x630)
svg_banner = f"""<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>{vazir_css}    </style>
    <linearGradient id="banner-grad-fa" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2b5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <pattern id="banner-grid-fa" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#15120e" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#0d1417" />
  <rect width="1200" height="630" fill="url(#banner-grid-fa)" opacity="0.6" />
  
  <!-- Pedestal Circle at cx=920, cy=315 -->
  <circle cx="920" cy="315" r="210" fill="#141b1f" stroke="#1a2327" stroke-width="1.5" />
  <circle cx="920" cy="315" r="210" fill="#00d2b5" opacity="0.03" />

  <!-- Centered Emblem at (920, 315) -->
  <g transform="translate(746.6, 131.4) scale(3.4)">
    <path d="M50 18 L22 38 V68 H48" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#banner-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#banner-grad-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M45 84 H60 L76 68" stroke="url(#banner-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#banner-grad-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M61 90 H70 L77 83" stroke="url(#banner-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#banner-grad-fa)" stroke-width="3.5" fill="#0d1417" />
  </g>

  <!-- Typography on the left with exact RTL coordinates and zero clipping -->
  <g id="banner-text">
    <!-- Brand Title in Vazirmatn -->
    <text x="680" y="238" fill="#ffffff" {FONT_FAMILY_ATTR} font-size="58" font-weight="700" text-anchor="end">
      نُوَند
    </text>
    <text x="480" y="230" fill="#f4f2f1" fill-opacity="0.45" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="300" text-anchor="end">
      | Novand
    </text>
    <!-- Subtitle in Vazirmatn matching corporate tagline -->
    <text x="680" y="300" fill="#00d2b5" {FONT_FAMILY_ATTR} font-size="25" font-weight="700" text-anchor="end">
      راهکارهای یکپارچه فناوری و مهندسی زیرساخت
    </text>
    <!-- Services Lines aligned with updated website capabilities -->
    <text x="680" y="352" fill="#f4f2f1" fill-opacity="0.85" {FONT_FAMILY_ATTR} font-size="18" font-weight="400" text-anchor="end">
      هوشمندسازی ساختمان · مهندسی شبکه و فیبر نوری · سرور و امنیت فیزیکی
    </text>
    <text x="680" y="392" fill="#9ca3af" {FONT_FAMILY_ATTR} font-size="15" font-weight="400" text-anchor="end">
      کابل‌کشی ساخت‌یافته · ارتباطات یکپارچه ویپ · تعمیرات و تأمین تجهیزات IT
    </text>
  </g>
</svg>
"""

# SVG 3: Instagram Story (1080x1920)
svg_story = f"""<svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>{vazir_css}    </style>
    <linearGradient id="story-grad-fa" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2b5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <pattern id="grid-fa" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#15120e" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1080" height="1920" fill="#0d1417" />
  <rect width="1080" height="1920" fill="url(#grid-fa)" opacity="0.6" />
  
  <circle cx="540" cy="720" r="380" fill="#141b1f" stroke="#1a2327" stroke-width="1.5" />
  <circle cx="540" cy="720" r="380" fill="#00d2b5" opacity="0.03" />

  <!-- Centered Emblem at (540, 720) -->
  <g transform="translate(285, 450) scale(5.0)">
    <path d="M50 18 L22 38 V68 H48" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#f4f2f1" stroke-width="5" stroke-linecap="round" />
    <rect x="46" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="39" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="46" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <rect x="54" y="47" width="6" height="6" fill="#f4f2f1" rx="0.5" />
    <path d="M30 76 H54 L76 54" stroke="url(#story-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="50" r="4.5" stroke="url(#story-grad-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M45 84 H60 L76 68" stroke="url(#story-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="64" r="4.5" stroke="url(#story-grad-fa)" stroke-width="3.5" fill="#0d1417" />
    <path d="M61 90 H70 L77 83" stroke="url(#story-grad-fa)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="80" cy="80" r="4.5" stroke="url(#story-grad-fa)" stroke-width="3.5" fill="#0d1417" />
  </g>

  <!-- Typography Lockup in Vazirmatn Script -->
  <text x="540" y="1170" fill="#ffffff" {FONT_FAMILY_ATTR} font-size="82" font-weight="700" text-anchor="middle">
    نُوَند
  </text>
  
  <text x="540" y="1232" fill="#00d2b5" font-family="'Space Grotesk', monospace" font-size="22" font-weight="600" letter-spacing="6" text-anchor="middle">
    NOVAND
  </text>
  
  <text x="540" y="1292" fill="#00d2b5" {FONT_FAMILY_ATTR} font-size="30" font-weight="700" text-anchor="middle">
    راهکارهای یکپارچه فناوری و مهندسی زیرساخت
  </text>

  <line x1="390" y1="1338" x2="690" y2="1338" stroke="#f4f2f1" stroke-opacity="0.2" stroke-width="1.5" />
  
  <text x="540" y="1392" fill="#f4f2f1" fill-opacity="0.85" {FONT_FAMILY_ATTR} font-size="24" font-weight="400" text-anchor="middle">
    هوشمندسازی ساختمان · مهندسی شبکه و فیبر نوری · امنیت فیزیکی
  </text>
  <text x="540" y="1438" fill="#9ca3af" {FONT_FAMILY_ATTR} font-size="20" font-weight="400" text-anchor="middle">
    مدیریت سرور و سیستم‌ها · تعمیرات و تأمین تجهیزات IT
  </text>
</svg>
"""

items = [
    {
        'svg_path': 'public/branding/novand-logo-persian-captioned.svg',
        'png_path': 'public/branding/novand-logo-persian-captioned-1080x1080.png',
        'content': svg_logo,
        'width': 1080,
        'height': 1080,
    },
    {
        'svg_path': 'public/branding/novand-social-banner-persian.svg',
        'png_path': 'public/branding/novand-social-banner-persian-1200x630.png',
        'content': svg_banner,
        'width': 1200,
        'height': 630,
    },
    {
        'svg_path': 'public/branding/novand-instagram-story-persian.svg',
        'png_path': 'public/branding/novand-instagram-story-persian-1080x1920.png',
        'content': svg_story,
        'width': 1080,
        'height': 1920,
    }
]

for item in items:
    svg_path = item['svg_path']
    png_path = item['png_path']
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(item['content'])
    print(f"Written {svg_path} (Vazirmatn)")

    # Render PNG with rsvg-convert using system fontconfig (which has Vazirmatn installed)
    cmd = [
        'rsvg-convert',
        '-w', str(item['width']),
        '-h', str(item['height']),
        svg_path,
        '-o', png_path
    ]
    subprocess.run(cmd, check=True)
    size = os.path.getsize(png_path)
    print(f"Rendered {png_path} ({size} bytes)")

    # Sync to dist if present
    dist_branding = 'dist/branding'
    if os.path.exists(dist_branding):
        shutil.copy(svg_path, os.path.join(dist_branding, os.path.basename(svg_path)))
        shutil.copy(png_path, os.path.join(dist_branding, os.path.basename(png_path)))

print("ALL BRAND ASSETS REBUILT WITH VAZIRMATN!")
