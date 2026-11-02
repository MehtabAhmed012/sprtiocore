/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Facebook, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { ORGANIZATION_CONFIG } from '../../data/portalData';

export default function PortalFooter() {
  return (
    <footer className="w-full bg-white dark:bg-[#070b14] border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Col 1: Organization & Identity */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-teal-500/10 border border-teal-500/30 flex items-center justify-center p-1">
                <img src={ORGANIZATION_CONFIG.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-sm tracking-wider uppercase text-slate-900 dark:text-white">
                {ORGANIZATION_CONFIG.name}
              </span>
            </div>
            
            <p className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-medium">
              Official Public Identity Portal
            </p>
            
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Standardized digital gateway for verified credentials, corporate brochures, and official representative cards.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a 
                href={ORGANIZATION_CONFIG.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a 
                href={ORGANIZATION_CONFIG.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
                title="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a 
                href={ORGANIZATION_CONFIG.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle size={14} />
              </a>
              <a 
                href={`mailto:${ORGANIZATION_CONFIG.email}`}
                className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
                title="Email Support"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Core Links required by brief: Website, About, Contact */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-semibold">
              Navigation Links
            </div>
            <ul className="space-y-1.5 text-[12px]">
              <li>
                <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <span>Main Corporate Website</span>
                  <ExternalLink size={11} className="opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  About Organization
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/business-cards" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Digital Business Cards Directory
                </Link>
              </li>
              <li>
                <Link to="/brochures" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Brochures & Publications
                </Link>
              </li>
              <li>
                <Link to="/profiles" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Institutional Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Verified Contact */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-semibold">
              Official Contact Desk
            </div>
            <div className="space-y-2 text-[12px]">
              <a 
                href={`mailto:${ORGANIZATION_CONFIG.email}`}
                className="flex items-start gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
              >
                <Mail size={14} className="text-teal-500 shrink-0 mt-0.5" />
                <span className="break-all">{ORGANIZATION_CONFIG.email}</span>
              </a>

              <a 
                href={`tel:${ORGANIZATION_CONFIG.phone}`}
                className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <Phone size={14} className="text-teal-500 shrink-0" />
                <span>{ORGANIZATION_CONFIG.phoneDisplay}</span>
              </a>

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <MapPin size={14} className="text-teal-500 shrink-0" />
                <span>{ORGANIZATION_CONFIG.address}</span>
              </div>

              <div className="pt-1 flex items-center gap-1.5 text-[10px] text-teal-600 dark:text-teal-400 font-mono">
                <ShieldCheck size={12} />
                <span>TLS 256-bit Encrypted Official Record</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
          <div>{ORGANIZATION_CONFIG.copyright}</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link to="/" className="hover:underline">Corporate Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
