import { LOGOS } from '../constants/constants';

export default function Tools() {
  return (
    <section className="py-24 bg-bg-base/80 dark:bg-bg-base/80 backdrop-blur-sm border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <span className="badge-mono mb-6 inline-block">
            [ TOOLS WE MASTER ]
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4">
            Industry-Standard Tools. <br />
            <span className="text-primary">Startup Agility. Professional Precision.</span>
          </h2>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-content">
          {LOGOS.concat(LOGOS).map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 glass-card"
            >
              <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(0,201,167,1)]" />
              <span className="font-mono text-sm font-bold text-text-light/80 dark:text-text-base/80 tracking-tight">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
