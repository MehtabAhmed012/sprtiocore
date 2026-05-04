import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  { 
    name: 'Dr. Sarah Chen', 
    role: 'Lead Geospatial Scientist', 
    bio: '15+ years in Remote Sensing and environmental modelling.',
    img: 'https://i.pravatar.cc/300?u=sarah' 
  },
  { 
    name: 'Marcus Thorne', 
    role: 'Principal GIS Architect', 
    bio: 'Expert in enterprise GIS infrastructures and automation.',
    img: 'https://i.pravatar.cc/300?u=marcus' 
  },
  { 
    name: 'Elena Rodriguez', 
    role: 'Environmental Analyst', 
    bio: 'Specialist in hydrological risk assessment and conservation.',
    img: 'https://i.pravatar.cc/300?u=elena' 
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

        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <div key={member.name} className="group h-[400px] [perspective:1000px]">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <div className="h-full bg-white/5 dark:bg-card-dark border border-white/10 rounded-3xl overflow-hidden flex flex-col p-8">
                    <div className="aspect-square w-32 mx-auto rounded-full overflow-hidden border-2 border-primary mb-6">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center mt-auto">
                      <h3 className="font-display text-xl font-bold mb-2">{member.name}</h3>
                      <p className="text-primary font-mono text-xs uppercase tracking-widest">{member.role}</p>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="h-full bg-primary text-bg-dark rounded-3xl p-8 flex flex-col justify-center text-center">
                    <h3 className="font-display text-xl font-bold mb-4">{member.name}</h3>
                    <p className="text-sm font-medium mb-8 leading-relaxed italic">
                      "{member.bio}"
                    </p>
                    <div className="flex justify-center gap-4 mt-auto">
                      <a href="#" className="p-3 bg-bg-dark text-white rounded-full hover:scale-110 transition-transform"><Linkedin size={20} /></a>
                      <a href="#" className="p-3 bg-bg-dark text-white rounded-full hover:scale-110 transition-transform"><Mail size={20} /></a>
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
