---
title: "پیکربندی شبکه‌های صنعتی سیسکو و میکروتیک: افزونگی، امنیت VLAN و سگمنت‌بندی ترافیک"
slug: "cisco-mikrotik-industrial-network"
description: "پیاده‌سازی پروتکل‌های پروتکل درخت پوشا (MSTP / RSTP)، افزونگی روتر اول با VRRP/HSRP، کنترل دسترسی پورت با Port-Security و امن‌سازی خط فرمان RouterOS و Cisco IOS."
publishDate: "2026-02-18"
modifiedDate: "2026-02-22"
author: "واحد مهندسی شبکه و مسیریابی نُوَند"
authorRole: "مهندس ارشد شبکه و امنیت لایه ۲ و ۳"
category: "شبکه و زیرساخت ارتباطی"
categorySlug: "networking"
readingTime: "۱۱ دقیقه مطالعه"
image: "/images/services/network-infrastructure.jpg"
imageAlt: "سوییچ‌های لایه ۳ صنعتی و پچ‌پنل‌های شیلددار فیبر و مس در رک دیتاسنتر"
imageCaption: "زیرساخت سوییچینگ ساختاریافته گیگابیتی با پیوندهای افزونه ۱۰G LACP"
tags: ["Cisco", "MikroTik", "VLAN", "VRRP", "RSTP", "Port Security", "شبکه"]
lang: "fa"
featured: false
relatedServices: ["network-infrastructure", "enterprise-services", "infrastructure-administration"]
---

## فلسفه طراحی شبکه‌های پایدار در محیط‌های سازمانی و صنعتی

در محیط‌های صنعتی و بنگاه‌های اقتصادی بزرگ، پایداری شبکه تنها یک امتیاز نیست، بلکه لازمه تداوم عملیات (Business Continuity) است. خرابی یک سوییچ یا قطع تصادفی یک کابل شبکه نباید ارتباط کل سامانه را مختل سازد.

مهندسی شبکه نُوَند بر اساس تجمیع بهینه زیرساخت‌های مسیریابی قدرتمند **میکروتیک (MikroTik RouterOS v7)** و سوییچینگ بی‌نقص **سیسکو (Cisco Catalyst)** طراحی می‌شود تا بالاترین کارایی همراه با صرفه اقتصادی پایدار به دست آید.

---

## ۱. افزونگی در لایه ۲ و پروتکل‌های Spanning Tree

ایجاد حلقه‌های فیزیکی افزونه بین سوییچ‌های هسته (Core) و دسترسی (Access) برای جلوگیری از قطعی ضروری است، اما بدون مکانیزم‌های کنترلی منجر به پدیده طوفان پکت‌های برودکست (Broadcast Storm) و قفل شدن کل شبکه می‌گردد.

### مقایسه پروتکل‌های استاندارد:
- **RSTP (IEEE 802.1w):** زمان همگرایی (Convergence) را از ۵۰ ثانیه به زیر چندصد میلی‌ثانیه کاهش می‌دهد.
- **MSTP (IEEE 802.1s):** اجازه می‌دهد هزاران VLAN در قالب چند نمونه درختی (Instances) به اشتراک گذاشته شوند و از منابع پردازشی CPU سوییچ محافظت گردد.

### نمونه تنظیمات امن‌سازی درخت پوشا در سوئیچ سیسکو:

```cisco
! فعال‌سازی حالت RSTP سراسری
spanning-tree mode rapid-pvst
spanning-tree portfast bpduguard default

! اعمال بر روی پورت‌های متصل به کاربران نهایی
interface range GigabitEthernet0/1 - 24
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
 spanning-tree bpduguard enable
```

با فعال‌سازی **BPDU Guard**، اگر کاربری به اشتباه یک سوییچ خانگی کوچک به پریز شبکه اتاق متصل کند، پورت بلافاصله وارد حالت `err-disabled` شده و از سرایت حلقه به شبکه ستون فقرات ممانعت به عمل می‌آید.

---

## ۲. افزونگی درگاه پیش‌فرض با پروتکل VRRP در میکروتیک

پروتکل **VRRP (Virtual Router Redundancy Protocol)** به دو یا چند روتر اجازه می‌دهد یک آدرس IP مجازی مشترک (Virtual Gateway) را به کلاینت‌ها ارائه دهند. در صورت از کار افتادن روتر اصلی (Master)، روتر رزرو (Backup) در کمتر از ۳ ثانیه کنترل را در دست می‌گیرد:

```routeros
# ساخت اینترفیس VRRP روی روتر اصلی میکروتیک (Master)
/interface vrrp
add interface=vlan10-corp name=vrrp-vlan10 priority=200 vrid=10

/ip address
add address=192.168.10.1/24 interface=vlan10-corp
add address=192.168.10.254/24 interface=vrrp-vlan10

# ساخت اینترفیس VRRP روی روتر پشتیبان میکروتیک (Backup)
/interface vrrp
add interface=vlan10-corp name=vrrp-vlan10 priority=100 vrid=10

/ip address
add address=192.168.10.2/24 interface=vlan10-corp
add address=192.168.10.254/24 interface=vrrp-vlan10
```

---

## ۳. امن‌سازی دفاعی لایه ۲ (Layer 2 Hardening)

بیش از ۷۰٪ نفوذهای امنیتی در شبکه‌های سازمانی از مبدأ داخلی و لایه ۲ انجام می‌شود. سه ستون اصلی دفاع لایه دسترسی عبارتند از:

1. **DHCP Snooping:** تمایز پورت‌های مورد اعتماد (Trusted) از نامعتبر، برای مهار کامل نشت سرورهای غیرمجاز DHCP (Rogue DHCP Server).
2. **Dynamic ARP Inspection (DAI):** جلوگیری از حملات خطرناک مسموم‌سازی جدول ARP (ARP Poisoning / Man-In-The-Middle).
3. **Port Security:** قفل کردن پورت فیزیکی به آدرس MAC سخت‌افزاری مجاز و قطع خودکار پورت در صورت اتصال دیوایس ناشناس.

---

## ۴. چک‌لیست بازرسی و ارزیابی کیفیت شبکه نُوَند

- [ ] تست تست فیزیکی عملکرد پروتکل LACP (Link Aggregation) با قطع عمدی یکی از کابل‌های پیوند آپلینک.
- [ ] آزمایش Failover پروتکل VRRP با خاموش کردن روتر اصلی و سنجش عدم قطعی در بسته‌های ICMP مداوم.
- [ ] بازرسی پهنای باند و سلامت پورت‌ها از طریق پروتکل SNMPv3 و سیستم مانیتورینگ متمرکز Zabbix / Grafana.
- [ ] اطمینان از اعمال رمزهای عبور با پیچیدگی بالا، احراز هویت دوعاملی و کلیدهای نامتقارن RSA/Ed25519 برای دسترسی کنسولی و ریموت.
