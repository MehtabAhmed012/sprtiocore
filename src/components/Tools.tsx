import { LOGOS } from '../constants';

export default function Tools() {
  return (
    <section className="py-16 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-sm border-y border-white/5 relative z-10">
      <div className="marquee">
        <div className="marquee-content">
          {LOGOS.concat(LOGOS).map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 glass-card"
            >
              <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(0,201,167,1)]" />
              <span className="font-mono text-sm font-bold text-text-light/80 dark:text-text-dark/80 tracking-tight">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
