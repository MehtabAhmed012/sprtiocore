/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  X, 
  Check, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Lock, 
  FolderTree, 
  Code, 
  Copy, 
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Columns2,
  FileSpreadsheet,
  QrCode
} from 'lucide-react';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import SEOHead from './SEOHead';
import { BrochurePreview } from './DocumentPreviews';
import { BROCHURES_DATA, Brochure, OFFICIAL_PDF_CATALOG } from '../../data/portalData';
import IdentityBarcodeQRModal, { IdentityItemMeta } from './IdentityBarcodeQRModal';
import PublicLinkShareBar from './PublicLinkShareBar';

export default function BrochuresPage() {
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showJsonManager, setShowJsonManager] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [barcodeItem, setBarcodeItem] = useState<IdentityItemMeta | null>(null);
  
  // Document Viewer Controls
  const [activeTab, setActiveTab] = useState<'pages' | 'summary'>('pages');
  const [activePageIndex, setActivePageIndex] = useState<number>(0); // 0 = Page 1, 1 = Page 2, 2 = Both Pages
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const categories = ['all', 'Corporate Overview', 'Technical Guide', 'Environmental', 'Surveying & Topography'];

  const filteredBrochures = selectedCategory === 'all'
    ? BROCHURES_DATA
    : BROCHURES_DATA.filter(b => b.category === selectedCategory);

  const activeBrochure = BROCHURES_DATA.find(b => !b.isComingSoon);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const pageImages = selectedBrochure?.pageImages || [
    '/OfficialPDF/brochures/brochure-page-1.png',
    '/OfficialPDF/brochures/brochure-page-2.png'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1e] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Dynamic SEO & OpenGraph Meta Tags from JSON */}
      <SEOHead 
        title="Official Brochures & Publications | SpatioCore Tech"
        description="View official SpatioCore Tech capabilities brochure in high-precision format. Managed via OfficialPDF repository."
        ogTitle="Official Publications & Brochures – SpatioCore Tech"
        ogDescription="Official geospatial capabilities catalog and technical dossiers."
        canonicalPath="/brochures"
        noIndex={true}
      />

      <PortalHeader 
        compact 
        showBackLink 
        backTo="/" 
        backLabel="Return to Identity Portal" 
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Page Banner */}
        <div className="mb-6 sm:mb-8 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold mb-1">
                <FileText size={14} />
                <span>VERIFIED DOCUMENT REPOSITORY</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Brochures &amp; Official Publications
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Explore SpatioCore Tech&apos;s verified publications catalog. View official documents directly in-browser in side-by-side spread.
              </p>
            </div>
          </div>

          {/* Direct Public URL Share Bar */}
          <PublicLinkShareBar 
            title="Official Capabilities Brochure 2026"
            path="/brochures"
            code="SC-DOC-BROCHURE-2026"
            categoryLabel="Brochure Direct Public URL"
            aliases={['/brochure', '/brochures', '/brouchure', '/borcher', '/catalog']}
            onOpenBarcodeModal={() => setBarcodeItem({
              id: 'spatiocoretech-brochure-2026',
              code: 'SC-DOC-BROCHURE-2026',
              title: 'Official Capabilities Brochure 2026',
              subtitle: 'Earth Observation & GIS Architecture Catalog',
              type: 'brochure',
              targetPath: '/brochures',
              department: 'Corporate Communications & Technical Services'
            })}
            className="mt-4"
          />

          {/* Category Filter tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Categories ({filteredBrochures.length})
            </button>
            {categories.slice(1).map((cat) => {
              const count = BROCHURES_DATA.filter(b => b.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Copy toast */}
        {copiedLink && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-mono animate-in slide-in-from-bottom-5">
            <Check size={16} />
            <span>Copied: {copiedLink}</span>
          </div>
        )}

        {/* Brochures Document Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredBrochures.map((brochure) => {
            const isBlurred = brochure.blur || brochure.isComingSoon;

            if (isBlurred) {
              /* ================= 25% BLURRED "COMING SOON" CARDS ================= */
              return (
                <div
                  key={brochure.id}
                  className="relative bg-white/70 dark:bg-[#111827]/70 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-5 sm:p-6 shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  {/* The document content blurred with 25% blur effect */}
                  <div className="filter blur-[2px] opacity-60 select-none pointer-events-none space-y-3">
                    <div className="w-full">
                      <BrochurePreview
                        title={brochure.title}
                        category={brochure.category}
                        pages={brochure.pages}
                        coverImage={brochure.coverImage}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{brochure.category}</span>
                        <span>{brochure.fileSize} · {brochure.pages} Pages</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-700 dark:text-slate-300">
                        {brochure.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {brochure.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                      <div className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>

                  {/* High-visibility Coming Soon Badge & Overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-slate-900/25 dark:bg-[#070b14]/50 backdrop-blur-[1.5px] rounded-2xl">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/50 text-amber-500 dark:text-amber-400 mb-3 shadow-[0_0_20px_rgba(244,166,35,0.25)]">
                      <Clock size={24} className="stroke-[2.5]" />
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-display font-black text-xs uppercase tracking-widest shadow-md mb-2">
                      COMING SOON
                    </div>

                    <div className="font-mono text-xs font-bold text-slate-900 dark:text-white max-w-xs leading-tight">
                      {brochure.title}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 max-w-xs font-sans">
                      Scheduled for official publication release in {brochure.releaseDate}.
                    </p>
                  </div>
                </div>
              );
            }

            /* ================= ACTIVE UNBLURRED BROCHURE CARD ================= */
            return (
              <div
                key={brochure.id}
                className="bg-white dark:bg-[#111827] rounded-2xl border-2 border-teal-500/50 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,201,167,0.12)] hover:shadow-[0_15px_45px_rgba(0,201,167,0.2)] transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Document Cover Preview with Real Image */}
                <div className="w-full mb-3">
                  <BrochurePreview
                    title={brochure.title}
                    category={brochure.category}
                    pages={brochure.pages}
                    coverImage={brochure.coverImage}
                  />
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-teal-600 dark:text-teal-400 font-semibold">{brochure.category}</span>
                    <div className="flex items-center gap-2">
                      {brochure.code && (
                        <span className="font-mono text-[9.5px] font-bold text-teal-600 dark:text-teal-300 bg-teal-500/15 border border-teal-500/30 px-2 py-0.5 rounded">
                          {brochure.code}
                        </span>
                      )}
                      <span>{brochure.fileSize} · {brochure.pages} Pages</span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {brochure.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {brochure.description}
                  </p>

                  {/* Highlights tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {brochure.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button: "View PDF" + "Download Barcode & QR" */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedBrochure(brochure);
                      setActivePageIndex(0);
                      setZoomLevel(100);
                      setActiveTab('pages');
                    }}
                    className="flex-1 bg-slate-900 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 py-3.5 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                  >
                    <Eye size={16} />
                    <span>View PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBarcodeItem({
                      id: brochure.id,
                      code: brochure.code || 'SC-PUB-BROCHURE-2026',
                      title: brochure.title,
                      subtitle: 'Official Corporate Capabilities Catalog - 2026 Edition',
                      type: 'brochure',
                      targetPath: '/brochures'
                    })}
                    className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 py-3.5 px-3.5 rounded-xl flex items-center justify-center gap-2 transition-all font-mono text-xs font-bold cursor-pointer active:scale-95 shrink-0"
                    title="Download Scannable Barcode & QR Badge"
                  >
                    <QrCode size={16} />
                    <span>Scan Badge</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Brochure High-Resolution In-Browser Document Viewer Modal (ZERO CHROME BLOCKING & NO DOWNLOAD BUTTON) */}
      {selectedBrochure && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0d1424] rounded-2xl max-w-6xl xl:max-w-7xl w-[96vw] border border-teal-500/40 shadow-2xl relative my-auto max-h-[95vh] flex flex-col overflow-hidden">
            
            {/* Modal Top Control Bar */}
            <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#111827] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                      OFFICIAL IN-BROWSER DOCUMENT VIEWER
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">· {selectedBrochure.releaseDate}</span>
                  </div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedBrochure.title}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedBrochure(null)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Sub-toolbar: Wide Spread Indicator & Zoom Controls */}
            <div className="px-4 py-2 border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              {/* Wide Spread Indicator */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-700 dark:text-teal-300 font-bold uppercase tracking-wider text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>WIDE SPREAD MODE</span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Continuous Side-by-Side Facing Pages
                </span>
              </div>

              {/* Zoom & External Tab Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-700 p-0.5 text-xs">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}
                    className="p-1 hover:text-teal-500 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="px-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 min-w-10 text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(180, prev + 15))}
                    className="p-1 hover:text-teal-500 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>

                <a
                  href={selectedBrochure.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:text-teal-500 transition-colors text-[11px]"
                  title="Open standalone PDF in full browser tab"
                >
                  <ExternalLink size={12} />
                  <span>Open Raw PDF</span>
                </a>
              </div>
            </div>

            {/* Document Content View Area - Exclusively Side-by-Side Wide Spread */}
            <div className="flex-1 overflow-auto p-3 sm:p-5 bg-slate-900/90 flex justify-center items-start">
              <div 
                className="transition-all duration-200 flex flex-col items-center gap-6 w-full max-w-6xl"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                {/* Two-Page Wide Spread Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                  {/* Page 1 */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                    <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[11px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span>PAGE 1 · SERVICES &amp; ABOUT US (EXTERIOR)</span>
                      </span>
                      <span className="text-[10px] text-slate-400">LEFT SPREAD</span>
                    </div>
                    <img
                      src={pageImages[0]}
                      alt="Brochure Page 1 - Services & About Us"
                      className="w-full h-auto object-contain block"
                    />
                  </div>

                  {/* Page 2 */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                    <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[11px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span>PAGE 2 · PORTFOLIO &amp; EXPERTISE (INTERIOR)</span>
                      </span>
                      <span className="text-[10px] text-slate-400">RIGHT SPREAD</span>
                    </div>
                    <img
                      src={pageImages[1] || pageImages[0]}
                      alt="Brochure Page 2 - Portfolio & Case Studies"
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions (ONLY Close Viewer, NO download button) */}
            <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#111827] shrink-0">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck size={14} className="text-teal-500" />
                <span className="hidden sm:inline">Protected Document · View-Only Mode Active</span>
                <span className="sm:hidden">View-Only</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedBrochure(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 text-xs font-bold font-display uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JSON File Links & Meta Manager Modal */}
      {showJsonManager && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-3xl w-full border border-teal-500/40 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Code size={18} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    OfficialPDF JSON Manager
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    OfficialPDF/&#123;folder&#125;/&#123;fileName&#125; links &amp; OpenGraph Meta Configuration
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowJsonManager(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                This JSON structure manages file paths, document states (active vs. 25% blurred Coming Soon), and social Open Graph tags across the portal.
              </div>

              {/* Folder structure overview pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                {OFFICIAL_PDF_CATALOG.folderStructure.folders.map(f => (
                  <div key={f.folderName} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-teal-600 dark:text-teal-400 font-bold">/{f.folderName}</div>
                    <div className="text-[10px] text-slate-400 truncate">{f.description}</div>
                  </div>
                ))}
              </div>

              {/* Code viewer */}
              <div className="relative">
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(OFFICIAL_PDF_CATALOG, null, 2), "Full JSON Catalog")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-teal-400 text-xs font-mono hover:bg-slate-700 transition-colors cursor-pointer border border-teal-500/30"
                  >
                    <Copy size={12} />
                    <span>Copy JSON</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-80 border border-slate-800">
                  {JSON.stringify(OFFICIAL_PDF_CATALOG, null, 2)}
                </pre>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-900/60">
              <button
                onClick={() => setShowJsonManager(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Identity Barcode & QR Code Modal */}
      <IdentityBarcodeQRModal
        isOpen={!!barcodeItem}
        onClose={() => setBarcodeItem(null)}
        item={barcodeItem}
      />

      <PortalFooter />
    </div>
  );
}
