// "use client"
// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef } from "react";
// import { Shield, Users, Award, TrendingUp } from "lucide-react";

// const features = [
//   {
//     icon: Shield,
//     title: "Trusted Expertise",
//     description: "Years of experience in real estate with a proven track record of successful transactions and satisfied clients."
//   },
//   {
//     icon: Users,
//     title: "Personalized Service",
//     description: "One-on-one consultation tailored to your specific needs, budget, and preferences for the perfect property match."
//   },
//   {
//     icon: Award,
//     title: "Curated Listings",
//     description: "Hand-picked properties across all categories - from open plots to luxury villas, ensuring quality and value."
//   },
//   {
//     icon: TrendingUp,
//     title: "Market Insights",
//     description: "Access to exclusive market data and trends to help you make informed investment decisions."
//   }
// ];

// const WhyChooseUsSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   };

//   return (
//     <section ref={ref} className="py-20 bg-gradient-to-br from-background to-secondary/20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6 tracking-tight leading-tight">
//             Why Choose 
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent font-semibold"> Sudha Realty</span>
//           </h2>
//           <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto font-light tracking-wide">
//             We're committed to providing exceptional service and building long-term relationships with our clients through trust, expertise, and results.
//           </p>
//         </motion.div>

//         <motion.div
//           className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//         >
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="group"
//               >
//                <div className="p-8 rounded-2xl shadow-elegant hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 h-full bg-gradient-to-br from-background to-indigo-50/50 border border-indigo-100 hover:border-indigo-200">
//                 <div className="mb-6">
//                     <div className="w-16 h-16 bg-indigo-50/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                     <Icon className="w-8 h-8 text-indigo-600" />
//                     </div>
//                     <h3 className="text-xl font-medium text-foreground mb-3 tracking-wide">
//                     {feature.title}
//                     </h3>
//                     <p className="text-muted-foreground leading-relaxed font-light tracking-wide">
//                     {feature.description}
//                     </p>
//                 </div>
//                 </div>

//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUsSection;


"use client"
import { Shield, Users, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Shield,
    title: "Legal Peace of Mind",
    description: "Every property comes with thorough documentation review and clear title verification, protecting your investment from future disputes."
  },
  {
    icon: Users,
    title: "Network That Works",
    description: "Leverage our extensive connections with builders, developers, and property owners for opportunities before they hit the market."
  },
  {
    icon: Award,
    title: "No Hidden Surprises",
    description: "Transparent dealings with upfront pricing, honest property assessments, and full disclosure of all costs involved."
  },
  {
    icon: TrendingUp,
    title: "ROI-Focused Approach",
    description: "Strategic location analysis and growth projections to ensure your property appreciates in value over time."
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50/30 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          
          
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
            Your Success Is{" "}
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent font-semibold">
              Our Priority
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto font-light">
            More than just transactions—we build lasting partnerships through integrity, local expertise, and genuine commitment to your property goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 lg:p-10">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                Ready to Make Your Property Decision?
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Join hundreds of satisfied clients who found their dream properties with professional guidance. 
                Let's discuss your requirements and find the perfect match for your investment goals.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a href="/properties">
                <button className="w-full px-6 py-3.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  Explore Properties
                  <TrendingUp className="w-5 h-5" />
                </button>
              </a>
              <Link href="/book-appointment">
                <button className="w-full px-6 py-3.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  Book Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;