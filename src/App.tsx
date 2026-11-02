/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import Tools from './components/Tools';
import Blog from './components/Blog';
import BlogEditor from './components/BlogEditor';
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Careers from './components/Careers';
import JobDetails from './components/JobDetails';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import QuoteModal from './components/QuoteModal';
import { NotFound, Forbidden, NotImplemented, ServerError } from './components/ErrorPages';

// Public Identity Portal Components
import PortalHome from './components/portal/PortalHome';
import BusinessCardsPage from './components/portal/BusinessCardsPage';
import BrochuresPage from './components/portal/BrochuresPage';
import ProfilesPage from './components/portal/ProfilesPage';
import DirectVisitingCard from './components/portal/DirectVisitingCard';

function ScrollToAnchor() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash, location.key]);

  return null;
}

function SPAQueryRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const goto = params.get('goto');
    if (goto) {
      window.history.replaceState(null, '', goto);
      navigate(goto, { replace: true });
    }
  }, [navigate]);

  return null;
}

function CorporateLayout({
  children,
  onOpenQuote
}: {
  children: ReactNode;
  onOpenQuote: () => void;
}) {
  return (
    <>
      <Navbar onOpenQuote={onOpenQuote} />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}

function MainLandingPage({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <CorporateLayout onOpenQuote={onOpenQuote}>
      <Hero onOpenQuote={onOpenQuote} />
      <Tools />
      <About />
      <Services />
      <Portfolio />
      <Sectors />
      <WhyChooseUs />
      <Contact />
    </CorporateLayout>
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
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <ScrollToAnchor />
            <SPAQueryRouter />
            <div className="min-h-screen bg-bg-base text-text-base selection:bg-primary selection:text-[#0a0f1e]">
              <CustomCursor />
              
              <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left shadow-[0_0_15px_#00c9a7]"
                style={{ scaleX }}
              />

              <Routes>
                {/* Main Corporate Landing Page (Default on open) */}
                <Route path="/" element={<MainLandingPage onOpenQuote={() => setIsQuoteModalOpen(true)} />} />
                <Route path="/company" element={<MainLandingPage onOpenQuote={() => setIsQuoteModalOpen(true)} />} />
                <Route path="/about" element={<Navigate to="/#about" replace />} />
                <Route path="/services" element={<Navigate to="/#services" replace />} />
                <Route path="/portfolio" element={<Navigate to="/#portfolio" replace />} />
                <Route path="/contact" element={<Navigate to="/#contact" replace />} />

                {/* Official Public Identity Portal Routes (Direct URLs for Browser Address Bar & QR Scanning) */}
                <Route path="/portal" element={<PortalHome />} />
                <Route path="/identity" element={<PortalHome />} />
                <Route path="/id-portal" element={<PortalHome />} />
                <Route path="/client-portal" element={<PortalHome />} />
                <Route path="/identity-portal" element={<PortalHome />} />
                <Route path="/portal/identity" element={<PortalHome />} />
                <Route path="/portal/home" element={<PortalHome />} />
                <Route path="/qr" element={<PortalHome />} />

                {/* Business Cards & Visiting Cards Public Routes (Index & Individual Personnel Links) */}
                <Route path="/business-cards" element={<BusinessCardsPage />} />
                <Route path="/business-card" element={<BusinessCardsPage />} />
                <Route path="/cards" element={<BusinessCardsPage />} />
                <Route path="/visiting-cards" element={<BusinessCardsPage />} />
                <Route path="/visitingcards" element={<BusinessCardsPage />} />
                <Route path="/card" element={<DirectVisitingCard />} />
                <Route path="/card/:id" element={<DirectVisitingCard />} />
                <Route path="/cards/:id" element={<DirectVisitingCard />} />
                <Route path="/card/ceo" element={<DirectVisitingCard defaultCardId="sidra-tul-muntaha" />} />
                <Route path="/card/coo" element={<DirectVisitingCard defaultCardId="mehtab-ahmed" />} />
                <Route path="/visiting-card" element={<DirectVisitingCard />} />
                <Route path="/visitingcard" element={<DirectVisitingCard />} />
                <Route path="/visiting-card/:id" element={<DirectVisitingCard />} />
                <Route path="/visitingcards/:id" element={<DirectVisitingCard />} />
                <Route path="/visitingcard/:id" element={<DirectVisitingCard />} />
                <Route path="/business-card/:id" element={<DirectVisitingCard />} />
                <Route path="/business-cards/:id" element={<DirectVisitingCard />} />
                <Route path="/vcard" element={<DirectVisitingCard />} />
                <Route path="/vcard/:id" element={<DirectVisitingCard />} />
                <Route path="/vcards" element={<BusinessCardsPage />} />

                {/* Brochures Public Direct URLs (Including typo tolerance like /brouchure, /borcher and item :id like careers) */}
                <Route path="/brochures" element={<BrochuresPage />} />
                <Route path="/brochure" element={<BrochuresPage />} />
                <Route path="/brochure/:id" element={<BrochuresPage />} />
                <Route path="/brochures/:id" element={<BrochuresPage />} />
                <Route path="/brouchure" element={<BrochuresPage />} />
                <Route path="/brouchures" element={<BrochuresPage />} />
                <Route path="/borcher" element={<BrochuresPage />} />
                <Route path="/borchure" element={<BrochuresPage />} />
                <Route path="/corporate/brochure" element={<BrochuresPage />} />
                <Route path="/corporate-brochure" element={<BrochuresPage />} />
                <Route path="/catalog" element={<BrochuresPage />} />
                <Route path="/brochure/widespread" element={<BrochuresPage />} />
                <Route path="/brochures/widespread" element={<BrochuresPage />} />

                {/* Profiles & Corporate Profiles Public Direct URLs (Including typo tolerance like /porfile, /porfiles and item :id like careers) */}
                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/profile" element={<ProfilesPage />} />
                <Route path="/profile/:id" element={<ProfilesPage />} />
                <Route path="/profiles/:id" element={<ProfilesPage />} />
                <Route path="/porfile" element={<ProfilesPage />} />
                <Route path="/porfiles" element={<ProfilesPage />} />
                <Route path="/corporate/profile" element={<ProfilesPage />} />
                <Route path="/corporate/profie" element={<ProfilesPage />} />
                <Route path="/corporate-profile" element={<ProfilesPage />} />
                <Route path="/company-profile" element={<ProfilesPage />} />
                <Route path="/profile/widespread" element={<ProfilesPage />} />
                <Route path="/profiles/widespread" element={<ProfilesPage />} />

                {/* Subpages with Corporate Header & Footer */}
                <Route 
                  path="/blog" 
                  element={
                    <CorporateLayout onOpenQuote={() => setIsQuoteModalOpen(true)}>
                      <div className="pt-20"><Blog /></div>
                    </CorporateLayout>
                  } 
                />
                <Route 
                  path="/blog/:slug" 
                  element={
                    <CorporateLayout onOpenQuote={() => setIsQuoteModalOpen(true)}>
                      <div className="pt-20"><BlogPost /></div>
                    </CorporateLayout>
                  } 
                />
                <Route 
                  path="/careers" 
                  element={
                    <CorporateLayout onOpenQuote={() => setIsQuoteModalOpen(true)}>
                      <div className="pt-20"><Careers /></div>
                    </CorporateLayout>
                  } 
                />
                <Route 
                  path="/careers/:jobId" 
                  element={
                    <CorporateLayout onOpenQuote={() => setIsQuoteModalOpen(true)}>
                      <div className="pt-20"><JobDetails /></div>
                    </CorporateLayout>
                  } 
                />
                <Route path="/internship" element={<Navigate to="/careers" replace />} />
                <Route 
                  path="/privacy" 
                  element={
                    <CorporateLayout onOpenQuote={() => setIsQuoteModalOpen(true)}>
                      <div className="pt-20"><PrivacyPolicy /></div>
                    </CorporateLayout>
                  } 
                />
                <Route 
                  path="/terms" 
                  element={
                    <CorporateLayout onOpenQuote={() => setIsQuoteModalOpen(true)}>
                      <div className="pt-20"><TermsOfService /></div>
                    </CorporateLayout>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <CorporateLayout onOpenQuote={() => setIsQuoteModalOpen(true)}>
                        <div className="pt-20"><BlogEditor /></div>
                      </CorporateLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route path="/404" element={<NotFound />} />
                <Route path="/403" element={<Forbidden />} />
                <Route path="/501" element={<NotImplemented />} />
                <Route path="/500" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-4 bg-primary text-[#0a0f1e] rounded-full shadow-[0_10px_25px_rgba(0,201,167,0.3)] z-40 transition-all duration-300 ${
                  showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} />
              </button>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </UserProvider>
  );
}
