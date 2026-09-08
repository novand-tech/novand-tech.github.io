import os

with open('src/data/solutions.ts', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace('export const solutionsData: Solution[] = [', 'const solutionsDataFa: Solution[] = [')
text += """
const solutionsDataEn: Solution[] = [
  {
    slug: "residential",
    title: "Residential Complexes & Private Homes",
    summary: "Integrated automation infrastructure, blind-spot-free Wi-Fi, and invisible security systems for modern homes.",
    description: "Modern homes require infrastructure beyond a simple internet router. Our residential solutions are built on concealing technology while providing stable access to it. We design enterprise-grade Wi-Fi networks with 100% stability, implement smart lighting and HVAC, and install discreet, durable surveillance infrastructure that provides top-tier security without compromising interior aesthetics.",
    targetAudience: "Luxury Real Estate Developers, Homeowners, and Property Management Firms",
    challenges: [
      "Poor wireless coverage (Dead Zones) and slow internet across different floors",
      "Isolated automation systems that fail to communicate with each other (Tech Islands)",
      "Bulky equipment that disrupts the aesthetic and interior design of the building"
    ],
    approach: [
      "Concealed fiber optic cabling and discreet ceiling access points for comprehensive network coverage",
      "Implementation of a unified central control hub for HVAC, lighting, and media management",
      "Installation of low-profile CCTV cameras with advanced night vision and secure local/cloud storage"
    ],
    technologies: ["Wi-Fi 6 Mesh", "PoE Lighting", "Smart HVAC Integration", "Invisible AV", "Fiber to the Room (FTTR)"]
  },
  {
    slug: "business",
    title: "Corporate & Office Environments",
    summary: "High-availability networks, VoIP-based voice communications, and security infrastructure for uninterrupted business operations.",
    description: "Network downtime translates directly to lost revenue. Our corporate solutions focus on establishing secure, isolated network infrastructures to separate guest traffic, server traffic, and telephony systems. We equip conference rooms with frictionless A/V systems, install stable internal file servers, and ensure cybersecurity and physical access control work in perfect harmony.",
    targetAudience: "Small to Medium Businesses (SMBs), Law Firms, Financial Institutions, and Creative Agencies",
    challenges: [
      "Network slowdowns during peak usage or critical video meetings",
      "Disorganized, insecure cabling and messy server rooms (Spaghetti Cabling)",
      "High costs and complex management of traditional analog phone systems"
    ],
    approach: [
      "Network architecture redesign with structured cabling and enterprise switching",
      "Migration from legacy telephony to IP-based VoIP systems with smart attendant capabilities",
      "Implementation of access control systems utilizing card readers or biometrics to secure offices"
    ],
    technologies: ["VLAN Segmentation", "SIP Trunking", "Enterprise Firewalls", "Access Control", "Structured Cabling"]
  },
  {
    slug: "education",
    title: "Schools & University Campuses",
    summary: "Scalable IoT infrastructure, classroom automation, and paging systems for learning environments.",
    description: "Educational environments require stable connectivity for digital learning and coordinated systems for physical security. We deploy high-capacity Wi-Fi networks with student-appropriate content filtering. Classrooms are equipped with interactive A/V systems, and school administration gains full environmental control through integrated emergency paging systems linked with bells and notifications.",
    targetAudience: "Private Schools, University Campuses, and Vocational Training Centers",
    challenges: [
      "The need to manage hundreds or thousands of mobile devices connected simultaneously",
      "Fragmented emergency communications and legacy paging systems with poor audio quality",
      "High energy consumption and equipment left running after instructional hours"
    ],
    approach: [
      "Deployment of high-capacity wireless controllers to manage hundreds of simultaneous users",
      "Installation of IP-based audio and paging systems segmented by zones",
      "Execution of smart lighting and HVAC automation to significantly reduce energy costs"
    ],
    technologies: ["High-Density Wi-Fi", "IP Paging Systems", "Interactive Displays", "Automated Energy Management", "Content Filtering"]
  },
  {
    slug: "healthcare-hospitality",
    title: "Healthcare & Hospitality (Hotels)",
    summary: "Creating secure networks for patient/guest data management, LAN-TV, and stable communication systems.",
    description: "Due to round-the-clock operations, healthcare facilities and hotels require the highest level of stability and security. We implement isolated networks in hotels and hospitals to ensure guest and patient privacy is maintained. Our services include the deployment of in-room IPTV systems, nurse/attendant call systems, and integrated room climate control infrastructure, all connected to highly available servers.",
    targetAudience: "Clinics, Boutique Hotels, Outpatient Facilities, and Accommodation Complexes",
    challenges: [
      "Strict regulatory requirements for maintaining patient data privacy",
      "Guest dissatisfaction due to internet outages or complex in-room systems",
      "Critical need for failover systems in the event of power or network loss"
    ],
    approach: [
      "Implementation of secure, redundant networks with automatic failover capabilities",
      "Deployment of LAN-TV and local media servers to provide in-room entertainment",
      "Equipping all critical network and server hardware with advanced UPS systems"
    ],
    technologies: ["HIPAA Compliant Networking", "LAN-TV/IPTV", "Guest Portal Wi-Fi", "Critical UPS Infrastructure", "Nurse Call Integration"]
  },
  {
    slug: "specialized-facilities",
    title: "Specialized Facilities, Industrial & Warehouses",
    summary: "Rugged industrial networks, extensive surveillance, and environmental automation for greenhouses and large warehouses.",
    description: "Industrial environments present unique challenges such as severe electromagnetic interference, massive square footage, and harsh temperature conditions. We design fiber optic networks for factory floors, deploy specialized surveillance and LPR (License Plate Recognition) systems, and utilize Environmental Monitoring sensors to maintain optimal conditions in warehouses and smart greenhouses.",
    targetAudience: "Logistics Centers, Manufacturing Plants, Commercial Greenhouses, and Warehouses",
    challenges: [
      "Wireless network coverage in spaces with metal obstacles, high shelving, and industrial interference",
      "Preventing equipment theft, tracking inventory, and managing personnel access to different zones",
      "The need for precise, real-time monitoring of temperature, humidity, and air quality"
    ],
    approach: [
      "Rugged fiber optic cabling and installation of directional Wi-Fi antennas for complete aisle coverage",
      "Design and installation of advanced CCTV cameras with motion detection and line-crossing analytics",
      "Installation of Industrial IoT controllers for real-time monitoring and environmental alert transmission"
    ],
    technologies: ["Industrial IoT", "Rugged Fiber Optics", "Directional RF/Wi-Fi", "Thermal CCTV", "Automated Climate Control"]
  }
];
export const getSolutionsData = (url: string) => url.startsWith('/en') ? solutionsDataEn : solutionsDataFa;
export const solutionsData = solutionsDataFa;
"""
with open('src/data/solutions.ts', 'w', encoding='utf-8') as f:
    f.write(text)

with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace('export const servicesData: ServiceCategory[] = [', 'const servicesDataFa: ServiceCategory[] = [')
text += """
const servicesDataEn: ServiceCategory[] = [
  {
    slug: "smart-homes-buildings",
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
"""
with open('src/data/services.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("More Data TS updated")
