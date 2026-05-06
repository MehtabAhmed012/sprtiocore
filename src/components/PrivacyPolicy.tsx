import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-bg-base min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 topo-bg opacity-5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> [ Back to Base ]
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 dark:bg-white/5 border border-black/10 dark:border-white/10 p-12 rounded-[2rem] backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
              <p className="text-text-muted font-mono text-xs uppercase tracking-widest mt-1">Version 1.0.24 // Data Protocols</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-text-base/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-3">
                <Eye size={20} /> Data Transparency
              </h2>
              <p>
                At SpatioCore Tech, we value the geometric and personal integrity of our data. This Privacy Policy describes how we collect, use, and protect your information when you interact with our spatial services and digital platforms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-3">
                <Lock size={20} /> Information Collection
              </h2>
              <p>
                We collect information that you provide directly to us, such as when you request a project quote, subscribe to our newsletter, or contact our spatial inquiry desk. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-sm font-mono">
                <li>Identity Markers (Name, Email, Phone)</li>
                <li>Geographic Interests (Sectors, Project Locations)</li>
                <li>Usage Metadata (IP Address, Browser Type, Interaction Grids)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-3">
                <FileText size={20} /> Use of Core Intelligence
              </h2>
              <p>
                Your data is processed to optimize our service delivery:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Refining spatial analysis accuracy for your specific projects.</li>
                <li>Communicating technical updates and localized reports.</li>
                <li>Maintaining the security and operational integrity of our satellite data gateways.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-primary mb-4">Sharing Protocols</h2>
              <p>
                We do not sell your spatial identity. Information is only shared with trusted technical partners or when required by regulatory frameworks to maintain regional airspace and ground safety compliance.
              </p>
            </section>

            <section className="pt-8 border-t border-white/10">
              <p className="text-xs text-text-muted italic">
                For inquiries regarding your data coordinates, contact our Privacy Officer at xidraa@gmail.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
