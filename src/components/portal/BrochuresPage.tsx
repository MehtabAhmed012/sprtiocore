/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  Eye, 
  Check, 
  Download, 
  Copy, 
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Clock,
  ChevronLeft,
  ChevronRight,
  QrCode,
  CreditCard,
  Briefcase,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Satellite,
  Compass,
  FileCheck2,
  Share2
} from 'lucide-react';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import SEOHead from './SEOHead';
import { BrochurePreview } from './DocumentPreviews';
import { BROCHURES_DATA, Brochure } from '../../data/portalData';
import IdentityBarcodeQRModal, { IdentityItemMeta } from './IdentityBarcodeQRModal';

export default function BrochuresPage() {
  const { id } = useParams<{ id?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [barcodeItem, setBarcodeItem] = useState<IdentityItemMeta | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Determine active brochure (defaults to official 2026 brochure or requested id)
  const activeBrochure = (id ? BROCHURES_DATA.find(b => b.id === id) : null) || 
    BROCHURES_DATA.find(b => !b.isComingSoon) || 
    BROCHURES_DATA[0];

  const [currentBrochure, setCurrentBrochure] = useState<Brochure>(activeBrochure);

  useEffect(() => {
    if (id) {
      const found = BROCHURES_DATA.find(b => b.id === id);
      if (found) setCurrentBrochure(found);
    }
  }, [id]);

  const categories = ['all', 'Corporate Overview', 'Technical Guide', 'Environmental', 'Surveying & Topography'];

  const filteredBrochures = selectedCategory === 'all'
    ? BROCHURES_DATA
    : BROCHURES_DATA.filter(b => b.category === selectedCategory);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const pageImages = currentBrochure.pageImages || [
    '/OfficialPDF/brochures/brochure-page-1.png',
    '/OfficialPDF/brochures/brochure-page-2.png'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1e] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-teal-500 selection:text-slate-950">
      {/* Dynamic SEO & OpenGraph Meta Tags */}
      <SEOHead 
        title={`${currentBrochure.title} | Official Capabilities Brochure | SpatioCore Tech`}
        description="View official SpatioCore Tech capabilities brochure in high-precision wide spread format. Explore GIS, remote sensing, and environmental solutions."
        ogTitle={`${currentBrochure.title} — SpatioCore Tech`}
        ogDescription="Official geospatial capabilities catalog and Pakistan climate case studies."
        canonicalPath="/brochure"
        noIndex={true}
      />

      <PortalHeader 
        compact 
        showBackLink 
        backTo="/" 
        backLabel="Return to Identity Portal" 
      />

      {/* Copy Toast Notification */}
      {copiedLink && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-mono animate-in slide-in-from-bottom-5">
          <Check size={16} />
          <span>Copied: {copiedLink}</span>
        </div>
      )}

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* ================= HERO HEADER (CAREERS STYLE) ================= */}
        <section className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 border border-teal-500/30 bg-teal-500/10 dark:bg-teal-500/15 px-3 py-1 rounded-full font-mono text-xs text-teal-700 dark:text-teal-400 font-semibold tracking-wider uppercase">
                <Satellite className="w-3.5 h-3.5 animate-pulse text-teal-500" />
                <span>OFFICIAL PUBLICATION &amp; CAPABILITIES DOSSIER</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {currentBrochure.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {currentBrochure.subtitle || "A Partnership for the Future · Empowering Decisions with Location Intelligence"}
              </p>
            </div>

            {/* Download PDF Action */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={currentBrochure.filePath}
                download
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Download size={14} />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= DIRECT WIDE SPREAD VIEWER (OPEN DIRECT ON PAGE) ================= */}
        <section 
          id="direct-brochure-viewer"
          aria-label="Direct Brochure Viewer"
          className="rounded-3xl border-2 border-teal-500/40 bg-gradient-to-br from-[#0c1322] via-[#101b30] to-[#070b14] p-4 sm:p-6 shadow-2xl overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-teal-500/20 text-xs font-mono">
            
            {/* Wide Spread Indicator */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 font-bold uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>WIDE SPREAD MODE · FACING PAGES</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {currentBrochure.pages} Pages Continuous
              </span>
            </div>

            {/* Viewer Controls */}
            <div className="flex items-center gap-2">
              {/* Zoom Buttons */}
              <div className="flex items-center bg-slate-900/90 rounded-xl border border-slate-700/80 p-0.5 text-xs text-white">
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}
                  className="p-1.5 hover:text-teal-400 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="px-2 text-[10px] font-bold text-teal-300 min-w-10 text-center select-none">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(180, prev + 15))}
                  className="p-1.5 hover:text-teal-400 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>

              {/* Raw PDF Tab */}
              <a
                href={currentBrochure.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors cursor-pointer"
                title="Open standalone PDF in full browser tab"
              >
                <ExternalLink size={12} />
                <span>Open Raw PDF</span>
              </a>

              {/* Download */}
              <a
                href={currentBrochure.filePath}
                download
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                title="Download original brochure document"
              >
                <Download size={12} />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Continuous Wide Spread Pages Container */}
          <div className="w-full overflow-x-auto py-2 flex justify-center">
            <div 
              className="transition-all duration-200 flex flex-col items-center gap-6 w-full max-w-6xl"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {/* Two Facing Pages Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                
                {/* Page 1 (Exterior: Services & About Us) */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                  <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[11px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400" />
                      <span>PAGE 1 · SERVICES, INNOVATION &amp; ABOUT US</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">LEFT SPREAD</span>
                  </div>
                  <img
                    src={pageImages[0]}
                    alt="Brochure Page 1 - Services & About Us"
                    className="w-full h-auto object-contain block select-none"
                    loading="eager"
                  />
                </div>

                {/* Page 2 (Interior: Pakistan Climate Case Studies & Impact) */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                  <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[11px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400" />
                      <span>PAGE 2 · CASE STUDIES, METRICS &amp; PORTFOLIO</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">RIGHT SPREAD</span>
                  </div>
                  <img
                    src={pageImages[1]}
                    alt="Brochure Page 2 - Pakistan Case Studies"
                    className="w-full h-auto object-contain block select-none"
                    loading="eager"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= RELATED PUBLICATIONS CATALOG ================= */}
        <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-teal-600 dark:text-teal-400 font-mono text-xs font-bold uppercase tracking-wider block mb-1">
                [ COMPLETE DOCUMENT CATALOG ]
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase">
                Publications &amp; Technical Dossiers
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBrochures.map((brochure) => {
              const isBlurred = brochure.blur || brochure.isComingSoon;

              if (isBlurred) {
                return (
                  <div
                    key={brochure.id}
                    className="relative bg-white/70 dark:bg-[#111827]/70 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-5 shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div className="filter blur-[2px] opacity-60 select-none pointer-events-none space-y-3">
                      <BrochurePreview
                        title={brochure.title}
                        category={brochure.category}
                        pages={brochure.pages}
                        coverImage={brochure.coverImage}
                      />
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-400">{brochure.category}</div>
                        <h3 className="font-display text-base font-bold text-slate-700 dark:text-slate-300">{brochure.title}</h3>
                      </div>
                    </div>

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-slate-900/25 dark:bg-[#070b14]/50 backdrop-blur-[1.5px] rounded-2xl">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-500 mb-2">
                        <Clock size={20} />
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-display font-black text-xs uppercase tracking-widest shadow-md mb-1.5">
                        COMING SOON
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900 dark:text-white max-w-xs">{brochure.title}</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">Scheduled: {brochure.releaseDate}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={brochure.id}
                  className="bg-white dark:bg-[#111827] rounded-2xl border-2 border-teal-500/40 p-5 shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <BrochurePreview
                      title={brochure.title}
                      category={brochure.category}
                      pages={brochure.pages}
                      coverImage={brochure.coverImage}
                    />
                    <div>
                      <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase">{brochure.category}</span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">{brochure.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">{brochure.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
                      ✓ Active Direct Viewer
                    </span>
                    <a
                      href="#direct-brochure-viewer"
                      className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 hover:text-teal-500 flex items-center gap-1"
                    >
                      <span>Scroll to Viewer</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <PortalFooter />

      {/* Barcode & High-Contrast QR Code Download Modal */}
      <IdentityBarcodeQRModal 
        isOpen={!!barcodeItem} 
        onClose={() => setBarcodeItem(null)} 
        item={barcodeItem}
      />
    </div>
  );
}
