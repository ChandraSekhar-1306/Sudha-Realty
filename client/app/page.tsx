



import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";

import React from 'react'
import Navbar from "@/components/Navbar";
import ConsultationValue from "@/components/ConsultationValue";

export default function Home() {
  return (
     <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ConsultationValue />
      <WhyChooseUsSection />
     
      <Footer />
    </div>
  )
}

