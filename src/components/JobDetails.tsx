import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  Mail, 
  Layers, 
  Compass, 
  ChevronDown, 
  HelpCircle, 
  CheckCircle, 
  Users, 
  Send, 
  Briefcase, 
  Globe, 
  Satellite, 
  ArrowRight,
  Sparkles,
  Check,
  Map,
  FileText,
  ArrowLeft
} from 'lucide-react';

// Import jobs data directly
import jobsData from '../data/jobs.json';

// Helper function to render correct Lucide icon based on JSON string
const IconRenderer = ({ iconName, className }: { iconName: string, className?: string }) => {
  switch (iconName) {
    case 'Layers': return <Layers className={className} />;
    case 'Satellite': return <Satellite className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Map': return <Map className={className} />;
    case 'CheckCircle': return <CheckCircle className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Award': return <Award className={className} />;
    default: return <Briefcase className={className} />;
  }
};

export default function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showFloatingApply, setShowFloatingApply] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Custom states for the interactive Pitch Generator
  const [applicantName, setApplicantName] = useState('');
  const [majorCategory, setMajorCategory] = useState('Geospatial / GIS Science');
  const [motivation, setMotivation] = useState('I am highly interested in Remote Sensing of land change, terrain modeling, and spatial intelligence.');

  // Find the current job spec
  const job = jobsData.find(j => j.id === jobId);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo({ top: 0 });

    const handleScroll = () => {
      setShowFloatingApply(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jobId]);

  if (!job) {
    return (
      <div className="bg-bg-base min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <Helmet>
          <title>Job Not Found | SpatioCore Tech</title>
        </Helmet>
        <div className="topo-bg absolute inset-0 opacity-10 pointer-events-none" />
        <div className="max-w-md space-y-6 relative z-10">
          <div className="w-16 h-16 bg-[#e14f4f]/10 border border-[#e14f4f]/20 rounded-full flex items-center justify-center mx-auto text-[#e14f4f]">
            <HelpCircle size={32} />
          </div>
          <h2 className="font-display text-3xl font-black text-text-base">Job Opening Not Found</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            The target telemetry ID configuration coordinates could not be resolved. This career opening may have expired or been relocated.
          </p>
          <Link 
            to="/careers" 
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0a0f1e] px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all"
            id="back-to-careers-btn"
          >
            <ArrowLeft size={16} /> Return to Careers Portal
          </Link>
        </div>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const emailAddress = "recruiter.spatiocoretech@outlook.com";
  
  // Generate mailto link with customized body template
  const generatedSubject = `Application: ${job.title} - ${applicantName || 'Candidate'}`;
  const generatedBody = `Dear SpatioCore Tech HR / Recruitment Team,
Customized Pitch parameters generated via Interactive Wizard.

Position telemetry Details:
- Target Role: ${job.title}
- Candidate Name: ${applicantName || '[Your Full Name]'}
- Discipline/Focus: ${majorCategory}
- Motivation Highlights: ${motivation}

I have attached my academic transcripts, credentials, and detailed CV to this email for your review. I look forward to contributing to SpatioCore Tech's structural objective coordinates.

Sincerely,
${applicantName || '[Your Full Name]'}
[Your Phone/Contact Information]`;

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(generatedSubject)}&body=${encodeURIComponent(generatedBody)}`;

  // Determine accent classes to coordinate visually
  const isAltRole = job.id !== 'geospatial-analyst-intern';

  return (
    <div className="bg-bg-base relative overflow-hidden min-h-screen pt-24 pb-12">
      <Helmet>
        <title>{job.title} | Careers | SpatioCore Tech</title>
        <meta name="description" content={`${job.title} application specifications at SpatioCore Tech. Deadline: ${job.deadline}. Apply now!`} />
      </Helmet>

      {/* Geospatial Pattern Grid Overlays */}
      <div className="absolute inset-0 topo-bg opacity-10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Breadcrumb / Back button */}
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <Link 
          to="/careers"
          className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-accent transition-colors"
          id="careers-back-breadcrumb"
        >
          <ArrowLeft size={14} /> [ RETURN TO CAREERS LISTING ]
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 border ${isAltRole ? 'border-accent/20 bg-accent/5 text-accent' : 'border-primary/20 bg-primary/5 text-primary'} px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider uppercase`}
          >
            <Satellite className={`w-3.5 h-3.5 animate-pulse ${isAltRole ? 'text-accent' : 'text-primary'}`} />
            {job.program}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-text-base text-center"
          >
            {job.title.toUpperCase()}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display font-medium text-lg text-text-base/80"
          >
            {job.location} | {job.compensation}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-3 bg-white/5 dark:bg-white/5 p-4 rounded-xl border border-white/10 max-w-lg mx-auto"
          >
            <Calendar className="text-accent shrink-0" size={24} />
            <div className="text-left">
              <p className="font-mono text-xs text-text-muted">PROGRAM WORKSPACE</p>
              <p className="text-sm font-semibold text-text-base">{job.programWorkspace}</p>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted leading-relaxed text-base max-w-2xl mx-auto"
          >
            {job.longDescription}
          </motion.p>

          {/* Quick specs list */}
          <div className="border border-white/5 bg-black/40 p-5 rounded-lg font-mono text-xs text-primary/80 space-y-2 relative max-w-xl w-full text-left">
            <div className={`absolute top-2 right-2 flex items-center gap-1.5 text-[9px] ${isAltRole ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-primary/10 border-primary/20 text-primary'} px-2 py-0.5 rounded animate-pulse border`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAltRole ? 'bg-accent' : 'bg-primary'}`} /> COHORT ACTIVE
            </div>
            <p className="text-white font-bold text-xs border-b border-white/10 pb-1.5 mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-accent" /> Telemetry Specifications
            </p>
            <p><span className="text-text-muted font-bold">ROLE:</span> {job.title}</p>
            <p><span className="text-text-muted font-bold">MISSION:</span> {job.mission}</p>
            <p><span className="text-text-muted font-bold">REQUIRED TOOLS:</span> {job.tools}</p>
            <p><span className="text-text-muted font-bold">PLATFORMS:</span> {job.platform}</p>
            <p><span className="text-text-muted font-bold">ENTRY DEADLINE:</span> {job.deadline}</p>
          </div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4 justify-center"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0a0f1e] px-8 py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(0,201,167,0.3)] cursor-pointer animate-shimmer"
              id="job-apply-now-btn"
            >
              Apply Now <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-black/20 py-8 border-b border-white/5" id="job-stats-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {job.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-4"
            >
              <h4 className="font-display text-2xl sm:text-3xl font-black text-primary">{stat.value}</h4>
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Job parameters detailed blocks */}
      <section className="py-20 relative" id="job-matrix-parameters">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-mono mb-4 inline-block">[ DETAILS CONTAINER ]</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-text-base">
              Job Spec & Constraints
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Comprehensive telemetry criteria bounding the current vacant workspace coordinates.
            </p>
          </div>

          {/* Matrix Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl glass-card border-l-2 border-l-primary space-y-3">
              <div className="text-primary"><Briefcase size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Workplace Node</h4>
              <p className="font-mono text-xs text-accent">{job.location}</p>
              <p className="text-xs text-text-muted">
                Structured dynamic setting. Work with direct access loops based on secure project credentials.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-accent space-y-3">
              <div className="text-accent"><Clock size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Compensation Structure</h4>
              <p className="font-mono text-xs text-accent">{job.compensation} Opening</p>
              <p className="text-xs text-text-muted">
                Formulated precisely for academic recognition, professional progression tracks, and technical portfolio build validation.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-secondary space-y-3">
              <div className="text-secondary"><Calendar size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Span Class Duration</h4>
              <p className="font-mono text-xs text-accent">{job.duration}</p>
              <p className="text-xs text-text-muted">
                Program commences directly, implementing standard professional onboarding documentation cycles.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-emerald-400 space-y-3">
              <div className="text-emerald-400"><Calendar size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Cohort Start Epoch</h4>
              <p className="font-mono text-xs text-accent">Active</p>
              <p className="text-xs text-text-muted">
                Immediate software deployment configurations and database keys are assigned dynamically following CV confirmation rules.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-[#e14f4f] space-y-3">
              <div className="text-[#e14f4f]"><Clock size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Application Deadline Link</h4>
              <p className="font-mono text-xs text-[#e14f4f]">{job.deadline}</p>
              <p className="text-xs text-text-muted">
                Telemetry window close date. Applications received past this coordinate date cannot be verified or reviewed.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-primary space-y-3">
              <div className="text-primary"><Users size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Allowed Placements</h4>
              <p className="font-mono text-xs text-accent">{job.capacity}</p>
              <p className="text-xs text-text-muted">
                Strict target constraints are enforced during evaluating procedures.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Mastered / Core Areas */}
      <section className="py-24 bg-black/10 border-t border-b border-white/5 relative" id="job-learned-skills">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-mono mb-4 inline-block">[ TECHNICAL SYLLABUS ]</span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-text-base mb-4">
              Core Skills & Targets
            </h2>
            <p className="text-md text-text-muted">
              Deep-dive specs and critical modules aligned with this role&apos;s primary objective boundaries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {job.learnedSkills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-bg-card p-6 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-white/5 w-fit mb-4 text-primary">
                    <IconRenderer iconName={skill.icon} />
                  </div>
                  <h4 className="font-display font-bold text-lg text-text-base mb-2">{skill.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">{skill.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-primary/80 font-mono">
                  <Check size={12} className="text-primary" /> OBJECTIVE FOCUS
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative" id="job-outcomes">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="badge-mono inline-block">[ OUTCOMES CONTAINER ]</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-text-base">
                Professional Credentials & Allowances
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">
                Translate your effort into verifiable professional progression parameters. We make sure our staff and program participants receive the structural support keys needed to build stable careers.
              </p>

              <div className="relative border border-primary/20 bg-primary/5 p-6 rounded-xl flex items-start gap-4 max-w-md">
                <Award className="text-primary shrink-0 w-12 h-12" />
                <div>
                  <h4 className="font-display text-md font-bold text-primary">Certified Spatial Competency</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Successful candidates will be awarded certified, trackable documentation verifying direct contributions, tool proficiencies, and metrics performance index codes.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit List */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {job.benefits.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-xl glass-card border border-white/5 hover:border-accent/20 hover:bg-white/5 transition-all space-y-3"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="font-display font-bold text-md text-text-base">{benefit.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic FAQs Accordion */}
      <section className="py-20 bg-black/15 border-t border-b border-white/5 relative" id="job-faqs-section">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="badge-mono mb-3 inline-block">[ INQUIRY RESOLUTION ]</span>
            <h2 className="font-display text-3xl font-black text-text-base">Frequently Asked Questions</h2>
            <p className="text-xs text-text-muted mt-2">Get swift explanations regarding role parameters, equipment, and prerequisites.</p>
          </div>

          <div className="space-y-4">
            {job.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-white/5 rounded-lg overflow-hidden bg-bg-card transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-white/5 transition-colors font-display font-semibold text-sm sm:text-base text-text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-primary transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-white/5 bg-black/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Floating Apply widget */}
      <AnimatePresence>
        {showFloatingApply && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-8 z-40 hidden md:block"
          >
            <div className="bg-bg-card border border-primary/30 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-4">
              <div className="shrink-0">
                <p className="font-mono text-[9px] text-text-muted uppercase tracking-wider">ACTIVE VACANCY</p>
                <p className="text-xs font-bold text-text-base">{job.title}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-[#0a0f1e] px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Subject Wizard Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-bg-card border border-primary/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-primary flex items-center gap-2">
                    <Sparkles className="text-accent animate-pulse" /> Application Pitch Wizard
                  </h3>
                  <p className="text-xs text-text-muted mt-1">Configure your email parameters to structure a highly professional pitch sequence instantly.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 px-3 bg-white/5 border border-white/10 text-white rounded hover:bg-primary hover:text-[#0a0f1e] transition-colors font-mono text-sm uppercase"
                >
                  X Close
                </button>
              </div>

              {/* Form entries */}
              <div className="space-y-4 font-sans text-sm">
                
                <div>
                  <label className="block mb-1.5 font-bold text-xs text-text-base uppercase tracking-wider font-mono">1. Full Name</label>
                  <input 
                    type="text" 
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Amanda Sterling"
                    className="w-full bg-black/45 border border-white/10 rounded-lg p-3 text-text-base focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-xs text-text-base uppercase tracking-wider font-mono">2. Core Discipline / Focus</label>
                  <select 
                    value={majorCategory}
                    onChange={(e) => setMajorCategory(e.target.value)}
                    className="w-full bg-black/45 border border-white/10 rounded-lg p-3 text-text-base focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="Environmental Science / Impact Studies">Environmental Science & Analysis</option>
                    <option value="Geology / Digital Elevation Mapping">Geology & Hazard Mapping</option>
                    <option value="Geography / Spatial Informatics">Geography & Cartography Informatics</option>
                    <option value="Sensing Systems & Satellite Analysis">Satellite Remote Sensing & SAR Imaging</option>
                    <option value="Spatial Science / Geocomputation">Spatial Computations & Software</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-xs text-text-base uppercase tracking-wider font-mono">3. Describe Motivation Brief (Max 1 sentence)</label>
                  <textarea 
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    rows={2}
                    placeholder="Describe your research focus or software proficiency interest area..."
                    className="w-full bg-black/45 border border-white/10 rounded-lg p-3 text-text-base focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Live Preview of generated Email template */}
              <div className="bg-black/45 border border-white/5 rounded-xl p-4 space-y-3 font-mono text-xs">
                <p className="text-accent font-bold pb-2 border-b border-white/5 flex items-center gap-1.5 justify-between">
                  <span>🚀 Generated Subject subject line:</span>
                  <span className="text-[10px] bg-[#1a73e8]/15 text-[#1a73e8] border border-[#1a73e8]/30 px-2 py-0.5 rounded uppercase">Preview Subject</span>
                </p>
                <p className="text-text-base font-semibold break-all">{generatedSubject}</p>
                
                <p className="text-accent font-bold pt-2 pb-2 border-b border-white/5">📋 Preconfigured Email Body Template:</p>
                <pre className="text-text-muted/80 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto bg-black/20 p-2 rounded border border-white/5">
                  {generatedBody}
                </pre>
              </div>

              {/* CTAs inside modal */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={mailtoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-[#0a0f1e] px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all text-center shadow-[0_4px_15px_rgba(0,201,167,0.3)]"
                >
                  Confirm and Open Mail client <Send size={14} />
                </a>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedBody);
                    alert("Email body template successfully copied to clipboard!");
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all text-text-base"
                >
                  <FileText size={14} /> Copy Copy-Template lines
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
