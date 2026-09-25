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
      secondaryPhone: string;
      secondaryContact: string;
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
    leftPanelIndex: number;   // Panel 4 (Fiber, VoIP, Servers)
    centerPanelIndex: number; // Panel 3 (CCTV & Network)
    rightPanelIndex: number;  // Panel 2 (Intro & Smart Homes)
  };
  panels: BrochurePanel[];
}

export const brochureData: BrochureData = {
  title: "بروشور و دفترچه راهنمای جامع مهندسی نُـوَند",
  subtitle: "راهکارهای یکپارچه فناوری، هوشمندسازی، نظارت تصویری و زیرساخت شبکه",
  paperFormat: "A4 Tri-Fold & 6-Page Booklet",
  printDimensions: {
    widthMm: 297,
    heightMm: 210,
    dpi: 300,
    orientation: "landscape"
  },
  exteriorSpread: {
    leftPanelIndex: 5,   // Page 5: Process Model
    centerPanelIndex: 6, // Page 6: Back Cover (CTA & Contact)
    rightPanelIndex: 1   // Page 1: Front Cover
  },
  interiorSpread: {
    leftPanelIndex: 4,   // Page 4: Fiber Optic & VoIP
    centerPanelIndex: 3, // Page 3: CCTV & Networks
    rightPanelIndex: 2   // Page 2: Intro & Smart Homes
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
      badges: ["SMART HOMES", "CCTV & SECURITY", "NETWORK INFRASTRUCTURE", "VOIP & FIBER"],
      contentFa: {
        lead: "همگرایی بی‌نقص اتوماسیون هوشمند، امنیت فیزیکی، شبکه‌های داده و زیرساخت‌های ارتباطی پایدار",
        paragraphs: [
          "طراحی، تأمین تجهیزات اصلی، اجرا و پشتیبانی تخصصی پروژه‌های مقیاس‌پذیر برای مجتمع‌های مسکونی، دفاتر شرکتی، مراکز آموزشی و سازمان‌های پیشرو."
        ]
      }
    },

    // =========================================================================
    // PAGE 2: BUSINESS INTRODUCTION & SMART HOMES (معرفی نُوَند و هوشمندسازی)
    // =========================================================================
    {
      pageNumber: 2,
      slug: "intro-smart-homes",
      type: "intro_smart_homes",
      titleFa: "معرفی نُـوَند و خانه‌های هوشمند",
      titleEn: "ABOUT NOVAND & SMART BUILDINGS",
      subtitleFa: "همگرایی مهندسی، معماری مدرن و اتوماسیون تجهیزات",
      subtitleEn: "Engineering Convergence, Modern Architecture & Building Automation",
      image: "/images/residential-smart-home.jpg",
      imageCaptionFa: "پیاده‌سازی سیستم‌های اتوماسیون و روشنایی هوشمند بدون تغییر در معماری فضا",
      imageCaptionEn: "Discrete smart lighting & automation integration preserving aesthetic integrity",
      badges: ["KNX & Zigbee", "BMS", "PoE Lighting", "Greenhouse Automation"],
      contentFa: {
        lead: "نُـوَند به عنوان یک شریک مهندسی فناوری یکپارچه عمل می‌کند. زمانی که حوزه‌های شبکه، امنیت و اتوماسیون به صورت جزیره‌ای طراحی شوند، سازمان‌ها با شکاف یکپارچگی و هزینه‌های مازاد روبه‌رو می‌شوند.",
        paragraphs: [
          "تیم متخصص ما با بهره‌گیری از استانداردهای روز بین‌المللی، تمامی ارکان فنی ساختمان را در قالب یک سامانه واحد و هماهنگ مهندسی می‌کند."
        ],
        bulletSections: [
          {
            title: "خانه‌ها و ساختمان‌های هوشمند (Smart Homes & BMS)",
            icon: "home",
            items: [
              "کنترل یکپارچه و هوشمند سیستم‌های روشنایی، تهویه مطبوع (HVAC)، پرده‌های برقی و صوتی‌تصویری",
              "یکپارچه‌سازی با پروتکل‌های استاندارد جهانی KNX، Zigbee و Modbus بدون وابستگی به یک برند",
              "مدیریت سناریوهای مصرف انرژی و کاهش هزینه‌های جاری با هوشمندسازی تطبیقی",
              "امکان کنترل و مانیتورینگ امن از راه دور از طریق اپلیکیشن‌های موبایل اختصاصی"
            ]
          },
          {
            title: "اتوماسیون مراکز آموزشی و گلخانه‌های صنعتی",
            icon: "building",
            items: [
              "هوشمندسازی مدارس: تخته‌های تعاملی، سیستم‌های صوتی پیجینگ کلاسی و حضور/غیاب آنلاین",
              "کنترل هوشمند گلخانه و مراکز کشاورزی: پایش سنسوری رطوبت خاک، دما، آبیاری اتوماتیک و تهویه مطبوع"
            ]
          }
        ]
      }
    },

    // =========================================================================
    // PAGE 3: CCTV & NETWORK INFRASTRUCTURE (نظارت تصویری و زیرساخت شبکه)
    // =========================================================================
    {
      pageNumber: 3,
      slug: "security-networks",
      type: "security_networks",
      titleFa: "نظارت تصویری و زیرساخت شبکه",
      titleEn: "CCTV SYSTEMS & NETWORK INFRASTRUCTURE",
      subtitleFa: "حفاظت فیزیکی هوشمند و بستر ارتباطی پرسرعت سازمانی",
      subtitleEn: "Intelligent Physical Security & Enterprise High-Speed Data Fabric",
      image: "/images/security-surveillance.jpg",
      imageCaptionFa: "سیستم‌های نظارتی مجهز به هوش مصنوعی و تجهیزات سوئیچینگ سازمانی",
      imageCaptionEn: "AI-assisted surveillance networks & enterprise switching enclosures",
      badges: ["AI IP-CCTV", "Cisco & MikroTik", "Structured Cabling", "VLAN & QoS"],
      contentFa: {
        lead: "امنیت فیزیکی پیوسته و شبکه بدون قطعی، ستون فقرات هر کسب‌وکار و ساختمان مدرن است.",
        bulletSections: [
          {
            title: "سیستم‌های نظارت تصویری و حفاظت پیرامونی (CCTV & Security)",
            icon: "shield",
            items: [
              "طراحی و نصب دوربین‌های مداربسته IP با وضوح تصویر 4K و قابلیت دید در شب رنگی فوق‌پیشرفته",
              "پیاده‌سازی هوش مصنوعی در پایش: تشخیص چهره، پلاک‌خوان هوشمند (LPR) و خطوط فرضی هشدار",
              "تجهیز اتاق‌های کنترل، مانیتورینگ متمرکز (VMS) و دیوارهای ویدئویی (Video Walls)",
              "سیستم‌های کنترل تردد پرسنل با کارت‌های هوشمند و شناسایی بیومتریک (اثر انگشت و چهره)"
            ]
          },
          {
            title: "زیرساخت شبکه و خدمات تخصصی IT (Network Infrastructure)",
            icon: "network",
            items: [
              "کابل‌کشی ساخت‌یافته استاندارد مس (Cat6A / Cat7) به همراه ترانکینگ و آرایش استاندارد رک",
              "پیکربندی سوئیچ‌ها و روترهای سیسکو و میکروتیک (Cisco & MikroTik Enterprise Routing)",
              "بخش‌بندی دفاعی شبکه (VLAN Segmentation)، اولویت‌بندی ترافیک (QoS) و فایروال‌های سخت‌افزاری",
              "برقراری ارتباط امن میان شعب (Site-to-Site VPN) و استقرار وای‌فای سراسری با رومینگ یکپارچه"
            ]
          }
        ]
      }
    },

    // =========================================================================
    // PAGE 4: FIBER OPTIC & VOIP TELEPHONY (فیبر نوری و مراکز تلفن ویپ)
    // =========================================================================
    {
      pageNumber: 4,
      slug: "fiber-voip-servers",
      type: "fiber_voip_servers",
      titleFa: "فیبر نوری، VoIP و مدیریت سرور",
      titleEn: "FIBER OPTIC, VOIP & SERVER PLATFORMS",
      subtitleFa: "پهنای باند فوق‌سریع، ارتباطات مدرن سازمانی و تاب‌آوری سیستم‌ها",
      subtitleEn: "Ultra-High Bandwidth, Unified Communications & System Resiliency",
      image: "/images/network-cabling.jpg",
      imageCaptionFa: "آرایش فیبر نوری FTTH، پچ‌پنل‌های نوری و کلاسترهای مجازی‌سازی سرور",
      imageCaptionEn: "FTTH optical terminations, enterprise patch panels & server virtualization clusters",
      badges: ["FTTH / FTTB", "VoIP SIP Trunk", "VMware ESXi", "UPS & Power"],
      contentFa: {
        lead: "ارتباطات مخابراتی پرسرعت و مدیریت متمرکز سرورها ضامن رشد پیوسته سازمان‌ها در عصر دیجیتال است.",
        bulletSections: [
          {
            title: "زیرساخت فیبر نوری (FTTH / FTTB Fiber Optics)",
            icon: "cable",
            items: [
              "کابل‌کشی تخصصی فیبر نوری در فواصل طولانی و مجتمع‌های مسکونی/تجاری (Fiber to the Home)",
              "فیوژن حرفه‌ای، سربندی پچ‌پنل‌های نوری و تست‌های افت توان با دستگاه‌های کالیبره OTDR",
              "تضمین پهنای‌باند گیگابیتی و حداقل تاخیر برای ارتباط میان طبقات، ساختمان‌ها و دیتاسنترها"
            ]
          },
          {
            title: "مراکز تلفن سازمانی VoIP و ارتباطات یکپارچه",
            icon: "phone",
            items: [
              "راه‌اندازی سرورهای تلفنی VoIP مبتنی بر استریسک، ایزابل (Issabel) و الستیکس",
              "اتصال خطوط سیپ‌ترانک مخابرات (SIP Trunk) با ظرفیت همزمان ده‌ها تماس ورودی و خروجی",
              "منشی تلفنی هوشمند چندسطحی (IVR)، صف‌های پاسخگویی، ضبط مکالمات و انتقال تماس روی موبایل",
              "تجهیز سالن‌های جلسات به وبینار و پلتفرم‌های تعاملی ویدئوکنفرانس سازمانی"
            ]
          },
          {
            title: "مدیریت سرور، مجازی‌سازی و برق اضطراری (UPS)",
            icon: "server",
            items: [
              "پیکربندی سرورهای HP ProLiant، مجازی‌سازی منابع با VMware ESXi و پشتیبان‌گیری منظم Veeam",
              "محاسبه توان و نصب سیستم‌های برق اضطراری (UPS) رک‌مونت و صنعتی برای حفظ پایداری دائمی"
            ]
          }
        ]
      }
    },

    // =========================================================================
    // PAGE 5: 4-STEP SERVICE MODEL (مدل فرآیند ۴ مرحله‌ای خدمات نُوَند)
    // =========================================================================
    {
      pageNumber: 5,
      slug: "process-model",
      type: "process_model",
      titleFa: "فرآیند ۴ مرحله‌ای خدمات نُـوَند",
      titleEn: "THE 4-STEP ENGINEERING LIFECYCLE",
      subtitleFa: "از ارزیابی و مشاوره اولیه تا تأمین، استقرار دقیق و پشتیبانی دائمی",
      subtitleEn: "From Initial Audit & Consulting to Procurement, Deployment & 24/7 SLA Support",
      image: "/images/business-office.jpg",
      imageCaptionFa: "رویکرد مهندسی گام‌به‌گام برای اطمینان از خروجی استاندارد و رضایت کامل کارفرما",
      imageCaptionEn: "Systematic 4-phase lifecycle ensuring standards compliance & client satisfaction",
      badges: ["مشاوره", "تأمین تجهیزات", "اجرا و پیاده‌سازی", "پشتیبانی و SLA"],
      contentFa: {
        lead: "در نُـوَند، تحویل پروژه یک رویداد مقطعی نیست؛ بلکه زنجیره‌ای مهندسی‌شده از خدمات متعهدانه است.",
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
            title: "تأمین تجهیزات اصلی و تخصصی",
            titleEn: "Equipment Supply & BOM",
            description: "تأمین مستقیم سخت‌افزارهای اورجینال از برندهای معتبر با گارانتی معتبر شرکتی، بدون واسطه و با تضمین اصالت ۱۰۰ درصدی قطعات.",
            outputs: ["لیست قطعات مهندسی (BOM)", "تجهیزات با گارانتی رسمی", "مشخصات فنی استاندارد"]
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
      subtitleFa: "پروژه بعدی خود را با اطمینان و استانداردهای روز مهندسی کنید",
      subtitleEn: "Engineer Your Next Project with Certainty & Modern Standards",
      image: "/images/specialized-infrastructure.jpg",
      imageCaptionFa: "کارت ویزیت دیجیتال، مشاوره تخصصی و نشانی دفتر مرکزی",
      imageCaptionEn: "Digital card access, direct technical consultation & headquarters",
      badges: ["مشاوره فنی حضوری", "پاسخگویی سریع", "کارت ویزیت دیجیتال", "سعادت‌آباد تهران"],
      contentFa: {
        lead: "برای دریافت مشاوره تخصصی، هماهنگی بازدید کارشناسی از پروژه و یا استعلام قیمت تجهیزات، کارشناسان فنی نُـوَند در کنار شما هستند.",
        contactDetails: {
          companyName: "مهندسی سیستم‌ها و فناوری نُـوَند (Novand)",
          tagline: "راهکارهای جامع فناوری، هوشمندسازی، نظارت تصویری و شبکه",
          address: "تهران، سعادت‌آباد، بلوار مدیریت، خیابان علامه طباطبایی جنوبی، بیست‌وچهارم غربی، پلاک ۲۶، واحد ۱۷",
          primaryPhone: "0912 932 1550",
          primaryContact: "مهندس محمود احمدی",
          secondaryPhone: "0919 691 8758",
          secondaryContact: "حسام‌الدین اشعری",
          instagram: "@novand_tech",
          email: "novand.info@gmail.com",
          website: "novand-tech.com",
          qrNote: "برای ذخیره آنی مخاطب، مسیریابی نقشه و گفت‌وگوی مستقیم در پیام‌رسان‌ها، بارکد را اسکن کنید."
        }
      }
    }
  ]
};
