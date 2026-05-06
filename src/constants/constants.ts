/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SERVICES = [
  {
    id: 'gis',
    category: 'GIS & Spatial Analysis',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    items: [
      { name: 'GIS & Spatial Analysis', description: 'Custom mapping, geodatabase design, land use planning, flood zonation, network analysis, and web GIS dashboards that make spatial data accessible to decision-makers at every level.' },
      { name: 'Geodatabase Design', description: 'Enterprise-grade spatial database architecture and management.' },
      { name: 'Spatial Dashboards', description: 'Interactive visualization tools for real-time geographic data.' }
    ]
  },
  {
    id: 'remote',
    category: 'Remote Sensing',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    items: [
      { name: 'Remote Sensing & Image Processing', description: 'Multispectral image classification, SAR processing, vegetation index analysis (NDVI/EVI), change detection, and satellite-based land surface monitoring at scale using Google Earth Engine and ENVI.' },
      { name: 'SAR Processing', description: 'Radar-based mapping for all-weather, clouds-penetrating monitoring.' },
      { name: 'Vegetation Indexing', description: 'NDVI and EVI analysis for crop and forest health tracking.' }
    ]
  },
  {
    id: 'env',
    category: 'Environmental',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    items: [
      { name: 'Environmental Consulting', description: 'Watershed analysis, EIA mapping, carbon stock estimation, biodiversity habitat studies, climate vulnerability mapping, and erosion assessment for sustainable development planning.' },
      { name: 'EIA Mapping', description: 'Mapping for Environmental Impact Assessments and regulatory compliance.' },
      { name: 'Carbon Monitoring', description: 'Biomass estimation and carbon sequestration tracking.' }
    ]
  },
  {
    id: 'geology',
    category: 'Geology & Terrain',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    items: [
      { name: 'Geology & Terrain Analysis', description: 'DEM analysis, slope/aspect mapping, landslide susceptibility, groundwater potential zones, fault lineament extraction, and mineral prospectivity studies for earth science applications.' },
      { name: 'Landslide Hazard', description: 'Slope stability analysis and susceptibility zonation.' },
      { name: 'Mineral Prospecting', description: 'Geological feature extraction for resource exploration.' }
    ]
  },
  {
    id: 'health',
    category: 'Health & Safety GIS',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800',
    items: [
      { name: 'Health & Safety GIS', description: 'Disease outbreak mapping, vector-borne risk zones, healthcare facility coverage, industrial hazard delineation, evacuation route planning, and post-disaster damage assessment for public safety.' },
      { name: 'Industrial Risks', description: 'Spatial auditing for workplace safety and hazard mitigation.' },
      { name: 'Evacuation Planning', description: 'Dynamic routing and spatial modeling for emergency response.' }
    ]
  },
  {
    id: 'applied',
    category: 'Applied Sectors',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
    items: [
      { name: 'Applied Sector Solutions', description: 'Tailored GIS and remote sensing solutions for agriculture, disaster management, urban planning, forestry, coastal monitoring, mining operations, and transportation network analysis.' },
      { name: 'Urban Planning', description: 'Smart city zoning, utility mapping, and demographic analysis.' },
      { name: 'Disaster Relief', description: 'Post-disaster recovery mapping and damage assessment.' }
    ]
  }
];

export const PORTFOLIO = [
  { 
    id: 1, 
    title: '01 — Flood Hazard Mapping, Indus Basin', 
    tags: ['SAR', 'GEE', 'ArcGIS'], 
    category: 'Flood Mapping', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRX8KmMxu5ULcLdE2QzMVox_zhOxBz1WLKeg&s',
    description: 'Multi-temporal SAR analysis to map inundation extents with cloud-penetrating precision. Output included flood depth estimates and at-risk population layers.'
  },
  { 
    id: 2, 
    title: '02 — Mangrove Change Detection, Coastal Zone', 
    tags: ['LULC', 'ENVI', 'GEE'], 
    category: 'Mangrove', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGk3PSbBZG2AHlfj1tKWioIghsa2TwTtWfww&s',
    description: 'Long-term mangrove monitoring using spectral indices and supervised classification to quantify ecosystem loss and flag priority restoration zones.'
  },
  { 
    id: 3, 
    title: '03 — Landslide Susceptibility Mapping', 
    tags: ['GIS', 'ArcGIS', 'QGIS'], 
    category: 'Geology', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6nKdKHw4Q9Lozgce-u8xetEei6vTSAk0vA&s',
    description: 'Weighted overlay and frequency ratio methods applied to slope, aspect, soil type, and land cover data to produce 5-class susceptibility maps.'
  },
  { 
    id: 4, 
    title: '04 — Disease Outbreak Risk Mapping', 
    tags: ['Health GIS', 'ArcGIS', 'Python'], 
    category: 'Health GIS', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDm0EwqNi7ampNMWOMFBoxskOjFTSQwyWRpg&s',
    description: 'Integrated spatial analysis of environmental determinants and population vulnerability to produce dengue risk hotspot maps for resource allocation.'
  },
  { 
    id: 5, 
    title: '05 — Urban LULC & Heat Island Analysis', 
    tags: ['Sentinel-2', 'LST', 'ENVI'], 
    category: 'LULC', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Q372sa6r4LtQaUGO54DFVcKm4bbUdMRosQ&s',
    description: 'Supervised classification and NDVI/LST correlation analysis to quantify urban heat island intensity and inform green infrastructure planning.'
  },
  { 
    id: 6, 
    title: '06 — Groundwater Potential Zone Mapping', 
    tags: ['Geology', 'GIS', 'QGIS'], 
    category: 'Geology', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyj_EnJ_x2_pKFHlwbMpQI1RnntJoaATFYVg&s',
    description: 'Multi-layer GIS integration to identify high-priority groundwater recharge zones, supporting borehole siting and rural water supply planning.'
  },
];

export const INDUSTRIES = [
  { name: 'Agriculture', icon: '🌾', description: 'Crop health monitoring, irrigation planning, soil classification, and yield estimation using multispectral indices.' },
  { name: 'Disaster Management', icon: '🚨', description: 'Rapid damage assessment, flood extent mapping, evacuation route analysis, and shelter site selection.' },
  { name: 'Urban Planning', icon: '🏙️', description: 'Smart city mapping, zoning analysis, infrastructure planning, and urban expansion monitoring.' },
  { name: 'Forestry', icon: '🌲', description: 'Forest inventory mapping, canopy cover analysis, biomass estimation, and deforestation monitoring.' },
  { name: 'Coastal Management', icon: '🌊', description: 'Shoreline change analysis, mangrove mapping, reef monitoring, and coastal hazard assessment.' },
  { name: 'Mining', icon: '⛏️', description: 'Pit mapping, overburden volume estimation, resource corridor analysis, and environmental impact monitoring.' },
  { name: 'Transportation', icon: '🚀', description: 'Road network analysis, route optimization, bridge and infrastructure condition mapping.' },
  { name: 'Public Health', icon: '🏥', description: 'Disease risk mapping, healthcare facility accessibility, epidemic spatial modeling, and health equity analysis.' },
  { name: 'Environment & Conservation', icon: '🌿', description: 'Biodiversity habitat mapping, protected area analysis, carbon sequestration studies, and ecosystem health monitoring.' },
];

export const LOGOS = [
  'ArcGIS Pro', 'QGIS', 'Google Earth Engine', 'ENVI', 'ERDAS IMAGINE', 'Python', 
  'R', 'PostGIS', 'Sentinel Hub', 'Landsat Archive', 'SAR / Sentinel-1', 'SNAP Toolbox', 
  'DJI Drone', 'AutoCAD Map', 'Global Mapper', 'QGIS Atlas'
];
