import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative topo-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-primary text-sm font-semibold tracking-widest mb-4 block">
              [ CONNECT WITH US ]
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-8 leading-tight">
              Let's Map Your <br />
              <span className="text-primary">Next Project</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-bg-dark transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="text-text-light/60 dark:text-text-dark/60">hello@spatiocore.tech</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-bg-dark transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-text-light/60 dark:text-text-dark/60">+1 (555) spatial-tech</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-bg-dark transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Visit HQ</h4>
                  <p className="text-text-light/60 dark:text-text-dark/60">123 Geotech Plaza, Space City, Earth</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-primary transition-all"><Linkedin /></a>
              <a href="#" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-primary transition-all"><Mail /></a>
            </div>
            
            <div className="mt-12 rounded-3xl overflow-hidden grayscale border border-white/10 opacity-50">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.01258667634!2d-122.4013444!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1654012345678!5m2!1sen!2sus" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                loading="lazy" 
               />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[40px] shadow-2xl relative"
          >
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-light/50 dark:text-text-dark/50">Full Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-light/50 dark:text-text-dark/50">Email</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-light/50 dark:text-text-dark/50">Service Interested In</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer">
                      <option>GIS Services</option>
                      <option>Remote Sensing</option>
                      <option>Environmental</option>
                      <option>Geology & Terrain</option>
                      <option>Health & Safety</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-light/50 dark:text-text-dark/50">Your Message</label>
                   <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none transition-all resize-none"></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    submitted ? 'bg-primary text-bg-dark' : 'bg-accent hover:bg-accent/90 text-bg-dark shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {submitted ? (
                    <>Message Sent <CheckCircle2 size={20} /></>
                  ) : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
             </form>
             
             {submitted && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="absolute inset-0 bg-bg-dark/95 backdrop-blur-sm rounded-[40px] flex flex-col items-center justify-center text-center p-12 z-20"
               >
                  <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">Message Transmitted</h3>
                  <p className="text-text-light/60 dark:text-text-dark/60 mb-8">
                    Your coordinates have been received. Our team will ping you back shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-bg-dark px-6 py-2 rounded-full font-bold transition-all">
                    Dismiss
                  </button>
               </motion.div>
             )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
