import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  { 
    text: "SpatioCore Tech transformed our urban planning workflow. Their SAR data insights were critical for our last project.",
    author: "James Wilson",
    org: "City Development Auth",
    flag: "🇬🇧"
  },
  { 
    text: "The precision of their flood models is unmatched. We identified high-risk zones that other tools missed completely.",
    author: "Nadim El-Said",
    org: "Regional Water Board",
    flag: "🇪🇬"
  },
  { 
    text: "Professional, scientific, and ahead of the curve. Their GEE custom scripts saved our research team months of work.",
    author: "Dr. Ana Silva",
    org: "Oceanic Research Inst",
    flag: "🇧🇷"
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-primary/5 dark:bg-bg-dark/80 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex p-4 bg-primary text-bg-dark rounded-2xl mb-8 shadow-[0_10px_25px_rgba(0,201,167,0.3)]">
          <Quote size={32} />
        </div>
        
        <div className="relative h-[250px] md:h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <p className="text-xl md:text-3xl font-medium italic mb-10 leading-relaxed text-text-light dark:text-text-dark">
                "{testimonials[index].text}"
              </p>
              <div>
                <h4 className="font-display font-bold text-lg">{testimonials[index].author}</h4>
                <p className="text-text-light/50 dark:text-text-dark/50 text-sm">
                  {testimonials[index].org} {testimonials[index].flag}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? 'bg-primary w-8' : 'bg-primary/20 hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
