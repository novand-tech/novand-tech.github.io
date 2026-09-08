export const consultingDataFa = {
  subheadline: "مشاوره زیرساخت",
  headline: "ارزیابی فنی و استراتژی زیرساخت",
  leadCopy: "تخصص بی‌طرفانه و مستقل در معماری سیستم‌ها برای محافظت از سرمایه‌گذاری‌های فناوری شما در برابر طراحی‌های ضعیف، وابستگی به فروشنده، و مقیاس‌پذیری محدود.",
  pillars: [
    { title: "ارزیابی معماری سیستم", description: "بررسی جامع طراحی‌های شبکه موجود و پیشنهاد اصلاحات مبتنی بر استانداردها.", eyebrow: "تخصص فنی", focusAreas: ["آنالیز نیازها", "طراحی"] },
    { title: "مشاوره تامین تجهیزات", description: "انتخاب مستقل بهترین سخت‌افزارها بر اساس نیاز فنی واقعی نه فشارهای بازاریابی.", eyebrow: "تخصص فنی", focusAreas: ["آنالیز نیازها", "طراحی"] },
    { title: "امکان‌سنجی پروژه‌ها", description: "ارزیابی دقیق فنی، فیزیکی و مالی پروژه‌های پیچیده پیش از شروع فاز اجرایی.", eyebrow: "تخصص فنی", focusAreas: ["آنالیز نیازها", "طراحی"] }
  ],
  advisoryProcess: [
    { step: "۱", title: "کشف و تحلیل", detail: "بررسی دقیق محیط عملیاتی و نیازهای شما" },
    { step: "۲", title: "طراحی استراتژی", detail: "تدوین طرح جامع اجرایی و ارائه BOM" },
    { step: "۳", title: "نظارت بر اجرا", detail: "پایش دقیق فرآیند استقرار برای تطابق با استانداردهای تعیین شده" }
  ]
};

export const consultingDataEn = {
  subheadline: "Infrastructure Advisory",
  headline: "Technical Audit & Infrastructure Strategy",
  leadCopy: "Vendor-agnostic systems architecture expertise to protect your technology investments against poor design, vendor lock-in, and limited scalability.",
  pillars: [
    { title: "Systems Architecture Review", description: "Comprehensive review of existing network designs and standards-based modifications.", eyebrow: "Technical Expertise", focusAreas: ["Requirements Analysis", "Design"] },
    { title: "Hardware Procurement Advisory", description: "Independent selection of optimal hardware based on actual technical needs rather than marketing pressures.", eyebrow: "Technical Expertise", focusAreas: ["Requirements Analysis", "Design"] },
    { title: "Project Feasibility", description: "Rigorous technical, physical, and financial assessment of complex deployments before execution phase.", eyebrow: "Technical Expertise", focusAreas: ["Requirements Analysis", "Design"] }
  ],
  advisoryProcess: [
    { step: "1", title: "Discovery", detail: "Detailed auditing of your operational environment and requirements." },
    { step: "2", title: "Strategy Design", detail: "Formulation of a comprehensive execution plan and BOM delivery." },
    { step: "3", title: "Implementation Oversight", detail: "Strict monitoring of the deployment process for standards compliance." }
  ]
};

export const getConsultingData = (url: string) => url.startsWith('/en') ? consultingDataEn : consultingDataFa;
export const consultingData = consultingDataFa;
