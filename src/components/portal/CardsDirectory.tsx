/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowLeft, 
  QrCode, 
  ShieldCheck, 
  Sparkles,
  Phone,
  Mail,
  Share2
} from 'lucide-react';
import { BUSINESS_CARDS_DATA } from '../../data/portalData';

export default function CardsDirectory() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getDirectUrl = (cardId: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://spatiocoretech.com';
    let param = cardId;
    if (cardId === 'sidra-tul-muntaha') param = 'ceo';
    else if (cardId === 'mehtab-ahmed') param = 'coo';
    else if (cardId === 'sarah-mansoor') param = 'analyst';
    else if (cardId === 'david-vance') param = 'director';
    else if (cardId === 'ayesha-malik') param = 'consultant';

    return `${origin}/card?designation=${encodeURIComponent(param)}`;
  };

  const handleCopyLink = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getDirectUrl(cardId);
    navigator.clipboard.writeText(url);
    setCopiedId(cardId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#e8edf5] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] selection:bg-[#00c9a7] selection:text-[#0a0f1e] p-4 sm:p-8">
      <Helmet>
        <title>Corporate Visiting Cards Directory | SpatioCore Tech</title>
        <meta 
          name="description" 
          content="Official directory of digital visiting cards for SpatioCore Tech executive leadership and technical directors. Direct scannable access and contact profiles." 
        />
        <meta property="og:title" content="Corporate Visiting Cards Directory | SpatioCore Tech" />
        <meta property="og:description" content="Browse and view verified digital visiting cards for SpatioCore Tech executives and directors." />
        <meta property="og:image" content="https://spatiocoretech.com/images/og-share-card.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Corporate Visiting Cards Directory | SpatioCore Tech" />
        <meta name="twitter:description" content="Browse and view verified digital visiting cards for SpatioCore Tech executives and directors." />
      </Helmet>

      {/* Top Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#00c9a7] border border-slate-800 transition-colors text-xs font-semibold"
        >
          <ArrowLeft size={14} />
          <span>Main Website</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#177346]/20 border border-[#177346]/40 text-[#00c9a7] text-xs font-bold font-mono">
            <ShieldCheck size={13} />
            <span>5 Verified Corporate Cards</span>
          </div>
        </div>
      </header>

      {/* Hero Title */}
      <div className="max-w-6xl mx-auto py-8 sm:py-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00c9a7] tracking-widest uppercase bg-[#00c9a7]/10 px-3 py-1 rounded-full border border-[#00c9a7]/20">
          <Building2 size={13} />
          <span>SpatioCore Tech Personnel Roster</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Corporate Visiting Cards Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Access individual visiting cards with dedicated designation parameters, scannable QR verification codes, and tailored OpenGraph metadata.
        </p>
      </div>

      {/* Cards Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {BUSINESS_CARDS_DATA.map((card) => {
          const directUrl = getDirectUrl(card.id);
          const isCopied = copiedId === card.id;
          const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(directUrl)}&color=00c9a7&bgcolor=0b1120&qzone=1`;

          return (
            <div 
              key={card.id}
              className="bg-[#111827] rounded-2xl border border-slate-800 hover:border-[#177346]/60 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,201,167,0.1)] group relative overflow-hidden"
            >
              {/* Card Header Strip */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#177346]/20 text-[#00c9a7] border border-[#177346]/40 uppercase tracking-wider">
                      {card.badge || 'Verified Executive'}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00c9a7] transition-colors mt-2">
                      {card.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300">
                      {card.displayTitle || card.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {card.department}
                    </p>
                  </div>

                  {/* Mini Scannable QR */}
                  <div className="w-14 h-14 bg-[#0b1120] p-1 rounded-xl border border-slate-700/80 shrink-0 flex items-center justify-center shadow-inner">
                    <img src={qrSrc} alt="QR Code" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Contact info snippets */}
                <div className="space-y-1.5 py-3 border-y border-slate-800/80 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-[#00c9a7]" />
                    <span>{card.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-[#00c9a7]" />
                    <span className="truncate">{card.email}</span>
                  </div>
                </div>

                {/* Direct Link Parameter Display */}
                <div className="mt-3 bg-[#0a0f1d] p-2.5 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>Direct Access URL:</span>
                    <span className="text-[#00c9a7] font-semibold">?designation parameter</span>
                  </div>
                  <div className="font-mono text-slate-300 truncate text-[10.5px]">
                    {directUrl.replace('https://', '')}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 mt-4 flex items-center gap-2">
                <Link
                  to={card.id === 'sidra-tul-muntaha' ? '/card?designation=ceo' : card.id === 'mehtab-ahmed' ? '/card?designation=coo' : card.id === 'sarah-mansoor' ? '/card?designation=analyst' : card.id === 'david-vance' ? '/card?designation=director' : '/card?designation=consultant'}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#177346] hover:bg-[#135c38] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span>Open Card</span>
                </Link>

                <button
                  onClick={(e) => handleCopyLink(card.id, e)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title="Copy Direct URL"
                >
                  {isCopied ? <Check size={14} className="text-[#00c9a7]" /> : <Copy size={14} />}
                </button>
              </div>

            </div>
          );
        })}
      </main>

      {/* Directory Footer */}
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:text-[#00c9a7] transition-colors">
            Main Website
          </Link>
          <span>·</span>
          <Link to="/card" className="hover:text-[#00c9a7] transition-colors">
            Default CEO Card
          </Link>
        </div>

        <div>
          © {new Date().getFullYear()} SpatioCore Tech. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
