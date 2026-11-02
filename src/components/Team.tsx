import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  { 
    name: 'Sidra Tul Muntaha', 
    role: 'Chief Executive Officer (CEO)', 
    bio: 'Directing global corporate governance, international earth data partnerships, and enterprise geospatial strategy for SpatioCore Tech.',
    img: '',
    linkedin: 'https://www.linkedin.com/company/spatiocoretech',
    email: 'Insights.spatiocoretech@outlook.com'
  },
  { 
    name: 'Mehtab Ahmed', 
    role: 'Chief Operating Officer (COO)', 
    bio: 'Lead Geospatial Architect & COO. Pioneering satellite remote sensing pipelines, enterprise GIS infrastructure, and earth observation modeling.',
    img: '',
    linkedin: 'https://www.linkedin.com/company/spatiocoretech',
    email: 'Insights.spatiocoretech@outlook.com'
  },
  { 
    name: 'Sarah Al-Mansoor', 
    role: 'Senior RS Analyst', 
    bio: 'Specializing in multi-spectral satellite imagery, Google Earth Engine workflows, vegetation index anomalies (NDVI/EVI), and radar change detection.',
    img: '',
    linkedin: 'https://www.linkedin.com/company/spatiocoretech',
    email: 'Insights.spatiocoretech@outlook.com'
  },
  { 
    name: 'Engr. David Vance', 
    role: 'Enterprise GIS Director', 
    bio: 'Directing high-availability spatial database implementations, Cloud GIS platforms, REST geospatial services, and urban infrastructure systems.',
    img: '',
    linkedin: 'https://www.linkedin.com/company/spatiocoretech',
    email: 'Insights.spatiocoretech@outlook.com'
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 topo-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-primary text-sm font-semibold tracking-widest mb-4 block"
          >
            [ THE MINDS BEHIND THE MAPS ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-black mb-6"
          >
            Meet the <span className="text-primary">Experts</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={member.name} className="group h-[400px] [perspective:1000px]">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <div className="h-full bg-white/5 dark:bg-card-dark border border-white/10 rounded-3xl overflow-hidden flex flex-col p-6">
                    <div className="aspect-square w-28 mx-auto rounded-full overflow-hidden border-2 border-primary mb-5 flex items-center justify-center bg-primary/10">
                      {member.img && member.img.trim() ? (
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-primary font-bold font-display uppercase text-sm">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      )}
                    </div>
                    <div className="text-center mt-auto">
                      <h3 className="font-display text-lg font-bold mb-1.5">{member.name}</h3>
                      <p className="text-primary font-mono text-[11px] uppercase tracking-wider">{member.role}</p>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="h-full bg-primary text-bg-dark rounded-3xl p-6 flex flex-col justify-center text-center">
                    <h3 className="font-display text-lg font-bold mb-3">{member.name}</h3>
                    <p className="text-xs font-medium mb-6 leading-relaxed italic">
                      "{member.bio}"
                    </p>
                    <div className="flex justify-center gap-3 mt-auto">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-bg-base text-white rounded-full hover:scale-110 transition-transform"><Linkedin size={18} /></a>
                      <a href={`mailto:${member.email}`} className="p-2.5 bg-bg-base text-white rounded-full hover:scale-110 transition-transform"><Mail size={18} /></a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
