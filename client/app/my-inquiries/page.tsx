// 'use client';

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { RootState } from '../../store/store';
// import { getUserInquiries } from '../../store/inquirySlice';
// import {
//   Home,
//   MapPin,
//   Heart,
//   MessageSquare,
//   Calendar,
//   LogOut,
//   ChevronRight,
//   ChevronLeft,
//   Eye,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Mail,
//   Phone,
//   User,
//   Plus,
//   ExternalLink
// } from 'lucide-react';

// export default function MyInquiriesPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
  
//   const { user } = useSelector((state: RootState) => state.auth);
//   const { inquiries, pagination, isLoading } = useSelector((state: RootState) => state.inquiries);
  
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth');
//       return;
//     }
    
//     dispatch(getUserInquiries({ 
//       page: currentPage.toString(), 
//       limit: '10' 
//     }) as any);
//   }, [dispatch, user, router, currentPage]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };
//    const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/");
//   };


//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
//       case 'RESPONDED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       default: return 'bg-slate-100 text-slate-800 border-slate-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'PENDING': return <Clock className="w-3 h-3" />;
//       case 'RESPONDED': return <CheckCircle className="w-3 h-3" />;
//       default: return <AlertCircle className="w-3 h-3" />;
//     }
//   };

//   if (!user) {
//     return null;
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
//             <Link href="/my-inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
//               <MessageSquare className="w-4 h-4" />
//               <span>My Inquiries</span>
//             </Link>
//             <Link href="/book-appointment" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Calendar className="w-4 h-4" />
//               <span>Book Appointment</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <Link href="/favorites" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Heart className="w-4 h-4" />
//               <span>Favorites</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
//             </Link>
//             <div className="border-t border-slate-200 mt-4 pt-4">
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-100 transition-colors w-full text-left"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>LogOut</span>
//             </button>
//           </div>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Header */}
//              <div className="mb-8">
//             <div className="flex items-center space-x-2 text-slate-600 mb-2">
//               <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
//               <ChevronRight className="w-4 h-4" />
//               <span className="text-slate-900 font-medium">My Inquiries</span>
//             </div>
//             <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
//               <MessageSquare className="w-8 h-8 text-blue-600" />
//               <span>My Inquiries</span>
//             </h1>
//             <p className="text-slate-600 mt-2">Track the status of your property inquiries</p>
//           </div>

//           {isLoading ? (
//             <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
//               <div className="flex flex-col items-center">
//                 <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//                 <p className="text-slate-600">Loading inquiries...</p>
//               </div>
//             </div>
//           ) : inquiries.length === 0 ? (
//             <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
//               <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-slate-900 mb-2">No inquiries yet</h2>
//               <p className="text-slate-600 mb-6">Browse properties and send inquiries to get started</p>
//               <Link 
//                 href="/properties" 
//                 className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Browse Properties
//               </Link>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-6 mb-8">
//                 {inquiries.map((inquiry) => (
//                   <div key={inquiry.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                     <div className="p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex-1">
//                           {inquiry.property && (
//                             <div className="flex items-start space-x-4 mb-4">
//                               {inquiry.property.images && inquiry.property.images.length > 0 && (
//                                 <div className="h-20 w-20 relative flex-shrink-0 rounded-lg overflow-hidden">
//                                   <Image
//                                     src={inquiry.property.images[0]}
//                                     alt={inquiry.property.title}
//                                     fill
//                                     className="object-cover"
//                                   />
//                                 </div>
//                               )}
//                               <div className="flex-1">
//                                 <Link 
//                                   href={`/properties/${inquiry.property.id}`}
//                                   className="font-semibold text-lg text-slate-900 hover:text-blue-600 transition-colors"
//                                 >
//                                   {inquiry.property.title}
//                                 </Link>
//                                 <div className="flex items-center space-x-1 text-slate-600 mb-1">
//                                   <MapPin className="w-4 h-4" />
//                                   <span className="text-sm">{inquiry.property.location}</span>
//                                 </div>
//                                 <p className="text-xl font-bold text-slate-900">
//                                   ₹{inquiry.property.price.toLocaleString()}
//                                 </p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
                        
//                         <div className="ml-4 flex-shrink-0">
//                           <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(inquiry.status)}`}>
//                             {getStatusIcon(inquiry.status)}
//                             <span>{inquiry.status}</span>
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="border-t border-slate-200 pt-4">
//                         <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
//                           <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
//                           Your Inquiry
//                         </h3>
//                         <div className="bg-slate-50 rounded-lg p-4 mb-4">
//                           <p className="text-slate-700 mb-3">{inquiry.message}</p>
//                         </div>
                        
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600 mb-4">
//                           <div className="flex items-center space-x-2">
//                             <User className="w-4 h-4 text-blue-600" />
//                             <span>{inquiry.name}</span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <Mail className="w-4 h-4 text-blue-600" />
//                             <span>{inquiry.email}</span>
//                           </div>
                          
//                           <div className="flex items-center space-x-2">
//                             <Clock className="w-4 h-4 text-blue-600" />
//                             <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {inquiry.status === 'PENDING' && (
//                         <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
//                           <div className="flex items-center">
//                             <Clock className="w-5 h-5 text-amber-600 mr-2" />
//                             <p className="text-amber-800 text-sm font-medium">
//                               Your inquiry is being reviewed. We'll get back to you soon!
//                             </p>
//                           </div>
//                         </div>
//                       )}
                      
//                       {inquiry.status === 'RESPONDED' && (
//                         <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
//                           <div className="flex items-center">
//                             <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
//                             <p className="text-emerald-800 text-sm font-medium">
//                               We've responded to your inquiry. Please check your email for details.
//                             </p>
//                           </div>
//                         </div>
//                       )}
                      
//                       <div className="flex space-x-3">
//                         <Link
//                           href={`/properties/${inquiry.property?.id}`}
//                           className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                         >
//                           <Eye className="w-4 h-4" />
//                           <span>View Property</span>
//                         </Link>
                     
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {pagination && pagination.totalPages > 1 && (
//                 <div className="bg-white rounded-xl border border-slate-200 p-6">
//                   <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                   

//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handlePageChange(pagination.currentPage - 1)}
//                         disabled={!pagination.hasPrevPage}
//                         className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                         <span>Previous</span>
//                       </button>

//                       <div className="flex items-center space-x-1">
//                         {/* Page Numbers */}
//                         {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
//                           const pageNumber = Math.max(1, pagination.currentPage - 2) + index;
//                           if (pageNumber > pagination.totalPages) return null;

//                           return (
//                             <button
//                               key={pageNumber}
//                               onClick={() => handlePageChange(pageNumber)}
//                               className={`w-10 h-10 rounded-lg font-medium transition-colors ${pageNumber === pagination.currentPage
//                                   ? 'bg-blue-600 text-white'
//                                   : 'text-slate-600 hover:bg-slate-50 border border-slate-200'
//                                 }`}
//                             >
//                               {pageNumber}
//                             </button>
//                           );
//                         })}
//                       </div>

//                       <button
//                         onClick={() => handlePageChange(pagination.currentPage + 1)}
//                         disabled={!pagination.hasNextPage}
//                         className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         <span>Next</span>
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '../../store/store';
import { getUserInquiries } from '../../store/inquirySlice';
import {
  Home,
  MapPin,
  Heart,
  MessageSquare,
  Calendar,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  User,
  Plus,
  
  Menu,
  X,
  Bell,
  Loader2,
  Send,
  
} from 'lucide-react';

export default function MyInquiriesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { inquiries, pagination, isLoading } = useSelector((state: RootState) => state.inquiries);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    
    dispatch(getUserInquiries({ 
      page: currentPage.toString(), 
      limit: '10' 
    }) as any);
  }, [dispatch, user, router, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'RESPONDED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'RESPONDED': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredInquiries = filterStatus === 'all' 
    ? inquiries 
    : inquiries.filter(inquiry => inquiry.status === filterStatus);

  const pendingCount = inquiries.filter(i => i.status === 'PENDING').length;
  const respondedCount = inquiries.filter(i => i.status === 'RESPONDED').length;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm">
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
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {pendingCount}
                </span>
              )}
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
              <Link href="/my-inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30">
                <MessageSquare className="w-5 h-5" />
                <span>My Inquiries</span>
              </Link>
              <Link href="/book-appointment" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <Calendar className="w-5 h-5 group-hover:text-purple-600 transition-colors" />
                <span>Appointment</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
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
              <span className="text-slate-900 font-medium text-sm">My Inquiries</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  My Inquiries
                </h1>
                <p className="text-slate-600">
                  Track and manage all your property inquiries
                </p>
              </div>

              <Link href="/properties" className="mt-4 lg:mt-0">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>New Inquiry</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{inquiries.length}</h3>
              <p className="text-slate-600 text-sm">Total Inquiries</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{pendingCount}</h3>
              <p className="text-slate-600 text-sm">Pending Response</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{respondedCount}</h3>
              <p className="text-slate-600 text-sm">Responded</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2 mb-6 inline-flex">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setFilterStatus('PENDING')}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                filterStatus === 'PENDING'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus('RESPONDED')}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                filterStatus === 'RESPONDED'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Responded ({respondedCount})
            </button>
          </div>

          {/* Inquiries List */}
          {isLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-1">Loading Inquiries</p>
                <p className="text-slate-600">Fetching your inquiry history...</p>
              </div>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {filterStatus === 'all' ? 'No Inquiries Yet' : `No ${filterStatus.toLowerCase()} inquiries`}
              </h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                {filterStatus === 'all' 
                  ? 'Start exploring properties and send inquiries to connect with sellers'
                  : 'You don\'t have any inquiries with this status'}
              </p>
              <Link href="/properties">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold inline-flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Browse Properties</span>
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {filteredInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div className="flex-1">
                          {inquiry.property && (
                            <div className="flex items-start space-x-4 mb-4">
                              {inquiry.property.images && inquiry.property.images.length > 0 && (
                                <div className="h-24 w-24 relative flex-shrink-0 rounded-xl overflow-hidden">
                                  <Image
                                    src={inquiry.property.images[0]}
                                    alt={inquiry.property.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <Link 
                                  href={`/properties/${inquiry.property.id}`}
                                  className="font-bold text-xl text-slate-900 hover:text-blue-600 transition-colors block mb-2"
                                >
                                  {inquiry.property.title}
                                </Link>
                                <div className="flex items-center space-x-2 text-slate-600 mb-2">
                                  <MapPin className="w-4 h-4" />
                                  <span className="text-sm">{inquiry.property.location}</span>
                                </div>
                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                  ₹{inquiry.property.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 lg:mt-0 lg:ml-4 flex-shrink-0">
                          <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(inquiry.status)}`}>
                            {getStatusIcon(inquiry.status)}
                            <span>{inquiry.status}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t border-slate-100 pt-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Send className="w-4 h-4 text-blue-600" />
                          </div>
                          <h3 className="font-bold text-slate-900">Your Message</h3>
                        </div>
                        
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-5 mb-5">
                          <p className="text-slate-700 leading-relaxed">{inquiry.message}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Name</p>
                              <p className="text-sm font-semibold text-slate-900">{inquiry.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Mail className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Email</p>
                              <p className="text-sm font-semibold text-slate-900 truncate">{inquiry.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Clock className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Submitted</p>
                              <p className="text-sm font-semibold text-slate-900">
                                {new Date(inquiry.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {inquiry.status === 'PENDING' && (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5 mb-5">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-amber-900 mb-1">Awaiting Response</p>
                              <p className="text-amber-700 text-sm">
                                Your inquiry is being reviewed by our team. We'll get back to you soon with more information about this property.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {inquiry.status === 'RESPONDED' && (
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-5 mb-5">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-emerald-900 mb-1">Response Received!</p>
                              <p className="text-emerald-700 text-sm">
                                We've responded to your inquiry. Please check your email for detailed information and next steps.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-3 pt-5 border-t border-slate-100">
                        <Link
                          href={`/properties/${inquiry.property?.id}`}
                          className="flex-1 sm:flex-none"
                        >
                          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold flex items-center justify-center space-x-2">
                            <Eye className="w-5 h-5" />
                            <span>View Property</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* <div className="text-sm text-slate-600">
                      Showing <span className="font-semibold text-slate-900">{((pagination.currentPage - 1) * 10) + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(pagination.currentPage * 10, pagination.total)}</span> of <span className="font-semibold text-slate-900">{pagination.total}</span> inquiries
                    </div> */}

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="flex items-center space-x-2 px-4 py-2 border-2 border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Previous</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
                          const pageNumber = Math.max(1, pagination.currentPage - 2) + index;
                          if (pageNumber > pagination.totalPages) return null;

                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                                pageNumber === pagination.currentPage
                                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className="flex items-center space-x-2 px-4 py-2 border-2 border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}