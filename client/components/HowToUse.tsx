"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Home, Heart, MessageSquare, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const HowToUseSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      icon: CreditCard,
      title: "Book a Consultation",
      description: "Fill out the form, pay the booking fee, and get your meeting link via email after approval.",
      highlights: ["Easy form", "Secure payment", "Email confirmation"],
      image: "/howtouse/pic1.png"
    },
    {
      number: "02", 
      icon: Home,
      title: "Browse Properties",
      description: "Explore curated listings from open plots to luxury villas across multiple categories.",
      highlights: ["Curated listings", "Multiple categories", "Quality properties"],
      image: "/howtouse/pic2.png"
    },
    {
      number: "03",
      icon: Heart,
      title: "Save Favorites",
      description: "Add properties to favorites and access them easily from your personalized dashboard.",
      highlights: ["Quick save", "Dashboard access", "Easy management"],
      image: "/howtouse/pic3.png"
    },
    {
      number: "04",
      icon: MessageSquare,
      title: "Inquire with Ease",
      description: "Send queries with one click and get email updates when admin responds.",
      highlights: ["One-click inquiry", "Email updates", "Direct communication"],
      image: "/howtouse/pic4.png"
    }
  ];

  const nextStep = () => setActiveStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <section id="how-to-use" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Get Started</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Four simple steps to find your perfect property
          </p>
        </div>

        {/* Main Interactive Card */}
        <Card className="bg-white shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            
            {/* Top: Image Section with Fixed Height */}
            <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full max-w-3xl mx-auto p-8">
                <Image 
                  src={steps[activeStep].image} 
                  alt={steps[activeStep].title}
                  fill
                  className="object-contain transition-all duration-500 ease-in-out"
                />
              </div>
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevStep}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <button 
                onClick={nextStep}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>

              {/* Step Counter */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-semibold text-slate-700">
                  {activeStep + 1} / {steps.length}
                </span>
              </div>
            </div>

            {/* Bottom: Content Section */}
            <div className="p-8">
              
              {/* Step Number & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {steps[activeStep].number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-slate-600">
                    {steps[activeStep].description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  {(() => {
                    const IconComponent = steps[activeStep].icon;
                    return <IconComponent className="w-6 h-6 text-indigo-600" />;
                  })()}
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3 mb-6">
                {steps[activeStep].highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Progress Dots */}
              <div className="flex gap-2 justify-center pt-4 border-t border-slate-100">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeStep 
                        ? 'w-8 bg-indigo-600' 
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-indigo-100">
            <CheckCircle className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <p className="font-semibold text-slate-900">Easy Booking</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-indigo-100">
            <CheckCircle className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <p className="font-semibold text-slate-900">Curated Listings</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-indigo-100">
            <CheckCircle className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <p className="font-semibold text-slate-900">Seamless Communication</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;