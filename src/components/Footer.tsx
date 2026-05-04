import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-bg-dark text-text-dark border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Col 1 */}
          <div className="space-y-6">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-bg-dark font-bold text-xl">S</div>
              <span className="font-display text-xl font-bold tracking-tight text-primary">
                Spatio<span className="text-white">Core</span>
              </span>
            </a>
            <p className="text-sm text-text-dark/60 leading-relaxed max-w-xs">
              Pioneering Geospatial Intelligence Solutions for a data-driven planet. Precision mapping, innovative analysis, sustainable outcomes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-primary transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-primary transition-colors"><Github size={18} /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-8 underline underline-offset-8 decoration-primary/30">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-text-dark/60">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-8 underline underline-offset-8 decoration-primary/30">
              Top Services
            </h4>
            <ul className="space-y-4 text-sm text-text-dark/60">
              <li><a href="#" className="hover:text-primary transition-colors">GIS Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SAR Processing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Flood Hazard Mapping</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LULC Change detection</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terrain Stability Study</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-8 underline underline-offset-8 decoration-primary/30">
              Newsletter
            </h4>
            <p className="text-sm text-text-dark/60 mb-6">Stay updated with the latest in spatial tech.</p>
            <div className="flex flex-col gap-3">
               <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none w-full" />
               <button className="bg-primary text-bg-dark font-bold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                 Subscribe <Mail size={16} />
               </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-text-dark/40">
           <p>© 2025 SpatioCore Tech. All Rights Reserved.</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
