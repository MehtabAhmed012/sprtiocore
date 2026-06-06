import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Compass, 
  ShieldAlert, 
  Wrench, 
  DatabaseBackup, 
  Home, 
  ArrowLeft,
  AlertTriangle,
  Globe,
  Radio,
  Cpu
} from 'lucide-react';

interface ErrorPageProps {
  code: string;
  badge: string;
  title: string;
  description: string;
  details: string;
  statusText: string;
  icon: React.ReactNode;
  themeColor: string; // 'primary' | 'accent' | 'rose'
}

function ErrorLayout({ 
  code, 
  badge, 
  title, 
  description, 
  details, 
  statusText, 
  icon,
  themeColor 
}: ErrorPageProps) {
  
  const getThemeColorClass = () => {
    switch (themeColor) {
      case 'accent':
        return 'text-accent border-accent/20 bg-accent/5 shadow-[0_0_15px_rgba(244,166,35,0.3)] bg-gradient-to-r from-accent/20 to-transparent';
      case 'rose':
        return 'text-rose-500 border-rose-500/20 bg-rose-500/5 shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-gradient-to-r from-rose-500/20 to-transparent';
      default:
        return 'text-primary border-primary/20 bg-primary/5 shadow-[0_0_15px_rgba(0,201,167,0.3)] bg-gradient-to-r from-primary/20 to-transparent';
    }
  };

  const getThemeTextClass = () => {
    switch (themeColor) {
      case 'accent': return 'text-accent';
      case 'rose': return 'text-rose-500';
      default: return 'text-primary';
    }
  };

  const getThemeBorderClass = () => {
    switch (themeColor) {
      case 'accent': return 'border-accent/30 hover:border-accent';
      case 'rose': return 'border-rose-500/30 hover:border-rose-500';
      default: return 'border-primary/30 hover:border-primary';
    }
  };

  const getThemeBgGlowClass = () => {
    switch (themeColor) {
      case 'accent': return 'bg-accent/5';
      case 'rose': return 'bg-rose-500/5';
      default: return 'bg-primary/5';
    }
  };

  const getRadarPulseClass = () => {
    switch (themeColor) {
      case 'accent': return 'bg-accent';
      case 'rose': return 'bg-rose-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="bg-bg-base relative overflow-hidden min-h-screen pt-36 pb-20 flex items-center justify-center">
      <Helmet>
        <title>{code} {title} | SpatioCore Tech</title>
        <meta name="description" content={`${code} ${title} - Error Page`} />
      </Helmet>

      {/* Cyberpunk Map Coordinates overlay backplate */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-between px-6 font-mono text-[9px] text-text-muted/40">
          <div className="flex flex-col justify-between h-4/5">
            <div>LAT: 35°41'22.4" N</div>
            <div>LON: 139°41'30.1" E</div>
            <div>ALT: +432.18m</div>
            <div>EPE: 2.1m</div>
          </div>
          <div className="flex flex-col justify-between h-4/5 text-right">
            <div>SYSTEM_EPOCH: 2026.05</div>
            <div>SIG_STRGT: ERR_DISCONN</div>
            <div>LOCK_STATUS: {statusText}</div>
            <div>GRID_ZONE: 54S</div>
          </div>
        </div>
      </div>

      {/* Background topography texture */}
      <div className="absolute inset-0 topo-bg opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Error Box Card layout */}
      <div className="w-full max-w-xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative bg-[#111827]/85 backdrop-blur-md border border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl overflow-hidden"
        >
          {/* Neon Border Ribbon */}
          <div className={`absolute top-0 left-0 w-full h-1 ${getThemeColorClass()}`} />

          {/* Visual tech grid decoration context */}
          <div className="absolute top-4 right-4 font-mono text-[8px] text-text-muted/30 select-none">
            SPATIO_ERR_SRV_v1.0.8
          </div>

          <div className="space-y-8">
            {/* Top Badge Indicators Row */}
            <div className="flex items-center justify-between border-b border-white/5 pb-5">
              <span className="badge-mono text-[9px] tracking-[4px]">
                {badge}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
                <span className={`inline-block w-1.5 h-1.5 rounded-full animate-ping ${getRadarPulseClass()}`} />
                <span>STATE: {statusText}</span>
              </div>
            </div>

            {/* Error Code & Graphic Area */}
            <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
              {/* Radar Circle Scanning Indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center relative overflow-hidden bg-white/[0.02]">
                  {/* Outer scan line sweep */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute inset-0 border-l border-primary/20 pointer-events-none rounded-full"
                  />
                  {/* Floating dots matrix */}
                  <div className="absolute inset-1.5 rounded-full border border-white/5 border-dashed" />
                  <div className={`${getThemeTextClass()}`}>
                    {icon}
                  </div>
                </div>
              </div>

              {/* Error Code display */}
              <div className="text-center sm:text-left">
                <h2 className="font-display text-6xl font-black text-text-base tracking-tighter select-none">
                  {code}
                </h2>
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mt-1">
                  System Exception Code
                </span>
              </div>
            </div>

            {/* Central Messaging Content */}
            <div className="space-y-4">
              <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-text-base">
                {title}
              </h1>
              <p className="text-text-muted text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Code Detail/Tech Console Line block */}
            <div className="bg-black/40 border border-white/5 rounded p-4 font-mono text-xs text-text-muted/90 space-y-2 select-all selection:bg-white/10">
              <div className="flex justify-between border-b border-white/5 pb-1 text-[10px] text-text-muted/50 uppercase">
                <span>Console Log (Telemetry Diagnostics)</span>
                <span>Active Link</span>
              </div>
              <p className="text-[11px] leading-relaxed break-all">
                <span className={`${getThemeTextClass()} mr-1.5`}>&gt;&gt;</span>
                {details}
              </p>
            </div>

            {/* Navigational CTA actions row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end border-t border-white/5">
              <Link
                to="/"
                className="btn-sophisticated border border-white/10 bg-transparent text-text-base flex items-center justify-center gap-2 hover:border-white/20 hover:bg-white/[0.02] text-xs py-3.5 px-6"
              >
                <Home size={14} className="text-text-muted" />
                Return to Node Index
              </Link>
              <button
                onClick={() => window.history.back()}
                className={`btn-sophisticated border ${getThemeBorderClass()} ${getThemeBgGlowClass()} ${getThemeTextClass()} flex items-center justify-center gap-2 text-xs py-3.5 px-6 font-bold`}
              >
                <ArrowLeft size={14} />
                Access Previous Vector
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// 404 Page Component
export function NotFound() {
  return (
    <ErrorLayout
      code="404"
      badge="[ POSITION_VECTOR_LOST ]"
      title="COORDINATE REGISTRY MISMATCH"
      description="The navigation vector coordinates you requested do not point to an active server sector. The spatial files may have finished their atmospheric lifespan or migrated to a separate layout node."
      details={`sys_router_locate_node("${window.location.pathname}"): ERROR: NO_GRID_VECTOR_MATCH. Coordinate alignment lookup returned vacant output.`}
      statusText="VACANT"
      themeColor="primary"
      icon={<Compass className="w-9 h-9" />}
    />
  );
}

// 403 Page Component
export function Forbidden() {
  return (
    <ErrorLayout
      code="403"
      badge="[ SECURITY_ENVELOPE_LOCK ]"
      title="RESTRICTED AIRSPACE"
      description="You lack the spatial authorization certificates required to decode access streams in this coordinate sector. Connection logs are timestamped and logged in server telemetry."
      details={`sys_router_verify_envelope("${window.location.pathname}"): DENIED: INSUFFICIENT_SECURITY_CLEARANCE. Public vector keys rejected by directory authority.`}
      statusText="ENCRYPTED"
      themeColor="rose"
      icon={<ShieldAlert className="w-9 h-9" />}
    />
  );
}

// 501 Page Component
export function NotImplemented() {
  return (
    <ErrorLayout
      code="501"
      badge="[ MODULE_UNDER_CONSTRUCTION ]"
      title="UTILITY OFFLINE IN CURRENT EPOCH"
      description="This spatial sector or telemetry channel is currently scheduled for installation during a future developmental phase. Our GIS engineers are calibrating the underlying satellite transponders."
      details={`sys_router_load_module("${window.location.pathname}"): UNIMPLEMENTED: SIGNAL_CONSTRUCTION. Target pipeline has been declared but is awaiting satellite hardware orbit installation.`}
      statusText="OFFLINE"
      themeColor="accent"
      icon={<Wrench className="w-9 h-9" />}
    />
  );
}

// 500 Page Component
export function ServerError() {
  return (
    <ErrorLayout
      code="500"
      badge="[ PROCESSOR_TELEMTRY_HALT ]"
      title="ANOMALOUS COGNITION EXCEPTION"
      description="An engineering anomaly was triggered deep within our telemetry database systems. The satellite arrays are resetting automatically. Ground stations have been alerted."
      details={`sys_kernel_interrupt("${window.location.pathname}"): EXCEPTION: CORRUPT_GRID_STREAM. Server pipeline experienced a telemetry failure during packet compiling.`}
      statusText="DEGRADED"
      themeColor="rose"
      icon={<DatabaseBackup className="w-9 h-9" />}
    />
  );
}

// Optional export of a Catch-All Component (useful if custom codes are requested downstream)
export default ErrorLayout;
