import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  Satellite, 
  ArrowRight, 
  Mail, 
  Sparkles,
  Send,
  Users
} from 'lucide-react';

// Import jobs database
import jobsData from '../data/jobs.json';

export default function Careers() {
  const emailAddress = "recruiter.spatiocoretech@outlook.com";
  const defaultSubject = "General Application - SpatioCore Tech Talent Pool";
  const defaultBody = "Dear SpatioCore Tech HR,\n\nI am writing to submit my details for future openings in Earth Observation and Spatial Engineering.\n\nPlease find attached my CV.";
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(defaultBody)}`;

  return (
    <div className="bg-bg-base relative overflow-hidden min-h-screen pt-24 pb-12">
      <Helmet>
        <title>Careers & Openings | SpatioCore Tech</title>
        <meta name="description" content="Join the SpatioCore Tech team. Map global landscapes, build advanced earth observation platforms, and discover structured internships and engineering jobs." />
      </Helmet>

      {/* Background patterns */}
      <div className="absolute inset-0 topo-bg opacity-10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-16 pb-12 border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-2 rounded-full font-mono text-xs text-primary font-semibold tracking-wider uppercase"
          >
            <Satellite className="w-3.5 h-3.5 animate-pulse text-primary" />
            SpatioCore Global Careers Portal
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-text-base"
          >
            JOIN THE <span className="text-primary drop-shadow-[0_0_15px_rgba(0,201,167,0.3)]">FRONTIER</span> OF SPATIAL TECH
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted leading-relaxed text-base max-w-2xl mx-auto"
          >
            SpatioCore Tech is expanding its operations network. Explore our open positions, structured programs, and professional pathways to map global surfaces in real-time.
          </motion.p>
        </div>
      </section>

      {/* Jobs Listing Section */}
      <section className="py-20" id="jobs-listing">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-6">
            <div>
              <span className="badge-mono mb-2 inline-block">[ POSITION METRICS ]</span>
              <h2 className="font-display text-2xl font-black text-text-base">Available Vacancies</h2>
            </div>
            <div className="text-xs font-mono text-primary/80 bg-primary/5 border border-primary/10 px-4 py-2 rounded-lg">
              📡 ACTIVE BROADCAST NODE: Munich/Remote
            </div>
          </div>

          {/* Job Cards Matrix Grid */}
          <div className="space-y-6">
            {jobsData.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-bg-card border border-white/5 hover:border-primary/30 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl overflow-hidden"
                id={`job-card-${job.id}`}
              >
                {/* Visual contour backdrop highlights */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full filter blur-xl group-hover:bg-primary/5 transition-all duration-300 pointer-events-none" />
                <div className="absolute top-0 left-0 w-1 bg-primary/45 h-full group-hover:bg-primary transition-colors" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 uppercase">
                        {job.category}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest bg-white/5 text-text-muted px-2 py-0.5 rounded border border-white/10 uppercase">
                        {job.capacity}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-text-base group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
                      {job.shortDescription}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-2">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-accent" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-accent" /> {job.compensation}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-accent" /> Deadline: {job.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="shrink-0 flex sm:items-center md:flex-col gap-3">
                    <Link
                      to={`/careers/${job.id}`}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0a0f1e] px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all"
                      id={`job-view-btn-${job.id}`}
                    >
                      View Details & Apply <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core values block */}
      <section className="py-16 bg-black/10 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="badge-mono">[ WORKSPACES ]</span>
            <h2 className="font-display text-2xl font-black text-text-base">Why map with SpatioCore?</h2>
            <p className="text-xs text-text-muted">A structured operational ecosystem designed to optimize professional growth.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl glass-card space-y-3 text-left border border-white/5">
              <div className="text-primary w-10 h-10 bg-primary/5 rounded border border-primary/20 flex items-center justify-center font-mono font-bold">[ 01 ]</div>
              <h4 className="font-display font-semibold text-md text-text-base">Vibrant Mentorship</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Connect and sync with senior spatial observation experts to analyze topography, multispectral, and radar sensor telemetry pipelines.
              </p>
            </div>
            <div className="p-6 rounded-xl glass-card space-y-3 text-left border border-white/5">
              <div className="text-accent w-10 h-10 bg-accent/5 rounded border border-accent/20 flex items-center justify-center font-mono font-bold">[ 02 ]</div>
              <h4 className="font-display font-bold text-md text-text-base">Cutting-Edge API Stack</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Integrate industry-standard packages, program remote sensing scripts, and gain practical exposure to QGIS, GDAL, and cloud databases.
              </p>
            </div>
            <div className="p-6 rounded-xl glass-card space-y-3 text-left border border-white/5 col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="text-secondary w-10 h-10 bg-secondary/5 rounded border border-secondary/20 flex items-center justify-center font-mono font-bold">[ 03 ]</div>
              <h4 className="font-display font-bold text-md text-text-base">Verified Academic Credentials</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Receive certified competency credits, reference hashes, and detailed projects sheets validating your professional milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SpatioCore Talent Pool / General Drop */}
      <section className="py-24 relative" id="general-talent-pool">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <span className="badge-mono">[ SPECIFICATION PITCH ]</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-text-base">Don&apos;t fit the current vacancies?</h2>
          <p className="text-text-muted text-base max-w-xl mx-auto leading-relaxed">
            We are always seeking passionate environmental scientists, computing engineers, and spatial analysts to join our reserves. Drop your CV directly in our general applications loop!
          </p>

          <div className="bg-bg-card border border-primary/20 p-6 rounded-xl max-w-lg mx-auto space-y-4 shadow-xl">
            <Mail className="text-primary w-10 h-10 mx-auto" />
            <h4 className="font-display font-bold text-lg text-text-base">General Talent Reservoir Drop</h4>
            <a 
              href={mailtoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-xl text-primary font-semibold hover:text-accent select-all break-all tracking-wide transition-colors"
              id="general-recruiter-mail-link"
            >
              recruiter.spatiocoretech@outlook.com
            </a>
            <p className="text-[10px] text-text-muted uppercase">Clicking the link opens your default email workspace</p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a 
              href={mailtoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0a0f1e] px-8 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(0,201,167,0.3)] cursor-pointer"
              id="general-apply-btn"
            >
              Apply via Email <Send size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
