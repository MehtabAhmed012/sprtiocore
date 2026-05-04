import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'Flood Mapping with Sentinel-1 SAR: A Practical Guide',
    date: 'Oct 12, 2025',
    tag: 'Technical',
    img: 'https://picsum.photos/seed/sar/600/400'
  },
  {
    title: 'NDVI vs EVI: Which Vegetation Index Should You Use?',
    date: 'Sep 28, 2025',
    tag: 'Research',
    img: 'https://picsum.photos/seed/ndvi/600/400'
  },
  {
    title: 'How GIS is Revolutionizing Public Health Response',
    date: 'Sep 15, 2025',
    tag: 'Insights',
    img: 'https://picsum.photos/seed/lab/600/400'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-primary text-sm font-semibold tracking-widest mb-4 block">
              [ GEOSPATIAL INSIGHTS ]
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black">
              From the <span className="text-primary">Lab</span>
            </h2>
          </div>
          <a href="#" className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
            View All Posts <ArrowRight size={20} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-3xl mb-6 relative">
                 <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute top-4 left-4">
                   <span className="bg-bg-dark/80 backdrop-blur-md text-primary font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-primary/20">
                     {post.tag}
                   </span>
                 </div>
              </div>
              <p className="text-text-light/50 dark:text-text-dark/50 font-mono text-xs mb-3 font-bold uppercase tracking-widest">{post.date}</p>
              <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                {post.title}
              </h3>
              <p className="flex items-center gap-2 text-primary font-bold text-sm">
                Read More <ArrowRight size={16} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
