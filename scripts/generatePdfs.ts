import fs from 'fs';
import path from 'path';

function createPdf(title: string, subtitle: string, pagesContent: string[][]): Buffer {
  const objects: string[] = [];
  const offsets: number[] = [];

  // Helper to add an object
  function addObject(content: string): number {
    const id = objects.length + 1;
    objects.push(content);
    return id;
  }

  // 1: Catalog (will point to Pages at obj 2)
  addObject(`<<
  /Type /Catalog
  /Pages 2 0 R
>>`);

  // 2: Pages placeholder (will fill in later)
  const pagesObjIndex = objects.length; // index 1 (obj 2)
  objects.push(''); // placeholder for pages dict

  // Font 1 (Helvetica-Bold) & Font 2 (Helvetica)
  const f1Id = addObject(`<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>`);

  const f2Id = addObject(`<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>`);

  const f3Id = addObject(`<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Courier-Bold
>>`);

  const pageIds: number[] = [];

  for (let i = 0; i < pagesContent.length; i++) {
    const lines = pagesContent[i];

    // Build Postscript / PDF text stream
    let streamOps = `q\n`;
    // Background card border / decorative header
    streamOps += `0.0 0.788 0.655 rg\n`; // Teal color
    streamOps += `36 752 540 4 re f\n`;
    streamOps += `0.04 0.06 0.12 rg\n`; // Dark header bar
    streamOps += `36 710 540 40 re f\n`;

    // Header text
    streamOps += `BT\n`;
    streamOps += `/F1 16 Tf\n`;
    streamOps += `1 1 1 rg\n`;
    streamOps += `48 724 Td\n`;
    streamOps += `(SPATIOCORE TECH  |  OFFICIAL GEOSPATIAL INTELLIGENCE) Tj\n`;
    streamOps += `ET\n`;

    // Page Number
    streamOps += `BT\n`;
    streamOps += `/F3 9 Tf\n`;
    streamOps += `0.0 0.788 0.655 rg\n`;
    streamOps += `500 724 Td\n`;
    streamOps += `(PAGE ${i + 1}/${pagesContent.length}) Tj\n`;
    streamOps += `ET\n`;

    // Title / Subtitle on first page or section header
    let y = 670;
    streamOps += `BT\n`;
    streamOps += `0.08 0.12 0.2 rg\n`;
    streamOps += `/F1 18 Tf\n`;
    streamOps += `48 ${y} Td\n`;
    const sectionTitle = i === 0 ? title : `Chapter ${i}: ${lines[0] || 'Technical Capabilities'}`;
    streamOps += `(${escapePdfString(sectionTitle)}) Tj\n`;
    streamOps += `ET\n`;

    y -= 25;
    if (i === 0) {
      streamOps += `BT\n`;
      streamOps += `0.0 0.5 0.4 rg\n`;
      streamOps += `/F2 11 Tf\n`;
      streamOps += `48 ${y} Td\n`;
      streamOps += `(${escapePdfString(subtitle)}) Tj\n`;
      streamOps += `ET\n`;
      y -= 30;
    } else {
      y -= 15;
    }

    // Content lines
    const contentLines = i === 0 ? lines : lines.slice(1);
    for (const line of contentLines) {
      if (line.startsWith('## ')) {
        y -= 15;
        streamOps += `BT\n`;
        streamOps += `0.1 0.45 0.4 rg\n`;
        streamOps += `/F1 12 Tf\n`;
        streamOps += `48 ${y} Td\n`;
        streamOps += `(${escapePdfString(line.replace('## ', ''))}) Tj\n`;
        streamOps += `ET\n`;
        y -= 18;
      } else if (line.startsWith('• ')) {
        streamOps += `BT\n`;
        streamOps += `0.15 0.2 0.3 rg\n`;
        streamOps += `/F2 10 Tf\n`;
        streamOps += `56 ${y} Td\n`;
        streamOps += `(${escapePdfString(line)}) Tj\n`;
        streamOps += `ET\n`;
        y -= 15;
      } else {
        streamOps += `BT\n`;
        streamOps += `0.2 0.25 0.35 rg\n`;
        streamOps += `/F2 10 Tf\n`;
        streamOps += `48 ${y} Td\n`;
        streamOps += `(${escapePdfString(line)}) Tj\n`;
        streamOps += `ET\n`;
        y -= 15;
      }
    }

    // Footer bar
    streamOps += `0.85 0.9 0.95 rg\n`;
    streamOps += `36 40 540 1 re f\n`;
    streamOps += `BT\n`;
    streamOps += `/F2 8 Tf\n`;
    streamOps += `0.4 0.45 0.55 rg\n`;
    streamOps += `48 26 Td\n`;
    streamOps += `(Ref: SC-2026-PDF-VERIFIED  *  ISO 9001:2015  *  spatiocore.com  *  Official Identity Repository) Tj\n`;
    streamOps += `ET\n`;

    streamOps += `Q\n`;

    const streamLength = Buffer.byteLength(streamOps, 'utf-8');
    const contentObjId = addObject(`<<
  /Length ${streamLength}
>>
stream
${streamOps}endstream`);

    const pageObjId = addObject(`<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Contents ${contentObjId} 0 R
  /Resources <<
    /Font <<
      /F1 ${f1Id} 0 R
      /F2 ${f2Id} 0 R
      /F3 ${f3Id} 0 R
    >>
  >>
>>`);

    pageIds.push(pageObjId);
  }

  // Update Pages Object (obj 2)
  objects[pagesObjIndex] = `<<
  /Type /Pages
  /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}]
  /Count ${pageIds.length}
>>`;

  // Assemble PDF with exact byte offsets
  let pdf = `%PDF-1.4\n`;
  offsets.push(0); // 0th entry is always special

  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, 'utf-8'));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf-8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += `0000000000 65535 f \n`;

  for (let i = 1; i <= objects.length; i++) {
    const off = offsets[i].toString().padStart(10, '0');
    pdf += `${off} 00000 n \n`;
  }

  pdf += `trailer\n<<\n  /Size ${objects.length + 1}\n  /Root 1 0 R\n>>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'utf-8');
}

function escapePdfString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

// Generate the primary official brochure
const brochurePages: string[][] = [
  [
    "## 1. Executive Summary & Geospatial Intelligence",
    "SpatioCore Tech is an advanced Earth observation and geospatial analytics provider.",
    "Our platforms combine high-resolution satellite imagery, Synthetic Aperture Radar (SAR),",
    "and machine learning models to solve complex infrastructure and environmental challenges.",
    "",
    "## Core Value Pillars",
    "• Autonomous Earth Observation data ingestion and processing pipelines.",
    "• Multi-frequency Synthetic Aperture Radar (SAR) all-weather interferometry.",
    "• High-precision Drone LiDAR point cloud classification and 3D digital surface models.",
    "• Comprehensive Environmental Impact Assessments (EIA) and carbon sequestration modeling.",
    "• Enterprise Web GIS dashboard development using modern cloud databases and microservices.",
    "",
    "## Strategic Focus Sectors",
    "• National Disaster Management Authorities (NDMA) & Flood Hazard Zonation.",
    "• Smart City Municipalities, Cadastral Land Parcel Records, & Infrastructure.",
    "• Mineral Exploration, Geological Fault Line Mapping, & Mining Volumetric Analysis.",
    "• Precision Agriculture, Crop Yield Prediction, & Soil Moisture Saturation."
  ],
  [
    "Enterprise GIS Architecture & Spatial Data Science",
    "## Spatial Database Engineering",
    "We architect resilient, distributed spatial databases capable of serving millions of complex",
    "vector geometries with sub-second latencies.",
    "• PostgreSQL & PostGIS high-performance spatial indexing (GiST, SP-GiST, BRIN).",
    "• GeoServer & MapServer OGC-compliant WMS, WFS, and WMTS caching layers.",
    "• Cloud-native geospatial formats: GeoParquet, Cloud-Optimized GeoTIFF (COG), FlatGeobuf.",
    "",
    "## Satellite Remote Sensing Suite",
    "• Sentinel-1 & ALOS PALSAR-2 Synthetic Aperture Radar coherence tracking.",
    "• Sentinel-2, Landsat-8/9, and PlanetScope multispectral vegetation indexing.",
    "• Google Earth Engine (GEE) large-scale planetary computation scripts.",
    "• Sub-meter commercial stereo-pair optical imagery for high-resolution DEM creation."
  ],
  [
    "Environmental Compliance & Climate Analytics",
    "## Environmental Impact Assessment (EIA)",
    "Rigorous geospatial methodologies conforming to international environmental standards:",
    "• Watershed catchment boundary modeling, Strahler stream order calculations.",
    "• Land Degradation Neutrality (LDN) baseline assessment under UNCCD protocols.",
    "• Above-ground forest biomass and blue carbon habitat accounting.",
    "",
    "## Drone LiDAR & Terrestrial Surveying",
    "• Dual-frequency RTK/PPK GNSS ground control station networks.",
    "• High-density laser scanning for millimeter-grade structural deformation monitoring.",
    "• Volumetric displacement audits for open-cast mines and dam reservoir silting."
  ],
  [
    "Accreditations, Corporate Governance & Operations",
    "## Quality Standards & Credentials",
    "• ISO 9001:2015 Quality Management Certified Geospatial Operations.",
    "• Official Esri Silver Partner & Developer Network Member.",
    "• Certified Cloud Security & GDPR Compliant Spatial Data Repository.",
    "",
    "## Global Headquarters & Contact Information",
    "• Address: Islamabad Innovation Hub / Worldwide Operations",
    "• Direct Phone: +92 326 5702803",
    "• Official Email: Insights.spatiocoretech@outlook.com",
    "• Web Portal: https://spatiocore.com",
    "",
    "Verification: This document is officially registered under SpatioCore Document Registry 2026."
  ]
];

const pdfBuffer = createPdf(
  "SpatioCore Tech | Corporate Capabilities & GIS Solutions",
  "Official Enterprise Geospatial Services Catalog - 2026 Edition",
  brochurePages
);

const outPath = path.resolve('public/OfficialPDF/brochures/SpatioCore_Corporate_Brochure_2026.pdf');
fs.writeFileSync(outPath, pdfBuffer);
console.log(`Successfully generated official brochure at: ${outPath} (${pdfBuffer.length} bytes)`);

// Also generate stub PDFs for the other categories in the folder structure
const techPdfBuffer = createPdf(
  "SpatioCore Tech | Remote Sensing & SAR Guide",
  "Satellite Radar Coherence & Multispectral Analysis Guide",
  [["## Technical Guide Placeholder", "Official SAR guide document for SpatioCore Tech."]]
);
fs.writeFileSync(path.resolve('public/OfficialPDF/technical/Remote_Sensing_SAR_Guide.pdf'), techPdfBuffer);

const envPdfBuffer = createPdf(
  "SpatioCore Tech | Environmental GIS & Carbon Accounting",
  "Environmental Compliance and Climate Modeling Brief",
  [["## Environmental Brief Placeholder", "Official Environmental brief for SpatioCore Tech."]]
);
fs.writeFileSync(path.resolve('public/OfficialPDF/environmental/Environmental_GIS_Carbon_Brief.pdf'), envPdfBuffer);

const surveyPdfBuffer = createPdf(
  "SpatioCore Tech | Drone LiDAR & High-Precision Surveying",
  "UAV Photogrammetry and Terrestrial Laser Scanning",
  [["## Surveying Brief Placeholder", "Official Drone LiDAR brief for SpatioCore Tech."]]
);
fs.writeFileSync(path.resolve('public/OfficialPDF/surveying/Drone_LiDAR_Surveying_Brief.pdf'), surveyPdfBuffer);

const corpPdfBuffer = createPdf(
  "SpatioCore Tech | Official Corporate Dossier",
  "Institutional Credentials and Board Governance",
  [["## Corporate Dossier Placeholder", "Official Corporate Dossier for SpatioCore Tech."]]
);
fs.writeFileSync(path.resolve('public/OfficialPDF/corporate/SpatioCore_Corporate_Dossier.pdf'), corpPdfBuffer);
