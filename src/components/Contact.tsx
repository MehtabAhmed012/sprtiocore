import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { db, handleFirestoreError, OperationType, sendEmail } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [techLogs, setTechLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: 'GIS & Spatial Analysis',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTechLogs(['Opening secure channel...', 'Handshaking with ground station...', 'Pinging SpatioCore servers...']);
    
    setTimeout(() => setTechLogs(prev => [...prev, 'Optimizing signal-to-noise ratio...', 'Transmission locked.']), 800);

    try {
      const path = 'inquiries';
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // Mock Email (Background task, don't await to speed up UI)
      sendEmail(
        formData.email,
        'Inquiry Received - SpatioCore Tech',
        `Hi ${formData.fullName},\n\nThank you for reaching out to SpatioCore Tech. We have received your message regarding ${formData.service} and will get back to you shortly.\n\nBest regards,\nThe SpatioCore Team`
      );

      setTimeout(() => {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', service: 'GIS & Spatial Analysis', message: '' });
      }, 2000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'inquiries');
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-base relative overflow-hidden">
      <div className="absolute inset-0 topo-bg opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-mono mb-8 inline-block">
              [ TRANSMISSION_PORTAL ]
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              Establish <span className="text-primary italic">Uplink</span>
            </h2>
            <p className="text-lg text-text-muted mb-12 leading-relaxed max-w-md">
              Ready to harness the power of location intelligence? Send us your coordinates and we'll bridge the gap between data and decisions.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-[#0a0f1e] transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-display font-medium text-lg text-primary">Email Terminal</h4>
                  <p className="text-text-base/60">xidraa@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-[#0a0f1e] transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-display font-medium text-lg text-primary">Direct Voice Patch</h4>
                  <p className="text-text-base/60">+92 325 9900550</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-[#0a0f1e] transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-display font-medium text-lg text-primary">Ground Coordinates</h4>
                  <p className="text-text-base/60 leading-relaxed">
                    Street No. 5, Sector J,<br />
                    Bahria Enclave, Islamabad, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:border-primary transition-all text-text-base"><Linkedin /></a>
              <a href="#" className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:border-primary transition-all text-text-base"><Mail /></a>
            </div>
            
            <div className="mt-12 rounded-3xl overflow-hidden border border-white/10 group aspect-video">
               <iframe 
                src="https://maps.app.goo.gl/Fq2AfnLxaLBhFygB8" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale invert contrast-125 opacity-70 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card-base border border-primary/20 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
             {loading && (
              <div className="absolute inset-0 bg-bg-base/90 z-20 flex flex-col items-center justify-center p-12 text-center">
                <Loader2 className="animate-spin text-primary mb-6" size={48} />
                <div className="font-mono text-[10px] text-primary/60 space-y-1">
                  {techLogs.map((log, i) => (
                    <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{">"} {log}</motion.p>
                  ))}
                </div>
              </div>
             )}
             
             {!submitted ? (
               <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all dark:text-white" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Email</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all dark:text-white" 
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Sector of Interest</label>
                    <select 
                     value={formData.service}
                     onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                     className="w-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer text-text-base border-r-8 border-transparent"
                    >
                       <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">GIS & Spatial Analysis</option>
                       <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Remote Sensing</option>
                       <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Environmental Mapping</option>
                       <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Urban Planning</option>
                    </select>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Your Message</label>
                   <textarea 
                    required 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all resize-none dark:text-white"
                   ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={loading || submitted}
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-accent hover:bg-accent/90 text-[#0a0f1e] shadow-xl hover:-translate-y-1"
                >
                  Transmit Signal <Send size={20} />
                </button>
             </form>
             ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">Message Transmitted</h3>
                  <p className="text-text-base/60 mb-8">
                    Your coordinates have been received. Our team will ping you back shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-[#0a0f1e] px-6 py-2 rounded-full font-bold transition-all">
                    Dismiss Terminal
                  </button>
               </motion.div>
             )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
