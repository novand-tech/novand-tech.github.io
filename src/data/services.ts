export interface ServiceDetail {
  slug: string;
  heroImage?: string;
  eyebrow: string;
  title: string;
  summary: string;
  icon: string;
  features: {
    title: string;
    description: string;
  }[];
}
export interface ServiceCategory extends ServiceDetail {
  slug: string;
  heroImage?: string;
  eyebrow: string;
  title: string;
  summary: string;
  icon: string;
  features: {
    title: string;
    description: string;
  }[];
}

export const servicesDataFa: ServiceCategory[] = [
  {
    slug: "smart-homes-buildings",
    heroImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "اتوماسیون و یکپارچه‌سازی",
    title: "خانه‌ها و ساختمان‌های هوشمند",
    summary: "مهندسی و یکپارچه‌سازی پیشرفته اتوماسیون ساختمان برای فضاهای مسکونی، آموزشی و کشاورزی.",
    icon: "home",
    features: [
      {
        title: "خانه‌های هوشمند و اتوماسیون تجهیزات",
        description: "کنترل متمرکز نور، دما، پرده‌ها، و سیستم‌های صوتی‌تصویری. ادغام با سیستم‌های امنیتی و پیاده‌سازی پروتکل‌های هوشمند برای مدیریت مصرف انرژی و راحتی بیشتر."
      },
      {
        title: "مدارس هوشمند و مراکز آموزشی تعاملی",
        description: "تجهیز کلاس‌های درس به تخته‌های هوشمند، شبکه‌های امن برای دانش‌آموزان، کنترل حضور و غیاب، سیستم‌های پیجینگ تحت شبکه و پخش زنده کلاس‌ها."
      },
      {
        title: "سیستم‌های کنترل محیطی و گلخانه",
        description: "اتوماسیون صنعتی برای کنترل دقیق دما، رطوبت، آبیاری هوشمند و تهویه مطبوع، همراه با داشبوردهای نظارتی برای مدیریت متمرکز شرایط محیطی."
      }
    ]
  },
  {
    slug: "network-infrastructure",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "زیرساخت و ارتباطات",
    title: "شبکه و زیرساخت IT",
    summary: "طراحی، کابل‌کشی و پیاده‌سازی حرفه‌ای شبکه‌های داده بر پایه تجهیزات سیسکو، میکروتیک و فیبر نوری.",
    icon: "network",
    features: [
      {
        title: "شبکه‌های پسیو و فیبر نوری (FTTH)",
        description: "کابل‌کشی ساخت‌یافته استاندارد، نصب و آرایش داکت‌ها، ترانکینگ، و پیاده‌سازی شبکه‌های فیبر نوری (FTTH) برای سرعت‌های گیگابیتی و تاخیر حداقلی."
      },
      {
        title: "شبکه‌های اکتیو (Cisco & MikroTik)",
        description: "طراحی و پیکربندی سوئیچ‌ها، روترها و شبکه‌های وایرلس شرکتی. مدیریت پهنای‌باند، متعادل‌سازی بار (Load Balancing) و پیاده‌سازی پروتکل‌های مسیریابی پیشرفته."
      },
      {
        title: "امنیت شبکه و دسترسی از راه دور",
        description: "راه‌اندازی فایروال‌های سخت‌افزاری و نرم‌افزاری، شبکه‌های خصوصی مجازی (VPN) ایمن برای دورکاری، و پیاده‌سازی سیاست‌های دسترسی سازمانی (QoS)."
      }
    ]
  },
  {
    slug: "enterprise-services",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "سرویس‌ها و نرم‌افزار",
    title: "سرویس‌های IT سازمانی",
    summary: "استقرار نرم‌افزارها و خدمات ارتباطی سازمانی برای تسهیل جریان کار، ارتباطات صوتی و ویدئویی و مدیریت کاربران.",
    icon: "server",
    features: [
      {
        title: "ارتباطات، VoIP و پلتفرم‌های وبینار",
        description: "راه‌اندازی سرورهای اختصاصی VoIP (سیپ‌ترانک، ایزابل/الستیکس)، سیستم‌های تلفنی سازمانی، و پلتفرم‌های برگزاری جلسات آنلاین و وبینارهای تعاملی."
      },
      {
        title: "تلویزیون تحت شبکه (LAN-TV) و استریم",
        description: "پیاده‌سازی سیستم‌های پخش ویدئو و IPTV بر روی شبکه داخلی برای هتل‌ها، بیمارستان‌ها، مجتمع‌های مسکونی و سازمان‌های بزرگ بدون نیاز به اینترنت خارجی."
      },
      {
        title: "سرویس‌های مایکروسافت و دایرکتوری",
        description: "راه‌اندازی Active Directory، Exchange Server، سرویس‌های اشتراک فایل، مدیریت دسترسی کاربران و اعمال Policy‌های جامع در سطح سازمان."
      }
    ]
  },
  {
    slug: "infrastructure-administration",
    heroImage: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "سرورها و ذخیره‌سازی",
    title: "مدیریت سیستم‌ها و مجازی‌سازی",
    summary: "پیاده‌سازی و نگهداری سرورهای قدرتمند، مجازی‌سازی منابع و معماری‌های نرم‌افزاری مبتنی بر کانتینر.",
    icon: "database",
    features: [
      {
        title: "مدیریت سیستم‌های لینوکس و macOS",
        description: "نصب، پیکربندی، بهینه‌سازی و تامین امنیت سرورهای لینوکسی و محیط‌های سازمانی مبتنی بر مک. اسکریپت‌نویسی و اتوماسیون وظایف روزمره."
      },
      {
        title: "معماری کانتینر (Docker & Kubernetes)",
        description: "طراحی زیرساخت‌های میکروسرویس، پیاده‌سازی کلاسترینگ با داکر و کوبرنیتیز برای اطمینان از دسترسی‌پذیری بالا (High Availability) و مقیاس‌پذیری نرم‌افزارها."
      },
      {
        title: "مجازی‌سازی VMware و سرورهای HP",
        description: "پیکربندی سخت‌افزاری سرورهای HPE ProLiant، پیاده‌سازی ESXi و vCenter، مدیریت ماشین‌های مجازی، و پیاده‌سازی راهکارهای پشتیبان‌گیری (Veeam)."
      }
    ]
  },
  {
    slug: "security-surveillance",
    heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "نظارت و کنترل تردد",
    title: "حفاظت فیزیکی و دوربین‌های مداربسته",
    summary: "نصب و راه‌اندازی سیستم‌های پیشرفته امنیتی، پایش تصویری هوشمند و راهکارهای جامع کنترل تردد.",
    icon: "shield",
    features: [
      {
        title: "نظارت تصویری (IP, WiFi, Analog)",
        description: "طراحی، نصب و کابل‌کشی انواع دوربین‌های مداربسته تحت شبکه و آنالوگ با وضوح بالا. راه‌اندازی سیستم‌های ذخیره‌سازی NVR/DVR و انتقال تصویر امن."
      },
      {
        title: "دزدگیر، اعلام حریق و درهای اتوماتیک",
        description: "نصب سنسورهای حرکتی، سیستم‌های هشداردهنده بی‌سیم و کابلی، قفل‌های الکترونیکی و یکپارچه‌سازی با کرکره‌ها و درهای اتوماتیک."
      },
      {
        title: "اتاق‌های کنترل و مانیتورینگ",
        description: "طراحی ارگونومیک اتاق‌های مانیتورینگ (Situation Rooms)، پیاده‌سازی ویدئو وال‌ها (Video Walls)، و نرم‌افزارهای مدیریت متمرکز تصاویر (VMS)."
      }
    ]
  },
  {
    slug: "audio-power",
    heroImage: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "صوت و توان مصرفی",
    title: "تجهیزات صوتی و منابع تغذیه اضطراری",
    summary: "طراحی آکوستیک، سیستم‌های صوتی تحت شبکه و مهندسی برق پشتیبان برای تضمین پایداری زیرساخت‌ها.",
    icon: "zap",
    features: [
      {
        title: "مهندسی سیستم‌های صوتی آنالوگ و IP",
        description: "راه‌اندازی سیستم‌های پیجینگ یکپارچه، اسپیکرهای سقفی و دیواری، زون‌بندی صوتی برای مجتمع‌های تجاری، بیمارستان‌ها و فضاهای صنعتی."
      },
      {
        title: "برق اضطراری و UPS تجهیزات حیاتی",
        description: "محاسبه دقیق بار مصرفی، انتخاب و نصب سیستم‌های UPS صنعتی و رک‌مونت برای محافظت از سرورها و تجهیزات حساس شبکه در برابر نوسانات برق."
      },
      {
        title: "پایش محیطی و خاموشی خودکار",
        description: "یکپارچه‌سازی سنسورهای دما/رطوبت در اتاق سرور با سیستم‌های مدیریت برق جهت ارسال هشدار و انجام خاموشی ایمن سرورها در شرایط بحرانی."
      }
    ]
  },
  {
    slug: "hardware-support",
    eyebrow: "نگهداری و تامین",
    title: "پشتیبانی سخت‌افزار و تجهیزات",
    summary: "سرویس‌های نگهداری پیشگیرانه، تعمیرات تخصصی و مشاوره در تامین قطعات اصلی و حرفه‌ای IT.",
    icon: "monitor",
    features: [
      {
        title: "نگهداری و تعمیرات دسکتاپ/لپ‌تاپ",
        description: "سرویس دوره‌ای، ارتقاء سخت‌افزاری، عیب‌یابی تخصصی مادربردها، و بهینه‌سازی سیستم‌های کامپیوتری و لپ‌تاپ‌های سازمانی."
      },
      {
        title: "بازیابی اطلاعات و تعمیرات سانترال",
        description: "ریکاوری ایمن اطلاعات از هارد دیسک‌های آسیب‌دیده، تعمیر و برنامه‌ریزی مجدد دستگاه‌های سانترال تلفن و سیستم‌های آیفون تصویری."
      },
      {
        title: "مشاوره و تامین تجهیزات IT",
        description: "مشاوره تخصصی و بی‌طرفانه برای خرید تجهیزات سازمانی (سرور، سوئیچ، روتر، ذخیره‌ساز) با بهترین قیمت، اصالت کالا و متناسب با نیازهای واقعی شما."
      }
    ]
  }
];

export const servicesDataEn: ServiceCategory[] = [
  {
    slug: "smart-homes-buildings",
    heroImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Automation & Integration",
    title: "Smart Homes & Buildings",
    summary: "Advanced building automation engineering and integration for residential, educational, and agricultural spaces.",
    icon: "home",
    features: [
      {
        title: "Smart Home Living & Appliance Automation",
        description: "Centralized control of lighting, temperature, blinds, and A/V systems. Integration with security and smart protocols for energy management and comfort."
      },
      {
        title: "Smart Schools & Interactive Educational Centers",
        description: "Equipping classrooms with smart boards, secure student networks, attendance tracking, IP paging systems, and live broadcast capabilities."
      },
      {
        title: "Greenhouse & Environmental Control Systems",
        description: "Industrial automation for precise control of temperature, humidity, smart irrigation, and HVAC, complete with monitoring dashboards."
      }
    ]
  },
  {
    slug: "network-infrastructure",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Infrastructure & Communications",
    title: "Network Infrastructure & IT",
    summary: "Professional design, cabling, and implementation of data networks based on Cisco, MikroTik, and fiber optic technologies.",
    icon: "network",
    features: [
      {
        title: "Passive Networking & Fiber Optics (FTTH)",
        description: "Standard structured cabling, ducting, trunking, and FTTH implementation for gigabit speeds and minimal latency."
      },
      {
        title: "Active Networking with Cisco & MikroTik",
        description: "Design and configuration of corporate switches, routers, and wireless networks. Bandwidth management, load balancing, and advanced routing protocols."
      },
      {
        title: "Security, Tunneling & Remote Access",
        description: "Deployment of hardware and software firewalls, secure VPNs for remote work, and implementation of organizational QoS policies."
      }
    ]
  },
  {
    slug: "enterprise-services",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Services & Software",
    title: "Enterprise IT & Application Services",
    summary: "Deployment of enterprise software and communication services to streamline workflows, A/V communications, and user management.",
    icon: "server",
    features: [
      {
        title: "Communications, VoIP & Webinar Platforms",
        description: "Setup of dedicated VoIP servers (SIP Trunk, Issabel/Elastix), enterprise telephony systems, and online meeting platforms."
      },
      {
        title: "LAN-TV & Custom OTT Media Streaming",
        description: "Implementation of IPTV and video broadcast systems over internal networks for hotels, hospitals, and large organizations without external internet dependencies."
      },
      {
        title: "Microsoft Services & Traffic Routing VPN",
        description: "Deployment of Active Directory, Exchange Server, file sharing services, user access management, and comprehensive organizational policies."
      }
    ]
  },
  {
    slug: "infrastructure-administration",
    heroImage: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Servers & Storage",
    title: "Systems Administration & Virtualization",
    summary: "Implementation and maintenance of powerful servers, resource virtualization, and container-based software architectures.",
    icon: "database",
    features: [
      {
        title: "Linux & macOS Systems Administration",
        description: "Installation, configuration, optimization, and security provisioning of Linux servers and Mac-based enterprise environments. Scripting and task automation."
      },
      {
        title: "Docker & Kubernetes Containerization",
        description: "Microservice infrastructure design and clustering implementation with Docker and Kubernetes to ensure High Availability and scalability."
      },
      {
        title: "VMware Virtualization & HP Server Hardware",
        description: "Hardware configuration of HPE ProLiant servers, ESXi and vCenter deployment, virtual machine management, and Veeam backup solutions."
      }
    ]
  },
  {
    slug: "security-surveillance",
    heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Surveillance & Access Control",
    title: "Physical Security & CCTV",
    summary: "Installation of advanced security systems, smart video monitoring, and comprehensive access control solutions.",
    icon: "shield",
    features: [
      {
        title: "CCTV Surveillance (Analog, WiFi & IP)",
        description: "Design, installation, and cabling of high-resolution IP and analog CCTV cameras. Setup of NVR/DVR storage and secure video transmission."
      },
      {
        title: "Wired & Wireless Burglar Alarms & Automatic Doors",
        description: "Installation of motion sensors, wired/wireless alarm systems, electronic locks, and integration with automatic doors and shutters."
      },
      {
        title: "Situation Rooms & Command Centers",
        description: "Ergonomic design of monitoring situation rooms, implementation of Video Walls, and centralized Video Management Software (VMS)."
      }
    ]
  },
  {
    slug: "audio-power",
    heroImage: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?auto=format&fit=crop&w=1200&q=80",
    eyebrow: "Acoustics & Power",
    title: "Audio Systems & Critical Power",
    summary: "Acoustic design, IP audio systems, and backup electrical engineering to ensure infrastructure stability.",
    icon: "zap",
    features: [
      {
        title: "IP-Based & Analog Audio Engineering",
        description: "Setup of unified paging systems, ceiling and wall speakers, and audio zoning for commercial complexes, hospitals, and industrial spaces."
      },
      {
        title: "Critical UPS Power & Outage Protection",
        description: "Precise load calculation, selection, and installation of industrial/rack-mount UPS systems to protect servers and critical network equipment from power fluctuations."
      },
      {
        title: "Environmental Monitoring & Automated Shutdown",
        description: "Integration of server room temperature/humidity sensors with power management systems for alerts and safe server shutdowns during critical events."
      }
    ]
  },
  {
    slug: "hardware-support",
    eyebrow: "Maintenance & Procurement",
    title: "Hardware Maintenance & IT Procurement",
    summary: "Preventative maintenance services, expert repairs, and consulting for sourcing genuine, professional IT components.",
    icon: "monitor",
    features: [
      {
        title: "Desktop & Laptop Hardware Maintenance",
        description: "Periodic servicing, hardware upgrades, expert motherboard troubleshooting, and optimization of corporate computer systems and laptops."
      },
      {
        title: "Hard Drive Data Recovery & PBX/Intercom Repairs",
        description: "Secure data recovery from damaged hard drives, repair and reprogramming of PBX telephone systems and video intercoms."
      },
      {
        title: "Expert IT Equipment Consulting & Procurement",
        description: "Specialized, impartial consulting for purchasing enterprise equipment (servers, switches, routers, storage) with the best pricing, authenticity, and tailored to actual needs."
      }
    ]
  }
];
export const getServicesData = (url: string) => url.startsWith('/en') ? servicesDataEn : servicesDataFa;
export const servicesData = servicesDataFa;
