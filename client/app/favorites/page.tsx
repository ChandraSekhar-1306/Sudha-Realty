'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '../../store/store';
import { getUserFavorites, toggleFavorite } from '../../store/propertySlice';
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
  Mail,
  Bed,
  Bath,
  Square,
  Plus,
  IndianRupee,
  Menu,
  X,
  Bell,
  Loader2,
  Grid3x3,
  List,
  Trash2
} from 'lucide-react';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);
  const { favorites, pagination, isLoading } = useSelector((state: RootState) => state.properties);

  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }

    dispatch(
      getUserFavorites({
        page: currentPage.toString(),
        limit: '12',
      }) as any
    );
  }, [dispatch, user, router, currentPage]);

  const handleRemoveFavorite = (propertyId: string) => {
    if (confirm('Remove this property from favorites?')) {
      dispatch(toggleFavorite(propertyId) as any);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'FRESH_SALES':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'APARTMENTS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'VILLAS':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'OPEN_PLOTS':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/'); // redirect after logout
  }
};
  if (!user) {
    return null;
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
              <Link href="/book-appointment" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group">
                <Calendar className="w-5 h-5 group-hover:text-purple-600 transition-colors" />
                <span>Appointment</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/favorites" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30">
                <Heart className="w-5 h-5" />
                <span>My Favorites</span>
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
              <Link href="/dashboard" className="hover:text-blue-600 transition-colors text-sm">
                Dashboard
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium text-sm">Favorites</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  My Favorite Properties
                </h1>
                <p className="text-slate-600">
                  Your curated collection of dream properties
                </p>
              </div>
            </div>
          </div>

          {/* Stats & Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {favorites.length}
                  </p>
                  <p className="text-sm text-slate-600">Saved Properties</p>
                </div>
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
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-1">Loading Favorites</p>
                <p className="text-slate-600">Fetching your saved properties...</p>
              </div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">No Favorites Yet</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Start building your dream property collection by adding properties to your favorites
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
              {/* Favorites Grid */}
              <div className={`grid gap-6 mb-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {favorites.map((property) => (
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
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => handleRemoveFavorite(property.id)}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg flex items-center justify-center group/btn"
                            title="Remove from favorites"
                          >
                            <Heart className="w-5 h-5 text-rose-500 fill-current group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="p-6 flex-1">
                      <Link href={`/properties/${property.id}`}>
                        <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 mb-3">
                          {property.title}
                        </h3>
                      </Link>

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
                          {property.category.replace('_', ' ')}
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                            property.type
                          )}`}
                        >
                          {property.type.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="flex space-x-2 pt-4 border-t border-slate-100">
                        <Link href={`/properties/${property.id}`} className="flex-1">
                          <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold flex items-center justify-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </Link>
                        <Link href={`/properties/${property.id}/inquiry`}>
                          <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold flex items-center justify-center space-x-2">
                            <Mail className="w-4 h-4" />
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
                      Showing <span className="font-semibold text-slate-900">{((pagination.currentPage - 1) * 12) + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(pagination.currentPage * 12, pagination.total)}</span> of <span className="font-semibold text-slate-900">{pagination.total}</span> favorites
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