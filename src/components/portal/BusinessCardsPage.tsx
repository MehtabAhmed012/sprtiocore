/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  CreditCard, 
  Phone, 
  Mail, 
  MessageCircle, 
  Download, 
  QrCode, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Share2, 
  Sparkles, 
  Linkedin, 
  Facebook, 
  RotateCw,
  Maximize2,
  ChevronDown
} from 'lucide-react';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import SEOHead from './SEOHead';
import { BusinessCardPreview } from './DocumentPreviews';
import { BUSINESS_CARDS_DATA, BusinessCard, ORGANIZATION_CONFIG } from '../../data/portalData';
import IdentityBarcodeQRModal, { IdentityItemMeta } from './IdentityBarcodeQRModal';

export default function BusinessCardsPage() {
  const [searchParams] = useSearchParams();
  const cardQueryParam = searchParams.get('card');

  // Active card showcased directly on screen
  const [activeCardId, setActiveCardId] = useState<string>(() => {
    if (cardQueryParam) {
      if (cardQueryParam === 'ceo') return 'sidra-tul-muntaha';
      if (cardQueryParam === 'coo') return 'mehtab-ahmed';
      const found = BUSINESS_CARDS_DATA.find(c => c.id === cardQueryParam);
      if (found) return found.id;
    }
    return 'sidra-tul-muntaha'; // Default to CEO
  });

  const [selectedModalCard, setSelectedModalCard] = useState<BusinessCard | null>(null);
  const [barcodeModalItem, setBarcodeModalItem] = useState<IdentityItemMeta | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [isStageFlipped, setIsStageFlipped] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardQueryParam) {
      if (cardQueryParam === 'ceo') setActiveCardId('sidra-tul-muntaha');
      else if (cardQueryParam === 'coo') setActiveCardId('mehtab-ahmed');
      else {
        const found = BUSINESS_CARDS_DATA.find(c => c.id === cardQueryParam);
        if (found) setActiveCardId(found.id);
      }
    }
  }, [cardQueryParam]);

  const activeCard: BusinessCard = BUSINESS_CARDS_DATA.find(c => c.id === activeCardId) || BUSINESS_CARDS_DATA[0];

  const filterOptions = [
    { id: 'all', label: 'All Personnel' },
    { id: 'executive', label: '★ Executive Leadership (CEO & COO)' },
    { id: 'Earth Observation & Spectral Analytics', label: 'Earth Observation & Spectral Analytics' },
    { id: 'Geodatabase & Web GIS Solutions', label: 'Geodatabase & Web GIS Solutions' },
    { id: 'Sustainability & Ecological GIS', label: 'Sustainability & Ecological GIS' }
  ];

  const filteredCards = BUSINESS_CARDS_DATA.filter(card => {
    if (filterDepartment === 'all') return true;
    if (filterDepartment === 'executive') return card.isExecutive;
    return card.department === filterDepartment;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Generate and download a standard vCard 3.0 file
  const downloadVCard = (card: BusinessCard) => {
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${card.name}`,
      `N:${card.name.split(' ').slice(1).join(' ')};${card.name.split(' ')[0]};;;`,
      `ORG:${card.vCardData?.organization || 'SpatioCore Tech'}`,
      `TITLE:${card.title}`,
      `TEL;TYPE=CELL,VOICE:${card.phone}`,
      `EMAIL;TYPE=WORK,INTERNET:${card.email}`,
      `URL:${card.vCardData?.website || 'https://spatiocore.com'}`,
      `ADR;TYPE=WORK:;;${card.location};;;;`,
      `NOTE:${card.bio} | WhatsApp: ${card.whatsapp} | SpatioCore Tech Official Visiting Card`,
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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Copied ${field} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleShareCard = (card: BusinessCard) => {
    const shareUrl = window.location.origin + `/card/${card.id}`;
    if (navigator.share) {
      navigator.share({
        title: `${card.name} - ${card.title} | SpatioCore Tech`,
        text: `Official Digital Business Card for ${card.name} (${card.title}) at SpatioCore Tech. Phone: ${card.phone}, Email: ${card.email}`,
        url: shareUrl,
      }).catch(() => {
        copyToClipboard(shareUrl, 'Card link');
      });
    } else {
      copyToClipboard(shareUrl, 'Card link');
    }
  };

  const selectAndScrollToCard = (card: BusinessCard) => {
    setActiveCardId(card.id);
    setIsStageFlipped(false);
    if (stageRef.current) {
      stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b16] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-teal-500 selection:text-slate-950">
      <SEOHead 
        title="Official Business Cards Directory | SpatioCore Tech"
        description="Browse official digital business cards and executive credentials for SpatioCore Tech personnel."
        ogTitle="Official Personnel Directory & Visiting Cards – SpatioCore Tech"
        canonicalPath="/business-cards"
        noIndex={true}
      />
      <PortalHeader 
        compact 
        showBackLink 
        backTo="/" 
        backLabel="Return to Identity Portal" 
      />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-teal-950 text-white dark:text-teal-200 px-4 py-2.5 rounded-xl border border-teal-500/50 shadow-xl flex items-center gap-2 text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check size={14} className="text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-8">
        
        {/* ========================================================================= */}
        {/* DIRECT VISITING CARD ACTIVE STAGE (OPEN DIRECTLY ON SCREEN) */}
        {/* ========================================================================= */}
        <section 
          ref={stageRef}
          aria-label="Active Visiting Card"
          className="mb-10 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-[#0d1527] dark:via-[#09101f] dark:to-[#09101f] rounded-3xl border-2 border-teal-500/40 dark:border-teal-500/40 p-4 sm:p-7 shadow-[0_12px_40px_rgba(0,201,167,0.12)] relative overflow-hidden"
        >
          {/* Subtle Topographic Background Texture */}
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 201, 167, 0.4) 1px, transparent 1px), radial-gradient(rgba(26, 115, 232, 0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}
          />

          {/* Stage Top Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-teal-500 animate-ping shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Direct Visiting Card
                  </h2>
                  <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/40 px-2 py-0.5 rounded-full">
                    ★ OPEN ON SCREEN
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Card is open directly. Tap to flip sides, save to phone contacts, or chat on WhatsApp.
                </p>
              </div>
            </div>

            {/* Quick Executive Switcher Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-slate-400 mr-1 hidden md:inline">Quick Switch:</span>
              {BUSINESS_CARDS_DATA.slice(0, 4).map(card => (
                <button
                  key={card.id}
                  onClick={() => {
                    setActiveCardId(card.id);
                    setIsStageFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCardId === card.id
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400'
                  }`}
                >
                  <span>{card.isExecutive ? '👑' : '⚡'} {card.name.split(' ')[0]}</span>
                </button>
              ))}
              <Link
                to={`/card/${activeCard.id}`}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-all flex items-center gap-1"
                title="Open in Dedicated Standalone Card Mode"
              >
                <Maximize2 size={12} />
                <span className="hidden sm:inline">Dedicated View</span>
              </Link>
            </div>
          </div>

          {/* Center Stage: Visiting Card Graphic + Immediate Action Console */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: The Life-like 3D Visiting Card */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-md">
                <BusinessCardPreview
                  name={activeCard.name}
                  title={activeCard.title}
                  department={activeCard.department}
                  phone={activeCard.phone}
                  email={activeCard.email}
                  badge={activeCard.badge}
                  isExecutive={activeCard.isExecutive}
                  showFlipButton={true}
                />
              </div>
            </div>

            {/* Right Column: Direct Instant Action Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest">
                    {activeCard.badge || 'VERIFIED EXECUTIVE'}
                  </span>
                  {activeCard.code && (
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                      CODE: {activeCard.code}
                    </span>
                  )}
                  <span className="text-xs font-mono text-amber-500 font-bold">★ OFFICIAL</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {activeCard.name}
                </h3>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                  {activeCard.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {activeCard.department}
                </p>
              </div>

              {/* Barcode & QR Code Scan Badge Modal Trigger */}
              <button
                onClick={() => setBarcodeModalItem({
                  code: activeCard.code || `SC-ID-${activeCard.id}`,
                  title: `${activeCard.name} — Visiting Card`,
                  subtitle: `${activeCard.title} | ${activeCard.department}`,
                  targetPath: `/card/${activeCard.id}`,
                  typeLabel: 'Personnel Digital Visiting Card',
                  formatName: 'Live Interactive Profile & vCard'
                })}
                className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl shadow-[0_6px_20px_rgba(0,201,167,0.25)] transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
              >
                <QrCode size={17} className="stroke-[2.5]" />
                <span>Download Barcode & QR Scan Badge (PNG)</span>
              </button>

              {/* Instant 1-Tap Save to Phone Contacts */}
              <button
                onClick={() => downloadVCard(activeCard)}
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono font-bold text-xs py-3 px-4 rounded-xl border border-slate-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Download size={15} />
                <span>Save Contact to Phone (.vcf)</span>
              </button>

              {/* Direct Quick Action Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={activeCard.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold py-3 px-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={`tel:${activeCard.phone}`}
                  className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-mono text-xs font-bold py-3 px-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <Phone size={15} />
                  <span>Call Direct</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`mailto:${activeCard.email}`}
                  className="bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 font-mono text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Mail size={14} className="text-teal-500" />
                  <span>Send Email</span>
                </a>

                <button
                  onClick={() => handleShareCard(activeCard)}
                  className="bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 font-mono text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Share2 size={14} className="text-teal-500" />
                  <span>Share Card</span>
                </button>
              </div>

              {/* Direct Details Quick Copy */}
              <div className="bg-slate-100 dark:bg-slate-900/90 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800 text-[11px] font-mono space-y-1.5">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Phone: <b className="text-slate-900 dark:text-slate-200">{activeCard.phone}</b></span>
                  <button onClick={() => copyToClipboard(activeCard.phone, 'phone')} className="text-teal-500 hover:text-teal-400 cursor-pointer">
                    {copiedField === 'phone' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="truncate pr-2">Email: <b className="text-slate-900 dark:text-slate-200">{activeCard.email}</b></span>
                  <button onClick={() => copyToClipboard(activeCard.email, 'email')} className="text-teal-500 hover:text-teal-400 cursor-pointer shrink-0">
                    {copiedField === 'email' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DIRECTORY SECTION HEADER & FILTERS */}
        {/* ========================================================================= */}
        <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold mb-1">
                <CreditCard size={14} />
                <span>ALL VERIFIED PERSONNEL CARDS</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Leadership & Technical Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Select any card below to open it directly in the live viewing stage above or view details.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <Sparkles size={12} className="text-teal-500" />
                <span>{filteredCards.length} Cards in Directory</span>
              </span>
            </div>
          </div>

          {/* Quick Filter tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-2 scrollbar-none text-xs">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilterDepartment(opt.id)}
                className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer ${
                  filterDepartment === opt.id
                    ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCards.map((card) => {
            const isCurrentlyActive = card.id === activeCard.id;
            return (
              <div
                key={card.id}
                className={`bg-white dark:bg-[#111827] rounded-2xl border ${
                  isCurrentlyActive
                    ? 'border-teal-500 dark:border-teal-500 shadow-[0_4px_24px_rgba(0,201,167,0.18)] ring-2 ring-teal-500/30'
                    : card.isExecutive 
                    ? 'border-teal-500/40 dark:border-teal-500/40 shadow-xs' 
                    : 'border-slate-200 dark:border-slate-800'
                } p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative`}
              >
                {/* Executive Ribbon for CEO and COO */}
                {card.isExecutive && (
                  <div className="absolute -top-3 right-5 bg-gradient-to-r from-amber-500 to-teal-500 text-slate-950 text-[10px] font-mono font-black uppercase px-3 py-0.5 rounded-full shadow-sm tracking-widest flex items-center gap-1">
                    <span>★ OFFICIAL LEADERSHIP</span>
                  </div>
                )}

                {/* Card Preview Graphic */}
                <div 
                  onClick={() => selectAndScrollToCard(card)} 
                  className="w-full mb-4 cursor-pointer"
                  title="Click to showcase this card directly"
                >
                  <BusinessCardPreview
                    name={card.name}
                    title={card.title}
                    department={card.department}
                    phone={card.phone}
                    email={card.email}
                    badge={card.badge}
                    isExecutive={card.isExecutive}
                    showFlipButton={true}
                  />
                </div>

                {/* Person Name & Job Title */}
                <div className="mt-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 
                      onClick={() => selectAndScrollToCard(card)}
                      className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors cursor-pointer"
                    >
                      {card.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {card.code && (
                        <span className="font-mono text-[9px] font-bold text-teal-600 dark:text-teal-300 bg-teal-500/15 border border-teal-500/30 px-1.5 py-0.5 rounded">
                          {card.code}
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 px-2 py-0.5 rounded-full font-semibold">
                        {card.badge || 'Verified Member'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                    {card.title}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {card.department}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 line-clamp-2 leading-relaxed">
                    {card.bio}
                  </p>

                  {/* Direct quick contact indicators */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <a href={`tel:${card.phone}`} className="hover:text-teal-500 transition-colors flex items-center gap-1">
                      <Phone size={11} className="text-teal-500" />
                      <span>{card.phone}</span>
                    </a>
                    <span>·</span>
                    <a href={`mailto:${card.email}`} className="hover:text-teal-500 transition-colors flex items-center gap-1">
                      <Mail size={11} className="text-teal-500" />
                      <span>Email Direct</span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => selectAndScrollToCard(card)}
                    className="flex-1 bg-slate-900 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    <CreditCard size={15} />
                    <span>Open Card Direct</span>
                  </button>

                  <button
                    onClick={() => setBarcodeModalItem({
                      code: card.code || `SC-ID-${card.id}`,
                      title: `${card.name} — Visiting Card`,
                      subtitle: `${card.title} | ${card.department}`,
                      targetPath: `/card/${card.id}`,
                      typeLabel: 'Personnel Digital Visiting Card',
                      formatName: 'Live Interactive Profile & vCard'
                    })}
                    className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 p-3 rounded-xl transition-colors cursor-pointer"
                    title="Download Barcode & QR Code Badge"
                    aria-label="Download Barcode & QR Code"
                  >
                    <QrCode size={16} />
                  </button>

                  <button
                    onClick={() => downloadVCard(card)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-3 rounded-xl transition-colors cursor-pointer"
                    title="Save Contact (vCard .vcf)"
                    aria-label="Save Contact"
                  >
                    <Download size={16} />
                  </button>

                  <a
                    href={card.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-600 dark:text-teal-400 p-3 rounded-xl transition-colors border border-teal-200 dark:border-teal-800"
                    title="Direct WhatsApp"
                    aria-label="Direct WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>

                  <Link
                    to={`/card/${card.id}`}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-3 rounded-xl transition-colors"
                    title="Standalone Direct View"
                    aria-label="Standalone View"
                  >
                    <Maximize2 size={16} />
                  </Link>

                  <button
                    onClick={() => handleShareCard(card)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 p-3 rounded-xl transition-colors cursor-pointer"
                    title="Share Card"
                    aria-label="Share Card"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Card Detail Modal (optional extra detail view) */}
      {selectedModalCard && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedModalCard(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-4 pr-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 uppercase tracking-widest font-bold">
                  OFFICIAL DIGITAL VCARD & PASSPORT
                </span>
                <span className="text-[10px] font-mono text-amber-500 font-bold">
                  ★ {selectedModalCard.badge || 'VERIFIED'}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {selectedModalCard.name}
              </h2>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                {selectedModalCard.title} · {selectedModalCard.department}
              </p>
            </div>

            {/* Card Mockup in Modal */}
            <div className="my-4">
              <BusinessCardPreview
                name={selectedModalCard.name}
                title={selectedModalCard.title}
                department={selectedModalCard.department}
                phone={selectedModalCard.phone}
                email={selectedModalCard.email}
                badge={selectedModalCard.badge}
                isExecutive={selectedModalCard.isExecutive}
                showFlipButton={true}
              />
            </div>

            {/* Contact Details List */}
            <div className="space-y-2.5 my-4 bg-slate-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-mono">Organization:</span>
                <span className="font-semibold text-slate-900 dark:text-white">SpatioCore Tech</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-mono">Official Phone:</span>
                <div className="flex items-center gap-2">
                  <a href={`tel:${selectedModalCard.phone}`} className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                    {selectedModalCard.phone}
                  </a>
                  <button
                    onClick={() => copyToClipboard(selectedModalCard.phone, 'phone')}
                    className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                    title="Copy phone"
                  >
                    {copiedField === 'phone' ? <Check size={12} className="text-teal-500" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-mono">Official Email:</span>
                <div className="flex items-center gap-2">
                  <a href={`mailto:${selectedModalCard.email}`} className="font-semibold text-teal-600 dark:text-teal-400 hover:underline break-all">
                    {selectedModalCard.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(selectedModalCard.email, 'email')}
                    className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                    title="Copy email"
                  >
                    {copiedField === 'email' ? <Check size={12} className="text-teal-500" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-mono">WhatsApp QR Link:</span>
                <a 
                  href={selectedModalCard.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>wa.me/qr/6LVDIH7IAJ7UB1</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400 font-mono">Location:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{selectedModalCard.location}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => downloadVCard(selectedModalCard)}
                className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>Save to Phone Contacts</span>
              </button>

              <a
                href={selectedModalCard.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Barcode & QR Code Download Scan Modal */}
      <IdentityBarcodeQRModal
        isOpen={!!barcodeModalItem}
        onClose={() => setBarcodeModalItem(null)}
        item={barcodeModalItem}
      />

      <PortalFooter />
    </div>
  );
}
