import EmailCapture from "./EmailCapture";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import FeaturesCont from "./FeaturesCont";
import CTA from "./CTA";

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesCont />
      <CTA />
      <EmailCapture />
      <Footer />
    </>
  );
}

export default LandingPage;
