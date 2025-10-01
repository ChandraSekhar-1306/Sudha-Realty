// "use client";
// import { Building2, Menu, X } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//       setMobileMenuOpen(false);
//     }
//   };

//   const navLinks = [
//     { label: "About Us", href: "about" },
//     { label: "List Your Property", href: "/listing" },
//     { label: "How It Works", href: "how-to-use" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div 
//             className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" 
//             onClick={() => scrollToSection("hero")}
//           >
//            <Image 
//               src="/logofinal1.png" 
//               alt="Logo" 
//               width={170} 
//               height={150} 
//               className="object-contain"
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <button
//                 key={link.label}
//                 onClick={() => scrollToSection(link.href)}
//                 className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors relative group"
//               >
//                 {link.label}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
//               </button>
//             ))}
//           </div>

//           {/* Desktop CTA Button */}
//           <div className="hidden md:block">
//             <button 
//               onClick={() => scrollToSection("contact")}
//               className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
//             >
//               Get Started
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200">
//             <div className="flex flex-col gap-3">
//               {navLinks.map((link) => (
//                 <button
//                   key={link.label}
//                   onClick={() => scrollToSection(link.href)}
//                   className="text-left text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors px-4 py-2.5 rounded-lg"
//                 >
//                   {link.label}
//                 </button>
//               ))}
//               <button 
//                 onClick={() => scrollToSection("contact")}
//                 className="w-full mt-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
//               >
//                 Get Started
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "About Us", href: "about", type: "section" },
    { label: "How It Works", href: "how-to-use", type: "section" },
    { label: "Community Platform", href: "/listing", type: "page" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            onClick={() => scrollToSection("hero")}
          >
            <Link href={"/"}>
            <Image
              src="/logofinal1.png"
              alt="Logo"
              width={220}
              height={200}
              className="object-contain"
            />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === "page" ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
                </button>
              )
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/auth">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) =>
                link.type === "page" ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-left text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors px-4 py-2.5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors px-4 py-2.5 rounded-lg"
                  >
                    {link.label}
                  </button>
                )
              )}

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
