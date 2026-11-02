/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  ZoomIn, 
  ZoomOut, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download,
  Satellite
} from 'lucide-react';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import SEOHead from './SEOHead';
import { ProfilePreview } from './DocumentPreviews';
import { PROFILES_DATA, Profile } from '../../data/portalData';
import IdentityBarcodeQRModal, { IdentityItemMeta } from './IdentityBarcodeQRModal';

export default function ProfilesPage() {
  const { id } = useParams<{ id?: string }>();
  const [barcodeItem, setBarcodeItem] = useState<IdentityItemMeta | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState<number>(0);

  // Active profile defaults to official 16-page dossier or requested id
  const activeProfile = (id ? PROFILES_DATA.find(p => p.id === id) : null) || 
    PROFILES_DATA.find(p => !p.isComingSoon) || 
    PROFILES_DATA[0];

  const [currentProfile, setCurrentProfile] = useState<Profile>(activeProfile);

  useEffect(() => {
    if (id) {
      const found = PROFILES_DATA.find(p => p.id === id);
      if (found) setCurrentProfile(found);
    }
  }, [id]);

  const pageImages = currentProfile.pageImages || [
    '/OfficialPDF/corporate/profile-page-1.png',
    '/OfficialPDF/corporate/profile-page-2.png'
  ];

  // Group pages into two-page facing spreads
  const totalSpreads = Math.ceil(pageImages.length / 2);

  const currentLeftPageIdx = activeSpreadIndex * 2;
  const currentRightPageIdx = activeSpreadIndex * 2 + 1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1e] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-teal-500 selection:text-slate-950">
      <SEOHead 
        title={`${currentProfile.name} | Official Company Profile | SpatioCore Tech`}
        description="Review SpatioCore Tech's official 16-page corporate dossier in high-precision wide spread format."
        ogTitle={`${currentProfile.name} — SpatioCore Tech`}
        ogDescription="Official 16-page verified enterprise dossier detailing GIS capabilities, leadership, and satellite analytics."
        canonicalPath="/profile"
        noIndex={true}
      />

      <PortalHeader 
        compact 
        showBackLink 
        backTo="/" 
        backLabel="Return to Identity Portal" 
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* ================= HERO HEADER ================= */}
        <section className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 border border-teal-500/30 bg-teal-500/10 dark:bg-teal-500/15 px-3 py-1 rounded-full font-mono text-xs text-teal-700 dark:text-teal-400 font-semibold tracking-wider uppercase">
                <Satellite className="w-3.5 h-3.5 animate-pulse text-teal-500" />
                <span>OFFICIAL CORPORATE CREDENTIALS &amp; DOSSIER</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {currentProfile.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {currentProfile.subtitle || "Where Earth Data Meets Smart Solutions · Comprehensive Company Profile"}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={currentProfile.filePath}
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
          id="direct-profile-viewer"
          aria-label="Direct Profile Viewer"
          className="rounded-3xl border-2 border-teal-500/40 bg-gradient-to-br from-[#0c1322] via-[#101b30] to-[#070b14] p-4 sm:p-6 shadow-2xl overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-teal-500/20 text-xs font-mono">
            
            {/* Wide Spread Indicator */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 font-bold uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>WIDE SPREAD MODE · 16 PAGES CONTINUOUS</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Spread {activeSpreadIndex + 1} of {totalSpreads} (Pages {currentLeftPageIdx + 1} &amp; {currentRightPageIdx + 1 <= pageImages.length ? currentRightPageIdx + 1 : pageImages.length})
              </span>
            </div>

            {/* Spread Switcher & Zoom Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Spread Navigator (Prev / Next) */}
              <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded-xl border border-slate-700/80">
                <button
                  type="button"
                  onClick={() => setActiveSpreadIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeSpreadIndex === 0}
                  className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-teal-400 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Previous Spread"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[11px] font-bold text-teal-300 px-1.5">
                  Spread {activeSpreadIndex + 1} / {totalSpreads}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSpreadIndex(prev => Math.min(totalSpreads - 1, prev + 1))}
                  disabled={activeSpreadIndex >= totalSpreads - 1}
                  className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-teal-400 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Next Spread"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Zoom Controls */}
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

              {/* Raw PDF */}
              <a
                href={currentProfile.filePath}
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
                href={currentProfile.filePath}
                download
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                title="Download complete 16-page company profile"
              >
                <Download size={12} />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Quick Spread Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-2 scrollbar-none text-[11px] font-mono">
            {Array.from({ length: totalSpreads }).map((_, sIdx) => {
              const p1 = sIdx * 2 + 1;
              const p2 = Math.min(sIdx * 2 + 2, pageImages.length);
              const isSelected = activeSpreadIndex === sIdx;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setActiveSpreadIndex(sIdx)}
                  className={`px-3 py-1 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-sm'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:border-teal-500/50 hover:text-teal-300'
                  }`}
                >
                  Spread {sIdx + 1} (P.{p1}{p2 > p1 ? `-${p2}` : ''})
                </button>
              );
            })}
          </div>

          {/* Facing Pages Container */}
          <div className="w-full overflow-x-auto py-2 flex justify-center">
            <div 
              className="transition-all duration-200 flex flex-col items-center gap-6 w-full max-w-6xl"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                
                {/* Left Page */}
                {pageImages[currentLeftPageIdx] && (
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                    <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[11px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span>PAGE {currentLeftPageIdx + 1} OF {pageImages.length}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">LEFT SPREAD</span>
                    </div>
                    <img
                      src={pageImages[currentLeftPageIdx]}
                      alt={`Page ${currentLeftPageIdx + 1}`}
                      className="w-full h-auto object-contain block select-none"
                      loading="eager"
                    />
                  </div>
                )}

                {/* Right Page */}
                {pageImages[currentRightPageIdx] && (
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                    <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[11px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span>PAGE {currentRightPageIdx + 1} OF {pageImages.length}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">RIGHT SPREAD</span>
                    </div>
                    <img
                      src={pageImages[currentRightPageIdx]}
                      alt={`Page ${currentRightPageIdx + 1}`}
                      className="w-full h-auto object-contain block select-none"
                      loading="eager"
                    />
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>



        {/* ================= RELATED PROFILES CATALOG ================= */}
        <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-teal-600 dark:text-teal-400 font-mono text-xs font-bold uppercase tracking-wider block mb-1">
              [ INSTITUTIONAL DOSSIERS CATALOG ]
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase">
              Official Profiles &amp; Advisory Rosters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROFILES_DATA.map((profile) => {
              const isBlurred = profile.blur || profile.isComingSoon;

              if (isBlurred) {
                return (
                  <div
                    key={profile.id}
                    className="relative bg-white/70 dark:bg-[#111827]/70 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-5 shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div className="filter blur-[2px] opacity-60 select-none pointer-events-none space-y-3">
                      <ProfilePreview
                        title={profile.name}
                        badge={profile.badge}
                        pages={profile.pages}
                        coverImage={profile.coverImage}
                      />
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-400">{profile.category}</div>
                        <h3 className="font-display text-base font-bold text-slate-700 dark:text-slate-300">{profile.name}</h3>
                      </div>
                    </div>

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-slate-900/25 dark:bg-[#070b14]/50 backdrop-blur-[1.5px] rounded-2xl">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-500 mb-2">
                        <Clock size={20} />
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-display font-black text-xs uppercase tracking-widest shadow-md mb-1.5">
                        COMING SOON
                      </div>
                      <p className="font-mono text-xs font-bold text-slate-900 dark:text-white max-w-xs">{profile.name}</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">Scheduled: {profile.releaseDate}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={profile.id}
                  className="bg-white dark:bg-[#111827] rounded-2xl border-2 border-teal-500/40 p-5 shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <ProfilePreview
                      title={profile.name}
                      badge={profile.badge}
                      pages={profile.pages}
                      coverImage={profile.coverImage}
                    />
                    <div>
                      <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase">{profile.category}</span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">{profile.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">{profile.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
                      ✓ Active Direct Viewer
                    </span>
                    <a
                      href="#direct-profile-viewer"
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
