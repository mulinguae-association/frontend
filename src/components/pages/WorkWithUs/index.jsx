import CommitmentSection from "./sections/CommitmentSection";
import CTASection from "./sections/CTASection";
import HeroSection from "./sections/HeroSection";
import MissionSection from "./sections/MissionSection";
import PartnerCallout from "./sections/PartnerCallout";
import PartnershipSection from "./sections/PartnershipSection";
import ValuesGrid from "./sections/ValuesGrid";

const WorkWithUs = () => {
  return (
    <main>
      <HeroSection />
      <div className="divider"></div>
      <MissionSection />
      <ValuesGrid />
      <CommitmentSection />
      <PartnershipSection />
      <PartnerCallout />
      <CTASection />
    </main>
  );
};

export default WorkWithUs;
