// "use client";
// import { Mail, Phone, MapPin, Building2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// const Footer = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const navigationLinks = [
   
//     { name: "About", href: "#about" },
//     { name: "Properties", href: "/properties" },
//     { name: "How It Works", href: "#how-to-use" },
//   ];

//   return (
//     <footer className="relative bg-white">
//       {/* Decorative top border */}
//       <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
      
//       <div className="container mx-auto px-6 py-12">
//         <div className={`grid md:grid-cols-3 gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
//           {/* Brand Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 mb-4">
//                 <Image 
//                 src="/logofinal1.png" 
//                 alt="Logo" 
//                 width={170} 
//                 height={150} 
//                 className="object-contain"
//               />
//             </div>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               Your trusted partner in real estate. Expert consultation and curated
//               property listings tailored to your needs.
//             </p>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <MapPin className="w-4 h-4 text-indigo-500" />
//               <span>Hyderabad, Telangana</span>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 mb-4 relative inline-block">
//               Quick Links
//               <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-600"></span>
//             </h3>
//             <nav className="space-y-3">
//               {navigationLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className="block text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:translate-x-2 text-sm font-medium"
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </nav>
//           </div>

//           {/* Contact Section */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 mb-4 relative inline-block">
//               Get in Touch
//               <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-600"></span>
//             </h3>
//             <ul className="space-y-4">
//               <li>
//                 <a
//                   href="mailto:admin@sudharealty.in"
//                   className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
//                 >
//                   <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
//                     <Mail className="w-5 h-5 text-indigo-600" />
//                   </div>
//                   <span className="text-sm font-medium">admin@sudharealty.in</span>
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="tel:+919381303558"
//                   className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
//                 >
//                   <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
//                     <Phone className="w-5 h-5 text-indigo-600" />
//                   </div>
//                   <span className="text-sm font-medium">+91 93813 03558</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-12 pt-8 border-t border-gray-200">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-gray-600">
//               © {new Date().getFullYear()} <span className="font-semibold text-gray-900">Sudha Realty</span>. All rights reserved.
//             </p>
//             <div className="flex gap-6 text-sm text-gray-600">
//               <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
//               <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client";
import { Mail, Phone, MapPin } from "lucide-react";
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
    { name: "Community Platofrm", href: "/listing" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      {/* Decorative top border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid md:grid-cols-3 gap-12 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="mb-6">
              <Image 
                src="/logofinal1.png" 
                alt="Sudha Realty Logo" 
                width={170} 
                height={150} 
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 leading-relaxed font-light text-sm">
              Your trusted partner in real estate. Expert consultation and curated property listings tailored to your needs.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="font-light">Hyderabad, Telangana</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 tracking-wide">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:translate-x-1 text-sm font-light"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 tracking-wide">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:admin@sudharealty.in"
                  className="flex items-start gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-all duration-300 border border-gray-200 group-hover:border-indigo-200 flex-shrink-0">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="pt-1.5">
                    <span className="text-sm font-light block">admin@sudharealty.in</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919381303558"
                  className="flex items-start gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-all duration-300 border border-gray-200 group-hover:border-indigo-200 flex-shrink-0">
                    <Phone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="pt-1.5">
                    <span className="text-sm font-light block">+91 93813 03558</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 font-light">
              © {new Date().getFullYear()} <span className="font-medium text-gray-900">Sudha Realty</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600 font-light">
              <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <span className="text-gray-300">•</span>
              <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;