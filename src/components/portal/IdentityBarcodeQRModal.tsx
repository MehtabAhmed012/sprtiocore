/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import JsBarcode from 'jsbarcode';
import { 
  QrCode, 
  Barcode, 
  Download, 
  ExternalLink, 
  X, 
  Check, 
  ShieldCheck, 
  Copy, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface IdentityItemMeta {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: 'visiting_card' | 'brochure' | 'profile' | 'portal';
  targetPath: string; // e.g., '/card/ceo', '/brochures', '/profiles'
  department?: string;
  badge?: string;
}

interface IdentityBarcodeQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IdentityItemMeta | null;
}

export default function IdentityBarcodeQRModal({ isOpen, onClose, item }: IdentityBarcodeQRModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const barcodeSvgRef = useRef<SVGSVGElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  // Build the live absolute URL so that scanning with phone camera opens the exact existing page
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://spatiocore.com';
  const fullTargetUrl = item ? `${origin}${item.targetPath}` : '';

  // Render barcode into SVG via JsBarcode
  useEffect(() => {
    if (barcodeSvgRef.current && item && isOpen) {
      try {
        JsBarcode(barcodeSvgRef.current, item.code, {
          format: "CODE128",
          lineColor: "#0f172a",
          width: 2,
          height: 50,
          displayValue: true,
          font: "monospace",
          fontSize: 12,
          textMargin: 4,
          background: "#ffffff"
        });
      } catch (err) {
        console.warn('Barcode generation warning:', err);
      }
    }
  }, [item, isOpen]);

  const copyUrl = () => {
    if (!item) return;
    navigator.clipboard.writeText(fullTargetUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  // High-Resolution 800x1000 Downloadable Asset Badge
  const handleDownloadCompleteBadge = () => {
    if (!item) return;
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1050;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background
      ctx.fillStyle = '#0a0f1e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient accent border
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#00c9a7');
      grad.addColorStop(0.5, '#1a73e8');
      grad.addColorStop(1, '#f4a623');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, 10);

      // Header block
      ctx.fillStyle = '#00c9a7';
      ctx.font = 'bold 26px Orbitron, sans-serif';
      ctx.fillText('SPATIOCORE TECH', 50, 65);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px "DM Sans", sans-serif';
      ctx.fillText('OFFICIAL IDENTITY & ASSET VERIFICATION REGISTRY', 50, 95);

      // Inner Card Frame
      ctx.fillStyle = '#111827';
      ctx.strokeStyle = '#00c9a7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 120, 720, 870, 20);
      ctx.fill();
      ctx.stroke();

      // Title & Subtitle inside card
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 28px "DM Sans", sans-serif';
      ctx.fillText(item.title, 70, 180);

      ctx.fillStyle = '#00c9a7';
      ctx.font = 'bold 16px "Fira Code", monospace';
      ctx.fillText(item.subtitle, 70, 215);

      // Unique Identification Code Pill
      ctx.fillStyle = 'rgba(0, 201, 167, 0.15)';
      ctx.strokeStyle = '#00c9a7';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(70, 240, 360, 45, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#00c9a7';
      ctx.font = 'bold 16px "Fira Code", monospace';
      ctx.fillText(`CODE: ${item.code}`, 90, 269);

      // Scan instruction
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '14px "DM Sans", sans-serif';
      ctx.fillText('Scan QR Code with any phone camera to access the live verified page:', 70, 325);

      // Render QR code from SVG to Canvas
      const qrSvg = qrRef.current?.querySelector('svg');
      if (qrSvg) {
        const svgData = new XMLSerializer().serializeToString(qrSvg);
        const qrImg = new Image();
        qrImg.onload = () => {
          // White container for QR code
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(260, 350, 280, 280, 16);
          ctx.fill();

          // Draw QR image
          ctx.drawImage(qrImg, 280, 370, 240, 240);

          // Barcode Container
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(100, 660, 600, 130, 14);
          ctx.fill();

          // Draw Barcode SVG
          if (barcodeSvgRef.current) {
            const barcodeData = new XMLSerializer().serializeToString(barcodeSvgRef.current);
            const barcodeImg = new Image();
            barcodeImg.onload = () => {
              ctx.drawImage(barcodeImg, 120, 680, 560, 90);

              // Target URL display
              ctx.fillStyle = '#64748b';
              ctx.font = '13px "Fira Code", monospace';
              ctx.fillText(`Target: ${fullTargetUrl}`, 70, 830);

              // Footer text
              ctx.fillStyle = '#94a3b8';
              ctx.font = '12px "DM Sans", sans-serif';
              ctx.fillText('Issued by SpatioCore Tech (Private) Limited · SECP / FBR Accredited Repository', 70, 920);
              ctx.fillText(`Generated: ${new Date().toLocaleDateString()} · Cryptographic Hash SC-AUTH-2026`, 70, 945);

              // Trigger download
              const dataUrl = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.download = `${item.code}_SpatioCore_Scan_Badge.png`;
              link.href = dataUrl;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setDownloading(false);
            };
            barcodeImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(barcodeData)));
          }
        };
        qrImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      }
    } catch (err) {
      console.error('Download badge error:', err);
      setDownloading(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0c1222] rounded-3xl max-w-xl w-full border border-teal-500/40 shadow-2xl relative my-auto overflow-hidden text-slate-800 dark:text-slate-100">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <QrCode size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                  VERIFIED IDENTITY BADGE &amp; BARCODE
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Unique Identification Code Bar */}
          <div className="p-3 rounded-xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  Unique Identification Code
                </div>
                <div className="font-mono text-sm font-black text-teal-700 dark:text-teal-300">
                  {item.code}
                </div>
              </div>
            </div>

            <span className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30">
              AUTHENTIC
            </span>
          </div>

          {/* Scannable QR Code Box */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <QrCode size={14} className="text-teal-500" />
              <span>Scan with mobile phone to open page directly:</span>
            </div>

            <div 
              ref={qrRef}
              className="inline-block p-4 bg-white rounded-2xl shadow-md border-2 border-teal-500/30 hover:scale-[1.02] transition-transform"
            >
              <QRCode
                value={fullTargetUrl}
                size={180}
                level="H"
                className="w-40 h-40 sm:w-44 sm:h-44"
              />
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <span className="truncate max-w-xs">{fullTargetUrl}</span>
              <button
                type="button"
                onClick={copyUrl}
                className="p-1 hover:text-teal-500 transition-colors cursor-pointer text-slate-400"
                title="Copy Target Link"
              >
                {copiedUrl ? <Check size={14} className="text-teal-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Linear Code128 Barcode */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Barcode size={14} className="text-teal-500" />
                <span>Code 128 Laser Barcode</span>
              </span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">1D OPTICAL SCAN</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-center overflow-x-auto">
              <svg ref={barcodeSvgRef} className="max-w-full" />
            </div>
          </div>

          {/* Quick Target Page Test Link */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-mono">
              Scan Destination:
            </span>
            <a
              href={item.targetPath}
              className="inline-flex items-center gap-1.5 font-bold text-teal-600 dark:text-teal-400 hover:underline font-mono"
            >
              <span>Open Target Page</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Download Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownloadCompleteBadge}
              disabled={downloading}
              className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-display font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Download size={16} />
              <span>{downloading ? 'Generating Badge...' : 'Download Barcode & QR Badge (PNG)'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
