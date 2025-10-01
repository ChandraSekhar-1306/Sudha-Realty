"use client"
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Users, Award, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    description: "Years of experience in real estate with a proven track record of successful transactions and satisfied clients."
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "One-on-one consultation tailored to your specific needs, budget, and preferences for the perfect property match."
  },
  {
    icon: Award,
    title: "Curated Listings",
    description: "Hand-picked properties across all categories - from open plots to luxury villas, ensuring quality and value."
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Access to exclusive market data and trends to help you make informed investment decisions."
  }
];

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6 tracking-tight leading-tight">
            Why Choose 
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent font-semibold"> Sudha Realty</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto font-light tracking-wide">
            We're committed to providing exceptional service and building long-term relationships with our clients through trust, expertise, and results.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
               <div className="p-8 rounded-2xl shadow-elegant hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 h-full bg-gradient-to-br from-background to-indigo-50/50 border border-indigo-100 hover:border-indigo-200">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-indigo-50/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground mb-3 tracking-wide">
                    {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light tracking-wide">
                    {feature.description}
                    </p>
                </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;