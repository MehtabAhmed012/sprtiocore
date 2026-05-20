import { motion } from 'motion/react';
import { Globe, Shield, Zap } from 'lucide-react';

const stats = [
  { icon: <Globe className="text-primary" />, title: 'Earth-First Approach', desc: 'Every solution begins with understanding the land, the data, and the environment it serves.' },
  { icon: <Shield className="text-primary" />, title: 'Satellite-Grade Accuracy', desc: 'We leverage the best satellite platforms — Sentinel, Landsat, SAR — for reliable spatial truth.' },
  { icon: <Zap className="text-primary" />, title: 'Data-Driven Decisions', desc: 'Our outputs are designed for action, not just archiving — usable by teams at every level.' },
  { icon: <Globe className="text-primary" />, title: 'Startup Agility', desc: 'We move fast, communicate clearly, and adapt to your timeline without sacrificing quality.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-bg-base/50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="relative aspect-square max-w-md mx-auto">
             <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
             <div className="absolute inset-0 bg-black/10 dark:bg-white/5 backdrop-blur-sm rounded-3xl border border-primary/20 p-8 flex flex-col justify-between">
                <div className="grid grid-cols-6 gap-4">
                  {[...Array(36)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.2, 1] }}
                      transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                      className="w-1 h-1 bg-primary rounded-full"
                    />
                  ))}
                </div>
                <div className="space-y-4">
                   <div className="h-2 w-3/4 bg-primary/20 rounded" />
                   <div className="h-2 w-1/2 bg-primary/10 rounded" />
                   <div className="h-2 w-5/6 bg-primary/30 rounded" />
                </div>
                <div className="relative h-48 border border-primary/20 rounded-xl overflow-hidden bg-black/20 dark:bg-white/5 flex items-center justify-center">
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-2 border-primary/40 border-dashed rounded-full flex items-center justify-center"
                   >
                     <Globe className="text-primary w-12 h-12" />
                   </motion.div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="badge-mono mb-8 inline-block">
            [ WHO WE ARE ]
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-[-1px]">
            Precision. Integrity. Spatial Intelligence — <span className="text-primary">Built for the Real World.</span>
          </h2>
          <div className="space-y-6 mb-10">
            <p className="text-lg text-text-muted leading-relaxed">
              SpatioCore Tech is a forward-thinking geospatial technology startup on a mission to turn complex earth data into clear, actionable intelligence. Founded by certified GIS and remote sensing professionals, we bridge the gap between raw satellite imagery and real-world decision-making across environmental, geological, public health, and commercial sectors.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              From flood hazard zonation and mangrove change detection to geological terrain analysis and disease outbreak mapping, every project we deliver is grounded in scientific rigor, spatial precision, and a commitment to clarity. We don't just produce maps — we produce insight.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-4 rounded-xl glass-card hover:border-primary/50 transition-colors"
              >
                <div className="mb-3">{item.icon}</div>
                <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-text-base/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
