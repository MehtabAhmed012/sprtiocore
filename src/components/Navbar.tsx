import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useUser } from '../lib/UserContext';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Industries', href: '/#industries' },
  // { name: 'Team', href: '/#team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { role } = useUser();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-base/80 backdrop-blur-md border-b border-primary/20 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-lg group-hover:border-primary transition-colors duration-500" />
            <div className="absolute inset-[3px] border-2 border-primary rounded-md group-hover:shadow-[0_0_15px_rgba(0,201,167,0.5)] transition-all duration-500" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          </div>
          <span className="font-display text-[20px] font-black tracking-[3px] uppercase leading-none">
            SPATIO<span className="text-primary drop-shadow-[0_0_10px_rgba(0,201,167,0.3)]">CORE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[12px] font-semibold uppercase tracking-[1px] text-text-muted hover:text-text-base transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-[12px] font-semibold uppercase tracking-[1px] text-text-muted hover:text-text-base transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {role && location.pathname !== '/admin' && (
            <Link 
              to="/admin" 
              className="hidden lg:flex items-center gap-2 text-primary font-mono text-[10px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 px-3 py-1 rounded-full hover:bg-primary/20 transition-all"
            >
              <ShieldCheck size={14} /> Admin
            </Link>
          )}

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-primary" />}
          </button>
          
          <button 
            onClick={onOpenQuote}
            className="hidden sm:flex items-center gap-2 bg-accent hover:bg-accent/90 text-[#0a0f1e] px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(244,166,35,0.3)]"
          >
            Get a Quote <ArrowRight size={16} />
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-base"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-bg-base overflow-hidden z-40 border-t border-primary/10"
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-display font-medium hover:text-primary transition-colors text-text-base"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-display font-medium hover:text-primary transition-colors text-text-base"
                  >
                    {link.name}
                  </Link>
                )
              ))}

              {role && (
                <Link 
                  to="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-primary font-display text-2xl font-medium"
                >
                  <ShieldCheck size={24} /> Admin Console
                </Link>
              )}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="mt-8 bg-accent text-[#0a0f1e] px-8 py-4 rounded-full font-bold text-lg"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
