// 'use client';

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { RootState } from '../../store/store';
// import Image from 'next/image';
// import { createAppointment } from '../../store/appointmentSlice';
// import {
//   Calendar,
//   MessageSquare,
//   Heart,
//   Home,
//   LogOut,
//   User,
//   ChevronRight,
//   Clock,
//   CheckCircle,
//   Phone,
//   Mail,
//   FileText,
//   MapPin,
//   Shield,
//   Star,
//   Users,
//   AlertCircle,
//   Loader2,
//   Calendar1
// } from 'lucide-react';

// export default function BookAppointmentPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { isLoading, error } = useSelector((state: RootState) => state.appointments);
//   const { user, isLoading: authLoading } = useSelector((state: RootState) => state.auth);
  

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.replace('/auth');
//     }
//   }, [authLoading, user, router]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const [success, setSuccess] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await dispatch(createAppointment(formData) as any).unwrap();
//       setSuccess(true);
//       setFormData({ name: '', email: '', phone: '', message: '' });
//     } catch (error) {
//       console.error('Failed to book appointment:', error);
//     }
//   };
//    const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/");
//   };


//   // 🛑 Prevents flashing the form before auth is checked
//   if (authLoading || !user) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
//           <p className="text-slate-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
//           <div className="p-4">
//                                 <div className="flex items-center mb-1 mt-6 -ml-2">
//                                   {/* <Home className="w-8 h-8 text-blue-600" /> */}
//                                  <Image 
//                                     src="/logo.png" 
//                                     alt="Logo" 
//                                     width={90} 
//                                     height={90} 
//                                     className="object-contain"
//                                   />
//                                   <h1 className="text-xl font-bold text-slate-900 relative top-1 -ml-2">Sudha Realty</h1>
//                                 </div>
//                               </div>
//           <nav className="p-4 space-y-2">
//             <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Home className="w-4 h-4" />
//               <span>Dashboard</span>
//             </Link>
//             <Link href="/properties" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <MapPin className="w-4 h-4" />
//               <span>Properties</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <Link href="/my-inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <MessageSquare className="w-4 h-4" />
//               <span>My Inquiries</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <Link href="/book-appointment" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
//               <Calendar className="w-4 h-4" />
//               <span>Book Appointment</span>
//             </Link>
//             <Link href="/favorites" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Heart className="w-4 h-4" />
//               <span>Favorites</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//           <div className="border-t border-slate-200 mt-4 pt-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-100 transition-colors w-full text-left"
//           >
//             <LogOut className="w-4 h-4" />
//             <span>LogOut</span>
//           </button>
//         </div>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Header Section */}
//            <div className="mb-8">
//             <div className="flex items-center space-x-2 text-slate-600 mb-2">
//               <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
//               <ChevronRight className="w-4 h-4" />
//               <span className="text-slate-900 font-medium">Book Appointment</span>
//             </div>
//             <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
//               <Calendar className="w-8 h-8 text-blue-600" />
//               <span>Book Appointment</span>
//             </h1>
//             <p className="text-slate-600 mt-2">Schedule a consultation with our real estate advisor</p>
//           </div>

//           <div className="p-6">
//             <div className="max-w-4xl mx-auto">
//               {/* Success Message */}
//               {success && (
//                 <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5" />
//                     <div>
//                       <h3 className="text-lg font-semibold text-emerald-800 mb-2">
//                         Consultation Request Submitted Successfully!
//                       </h3>
//                       <p className="text-emerald-700 mb-3">
//                         Your consultation request has been submitted successfully. 
//                         We will review your request and send you an email confirmation within 24 hours.
//                       </p>
//                       <Link 
//                         href="/dashboard" 
//                         className="inline-flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 font-medium"
//                       >
//                         <span>View in Dashboard</span>
//                         <ChevronRight className="w-4 h-4" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Error Message */}
//               {error && (
//                 <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 mb-6">
//                   <div className="flex items-start space-x-3">
//                     <AlertCircle className="w-6 h-6 text-rose-600 mt-0.5" />
//                     <div>
//                       <h3 className="text-lg font-semibold text-rose-800 mb-1">
//                         Booking Failed
//                       </h3>
//                       <p className="text-rose-700">{error}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Main Form */}
//                 <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
//                   <div className="p-6 border-b border-slate-200">
//                     <div className="flex items-center space-x-3">
//                       <FileText className="w-5 h-5 text-blue-600" />
//                       <h2 className="text-lg font-semibold text-slate-900">Consultation Details</h2>
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                       <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
//                           Full Name *
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
//                           <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             required
//                             placeholder="Enter your full name"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
//                           Email Address *
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
//                           <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             required
//                             placeholder="Enter your email address"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
//                           Phone Number *
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
//                           <input
//                             type="tel"
//                             id="phone"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             required
//                             placeholder="Enter your phone number"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
//                           Message *
//                         </label>
//                         <textarea
//                           id="message"
//                           name="message"
//                           value={formData.message}
//                           onChange={handleChange}
//                           rows={4}
//                           placeholder="Tell us about your real estate needs, preferred consultation topics and **MAKE SURE TO INCLUDE THREE OF YOUR PREFERRED DATES & TIMES.**"
//                           className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
//                       >
//                         {isLoading ? (
//                           <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             <span>Booking Consultation...</span>
//                           </>
//                         ) : (
//                           <>
//                             <Calendar className="w-4 h-4" />
//                             <span>Book Consultation</span>
//                           </>
//                         )}
//                       </button>
//                     </form>
//                   </div>
//                 </div>

//                 {/* Sidebar Information */}
//                 <div className="space-y-6">
//                   {/* What to Expect */}
//                   <div className="bg-white rounded-xl border border-slate-200">
//                     <div className="p-6 border-b border-slate-200">
//                       <div className="flex items-center space-x-3">
//                         <Star className="w-5 h-5 text-amber-600" />
//                         <h3 className="text-lg font-semibold text-slate-900">What to Expect</h3>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <div className="space-y-4">
//                         <div className="flex items-start space-x-3">
//                           <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
//                           <div>
//                             <h4 className="font-medium text-slate-900">Expert Review</h4>
//                             <p className="text-sm text-slate-600">Our expert will review your consultation request</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start space-x-3">
//                           <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
//                           <div>
//                             <h4 className="font-medium text-slate-900">Email Confirmation</h4>
//                             <p className="text-sm text-slate-600">You'll receive an email with meeting details</p>
//                           </div>
//                         </div>
                   
//                         <div className="flex items-start space-x-3">
//                           <Users className="w-5 h-5 text-indigo-600 mt-0.5" />
//                           <div>
//                             <h4 className="font-medium text-slate-900">Personalized Advice</h4>
//                             <p className="text-sm text-slate-600">Professional advice tailored to your needs</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Help Section */}
//                   <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
//                     <div className="flex items-center space-x-3 mb-4">
//                       <Shield className="w-5 h-5 text-blue-600" />
//                       <h3 className="font-semibold text-blue-800">Need Help?</h3>
//                     </div>
//                     <p className="text-blue-700 text-sm mb-4">
//                       If you have any questions about our consultation services, please don't hesitate to contact us directly.
//                     </p>
//                     <div className="space-y-2">
//                       <div className="flex items-center space-x-2 text-blue-700">
//                         <Phone className="w-4 h-4" />
//                         <span className="text-sm">+91 93813 03558</span>
//                       </div>
//                       <div className="flex items-center space-x-2 text-blue-700">
//                         <Mail className="w-4 h-4" />
//                         <span className="text-sm">admin@sudharealty.in</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }





'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../../store/store';
import Image from 'next/image';
import { createAppointment } from '../../store/appointmentSlice';
import {
  Calendar,
  MessageSquare,
  Heart,
  Home,
  LogOut,
  User,
  ChevronRight,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  FileText,
  MapPin,
  Shield,
  Star,
  Users,
  AlertCircle,
  Loader2,
  Menu,
  X,
  Bell,
  CreditCard,
  QrCode,
  Upload,
  IndianRupee,
  Info,
  ArrowRight
} from 'lucide-react';

export default function BookAppointmentPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, error } = useSelector((state: RootState) => state.appointments);
  const { user, isLoading: authLoading } = useSelector((state: RootState) => state.auth);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [authLoading, user, router]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
       
      });
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAppointment(formData) as any).unwrap();
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '',  });
      setCurrentStep(3);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/'); // redirect after logout
  }
};

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm ">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
             <div className="flex items-center space-x-0.5">
                <Image 
                  src="/logofinal1.png" 
                  alt="Logo" 
                  width={220} 
                  height={200} 
                  className="object-contain"
                />
                         
              </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 w-64 bg-white border-r border-slate-200 h-screen transition-transform duration-300 ease-in-out z-30 lg:z-0`}>
          <div className="p-6 pt-24 lg:pt-6">
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <Home className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/properties" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <MapPin className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                <span>Properties</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/my-inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <MessageSquare className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
                <span>My Inquiries</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/book-appointment" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30">
                <Calendar className="w-5 h-5" />
                <span>Appointment</span>
              </Link>
              <Link href="/favorites" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <Heart className="w-5 h-5 group-hover:text-rose-600 transition-colors" />
                <span>My Favorites</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-rose-700 hover:bg-rose-50 transition-all w-full group"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-slate-600 mb-3">
              <Link href="/dashboard" className="hover:text-blue-600 transition-colors text-sm">Dashboard</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium text-sm">Book Appointment</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  Book Consultation
                </h1>
                <p className="text-slate-600">
                  Schedule a professional consultation with our real estate experts
                </p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= 1 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
                </div>
                <p className={`text-sm font-medium mt-2 ${currentStep >= 1 ? 'text-slate-900' : 'text-slate-500'}`}>
                  Payment
                </p>
              </div>
              
              <div className={`h-1 flex-1 mx-4 rounded ${currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-200'}`} />
              
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= 2 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > 2 ? <CheckCircle className="w-6 h-6" /> : '2'}
                </div>
                <p className={`text-sm font-medium mt-2 ${currentStep >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>
                  Details
                </p>
              </div>
              
              <div className={`h-1 flex-1 mx-4 rounded ${currentStep >= 3 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-200'}`} />
              
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= 3 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > 3 ? <CheckCircle className="w-6 h-6" /> : '3'}
                </div>
                <p className={`text-sm font-medium mt-2 ${currentStep >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>
                  Confirmation
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Consultation Booked Successfully!</h3>
                    <p className="text-emerald-50">Your request has been submitted for admin review</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">What happens next?</p>
                      <p className="text-sm text-slate-600">Our admin will verify your payment within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Email Confirmation</p>
                      <p className="text-sm text-slate-600">You'll receive an email with meeting details once approved</p>
                    </div>
                  </div>
                </div>
                <Link href="/dashboard" className="mt-6 inline-block">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold">
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-white rounded-2xl border border-rose-200 p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-rose-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-rose-800 mb-1">Booking Failed</h3>
                  <p className="text-rose-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Payment */}
                {currentStep === 1 && (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Consultation Fee</h2>
                          <p className="text-sm text-slate-600">Secure your expert consultation slot</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      {/* Price Display */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 text-center border-2 border-blue-200">
                        <p className="text-slate-600 mb-2">Consultation Fee</p>
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <IndianRupee className="w-8 h-8 text-blue-600" />
                          <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            999
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">One-time professional consultation</p>
                      </div>

                      {/* QR Code Section */}
                      <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-8">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <QrCode className="w-10 h-10 text-slate-400" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">Scan QR Code to Pay</h3>
                          <p className="text-sm text-slate-600 mb-6">Use any UPI app to scan and pay ₹999</p>
                          
                          {/* QR Code Placeholder - Replace with actual QR code */}
                          <div className="w-64 h-64 bg-slate-100 rounded-xl mx-auto mb-6 flex items-center justify-center border-2 border-slate-200">
                            
                              <Image 
                              src="/QR.png"
                              alt="QR Code"
                               height={240} 
                               width={240} 
                               className="object-contain" 
                               />
                            
                          </div>

                          <div className="bg-blue-50 rounded-xl p-4 mb-6">
                            <div className="flex items-start space-x-3">
                              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div className="text-left">
                                <p className="text-sm font-semibold text-blue-900 mb-1">Payment Instructions</p>
                                <ul className="text-xs text-blue-700 space-y-1">
                                  <li>• Scan the QR code with any UPI app (Google Pay, PhonePe, Paytm)</li>
                                  <li>• Pay exactly ₹999 for consultation fee</li>
                                  
                                </ul>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setCurrentStep(2)}
                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold flex items-center justify-center space-x-2"
                          >
                            <span>I've Made the Payment</span>
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Details & Upload */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Consultation Details</h2>
                          <p className="text-sm text-slate-600">Provide your information</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                       
                    

                        <div className="border-t border-slate-200 pt-6">
                          <h3 className="text-sm font-semibold text-slate-700 mb-4">Contact Information</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name *
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  required
                                  placeholder="Enter your full name"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address *
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  required
                                  placeholder="Enter your email address"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number *
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  required
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                                Message & Preferred Dates *
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell us about your real estate needs. **IMPORTANT**: Include THREE of your preferred dates & times for the consultation."
                                className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3 pt-4">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center space-x-2"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <Calendar className="w-5 h-5" />
                                <span>Submit Booking</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Information */}
              <div className="space-y-6">
                {/* What's Included */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-yellow-50">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-amber-600" />
                      <h3 className="text-lg font-bold text-slate-900">What's Included</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Expert Consultation</h4>
                          <p className="text-sm text-slate-600">One-on-one session with our senior advisor</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Property Analysis</h4>
                          <p className="text-sm text-slate-600">Detailed evaluation of your property interests</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Market Insights</h4>
                          <p className="text-sm text-slate-600">Current trends and investment opportunities</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Personalized Recommendations</h4>
                          <p className="text-sm text-slate-600">Tailored advice based on your needs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Timeline */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-900">How It Works</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-600 text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Make Payment</h4>
                          <p className="text-sm text-slate-600">Pay ₹999 via UPI using the QR code</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-purple-600 text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Submit Details</h4>
                          <p className="text-sm text-slate-600">Fill form and upload payment proof</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-amber-600 text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Admin Verification</h4>
                          <p className="text-sm text-slate-600">We verify payment within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-emerald-600 text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Get Confirmation</h4>
                          <p className="text-sm text-slate-600">Receive meeting details via email</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-blue-900">Need Assistance?</h3>
                  </div>
                  <p className="text-blue-800 text-sm mb-4">
                    Have questions about the consultation or payment process? Contact us directly.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-white rounded-xl p-3">
                      <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-900">+91 93813 03558</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white rounded-xl p-3">
                      <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-900">admin@sudharealty.in</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Secure & Verified</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    All payments are verified by our admin team. Your consultation slot is secured only after payment verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}