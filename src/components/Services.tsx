import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../constants';
import { ArrowUpRight, Map, Satellite, Leaf, Mountain, HeartPulse, ShieldAlert } from 'lucide-react';

const icons: Record<string, any> = {
  'GIS Services': <Map />,
  'Remote Sensing': <Satellite />,
  'Environmental': <Leaf />,
  'Geology & Terrain': <Mountain />,
  'Health & Safety': <ShieldAlert />,
  'Applied / Sector': <HeartPulse />,
};

export default function Services() {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);

  const activeCategory = SERVICES.find(s => s.id === activeTab);

  return (
    <section id="services" className="py-24 relative topo-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-primary text-sm font-semibold tracking-widest mb-4 block"
          >
            [ OUR SERVICES ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-black mb-6"
          >
            Geospatial <span className="text-primary">Capabilities</span>
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                activeTab === service.id 
                ? 'bg-primary text-bg-dark shadow-[0_5px_15px_rgba(0,201,167,0.3)]' 
                : 'bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 border border-white/10'
              }`}
            >
              {service.category}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {activeCategory?.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl glass-card hover:bg-primary/5 transition-all cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary"
              >
                <div className="text-primary mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {icons[activeCategory.category] || <Map />}
                </div>
                <h3 className="font-display text-xl font-bold mb-4 group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowUpRight size={14} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
