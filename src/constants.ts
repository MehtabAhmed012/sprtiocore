/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SERVICES = [
  {
    id: 'gis',
    category: 'GIS Services',
    items: [
      { name: 'Web GIS Development', description: 'Interactive maps and spatial dashboards for data visualization.' },
      { name: 'Spatial Analysis', description: 'Advanced processing of spatial datasets for insights.' },
      { name: 'Database Management', description: 'Enterprise-grade PostGIS and ArcGIS Online management.' }
    ]
  },
  {
    id: 'rs',
    category: 'Remote Sensing',
    items: [
      { name: 'Satellite Imagery Analysis', description: 'Multi-spectral and hyper-spectral processing.' },
      { name: 'LULC Classification', description: 'Land use and land cover change detection.' },
      { name: 'SAR Processing', description: 'Radar-based mapping for all-weather monitoring.' }
    ]
  },
  {
    id: 'env',
    category: 'Environmental',
    items: [
      { name: 'EIA Studies', description: 'Comprehensive environmental impact assessments.' },
      { name: 'Flood Hazard Mapping', description: 'Hydrological modeling and risk zone delineation.' },
      { name: 'Mangrove Monitoring', description: 'Coastal ecosystem health and carbon sequestration tracking.' }
    ]
  },
  {
    id: 'geo',
    category: 'Geology & Terrain',
    items: [
      { name: 'Terrain Modeling', description: 'High-resolution DEM/DSM generation and analysis.' },
      { name: 'Landslide Mapping', description: 'Stability analysis and hazard identification.' },
      { name: 'Borehole Visualization', description: '3D geological modeling of subsurface data.' }
    ]
  },
  {
    id: 'hs',
    category: 'Health & Safety',
    items: [
      { name: 'Epidemiological GIS', description: 'Mapping disease spread and healthcare access.' },
      { name: 'Safety Audits', description: 'Spatial auditing for industrial compliance.' },
      { name: 'Location Analytics', description: 'Healthcare facility siting and optimization.' }
    ]
  }
];

export const PORTFOLIO = [
  { id: 1, title: 'Regional Flood Risk Model', tags: ['SAR', 'ArcGIS'], category: 'Flood Mapping', image: 'https://picsum.photos/seed/flood/600/400' },
  { id: 2, title: 'Urban Growth Analysis', tags: ['Landsat', 'QGIS'], category: 'LULC', image: 'https://picsum.photos/seed/urban/600/400' },
  { id: 3, title: 'Coastal Mangrove Census', tags: ['Sentinel-2', 'GEE'], category: 'Mangrove', image: 'https://picsum.photos/seed/mangrove/600/400' },
  { id: 4, title: 'Minable Area Detection', tags: ['Planet', 'ENVI'], category: 'Geology', image: 'https://picsum.photos/seed/mining/600/400' },
  { id: 5, title: 'Public Health Dashboard', tags: ['React', 'D3'], category: 'Health GIS', image: 'https://picsum.photos/seed/health/600/400' },
  { id: 6, title: 'Terrain Stability Study', tags: ['LiDAR', 'ArcPro'], category: 'Geology', image: 'https://picsum.photos/seed/terrain/600/400' },
];

export const INDUSTRIES = [
  { name: 'Agriculture', icon: '🌾' },
  { name: 'Disaster Management', icon: '🚨' },
  { name: 'Urban Planning', icon: '🏙️' },
  { name: 'Forestry', icon: '🌲' },
  { name: 'Coastal Management', icon: '🌊' },
  { name: 'Mining', icon: '⛏️' },
  { name: 'Transportation', icon: '🚀' },
  { name: 'Public Health', icon: '🏥' },
  { name: 'Environmental Conservation', icon: '🌿' },
];

export const LOGOS = [
  'ArcGIS', 'QGIS', 'Google Earth Engine', 'ENVI', 'ERDAS', 'AutoCAD', 
  'Python', 'R', 'SAR', 'Landsat', 'Sentinel', 'DJI Drone', 'GPS', 'PostGIS'
];
