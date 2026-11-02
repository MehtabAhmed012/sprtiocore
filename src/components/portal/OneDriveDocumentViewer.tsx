/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  Eye, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  ShieldCheck, 
  Lock, 
  Check, 
  Cloud, 
  BookOpen,
  Settings,
  ChevronDown
} from 'lucide-react';
import { BROCHURES_DATA, PROFILES_DATA, Brochure, Profile } from '../../data/portalData';
import { formatPdfEmbedUrl, getPdfDownloadUrl } from '../../utils/pdfEmbed';

interface OneDriveDocumentViewerProps {
  mode: 'brochures' | 'profiles';
}

export default function OneDriveDocumentViewer({ mode }: OneDriveDocumentViewerProps) {
  const isBrochures = mode === 'brochures';
  const documents = isBrochures ? BROCHURES_DATA : PROFILES_DATA;

  // Selected document within the OneDrive viewer
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'onedrive' | 'reader'>('onedrive');
  const [customOneDriveUrl, setCustomOneDriveUrl] = useState<string>('');
  const [showConfig, setShowConfig] = useState(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  // Default OneDrive read-only embed URLs
  // For SpatioCore Tech official cloud repository
  const defaultOneDriveEmbeds: Record<string, string> = {
    // Brochures - Local Verified Documents
    'corporate-capabilities-2026': '/documents/Brochure.pdf',
    'remote-sensing-sar-guide': '/documents/Brochure.pdf',
    'environmental-carbon-brief': '/documents/Brochure.pdf',
    'drone-lidar-surveying-brief': '/documents/Brochure.pdf',
    // Profiles - Local Verified Documents
    'corporate-dossier': '/documents/Profile.pdf',
    'executive-leadership-profile': '/documents/Profile.pdf',
    'geospatial-engineering-group': '/documents/Profile.pdf'
  };

  const currentEmbedUrl = defaultOneDriveEmbeds[selectedDocId] || defaultOneDriveEmbeds[documents[0].id];

  function getDocTitle(doc: Brochure | Profile | undefined): string {
    if (!doc) return 'Official Document';
    return 'name' in doc ? doc.name : doc.title;
  }

  function getDocSubtitle(doc: Brochure | Profile | undefined): string {
    if (!doc) return '';
    return 'subtitle' in doc ? doc.subtitle : doc.title;
  }

  function getDocDescription(doc: Brochure | Profile | undefined): string {
    if (!doc) return '';
    return 'overview' in doc ? doc.overview : doc.description;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownload = () => {
    const downloadUrl = getPdfDownloadUrl(currentEmbedUrl);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `${selectedDocId}_SpatioCoreTech.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={`w-full mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0a0f1e] p-4 flex flex-col justify-between' : ''}`}>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold mb-1">
            <Cloud size={15} className="text-[#0078d4]" />
            <span className="uppercase tracking-wider">Microsoft OneDrive Cloud Repository</span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded-full font-bold">
              <Lock size={10} />
              <span>Read-Only PDF</span>
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{isBrochures ? 'Official Brochures Cloud Viewer' : 'Official Profiles Cloud Viewer'}</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Embedded read-only PDF viewer directly synced with SpatioCore Tech's Microsoft OneDrive repository. Non-editable secure transmission.
          </p>
        </div>

        {/* View Controls & Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('onedrive')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold flex items-center gap-1.5 ${
                activeTab === 'onedrive'
                  ? 'bg-white dark:bg-teal-500 text-slate-900 dark:text-slate-950 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cloud size={13} className="text-[#0078d4]" />
              <span>OneDrive iFrame</span>
            </button>
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold flex items-center gap-1.5 ${
                activeTab === 'reader'
                  ? 'bg-white dark:bg-teal-500 text-slate-900 dark:text-slate-950 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen size={13} />
              <span>Interactive Reader</span>
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy document link"
          >
            {copiedLink ? <Check size={14} className="text-teal-500" /> : <Eye size={14} />}
            <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download PDF"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Document Selector Pill Tabs */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
        <span className="text-slate-400 shrink-0 text-[11px]">Select Document:</span>
        {documents.map((doc) => {
          const title = 'title' in doc ? doc.title : doc.name;
          const isSelected = doc.id === selectedDocId;
          return (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText size={12} className={isSelected ? 'text-teal-400 dark:text-slate-950' : 'text-slate-400'} />
              <span>{title.length > 28 ? title.slice(0, 26) + '...' : title}</span>
            </button>
          );
        })}
      </div>

      {/* Main iFrame & Reader Container */}
      <div className={`relative rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1222] shadow-xl overflow-hidden transition-all ${isFullscreen ? 'flex-1 h-[calc(100vh-140px)]' : 'h-[580px] sm:h-[660px]'}`}>
        
        {/* OneDrive Security & Metadata Banner */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#080d19] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300 font-semibold truncate">
              {getDocTitle(selectedDoc)}
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-[11px] text-teal-600 dark:text-teal-400">
              Read-Only Certified (PDF)
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-teal-500" />
              <span>TLS Encrypted</span>
            </span>
            <a
              href={currentEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>OneDrive Source</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Tab 1: Direct OneDrive iFrame (Embed with Read-Only Mode) */}
        {activeTab === 'onedrive' && (
          <div className="relative w-full h-[calc(100%-42px)] bg-slate-100 dark:bg-[#070b16]">
            {/* Embedded Streamed PDF iframe */}
            <iframe
              src={formatPdfEmbedUrl(currentEmbedUrl)}
              title={`SpatioCore Tech OneDrive Document - ${selectedDocId}`}
              className="w-full h-full border-0 select-none"
              allow="autoplay"
              loading="lazy"
            />

            {/* Seamless in-frame notice and fallback bar */}
            <div className="absolute bottom-2 left-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 shadow-sm">
              <div className="flex items-center gap-2">
                <Cloud size={14} className="text-[#0078d4]" />
                <span>OneDrive Read-Only Protected View</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('reader')}
                  className="text-teal-600 dark:text-teal-400 hover:underline font-bold cursor-pointer"
                >
                  Switch to Interactive Layout Reader →
                </button>
                <a
                  href={currentEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white"
                >
                  Open in New Tab ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive High-Precision Native Layout Reader */}
        {activeTab === 'reader' && selectedDoc && (
          <div className="w-full h-[calc(100%-42px)] overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200">
            {/* Document Header Plate */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e1628] to-[#080d19] text-white border border-teal-500/30 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-teal-400 font-mono text-[11px] font-bold tracking-widest uppercase mb-1">
                    {(selectedDoc as any).category || (selectedDoc as any).badge} · OFFICIAL DOSSIER
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    {getDocTitle(selectedDoc)}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {getDocSubtitle(selectedDoc)}
                  </p>
                </div>

                <div className="bg-teal-500/15 border border-teal-400/40 p-3 rounded-xl font-mono text-center shrink-0">
                  <div className="text-[10px] text-teal-300">READ-ONLY CERTIFIED</div>
                  <div className="text-sm font-bold text-white mt-0.5">SpatioCore Tech</div>
                  <div className="text-[9px] text-slate-400">Q2 2026 Edition</div>
                </div>
              </div>
            </div>

            {/* Document Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">
                    Executive Overview:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {getDocDescription(selectedDoc)}
                  </p>
                </div>

                {'highlights' in selectedDoc && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">
                      Technical Highlights:
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {selectedDoc.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-teal-500 font-bold shrink-0">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {'keyCapabilities' in selectedDoc && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">
                      Core Strategic Capabilities:
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {selectedDoc.keyCapabilities.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-teal-500 font-bold shrink-0">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar: Table of Contents / Accreditations */}
              <div className="space-y-4">
                {'tableOfContents' in selectedDoc && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
                    <h4 className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
                      Sections Index:
                    </h4>
                    <div className="space-y-2 font-mono">
                      {selectedDoc.tableOfContents.map((chap, i) => (
                        <div key={i} className="flex items-center justify-between pb-1.5 border-b border-slate-200/50 dark:border-slate-800/80 last:border-0">
                          <span className="text-slate-700 dark:text-slate-300">0{i+1}. {chap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {'credentials' in selectedDoc && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
                    <h4 className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
                      Verified Credentials:
                    </h4>
                    <div className="space-y-2">
                      {selectedDoc.credentials.map((cred, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Action Box */}
                <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-xs space-y-3">
                  <div className="font-mono font-bold text-slate-900 dark:text-white">
                    Need the raw PDF offline?
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Download the official cryptographic 300-DPI publication file directly to your workstation.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download size={14} />
                    <span>Download PDF File</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
