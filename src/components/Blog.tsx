import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { OFFICIAL_BLOG_POSTS } from '../constants/blogData';

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'blog_posts'), 
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'), 
          limit(6)
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (fetched.length > 0) {
          setPosts(fetched);
        } else {
          // Fallback to official constants if database is empty or unreachable
          setPosts(OFFICIAL_BLOG_POSTS.map(post => ({
            ...post,
            createdAt: { toDate: () => new Date() } // Mock date for fallback
          })));
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="pt-32 pb-24 bg-bg-base relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 topo-bg opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col mb-16 gap-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="badge-mono mb-4 inline-block w-fit"
          >
            [ INSIGHTS & KNOWLEDGE ]
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Geospatial Insights — <span className="text-primary">Expert Knowledge from the SpatioCore Team</span>
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                Stay informed with the latest trends in satellite image processing, urban growth modeling, and environmental sustainable practices delivered by our technical experts.
              </p>
            </div>
            
            <a href="#" className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all h-fit">
              View All Posts <ArrowRight size={20} />
            </a>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
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
                <div className="aspect-[16/10] overflow-hidden rounded-3xl mb-6 relative bg-primary/10 flex items-center justify-center">
                  {post.image && post.image.trim() ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="text-primary/20 font-mono text-[10px] uppercase">Image Missing</div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.isOfficial && (
                      <span className="bg-primary text-[#0a0f1e] text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        Official
                      </span>
                    )}
                    <span className="bg-bg-base/80 backdrop-blur-md text-primary font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-primary/20">
                      {post.category}
                    </span>
                  </div>
                </div>
                <p className="text-text-base/50 font-mono text-xs mb-3 font-bold uppercase tracking-widest">
                  {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'Recent Post'}
                </p>
                <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                  {post.title}
                </h3>
                <Link to={post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`} className="flex items-center gap-2 text-primary font-bold text-sm">
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
