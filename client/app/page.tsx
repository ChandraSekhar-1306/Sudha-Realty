



import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";

import React from 'react'
import HowToUseSection from "@/components/HowToUse";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
     <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <HowToUseSection/>    
      <Footer />
    </div>
  )
}

