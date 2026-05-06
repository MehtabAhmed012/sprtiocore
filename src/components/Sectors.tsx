import { motion } from 'motion/react';
import { INDUSTRIES } from '../constants';

export default function Sectors() {
  return (
    <section id="industries" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="badge-mono mb-6 inline-block"
          >
            [ MARKET BREADTH ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-[-1px]"
          >
            Geospatial Intelligence Across Every <span className="text-primary">Sector That Touches the Earth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted leading-relaxed"
          >
            From agriculture fields to disaster relief zones, from mining sites to city halls — SpatioCore Tech's geospatial solutions operate wherever spatial awareness translates into better outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 0.98, rotateY: 10 }}
              style={{ perspective: '1000px' }}
              className={`p-12 text-center border border-white/5 group relative cursor-pointer overflow-hidden
                ${(i + 1) % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}
              `}
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110 duration-500">
                {industry.icon}
              </div>
              <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                {industry.name}
              </h3>
              <p className="text-sm text-text-muted group-hover:text-text-base transition-colors font-medium leading-relaxed">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
