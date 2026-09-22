export interface LandingProfile {
  name: string;
  tagline: string;
  bio: string;
  statusText: string;
  websiteLabel: string;
  websiteDesc: string;
  instagramLabel: string;
  instagramHandle: string;
  instagramUrl: string;
  instagramDesc: string;
  telegramLabel: string;
  telegramHandle: string;
  telegramUrl: string;
  telegramDesc: string;
  telegramDirectLabel: string;
  telegramDirectPhone: string;
  telegramDirectUrl: string;
  telegramDirectDesc: string;
  whatsappLabel: string;
  whatsappDesc: string;
  whatsappUrl: string;
  emailLabel: string;
  emailAddress: string;
  phonePrimary: string;
  phonePrimaryDisplay: string;
  phonePrimaryContact: string;
  phoneSecondary: string;
  phoneSecondaryDisplay: string;
  phoneSecondaryContact: string;
  addressFull: string;
  addressShort: string;
  hours: string;
  hoursNote: string;
  consultationNotice: string;
  vcardButtonText: string;
  callButtonText: string;
  servicesHeading: string;
  servicesSubheading: string;
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  maps: {
    googleLabel: string;
    googleUrl: string;
    neshanLabel: string;
    neshanUrl: string;
    baladLabel: string;
    baladUrl: string;
  };
  ui: {
    copy: string;
    copied: string;
    callNow: string;
    shareCard: string;
    qrModalTitle: string;
    qrModalDesc: string;
    close: string;
    downloadVcard: string;
    downloadQr: string;
    badgeEngineering: string;
    verifiedBusiness: string;
    officeLocation: string;
    directChannels: string;
    allRightsReserved: string;
    visitMainSite: string;
    telegramDirectChat: string;
    copyNumber: string;
    copyPrimaryPhone: string;
    copySecondaryPhone: string;
    copyAddress: string;
    toggleTheme: string;
    toggleLang: string;
    divisionsCount: string;
    technicalHotline: string;
    primaryPhoneTitle: string;
    secondaryPhoneTitle: string;
    quickContact: string;
    profilesAndWeb: string;
    closeDialog: string;
    copyLink: string;
  };
}

export const landingDataFa: LandingProfile = {
  name: "نُوَند",
  tagline: "راهکارهای جامع فناوری و زیرساخت",
  bio: "مهندسی، پیاده‌سازی و پشتیبانی یکپارچه خانه‌های هوشمند، شبکه‌های پیشرفته کامپیوتری، امنیت فیزیکی و سرورهای سازمانی",
  statusText: "آماده ارائه خدمات و مشاوره فنی",
  websiteLabel: "وب‌سایت جامع نُوَند",
  websiteDesc: "بررسی تمام پروژه‌ها، راهکارها و خدمات مهندسی در وب‌سایت اصلی",
  instagramLabel: "اینستاگرام نُوَند",
  instagramHandle: "@novand_tech",
  instagramUrl: "https://instagram.com/novand_tech",
  instagramDesc: "تصاویر پروژه‌ها، معرفی تجهیزات تخصصی و آموزش‌های فناوری",
  telegramLabel: "کانال تلگرام نُوَند",
  telegramHandle: "@novand_tech",
  telegramUrl: "https://t.me/novand_tech",
  telegramDesc: "اطلاعیه‌های فنی، مقالات تخصصی شبکه و اخبار تکنولوژی",
  telegramDirectLabel: "پیام مستقیم در تلگرام",
  telegramDirectPhone: "+98 919 691 8758",
  telegramDirectUrl: "https://t.me/+989196918758",
  telegramDirectDesc: "ارسال مستقیم و گفت‌وگوی مستقیم فنی با شماره \u200E\u202A۰۹۱۹ ۶۹۱ ۸۷۵۸\u202C\u200E",
  whatsappLabel: "گفت‌وگو در واتس‌اپ",
  whatsappDesc: "ارسال پیام مستقیم برای استعلام، هماهنگی و مشاوره سریع",
  whatsappUrl: "https://wa.me/989129321550?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%A7%D8%B2%20%D8%B7%D8%B1%DB%8C%D9%82%20%DA%A9%D8%A7%D8%B1%D8%AA%20%D9%88%DB%8C%D8%B2%DB%8C%D8%AA%20%D8%AF%DB%8C%D8%AC%DB%8C%D8%AA%D8%A7%D9%84%20%D9%86%D9%8F%D9%88%D9%8E%D9%86%D8%AF%20%D9%BE%DB%8C%D8%A7%D9%85%20%D9%85%DB%8C%E2%80%8C%D8%AF%D9%87%D9%85.",
  emailLabel: "ایمیل سازمانی",
  emailAddress: "novand.info@gmail.com",
  phonePrimary: "+989129321550",
  phonePrimaryDisplay: "۰۹۱۲ ۹۳۲ ۱۵۵۰",
  phonePrimaryContact: "مهندس محمود احمدی",
  phoneSecondary: "+989196918758",
  phoneSecondaryDisplay: "۰۹۱۹ ۶۹۱ ۸۷۵۸",
  phoneSecondaryContact: "حسام الدین اشعری",
  addressFull: "تهران، سعادت‌آباد، بلوار مدیریت، خیابان علامه طباطبایی جنوبی، بیست‌وچهارم غربی، پلاک ۲۶، واحد ۱۷",
  addressShort: "تهران، سعادت‌آباد، بلوار مدیریت، پلاک ۲۶",
  hours: "همه روزه (شنبه تا جمعه): ۰۸:۰۰ الی ۲۱:۰۰",
  hoursNote: "پشتیبانی اضطراری ۲۴ ساعته برای قراردادهای فعال سازمانی",
  consultationNotice: "تمامی استعلام‌ها و درخواست‌های مشاوره مستقیماً توسط کادر مهندسی فنی بررسی می‌شوند.",
  vcardButtonText: "ذخیره در مخاطبین تلفن",
  callButtonText: "تماس تلفنی مستقیم",
  servicesHeading: "حوزه‌های تخصصی مهندسی",
  servicesSubheading: "۶ دپارتمان تخصصی در خدمت نوسازی و امنیت زیرساخت شما",
  services: [
    {
      title: "اتوماسیون و خانه هوشمند",
      description: "هوشمندسازی روشنایی، سرمایش/گرمایش، سیستم صوتی چندناحیه‌ای و گلخانه‌های هوشمند",
      icon: "Cpu"
    },
    {
      title: "شبکه‌های کامپیوتری و فیبر نوری",
      description: "کابل‌کشی ساخت‌یافته، فیبر FTTH، سوئیچینگ سیسکو و میکروتیک و لینک‌های وایرلس",
      icon: "Network"
    },
    {
      title: "ارتباطات ویپ و IT سازمانی",
      description: "راه‌اندازی تلفن‌های اینترنتی VoIP، مراکز تماس ایزابل/استریسک و ترانک‌های مخابراتی",
      icon: "PhoneCall"
    },
    {
      title: "نظارت تصویری و امنیت فیزیکی",
      description: "دوربین‌های مداربسته تحت شبکه (IP CCTV)، کنترل تردد هوشمند و مانیتورینگ امنیتی",
      icon: "ShieldCheck"
    },
    {
      title: "سیستم‌ها و مجازی‌سازی سرور",
      description: "راه‌اندازی کلاسترهای VMware ESXi، سرورهای لینوکس و سیستم‌های پشتیبان‌گیری خودکار",
      icon: "Server"
    },
    {
      title: "تعمیرات و تأمین تجهیزات تخصصی",
      description: "تعمیرات الکترونیکی بردهای صنعتی، تأمین سرور، روتر، رک و قطعات اصلی زیرساخت",
      icon: "Wrench"
    }
  ],
  maps: {
    googleLabel: "Google Maps",
    googleUrl: "https://www.google.com/maps/search/?api=1&query=35.77618183390139,51.37842044504052+(Novand+Technology)",
    neshanLabel: "مسیریابی نشان",
    neshanUrl: "https://neshan.org/maps/@35.77618183390139,51.37842044504052,17z",
    baladLabel: "مسیریابی بلد",
    baladUrl: "https://balad.ir/location?latitude=35.77618183390139&longitude=51.37842044504052"
  },
  ui: {
    copy: "کپی",
    copied: "کپی شد!",
    callNow: "تماس مستقیم",
    shareCard: "اشتراک‌گذاری کارت",
    qrModalTitle: "کد QR کارت دیجیتال نُوَند",
    qrModalDesc: "برای باز کردن این صفحه در گوشی تلفن همراه، این بارکد را اسکن نمایید.",
    close: "بستن",
    downloadVcard: "دانلود فایل مخاطب (vCard)",
    downloadQr: "دریافت تصویر QR",
    badgeEngineering: "شریک مهندسی فناوری یکپارچه",
    verifiedBusiness: "کسب‌وکار تأیید شده مهندسی",
    officeLocation: "نشانی دفتر مرکزی",
    directChannels: "راه‌های ارتباطی و شبکه‌ها",
    allRightsReserved: "تمامی حقوق متعلق به شرکت نُوَند است.",
    visitMainSite: "ورود به وب‌سایت اصلی",
    telegramDirectChat: "ارتباط مستقیم در تلگرام",
    copyNumber: "کپی شماره",
    copyPrimaryPhone: "کپی شماره اصلی",
    copySecondaryPhone: "کپی شماره پشتیبانی",
    copyAddress: "کپی نشانی",
    toggleTheme: "تغییر تم رنگی",
    toggleLang: "Switch to English",
    divisionsCount: "۶ دپارتمان",
    technicalHotline: "پاسخگویی فنی",
    primaryPhoneTitle: "خط اصلی مهندسی",
    secondaryPhoneTitle: "خط پشتیبانی و استعلام",
    quickContact: "اقدامات تماس سریع",
    profilesAndWeb: "پروفایل‌ها و وب‌سایت نُوَند",
    closeDialog: "بستن پنجره",
    copyLink: "کپی لینک"
  }
};

export const landingDataEn: LandingProfile = {
  name: "Novand",
  tagline: "Integrated Technology & Infrastructure Solutions",
  bio: "End-to-end engineering, deployment, and support across smart building automation, advanced enterprise networking, physical security, and server infrastructure.",
  statusText: "Operational & Available for Technical Consultation",
  websiteLabel: "Novand Main Website",
  websiteDesc: "Explore our full project portfolio, engineering solutions, and core services.",
  instagramLabel: "Official Instagram",
  instagramHandle: "@novand_tech",
  instagramUrl: "https://instagram.com/novand_tech",
  instagramDesc: "Project showcases, smart equipment highlights, and technical field insights.",
  telegramLabel: "Official Telegram Channel",
  telegramHandle: "@novand_tech",
  telegramUrl: "https://t.me/novand_tech",
  telegramDesc: "Technical announcements, networking articles, and technology briefings.",
  telegramDirectLabel: "Direct Telegram Chat",
  telegramDirectPhone: "+98 919 691 8758",
  telegramDirectUrl: "https://t.me/+989196918758",
  telegramDirectDesc: "Direct messaging and instant technical inquiries with +98 919 691 8758",
  whatsappLabel: "WhatsApp Quick Chat",
  whatsappDesc: "Direct chat for technical inquiries, facility audits, and rapid coordination.",
  whatsappUrl: "https://wa.me/989129321550?text=Hello%20Novand%2C%20I%20am%20contacting%20you%20via%20your%20digital%20business%20card.",
  emailLabel: "Corporate Email",
  emailAddress: "novand.info@gmail.com",
  phonePrimary: "+989129321550",
  phonePrimaryDisplay: "+98 912 932 1550",
  phonePrimaryContact: "Eng. Mahmoud Ahmadi",
  phoneSecondary: "+989196918758",
  phoneSecondaryDisplay: "+98 919 691 8758",
  phoneSecondaryContact: "Hesameddin Ashari",
  addressFull: "Unit 17, No. 26, West 24th St., South Allameh Tabatabaei St., Modiriat Blvd., Saadat Abad, Tehran, Iran",
  addressShort: "Saadat Abad, Modiriat Blvd., Tehran, Iran",
  hours: "All Week (Every Day): 08:00 – 21:00",
  hoursNote: "24/7 SLA emergency response for contracted facilities",
  consultationNotice: "All consultation and engineering inquiries are reviewed directly by technical engineering staff.",
  vcardButtonText: "Save to Phone Contacts",
  callButtonText: "Direct Phone Call",
  servicesHeading: "Core Engineering Disciplines",
  servicesSubheading: "6 integrated divisions modernizing, securing, and scaling your infrastructure",
  services: [
    {
      title: "Smart Homes & Automation",
      description: "KNX, smart lighting, climate orchestration, multi-zone audio, and smart greenhouse systems",
      icon: "Cpu"
    },
    {
      title: "Comprehensive Networking & FTTH",
      description: "Structured cabling, FTTH fiber optics, Cisco/MikroTik routing, and enterprise wireless links",
      icon: "Network"
    },
    {
      title: "Enterprise IT & VoIP Systems",
      description: "VoIP communications, PBX/Asterisk servers, SIP trunking, and call center telephony",
      icon: "PhoneCall"
    },
    {
      title: "CCTV & Physical Security",
      description: "IP surveillance cameras, NVR storage arrays, biometric access control, and facility hardening",
      icon: "ShieldCheck"
    },
    {
      title: "Systems & Server Virtualization",
      description: "VMware ESXi clusters, Linux/macOS enterprise services, and automated disaster recovery",
      icon: "Server"
    },
    {
      title: "Specialized Hardware & Procurement",
      description: "Board-level electronics repair, enterprise server parts, racks, and certified IT procurement",
      icon: "Wrench"
    }
  ],
  maps: {
    googleLabel: "Google Maps",
    googleUrl: "https://www.google.com/maps/search/?api=1&query=35.77618183390139,51.37842044504052+(Novand+Technology)",
    neshanLabel: "Neshan Map",
    neshanUrl: "https://neshan.org/maps/@35.77618183390139,51.37842044504052,17z",
    baladLabel: "Balad Map",
    baladUrl: "https://balad.ir/location?latitude=35.77618183390139&longitude=51.37842044504052"
  },
  ui: {
    copy: "Copy",
    copied: "Copied!",
    callNow: "Call Now",
    shareCard: "Share Card",
    qrModalTitle: "Novand Digital Business Card QR",
    qrModalDesc: "Scan this code with a smartphone camera to instantly open this card.",
    close: "Close",
    downloadVcard: "Download Contact File (vCard)",
    downloadQr: "Download QR Image",
    badgeEngineering: "Integrated Technology Engineering Partner",
    verifiedBusiness: "Verified Engineering Practice",
    officeLocation: "Headquarters Address",
    directChannels: "Direct Channels & Profiles",
    allRightsReserved: "All rights reserved. Novand Integrated Technology.",
    visitMainSite: "Visit Official Website",
    telegramDirectChat: "Direct Telegram Chat",
    copyNumber: "Copy Number",
    copyPrimaryPhone: "Copy Primary Phone",
    copySecondaryPhone: "Copy Secondary Phone",
    copyAddress: "Copy Address",
    toggleTheme: "Toggle Light/Dark Theme",
    toggleLang: "تغییر زبان به فارسی",
    divisionsCount: "6 Divisions",
    technicalHotline: "Technical Hotline",
    primaryPhoneTitle: "Primary Engineering Line",
    secondaryPhoneTitle: "Support & Inquiries Line",
    quickContact: "Quick Contact Actions",
    profilesAndWeb: "Official Profiles & Website",
    closeDialog: "Close Dialog",
    copyLink: "Copy Link"
  }
};
