export interface BrochurePanel {
  pageNumber: number;
  slug: string;
  type: 'front_cover' | 'intro_smart_homes' | 'security_networks' | 'fiber_voip_servers' | 'process_model' | 'back_cover';
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  image?: string;
  imageCaptionFa?: string;
  imageCaptionEn?: string;
  contentFa: {
    lead?: string;
    paragraphs?: string[];
    bulletSections?: {
      title: string;
      icon?: string;
      items: string[];
    }[];
    steps?: {
      number: string;
      title: string;
      titleEn: string;
      description: string;
      outputs: string[];
    }[];
    contactDetails?: {
      companyName: string;
      tagline: string;
      address: string;
      primaryPhone: string;
      primaryContact: string;
      secondaryPhone?: string;
      secondaryContact?: string;
      instagram: string;
      email: string;
      website: string;
      qrNote: string;
    };
  };
  badges: string[];
}

export interface BrochureData {
  title: string;
  subtitle: string;
  paperFormat: string;
  printDimensions: {
    widthMm: number;
    heightMm: number;
    dpi: number;
    orientation: 'landscape' | 'portrait';
  };
  exteriorSpread: {
    leftPanelIndex: number;   // Panel 5 (Fold flap)
    centerPanelIndex: number; // Panel 6 (Back cover)
    rightPanelIndex: number;  // Panel 1 (Front cover)
  };
  interiorSpread: {
    leftPanelIndex: number;   // Panel 4 (Fiber, VoIP, Servers, Battery)
    centerPanelIndex: number; // Panel 3 (CCTV, Security, Hardware Repair)
    rightPanelIndex: number;  // Panel 2 (Smart Homes, Schools, Automation)
  };
  panels: BrochurePanel[];
}

export const brochureData: BrochureData = {
  title: "بروشور و دفترچه راهنمای جامع مهندسی نُـوَند",
  subtitle: "راهکارهای یکپارچه فناوری، هوشمندسازی، نظارت تصویری، زیرساخت شبکه و خدمات تخصصی",
  paperFormat: "A4 Tri-Fold & 6-Page Booklet",
  printDimensions: {
    widthMm: 297,
    heightMm: 210,
    dpi: 300,
    orientation: "landscape"
  },
  exteriorSpread: {
    leftPanelIndex: 5,   // Page 5: Process Model & Software
    centerPanelIndex: 6, // Page 6: Back Cover (CTA & Contact)
    rightPanelIndex: 1   // Page 1: Front Cover
  },
  interiorSpread: {
    leftPanelIndex: 4,   // Page 4: Networks, Fiber, VoIP & Power Fabric
    centerPanelIndex: 3, // Page 3: CCTV, Security & Hardware Engineering
    rightPanelIndex: 2   // Page 2: Smart Buildings & Educational Tech
  },
  panels: [
    // =========================================================================
    // PAGE 1: FRONT COVER (جلد روی بروشور)
    // =========================================================================
    {
      pageNumber: 1,
      slug: "front-cover",
      type: "front_cover",
      titleFa: "نُـوَند",
      titleEn: "NOVAND",
      subtitleFa: "راهکارهای یکپارچه فناوری و مهندسی زیرساخت",
      subtitleEn: "INTEGRATED TECHNOLOGY & INFRASTRUCTURE SOLUTIONS",
      image: "/images/hero-datacenter.jpg",
      imageCaptionFa: "معماری پیشرفته زیرساخت فناوری و مراکز پردازش داده",
      imageCaptionEn: "Advanced technology infrastructure & data processing architecture",
      badges: ["SMART BUILDINGS", "AI CCTV & SECURITY", "ENTERPRISE NETWORKS", "VOIP & FIBER"],
      contentFa: {
        lead: "همگرایی بی‌نقص اتوماسیون هوشمند، امنیت فیزیکی، شبکه‌های داده و زیرساخت‌های ارتباطی پایدار",
        paragraphs: [
          "طراحی، تأمین تجهیزات اصلی، اجرا و پشتیبانی تخصصی پروژه‌های مقیاس‌پذیر برای مجتمع‌های مسکونی، دفاتر شرکتی، مراکز آموزشی و سازمان‌های پیشرو."
        ]
      }
    },

    // =========================================================================
    // PAGE 2: SMART LIVING, EDUCATIONAL TECH & AUTOMATION
    // =========================================================================
    {
      pageNumber: 2,
      slug: "intro-smart-homes",
      type: "intro_smart_homes",
      titleFa: "هوشمندسازی ساختمان، مدارس و اتوماسیون",
      titleEn: "SMART BUILDINGS & EDUCATIONAL SPACES",
      subtitleFa: "همگرایی معماری مدرن، اتوماسیون یکپارچه و بسترهای آموزشی",
      subtitleEn: "Engineering Convergence, Facility Automation & Smart Schools",
      image: "/images/residential-smart-home.jpg",
      imageCaptionFa: "پیاده‌سازی سیستم‌های اتوماسیون و روشنایی هوشمند هماهنگ با معماری فضا",
      imageCaptionEn: "Discrete smart lighting & automation integration preserving aesthetic integrity",
      badges: ["KNX & Zigbee", "BMS", "Smart Schools", "Multi-Zone Audio"],
      contentFa: {
        lead: "نُـوَند با استانداردسازی و تلفیق هوشمندانه ارکان فنی ساختمان و مراکز آموزشی، بهره‌وری انرژی و آسایش فضا را به بالاترین سطح ممکن ارتقا می‌دهد.",
        paragraphs: [
          "تیم متخصص ما با معماری باز و بدون وابستگی انحصاری به برندها، سیستم‌های روشنایی، سرمایش‌گرمایش و صوتی را در قالب سامانه‌ای یکپارچه پیاده‌سازی می‌کند."
        ],
        bulletSections: [
          {
            title: "ساختمان‌ها و فضاهای مسکونی هوشمند (Smart Homes & BMS)",
            icon: "home",
            items: [
              "کنترل هوشمند روشنایی تطبیقی، تهویه مطبوع (HVAC) و پرده‌های برقی",
              "یکپارچه‌سازی با پروتکل‌های استاندارد جهانی KNX، Zigbee و Modbus بدون وابستگی به برند",
              "سیستم صوتی یکپارچه چندناحیه‌ای (Multi-Zone Audio) و سناریوهای بهینه‌سازی مصرف انرژی",
              "داشبوردهای مدیریتی روی تاچ‌پنل‌های دیواری و اپلیکیشن‌های موبایل با کنترل امن از راه دور"
            ]
          },
          {
            title: "تجهیز و هوشمندسازی مدارس و مراکز آموزشی (Smart Schools)",
            icon: "school",
            items: [
              "نمایشگرهای لمسی تعاملی و بردهای هوشمند آموزشی جهت ارتقای پویایی کلاس‌ها",
              "سیستم‌های صوتی پیجینگ هوشمند، فراخوان کلاسی و زنگ اتوماتیک زمان‌بندی‌شده",
              "بستر ارتباطی کلاسی امن، سامانه‌های حضور و غیاب دیجیتال و شبکه وایرلس پرسرعت"
            ]
          },
          {
            title: "اتوماسیون صنعتی و پایش محیطی (Environmental & Industrial IoT)",
            icon: "building",
            items: [
              "پایش سنسوری بلادرنگ دما، رطوبت، گازها و روشنایی محیطی در مراکز حساس",
              "اتوماسیون گلخانه‌ها، آبیاری خودکار و تهویه کنترل‌شده با داشبورد هشدار ۲۴ ساعته"
            ]
          }
        ]
      }
    },

    // =========================================================================
    // PAGE 3: AI CCTV, SECURITY & HARDWARE ENGINEERING
    // =========================================================================
    {
      pageNumber: 3,
      slug: "security-networks",
      type: "security_networks",
      titleFa: "نظارت تصویری هوشمند و خدمات تخصصی سخت‌افزار",
      titleEn: "AI CCTV, SECURITY & HARDWARE MAINTENANCE",
      subtitleFa: "حفاظت پیرامونی هوشمند، مانیتورینگ متمرکز و عیب‌یابی بردهای الکترونیکی",
      subtitleEn: "Intelligent Physical Security & Component-Level Hardware Engineering",
      image: "/images/security-surveillance.jpg",
      imageCaptionFa: "سیستم‌های نظارتی مجهز به هوش مصنوعی و تجهیزات پردازش در لبه",
      imageCaptionEn: "AI-assisted surveillance networks & enterprise edge processing enclosures",
      badges: ["AI IP-CCTV", "Control Rooms", "Biometrics", "Hardware Repair"],
      contentFa: {
        lead: "امنیت فیزیکی پیوسته و نگهداری بدون وقفه سخت‌افزارهای سازمانی، بنیاد پایداری هر کسب‌وکار و تأسیسات پیشرفته است.",
        bulletSections: [
          {
            title: "سیستم‌های نظارت تصویری و حفاظت پیرامونی (AI CCTV & Surveillance)",
            icon: "shield",
            items: [
              "دوربین‌های مداربسته IP با وضوح تصویر 4K و دید در شب رنگی تمام‌عیار (Ultra Low-Light)",
              "تحلیل هوشمند تصاویر در لبه: تشخیص چهره، پلاک‌خوان هوشمند (LPR) و خطوط فرضی هشدار",
              "طراحی و استقرار مراکز مانیتورینگ متمرکز، نرم‌افزارهای مدیریت تصویر (VMS) و ویدئو وال",
              "سامانه‌های کنترل تردد بیومتریک (کارت هوشمند، اثر انگشت، تشخیص چهره) و گیت‌های تردد"
            ]
          },
          {
            title: "تعمیرات تخصصی و سرویس سخت‌افزار (Hardware Repair & Maintenance)",
            icon: "tool",
            items: [
              "عیب‌یابی فوق‌تخصصی و تعمیر بردهای الکترونیکی در سطح کامپوننت (Component-Level Repair)",
              "تعمیر، بازسازی و سرویس دوره‌ای سوئیچ‌های شبکه، روترها، سرورها و تجهیزات رک‌مونت",
              "سرویس و ارتقای سخت‌افزاری کامپیوترها، ورک‌استیشن‌ها و لپ‌تاپ‌های سازمانی",
              "تأمین قطعات یدکی اورجینال، تعویض چیپ‌ها و پشتیبانی فنی سخت‌افزاری در محل کارفرما"
            ]
          }
        ]
      }
    },

    // =========================================================================
    // PAGE 4: NETWORKS, FIBER OPTICS, VOIP & BATTERY TELEMETRY
    // =========================================================================
    {
      pageNumber: 4,
      slug: "fiber-voip-servers",
      type: "fiber_voip_servers",
      titleFa: "زیرساخت شبکه، فیبر نوری، ویپ و تاب‌آوری انرژی",
      titleEn: "NETWORKS, OPTICS, VOIP & POWER RESILIENCY",
      subtitleFa: "کابل‌کشی ساخت‌یافته، فیبر نوری، تلفن ابری و پایش تله‌متری باتری",
      subtitleEn: "Structured Cabling, Optical Fabric, Enterprise VoIP & Battery Telemetry",
      image: "/images/network-cabling.jpg",
      imageCaptionFa: "آرایش فیبر نوری FTTH، سوئیچینگ سازمانی و سیستم‌های تغذیه دیتاسنتر",
      imageCaptionEn: "FTTH optical terminations, enterprise switching & datacenter power enclosures",
      badges: ["Cat6A / Cat7", "FTTH / FTTB", "VoIP SIP Trunk", "Battery Telemetry"],
      contentFa: {
        lead: "بسترهای مخابراتی پرسرعت و تأمین توان پیوسته با پایش مداوم باتری‌ها، بقای بدون وقفه سازمان را تضمین می‌کنند.",
        bulletSections: [
          {
            title: "زیرساخت شبکه پسیو و اکتیو (Enterprise Network Infrastructure)",
            icon: "network",
            items: [
              "کابل‌کشی ساخت‌یافته استاندارد مس (Cat6A / Cat7)، ترانکینگ، آرایش رک و آزمون معتبر فلوک",
              "پیکربندی سوئیچ‌ها و روترهای سیسکو و میکروتیک (Cisco & MikroTik Enterprise Routing)",
              "بخش‌بندی امنیتی ترافیک (VLAN)، اولویت‌بندی (QoS)، فایروال‌های سخت‌افزاری و Site-to-Site VPN",
              "وای‌فای سازمانی با پوشش سراسری بدون نقطه کور و رومینگ بدون قطعی (Seamless Roaming)"
            ]
          },
          {
            title: "زیرساخت فیبر نوری و مراکز تلفن ویپ (Fiber Optics & Enterprise VoIP)",
            icon: "cable",
            items: [
              "پیاده‌سازی لینک‌های پرسرعت فیبر نوری FTTH و FTTB، فیوژن دقیق و تست با دستگاه‌های کالیبره OTDR",
              "راه‌اندازی سرورهای تلفنی VoIP (ایزابل، الستیکس و FreePBX) و اتصال خطوط سیپ‌ترانک مخابرات",
              "منشی تلفنی هوشمند (IVR)، صف‌های پاسخگویی، ضبط مکالمات و انتقال امن تماس روی موبایل",
              "تجهیز سالن‌های جلسات به وبینار و پلتفرم‌های تعاملی ویدئوکنفرانس سازمانی"
            ]
          },
          {
            title: "سرورها، مجازی‌سازی و پایش باتری (Virtualization & Battery Telemetry)",
            icon: "server",
            items: [
              "پیکربندی سرورهای HP ProLiant، مجازی‌سازی منابع با VMware ESXi و پشتیبان‌گیری خودکار Veeam",
              "نصب سیستم‌های برق اضطراری صنعتی آنلاین (UPS) و کالیبراسیون مصرف توان تجهیزات",
              "پایش لحظه‌ای سلامت باتری‌ها، تله‌متری آنلاین مقاومت داخلی و ولتاژ سلول‌ها جهت پیشگیری از خاموشی"
            ]
          }
        ]
      }
    },

    // =========================================================================
    // PAGE 5: 4-STEP SERVICE MODEL, SOURCING & SOFTWARE WORKFLOWS
    // =========================================================================
    {
      pageNumber: 5,
      slug: "process-model",
      type: "process_model",
      titleFa: "فرآیند ۴ مرحله‌ای خدمات و تأمین قطعات",
      titleEn: "THE 4-STEP ENGINEERING LIFECYCLE",
      subtitleFa: "از ارزیابی و تأمین مستقیم تا استقرار دقیق، توسعه نرم‌افزار و پشتیبانی",
      subtitleEn: "From Audit & BOM Sourcing to Deployment, Software & 24/7 SLA Support",
      image: "/images/business-office.jpg",
      imageCaptionFa: "رویکرد مهندسی گام‌به‌گام برای اطمینان از خروجی استاندارد و رضایت کامل کارفرما",
      imageCaptionEn: "Systematic 4-phase lifecycle ensuring standards compliance & client satisfaction",
      badges: ["مشاوره و ارزیابی", "تأمین تجهیزات و BOM", "اجرا و پیاده‌سازی", "پشتیبانی و SLA"],
      contentFa: {
        lead: "در نُـوَند، تحویل پروژه یک رویداد مقطعی نیست؛ بلکه زنجیره‌ای مهندسی‌شده از خدمات متعهدانه و تک‌منبعی است.",
        steps: [
          {
            number: "۰۱",
            title: "مشاوره و تحلیل نیازها",
            titleEn: "Audit & Consultation",
            description: "بازدید حضوری از سایت، تحلیل محدودیت‌های فیزیکی، ممیزی کابل‌کشی و سنجش نیازهای کارفرما برای دستیابی به بهینه‌ترین سناریوی فنی.",
            outputs: ["گزارش ممیزی سایت", "تحلیل بار مصرفی و پهنای باند", "برآورد اقتصادی بهینه"]
          },
          {
            number: "۰۲",
            title: "تأمین تجهیزات و قطعات اصلی",
            titleEn: "Equipment Supply & BOM",
            description: "تأمین مستقیم و بدون واسطه از برندهای معتبر جهانی، ارائه ساختار شکست اقلام (BOM) و تضمین ۱۰۰ درصدی اصالت قطعات.",
            outputs: ["لیست قطعات مهندسی (BOM)", "تجهیزات با گارانتی رسمی", "تضمین اصالت کالا"]
          },
          {
            number: "۰۳",
            title: "اجرا و پیاده‌سازی استاندارد",
            titleEn: "Deployment & Commissioning",
            description: "نصب فیزیکی، ترانکینگ، فیوژن فیبر، آرایش داکت‌ها و رک‌ها، پیکربندی نرم‌افزاری و سخت‌افزاری، امن‌سازی فریم‌ورها و تست عملیاتی.",
            outputs: ["تست فلوک کابل‌کشی", "نقشه‌های توپولوژی و As-Built", "گزارش آزمون تحویل پروژه"]
          },
          {
            number: "۰۴",
            title: "پشتیبانی و نگهداری مستمر",
            titleEn: "Support & Maintenance SLA",
            description: "پایش دوره‌ای تجهیزات، به‌روزرسانی مداوم، پاسخگویی به درخواست‌های فنی و ارائه خدمات پشتیبانی ویژه بر پایه توافق‌نامه سطح خدمات.",
            outputs: ["پاسخگویی سریع بر اساس SLA", "پایش پیشگیرانه سیستم‌ها", "پشتیبان‌گیری دوره‌ای منظم"]
          }
        ],
        bulletSections: [
          {
            title: "توسعه نرم‌افزار، پرتال‌های وب و گردش‌کارهای هوش مصنوعی (Software & AI Workflows)",
            icon: "code",
            items: [
              "استقرار و کانفیگ سیستم‌عامل‌های سرور (Linux Enterprise / Windows Server)",
              "توسعه وب‌سایت‌ها، پرتال‌های سازمانی و یکپارچه‌سازی سیستم‌ها از طریق وب‌سرویس و API",
              "اتوماسیون فرآیندهای کسب‌وکار با بهره‌گیری از ابزارهای نوین و جریان‌های هوش مصنوعی"
            ]
          }
        ]
      }
    },

    // =========================================================================
    // PAGE 6: BACK COVER & CALL TO ACTION (جلد پشت بروشور و راه‌های ارتباطی)
    // =========================================================================
    {
      pageNumber: 6,
      slug: "back-cover",
      type: "back_cover",
      titleFa: "ارتباط مستقیم با نُـوَند",
      titleEn: "CONNECT WITH NOVAND",
      subtitleFa: "شروع همکاری، هماهنگی بازدید فنی و مشاوره مهندسی",
      subtitleEn: "Start Your Next Project with Certainty & Modern Engineering Standards",
      image: "/images/specialized-infrastructure.jpg",
      imageCaptionFa: "کارت ویزیت دیجیتال، مشاوره تخصصی و نشانی دفتر مرکزی",
      imageCaptionEn: "Digital card access, direct technical consultation & headquarters",
      badges: ["مشاوره فنی حضوری", "پاسخگویی سریع", "کارت ویزیت دیجیتال", "سعادت‌آباد تهران"],
      contentFa: {
        lead: "برای دریافت مشاوره تخصصی، هماهنگی بازدید کارشناسی از پروژه و یا استعلام قیمت تجهیزات، با کارشناسان فنی نُـوَند در ارتباط باشید.",
        contactDetails: {
          companyName: "مهندسی سیستم‌ها و فناوری نُـوَند (Novand)",
          tagline: "راهکارهای جامع فناوری، هوشمندسازی، نظارت تصویری و شبکه",
          address: "تهران، سعادت‌آباد، بلوار مدیریت، خیابان علامه طباطبایی جنوبی، بیست‌وچهارم غربی، پلاک ۲۶، واحد ۱۷",
          primaryPhone: "0912 932 1550",
          primaryContact: "مهندس محمود احمدی",
          instagram: "@novand_tech",
          email: "novand.info@gmail.com",
          website: "novand-tech.com",
          qrNote: "اسکن کارت ویزیت دیجیتال و دسترسی سریع"
        }
      }
    }
  ]
};
