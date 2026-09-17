import os, re
# consulting.ts
with open('src/data/consulting.ts', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace('export const consultingServices: ConsultingService[] = [', 'const consultingServicesFa: ConsultingService[] = [')
text = text.replace('export const consultingHero = {', 'const consultingHeroFa = {')
text += """
const consultingServicesEn: ConsultingService[] = [
  {
    id: "hardware-advisory",
    title: "Hardware Selection & Advisory",
    shortDesc: "Vendor-agnostic consulting to select the most appropriate servers, networking equipment, CCTV systems, and automation controllers based on your budget and technical requirements.",
    targetAudience: "IT Directors, Building Owners, and Procurement Managers",
    deliverables: [
      "Feature comparison matrix",
      "ROI analysis",
      "Approved Bill of Materials (BOM)"
    ]
  },
  {
    id: "architecture-review",
    title: "Architecture & Design Review",
    shortDesc: "Review and evaluation of your current infrastructure blueprints. We examine cabling designs, network topology, and system architectures to identify bottlenecks and vulnerabilities prior to installation.",
    targetAudience: "Contractors, Architects, and Engineering Firms",
    deliverables: [
      "Design vulnerability report",
      "Standard compliance recommendations",
      "Revised architectural schematics"
    ]
  },
  {
    id: "feasibility-study",
    title: "Project Feasibility Studies",
    shortDesc: "Detailed analysis of the feasibility of implementing complex systems (e.g., fiber optic networks, VOIP, industrial automation) within existing buildings and infrastructure.",
    targetAudience: "Investors and Real Estate Developers",
    deliverables: [
      "Detailed deployment cost estimation",
      "Physical and spatial constraints review",
      "Implementation roadmap and timeline"
    ]
  }
];

const consultingHeroEn = {
  title: "Technical Consulting Services",
  description: "Leverage our specialized knowledge and engineering experience for informed decision-making. We provide independent consulting, architectural reviews, and precise guidance to ensure the success of your technology projects."
};

export const getConsultingData = (url: string) => {
  if (url.startsWith('/en')) {
    return { consultingServices: consultingServicesEn, consultingHero: consultingHeroEn };
  }
  return { consultingServices: consultingServicesFa, consultingHero: consultingHeroFa };
};
export const consultingServices = consultingServicesFa;
export const consultingHero = consultingHeroFa;
"""
with open('src/data/consulting.ts', 'w', encoding='utf-8') as f:
    f.write(text)

# projects.ts
with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace('export const projectsData: Project[] = [', 'const projectsDataFa: Project[] = [')
text += """
const projectsDataEn: Project[] = [
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
    technologies: ["Cisco Catalyst", "Cat6a STP", "MikroTik CCR", "VLAN Segmentation", "802.1X Auth"]
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
    technologies: ["DALI-2", "KNX Protocol", "IP Paging", "PoE Access Control", "Centralized Dashboard"]
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
    technologies: ["VMware vSphere", "HPE ProLiant", "SAN Storage", "Veeam Backup", "Zabbix", "APC UPS"]
  }
];

export const getProjectsData = (url: string) => url.startsWith('/en') ? projectsDataEn : projectsDataFa;
export const projectsData = projectsDataFa;
"""
with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Data TS updated")
