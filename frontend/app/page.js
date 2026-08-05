import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdriannaWelcome from './components/AdriannaWelcome';
import SchoolPhotography from './components/SchoolPhotography';
import Categories from './components/Categories';
import TeleprompterExpert from './components/TeleprompterExpert';
import ThreePhotoStrip from './components/ThreePhotoStrip';
import EarthyMosaic from './components/EarthyMosaic';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeLoader from './components/WelcomeLoader';

export default function Home() {
  return (
    <>
      {/* 0. Luxury Opening Welcome Screen Curtain */}
      <WelcomeLoader />

      <Navbar />
      <main>
        {/* 1. Full-screen Studio Setup Hero Banner */}
        <Hero />

        {/* 2. Editorial Welcome / About text block */}
        <AdriannaWelcome />

        {/* 3. School & Educational Photography */}
        <SchoolPhotography />

        {/* 4. 4-column Category Product Grid */}
        <Categories />

        {/* 5. Teleprompter Specialist Feature Showcase (Najeeb Abdul Noor) */}
        <TeleprompterExpert />

        {/* 6. 3-Column Photo Strip (2.5s Smooth Rotating Slideshow) */}
        <ThreePhotoStrip />

        {/* 7. 2x2 Terracotta/Sage Split Mosaic */}
        <EarthyMosaic />

        {/* 8. Contact & Reach Out Section */}
        <Contact />
      </main>

      {/* 9. Dark Footer */}
      <Footer />
    </>
  );
}
