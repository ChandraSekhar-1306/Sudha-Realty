// "use client";
// import { Button } from "@/components/ui/button";
// import { Calendar, Phone, Search } from "lucide-react";
// import heroBackground from "@/public/bg5.png";

// const Hero = () => {
//   const handleBooking = () => {
//     document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleExploreProperties = () => {
//     document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `url(${heroBackground.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       ></div>

//       {/* Dark Overlay for Better Contrast */}
//       {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div> */}

//       {/* Hero Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="animate-fade-in-up">
//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl tracking-tight">
//             Find Your
//             <span className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2">
//               Dream Property
//             </span>
//           </h1>

//           <p className="text-lg md:text-xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-xl font-light tracking-wide">
//             Professional real estate expertise with personalized consultations.
//             Book appointments with our experts or explore premium properties
//             tailored to your needs.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
//             <button
//               onClick={handleBooking}
//               className="min-w-[260px] px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base tracking-wide rounded-lg shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center gap-3 group border border-indigo-500/50"
//             >
//               <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
//               Book Free Consultation
//             </button>

//             <button
//               onClick={handleExploreProperties}
//               className="min-w-[260px] px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-base tracking-wide rounded-lg backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group border border-white/30 hover:border-white/50"
//             >
//               <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
//               Explore Properties
//             </button>
//           </div>

//           {/* Trust Indicators */}
         
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
//         <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center shadow-lg">
//           <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




// "use client";
// import { Calendar, Search, TrendingUp, Home, MapPin } from "lucide-react";
// import Link from "next/link";


// const Hero = () => {
  

//   return (
    
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pt-22">
     
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Large gradient orbs */}
//         <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
//         {/* Floating property icons */}
//         <div className="absolute top-32 left-20 opacity-10 animate-float">
//           <Home className="w-16 h-16 text-indigo-600" />
//         </div>
//         <div className="absolute top-40 right-32 opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>
//           <MapPin className="w-12 h-12 text-purple-600" />
//         </div>
//         <div className="absolute bottom-40 left-32 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
//           <TrendingUp className="w-14 h-14 text-indigo-600" />
//         </div>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="animate-fade-in-up">
          
        

//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
//             Find Your
//             <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold mt-2">
//               Dream Property
//             </span>
//           </h1>

//           <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-normal tracking-wide">
//             Professional real estate expertise with personalized consultations.
//             Book appointments with our expert or explore premium properties
//             tailored to your needs.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
//             <Link href={"/properties"}>
//             <button
             
//               className="min-w-[260px] px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-base tracking-wide rounded-xl shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-3 group"
//             >
//               <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
//               Explore Properties
//             </button>
//             </Link>

             
//           </div>

   
//         </div>
//       </div>

     

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;

"use client";
import { Search, Building, Wind, LandPlot, Home, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const SearchButton = ({ type }: { type: 'Curated' | 'Community' }) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-6">
    <div className="relative flex-1 w-full group">
      <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400 transition-colors group-hover:text-indigo-600" />
      <Input
        placeholder={type === 'Curated' ? "Search city, locality, project..." : "Explore community listings..."}
        className="w-full bg-white/95 backdrop-blur-sm text-slate-800 border-2 border-indigo-100 pl-12 sm:pl-14 h-14 sm:h-16 text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-100/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all"
      />
    </div>
    <Link href="/properties">
    <Button 
      size="lg" 
      className="h-14 sm:h-16 text-white px-8 sm:px-10 rounded-xl sm:rounded-2xl w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-300/50 hover:shadow-2xl hover:shadow-indigo-400/60 transition-all duration-300 font-semibold text-base sm:text-lg"
    >
      Search
    </Button>
    </Link>
  </div>
);

const PropertyTypeButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <Button 
    variant="outline" 
    className="h-20 sm:h-24 flex-col gap-1.5 sm:gap-2 justify-center bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-indigo-500 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group rounded-lg sm:rounded-xl active:scale-95"
  >
    <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50 group-hover:bg-indigo-50 transition-all">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 group-hover:text-indigo-600 group-hover:scale-110 transition-all" />
    </div>
    <span className="font-medium text-xs sm:text-sm text-slate-700 group-hover:text-slate-900">{label}</span>
  </Button>
);

const CuratedSearchContent = () => (
  <div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-2">
      <PropertyTypeButton icon={Building} label="Apartments" />
      <PropertyTypeButton icon={Home} label="Villas" />
      <PropertyTypeButton icon={Wind} label="Farmland" />
      <PropertyTypeButton icon={LandPlot} label="Open Plots" />
    </div>
    <SearchButton type="Curated" />
  </div>
);

const Hero = () => {
  const [activeTab, setActiveTab] = useState("curated");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient - Optimized for mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Animated Orbs - Smaller on mobile */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative Grid Pattern - Less prominent on mobile */}
      <div className="absolute inset-0 opacity-[0.01] sm:opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Heading with Floating Badge - Mobile optimized */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
              <span className="text-slate-900">Discover Your</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block animate-gradient">
                Perfect Space
              </span>
            </h1>
           
           <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4 leading-relaxed">
              Professional real estate expertise with personalized consultations.
              <br className="hidden sm:block" />
              <span className="text-slate-500 block sm:inline mt-1 sm:mt-0">Book appointments with our expert or explore premium properties tailored to your needs.</span>
            </p>
          </div>

          {/* Search Container with Glass Effect - Mobile optimized */}
          <Card className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border-2 border-white/60 shadow-2xl shadow-indigo-200/50 rounded-2xl sm:rounded-3xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <Tabs defaultValue="curated" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14 bg-slate-100 rounded-xl sm:rounded-2xl p-1 mb-1 sm:mb-2">
                  <TabsTrigger 
                    value="curated" 
                    className="h-full text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
                  >
                    <span className="hidden xs:inline"> </span>Curated<span className="hidden sm:inline"> Listings</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="community" 
                    className="h-full text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
                  >
                    <span className="hidden xs:inline"> </span>Community<span className="hidden sm:inline"> Platform</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="curated" className="mt-4 sm:mt-6">
                  <CuratedSearchContent />
                </TabsContent>
                
                <TabsContent value="community" className="mt-4 sm:mt-6">
                  <SearchButton type="Community" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

         
         
        
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;