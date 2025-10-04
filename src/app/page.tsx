import { AboutSection } from '@/components/landing/AboutSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { ExpectedOutcomeSection } from '@/components/landing/ExpectedOutcomeSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { TechnicalFeasibilitySection } from '@/components/landing/TechnicalFeasibilitySection';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <Separator className="my-12 md:my-20" />
      <FeaturesSection />
      <Separator className="my-12 md:my-20" />
      <ExpectedOutcomeSection />
      <Separator className="my-12 md:my-20" />
      <TechnicalFeasibilitySection />
      <Separator className="my-12 md:my-20" />
      <ContactSection />
    </div>
  );
}
