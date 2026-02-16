import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FloatingParticles } from './components/FloatingParticles';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AdmissionPopup } from './components/AdmissionPopup';
import { PageTransition } from './components/PageTransition';
import { DevToolsBlocker } from './components/DevToolsBlocker';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { FacilityDetailPage } from './pages/FacilityDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { MissionPage } from './pages/MissionPage';
import { VisionPage } from './pages/VisionPage';
import { ValuesPage } from './pages/ValuesPage';
import { DiversityPage } from './pages/DiversityPage';

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;

    if (hash) {
      const targetId = hash.replace('#', '');

      // Wait a tick so the destination section exists before scrolling
      requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        // Fallback: if target not found, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

const AppShell = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFacilityDetail = location.pathname.startsWith('/facilities/') && location.pathname !== '/facilities';

  return (
    <>
      <DevToolsBlocker />
      <ScrollToSection />
      <AdmissionPopup />
      <PageTransition />
      <div className={`relative min-h-screen ${isFacilityDetail ? 'bg-white' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
        {!isFacilityDetail && <FloatingParticles />}

        <Navigation 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/facilities/:facilityId" element={<FacilityDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/videos" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/values" element={<ValuesPage />} />
          <Route path="/diversity" element={<DiversityPage />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
