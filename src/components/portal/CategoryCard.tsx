/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, QrCode } from 'lucide-react';

interface CategoryCardProps {
  icon: ReactNode;
  categoryLabel?: string;
  code?: string;
  title: string;
  description: string;
  preview: ReactNode;
  buttonText: string;
  buttonUrl: string;
  countLabel?: string;
  onScanBadgeClick?: () => void;
  directAction?: {
    text: string;
    url: string;
  };
}

export default function CategoryCard({
  icon,
  categoryLabel,
  code,
  title,
  description,
  preview,
  buttonText,
  buttonUrl,
  countLabel,
  onScanBadgeClick,
  directAction
}: CategoryCardProps) {
  return (
    <div className="group flex flex-col justify-between bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-teal-500/40 dark:hover:border-teal-500/40 transition-all duration-300 p-5 sm:p-6 text-slate-800 dark:text-slate-100 relative overflow-hidden">
      {/* Subtle top indicator hover line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-blue-500 transition-all duration-300" />

      {/* Top Header Section: [Icon] + Category Label + Code */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-105 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-sm">
            {icon}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {code && (
              <span className="font-mono text-[9px] font-bold text-teal-600 dark:text-teal-300 bg-teal-500/15 border border-teal-500/30 px-2 py-0.5 rounded">
                {code}
              </span>
            )}
            {countLabel && (
              <span className="font-mono text-[10px] tracking-wider uppercase text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                {countLabel}
              </span>
            )}
          </div>
        </div>

        {/* CATEGORY TITLE */}
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {title}
        </h2>

        {/* Short description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed min-h-[2.75rem]">
          {description}
        </p>
      </div>

      {/* [Document / Image Preview] */}
      <div className="my-5 w-full bg-slate-50/80 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800/60 flex items-center justify-center min-h-[170px] overflow-hidden">
        {preview}
      </div>

      {/* [CTA BUTTONS] */}
      <div className="pt-1 space-y-2">
        {onScanBadgeClick && (
          <button
            type="button"
            onClick={onScanBadgeClick}
            className="w-full inline-flex items-center justify-center gap-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-[0.99]"
            title="Download Barcode & QR Code Scan Badge"
          >
            <QrCode size={15} />
            <span>Barcode & QR Scan Badge</span>
          </button>
        )}

        {directAction && (
          <Link
            to={directAction.url}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 px-4 py-3 rounded-xl font-bold font-display text-xs uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-[0.99]"
          >
            <span>{directAction.text}</span>
            <ArrowRight size={14} />
          </Link>
        )}
        <Link
          to={buttonUrl}
          className={`w-full inline-flex items-center justify-center gap-2 ${
            directAction
              ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
              : 'bg-slate-900 hover:bg-teal-600 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950'
          } px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-teal-500/40`}
        >
          <span>{buttonText}</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
