import { motion } from 'motion/react';
import { Layers, Zap, Terminal } from 'lucide-react';

const reasons = [
  {
    icon: <Layers className="text-primary" size={32} />,
    title: 'Multi-Platform Expertise',
    desc: 'Our team is proficient in ArcGIS, QGIS, Google Earth Engine, ERDAS, ENVI, and Python-based geospatial libraries — ensuring we always use the right tool for the right problem.'
  },
  {
    icon: <Zap className="text-primary" size={32} />,
    title: 'Startup Speed, Enterprise Quality',
    desc: 'We move fast, communicate clearly, and deliver outputs that meet the standards expected by government agencies, research institutions, and commercial clients.'
  },
  {
    icon: <Terminal className="text-primary" size={32} />,
    title: 'End-to-End Spatial Pipeline',
    desc: 'From raw satellite acquisition and preprocessing to final cartographic output and dashboard delivery, SpatioCore Tech handles the full geospatial workflow.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="badge-mono mb-6 inline-block"
          >
            [ DIFFERENTIATORS ]
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
            Why Organizations Choose SpatioCore Tech for Their <span className="text-primary">Spatial Challenges</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl glass-card border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="mb-6 p-4 bg-primary/5 rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {reason.icon}
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
