// 'use client';

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { RootState } from '../../store/store';
// import { getProperties, toggleFavorite } from '../../store/propertySlice';
// import {
//   Search,
//   Filter,
//   Heart,
//   MapPin,
//   Home,
//   Bed,
//   Bath,
//   Square,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   MessageSquare,
//   Loader2,
//   SlidersHorizontal,
//   X,
//   LogOut,
//   User,
//   Calendar
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export default function PropertiesPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { properties, pagination, isLoading } = useSelector((state: RootState) => state.properties);
//   const { user } = useSelector((state: RootState) => state.auth);

//   const [filters, setFilters] = useState({
//     category: '',
//     type: '',
//     minPrice: '',
//     maxPrice: '',
//     location: '',
//     bedrooms: '',
//     bathrooms: '',
//     page: '1'
//   });

//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth');
//       return;
//     }
//     dispatch(getProperties(filters) as any);
//   }, [dispatch, filters, user, router]);

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value,
//       page: '1' // Reset to first page when filters change
//     }));
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/properties/search?q=${encodeURIComponent(searchQuery)}`;
//     }
//   };
//    const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/");
//   };


//   const handleFavorite = (propertyId: string) => {
//     if (!user) {
//       alert('Please login to add favorites');
//       return;
//     }
//     dispatch(toggleFavorite(propertyId) as any);
//   };

//   const handlePageChange = (page: number) => {
//     setFilters(prev => ({
//       ...prev,
//       page: page.toString()
//     }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       category: '',
//       type: '',
//       minPrice: '',
//       maxPrice: '',
//       location: '',
//       bedrooms: '',
//       bathrooms: '',
//       page: '1'
//     });
//   };

//   const hasActiveFilters = Object.entries(filters).some(([key, value]) =>
//     key !== 'page' && value !== ''
//   );

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'FRESH_SALES': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case 'RESALE': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-slate-100 text-slate-800 border-slate-200';
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'APARTMENTS': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'VILLAS': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//       case 'OPEN_PLOTS': return 'bg-amber-100 text-amber-800 border-amber-200';
//       case 'FARMLAND': return 'bg-purple-100 text-purple-800 border-purple-200';
//       default: return 'bg-slate-100 text-slate-800 border-slate-200';
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
//          <div className="p-4">
//                                <div className="flex items-center mb-1 mt-6 -ml-2">
//                                  {/* <Home className="w-8 h-8 text-blue-600" /> */}
//                                 <Image 
//                                    src="/logo.png" 
//                                    alt="Logo" 
//                                    width={90} 
//                                    height={90} 
//                                    className="object-contain"
//                                  />
//                                  <h1 className="text-xl font-bold text-slate-900 relative top-1 -ml-2">Sudha Realty</h1>
//                                </div>
//                              </div>
//           <nav className="p-4 space-y-2">
//             <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <Home className="w-4 h-4" />
//               <span>Dashboard</span>
//             </Link>
//             <Link href="/properties" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
//               <MapPin className="w-4 h-4" />
//               <span>Properties</span>
//             </Link>
//             <Link href="/my-inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
//               <MessageSquare className="w-4 h-4" />
//               <span>My Inquiries</span>
//               <ChevronRight className="w-4 h-4 ml-auto" />
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
// </div>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Header Section */}
//            <div className="mb-8">
//             <div className="flex items-center space-x-2 text-slate-600 mb-2">
//               <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
//               <ChevronRight className="w-4 h-4" />
//               <span className="text-slate-900 font-medium">Properties</span>
//             </div>
//             <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
//               <MessageSquare className="w-8 h-8 text-blue-600" />
//               <span>View Properties</span>
//             </h1>
//             <p className="text-slate-600 mt-2">Browse through all the properties</p>
//           </div>
//           <div className="p-6">
//             {/* Results Header & Filter Toggle */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <div>
               
//                 {hasActiveFilters && (
//                   <p className="text-slate-600 mt-1">Filters applied</p>
//                 )}
//               </div>

//               <div className="flex items-center space-x-3">
//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearFilters}
//                     className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                     <span className="text-sm">Clear Filters</span>
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
//                 >
//                   <SlidersHorizontal className="w-4 h-4" />
//                   <span>Filters</span>
//                 </button>
//               </div>
//             </div>

//             {/* Enhanced Filters Section */}
//             {showFilters && (
//               <div className="bg-white rounded-xl border border-slate-200 mb-6">
//                 <div className="p-6 border-b border-slate-200">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <Filter className="w-5 h-5 text-blue-600" />
//                       <h3 className="text-lg font-semibold text-slate-900">Filter Properties</h3>
//                     </div>
//                     <button
//                       onClick={() => setShowFilters(false)}
//                       className="text-slate-500 hover:text-slate-700 transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
//                       <select
//                         name="category"
//                         value={filters.category}
//                         onChange={handleFilterChange}
//                         className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                       >
//                         <option value="">All Categories</option>
//                         <option value="FRESH_SALES">Fresh Sales</option>
//                         <option value="RESALE">Resale</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Property Type</label>
//                       <select
//                         name="type"
//                         value={filters.type}
//                         onChange={handleFilterChange}
//                         className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                       >
//                         <option value="">All Types</option>
//                         <option value="OPEN_PLOTS">Open Plots</option>
//                         <option value="APARTMENTS">Apartments</option>
//                         <option value="VILLAS">Villas</option>
//                         <option value="FARMLAND">Farmland</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Min Price</label>
//                       <input
//                         type="number"
//                         name="minPrice"
//                         value={filters.minPrice}
//                         onChange={handleFilterChange}
//                         placeholder="₹ Min Price"
//                         className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Max Price</label>
//                       <input
//                         type="number"
//                         name="maxPrice"
//                         value={filters.maxPrice}
//                         onChange={handleFilterChange}
//                         placeholder="₹ Max Price"
//                         className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
//                       <input
//                         type="text"
//                         name="location"
//                         value={filters.location}
//                         onChange={handleFilterChange}
//                         placeholder="Enter location"
//                         className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Bedrooms</label>
//                       <select
//                         name="bedrooms"
//                         value={filters.bedrooms}
//                         onChange={handleFilterChange}
//                         className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                       >
//                         <option value="">Any</option>
//                         <option value="1">1+</option>
//                         <option value="2">2+</option>
//                         <option value="3">3+</option>
//                         <option value="4">4+</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">Bathrooms</label>
//                       <select
//                         name="bathrooms"
//                         value={filters.bathrooms}
//                         onChange={handleFilterChange}
//                         className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                       >
//                         <option value="">Any</option>
//                         <option value="1">1+</option>
//                         <option value="2">2+</option>
//                         <option value="3">3+</option>
//                         <option value="4">4+</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Properties Grid */}
//             {isLoading ? (
//               <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
//                 <div className="flex flex-col items-center">
//                   <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
//                   <p className="text-slate-600">Loading properties...</p>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//                   {properties.map((property) => (
//               <div
//                 key={property.id}
//                 className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
//               >
//                 {property.images.length > 0 && (
//                   <div className="h-40 relative overflow-hidden">
//                     <Image
//                       src={property.images[0]}
//                       alt={property.title}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

//                     {/* Favorite Button */}
//                     {user && (
//                       <button
//                         onClick={() => handleFavorite(property.id)}
//                         className={`absolute top-3 right-3 p-1.5 rounded-full transition-all duration-200 ${
//                           property.isFavorite
//                             ? "bg-rose-500 text-white shadow-md"
//                             : "bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500"
//                         }`}
//                       >
//                         <Heart
//                           className={`w-4 h-4 ${property.isFavorite ? "fill-current" : ""}`}
//                         />
//                       </button>
//                     )}
//                   </div>
//                 )}

//                 <div className="p-4">
//                   {/* Title */}
//                   <div className="flex justify-between items-start mb-2">
//                     <Link href={`/properties/${property.id}`}>
//                       <h3 className="text-base font-medium text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">
//                         {property.title}
//                       </h3>
//                     </Link>
//                   </div>

//                   {/* Location */}
//                   <div className="flex items-center space-x-2 text-slate-600 mb-2">
//                     <MapPin className="w-4 h-4" />
//                     <span className="text-xs">{property.location}</span>
//                   </div>

//                   {/* Price */}
//                   <p className="text-xl font-semibold text-slate-900 mb-3">
//                     ₹{property.price.toLocaleString()}
//                   </p>

//                   {/* Property Details */}
//                   <div className="flex items-center space-x-3 mb-3 text-xs text-slate-600">
//                     {property.bedrooms && (
//                       <div className="flex items-center space-x-1">
//                         <Bed className="w-3 h-3" />
//                         <span>{property.bedrooms} Beds</span>
//                       </div>
//                     )}
//                     {property.bathrooms && (
//                       <div className="flex items-center space-x-1">
//                         <Bath className="w-3 h-3" />
//                         <span>{property.bathrooms} Baths</span>
//                       </div>
//                     )}
//                     {property.area && (
//                       <div className="flex items-center space-x-1">
//                         <Square className="w-3 h-3" />
//                         <span>{property.area} sq ft</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     <span
//                       className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
//                         property.category
//                       )}`}
//                     >
//                       {property.category.replace("_", " ")}
//                     </span>
//                     <span
//                       className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(
//                         property.type
//                       )}`}
//                     >
//                       {property.type.replace("_", " ")}
//                     </span>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex space-x-2">
//                     <Link href={`/properties/${property.id}`} className="flex-1">
//                       <Button
//                         size="sm"
//                         className="w-full bg-blue-600 text-white hover:bg-blue-700"
//                       >
//                         <Eye className="w-4 h-4 mr-1" />
//                         View
//                       </Button>
//                     </Link>
//                     <Link href={`/properties/${property.id}/inquiry`} className="flex-1">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
//                       >
//                         <MessageSquare className="w-4 h-4 mr-1" />
//                         Inquire
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//                   ))}
//                 </div>

//                 {/* Enhanced Pagination */}
//                 {pagination && pagination.totalPages > 1 && (
//                   <div className="bg-white rounded-xl border border-slate-200 p-6">
//                     <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                      
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => handlePageChange(pagination.currentPage - 1)}
//                           disabled={!pagination.hasPrevPage}
//                           className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         >
//                           <ChevronLeft className="w-4 h-4" />
//                           <span>Previous</span>
//                         </button>

//                         <div className="flex items-center space-x-1">
//                           {/* Page Numbers */}
//                           {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
//                             const pageNumber = Math.max(1, pagination.currentPage - 2) + index;
//                             if (pageNumber > pagination.totalPages) return null;

//                             return (
//                               <button
//                                 key={pageNumber}
//                                 onClick={() => handlePageChange(pageNumber)}
//                                 className={`w-10 h-10 rounded-lg font-medium transition-colors ${pageNumber === pagination.currentPage
//                                     ? 'bg-blue-600 text-white'
//                                     : 'text-slate-600 hover:bg-slate-50 border border-slate-200'
//                                   }`}
//                               >
//                                 {pageNumber}
//                               </button>
//                             );
//                           })}
//                         </div>

//                         <button
//                           onClick={() => handlePageChange(pagination.currentPage + 1)}
//                           disabled={!pagination.hasNextPage}
//                           className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         >
//                           <span>Next</span>
//                           <ChevronRight className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* No Results */}
//                 {properties.length === 0 && (
//                   <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
//                     <Home className="w-16 h-16 text-slate-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties found</h3>
//                     <p className="text-slate-600 mb-6">
//                       We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
//                     </p>
//                     {hasActiveFilters && (
//                       <button
//                         onClick={clearFilters}
//                         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                       >
//                         Clear All Filters
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
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
import { getProperties, toggleFavorite } from '../../store/propertySlice';
import {
  Search,
  Filter,
  Heart,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Loader2,
  SlidersHorizontal,
  X,
  LogOut,
  User,
  Calendar,
  Menu,
  Bell,
  Grid3x3,
  List,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PropertiesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { properties, pagination, isLoading } = useSelector((state: RootState) => state.properties);
  const { user } = useSelector((state: RootState) => state.auth);

  const [filters, setFilters] = useState({
    category: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    page: '1'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    dispatch(getProperties(filters) as any);
  }, [dispatch, filters, user, router]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: '1'
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/'); // redirect after logout
  }
};

  const handleFavorite = (propertyId: string) => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    dispatch(toggleFavorite(propertyId) as any);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page: page.toString()
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      page: '1'
    });
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) =>
    key !== 'page' && value !== ''
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'FRESH_SALES': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'RESALE': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'APARTMENTS': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'VILLAS': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'OPEN_PLOTS': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'FARMLAND': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (!user) return null;

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
              <Link href="/properties" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30">
                <MapPin className="w-5 h-5" />
                <span>Properties</span>
              </Link>
              <Link href="/my-inquiries" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <MessageSquare className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
                <span>My Inquiries</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
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
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-slate-600 mb-3">
              <Link href="/dashboard" className="hover:text-blue-600 transition-colors text-sm">Dashboard</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium text-sm">Properties</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  Explore Properties
                </h1>
                <p className="text-slate-600">
                  Discover your dream property from our curated collection
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-4 lg:mt-0 w-full lg:w-96">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Stats & Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-6">
                <div>
                  {/* <p className="text-2xl font-bold text-slate-900">
                    {pagination?.total || properties.length}
                  </p> */}
                  {/* <p className="text-sm text-slate-600">Properties Available</p> */}
                </div>
                {hasActiveFilters && (
                  <div className="h-12 w-px bg-slate-200" />
                )}
                {hasActiveFilters && (
                  <div>
                    <p className="text-lg font-semibold text-blue-600">Filtered Results</p>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-slate-600 hover:text-slate-900 flex items-center space-x-1"
                    >
                      <X className="w-3 h-3" />
                      <span>Clear all filters</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    showFilters || hasActiveFilters
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-5 h-5 bg-white text-blue-600 rounded-full text-xs flex items-center justify-center font-bold">
                      {Object.entries(filters).filter(([key, value]) => key !== 'page' && value !== '').length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-slate-200 mb-6 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Filter className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Advanced Filters</h3>
                      <p className="text-sm text-slate-600">Refine your property search</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    >
                      <option value="">All Categories</option>
                      <option value="FRESH_SALES">Fresh Sales</option>
                      <option value="RESALE">Resale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
                    <select
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    >
                      <option value="">All Types</option>
                      <option value="OPEN_PLOTS">Open Plots</option>
                      <option value="APARTMENTS">Apartments</option>
                      <option value="VILLAS">Villas</option>
                      <option value="FARMLAND">Farmland</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Min Price</label>
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      placeholder="₹ Min Price"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Max Price</label>
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      placeholder="₹ Max Price"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      placeholder="Enter location"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms</label>
                    <select
                      name="bedrooms"
                      value={filters.bedrooms}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bathrooms</label>
                    <select
                      name="bathrooms"
                      value={filters.bathrooms}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Properties Grid/List */}
          {isLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-1">Loading Properties</p>
                <p className="text-slate-600">Please wait while we fetch the best properties for you...</p>
              </div>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 mb-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {property.images.length > 0 && (
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-80 h-64' : 'h-56'
                      }`}>
                        <Image
                          src={property.images[0]}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {user && (
                          <button
                            onClick={() => handleFavorite(property.id)}
                            className={`absolute top-4 right-4 w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg ${
                              property.isFavorite
                                ? "bg-rose-500 text-white scale-110"
                                : "bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500"
                            }`}
                          >
                            <Heart
                              className={`w-5 h-5 ${property.isFavorite ? "fill-current" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                    )}

                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <Link href={`/properties/${property.id}`}>
                          <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 pr-2">
                            {property.title}
                          </h3>
                        </Link>
                      </div>

                      <div className="flex items-center space-x-2 text-slate-600 mb-4">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="text-sm line-clamp-1">{property.location}</span>
                      </div>

                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        ₹{property.price.toLocaleString()}
                      </p>

                      {(property.bedrooms || property.bathrooms || property.area) && (
                        <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600">
                          {property.bedrooms && (
                            <div className="flex items-center space-x-1">
                              <Bed className="w-4 h-4" />
                              <span>{property.bedrooms}</span>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center space-x-1">
                              <Bath className="w-4 h-4" />
                              <span>{property.bathrooms}</span>
                            </div>
                          )}
                          {property.area && (
                            <div className="flex items-center space-x-1">
                              <Square className="w-4 h-4" />
                              <span>{property.area} ft²</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                            property.category
                          )}`}
                        >
                          {property.category.replace("_", " ")}
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                            property.type
                          )}`}
                        >
                          {property.type.replace("_", " ")}
                        </span>
                      </div>

                      <div className="flex space-x-2 pt-4 border-t border-slate-100">
                        <Link href={`/properties/${property.id}`} className="flex-1">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        <Link href={`/properties/${property.id}/inquiry`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Inquire
                          </Button>
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
                      Showing <span className="font-semibold text-slate-900">{((pagination.currentPage - 1) * 10) + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(pagination.currentPage * 10, pagination.total)}</span> of <span className="font-semibold text-slate-900">{pagination.total}</span> properties
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

              {/* No Results */}
              {properties.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Home className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">No Properties Found</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    We couldn't find any properties matching your criteria. Try adjusting your filters or search terms to discover more options.
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}