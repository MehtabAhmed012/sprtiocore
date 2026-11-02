/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  FileText, 
  UserCheck, 
  Phone, 
  Mail, 
  MessageCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  QrCode, 
  Sparkles,
  Eye,
  Lock,
  FolderTree,
  Maximize2
} from 'lucide-react';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import CategoryCard from './CategoryCard';
import SEOHead from './SEOHead';
import QRCodeScreenModal from './QRCodeScreenModal';
import IdentityBarcodeQRModal, { IdentityItemMeta } from './IdentityBarcodeQRModal';
import { BusinessCardPreview, BrochurePreview, ProfilePreview } from './DocumentPreviews';
import { ORGANIZATION_CONFIG, BUSINESS_CARDS_DATA, BROCHURES_DATA, PROFILES_DATA, OFFICIAL_PDF_CATALOG } from '../../data/portalData';

export default function PortalHome() {
  const [isQrScreenOpen, setIsQrScreenOpen] = useState(false);
  const [barcodeModalItem, setBarcodeModalItem] = useState<IdentityItemMeta | null>(null);
  const defaultPage = OFFICIAL_PDF_CATALOG.landerConfiguration.defaultPage;
  const activeBrochure = BROCHURES_DATA.find(b => !b.isComingSoon);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1e] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Dynamic SEO & OpenGraph Meta Tags from JSON (with unindexed robots tag) */}
      <SEOHead 
        title={defaultPage.metaTags.title}
        description={defaultPage.metaTags.description}
        ogTitle={defaultPage.metaTags.ogTitle}
        ogDescription={defaultPage.metaTags.ogDescription}
        ogImage={defaultPage.metaTags.ogImage}
        canonicalPath="/"
        noIndex={defaultPage.unindexed}
      />

      {/* Official Portal Header */}
      <PortalHeader />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-8">
        
        {/* ================= DEFAULT LANDER SHOWCASE (UNINDEXED IMAGE) ================= */}
        {/* Shown as the primary lander page banner when QR code screen opens or on internal links */}
        <div className="mb-8 rounded-3xl overflow-hidden border-2 border-teal-500/40 bg-gradient-to-br from-[#0c1322] via-[#111c33] to-[#070b14] text-white shadow-[0_12px_40px_rgba(0,201,167,0.15)] relative">
          
          {/* Top highlight bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 via-[#00c9a7] to-amber-400" />

          <div className="p-5 sm:p-7 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Context & Metadata */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/40 text-[11px] font-mono font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>DEFAULT LANDER PAGE</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold tracking-wider uppercase">
                  <Lock size={11} />
                  <span>UNINDEXED ASSET · NOINDEX</span>
                </span>
              </div>

              <div>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {defaultPage.heading}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans">
                  {defaultPage.description}
                </p>
              </div>

              {/* Repository & OpenGraph Specs bar */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 font-mono text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-teal-400 font-semibold flex items-center gap-1.5">
                    <FolderTree size={13} />
                    <span>OfficialPDF/&#123;folder&#125;/&#123;fileName&#125;</span>
                  </span>
                  <span className="text-[10px] text-slate-400">JSON-Powered Meta</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Active PDF: {activeBrochure?.filePath || '/OfficialPDF/brochures/brochures.pdf'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap pt-1">
                <Link
                  to="/brochures"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <Eye size={15} />
                  <span>View Official PDF</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsQrScreenOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-semibold transition-all cursor-pointer hover:text-white"
                >
                  <QrCode size={15} className="text-teal-400" />
                  <span>Open QR Code Screen</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Thumbnail of the Default Unindexed Image */}
            <div 
              onClick={() => setIsQrScreenOpen(true)}
              className="w-full lg:w-[420px] rounded-2xl overflow-hidden border border-teal-500/40 shadow-xl cursor-pointer group relative select-none transform transition-all duration-300 hover:scale-[1.02]"
              title="Click to expand QR Code Destination Screen"
            >
              <img
                src={defaultPage.defaultImage}
                alt="SpatioCore Tech Official Default Lander - Unindexed"
                className="w-full h-auto object-cover group-hover:brightness-105 transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                <div className="text-[10px] font-mono text-teal-300 bg-slate-950/90 px-2 py-1 rounded border border-teal-500/30">
                  Unindexed Internal Image Asset
                </div>
                <div className="p-1.5 rounded-lg bg-teal-500 text-slate-950 shadow">
                  <Maximize2 size={13} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FAST-LANE BANNER: Scanned Visiting Card Direct Access */}
        <div className="mb-6 bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-blue-500/15 rounded-2xl p-4 sm:p-5 border-2 border-teal-500/40 dark:border-teal-500/40 shadow-[0_8px_30px_rgba(0,201,167,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <CreditCard size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-black text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wider">
                  Scanned a Physical Visiting Card?
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs">
                  ★ INSTANT CARD
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                Open the official executive digital visiting card directly on your screen with 1-tap contact saving.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <Link
              to="/card/ceo"
              className="flex-1 md:flex-none text-center bg-teal-500 hover:bg-teal-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider px-4 py-3 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <span>👑 Open CEO Card</span>
            </Link>
            <Link
              to="/card/coo"
              className="flex-1 md:flex-none text-center bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-display font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl border border-slate-700 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <span>⚡ Open COO Card</span>
            </Link>
          </div>
        </div>

        {/* Quick QR Context Notice */}
        <div className="mb-6 sm:mb-8 bg-white dark:bg-[#111827] rounded-xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <QrCode size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Official SpatioCore QR Code Gateway
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Select a document category below to view and verify digital assets.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
            <a
              href={`tel:${ORGANIZATION_CONFIG.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <Phone size={11} className="text-teal-500" />
              <span>Call Us</span>
            </a>
            <a
              href={ORGANIZATION_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <MessageCircle size={11} className="text-teal-500" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* The Three Main Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Business Cards */}
          <CategoryCard
            icon={<CreditCard size={22} />}
            code="SC-ID-CEO-01"
            countLabel={`${BUSINESS_CARDS_DATA.length} Active Cards`}
            title="Business Cards"
            description="View and access official digital business cards for our team and representatives."
            preview={
              <BusinessCardPreview 
                name="Sidra Tul Muntaha" 
                title="Chief Executive Officer (CEO)"
                department="Executive Leadership & Corporate Strategy"
                badge="CEO · Executive Leadership"
                phone="+92 326 5702803"
                email="Insights.spatiocoretech@outlook.com"
                showFlipButton={true}
              />
            }
            onScanBadgeClick={() => setBarcodeModalItem({
              code: 'SC-ID-CEO-01',
              title: 'Sidra Tul Muntaha — CEO Visiting Card',
              subtitle: 'Chief Executive Officer | Executive Leadership',
              targetPath: '/card/ceo',
              typeLabel: 'Personnel Digital Visiting Card',
              formatName: 'Live Interactive Profile & vCard'
            })}
            directAction={{
              text: "Open Visiting Card Direct",
              url: "/card/ceo"
            }}
            buttonText="Browse All Business Cards"
            buttonUrl="/business-cards"
          />

          {/* Card 2: Brochures (1 Active · 3 Coming Soon) */}
          <CategoryCard
            icon={<FileText size={22} />}
            code="SC-PUB-BROCHURE-2026"
            countLabel="1 Active · 3 Coming Soon"
            title="Brochures"
            description="Explore our official brochures, company information, and geospatial publications. View PDF in-browser."
            preview={
              <BrochurePreview 
                title="Corporate Capabilities & GIS Solutions"
                category="2026 Edition"
                pages={28}
              />
            }
            onScanBadgeClick={() => setBarcodeModalItem({
              code: 'SC-PUB-BROCHURE-2026',
              title: 'Official Corporate Brochure 2026',
              subtitle: 'Geospatial Intelligence & Technical Capabilities',
              targetPath: '/brochures',
              typeLabel: 'Corporate Capability Publication',
              formatName: 'In-Browser 28-Page Vector PDF'
            })}
            directAction={{
              text: "View Active PDF",
              url: "/brochures"
            }}
            buttonText="Explore Brochures (View-Only)"
            buttonUrl="/brochures"
          />

          {/* Card 3: Profiles */}
          <CategoryCard
            icon={<UserCheck size={22} />}
            code="SC-DOC-PROFILE-V1"
            countLabel={`${PROFILES_DATA.length} Verified Dossiers`}
            title="Profiles"
            description="View professional, organizational, and team profiles."
            preview={
              <ProfilePreview 
                title="Corporate Dossier & Credentials"
                badge="Official Certified Dossier"
              />
            }
            onScanBadgeClick={() => setBarcodeModalItem({
              code: 'SC-DOC-PROFILE-V1',
              title: 'Official Company Profile Dossier (V1)',
              subtitle: '16-Page Certified Corporate Credentials & Projects',
              targetPath: '/profiles',
              typeLabel: 'Official Corporate Dossier',
              formatName: 'In-Browser 16-Page Vector PDF'
            })}
            buttonText="View Profiles"
            buttonUrl="/profiles"
          />
        </div>

        {/* Trust & Verification Strip */}
        <div className="mt-10 sm:mt-12 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider font-mono">
                <ShieldCheck size={16} />
                <span>Verified Source</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                All digital identity documents and cards are cryptographically verified by SpatioCore Tech.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider font-mono">
                <FolderTree size={16} />
                <span>OfficialPDF Repository</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Centralized JSON managed folder structure for capability brochures and technical guides.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider font-mono">
                <FileText size={16} />
                <span>In-Browser PDF Viewer</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Access official technical capability catalogs and environmental briefs with instant vector preview.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* QR Code Screen Modal */}
      <QRCodeScreenModal 
        isOpen={isQrScreenOpen} 
        onClose={() => setIsQrScreenOpen(false)} 
      />

      {/* Identity Barcode & QR Code Download Scan Modal */}
      <IdentityBarcodeQRModal
        isOpen={!!barcodeModalItem}
        onClose={() => setBarcodeModalItem(null)}
        item={barcodeModalItem}
      />

      {/* Official Portal Footer */}
      <PortalFooter />
    </div>
  );
}
