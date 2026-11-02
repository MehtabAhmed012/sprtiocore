/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OrganizationInfo {
  name: string;
  tagline: string;
  portalTitle: string;
  portalDescription: string;
  verificationBadge: string;
  logoUrl: string;
  websiteUrl: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsappUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  address: string;
  copyright: string;
}

import rawBusinessCards from './businessCards.json';

export interface BusinessCard {
  id: string;
  code?: string;
  name: string;
  title: string;
  displayTitle?: string;
  department: string;
  email: string;
  phone: string;
  phoneDisplay?: string;
  whatsapp: string;
  website?: string;
  coordinates?: string;
  linkedin?: string;
  facebook?: string;
  location: string;
  avatarUrl?: string;
  bio: string;
  specialties: string[];
  badge?: string;
  isExecutive?: boolean;
  themeColor?: string;
  vCardData?: {
    organization: string;
    website: string;
  };
}

import rawOfficialPdfCatalog from './officialPdfLinks.json';

export interface Brochure {
  id: string;
  code?: string;
  folder: string;
  fileName: string;
  filePath: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  pages: number;
  fileSize: string;
  releaseDate: string;
  coverImage?: string;
  pageImages?: string[];
  tags: string[];
  highlights?: string[];
  tableOfContents?: string[];
  pdfDownloadUrl?: string;
  pdfUrl?: string;
  status: 'active' | 'coming_soon';
  isComingSoon: boolean;
  blur: boolean;
  corePillars?: Array<{ title: string; desc: string }>;
  servicesCatalog?: Array<{ title: string; desc: string }>;
  caseStudies?: Array<{ number: string; title: string; metric: string; description: string }>;
  whyChooseUs?: string[];
  industriesServed?: string[];
  metaTags?: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
    robots?: string;
  };
}

export interface Profile {
  id: string;
  code?: string;
  name: string;
  title: string;
  subtitle?: string;
  type: 'corporate' | 'executive' | 'team' | 'department';
  badge: string;
  category: string;
  description: string;
  overview: string;
  credentials: string[];
  keyCapabilities: string[];
  coverImage?: string;
  pageImages?: string[];
  filePath: string;
  fileName: string;
  folder: string;
  fileSize: string;
  pages: number;
  releaseDate: string;
  tags: string[];
  status: 'active' | 'coming_soon';
  isComingSoon: boolean;
  blur: boolean;
  blurAmount?: string;
  pdfDownloadUrl?: string;
  pdfUrl?: string;
  corePillars?: Array<{ title: string; desc: string }>;
  whyChooseUs?: string[];
  industriesServed?: string[];
}

export const ORGANIZATION_CONFIG: OrganizationInfo = {
  name: "SpatioCore Tech",
  tagline: "Where Earth Data Meets Smart Solutions",
  portalTitle: "Public Identity Portal",
  portalDescription: "Access our official business cards, brochures, and professional profiles in one place.",
  verificationBadge: "Official Resources · Verified Repository",
  logoUrl: "/images/logo.png",
  websiteUrl: "/company",
  phone: "+923265702803",
  phoneDisplay: "+92 326 5702803",
  email: "Insights.spatiocoretech@outlook.com",
  whatsappUrl: "https://wa.me/qr/6LVDIH7IAJ7UB1",
  linkedinUrl: "https://www.linkedin.com/company/spatiocoretech",
  facebookUrl: "https://www.facebook.com/spatiocoretech",
  address: "Islamabad / Global Operations",
  copyright: `© ${new Date().getFullYear()} SpatioCore Tech. All rights reserved.`
};

export const BUSINESS_CARDS_DATA: BusinessCard[] = (rawBusinessCards as any[]).map(card => {
  const code = card.id === 'sidra-tul-muntaha' 
    ? 'SC-ID-CEO-01' 
    : (card.id === 'mehtab-ahmed' ? 'SC-ID-COO-02' : `SC-ID-${card.id.toUpperCase()}`);
  return {
    ...card,
    code,
    vCardData: {
      organization: "SpatioCore Tech",
      website: card.website ? (card.website.startsWith('http') ? card.website : `https://${card.website}`) : "https://spatiocore.com"
    }
  };
});

export const OFFICIAL_PDF_CATALOG = rawOfficialPdfCatalog;

export const BROCHURES_DATA: Brochure[] = (rawOfficialPdfCatalog.files as any[]).map(file => ({
  ...file,
  code: file.id === 'corporate-brochure-2026' ? 'SC-PUB-BROCHURE-2026' : `SC-PUB-${file.id.toUpperCase()}`,
  pdfDownloadUrl: file.filePath,
  pdfUrl: file.filePath
}));


export const PROFILES_DATA: Profile[] = [
  {
    id: "corporate-dossier",
    code: "SC-DOC-PROFILE-V1",
    name: "SpatioCore Tech Company Profile",
    title: "Official Corporate Profile & Enterprise Dossier",
    subtitle: "Where Earth Data Meets Smart Solutions · Comprehensive Company Profile",
    type: "corporate",
    badge: "Official Corporate Profile",
    category: "Institutional Dossier",
    description: "The official 16-page SpatioCore Tech company profile detailing corporate standing, executive leadership, advanced geospatial services, Earth observation capabilities, project case studies, and impact metrics.",
    overview: "SpatioCore Tech is a forward-thinking geospatial technology company on a mission to turn complex Earth data into clear, actionable intelligence. Founded by certified GIS and remote sensing professionals, we bridge the gap between raw satellite imagery and real-world decision-making across environmental, geological, public health, and commercial sectors.",
    status: "active",
    isComingSoon: false,
    blur: false,
    filePath: "/OfficialPDF/corporate/Profile_V1.pdf",
    fileName: "Profile_V1.pdf",
    folder: "corporate",
    fileSize: "2.4 MB",
    pages: 16,
    releaseDate: "2026 Edition",
    coverImage: "/OfficialPDF/corporate/profile-page-1.png",
    pageImages: [
      "/OfficialPDF/corporate/profile-page-1.png",
      "/OfficialPDF/corporate/profile-page-2.png",
      "/OfficialPDF/corporate/profile-page-3.png",
      "/OfficialPDF/corporate/profile-page-4.png",
      "/OfficialPDF/corporate/profile-page-5.png",
      "/OfficialPDF/corporate/profile-page-6.png",
      "/OfficialPDF/corporate/profile-page-7.png",
      "/OfficialPDF/corporate/profile-page-8.png",
      "/OfficialPDF/corporate/profile-page-9.png",
      "/OfficialPDF/corporate/profile-page-10.png",
      "/OfficialPDF/corporate/profile-page-11.png",
      "/OfficialPDF/corporate/profile-page-12.png",
      "/OfficialPDF/corporate/profile-page-13.png",
      "/OfficialPDF/corporate/profile-page-14.png",
      "/OfficialPDF/corporate/profile-page-15.png",
      "/OfficialPDF/corporate/profile-page-16.png"
    ],
    tags: ["Company Profile", "Earth Data", "GIS & RS", "Satellite Intelligence"],
    credentials: [
      "Certified GIS & Remote Sensing Specialists",
      "Multi-Sensor Satellite Telemetry Analytics",
      "Environmental & Disaster Management Solutions",
      "Commercial & Public Sector Geospatial Expertise"
    ],
    keyCapabilities: [
      "Modern GIS Platforms & Spatial Analytics",
      "Satellite Imagery & Remote Sensing Solutions",
      "Environmental & Geological Decision Support",
      "Disaster Preparedness & Climate Vulnerability"
    ],
    corePillars: [
      { title: "Precision", desc: "Every solution is grounded in scientific rigor, spatial precision, and high analytical accuracy." },
      { title: "Integrity", desc: "Transparent workflows, verifiable data provenance, and dedicated client commitment." },
      { title: "Innovation", desc: "Combining cutting-edge satellite constellations, AI algorithms, and cloud computing." },
      { title: "Spatial Intelligence", desc: "Translating raw planetary observation pixels into actionable executive insights." }
    ],
    whyChooseUs: [
      "116+ completed spatial projects with high precision",
      "20+ enterprise, government, and development partners",
      "10+ integrated planetary satellite constellations",
      "87% client retention and recommendation rate"
    ],
    industriesServed: ["Government", "NGOs", "Environment", "Energy"],
    pdfDownloadUrl: "/OfficialPDF/corporate/Profile_V1.pdf",
    pdfUrl: "/OfficialPDF/corporate/Profile_V1.pdf"
  },
  {
    id: "executive-leadership-profile",
    name: "Executive Leadership & Technical Board",
    title: "Senior Governance, Advisory & Geospatial Fellows",
    subtitle: "Board of Directors, Geospatial Fellows & International Advisory",
    type: "executive",
    badge: "Leadership & Advisory",
    category: "Leadership & Governance",
    description: "Profile document showcasing the career accomplishments, academic publications, and international leadership credentials of SpatioCore Tech's core directors.",
    overview: "Led by industry pioneers with decades of combined experience in satellite geodesy, computational spatial analysis, and high-stakes infrastructure development across Asia, the Middle East, and Europe.",
    status: "coming_soon",
    isComingSoon: true,
    blur: true,
    blurAmount: "25%",
    filePath: "/OfficialPDF/corporate/Executive_Leadership_Profile.pdf",
    fileName: "Executive_Leadership_Profile.pdf",
    folder: "corporate",
    fileSize: "2.4 MB",
    pages: 12,
    releaseDate: "Q3 2026",
    tags: ["Leadership", "Executive", "Board", "Advisory"],
    credentials: [
      "15+ Years Average Leadership Spatial Experience",
      "Published Authors in Remote Sensing of Environment",
      "Advisors to National Disaster Management Authorities",
      "Certified Project Management Professionals (PMP)"
    ],
    keyCapabilities: [
      "Strategic Geospatial Consulting for National Infrastructure",
      "Public-Private Spatial Data Partnerships",
      "Technology Transfer & Institutional Capacity Building",
      "High-Precision Surveying Standards Oversight"
    ],
    pdfDownloadUrl: "#"
  },
  {
    id: "geospatial-engineering-group",
    name: "Geospatial Engineering & Data Science Group",
    title: "Technical Team Roster, Certifications & Tools",
    subtitle: "Core GIS Developers, Satellite Analysts & Cartographic Visualizers",
    type: "team",
    badge: "Engineering & R&D",
    category: "Engineering & R&D",
    description: "Technical profile highlighting our spatial software engineers, remote sensing physicists, GIS programmers, and cartographic visualizers.",
    overview: "Our multidisciplinary engineering unit operates high-performance computing clusters and cloud pipelines to process petabytes of spatial imagery, radar interferometry, and vector topology.",
    status: "coming_soon",
    isComingSoon: true,
    blur: true,
    blurAmount: "25%",
    filePath: "/OfficialPDF/corporate/Geospatial_Engineering_Roster.pdf",
    fileName: "Geospatial_Engineering_Roster.pdf",
    folder: "corporate",
    fileSize: "3.1 MB",
    pages: 16,
    releaseDate: "Q4 2026",
    tags: ["Engineering", "Python", "GDAL", "PostGIS"],
    credentials: [
      "Python / GDAL / GeoPandas High-Performance Stack",
      "PostgreSQL / PostGIS Database Certified Specialists",
      "FAA & ICAO Certified UAV Commercial Remote Pilots",
      "QGIS Core Contributors & Open-Source Advocates"
    ],
    keyCapabilities: [
      "Automated Geospatial ETL Pipeline Development",
      "Full-Stack Web GIS Application Engineering",
      "Synthetic Aperture Radar Interferometry (InSAR)",
      "High-Fidelity Cartographic Production & Atlas Design"
    ],
    pdfDownloadUrl: "#"
  },
  {
    id: "compliance-charter-profile",
    name: "Global Standards & Compliance Charter",
    title: "Spatial Data Security, Integrity & Ethics Charter",
    subtitle: "Enterprise Governance, Quality Standards & Compliance SLA",
    type: "department",
    badge: "Standards & Compliance",
    category: "Compliance & Security",
    description: "Institutional policy document outlining SpatioCore Tech's strict data privacy, geospatial ethics, open-data protocols, and cyber-security compliance.",
    overview: "Our compliance governance framework enforces strict adherence to international spatial data security, GDPR compliance, and verifiable quality assurance across all client deliverables.",
    status: "coming_soon",
    isComingSoon: true,
    blur: true,
    blurAmount: "25%",
    filePath: "/OfficialPDF/corporate/Standards_Compliance_Charter.pdf",
    fileName: "Standards_Compliance_Charter.pdf",
    folder: "corporate",
    fileSize: "1.8 MB",
    pages: 8,
    releaseDate: "2027 Edition",
    tags: ["Compliance", "GDPR", "ISO", "Standards"],
    credentials: [
      "ISO/IEC 27001 Information Security Management Compliant",
      "Open Geospatial Consortium (OGC) Standards Conformance",
      "Confidential Remote Sensing Data Clearance Protocols",
      "Comprehensive Disaster Recovery & Off-Site Data Replication"
    ],
    keyCapabilities: [
      "Cryptographic Spatial Asset Fingerprinting",
      "End-to-End Encrypted Geospatial APIs",
      "Third-Party Security & Penetration Testing",
      "Strict Regulatory Privacy & Sovereignty Auditing"
    ],
    pdfDownloadUrl: "#"
  }
];

export type JsonBrochure = Brochure;
export type JsonProfile = Profile;
export const BROCHURES_CONFIG = BROCHURES_DATA;
export const PROFILES_CONFIG = PROFILES_DATA;
export const PRIMARY_BROCHURE_PDF_URL = '/OfficialPDF/brochures/brochures.pdf';
export const PRIMARY_PROFILE_PDF_URL = '/OfficialPDF/corporate/Profile_V1.pdf';


