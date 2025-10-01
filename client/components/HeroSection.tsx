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




"use client";
import { Calendar, Search, TrendingUp, Home, MapPin } from "lucide-react";
import Link from "next/link";


const Hero = () => {
  

  return (
    
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pt-22">
     
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating property icons */}
        <div className="absolute top-32 left-20 opacity-10 animate-float">
          <Home className="w-16 h-16 text-indigo-600" />
        </div>
        <div className="absolute top-40 right-32 opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>
          <MapPin className="w-12 h-12 text-purple-600" />
        </div>
        <div className="absolute bottom-40 left-32 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <TrendingUp className="w-14 h-14 text-indigo-600" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          
        

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Find Your
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold mt-2">
              Dream Property
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-normal tracking-wide">
            Professional real estate expertise with personalized consultations.
            Book appointments with our expert or explore premium properties
            tailored to your needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href={"/book-appointment"}>
            <button
             
              className="min-w-[260px] px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-base tracking-wide rounded-xl shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Book Consultation
            </button>
            </Link>

              <Link href={"/properties"}>
            <button
             
              className="min-w-[260px] px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base tracking-wide rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group border-2 border-slate-200 hover:border-indigo-300"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Explore Properties
            </button>
            </Link>
          </div>

   
        </div>
      </div>

     

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;