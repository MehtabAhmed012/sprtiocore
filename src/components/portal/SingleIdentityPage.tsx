/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import QRCode from 'react-qr-code';
import JsBarcode from 'jsbarcode';
import { 
  CreditCard, 
  FileText, 
  UserCheck, 
  Phone, 
  Mail, 
  MessageCircle, 
  Globe, 
  ExternalLink, 
  QrCode, 
  Barcode, 
  RotateCw, 
  Download, 
  Share2, 
  Check, 
  X, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';
import { 
  BUSINESS_CARDS_DATA, 
  BusinessCard, 
  BROCHURES_CONFIG, 
  PROFILES_CONFIG, 
  PRIMARY_BROCHURE_PDF_URL, 
  PRIMARY_PROFILE_PDF_URL,
  JsonBrochure,
  JsonProfile
} from '../../data/portalData';
import { formatPdfEmbedUrl, getPdfDownloadUrl } from '../../utils/pdfEmbed';

export default function SingleIdentityPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'cards' | 'brochures' | 'profiles'>('all');
  
  // Selected item modal states
  const [selectedCard, setSelectedCard] = useState<BusinessCard | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showBarcodeInCardModal, setShowBarcodeInCardModal] = useState(false);
  const [barcodeMode, setBarcodeMode] = useState<'qr' | 'barcode'>('qr');
  const barcodeSvgRef = useRef<SVGSVGElement | null>(null);
  
  // PDF modal state (Brochure or Profile)
  const [activePdf, setActivePdf] = useState<{ title: string; url: string; type: 'Brochure' | 'Profile' } | null>(null);
  
  // Toast & Copy link
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.spatiocore.com';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyCardUrl = (cardId: string) => {
    const url = `${origin}/card/${cardId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast('Card link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const downloadVCard = (card: BusinessCard) => {
    const cardUrl = `${origin}/card/${card.id}`;
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${card.name}`,
      `N:${card.name.split(' ').slice(1).join(' ')};${card.name.split(' ')[0]};;;`,
      `ORG:${card.vCardData?.organization || 'SpatioCore Tech'}`,
      `TITLE:${card.title}`,
      `TEL;TYPE=CELL,VOICE:${card.phone}`,
      `EMAIL;TYPE=WORK,INTERNET:${card.email}`,
      `URL:${cardUrl}`,
      `ADR;TYPE=WORK:;;${card.location};;;;`,
      `NOTE:${card.bio} | Verified Digital Visiting Card: ${cardUrl}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${card.name.replace(/\s+/g, '_')}_SpatioCore.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Saved ${card.name}'s contact (.vcf)`);
  };

  // Render optical barcode when barcode mode is open in card modal
  useEffect(() => {
    if (selectedCard && showBarcodeInCardModal && barcodeMode === 'barcode' && barcodeSvgRef.current) {
      try {
        const cardUrl = `${origin}/card/${selectedCard.id}`;
        JsBarcode(barcodeSvgRef.current, cardUrl, {
          format: 'CODE128',
          lineColor: '#0a0f1e',
          width: 1.5,
          height: 55,
          displayValue: true,
          fontSize: 10,
          font: 'monospace',
          margin: 8,
          background: '#ffffff'
        });
      } catch (e) {
        console.warn('JsBarcode render failed:', e);
      }
    }
  }, [selectedCard, showBarcodeInCardModal, barcodeMode, origin]);

  // Total items count
  const cardsCount = BUSINESS_CARDS_DATA.length;
  const brochuresCount = BROCHURES_CONFIG.length;
  const profilesCount = PROFILES_CONFIG.length;
  const totalCount = cardsCount + brochuresCount + profilesCount;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-teal-500 selection:text-slate-950">
      
      <Helmet>
        <title>Identity & Corporate Hub | SpatioCore Tech</title>
        <meta 
          name="description" 
          content="Official SpatioCore Tech Identity Hub. Access all verified digital visiting cards, corporate brochures, and capability profiles in a single page." 
        />
        <meta property="og:title" content="SpatioCore Tech Identity & Document Hub" />
        <meta property="og:description" content="Access verified executive business cards, corporate brochures, and official profiles." />
      </Helmet>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-teal-950 text-white dark:text-teal-200 px-4 py-2.5 rounded-xl border border-teal-500/50 shadow-xl flex items-center gap-2 text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check size={14} className="text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#090e1c]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <img src="/images/logo.png" alt="SpatioCore Tech" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-display font-black text-xs sm:text-sm tracking-wider text-slate-900 dark:text-white uppercase leading-tight">
                SPATIO<span className="text-teal-500">CORE</span> <span className="text-[10px] text-teal-400 font-sans font-normal">TECH</span>
              </div>
              <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                Official Identity Portal
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Globe size={13} />
              <span className="hidden sm:inline">Main Website</span>
            </Link>

            <Link
              to="/card"
              className="text-xs font-mono font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 px-3 py-1.5 rounded-lg shadow-2xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CreditCard size={13} />
              <span>Visiting Card View</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="relative px-4 sm:px-6 pt-8 pb-6 bg-gradient-to-b from-teal-500/5 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-mono font-bold">
            <ShieldCheck size={14} />
            <span>VERIFIED DIGITAL IDENTITY & RESOURCES</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight">
            Corporate Identity & Collateral Hub
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Access verified executive business cards, corporate brochures, and official profiles in a single page. Tap any card below to view, verify, or read.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-3 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50'
              }`}
            >
              All Resources ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cards'
                  ? 'bg-teal-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50'
              }`}
            >
              <CreditCard size={13} />
              <span>Visiting Cards ({cardsCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('brochures')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'brochures'
                  ? 'bg-teal-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50'
              }`}
            >
              <FileText size={13} />
              <span>Brochures ({brochuresCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'profiles'
                  ? 'bg-teal-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50'
              }`}
            >
              <UserCheck size={13} />
              <span>Profiles ({profilesCount})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-10">

        {/* SECTION 1: VISITING CARDS */}
        {(activeTab === 'all' || activeTab === 'cards') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="text-teal-500" size={18} />
                <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-wide text-slate-900 dark:text-white">
                  Executive Digital Visiting Cards
                </h2>
              </div>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400">
                Tap card to open full interactive view
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUSINESS_CARDS_DATA.map((card) => {
                const cardUrl = `${origin}/card/${card.id}`;
                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      setSelectedCard(card);
                      setIsCardFlipped(false);
                      setShowBarcodeInCardModal(false);
                    }}
                    className="group relative rounded-2xl overflow-hidden border-2 border-slate-200/90 dark:border-teal-500/30 bg-gradient-to-br from-[#070b16] via-[#0d1627] to-[#050812] text-white p-5 cursor-pointer shadow-lg hover:shadow-2xl hover:border-teal-400 transition-all duration-300 hover:-translate-y-1 select-none flex flex-col justify-between min-h-[240px]"
                    title="Tap to open full interactive card"
                  >
                    {/* Metallic top accent stripe */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-[#00c9a7] to-amber-400" />

                    {/* Top Contour SVG Vector Texture */}
                    <svg 
                      className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" 
                      viewBox="0 0 400 240" 
                      fill="none" 
                      stroke="rgba(0, 201, 167, 0.55)" 
                      strokeWidth="1.1"
                    >
                      <path d="M-20,30 C60,10 120,60 220,30 C300,10 360,40 420,20" />
                      <path d="M-20,80 C70,50 140,120 240,70 C320,40 380,90 420,60" />
                      <path d="M-20,130 C80,100 150,160 260,110 C340,80 390,130 430,100" />
                    </svg>

                    {/* Card Top Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-400/50 flex items-center justify-center p-1 shadow-[0_0_12px_rgba(0,201,167,0.3)]">
                          <img src="/images/logo.png" alt="SpatioCore" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-display text-xs font-black tracking-wider uppercase text-white leading-tight">
                            SPATIO<span className="text-teal-400">CORE</span> <span className="text-[9px] text-teal-300 font-sans font-light">TECH</span>
                          </div>
                          <div className="text-[8px] font-mono text-slate-400 tracking-widest uppercase">
                            Executive Visiting Card
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-[9px] font-mono text-teal-300 font-bold">
                        <Sparkles size={10} className="text-amber-400" />
                        <span>VERIFIED</span>
                      </div>
                    </div>

                    {/* Card Body: Executive Name & Title */}
                    <div className="relative z-10 my-4">
                      <div className="font-display text-xl sm:text-2xl font-black text-white tracking-wide uppercase leading-tight group-hover:text-teal-300 transition-colors">
                        {card.name}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-teal-400 mt-1">
                        {card.title}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-300 font-mono mt-0.5 uppercase tracking-wider">
                        {card.department}
                      </div>
                    </div>

                    {/* Card Bottom: Contact Snippet + Real Mini Scannable QR */}
                    <div className="relative z-10 flex items-end justify-between border-t border-slate-700/80 pt-3">
                      <div className="space-y-1 text-[9px] sm:text-[10px] font-mono leading-tight">
                        <div className="flex items-center gap-1.5 text-teal-300 font-bold">
                          <Phone size={11} className="text-teal-400 shrink-0" />
                          <span>{card.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 truncate max-w-[200px]">
                          <Mail size={11} className="text-teal-400 shrink-0" />
                          <span className="truncate">{card.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[8px]">
                          <span className="text-teal-400 font-bold">◎</span>
                          <span>{card.location.split('/')[0].trim()}</span>
                        </div>
                      </div>

                      {/* Real Mini Scannable QR Code */}
                      <div className="bg-white p-1 rounded-lg shadow-md shrink-0 flex flex-col items-center">
                        <div className="w-10 h-10 p-0.5 bg-white flex items-center justify-center rounded">
                          <QRCode
                            value={cardUrl}
                            size={50}
                            bgColor="#ffffff"
                            fgColor="#070b16"
                            level="M"
                            style={{ width: '100%', height: '100%' }}
                          />
                        </div>
                        <span className="text-[6px] font-mono font-bold text-slate-900 tracking-wider uppercase mt-0.5">
                          TAP TO OPEN
                        </span>
                      </div>
                    </div>

                    {/* Hover Prompt Ribbon */}
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-teal-400 group-hover:text-amber-400 transition-colors">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>Tap to open 3D interactive card & contacts</span>
                      </span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 2: OFFICIAL BROCHURES */}
        {(activeTab === 'all' || activeTab === 'brochures') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="text-teal-500" size={18} />
                <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-wide text-slate-900 dark:text-white">
                  Corporate Brochures & Catalogs
                </h2>
              </div>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400">
                Read-Only PDF Viewer
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BROCHURES_CONFIG.map((brochure) => (
                <div
                  key={brochure.id}
                  onClick={() => {
                    setActivePdf({
                      title: brochure.title,
                      url: brochure.pdfUrl || PRIMARY_BROCHURE_PDF_URL,
                      type: 'Brochure'
                    });
                  }}
                  className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1222] p-5 cursor-pointer shadow-md hover:shadow-xl hover:border-teal-500 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  title="Tap to read brochure PDF"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
                        <FileText size={22} />
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 text-[10px] font-mono font-bold">
                        <span>Official Brochure</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {brochure.title}
                      </h3>
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-mono mt-0.5">
                        {brochure.subtitle || 'GIS, Remote Sensing & Spatial Solutions'}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {brochure.description || 'Comprehensive overview of SpatioCore Tech corporate capabilities, satellite imagery analysis, geodatabase architecture, and client portfolios.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                        2026 Edition
                      </span>
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                        Satellite RS & GIS
                      </span>
                      <span className="text-[10px] font-mono bg-teal-500/10 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold">
                        Read-Only View
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    <span className="flex items-center gap-1.5">
                      <Eye size={14} />
                      <span>Tap to Open Brochure</span>
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: CORPORATE PROFILES */}
        {(activeTab === 'all' || activeTab === 'profiles') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <UserCheck className="text-teal-500" size={18} />
                <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-wide text-slate-900 dark:text-white">
                  Corporate & Executive Profiles
                </h2>
              </div>
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400">
                Official Capability Documents
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROFILES_CONFIG.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => {
                    setActivePdf({
                      title: profile.title,
                      url: profile.pdfUrl || PRIMARY_PROFILE_PDF_URL,
                      type: 'Profile'
                    });
                  }}
                  className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1222] p-5 cursor-pointer shadow-md hover:shadow-xl hover:border-teal-500 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  title="Tap to read profile PDF"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
                        <UserCheck size={22} />
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                        <span>Verified Profile</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {profile.title}
                      </h3>
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-mono mt-0.5">
                        {profile.subtitle || 'Institutional Governance & Leadership Credentials'}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {profile.description || 'Official corporate capabilities, technical specifications, governance framework, and spatial data science credentials of SpatioCore Tech.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                        Executive & Corporate
                      </span>
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                        Institutional Governance
                      </span>
                      <span className="text-[10px] font-mono bg-teal-500/10 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold">
                        Read-Only View
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    <span className="flex items-center gap-1.5">
                      <Eye size={14} />
                      <span>Tap to Open Profile</span>
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Discrete Bottom Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="SpatioCore" className="w-4 h-4 object-contain" />
          <span>SpatioCore Tech Official Identity Gateway</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/card/sidra-tul-muntaha" className="hover:text-teal-500 transition-colors">CEO Card</Link>
          <span>·</span>
          <Link to="/card/mehtab-ahmed" className="hover:text-teal-500 transition-colors">COO Card</Link>
          <span>·</span>
          <Link to="/brochures" className="hover:text-teal-500 transition-colors">Brochure View</Link>
          <span>·</span>
          <Link to="/profiles" className="hover:text-teal-500 transition-colors">Profile View</Link>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL 1: INTERACTIVE DIGITAL VISITING CARD MODAL                          */}
      {/* ========================================================================= */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0c1222] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg p-5 sm:p-6 space-y-4 my-auto relative">
            
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800/80 transition-colors cursor-pointer"
              title="Close card"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div>
              <div className="text-teal-600 dark:text-teal-400 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                <span>DIGITAL VISITING CARD</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400">{selectedCard.title}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-display mt-0.5">
                {selectedCard.name}
              </h3>
            </div>

            {/* 3D Flippable Card Visual Container */}
            <div 
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="relative w-full aspect-[1.65/1] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 [perspective:1200px] shadow-xl hover:shadow-2xl select-none"
              title="Tap to flip card"
            >
              <div className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${isCardFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* CARD FRONT */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-2 border-teal-500/40 bg-gradient-to-br from-[#070b16] via-[#0d1627] to-[#050812] text-white">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-[#00c9a7] to-amber-400" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-400/50 flex items-center justify-center p-1">
                        <img src="/images/logo.png" alt="SpatioCore" className="w-full h-full object-contain" />
                      </div>
                      <div className="font-display text-xs font-black tracking-wider uppercase text-white leading-tight">
                        SPATIO<span className="text-teal-400">CORE</span> <span className="text-[9px] text-teal-300 font-sans font-light">TECH</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 my-auto py-1">
                    <div className="font-display text-lg sm:text-xl font-black text-white tracking-wide uppercase leading-tight">
                      {selectedCard.name}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-teal-400 mt-0.5">
                      {selectedCard.title}
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-slate-300 font-mono mt-0.5 uppercase tracking-wider">
                      {selectedCard.department}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-end justify-between border-t border-slate-700/80 pt-2 text-[8px] sm:text-[9px] font-mono leading-tight">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-teal-300 font-bold">
                        <Phone size={10} className="text-teal-400" />
                        <span>{selectedCard.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <Mail size={10} className="text-teal-400" />
                        <span>{selectedCard.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 font-mono text-[8px]">
                      <RotateCw size={9} />
                      <span>TAP TO FLIP</span>
                    </div>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-2 border-teal-500/40 bg-gradient-to-br from-[#060a14] via-[#091124] to-[#04070e] text-white">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-[#00c9a7] to-teal-400" />
                  
                  <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
                    <span className="text-teal-400 font-bold uppercase">SpatioCore Identity Hub</span>
                    <span className="text-amber-400 font-mono">2026</span>
                  </div>

                  <div className="my-auto text-center space-y-1">
                    <div className="font-display text-sm font-black tracking-wider text-white uppercase">
                      SPATIO<span className="text-teal-400">CORE</span> TECH
                    </div>
                    <div className="font-mono text-[8px] text-teal-300 font-semibold tracking-wider uppercase">
                      WHERE EARTH DATA MEETS SMART SOLUTIONS
                    </div>
                    <p className="text-[8px] text-slate-300 max-w-[240px] mx-auto font-sans">
                      Earth Observation · Satellite Remote Sensing · Spatial Database Architecture · GIS Intelligence
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-700/80 pt-1 text-[8px] font-mono text-slate-400">
                    <span className="text-teal-400">www.spatiocore.com</span>
                    <span className="text-amber-400 flex items-center gap-1">
                      <RotateCw size={9} />
                      <span>TAP TO FLIP</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Contact Actions: WhatsApp, Call, Email */}
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <a
                href={selectedCard.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center font-bold text-xs"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${selectedCard.phone}`}
                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center font-bold text-xs"
              >
                <Phone size={14} />
                <span>Call</span>
              </a>

              <a
                href={`mailto:${selectedCard.email}`}
                className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center font-bold text-xs"
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>

            {/* Barcode & QR Code Section in Card Modal */}
            <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowBarcodeInCardModal(!showBarcodeInCardModal)}
                  className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 flex items-center gap-1.5 cursor-pointer"
                >
                  <QrCode size={14} />
                  <span>{showBarcodeInCardModal ? 'Hide Scannable Barcode' : 'Show Real Scannable Barcode & QR'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => downloadVCard(selectedCard)}
                  className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-teal-500 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Save Contact (.vcf)</span>
                </button>
              </div>

              {showBarcodeInCardModal && (
                <div className="bg-slate-50 dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                  <div className="flex items-center justify-center gap-1 p-1 bg-white dark:bg-slate-800 rounded-xl max-w-[200px] mx-auto text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setBarcodeMode('qr')}
                      className={`flex-1 py-1 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                        barcodeMode === 'qr' ? 'bg-teal-500 text-slate-950' : 'text-slate-500'
                      }`}
                    >
                      <QrCode size={12} />
                      <span>QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBarcodeMode('barcode')}
                      className={`flex-1 py-1 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                        barcodeMode === 'barcode' ? 'bg-teal-500 text-slate-950' : 'text-slate-500'
                      }`}
                    >
                      <Barcode size={12} />
                      <span>Barcode</span>
                    </button>
                  </div>

                  <div className="bg-white p-3 rounded-xl border-2 border-teal-500/40 inline-block shadow-md">
                    {barcodeMode === 'qr' ? (
                      <div className="flex flex-col items-center">
                        <QRCode
                          value={`${origin}/card/${selectedCard.id}`}
                          size={150}
                          level="Q"
                          bgColor="#ffffff"
                          fgColor="#070b16"
                        />
                        <span className="text-[9px] font-mono text-slate-900 font-bold mt-1.5">
                          Camera-Scannable QR Code
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center overflow-x-auto">
                        <svg ref={barcodeSvgRef} className="max-w-full" />
                        <span className="text-[9px] font-mono text-slate-900 font-bold mt-1.5">
                          Code-128 Optical Barcode
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Public Link Bar & Standalone View Button */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopyCardUrl(selectedCard.id)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 size={13} />
                <span>{copiedLink ? 'Link Copied!' : 'Copy Public Card Link'}</span>
              </button>

              <Link
                to={`/card/${selectedCard.id}`}
                className="py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>Standalone Page</span>
                <ExternalLink size={13} />
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: READ-ONLY PDF VIEWER MODAL (BROCHURE OR PROFILE)                 */}
      {/* ========================================================================= */}
      {activePdf && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0c1222] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden">
            
            {/* Header: Title + Open in Tab + Close */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-[#080d19] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono shrink-0">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-bold text-slate-800 dark:text-slate-100 truncate">
                  {activePdf.title}
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full font-semibold hidden sm:inline">
                  {activePdf.type} · Read-Only PDF
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getPdfDownloadUrl(activePdf.url)}
                  download
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-semibold flex items-center gap-1 transition-all"
                  title="Download raw PDF"
                >
                  <Download size={12} />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <a
                  href={activePdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[11px] font-mono font-semibold flex items-center gap-1 transition-all"
                  title="Open document in new browser tab"
                >
                  <span>Open in Tab</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  onClick={() => setActivePdf(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close PDF viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Read-Only PDF iFrame */}
            <div className="relative flex-1 w-full bg-slate-100 dark:bg-[#070b16] overflow-hidden">
              <iframe
                src={formatPdfEmbedUrl(activePdf.url)}
                title={`${activePdf.title} (Read-Only PDF)`}
                className="w-full h-full border-0 select-none"
                allow="autoplay"
                loading="lazy"
              />
            </div>

            {/* Security & Document Repository Status Footer */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-[#080d19] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-teal-500" />
                <span>Official SpatioCore Tech Repository · Verified Document</span>
              </div>
              <a
                href={activePdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>Full Tab View</span>
                <ExternalLink size={10} />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
