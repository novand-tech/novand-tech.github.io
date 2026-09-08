export interface Project {
  slug: string;
  title: string;
  clientType: string;
  category: string;
  year: string;
  summary: string;
  image?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  technologies: string[];
  status?: string;
  environment?: string;
  featuredImage?: string;
  services?: string[];
  result?: string;
}

export const projectsDataFa: Project[] = [
  {
    slug: "corporate-hq-network",
    title: "بازسازی و نوسازی شبکه دفتر مرکزی",
    clientType: "دفتر مرکزی شرکت تجاری",
    category: "زیرساخت شبکه",
    year: "۲۰۲۳",
    summary: "جایگزینی کامل کابل‌کشی مستهلک و ارتقاء تجهیزات شبکه به زیرساخت مبتنی بر سیسکو برای یک شرکت با بیش از ۱۵۰ کارمند.",
    metrics: [
      { label: "نودهای شبکه", value: "۳۵۰+" },
      { label: "مدت زمان قطعی", value: "< ۴ ساعت" },
      { label: "ارتقاء پهنای‌باند", value: "۱۰ گیگابیت" }
    ],
    challenge: "شبکه قبلی مشتری از کابل‌کشی غیر استاندارد Cat5e و سوئیچ‌های نامدیریتی استفاده می‌کرد که منجر به قطعی‌های روزانه، کندی شدید سیستم‌های حسابداری و مشکلات امنیت سایبری می‌شد.",
    solution: "ما کل زیرساخت را با استفاده از کابل‌های شیلددار Cat6a مجدداً کابل‌کشی کرده و بک‌بون فیبر نوری بین طبقات ایجاد کردیم. با پیاده‌سازی سوئیچ‌های مدیریتی سیسکو و روترهای لبه (Edge Routers)، ترافیک دپارتمان‌ها از طریق VLAN ایزوله شد و کیفیت سرویس (QoS) برای ترافیک تلفن‌های تحت شبکه (VoIP) تضمین گردید.",
    technologies: ["Cisco Catalyst", "Cat6a STP", "MikroTik CCR", "VLAN Segmentation", "802.1X Auth"],
    status: "تکمیل شده",
    environment: "سازمانی",
    featuredImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    services: ["مشاوره", "پیاده‌سازی"],
    result: "اجرای موفقیت‌آمیز"
  },
  {
    slug: "smart-campus-automation",
    title: "سیستم اتوماسیون جامع پردیس آموزشی",
    clientType: "مدرسه و مجتمع آموزشی خصوصی",
    category: "ساختمان هوشمند",
    year: "۲۰۲۴",
    summary: "پیاده‌سازی متمرکز روشنایی هوشمند، کنترل تهویه مطبوع، سیستم‌های پیجینگ و کنترل دسترسی در یک مجتمع آموزشی ۶۰,۰۰۰ فوت مربعی.",
    metrics: [
      { label: "فضای تحت پوشش", value: "۶۰هزار فوت مربع" },
      { label: "صرفه‌جویی انرژی", value: "۳۲٪" },
      { label: "نقاط کنترلی یکپارچه", value: "۱۲۰+" }
    ],
    challenge: "مدیریت مدرسه برای کنترل سیستم‌های روشنایی و تهویه به صورت دستی دچار مشکل بود و انرژی زیادی پس از ساعات کاری هدر می‌رفت. علاوه بر این، در مواقع اضطراری هیچ سیستم متمرکزی برای قفل‌کردن درها یا ارسال پیام صوتی سراسری وجود نداشت.",
    solution: "یک سیستم اتوماسیون مبتنی بر DALI-2 برای مدیریت یکپارچه روشنایی پیاده‌سازی شد که با برنامه‌های زمانی حضور و غیاب همگام‌سازی می‌شود. سنسورهای هوشمند دما و حضور در تمامی کلاس‌ها نصب شد و با نصب پنل مدیریت متمرکز، تمامی درهای ورودی و سیستم پیجینگ IP تحت یک پلتفرم یکپارچه قرار گرفت.",
    technologies: ["DALI-2", "KNX Protocol", "IP Paging", "PoE Access Control", "Centralized Dashboard"],
    status: "تکمیل شده",
    environment: "سازمانی",
    featuredImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    services: ["مشاوره", "پیاده‌سازی"],
    result: "اجرای موفقیت‌آمیز"
  },
  {
    slug: "high-availability-datacenter",
    title: "مهاجرت و راه‌اندازی دیتاسنتر مجازی با دسترسی بالا",
    clientType: "موسسه مالی منطقه‌ای",
    category: "مدیریت سرور",
    year: "۲۰۲۳",
    summary: "انتقال امن سرورهای فیزیکی قدیمی به یک محیط مجازی‌سازی شده ابری خصوصی با سیستم‌های ذخیره‌سازی Redundant و پایش لحظه‌ای.",
    metrics: [
      { label: "ارتقاء پایداری (Uptime)", value: "۹۹.۹۹۹٪" },
      { label: "ماشین‌های مجازی", value: "۴۵" },
      { label: "کاهش مصرف برق", value: "۶۰٪" }
    ],
    challenge: "مشتری وابستگی شدیدی به سرورهای فیزیکی قدیمی داشت که فاقد هرگونه پشتیبان‌گیری منظم، سیستم برق اضطراری مطمئن و منابع کافی برای نرم‌افزارهای جدید بودند. خرابی‌های سخت‌افزاری موجب از دست رفتن مکرر اطلاعات می‌شد.",
    solution: "ما یک کلاستر VMware vSphere با استفاده از سرورهای HPE ProLiant و سیستم ذخیره‌سازی مبتنی بر SAN پیاده‌سازی کردیم. سرورهای فیزیکی قبلی از طریق فرآیند P2V مجازی‌سازی شدند. همچنین سیستم پشتیبان‌گیری خودکار Veeam، سیستم پایش Zabbix برای مانیتورینگ سخت‌افزارها، و برق اضطراری UPS سه‌فاز برای اطمینان از عملکرد بی‌وقفه راه‌اندازی شد.",
    technologies: ["VMware vSphere", "HPE ProLiant", "SAN Storage", "Veeam Backup", "Zabbix", "APC UPS"],
    status: "تکمیل شده",
    environment: "سازمانی",
    featuredImage: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80",
    services: ["مشاوره", "پیاده‌سازی"],
    result: "اجرای موفقیت‌آمیز"
  }
];

export const projectsDataEn: Project[] = [
  {
    slug: "corporate-hq-network",
    title: "Headquarters Network Modernization",
    clientType: "Corporate Headquarters",
    category: "Network Infrastructure",
    year: "2023",
    summary: "Complete replacement of depreciated cabling and network equipment upgrade to a Cisco-based infrastructure for a 150+ employee company.",
    metrics: [
      { label: "Network Nodes", value: "350+" },
      { label: "Downtime", value: "< 4 Hours" },
      { label: "Bandwidth Upgrade", value: "10 Gbps" }
    ],
    challenge: "The client's previous network relied on non-standard Cat5e cabling and unmanaged switches, leading to daily outages, severe latency in accounting systems, and cybersecurity vulnerabilities.",
    solution: "We re-cabled the entire infrastructure using shielded Cat6a and established a fiber optic backbone between floors. By implementing Cisco managed switches and edge routers, departmental traffic was isolated via VLANs, and Quality of Service (QoS) was guaranteed for VoIP traffic.",
    technologies: ["Cisco Catalyst", "Cat6a STP", "MikroTik CCR", "VLAN Segmentation", "802.1X Auth"],
    status: "Completed",
    environment: "Enterprise",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    services: ["Consulting", "Implementation"],
    result: "Successful completion"
  },
  {
    slug: "smart-campus-automation",
    title: "Comprehensive Campus Automation",
    clientType: "Private School & Educational Complex",
    category: "Smart Building",
    year: "2024",
    summary: "Centralized implementation of smart lighting, HVAC control, paging systems, and access control across a 60,000 sq ft educational complex.",
    metrics: [
      { label: "Coverage Area", value: "60k sq ft" },
      { label: "Energy Savings", value: "32%" },
      { label: "Integration Points", value: "120+" }
    ],
    challenge: "School administration struggled with manual control of lighting and HVAC systems, wasting significant energy after hours. Furthermore, there was no centralized system for lockdown procedures or campus-wide audio announcements during emergencies.",
    solution: "A DALI-2 based automation system was deployed for unified lighting management synchronized with attendance schedules. Smart temperature and presence sensors were installed in all classrooms, and a centralized management panel brought all entrance doors and IP paging under a single platform.",
    technologies: ["DALI-2", "KNX Protocol", "IP Paging", "PoE Access Control", "Centralized Dashboard"],
    status: "Completed",
    environment: "Enterprise",
    featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    services: ["Consulting", "Implementation"],
    result: "Successful completion"
  },
  {
    slug: "high-availability-datacenter",
    title: "High-Availability Virtual Datacenter Migration",
    clientType: "Regional Financial Institution",
    category: "Server Administration",
    year: "2023",
    summary: "Secure migration of legacy physical servers to a private cloud virtualized environment with redundant storage and real-time monitoring.",
    metrics: [
      { label: "Uptime Target", value: "99.999%" },
      { label: "Virtual Machines", value: "45" },
      { label: "Power Reduction", value: "60%" }
    ],
    challenge: "The client was heavily dependent on aging physical servers that lacked regular backups, reliable UPS systems, and adequate resources for new applications. Hardware failures resulted in frequent data loss.",
    solution: "We deployed a VMware vSphere cluster utilizing HPE ProLiant servers and SAN-based storage. Legacy servers were virtualized via P2V processes. An automated Veeam backup system, Zabbix hardware monitoring, and 3-phase APC UPS power backup were also installed to ensure uninterrupted operations.",
    technologies: ["VMware vSphere", "HPE ProLiant", "SAN Storage", "Veeam Backup", "Zabbix", "APC UPS"],
    status: "Completed",
    environment: "Enterprise",
    featuredImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    services: ["Consulting", "Implementation"],
    result: "Successful completion"
  }
];

export const getProjectsData = (url: string) => url.startsWith('/en') ? projectsDataEn : projectsDataFa;
export const projectsData = projectsDataFa;
