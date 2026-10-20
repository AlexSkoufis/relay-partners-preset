import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Why from "@/components/home/Why";
import Services from "@/components/home/Services";
import Paths from "@/components/home/Paths";
import Process from "@/components/home/Process";
import Journey from "@/components/home/Journey";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import Ebook from "@/components/home/Ebook";
import Faq from "@/components/home/Faq";
import ContactCta from "@/components/home/ContactCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Why />
        <Services />
        <Paths />
        <Process />
        <Journey />
        <Team />
        <Testimonials />
        <Ebook />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
