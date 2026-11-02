/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Eye, 
  X, 
  Check, 
  Award, 
  Briefcase, 
  FileText, 
  Clock, 
  ZoomIn, 
  ZoomOut, 
  ExternalLink,
  Layers,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Columns2,
  FileCheck2,
  Building,
  Target,
  Sparkles,
  QrCode
} from 'lucide-react';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import SEOHead from './SEOHead';
import { ProfilePreview } from './DocumentPreviews';
import { PROFILES_DATA, Profile } from '../../data/portalData';
import IdentityBarcodeQRModal, { IdentityItemMeta } from './IdentityBarcodeQRModal';

export default function ProfilesPage() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [barcodeItem, setBarcodeItem] = useState<IdentityItemMeta | null>(null);
  
  // Document Viewer Controls (wide spread mode)
  const [activeTab, setActiveTab] = useState<'pages' | 'summary'>('pages');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const filteredProfiles = PROFILES_DATA;

  const pageImages = selectedProfile?.pageImages || [
    '/OfficialPDF/corporate/profile-page-1.png',
    '/OfficialPDF/corporate/profile-page-2.png'
  ];

  // Group pages into two-page spreads
  const totalSpreads = Math.ceil(pageImages.length / 2);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1e] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <SEOHead 
        title="Official Corporate & Professional Profiles | SpatioCore Tech"
        description="Review official institutional dossiers, executive advisory credentials, and geospatial engineering rosters in high-precision side-by-side format."
        ogTitle="Official Profiles & Institutional Credentials – SpatioCore Tech"
        canonicalPath="/profiles"
        noIndex={true}
      />
      <PortalHeader 
        compact 
        showBackLink 
        backTo="/" 
        backLabel="Return to Home" 
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Executive Header Banner */}
        <div className="mb-6 sm:mb-8 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold mb-1">
            <UserCheck size={14} />
            <span>OFFICIAL CORPORATE CREDENTIALS</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            SpatioCore Tech Company Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Review SpatioCore Tech&apos;s verified 16-page corporate profile, covering institutional standing, executive leadership, satellite Earth observation capabilities, and project case studies. View in side-by-side spread.
          </p>
        </div>

        {/* Profiles Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProfiles.map((profile) => {
            const isBlurred = profile.blur || profile.isComingSoon;

            if (isBlurred) {
              /* ================= 25% BLURRED "COMING SOON" CARDS ================= */
              return (
                <div
                  key={profile.id}
                  className="relative bg-white/70 dark:bg-[#111827]/70 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-5 sm:p-6 shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  {/* Blurred profile content with 25% blur effect */}
                  <div className="filter blur-[2px] opacity-60 select-none pointer-events-none space-y-3">
                    <div className="w-full">
                      <ProfilePreview
                        title={profile.name}
                        badge={profile.badge}
                        pages={profile.pages}
                        coverImage={profile.coverImage}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{profile.category}</span>
                        <span>{profile.fileSize} · {profile.pages} Pages</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-700 dark:text-slate-300">
                        {profile.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {profile.description}
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
                      {profile.name}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 max-w-xs font-sans">
                      Scheduled for official publication release in {profile.releaseDate}.
                    </p>
                  </div>
                </div>
              );
            }

            /* ================= ACTIVE UNBLURRED PROFILE CARD ================= */
            return (
              <div
                key={profile.id}
                className="bg-white dark:bg-[#111827] rounded-2xl border-2 border-teal-500/50 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,201,167,0.12)] hover:shadow-[0_15px_45px_rgba(0,201,167,0.2)] transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Document Cover Preview with Real Image */}
                <div className="w-full mb-3">
                  <ProfilePreview
                    title={profile.name}
                    badge={profile.badge}
                    pages={profile.pages}
                    coverImage={profile.coverImage}
                  />
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-teal-600 dark:text-teal-400 font-semibold">{profile.category}</span>
                    <div className="flex items-center gap-2">
                      {profile.code && (
                        <span className="font-mono text-[9.5px] font-bold text-teal-600 dark:text-teal-300 bg-teal-500/15 border border-teal-500/30 px-2 py-0.5 rounded">
                          {profile.code}
                        </span>
                      )}
                      <span>{profile.fileSize} · {profile.pages} Pages</span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {profile.name}
                  </h3>

                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {profile.title}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {profile.description}
                  </p>

                  {/* Highlights tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {profile.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button: "View Profile" + "Download Barcode & QR" */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedProfile(profile);
                      setZoomLevel(100);
                      setActiveTab('pages');
                    }}
                    className="flex-1 bg-slate-900 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 py-3.5 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                  >
                    <Eye size={16} />
                    <span>View Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBarcodeItem({
                      id: profile.id,
                      code: profile.code || 'SC-DOC-PROFILE-V1',
                      title: profile.name,
                      subtitle: profile.title,
                      type: 'profile',
                      targetPath: '/profiles'
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

      {/* Profile High-Resolution In-Browser Document Viewer Modal (ZERO CHROME BLOCKING & NO DOWNLOAD BUTTON) */}
      {selectedProfile && (
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
                    <span className="text-[10px] font-mono text-slate-400">· {selectedProfile.releaseDate}</span>
                  </div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedProfile.name}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProfile(null)}
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
                    href={selectedProfile.filePath}
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
                  <div className="space-y-8 w-full">
                    {Array.from({ length: totalSpreads }).map((_, sIdx) => {
                      const lIdx = sIdx * 2;
                      const rIdx = sIdx * 2 + 1;
                      return (
                        <div key={sIdx} className="space-y-3 pb-8 border-b border-slate-800/80 last:border-0">
                          <div className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-widest flex items-center justify-between px-2">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-teal-400" />
                              <span>SPREAD 0{sIdx + 1} · PAGES {lIdx + 1} &amp; {Math.min(rIdx + 1, pageImages.length)} OF {pageImages.length}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">200 DPI VECTOR SHARP</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                            {/* Left Page */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                              <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[10px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                                  <span>PAGE {lIdx + 1}</span>
                                </span>
                                <span className="text-[10px] text-slate-400">LEFT SPREAD</span>
                              </div>
                              <img
                                src={pageImages[lIdx]}
                                alt={`Page ${lIdx + 1}`}
                                className="w-full h-auto object-contain block"
                              />
                            </div>

                            {/* Right Page */}
                            {pageImages[rIdx] && (
                              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 bg-white w-full">
                                <div className="bg-slate-950 text-teal-300 px-4 py-2 text-[10px] font-mono font-bold flex items-center justify-between border-b border-teal-500/30">
                                  <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                                    <span>PAGE {rIdx + 1}</span>
                                  </span>
                                  <span className="text-[10px] text-slate-400">RIGHT SPREAD</span>
                                </div>
                                <img
                                  src={pageImages[rIdx]}
                                  alt={`Page ${rIdx + 1}`}
                                  className="w-full h-auto object-contain block"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
                {/* Summary removed per user instruction */}
                {false && (
                <div className="space-y-5 max-w-4xl w-full mx-auto text-slate-800 dark:text-slate-100 py-2">
                  
                  {/* 1. Header Banner & Mission */}
                  <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-teal-500/30 shadow-md space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 font-mono text-xs font-bold uppercase">
                        <ShieldCheck size={13} />
                        <span>{selectedProfile.category}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        Official Edition: {selectedProfile.releaseDate} · {selectedProfile.fileSize} · {selectedProfile.pages} Pages
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {selectedProfile.name}
                      </h3>
                      <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold mt-1">
                        {selectedProfile.subtitle || selectedProfile.title}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800">
                      {selectedProfile.overview || selectedProfile.description}
                    </p>
                  </div>

                  {/* 2. Core Value Pillars (From PDF Page 2) */}
                  {selectedProfile.corePillars && (
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                      <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>Core Foundation Pillars (From Company Profile):</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProfile.corePillars.map((pillar, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
                            <div className="font-display text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                              {pillar.title}
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                              {pillar.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Official 9-Section Table of Contents (From PDF Page 3) */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <BookOpen size={14} className="text-teal-500" />
                      <span>Table of Contents (Official 16-Page Dossier):</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                      {[
                        { num: "04", title: "About Company & Mission", desc: "Why we exist & spatial intelligence" },
                        { num: "05", title: "Leadership & CEO Statement", desc: "Executive vision & guidance" },
                        { num: "06", title: "Company History & Milestones", desc: "Founding journey & evolution" },
                        { num: "07", title: "Mission & Strategic Vision", desc: "Bridging satellite pixels to actions" },
                        { num: "08", title: "Our Core Services", desc: "GIS platforms & remote sensing" },
                        { num: "10", title: "Additional Services", desc: "Consulting & capacity building" },
                        { num: "11", title: "Project Case Studies", desc: "Real-world environmental modeling" },
                        { num: "12", title: "Company Highlights", desc: "Key metrics & track record" },
                        { num: "14", title: "Contact Information", desc: "Official verification & offices" }
                      ].map((item) => (
                        <div key={item.num} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-start gap-2.5">
                          <span className="font-mono font-bold text-xs text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                            P.{item.num}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-[11px]">{item.title}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Company Performance Highlights (From PDF Page 12) */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles size={14} className="text-teal-500" />
                      <span>Company Track Record &amp; Metrics:</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                        <div className="font-display text-2xl font-black text-teal-600 dark:text-teal-400">116+</div>
                        <div className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Projects Delivered</div>
                      </div>
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                        <div className="font-display text-2xl font-black text-teal-600 dark:text-teal-400">20+</div>
                        <div className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Enterprise Partners</div>
                      </div>
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                        <div className="font-display text-2xl font-black text-teal-600 dark:text-teal-400">10+</div>
                        <div className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Satellite Datasets</div>
                      </div>
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                        <div className="font-display text-2xl font-black text-teal-600 dark:text-teal-400">87%</div>
                        <div className="text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Retention Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* 5. Industries We Serve & Why Choose Us */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Industries We Serve */}
                    {selectedProfile.industriesServed && (
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Building size={14} className="text-teal-500" />
                          <span>Target Industries &amp; Sectors:</span>
                        </h4>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {selectedProfile.industriesServed.map(ind => (
                            <span key={ind} className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-mono font-bold">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Why Choose Us */}
                    {selectedProfile.whyChooseUs && (
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                        <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Check size={14} className="text-teal-500" />
                          <span>Why Partner with SpatioCore:</span>
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {selectedProfile.whyChooseUs.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-teal-500 font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 6. Document Specs Summary Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono">Document Format</div>
                      <div className="font-bold font-mono text-slate-800 dark:text-slate-100 mt-0.5">High-Res Vector PDF</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono">Pages</div>
                      <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{selectedProfile.pages} Pages</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono">File Size</div>
                      <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{selectedProfile.fileSize}</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono">Authentication</div>
                      <div className="font-bold text-teal-600 dark:text-teal-400 mt-0.5">Verified Repository</div>
                    </div>
                  </div>

                </div>
              )}
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
                  onClick={() => setSelectedProfile(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 text-xs font-bold font-display uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
                >
                  Close Viewer
                </button>
              </div>
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
