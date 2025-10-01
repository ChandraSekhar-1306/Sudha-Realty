"use client"
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Property Investor",
    content: "Sudha Realty helped me find the perfect investment property. Their market insights and personalized service made the entire process seamless. Highly recommended!",
    rating: 4
  },
  {
    name: "Priya Sharma",
    role: "First-time Homebuyer",
    content: "As a first-time buyer, I was nervous about the process. The team at Sudha Realty guided me every step of the way and found me my dream apartment within budget.",
    rating: 5
  },
  {
    name: "Amit Patel",
    role: "Farmland Owner",
    content: "Excellent service for farmland acquisition. They understood exactly what I was looking for and presented options that matched my requirements perfectly.",
    rating: 5
  },
  {
    name: "Sneha Reddy",
    role: "Villa Buyer",
    content: "The consultation service was outstanding. They took time to understand our family's needs and found us a beautiful villa in the perfect location.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground">
            What Our 
            <span className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 bg-clip-text text-transparent"> Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Sudha Realty.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main testimonial card */}
            <div className="card-gradient p-8 lg:p-12 rounded-3xl shadow-elegant text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl lg:text-2xl text-foreground mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div className="space-y-2">
                <div className="text-lg font-semibold text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-indigo-700 font-medium">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-smooth ${
                      index === currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;