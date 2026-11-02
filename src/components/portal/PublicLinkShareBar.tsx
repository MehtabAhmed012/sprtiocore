/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Link2, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Globe, 
  ShieldCheck, 
  Sparkles,
  Barcode
} from 'lucide-react';

interface PublicLinkShareBarProps {
  title: string;
  path: string;
  code: string;
  categoryLabel?: string;
  aliases?: string[];
  onOpenBarcodeModal?: () => void;
  className?: string;
}

export default function PublicLinkShareBar({
  title,
  path,
  code,
  categoryLabel = 'Official Public Link',
  aliases = [],
  onOpenBarcodeModal,
  className = ''
}: PublicLinkShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState<string | null>(null);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://spatiocore.com';
  const fullUrl = `${origin}${path.startsWith('/') ? path : `/${path}`}`;

  const handleCopy = (urlToCopy: string, isMain = true) => {
    navigator.clipboard.writeText(urlToCopy);
    if (isMain) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      setCopiedAlias(urlToCopy);
      setTimeout(() => setCopiedAlias(null), 2500);
    }
  };

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0d1627] to-slate-900/90 border border-teal-500/30 p-3 sm:p-4 text-white shadow-lg backdrop-blur-md ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Identification & Link Indicator */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-400/40 uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>{categoryLabel}</span>
            </span>
            <span className="text-slate-400 font-mono">
              CODE: <span className="text-amber-400 font-bold">{code}</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">Type directly in browser address bar</span>
          </div>

          <div className="flex items-center gap-2">
            <Globe size={15} className="text-teal-400 shrink-0" />
            <div className="font-mono text-xs sm:text-sm font-bold text-teal-300 truncate max-w-[260px] sm:max-w-md select-all">
              {fullUrl}
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Copy Button */}
          <button
            type="button"
            onClick={() => handleCopy(fullUrl, true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
              copied
                ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 border border-teal-400'
            }`}
            title="Copy exact public URL to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Public Link</span>
              </>
            )}
          </button>

          {/* Barcode & QR Modal Button */}
          {onOpenBarcodeModal && (
            <button
              type="button"
              onClick={onOpenBarcodeModal}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-500/40 flex items-center gap-1.5 transition-all cursor-pointer hover:border-teal-400 shadow-sm active:scale-95"
              title="Download Barcode & QR Code verification badge"
            >
              <QrCode size={14} />
              <span className="hidden sm:inline">Scan / Download QR</span>
              <span className="sm:hidden">QR</span>
            </button>
          )}

          {/* Direct Open in New Tab Button */}
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            title="Open direct URL in new browser tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Browser URL Aliases (Typo Tolerant & Quick Paths) */}
      {aliases.length > 0 && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-slate-400">
          <span className="text-slate-500">Browser Direct Paths:</span>
          {aliases.map((alias) => {
            const aliasUrl = `${origin}${alias.startsWith('/') ? alias : `/${alias}`}`;
            const isThisCopied = copiedAlias === aliasUrl;
            return (
              <button
                key={alias}
                type="button"
                onClick={() => handleCopy(aliasUrl, false)}
                className={`px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                  isThisCopied
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : 'bg-slate-800/60 text-teal-400/90 border-slate-700/60 hover:border-teal-500/40 hover:text-teal-300'
                }`}
                title={`Click to copy alias: ${alias}`}
              >
                {alias}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
