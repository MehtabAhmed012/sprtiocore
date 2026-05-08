import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../constants/constants';
import { ArrowUpRight, Map, Satellite, Leaf, Mountain, HeartPulse, ShieldAlert } from 'lucide-react';

const icons:Record<string, any> = {
  'GIS & Spatial Analysis': <Map />,
  'Remote Sensing': <Satellite />,
  'Environmental': <Leaf />,
  'Geology & Terrain': <Mountain />,
  'Health & Safety GIS': <ShieldAlert />,
  'Applied Sectors': <HeartPulse />,
};

export default function Services() {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);

  const activeCategory = SERVICES.find(s => s.id === activeTab);

  return (
    <section id="services" className="py-24 relative topo-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="badge-mono mb-6 inline-block"
          >
            [ CORE OFFERING ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight"
          >
            End-to-End Geospatial Services <span className="text-primary">From Satellite to Street Level</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted leading-relaxed"
          >
            Whether you need land use mapping, environmental impact assessment, geological hazard analysis, or health GIS solutions SpatioCore Tech delivers measurable results with tools trusted by governments, researchers, and industry leaders worldwide.
          </motion.p>
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
                <p className="text-text-light/70 dark:text-text-base/70 text-sm mb-6 leading-relaxed titlecase">
                  {item.description}
                </p>
                {/* <a href="#blog" className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Case Study <ArrowUpRight size={14} />
                </a> */}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
