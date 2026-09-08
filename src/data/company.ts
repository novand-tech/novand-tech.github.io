export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  headline: string;
  heroCopy: string;
  aboutHeadline: string;
  aboutCopy: string[];
  capabilities: string[];
  processSteps: {
    number: string;
    title: string;
    description: string;
    deliverables: string[];
  }[];
  whyUs: {
    title: string;
    description: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    hours: string;
    consultationNotice: string;
  };
}

export const companyDataEn: CompanyInfo = {
  name: "Novand",
  shortName: "Novand",
  tagline: "Integrated Technology & Infrastructure Solutions",
  headline: "Integrated Technology & Infrastructure Solutions",
  heroCopy: "Delivering end-to-end technology solutions across cutting-edge smart home automation, advanced computer networking, enterprise server administration, physical security, and specialized IT equipment procurement.",
  aboutHeadline: "Technology Systems Designed to Work Together",
  aboutCopy: [
    "Modern businesses, educational institutions, and residential spaces rely on a seamless convergence of data networking, physical security, environmental automation, and server infrastructure. When these disciplines are engineered in isolation, organizations experience chronic integration gaps, administrative overhead, and compromised reliability.",
    "Novand operates as an integrated technology engineering partner. Our practice unites structured cabling and FTTH fiber optics, CCNA-grade Cisco and MikroTik networking, Linux/macOS and VMware virtualization, unified VoIP communications, comprehensive smart home and greenhouse automation, CCTV surveillance, and specialized hardware repair and procurement.",
    "With a proven track record delivering multi-faceted projects spanning corporate networks, CCTV surveillance, hardware repair, smart schools, and unified communications, our team provides end-to-end solutions engineered to modernize, secure, and streamline your operations."
  ],
  capabilities: [
    "Smart Homes & Automation",
    "Comprehensive Networking",
    "Enterprise IT & VoIP",
    "Systems & Virtualization",
    "CCTV & Physical Security",
    "Hardware & Procurement"
  ],
  processSteps: [
    {
      number: "01",
      title: "Understand",
      description: "Thorough assessment of physical facilities, existing infrastructure, technical prerequisites, security posture, and operational objectives.",
      deliverables: ["Site audit report", "Bandwidth & power profiling", "Constraints analysis"]
    },
    {
      number: "02",
      title: "Design",
      description: "Comprehensive architectural engineering, topological schematics, hardware bill of materials, and vendor-neutral equipment specification.",
      deliverables: ["Network & cabling diagrams", "Rack elevation schematics", "Equipment specifications"]
    },
    {
      number: "03",
      title: "Implement",
      description: "Physical deployment, structured termination, firmware hardening, operating system provisioning, protocol configuration, and commissioning.",
      deliverables: ["Certified cable testing", "Configured baseline backups", "Acceptance test logs"]
    },
    {
      number: "04",
      title: "Support",
      description: "Proactive monitoring, lifecycle patch administration, configuration management, and ongoing technical support.",
      deliverables: ["As-built documentation", "System runbooks", "SLA-backed response"]
    }
  ],
  whyUs: [
    {
      title: "Integrated Expertise",
      description: "Cross-domain mastery spanning physical low-voltage cabling, enterprise switching, server virtualization, and building automation protocols."
    },
    {
      title: "Practical Engineering",
      description: "Pragmatic, standard-based solutions engineered for stability, serviceability, and maintainability over marketing-driven complexity."
    },
    {
      title: "Scalable Infrastructure",
      description: "Modular topologies and structured architectures designed to expand cleanly as bandwidth, endpoint density, and facility footprints increase."
    },
    {
      title: "Security & Reliability",
      description: "Defensive segmentation, physical enclosure hardening, automated backup policies, and resilient failover built into every design tier."
    },
    {
      title: "End-to-End Delivery",
      description: "Single-source accountability from initial discovery and vendor procurement assistance through deployment, commissioning, and support."
    }
  ],
  contactInfo: {
    email: "novand.info@gmail.com",
    phone: "+1 (555) 234-8900",
    address: "Engineering Center: 440 Industrial Parkway, Suite 200, Tech District",
    hours: "Monday – Friday: 08:00 – 18:00 (Emergency response available for contracted facilities)",
    consultationNotice: "All consultation requests are reviewed directly by technical engineering staff."
  }
};

export const companyDataFa: CompanyInfo = {
  name: "نُوَند",
  shortName: "نُوَند",
  tagline: "راهکارهای جامع فناوری و زیرساخت",
  headline: "راهکارهای جامع فناوری و زیرساخت",
  heroCopy: "ارائه راهکارهای یکپارچه فناوری شامل اتوماسیون پیشرفته ساختمان و خانه‌هوشمند، شبکه‌های کامپیوتری، مدیریت سرورهای سازمانی، امنیت فیزیکی و تأمین تجهیزات تخصصی IT.",
  aboutHeadline: "سیستم‌های فناوری، طراحی شده برای کار یکپارچه",
  aboutCopy: [
    "کسب‌وکارهای مدرن، مراکز آموزشی و فضاهای مسکونی امروزی به همگرایی بی‌نقص شبکه‌های داده، امنیت فیزیکی، اتوماسیون محیطی و زیرساخت سرور وابسته هستند. هنگامی که این حوزه‌ها به‌صورت مجزا مهندسی شوند، سازمان‌ها با شکاف‌های یکپارچگی، سربار مدیریتی و کاهش قابلیت اطمینان مواجه می‌شوند.",
    "نُوَند به عنوان یک شریک مهندسی فناوری یکپارچه عمل می‌کند. تخصص ما شامل کابل‌کشی ساخت‌یافته و فیبر نوری (FTTH)، شبکه‌های سیسکو و میکروتیک در سطح CCNA، مجازی‌سازی لینوکس/macOS و VMware، ارتباطات یکپارچه VoIP، اتوماسیون جامع خانه هوشمند و گلخانه، نظارت تصویری CCTV، و تعمیر و تأمین سخت‌افزارهای تخصصی است.",
    "تیم ما با سابقه درخشان در اجرای پروژه‌های چندوجهی، از شبکه‌های سازمانی و سیستم‌های نظارتی گرفته تا تعمیرات سخت‌افزاری و هوشمندسازی مدارس، راهکارهای جامعی را برای نوسازی، ایمن‌سازی و بهینه‌سازی عملیات شما مهندسی و پیاده‌سازی می‌کند."
  ],
  capabilities: [
    "خانه‌های هوشمند و اتوماسیون",
    "شبکه‌های کامپیوتری جامع",
    "IT سازمانی و VoIP",
    "سیستم‌ها و مجازی‌سازی",
    "CCTV و امنیت فیزیکی",
    "سخت‌افزار و تأمین تجهیزات"
  ],
  processSteps: [
    {
      number: "۰۱",
      title: "درک و تحلیل",
      description: "ارزیابی دقیق امکانات فیزیکی، زیرساخت‌های موجود، پیش‌نیازهای فنی، وضعیت امنیت و اهداف عملیاتی.",
      deliverables: ["گزارش ممیزی سایت", "پروفایل پهنای‌باند و توان", "تحلیل محدودیت‌ها"]
    },
    {
      number: "۰۲",
      title: "طراحی",
      description: "مهندسی معماری جامع، نقشه‌های توپولوژی، لیست قطعات سخت‌افزاری (BOM) و مشخصات تجهیزات مستقل از برند.",
      deliverables: ["نقشه‌های شبکه و کابل‌کشی", "شماتیک‌های چیدمان رک", "مشخصات فنی تجهیزات"]
    },
    {
      number: "۰۳",
      title: "پیاده‌سازی",
      description: "استقرار فیزیکی، سربندی استاندارد، امن‌سازی فریم‌ورها، نصب سیستم‌عامل، پیکربندی پروتکل‌ها و راه‌اندازی.",
      deliverables: ["تست و گواهی کابل‌کشی", "بکاپ‌های پیکربندی پایه", "گزارش تست پذیرش"]
    },
    {
      number: "۰۴",
      title: "پشتیبانی",
      description: "نظارت پیشگیرانه، مدیریت پچ‌های نرم‌افزاری، مدیریت پیکربندی و پشتیبانی فنی مستمر.",
      deliverables: ["مستندات پیاده‌سازی", "دستورالعمل‌های سیستم", "پاسخگویی مبتنی بر SLA"]
    }
  ],
  whyUs: [
    {
      title: "تخصص یکپارچه",
      description: "تسلط همه‌جانبه بر کابل‌کشی فیزیکی جریان‌ضعیف، سوئیچینگ سازمانی، مجازی‌سازی سرور و پروتکل‌های اتوماسیون ساختمان."
    },
    {
      title: "مهندسی کاربردی",
      description: "راهکارهای عمل‌گرایانه و مبتنی بر استاندارد که برای پایداری، سرویس‌دهی و نگهداری آسان طراحی شده‌اند، نه پیچیدگی‌های تبلیغاتی."
    },
    {
      title: "زیرساخت مقیاس‌پذیر",
      description: "توپولوژی‌های ماژولار و معماری‌های ساخت‌یافته که برای توسعه آسان همگام با افزایش پهنای‌باند و تراکم کاربران طراحی شده‌اند."
    },
    {
      title: "امنیت و پایداری",
      description: "بخش‌بندی دفاعی، مقاوم‌سازی فیزیکی محفظه‌ها، سیاست‌های پشتیبان‌گیری خودکار و سیستم‌های جایگزین (Failover) در تمام لایه‌های طراحی."
    },
    {
      title: "تحویل صفر تا صد",
      description: "پاسخگویی و مسئولیت‌پذیری یکپارچه از مراحل اولیه کشف نیاز و مشاوره تأمین تجهیزات تا استقرار، راه‌اندازی و پشتیبانی."
    }
  ],
  contactInfo: {
    email: "novand.info@gmail.com",
    phone: "+1 (555) 234-8900",
    address: "مرکز مهندسی: ۴۴۰ پارک‌وی صنعتی، واحد ۲۰۰، منطقه فناوری",
    hours: "دوشنبه تا جمعه: ۰۸:۰۰ - ۱۸:۰۰ (پشتیبانی اضطراری ۲۴ ساعته برای قراردادهای فعال)",
    consultationNotice: "تمامی درخواست‌های مشاوره مستقیماً توسط کادر مهندسی فنی بررسی می‌شوند."
  }
};

export const getCompanyData = (url: string) => url.startsWith('/en') ? companyDataEn : companyDataFa;
// Deprecated: ensure backward compatibility before full migration
export const companyData = companyDataFa;
