/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QrCode, FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BusinessCardPreviewProps {
  name?: string;
  title?: string;
  department?: string;
  phone?: string;
  email?: string;
  badge?: string;
  isExecutive?: boolean;
  className?: string;
  defaultFlipped?: boolean;
  showFlipButton?: boolean;
}

export function BusinessCardPreview({
  name = "Sidra Tul Muntaha",
  title = "Chief Executive Officer (CEO)",
  department = "Executive Leadership & Corporate Strategy",
  phone = "+92 326 5702803",
  email = "Insights.spatiocoretech@outlook.com",
  badge,
  isExecutive = true,
  className = "",
  defaultFlipped = false,
  showFlipButton = true
}: BusinessCardPreviewProps) {
  const [isFlipped, setIsFlipped] = React.useState(defaultFlipped);

  return (
    <div className={`relative max-w-sm mx-auto group ${className}`}>
      {showFlipButton && (
        <div className="flex items-center justify-between mb-2 px-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-semibold text-teal-600 dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            {isFlipped ? "CARD BACK · VERIFIED IDENTITY" : "CARD FRONT · CONTACT VCARD"}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            title="Flip to other side"
          >
            <span>Flip Side</span>
            <span className="text-teal-500 font-bold">↻</span>
          </button>
        </div>
      )}

      {/* 3D perspective container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-full aspect-[16/9.6] rounded-2xl overflow-hidden cursor-pointer select-none transition-transform duration-500 [perspective:1000px] shadow-[0_16px_36px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_45px_rgba(0,201,167,0.18)]"
        title="Click to flip card"
      >
        <div 
          className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ================= CARD FRONT ================= */}
          <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-teal-500/30 bg-gradient-to-br from-[#070c18] via-[#0d1629] to-[#050811] text-white">
            {/* Topographic Contour vector texture */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" 
              viewBox="0 0 400 240" 
              fill="none" 
              stroke="rgba(0, 201, 167, 0.5)" 
              strokeWidth="1"
            >
              <path d="M-20,30 C60,10 120,60 220,30 C300,10 360,40 420,20" />
              <path d="M-20,70 C70,40 140,110 240,60 C320,30 380,80 420,50" />
              <path d="M-20,120 C80,90 150,150 260,100 C340,70 390,120 430,90" />
              <path d="M-20,170 C90,140 170,200 280,150 C360,120 400,170 440,140" />
              <path d="M-20,220 C100,190 190,240 300,190 C380,160 410,210 450,180" />
              {/* Satellite orbit line */}
              <circle cx="340" cy="40" r="70" stroke="rgba(26, 115, 232, 0.4)" strokeDasharray="3 3" />
            </svg>

            {/* Top metallic bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-[#00c9a7] to-amber-400" />

            {/* Card Header: Brand & Official Verification */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-400/50 flex items-center justify-center p-1 shadow-[0_0_12px_rgba(0,201,167,0.25)]">
                  <img src="/images/logo.png" alt="SpatioCore" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-display text-[12px] font-black tracking-[2px] uppercase text-white leading-tight">
                    SPATIO<span className="text-teal-400">CORE</span> <span className="text-[9.5px] text-teal-300 font-sans font-light">TECH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Name & Title (Orbitron display font) */}
            <div className="relative z-10 my-auto py-1">
              <div className="font-display text-base sm:text-lg font-black text-white tracking-wider uppercase leading-tight drop-shadow-sm">
                {name}
              </div>
              <div className="text-[12px] sm:text-[13px] font-semibold text-teal-400 mt-0.5 tracking-wide">
                {title}
              </div>
              <div className="text-[8px] text-slate-400 font-mono mt-0.5 tracking-wider uppercase">
                {department}
              </div>
            </div>

            {/* Bottom: Contact Details & Vector QR */}
            <div className="relative z-10 flex items-end justify-between border-t border-slate-700/70 pt-2">
              <div className="space-y-0.5 text-[8px] font-mono leading-tight">
                <div className="flex items-center gap-1 text-teal-300 font-bold">
                  <span className="text-teal-400">☎</span>
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300 font-medium">
                  <span className="text-teal-400 font-bold">✉</span>
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[7px]">
                  <span>◎ Islamabad / Global</span>
                  <span>·</span>
                  <span className="text-teal-400/90 font-medium">www.spatiocore.com</span>
                </div>
              </div>

              {/* Realistic Scannable QR Code */}
              <div className="bg-white p-1 rounded-lg shadow-md shrink-0 flex flex-col items-center justify-center">
                <QrCode className="w-7 h-7 text-slate-950" />
                <span className="text-[5.5px] font-mono font-bold text-slate-900 tracking-wider uppercase mt-0.5">
                  VCARD
                </span>
              </div>
            </div>
          </div>

          {/* ================= CARD BACK ================= */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden p-5 flex flex-col justify-between border border-teal-500/40 bg-gradient-to-br from-[#060a14] via-[#091124] to-[#04070e] text-white">
            {/* Geometric Satellite Grid Background */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(0, 201, 167, 0.4) 1px, transparent 1px), radial-gradient(rgba(26, 115, 232, 0.3) 1px, transparent 1px)`,
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px'
              }}
            />

            {/* Top foil accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-[#00c9a7] to-teal-400" />

            {/* Top Bar on back */}
            <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-slate-400">
              <span className="text-teal-400 font-bold tracking-widest uppercase">
                SPATIOCORE TECH ID PORTAL
              </span>
              <span className="text-amber-400 font-mono">
                SECURE AUTH · QR 2026
              </span>
            </div>

            {/* Center: Majestic Large Emblem & Mission */}
            <div className="relative z-10 my-auto text-center space-y-2 py-1">
              <div className="w-12 h-12 mx-auto rounded-xl bg-teal-500/20 border-2 border-teal-400/60 p-2 shadow-[0_0_20px_rgba(0,201,167,0.3)] flex items-center justify-center">
                <img src="/images/logo.png" alt="SpatioCore" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display text-sm font-black tracking-[3px] text-white uppercase">
                  SPATIO<span className="text-teal-400">CORE</span> TECH
                </div>
                <div className="font-mono text-[8px] text-teal-300/90 tracking-widest uppercase mt-0.5">
                  WHERE EARTH DATA MEETS SMART SOLUTIONS
                </div>
              </div>
              <p className="text-[8px] text-slate-300 max-w-[240px] mx-auto font-sans leading-relaxed">
                Earth Observation · Satellite Remote Sensing · Spatial Database Architecture · GIS Intelligence
              </p>
            </div>

            {/* Bottom Bar on back */}
            <div className="relative z-10 flex items-center justify-between border-t border-slate-700/60 pt-2 text-[8px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-slate-300">spatiocore.com</span>
              </div>
              <div className="text-[7.5px] text-teal-400/90 font-mono tracking-widest">
                33.6844° N, 73.0479° E
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BrochurePreviewProps {
  title?: string;
  category?: string;
  pages?: number;
  coverImage?: string;
  className?: string;
}

export function BrochurePreview({
  title = "Corporate Capabilities & GIS Solutions",
  category = "2026 Edition",
  pages = 2,
  coverImage,
  className = ""
}: BrochurePreviewProps) {
  return (
    <div className={`relative w-full aspect-[16/10] max-w-sm mx-auto rounded-xl p-2 flex items-center justify-center select-none ${className}`}>
      {/* Background shadow stacked pages effect */}
      <div className="absolute inset-x-8 top-3 bottom-1 bg-slate-200 dark:bg-slate-700 rounded-lg -rotate-2 opacity-60 shadow-md" />
      <div className="absolute inset-x-6 top-2 bottom-1.5 bg-teal-800/20 rounded-lg rotate-1 opacity-70 shadow" />

      {/* Main Front Document */}
      <div className="relative z-10 w-full h-full rounded-lg bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-[0_10px_25px_rgba(0,0,0,0.12)] p-2.5 flex flex-col justify-between overflow-hidden">
        {/* Top Spine Stripe */}
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700" />

        <div className="pl-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-[9px] font-black tracking-widest text-teal-600 dark:text-teal-400 uppercase">
              SPATIOCORE TECH
            </span>
          </div>
          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-semibold uppercase">
            PDF · {pages} PGS
          </span>
        </div>

        {/* Brochure Graphic Center Area */}
        <div className="pl-2 my-1">
          {coverImage ? (
            <div className="h-20 w-full rounded-md overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative bg-slate-950">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="h-12 w-full rounded bg-gradient-to-r from-slate-100 via-teal-50 to-blue-50 dark:from-slate-800 dark:via-teal-950/30 dark:to-blue-950/30 border border-slate-200/60 dark:border-slate-700/60 p-2 flex items-center justify-between overflow-hidden relative">
              <div className="space-y-1 z-10">
                <div className="w-16 h-1.5 bg-teal-500/80 rounded-full" />
                <div className="w-24 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
              </div>
              <svg className="w-16 h-12 text-teal-500/30 dark:text-teal-400/20 absolute -right-1 -bottom-1" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M0,40 Q25,10 50,40 T100,40" />
                <path d="M0,55 Q25,25 50,55 T100,55" />
                <path d="M0,70 Q25,40 50,70 T100,70" />
              </svg>
            </div>
          )}
        </div>

        {/* Document Title & Category */}
        <div className="pl-2">
          <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">
            {title}
          </div>
          <div className="flex items-center justify-between mt-1 text-[9px] text-slate-500 dark:text-slate-400 font-mono">
            <span>{category}</span>
            <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold">
              <FileText size={10} /> Official Document
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProfilePreviewProps {
  title?: string;
  badge?: string;
  coverImage?: string;
  pages?: number;
  className?: string;
}

export function ProfilePreview({
  title = "Corporate Dossier & Credentials",
  badge = "Official Certified Dossier",
  coverImage,
  pages = 2,
  className = ""
}: ProfilePreviewProps) {
  return (
    <div className={`relative w-full aspect-[16/10] max-w-sm mx-auto rounded-xl p-2 flex items-center justify-center select-none ${className}`}>
      {/* Folder Tab Effect */}
      <div className="absolute top-0.5 left-7 w-20 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-t-md border-t border-l border-r border-slate-300 dark:border-slate-700" />
      
      {/* Main Folder Document */}
      <div className="relative z-10 w-full h-full rounded-lg bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-[0_10px_25px_rgba(0,0,0,0.12)] p-2.5 flex flex-col justify-between overflow-hidden">
        {/* Top Verified Seal and ID */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
          <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
            <ShieldCheck size={12} />
            <span className="font-mono text-[8px] uppercase tracking-wider font-bold">
              ACCREDITED DOSSIER
            </span>
          </div>
          <span className="font-mono text-[8px] text-slate-400">
            {pages} PGS · SC-2026-GEO
          </span>
        </div>

        {/* Center Credentials & Emblem / Real Cover */}
        <div className="my-1 flex-1 flex items-center overflow-hidden">
          {coverImage ? (
            <div className="h-20 w-full rounded-md overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative bg-slate-950">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-1.5">
                <span className="text-[8px] font-mono font-bold text-teal-300 uppercase">Official Corporate Profile</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 w-full">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500/20 to-blue-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="text-teal-500" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight truncate">
                  {title}
                </div>
                <div className="text-[9px] text-teal-600 dark:text-teal-400 font-mono truncate">
                  {badge}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Key Standards */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded p-1.5 flex items-center justify-between text-[8px] font-mono text-slate-600 dark:text-slate-300">
          <span>ISO 9001 · ESRI PARTNER</span>
          <span className="text-teal-600 dark:text-teal-400 font-bold">VERIFIED 2026</span>
        </div>
      </div>
    </div>
  );
}
