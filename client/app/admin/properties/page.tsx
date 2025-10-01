'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '../../../store/store';
import { getProperties, deleteProperty } from '@/store/adminSlice';
import {
  Building,
  Users,
  Calendar,
  MessageSquare,
  LogOut,
  Home,
  ChevronRight,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  MapPin,
  IndianRupee,
  Bed,
  Bath,
  Square,
  SlidersHorizontal,
  X,
  Loader2,
  
} from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminPropertiesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { admin } = useSelector((state: RootState) => state.auth);
  const { properties, isLoading } = useSelector((state: RootState) => state.admin);
  
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    status: '',
    page: '1'
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!admin) {
      router.push('/auth');
      return;
    }
    
    // For admin, we use the regular properties endpoint with filters
    dispatch(getProperties(filters) as any);
  }, [dispatch, admin, router, filters]);

  const handleDelete = async (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        await dispatch(deleteProperty(propertyId) as any).unwrap();
      } catch (error) {
        console.error('Failed to delete property:', error);
      }
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: '1'
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      status: '',
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
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  router.push("/");
};

  

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
            </div>
          </div>
          <nav className="px-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/properties" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
              <Building className="w-4 h-4" />
              <span>Properties</span>
            </Link>
            <Link href="/admin/appointments" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/admin/inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Users className="w-4 h-4" />
              <span>Users</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <div className="border-t border-slate-200 mt-4 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-100 transition-colors w-full text-left">
              <LogOut className="w-4 h-4" />
              <span>LogOut</span>
             </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header Section */}
        <div className="mb-8 mt-6 mx-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-slate-600 mb-2">
            <Link href="/admin" className="hover:text-blue-600 transition-colors">
              Admin
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Properties</span>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
                <Building className="w-8 h-8 text-blue-600" />
                <span>Manage Properties</span>
              </h1>
              <p className="text-slate-600 mt-2">
                Add, edit, and manage all property listings
              </p>
            </div>

            {/* Button */}
           <Link
            href="/admin/properties/new"
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 shadow-sm transition-colors text-sm font-medium flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
            </Link>
          </div>
        </div>


          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Results Header & Filter Toggle */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <p className="text-slate-600">
                    {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                  </p>
                  {hasActiveFilters && (
                    <p className="text-slate-600 mt-1">Filters applied</p>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm">Clear Filters</span>
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Filters Section */}
              {showFilters && (
                <div className="bg-white rounded-xl border border-slate-200 mb-6">
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Filter className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-slate-900">Filter Properties</h3>
                      </div>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                          name="category"
                          value={filters.category}
                          onChange={handleFilterChange}
                          className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">All Categories</option>
                          <option value="FRESH_SALES">Fresh Sales</option>
                          <option value="RESALE">Resale</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Property Type</label>
                        <select
                          name="type"
                          value={filters.type}
                          onChange={handleFilterChange}
                          className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">All Types</option>
                          <option value="OPEN_PLOTS">Open Plots</option>
                          <option value="APARTMENTS">Apartments</option>
                          <option value="VILLAS">Villas</option>
                          <option value="FARMLAND">Farmland</option>
                        </select>
                      </div>

                     
                    </div>
                  </div>
                </div>
              )}

              {/* Properties Grid */}
              {isLoading ? (
                <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                    <p className="text-slate-600">Loading properties...</p>
                  </div>
                </div>
              ) : properties.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                  <Building className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">No properties found</h2>
                  <p className="text-slate-600 mb-6">
                    {hasActiveFilters 
                      ? "No properties match your current filters. Try adjusting your search criteria."
                      : "Get started by adding your first property to the system."
                    }
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                      >
                        Clear Filters
                      </button>
                    )}
                    <Link
                      href="/admin/properties/new"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Property</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                                        <div 
                      key={property.id} 
                      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      {property.images.length > 0 && (
                        <div className="h-48 relative overflow-hidden">
                          <Image
                            src={property.images[0]}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                        </div>
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">
                          {property.title}
                        </h3>

                        <div className="flex items-center space-x-2 text-slate-600 mb-2 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{property.location}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-900 mb-3">
                          <IndianRupee className="w-4 h-4" />
                          <span className="text-lg font-semibold">{property.price.toLocaleString()}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(property.category)}`}>
                            {property.category.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(property.type)}`}>
                            {property.type.replace('_', ' ')}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <Link
                            href={`/properties/${property.id}`}
                            className="border border-slate-200 bg-white text-slate-700 py-1.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span className='font-semibold'>View</span>
                          </Link>
                          <Link
                            href={`/admin/properties/${property.id}/edit`}
                            className="bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Edit className="w-4 h-4" />
                            <span className='font-semibold'>Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="bg-rose-500 text-white py-1.5 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center space-x-1 hover:cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className='font-semibold'>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}