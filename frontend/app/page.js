import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdriannaWelcome from './components/AdriannaWelcome';
import Categories from './components/Categories';
import MainServicesShowcase from './components/MainServicesShowcase';
import TeleprompterExpert from './components/TeleprompterExpert';
import ThreePhotoStrip from './components/ThreePhotoStrip';
import EarthyMosaic from './components/EarthyMosaic';
import NewsletterStrip from './components/NewsletterStrip';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Full-screen Studio Setup Hero Banner */}
        <Hero />

        {/* 2. Editorial Welcome text block */}
        <AdriannaWelcome />

        {/* 3. 4-column Category Product Grid */}
        <Categories />

        {/* 4. Homepage Main Services Cards Showcase */}
        <MainServicesShowcase />

        {/* 5. Teleprompter Specialist Feature Showcase (Najeeb Abdul Noor) */}
        <TeleprompterExpert />

        {/* 6. 3-Column Photo Strip */}
        <ThreePhotoStrip />

        {/* 7. 2x2 Terracotta/Sage Split Mosaic */}
        <EarthyMosaic />

        {/* 8. Newsletter Subscription Strip */}
        <NewsletterStrip />
      </main>

      {/* 9. Dark Footer */}
      <Footer />
    </>
  );
}
