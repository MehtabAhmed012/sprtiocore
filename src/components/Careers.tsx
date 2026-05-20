import React, { useState, useEffect } from 'react';
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
  FileText
} from 'lucide-react';

export default function Careers() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showFloatingApply, setShowFloatingApply] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Custom states for the interactive Pitch Generator
  const [applicantName, setApplicantName] = useState('');
  const [majorCategory, setMajorCategory] = useState('Geospatial / GIS Science');
  const [motivation, setMotivation] = useState('I am highly interested in Remote Sensing of land change, terrain modeling, and spatial intelligence.');

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingApply(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const emailAddress = "recruiter.spatiocoretech@outlook.com";
  
  // Generate mailto link with customized body template
  const generatedSubject = `Application: Geospatial Analyst Intern - ${applicantName || 'Candidate'}`;
  const generatedBody = `Dear SpatioCore Tech HR / Recruitment Team,

I am writing to express my strong interest in the 4-Week Remote Geospatial Analyst Internship (Summer 2026).

Candidate Details:
- Name: ${applicantName || '[Your Full Name]'}
- Discipline/Major: ${majorCategory}
- Core Interest: ${motivation}

I have attached my academic transcripts and detailed CV to this email for your review. I look forward to contributing to SpatioCore Tech's Earth observation objectives.

Sincerely,
${applicantName || '[Your Full Name]'}
[Your Phone Number / Contact Information]`;

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(generatedSubject)}&body=${encodeURIComponent(generatedBody)}`;

  const stats = [
    { value: "4 Weeks", label: "Program Duration", suffix: "" },
    { value: "100%", label: "Remote & Structured", suffix: "" },
    { value: "8+", label: "Advanced Core Skills", suffix: "" },
    { value: "Limited", label: "Cohort Placement Seats", suffix: "" },
  ];

  const learnedSkills = [
    {
      title: "GIS Mapping & Spatial Analysis",
      description: "Perform spatial queries, overlay analysis, raster computations, and vector data manipulations using modern industry-leading software suites.",
      icon: <Layers className="text-primary w-6 h-6" />
    },
    {
      title: "Remote Sensing & Image Processing",
      description: "Retrieve, preprocess, and process multispectral satellite imagery, executing radiometric corrections and vegetation indices mapping.",
      icon: <Satellite className="text-accent w-6 h-6" />
    },
    {
      title: "Land Use / Land Cover (LULC)",
      description: "Classify terrain surfaces using supervised and unsupervised classifiers to observe ecological change, urban sprawl, and resource footprints.",
      icon: <Globe className="text-[#1a73e8] w-6 h-6" />
    },
    {
      title: "Change Detection Techniques",
      description: "Compare temporal datasets to monitor deforestation patterns, coastline erosion, glacier movements, and post-disaster land shifts over time.",
      icon: <Compass className="text-secondary w-6 h-6" />
    },
    {
      title: "Terrain & Geological Analysis",
      description: "Process Digital Elevation Models (DEM) to generate custom slope distributions, aspect gradients, contour maps, and terrain profiles.",
      icon: <Map className="text-amber-500 w-6 h-6" />
    },
    {
      title: "Health & Safety Hazard Mapping",
      description: "Construct risk factor zones for vector-borne outbreaks, healthcare supply chains, flood mitigation zones, and environmental vulnerability routes.",
      icon: <CheckCircle className="text-emerald-400 w-6 h-6" />
    },
    {
      title: "Environmental Data Interpretation",
      description: "Examine watershed runoffs, canopy density parameters, and air/soil quality attributes to formulate environmental reports.",
      icon: <Sparkles className="text-teal-400 w-6 h-6" />
    },
    {
      title: "Geospatial Visualization & Reporting",
      description: "Translate telemetry databases and topological metrics into executive charts, modern data cartographies, and rich reports.",
      icon: <Award className="text-primary w-6 h-6" />
    }
  ];

  const benefits = [
    { title: "Academic Certification", desc: "Gain an official Certificate of Completion detailing your hours, projects, and specific software proficiency achievements." },
    { title: "Hands-on Practical Case Files", desc: "Acquire raw satellite datasets to build and report fully autonomous projects ready for your academic thesis or portfolio." },
    { title: "Active Industry Mentorship", desc: "Engage in scheduled code reviews, remote workflow touchpoints, and custom mapping reviews with spatial scientists." },
    { title: "Modern Spatial Tech Stack", desc: "Incorporate QGIS, remote sensing toolkits, Sentinel/Landsat libraries, and spatial databases into your workflow." }
  ];

  const faqs = [
    {
      q: "Who is eligible to apply for this program?",
      a: "This program is open to students currently pursuing or recently graduated with degrees in Environmental Science, Geology, Geography, GIS, Remote Sensing, Spatial Informatics, and related Earth Science disciplines."
    },
    {
      q: "Is there any cost or fee associated with joining?",
      a: "No. There are absolutely no registration fees, evaluation fees, or technology charges. It is an unpaid learning experience structured purely to foster practical GIS skills and build career portfolios."
    },
    {
      q: "What is the level of commitment expected during the 4 weeks?",
      a: "Since the internship is fully remote, we support synchronous and asynchronous learning. We recommend dedicating approximately 10 to 15 hours per week to complete the project files, tutorial guides, and submit evaluation reports."
    },
    {
      q: "Will I receive feedback on my projects?",
      a: "Yes! Your geospatial portfolio mapping deliverables will be evaluated by SpatioCore Tech's Senior Consultants. You will receive precise technical reviews and certificate feedback upon program completion."
    }
  ];

  return (
    <div className="bg-bg-base relative overflow-hidden min-h-screen pt-24 pb-12">
      <Helmet>
        <title>Summer Internship Program 2026 | SpatioCore Tech</title>
        <meta name="description" content="SpatioCore Tech is hiring a remote, unpaid Geospatial Analyst Intern for a structural 4-week program commencing June 15, 2026. Apply before June 5, 2026!" />
        <meta property="og:title" content="Summer Internship Program 2026 | SpatioCore Tech" />
        <meta property="og:description" content="Join our 4-week remote structured, unpaid Geospatial Analyst internship. Applications open for Environmental Science, GIS, and Terrain Analysis students." />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Geospatial Pattern Grid Overlays */}
      <div className="absolute inset-0 topo-bg opacity-10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-2 rounded-full font-mono text-xs text-primary font-semibold tracking-wider uppercase"
            >
              <Satellite className="w-3.5 h-3.5 animate-pulse text-primary" />
              SpatioCore Careers & Talent Portal
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-text-base"
            >
              WE&apos;RE <span className="text-primary drop-shadow-[0_0_15px_rgba(0,201,167,0.3)]">HIRING</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display font-medium text-lg text-text-base/80"
            >
              Summer Internship Program 2026
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-3 bg-white/5 dark:bg-white/5 p-4 rounded-xl border border-white/10 max-w-lg"
            >
              <Calendar className="text-accent shrink-0" size={24} />
              <div>
                <p className="font-mono text-xs text-text-muted">PROGRAM WORKSPACE</p>
                <p className="text-sm font-semibold text-text-base">June 15 – July 15, 2026 | 4 Weeks | Remote & Unpaid</p>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-text-muted leading-relaxed text-base max-w-xl"
            >
              Expand your academic foundations through specialized mapping assignments and direct analysis. We have designed a curriculum structured around real-world Earth Observation and spatial science deliverables.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a 
                href={mailtoLink}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0a0f1e] px-8 py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(0,201,167,0.3)]"
              >
                Apply Now <ArrowRight size={16} />
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-[#0a0f1e] px-8 py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(244,166,35,0.3)]"
              >
                Send CV <Mail size={16} />
              </button>
            </motion.div>
          </div>

          {/* Interactive Internship Highlight Card / Simulated Earth view */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 border-l-4 border-l-primary shadow-2xl space-y-6 relative overflow-hidden group"
            >
              {/* Highlight Background Pulse effect */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="badge-mono mb-2 inline-block">[ MAIN SPECIFICATION ]</span>
                  <h3 className="font-display text-2xl font-bold text-text-base">Geospatial Analyst Intern</h3>
                </div>
                <Briefcase className="text-primary w-8 h-8 shrink-0" />
              </div>

              <p className="text-sm text-text-muted leading-relaxed">
                Open for Environmental Science, Geology, Geography, GIS, Remote Sensing, and Spatial Science students who want to build real-world experience mapping global landscapes.
              </p>

              {/* Orbital graphics simulator representation */}
              <div className="border border-white/5 bg-black/40 p-4 rounded-lg font-mono text-xs text-primary/80 space-y-1 relative">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[9px] bg-primary/10 px-2 py-0.5 rounded text-primary animate-pulse border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> SYSTEM LIVE
                </div>
                <p className="text-white font-bold text-xs border-b border-white/10 pb-1.5 mb-2 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-accent" /> Telemetry Coordinates
                </p>
                <p><span className="text-text-muted">MISSION:</span> Earth Observation Internship</p>
                <p><span className="text-text-muted">LAT/LONG:</span> Virtual / Remote Office Node</p>
                <p><span className="text-text-muted">TOOLS:</span> QGIS / ArcGIS Pro / Google Earth Engine / GDAL</p>
                <p><span className="text-text-muted">PLATFORM:</span> Sentinel-2, Landsat-8/9, SAR Sensors</p>
              </div>

              {/* Status Indicator Metrics */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] text-text-muted font-mono uppercase">COHORT CAPACITY</p>
                  <p className="text-md font-bold text-accent">Limited Seats</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted font-mono uppercase">ENTRY DEADLINE</p>
                  <p className="text-md font-bold text-[#e14f4f] dark:text-[#f87171]">June 5, 2026</p>
                </div>
              </div>

              {/* Click to trigger dynamic modal */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white/5 hover:bg-primary/10 border border-white/10 text-primary font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-all flex items-center justify-center gap-2 group-hover:border-primary/40"
              >
                Launch Interactive Apply Wizard <Sparkles size={14} />
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats Board (Section 1 Stats counter element) */}
      <section className="bg-black/20 py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
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

      {/* Internship Overview Card Matrix */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-mono mb-4 inline-block">[ DETAILS CONTAINER ]</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-text-base">
              Internship Spec & Parameters
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Comprehensive structural factors defining the 2026 cohort placement workspace.
            </p>
          </div>

          {/* Matrix Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl glass-card border-l-2 border-l-primary space-y-3">
              <div className="text-primary"><Briefcase size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Workplace Class</h4>
              <p className="font-mono text-xs text-accent">Remote Desk Interface</p>
              <p className="text-xs text-text-muted">
                100% remote layout. Coordinate seamlessly with mentors from any academic location or timezone globally.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-accent space-y-3">
              <div className="text-accent"><Clock size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Compensation Structure</h4>
              <p className="font-mono text-xs text-accent">Unpaid Program</p>
              <p className="text-xs text-text-muted">
                Structured for academic credits, resume credential hardening, and verified professional experience validation profiles.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-secondary space-y-3">
              <div className="text-secondary"><Calendar size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Duration Interval</h4>
              <p className="font-mono text-xs text-accent">4 Complete Weeks</p>
              <p className="text-xs text-text-muted">
                Program launches promptly on June 15, 2026, with structured weekly mapping tasks leading to major research output submission.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-emerald-400 space-y-3">
              <div className="text-emerald-400"><Calendar size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Operations Begin</h4>
              <p className="font-mono text-xs text-accent">June 15, 2026</p>
              <p className="text-xs text-text-muted">
                Cohort synchronization kickoff starts with satellite imaging pipeline access provision keys and software configurations.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-[#e14f4f] space-y-3">
              <div className="text-[#e14f4f]"><Clock size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Application Deadline</h4>
              <p className="font-mono text-xs text-[#e14f4f]">June 5, 2026</p>
              <p className="text-xs text-text-muted">
                Applications received post-deadline will not be reviewed. Limited cohort slot validation mandates timely submissions.
              </p>
            </div>

            <div className="p-6 rounded-xl glass-card border-l-2 border-l-primary space-y-3">
              <div className="text-primary"><Users size={28} /></div>
              <h4 className="font-display font-semibold text-lg">Available Placements</h4>
              <p className="font-mono text-xs text-accent">Strictly Limited Seats</p>
              <p className="text-xs text-text-muted">
                Capped intake to ensure high touch support during professional evaluation review slots and map validations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Skills You Will Learn Section */}
      <section className="py-24 bg-black/10 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-mono mb-4 inline-block">[ TECHNICAL SYLLABUS ]</span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-text-base mb-4">
              Skills you will master
            </h2>
            <p className="text-md text-text-muted">
              Our 4-week structured curriculum covers critical geospatial pipelines and observation parameters that agencies demand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learnedSkills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-bg-card p-6 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-white/5 w-fit mb-4">
                    {skill.icon}
                  </div>
                  <h4 className="font-display font-bold text-lg text-text-base mb-2">{skill.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">{skill.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-primary/80 font-mono">
                  <Check size={12} className="text-primary" /> MODULE VERIFIED
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Get */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual satellite mockup or graphic card */}
            <div className="lg:col-span-5 space-y-6">
              <span className="badge-mono inline-block">[ OUTCOMES CONTAINER ]</span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-text-base">
                Your Credentials After Graduation
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">
                Translate your effort into verifiable artifacts. By submitting your weekly project sheets, you finalize a professional portfolio that sets you apart in the geospatial employment pipeline.
              </p>

              {/* Verified certification badge representation */}
              <div className="relative border border-primary/20 bg-primary/5 p-6 rounded-xl flex items-start gap-4 max-w-md">
                <Award className="text-primary shrink-0 w-12 h-12" />
                <div>
                  <h4 className="font-display text-md font-bold text-primary">Certified Spatial Competency</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Interns who pass internal validation benchmarks will receive a digital signed certificate with a unique reference hash code to include in LinkedIn profiles or resumes.
                  </p>
                </div>
              </div>
            </div>

            {/* Matrix of outcomes */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
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

      {/* Interactive FAQ Program Section */}
      <section className="py-20 bg-black/15 border-t border-b border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="badge-mono mb-3 inline-block">[ INQUIRY RESOLUTION ]</span>
            <h2 className="font-display text-3xl font-black text-text-base">Frequently Asked Questions</h2>
            <p className="text-xs text-text-muted mt-2">Get swift explanations regarding program schedules, equipment, and prerequisites.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
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

      {/* Contact Section explicitly requested */}
      <section id="careers-contact" className="py-24 relative border-t border-white/5 grid justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <span className="badge-mono">[ SUBMIT APPLICATIONS ]</span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-text-base">Ready to Launch Your Spatial Career?</h2>
          <p className="text-text-muted text-base max-w-xl mx-auto leading-relaxed">
            Send your CV or academic transcript coordinates to our official Recruitment Officer email terminal configuration. We look forward to evaluating your mapping competency!
          </p>

          <div className="bg-bg-card border border-primary/20 p-6 rounded-xl max-w-lg mx-auto space-y-4">
            <Mail className="text-primary w-10 h-10 mx-auto" />
            <h4 className="font-display font-bold text-lg">Send your CV to our official email address</h4>
            <a 
              href={`mailto:${emailAddress}`}
              className="block font-mono text-xl text-primary font-semibold hover:text-accent select-all break-all tracking-wide transition-colors"
            >
              recruiter.spatiocoretech@outlook.com
            </a>
            <p className="text-[10px] text-text-muted uppercase">Clicking the link opens your default email workspace</p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a 
              href={mailtoLink}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0a0f1e] px-8 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(0,201,167,0.3)]"
            >
              Apply via Email <Send size={15} />
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-[#0a0f1e] px-8 py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(244,166,35,0.3)]"
            >
              Configure Subject Wizard <Sparkles size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Floating Apply widget on scroll */}
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
                <p className="font-mono text-[9px] text-text-muted uppercase tracking-wider">OPEN INTERNSHIP</p>
                <p className="text-xs font-bold text-text-base">Geospatial Analyst Intern</p>
              </div>
              <a 
                href={mailtoLink}
                className="bg-primary hover:bg-primary/90 text-[#0a0f1e] px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all"
              >
                Apply Now Mode
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent hover:bg-accent/90 text-[#0a0f1e] px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all"
              >
                Send CV
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
                    <option value="Environmental Science / Impact Studies">Environmental Science / GIS Mapping</option>
                    <option value="Geology / Digital Elevation Mapping">Geology & Hazard Terrain Analysis</option>
                    <option value="Geography / Spatial Informatics">Geography & Cartography Informatics</option>
                    <option value="Sensing Systems & Satellite Analysis">Satellite Remote Sensing & SAR Imaging</option>
                    <option value="Spatial Science / Geocomputation">Spatial Computations & Databases</option>
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
