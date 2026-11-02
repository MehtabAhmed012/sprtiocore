/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  QrCode, 
  Sparkles, 
  RotateCw,
  ArrowLeft,
  Sun,
  Moon,
  FileText,
  UserCheck,
  Globe,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { BUSINESS_CARDS_DATA, BusinessCard, OFFICIAL_PDF_CATALOG } from '../../data/portalData';
import SEOHead from './SEOHead';
import IdentityBarcodeQRModal, { IdentityItemMeta } from './IdentityBarcodeQRModal';
import PublicLinkShareBar from './PublicLinkShareBar';

interface DirectVisitingCardProps {
  defaultCardId?: string;
}

export default function DirectVisitingCard({ defaultCardId }: DirectVisitingCardProps) {
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const { theme, toggleTheme } = useTheme();

  // Determine active card from route param, prop, query param, or default to CEO (Sidra)
  const initialCardId = id || defaultCardId || searchParams.get('card') || 'sidra-tul-muntaha';

  const [activeCardId, setActiveCardId] = useState<string>(() => {
    if (initialCardId === 'ceo') return 'sidra-tul-muntaha';
    if (initialCardId === 'coo') return 'mehtab-ahmed';
    const found = BUSINESS_CARDS_DATA.find(c => c.id === initialCardId);
    return found ? found.id : (BUSINESS_CARDS_DATA[0]?.id || 'sidra-tul-muntaha');
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Update card if param changes
  useEffect(() => {
    if (id) {
      if (id === 'ceo') setActiveCardId('sidra-tul-muntaha');
      else if (id === 'coo') setActiveCardId('mehtab-ahmed');
      else {
        const found = BUSINESS_CARDS_DATA.find(c => c.id === id);
        if (found) setActiveCardId(found.id);
      }
    }
  }, [id]);

  const currentIndex = BUSINESS_CARDS_DATA.findIndex(c => c.id === activeCardId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const activeCard: BusinessCard = BUSINESS_CARDS_DATA[safeIndex] || BUSINESS_CARDS_DATA[0];

  const handleNextCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (safeIndex + 1) % BUSINESS_CARDS_DATA.length;
    setActiveCardId(BUSINESS_CARDS_DATA[nextIndex].id);
    setIsFlipped(false);
  };

  const handlePrevCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = (safeIndex - 1 + BUSINESS_CARDS_DATA.length) % BUSINESS_CARDS_DATA.length;
    setActiveCardId(BUSINESS_CARDS_DATA[prevIndex].id);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070b16] text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans transition-colors selection:bg-teal-500 selection:text-slate-950 p-4 sm:p-6">
      <SEOHead 
        title={`${activeCard.name} | Official Visiting Card | SpatioCore Tech`}
        description={`${activeCard.title} - ${activeCard.department} at SpatioCore Tech. Where Earth Data Meets Smart Solutions.`}
        ogTitle={`${activeCard.name} – Digital Visiting Card`}
        ogDescription={`${activeCard.title} · SpatioCore Tech`}
        canonicalPath={`/card/${activeCard.id}`}
        noIndex={true}
      />
      
      {/* Minimal Top Control Row (Subtle Return Link & Theme Toggle) */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between text-xs font-mono py-1">
        <Link 
          to="/"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
          title="Return to Public Identity Portal"
        >
          <ArrowLeft size={14} />
          <span>Identity Portal</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/business-cards"
            className="text-[11px] text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
          >
            All Personnel ({BUSINESS_CARDS_DATA.length})
          </Link>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>

      {/* Main Visiting Card Center Display */}
      <main className="w-full max-w-lg mx-auto my-auto flex flex-col items-center">
        
        {/* Direct Public Link & Share Bar */}
        <PublicLinkShareBar 
          title={`${activeCard.name} Official Visiting Card`}
          path={activeCard.id === 'sidra-tul-muntaha' ? '/card/ceo' : (activeCard.id === 'mehtab-ahmed' ? '/card/coo' : `/card/${activeCard.id}`)}
          code={activeCard.code || `SC-ID-${activeCard.id.toUpperCase()}`}
          categoryLabel="Visiting Card Direct Public URL"
          aliases={[
            activeCard.id === 'sidra-tul-muntaha' ? '/card/ceo' : '/card/coo',
            `/card/${activeCard.id}`,
            `/visiting-card/${activeCard.id}`
          ]}
          onOpenBarcodeModal={() => setIsQrModalOpen(true)}
          className="mb-3"
        />

        {/* Card Navigator & Flip Switcher Bar */}
        <div className="w-full flex items-center justify-between mb-3 px-1 text-xs font-mono text-slate-600 dark:text-slate-400">
          
          {/* Card Carousel Navigation (Card X of Y) */}
          <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
            <button
              onClick={handlePrevCard}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors cursor-pointer"
              title="Previous Visiting Card"
              aria-label="Previous Visiting Card"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Card <span className="text-teal-600 dark:text-teal-400 font-bold">{safeIndex + 1}</span> of {BUSINESS_CARDS_DATA.length}
            </span>
            <button
              onClick={handleNextCard}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors cursor-pointer"
              title="Next Visiting Card"
              aria-label="Next Visiting Card"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Flip Card Action Button */}
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/70 dark:hover:bg-teal-900/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/80 font-bold text-[11px] transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            title="Flip to other side of visiting card"
          >
            <RotateCw size={12} className={isFlipped ? 'rotate-180 transition-transform' : ''} />
            <span>{isFlipped ? 'View Front' : 'Flip Card'}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* THE DIRECT VISITING CARD (Authentic 3.5" x 2" Ratio with 3D Flip)          */}
        {/* ========================================================================= */}
        <div className="w-full relative group select-none">
          {/* Card Ambient Glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500/20 via-blue-500/10 to-amber-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

          {/* Flip Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full aspect-[1.75/1] min-h-[240px] sm:min-h-[270px] rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-500 [perspective:1200px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_24px_60px_rgba(0,201,167,0.3)] hover:-translate-y-0.5"
            title="Click or tap anywhere on the visiting card to flip"
          >
            <div 
              className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
                isFlipped ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              {/* ================= CARD FRONT ================= */}
              <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between border-2 border-teal-500/40 bg-gradient-to-br from-[#070b16] via-[#0d1627] to-[#050812] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                
                {/* Topographic Contour vector texture */}
                <svg 
                  className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" 
                  viewBox="0 0 400 240" 
                  fill="none" 
                  stroke="rgba(0, 201, 167, 0.55)" 
                  strokeWidth="1.1"
                >
                  <path d="M-20,30 C60,10 120,60 220,30 C300,10 360,40 420,20" />
                  <path d="M-20,70 C70,40 140,110 240,60 C320,30 380,80 420,50" />
                  <path d="M-20,120 C80,90 150,150 260,100 C340,70 390,120 430,90" />
                  <path d="M-20,170 C90,140 170,200 280,150 C360,120 400,170 440,140" />
                  <path d="M-20,220 C100,190 190,240 300,190 C380,160 410,210 450,180" />
                  <circle cx="340" cy="40" r="70" stroke="rgba(26, 115, 232, 0.35)" strokeDasharray="3 3" />
                  {/* Geospatial grid marks */}
                  <path d="M30,30 L40,30 M35,25 L35,35" stroke="rgba(244, 166, 35, 0.4)" strokeWidth="1" />
                  <path d="M360,200 L370,200 M365,195 L365,205" stroke="rgba(0, 201, 167, 0.4)" strokeWidth="1" />
                </svg>

                {/* Metallic Top Foil Accent Edge */}
                <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-teal-400 via-[#00c9a7] to-amber-400" />

                {/* Front Header: Company Branding & Official Verification Mark */}
                <div className="relative z-10 flex items-start justify-between">
                  {/* Brand & Logo */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/15 border border-teal-400/50 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,201,167,0.3)]">
                      <img src="/images/logo.png" alt="SpatioCore" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="font-display text-xs sm:text-sm font-black tracking-[2px] uppercase text-white leading-tight">
                        SPATIO<span className="text-teal-400">CORE</span> <span className="text-[10px] text-teal-300 font-sans font-light">TECH</span>
                      </div>
                      <div className="font-mono text-[7px] sm:text-[8px] text-slate-400 tracking-wider uppercase">
                        WHERE EARTH DATA MEETS SMART SOLUTIONS
                      </div>
                    </div>
                  </div>

                  {/* Official Identity & Coordinate Stamp */}
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-400/40 text-[8px] sm:text-[8.5px] font-mono text-teal-300 font-semibold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                      <span>OFFICIAL IDENTITY</span>
                    </div>
                    <div className="font-mono text-[7px] text-slate-400 mt-0.5 tracking-widest">
                      {activeCard.coordinates || '33.68° N, 73.04° E'}
                    </div>
                  </div>
                </div>

                {/* Middle: Person's Executive Identity & Designation */}
                <div className="relative z-10 my-auto py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-400/40 shadow-2xs">
                      {activeCard.badge || (activeCard.isExecutive ? 'EXECUTIVE LEADERSHIP' : 'OFFICIAL REPRESENTATIVE')}
                    </span>
                    <span className="text-[8px] sm:text-[8.5px] font-mono text-amber-400 font-bold flex items-center gap-0.5">
                      ★ VERIFIED
                    </span>
                  </div>
                  
                  {/* Name in Orbitron Display Font */}
                  <div className="font-display text-lg sm:text-xl md:text-2xl font-black text-white tracking-wider uppercase leading-tight drop-shadow-md">
                    {activeCard.name}
                  </div>
                  
                  {/* Job Title */}
                  <div className="text-[12px] sm:text-[14px] font-semibold text-teal-400 mt-1 tracking-wide">
                    {activeCard.title}
                  </div>
                  
                  {/* Department */}
                  <div className="text-[8.5px] sm:text-[9.5px] text-slate-300 font-mono mt-0.5 tracking-wider uppercase">
                    {activeCard.department}
                  </div>
                </div>

                {/* Bottom: Contact Details Block + High-Contrast Scannable QR Code */}
                <div className="relative z-10 flex items-end justify-between border-t border-slate-700/80 pt-2.5">
                  <div className="space-y-1 text-[8.5px] sm:text-[9.5px] font-mono leading-tight">
                    <div className="flex items-center gap-1.5 text-teal-300 font-bold">
                      <Phone size={11} className="text-teal-400 shrink-0" />
                      <span>{activeCard.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Mail size={11} className="text-teal-400 shrink-0" />
                      <span>{activeCard.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Globe size={11} className="text-teal-400 shrink-0" />
                      <span>{activeCard.website || 'www.spatiocore.com'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[7.5px] sm:text-[8.5px]">
                      <MapPin size={10} className="text-teal-400 shrink-0" />
                      <span>{activeCard.location.split('/')[0].trim()}</span>
                    </div>
                  </div>

                  {/* Scannable Card QR Code */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsQrModalOpen(true);
                    }}
                    className="bg-white p-1.5 rounded-xl shadow-lg shrink-0 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    title="Open Full QR Code Screen"
                  >
                    <QrCode className="w-8 h-8 sm:w-9 sm:h-9 text-slate-950" />
                    <span className="text-[6.5px] font-mono font-bold text-slate-900 tracking-wider uppercase mt-0.5">
                      SCAN VCARD
                    </span>
                  </button>
                </div>

              </div>

              {/* ================= CARD BACK ================= */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl sm:rounded-3xl overflow-hidden p-6 flex flex-col justify-between border-2 border-teal-500/50 bg-gradient-to-br from-[#060a14] via-[#091124] to-[#04070e] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                
                {/* Background Dot Matrix Pattern */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(0, 201, 167, 0.5) 1px, transparent 1px), radial-gradient(rgba(26, 115, 232, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 8px 8px'
                  }}
                />

                <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-amber-400 via-[#00c9a7] to-teal-400" />

                <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400">
                  <span className="text-teal-400 font-bold tracking-widest uppercase">
                    SPATIOCORE TECH ID PORTAL
                  </span>
                  <span className="text-amber-400 font-mono">
                    SECURE AUTH · QR 2026
                  </span>
                </div>

                {/* Back Center Logo & Tagline */}
                <div className="relative z-10 my-auto text-center space-y-2 py-1">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/20 border-2 border-teal-400/60 p-2.5 shadow-[0_0_25px_rgba(0,201,167,0.35)] flex items-center justify-center">
                    <img src="/images/logo.png" alt="SpatioCore" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-display text-base sm:text-lg font-black tracking-[3px] text-white uppercase">
                      SPATIO<span className="text-teal-400">CORE</span> TECH
                    </div>
                    <div className="font-mono text-[8px] sm:text-[9px] text-teal-300 font-semibold tracking-widest uppercase mt-0.5">
                      WHERE EARTH DATA MEETS SMART SOLUTIONS
                    </div>
                  </div>
                  <p className="text-[8.5px] sm:text-[9.5px] text-slate-300 max-w-[280px] mx-auto font-sans leading-relaxed">
                    Earth Observation · Satellite Remote Sensing · Spatial Database Architecture · GIS Intelligence
                  </p>
                </div>

                {/* Back Footer */}
                <div className="relative z-10 flex items-center justify-between border-t border-slate-700/80 pt-2 text-[8px] sm:text-[9px] font-mono text-slate-400">
                  <span className="text-teal-400/90 font-mono">www.spatiocore.com</span>
                  <span className="text-amber-400 font-semibold">TAP TO FLIP ↻</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Clean 3-Button Direct Contact Bar (WhatsApp · Call · Email) */}
        <div className="w-full mt-5 grid grid-cols-3 gap-2.5 text-xs font-mono">
          <a
            href={activeCard.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center font-bold shadow-2xs active:scale-[0.98]"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${activeCard.phone}`}
            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center font-bold shadow-2xs active:scale-[0.98]"
          >
            <Phone size={15} />
            <span>Call</span>
          </a>

          <a
            href={`mailto:${activeCard.email}`}
            className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center font-bold shadow-2xs active:scale-[0.98]"
          >
            <Mail size={15} />
            <span>Email</span>
          </a>
        </div>

        {/* Download Barcode & QR Badge Button */}
        <button
          type="button"
          onClick={() => setIsQrModalOpen(true)}
          className="w-full mt-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-400 border border-teal-500/40 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all font-mono text-xs font-bold cursor-pointer shadow-xs active:scale-[0.98]"
        >
          <QrCode size={16} />
          <span>Download Scannable Barcode &amp; QR Badge</span>
        </button>

        {/* Card Switcher Pills (Allows quick tapping any person's name) */}
        <div className="w-full mt-4 flex items-center justify-center flex-wrap gap-1.5 text-[10.5px] font-mono">
          {BUSINESS_CARDS_DATA.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => {
                setActiveCardId(card.id);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                card.id === activeCardId
                  ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-2xs'
                  : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-teal-600 dark:hover:text-teal-300'
              }`}
            >
              {card.name.split(' ')[0]} ({card.code || `ID-${idx + 1}`})
            </button>
          ))}
        </div>

      </main>

      {/* Discrete Bottom Footer Strip */}
      <div className="w-full max-w-lg mx-auto pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <Link to="/brochures" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 transition-colors">
          <FileText size={12} />
          <span>Brochures</span>
        </Link>
        <span>·</span>
        <Link to="/profiles" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 transition-colors">
          <UserCheck size={12} />
          <span>Profiles</span>
        </Link>
        <span>·</span>
        <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 transition-colors">
          <Globe size={12} />
          <span>Home</span>
        </Link>
      </div>

      <IdentityBarcodeQRModal 
        isOpen={isQrModalOpen} 
        onClose={() => setIsQrModalOpen(false)} 
        item={{
          id: activeCard.id,
          code: activeCard.code || `SC-ID-${activeCard.id.toUpperCase()}`,
          title: activeCard.name,
          subtitle: `${activeCard.title} · ${activeCard.department}`,
          type: 'visiting_card',
          targetPath: `/card/${activeCard.id}`,
          department: activeCard.department,
          badge: activeCard.badge
        }}
      />

    </div>
  );
}
