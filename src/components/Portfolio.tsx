import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO } from '../constants';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'Flood Mapping', 'LULC', 'Mangrove', 'Geology', 'Health GIS'];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-bg-base/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-16 gap-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="badge-mono mb-4 inline-block w-fit"
          >
            [ SOCIAL PROOF ]
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Projects That Define Our Precision — <span className="text-primary">Real Solutions, Real Impact</span>
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                Each project at SpatioCore Tech begins with a clear problem and ends with spatial intelligence that drives action. Explore our portfolio of GIS, remote sensing, and environmental mapping work across diverse geographies and sectors.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 h-fit">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filter === cat 
                    ? 'bg-primary text-[#0a0f1e] shadow-[0_5px_15px_rgba(0,201,167,0.3)]' 
                    : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-primary/50 text-text-base'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-xl"
              >
                {project.image && project.image.trim() ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-mono text-[10px] uppercase font-bold">Project Visual Lost</span>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono font-bold bg-primary text-[#0a0f1e] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-4 text-white">{project.title}</h3>
                      <button className="flex items-center gap-2 text-primary font-bold text-sm">
                        View Project <ExternalLink size={16} />
                      </button>
                   </div>
                </div>
                
                {/* Category Badge - Always visible */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[10px] font-bold text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
