import { Linkedin, Twitter, Github, Mail, Loader2, CheckCircle2, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType, loginWithGoogle, logout } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '../lib/UserContext';

export default function Footer() {
  const { user, role } = useUser();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleAdminLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await addDoc(collection(db, 'subscriptions'), {
        email,
        createdAt: serverTimestamp()
      });
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'subscriptions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-bg-base text-text-base border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Col 1 */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-[#0a0f1e] font-bold text-xl">S</div>
              <span className="font-display text-xl font-bold tracking-tight text-primary">
                Spatio<span className="text-text-base">Core</span>
              </span>
            </Link>
            <p className="text-sm text-text-base/60 leading-relaxed max-w-xs">
              SpatioCore Tech — Where Earth Data Meets Smart Solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:text-primary transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:text-primary transition-colors"><Github size={18} /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-8 underline underline-offset-8 decoration-primary/30">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-text-base/60">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><a href="/#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="/#portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors font-bold text-primary">Blog</Link></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-8 underline underline-offset-8 decoration-primary/30">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-text-base/60">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="break-all">xidraa@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-primary shrink-0 mt-0.5" />
                <span>+92 325 9900550</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed text-xs">
                  Street No. 5, Sector J,<br />
                  Bahria Enclave, Islamabad, Pakistan
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-8 underline underline-offset-8 decoration-primary/30">
              Newsletter
            </h4>
            <p className="text-sm text-text-base/60 mb-6">Stay updated with the latest in spatial tech.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
               <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none w-full" 
               />
               <button 
                type="submit"
                disabled={loading || subscribed}
                className={`bg-primary text-[#0a0f1e] font-bold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 ${subscribed ? 'bg-success' : ''}`}
               >
                 {loading ? (
                   <Loader2 size={16} className="animate-spin" />
                 ) : subscribed ? (
                    <>Subscribed <CheckCircle2 size={16} /></>
                 ) : (
                    <>Subscribe <Mail size={16} /></>
                 )}
               </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-text-base/40">
           <p>© {new Date().getFullYear()} SpatioCore Tech. All Rights Reserved.</p>
           <div className="flex gap-8 items-center">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              { /* user ? (
                <div className="flex gap-4 items-center">
                  <Link 
                    to="/admin" 
                    className="text-primary font-bold animate-pulse flex items-center gap-2 hover:opacity-80 transition-all"
                  >
                    <ShieldCheck size={14} /> {role ? `SECURE_${role.toUpperCase()}` : 'OBSERVER_MODE'}
                  </Link>
                  <button 
                    onClick={() => logout()}
                    className="hover:text-primary transition-colors opacity-40 hover:opacity-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleAdminLogin}
                  className="hover:text-primary transition-colors flex items-center gap-1 opacity-20 hover:opacity-100"
                >
                  <ShieldCheck size={14} /> Admin Access
                </button>
              ) */}
           </div>
        </div>
      </div>
    </footer>
  );
}
