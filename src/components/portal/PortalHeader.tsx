/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { ORGANIZATION_CONFIG } from '../../data/portalData';

interface PortalHeaderProps {
  compact?: boolean;
  showBackLink?: boolean;
  backTo?: string;
  backLabel?: string;
}

export default function PortalHeader({
  compact = false,
  showBackLink = false,
  backTo = "/portal",
  backLabel = "Back to Identity Portal"
}: PortalHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white/90 dark:bg-[#0c1322]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-40 transition-colors">
      {/* Top micro verification bar */}
      <div className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200/50 dark:border-slate-800/50 py-1.5 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-medium">
            <ShieldCheck size={13} className="shrink-0" />
            <span>Official Resources</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Encrypted Document Repository</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-slate-400">Verified Organization</span>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <Link to="/portal" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center p-1.5 shadow-sm group-hover:border-teal-500 transition-colors">
            <img 
              src={ORGANIZATION_CONFIG.logoUrl} 
              alt={ORGANIZATION_CONFIG.name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback icon if logo image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="font-display text-sm sm:text-base font-black tracking-[1.5px] uppercase text-slate-900 dark:text-white leading-none">
              SPATIO<span className="text-teal-500">CORE</span>
            </div>
            <div className="font-mono text-[9px] text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
              {ORGANIZATION_CONFIG.portalTitle}
            </div>
          </div>
        </Link>

        {showBackLink ? (
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 transition-all hover:bg-teal-500/15"
          >
            <span>←</span> {backLabel}
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
            >
              Main Website →
            </Link>
          </div>
        )}
      </div>

      {/* Hero Header Area (Compact on mobile) */}
      {!compact && (
        <div className="border-t border-slate-100 dark:border-slate-800/60 bg-gradient-to-b from-slate-50/50 to-white dark:from-[#0c1322] dark:to-[#090e1a] py-6 sm:py-8 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-[11px] font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span>Public Identity Portal</span>
            </div>

            <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              Official Corporate Identity Directory
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              {ORGANIZATION_CONFIG.portalDescription}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
