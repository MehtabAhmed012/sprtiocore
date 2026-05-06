import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Loader2, Share2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { OFFICIAL_BLOG_POSTS } from '../constants/blogData';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const q = query(
          collection(db, 'blog_posts'), 
          where('slug', '==', slug),
          where('status', '==', 'published'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback to fetch by ID just in case
          const docRef = doc(db, 'blog_posts', slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().status === 'published') {
            setPost({ id: docSnap.id, ...docSnap.data() });
          } else {
            // Check constants if not in DB
            const constantPost = OFFICIAL_BLOG_POSTS.find(p => p.slug === slug);
            if (constantPost) {
              setPost({ 
                ...constantPost, 
                createdAt: { toDate: () => new Date() } // Fallback date
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Transmission Lost</h1>
        <p className="text-text-muted mb-8">The requested data packet could not be retrieved from the archives.</p>
        <Link to="/" className="bg-primary text-[#0a0f1e] px-8 py-3 rounded-full font-bold">
          Return to Base
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 bg-bg-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-12 font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Insights
        </Link>

        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <div className="h-px flex-1 bg-primary/10" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1]"
          >
            {post.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 text-text-muted text-sm font-mono uppercase tracking-widest border-b border-primary/10 pb-8"
          >
            <span className="flex items-center gap-2">
              <User size={14} className="text-primary" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-primary" /> {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'Recent'}
            </span>
            <button className="ml-auto flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 size={14} /> Share
            </button>
          </motion.div>
        </header>

        {post.image && post.image.trim() && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="aspect-video rounded-[40px] overflow-hidden mb-16 border border-primary/10 shadow-2xl"
          >
            <img src={post.image || null} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert prose-primary max-w-none prose-p:text-lg prose-p:leading-relaxed prose-p:text-text-base/80 prose-headings:font-display prose-headings:font-bold"
        >
          {post.content.split('\n').map((para, i) => (
            <p key={i} className="mb-6">{para}</p>
          ))}
        </motion.div>

        {/* Structured Data: Market Stats */}
        {post.stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-16">
            {post.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-white/5 border border-primary/20 p-8 rounded-[30px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-primary/20 transition-all" />
                <p className="text-3xl font-display font-black text-primary mb-2">{stat.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Structured Data: Offerings */}
        {post.offerings && (
          <div className="my-20">
            <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">01</span>
              Technical Service Offerings
            </h3>
            <div className="grid gap-6">
              {post.offerings.map((offering: any, i: number) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-primary/5 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center font-mono text-primary font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{offering.title}</h4>
                    <p className="text-sm text-text-muted leading-relaxed">{offering.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Structured Data: Workflow */}
        {post.workflow && (
          <div className="my-20">
            <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">02</span>
              Execution Workflow & Lifecycle
            </h3>
            <div className="space-y-4">
              {post.workflow.map((step: any, i: number) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_#00c9a7] group-hover:scale-125 transition-transform" />
                    {i !== post.workflow.length - 1 && <div className="w-px h-24 bg-primary/20 my-2" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1">{step.phase}</p>
                    <p className="text-text-base/80 leading-relaxed font-medium">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools & Tech Stack */}
        {post.tools && (
          <div className="my-20 p-8 rounded-[40px] bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="text-primary" size={20} />
              <h3 className="font-display text-xl font-bold">Standard Toolstack</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {post.tools.map((tool: string, i: number) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-bg-base border border-primary/10 text-xs font-mono text-text-base">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Market Insight & Differentiator */}
        {(post.marketInsight || post.differentiator) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
            {post.marketInsight && (
              <div className="p-8 rounded-[30px] border border-primary/10 relative overflow-hidden bg-white/5">
                <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Market Intelligence</p>
                <p className="text-sm text-text-muted italic leading-relaxed">"{post.marketInsight}"</p>
              </div>
            )}
            {post.differentiator && (
              <div className="p-8 rounded-[30px] border border-primary/10 relative overflow-hidden bg-primary/5">
                <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">The SpatioCore Edge</p>
                <p className="text-sm font-bold text-text-base leading-relaxed">{post.differentiator}</p>
              </div>
            )}
          </div>
        )}

        <footer className="mt-24 pt-12 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary">SC</div>
             <div>
               <p className="font-bold">{post.author}</p>
               <p className="text-xs text-text-muted">SpatioCore Technical Contributor</p>
             </div>
          </div>
          <Link to="/" className="bg-primary text-[#0a0f1e] px-8 py-4 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(0,201,167,0.4)] transition-all">
            Connect with Experts
          </Link>
        </footer>
      </div>
    </article>
  );
}
