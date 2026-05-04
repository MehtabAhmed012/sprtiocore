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
    <section id="portfolio" className="py-24 bg-bg-light/30 dark:bg-bg-dark/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-primary text-sm font-semibold tracking-widest mb-4 block">
              [ FEATURED WORK ]
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black">
              Projects That Define <br />
              <span className="text-primary">Our Precision</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === cat 
                  ? 'bg-primary text-bg-dark' 
                  : 'bg-white/5 dark:bg-white/5 border border-white/10 hover:border-primary/50'
                }`}
              >
                {cat}
              </button>
            ))}
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
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono font-bold bg-primary text-bg-dark px-2 py-0.5 rounded">
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
