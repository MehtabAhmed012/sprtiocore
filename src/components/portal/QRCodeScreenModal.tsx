/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QrCode, X, Eye, FileText, CreditCard, ShieldCheck, ExternalLink, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OFFICIAL_PDF_CATALOG } from '../../data/portalData';

interface QRCodeScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeScreenModal({ isOpen, onClose }: QRCodeScreenModalProps) {
  if (!isOpen) return null;

  const defaultPage = OFFICIAL_PDF_CATALOG.landerConfiguration.defaultPage;
  const activeBrochure = OFFICIAL_PDF_CATALOG.files.find(f => !f.isComingSoon);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0f172a] rounded-3xl max-w-2xl w-full border border-teal-500/40 shadow-2xl relative my-auto overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <QrCode size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                  QR CODE SCANNER DESTINATION
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-500 dark:text-amber-400 font-bold border border-amber-400/30">
                  UNINDEXED
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                Official Default QR Landing Screen
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body with Unindexed Default Image */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Default Image (Unindexed asset) */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-teal-500/30 shadow-lg group">
            <img
              src={defaultPage.defaultImage}
              alt="SpatioCore Tech Official Default Lander"
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-teal-500/30 text-[9px] font-mono text-teal-400 font-bold uppercase flex items-center gap-1.5">
              <ShieldCheck size={12} />
              <span>Unindexed Default Asset · Internal Only</span>
            </div>
          </div>

          {/* Context Explainer */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
              {defaultPage.heading}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {defaultPage.description}
            </p>
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-2">
              <span>Meta Tags: OpenGraph Managed by JSON</span>
              <span>·</span>
              <span className="text-amber-500 dark:text-amber-400">Robots: noindex, nofollow</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <Link
              to="/brochures"
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
            >
              <div className="flex items-center gap-2.5">
                <Eye size={16} />
                <span>View Official Brochure</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-950 text-teal-300 px-2 py-0.5 rounded">
                PDF
              </span>
            </Link>

            <Link
              to="/card/ceo"
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-slate-700"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard size={16} className="text-teal-400" />
                <span>Open Digital Visiting Card</span>
              </div>
              <span className="font-mono text-[10px] text-amber-400">
                VCARD
              </span>
            </Link>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>SpatioCore Document Registry 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-xs uppercase transition-colors"
          >
            Close Screen
          </button>
        </div>
      </div>
    </div>
  );
}
