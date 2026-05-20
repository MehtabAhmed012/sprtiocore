import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { value: 150, label: 'Projects Delivered', suffix: '+' },
  { value: 20, label: 'Industries Served', suffix: '+' },
  { value: 10, label: 'Countries Reached', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
];

function CountUp({ value, suffix }: { value: number, suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const timer = setInterval(() => {
      start += Math.ceil(value / 40);
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / 40);
    return () => clearInterval(timer);
  }, [value]);

  return <>{count}{suffix}</>;
}

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden topo-bg">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600" 
          alt="Satellite Earth View" 
          className="w-full h-full object-cover opacity-20 grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/80 via-transparent to-bg-base" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="badge-mono mb-12 inline-block"
          >
            [ GEOSPATIAL INTELLIGENCE SOLUTIONS ]
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-[-3px] text-text-base"
          >
            Decode the Earth <span className="text-primary"> Design the Future </span>
            {/* Where Earth Data Meets Smart Solutions — <span className="text-primary">GIS & Remote Sensing Experts</span> */}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mb-12"
          >
            SpatioCore Tech delivers precision GIS mapping, satellite image processing, environmental impact analysis, geological terrain studies, and health safety spatial services transforming raw earth data into strategic, decision-ready intelligence for organizations worldwide.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-5 mb-20"
          >
            <button onClick={onOpenQuote} className="btn-sophisticated btn-primary flex items-center gap-3">
              Request a Quote <ArrowRight size={18} />
            </button>
            <a href="#portfolio" className="btn-sophisticated btn-outline">
              View Portfolio
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-display font-bold text-primary">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-text-base/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual - Animated Globe */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative aspect-square flex items-center justify-center pointer-events-none"
        >
          {/* Animated Circles for Globe effect */}
          <div className="absolute w-[80%] h-[80%] border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[80%] h-[80%] border border-primary/20 rounded-full animate-[spin_25s_linear_infinite_reverse] rotate-45" />
          <div className="absolute w-[80%] h-[80%] border border-primary/20 rounded-full animate-[spin_30s_linear_infinite] -rotate-45" />
          
          <div className="relative w-full h-full flex items-center justify-center">
             <div className="w-[60%] h-[60%] bg-primary/10 rounded-full blur-[80px]" />
             <div className="absolute text-primary/30">
               <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                  <path d="M50 200 H350" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M200 50 V350" stroke="currentColor" strokeWidth="0.5" />
                  <ellipse cx="200" cy="200" rx="100" ry="150" stroke="currentColor" strokeWidth="0.5" />
                  <ellipse cx="200" cy="200" rx="150" ry="100" stroke="currentColor" strokeWidth="0.5" />
               </svg>
             </div>
             
             {/* Satellites */}
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-sm shadow-[0_0_15px_rgba(244,166,35,0.8)]" />
             </motion.div>
             <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[80%] h-[80%]"
             >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-secondary rounded-full shadow-[0_0_15px_rgba(26,115,232,0.8)]" />
             </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
