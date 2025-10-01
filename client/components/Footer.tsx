// "use client";
// import { motion } from "framer-motion";
// import { Mail, Phone } from "lucide-react";
// import Image from "next/image";

// const Footer = () => {
//   const navigationLinks = [
//     { name: "Home", href: "#home" },
//     { name: "About", href: "#about" },
//     { name: "Properties", href: "/properties" },
   
//   ];

//   return (
//     <footer className="bg-muted text-foreground pt-12">
//       {/* Top label line */}
//       {/* <div className="border-[0.3px] border-indigo-400 bg-indigo-400 text-center pb-4 mb-8">
       
//       </div> */}

//       <div className="container mx-auto px-6">
//         <motion.div
//           className="grid md:grid-cols-3 gap-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           {/* Brand */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Image 
//                 src="/logofinal1.png" 
//                 alt="Logo" 
//                 width={170} 
//                 height={150} 
//                 className="object-contain"
//               />
              
//             </div>
//             <p className="text-sm text-muted-foreground leading-relaxed">
//               Your trusted partner in real estate. Expert consultation and curated
//               property listings tailored to your needs.
//             </p>
//           </div>

//           {/* Navigation */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700">
//               Quick Links
//             </h3>
//             <nav className="space-y-2">
//               {navigationLinks.map((link, index) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.href}
//                   className="block text-muted-foreground hover:text-indigo-600 transition-all hover:translate-x-1"
//                   initial={{ opacity: 0, x: 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   {link.name}
//                 </motion.a>
//               ))}
//             </nav>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700">
//               Get in Touch
//             </h3>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li className="flex items-center gap-2">
//                 <Mail className="w-4 h-4 text-indigo-500" />
//                 <a
//                   href="mailto:admin@sudharealty.in"
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   admin@sudharealty.in
//                 </a>
//               </li>
//               <li className="flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-indigo-500" />
//                 <a
//                   href="tel:+9381303558"
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   +91 93813 03558
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </motion.div>

//         {/* Bottom note */}
//        <motion.div
//             className="mt-8 pt-6 mb-2  text-center text-sm font-medium text-black"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: true }}
//           >
//             © 2025 <span className="">Sudha Realty</span>.  
//             All rights reserved.
//         </motion.div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;



"use client";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigationLinks = [
   
    { name: "About", href: "#about" },
    { name: "Properties", href: "/properties" },
    { name: "How It Works", href: "#how-to-use" },
  ];

  return (
    <footer className="relative bg-white">
      {/* Decorative top border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className={`grid md:grid-cols-3 gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Image 
                src="/logofinal1.png" 
                alt="Logo" 
                width={170} 
                height={150} 
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted partner in real estate. Expert consultation and curated
              property listings tailored to your needs.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span>Hyderabad, Telangana</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-600"></span>
            </h3>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:translate-x-2 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-600"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:admin@sudharealty.in"
                  className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium">admin@sudharealty.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919381303558"
                  className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Phone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium">+91 93813 03558</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} <span className="font-semibold text-gray-900">Sudha Realty</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;