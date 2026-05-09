/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { UserProvider } from './lib/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Sectors from './components/Sectors';
import WhyChooseUs from './components/WhyChooseUs';
import Team from './components/Team';
import Tools from './components/Tools';
import Blog from './components/Blog';
import BlogEditor from './components/BlogEditor';
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import QuoteModal from './components/QuoteModal';

function MainLandingPage({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <>
      <Hero onOpenQuote={onOpenQuote} />
      <Tools />
      <About />
      <Services />
      <Portfolio />
      <Sectors />
      <WhyChooseUs />
      {/* <Team /> */}
      <Contact />
    </>
  );
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-bg-base text-text-base selection:bg-primary selection:text-[#0a0f1e]">
            <CustomCursor />
            
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left shadow-[0_0_15px_#00c9a7]"
              style={{ scaleX }}
            />

            <Navbar onOpenQuote={() => setIsQuoteModalOpen(true)} />
            
            <Routes>
              <Route path="/" element={<MainLandingPage onOpenQuote={() => setIsQuoteModalOpen(true)} />} />
              <Route path="/services" element={<Blog />} />
              <Route path="/services/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <BlogEditor />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />

            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className={`fixed bottom-8 right-8 p-4 bg-primary text-[#0a0f1e] rounded-full shadow-[0_10px_25px_rgba(0,201,167,0.3)] z-40 transition-all duration-300 ${
                showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
              }`}
            >
              <ArrowUp size={24} />
            </button>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
}
