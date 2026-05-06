import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { db, handleFirestoreError, OperationType, sendEmail } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: 'Commercial GIS',
    details: ''
  });

  const [techLogs, setTechLogs] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTechLogs(['Initializing orbital uplink...', 'Acquiring satellite coordinates...', 'Encrypting payload with AES-256...']);
    
    // Stagger tech logs for "fun"
    setTimeout(() => setTechLogs(prev => [...prev, 'Bypassing ionospheric interference...', 'Data stream established.']), 1000);

    try {
      const path = 'quotes';
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // Mock Email (Background task, don't await to speed up UI)
      sendEmail(
        formData.email,
        'Quote Request Received - SpatioCore Tech',
        `Hi ${formData.fullName},\n\nWe have received your quote request for a ${formData.projectType} project. Our technical team will review your details and reach out with a preliminary estimate within 24-48 hours.\n\nBest regards,\nThe SpatioCore Team`
      );

      setTimeout(() => {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', projectType: 'Commercial GIS', details: '' });
      }, 2500);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'quotes');
    } finally {
      setTimeout(() => setLoading(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-base/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-xl bg-card-base border border-primary/20 rounded-[40px] p-10 shadow-2xl relative z-10 overflow-hidden"
          >
            {loading && (
              <div className="absolute inset-0 bg-bg-base/90 z-20 flex flex-col items-center justify-center p-12 text-center">
                <Loader2 className="animate-spin text-primary mb-6" size={48} />
                <div className="font-mono text-[10px] text-primary/60 space-y-1">
                  {techLogs.map((log, i) => (
                    <motion.p 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {">"} {log}
                    </motion.p>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {!submitted ? (
              <>
                <div className="mb-8">
                  <h2 className="font-display text-3xl font-bold mb-2">Request a Quote</h2>
                  <p className="text-text-muted">Tell us about your project requirements.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Project Type</label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all appearance-none"
                    >
                      <option>Commercial GIS</option>
                      <option>Governmental Infrastructure</option>
                      <option>Environmental Monitoring</option>
                      <option>Research & Development</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Project Details</label>
                    <textarea 
                      required 
                      rows={4} 
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all resize-none"
                      placeholder="Scope, timeline, and data requirements..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-accent hover:bg-accent/90 text-[#0a0f1e] rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-1 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>Transmit Request <Send size={20} /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Request Transmitted</h3>
                <p className="text-text-muted mb-8 max-w-sm">
                  Our orbital sensors have confirmed receipt of your data. A specialist will be in touch shortly.
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="bg-primary px-8 py-3 rounded-full text-[#0a0f1e] font-bold hover:opacity-90 transition-all"
                >
                  Close Terminal
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
