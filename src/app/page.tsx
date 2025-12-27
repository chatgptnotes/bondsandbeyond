
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import ServiceGrid from '@/components/ui/ServiceGrid';
import TargetClients from '@/components/ui/TargetClients';
import SiteVisitBanner from '@/components/ui/SiteVisitBanner';
import FounderSection from '@/components/ui/FounderSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServiceGrid />
      <TargetClients />
      <SiteVisitBanner />
      <FounderSection />
      <Footer />
    </main>
  );
}
