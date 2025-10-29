'use client';

import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '../../store/store';
import { getProperties, toggleFavorite } from '../../store/propertySlice';
import {
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
  RotateCcw,
  ListFilter,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';

// ============================================================================
// TYPES
// ============================================================================

type Filters = {
  price: [number, number];
  bedrooms: ('1' | '2' | '3' | '4' | '5+')[];
  bathrooms: ('1' | '2' | '3' | '4+')[];
  propertyType: ('Apartment' | 'Villa' | 'Open Plot' | 'Farmland')[];
  facing: ('North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West')[];
  location: string;
  category: string;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const POPULAR_LOCATIONS = [
  'Jubilee Hills',
  'Banjara Hills',
  'Hitech City',
  'Gachibowli',
  'Kompally',
  'Manikonda',
  'Financial District',
  'Moinabad',
];

const DEFAULT_FILTERS: Filters = {
  price: [5000000, 60000000],
  bedrooms: [],
  bathrooms: [],
  propertyType: [],
  facing: [],
  location: '',
  category: '',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getCategoryColor = (category: string) => {
  const colors = {
    FRESH_SALES: 'bg-emerald-50 text-emerald-700',
    RESALE: 'bg-blue-50 text-blue-700',
  };
  return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700';
};

const getTypeColor = (type: string) => {
  const colors = {
    APARTMENTS: 'bg-violet-50 text-violet-700',
    VILLAS: 'bg-amber-50 text-amber-700',
    OPEN_PLOTS: 'bg-orange-50 text-orange-700',
    FARMLAND: 'bg-green-50 text-green-700',
  };
  return colors[type as keyof typeof colors] || 'bg-gray-50 text-gray-700';
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// ============================================================================
// FILTER SIDEBAR COMPONENT
// ============================================================================

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  clearFilters: () => void;
}

const FilterSidebar = ({ filters, onFilterChange, clearFilters }: FilterSidebarProps) => {
  const handleCheckboxChange = (
    group: keyof Pick<Filters, 'bedrooms' | 'bathrooms' | 'propertyType' | 'facing'>,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[group] as string[];
    const newValues = checked 
      ? [...currentValues, value] 
      : currentValues.filter(v => v !== value);
    onFilterChange({ [group]: newValues });
  };

  const isPlotOrFarmlandSelected = useMemo(() => {
    if (filters.propertyType.length === 0) return false;
    const residentialTypes = ['Apartment', 'Villa'];
    return filters.propertyType.every(type => !residentialTypes.includes(type));
  }, [filters.propertyType]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <p className="text-sm text-gray-500 mt-0.5">Refine your search</p>
      </div>

      {/* Filter Options */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Price Range */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-900">Price Range</Label>
            <Slider
              value={filters.price}
              onValueChange={(newPrice) => onFilterChange({ price: newPrice as [number, number] })}
              min={5000000}
              max={60000000}
              step={5000000}
              className="mt-6"
            />
            <div className="flex justify-between text-xs font-medium text-gray-600 mt-3">
              <span>{formatCurrency(filters.price[0])}</span>
              <span>{formatCurrency(filters.price[1])}</span>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Category</Label>
            <div className="space-y-2.5">
              {[
                { id: 'all', label: 'All Categories', value: '' },
                { id: 'fresh', label: 'Fresh Sales', value: 'FRESH_SALES' },
                { id: 'resale', label: 'Resale', value: 'RESALE' },
              ].map(({ id, label, value }) => (
                <label key={id} className="flex items-center space-x-3 cursor-pointer group">
                  <Checkbox
                    id={`category-${id}`}
                    checked={filters.category === value}
                    onCheckedChange={() => onFilterChange({ category: value })}
                    className="rounded-md"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Property Type</Label>
            <div className="space-y-2.5">
              {(['Apartment', 'Villa', 'Open Plot', 'Farmland'] as const).map(type => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.propertyType.includes(type)}
                    onCheckedChange={(checked) => handleCheckboxChange('propertyType', type, !!checked)}
                    className="rounded-md"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div className={`space-y-3 transition-opacity ${isPlotOrFarmlandSelected ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            <Label className="text-sm font-semibold text-gray-900">Bedrooms</Label>
            <div className="space-y-2.5">
              {(['1', '2', '3', '4', '5+'] as const).map(opt => (
                <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                  <Checkbox
                    id={`bed-${opt}`}
                    checked={filters.bedrooms.includes(opt)}
                    onCheckedChange={(checked) => handleCheckboxChange('bedrooms', opt, !!checked)}
                    disabled={isPlotOrFarmlandSelected}
                    className="rounded-md"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {opt} {opt === '5+' ? 'or more' : 'BHK'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className={`space-y-3 transition-opacity ${isPlotOrFarmlandSelected ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            <Label className="text-sm font-semibold text-gray-900">Bathrooms</Label>
            <div className="space-y-2.5">
              {(['1', '2', '3', '4+'] as const).map(opt => (
                <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                  <Checkbox
                    id={`bath-${opt}`}
                    checked={filters.bathrooms.includes(opt)}
                    onCheckedChange={(checked) => handleCheckboxChange('bathrooms', opt, !!checked)}
                    disabled={isPlotOrFarmlandSelected}
                    className="rounded-md"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {opt} {opt.includes('+') ? 'or more' : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Facing */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Facing</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] as const).map(opt => (
                <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                  <Checkbox
                    id={`face-${opt}`}
                    checked={filters.facing.includes(opt)}
                    onCheckedChange={(checked) => handleCheckboxChange('facing', opt, !!checked)}
                    className="rounded-md"
                  />
                  <span className="text-xs text-gray-700 group-hover:text-gray-900">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Location</Label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              placeholder="Enter location"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-100 text-gray-700 font-medium"
          onClick={clearFilters}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

// ============================================================================
// INSIGHTS SIDEBAR COMPONENT
// ============================================================================

const InsightsSidebar = () => (
  <div className="space-y-5">
    {/* Popular Locations */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Find by Location</h3>
            <p className="text-xs text-gray-600 mt-0.5">Popular areas</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {POPULAR_LOCATIONS.map(location => (
            <Button
              key={location}
              variant="outline"
              size="sm"
              asChild
              className="text-xs border-gray-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all"
            >
              <Link href="#">{location}</Link>
            </Button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          Click a location to filter properties in that area.
        </p>
      </div>
    </div>

    {/* Expert Guidance */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Phone className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            Need Expert<br />Guidance?
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Still confused? Our expert can provide personalized advice tailored to your needs.
        </p>
        <Link href="/book-appointment">
        <button className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition-all font-semibold py-2.5 px-4 rounded-lg">
          Book a Consultation
        </button>
        </Link>
      </div>
    </div>
  </div>
);

// ============================================================================
// PROPERTY CARD COMPONENT - MINIMALIST & PROFESSIONAL
// ============================================================================

interface PropertyCardProps {
  property: any;
  user: any;
  onFavorite: (id: string) => void;
}

const PropertyCard = ({ property, user, onFavorite }: PropertyCardProps) => (
  <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row">
    {/* Property Image */}
    {property.images.length > 0 && (
      <div className="relative overflow-hidden bg-gray-100 w-full sm:w-64 h-48 sm:h-56 shrink-0">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
        />
        
        {user && (
          <button
            onClick={() => onFavorite(property.id)}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm transition-all duration-200 flex items-center justify-center ${
              property.isFavorite
                ? "bg-white text-rose-500"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${property.isFavorite ? "fill-current" : ""}`} />
          </button>
        )}
      </div>
    )}

    {/* Property Details */}
    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
      <div>
        {/* Title & Location */}
        <div className="mb-4">
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-1.5 line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-sm line-clamp-1">{property.location}</span>
          </div>
        </div>

        {/* Price & Stats */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-4 pb-4 border-b border-gray-100">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(property.price)}
            </p>
          </div>
          
          {(property.bedrooms || property.bathrooms || property.area) && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {property.bedrooms && (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-1.5">
                  <Square className="w-4 h-4" />
                  <span>{property.area} ft²</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(property.category)}`}>
            {property.category.replace("_", " ")}
          </span>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getTypeColor(property.type)}`}>
            {property.type.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5">
        <Link href={`/properties/${property.id}`} className="flex-1">
          <Button size="sm" className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium h-9">
            View Details
          </Button>
        </Link>
        <Link href={`/properties/${property.id}/inquiry`}>
          <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 h-9 px-3">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

interface EmptyStateProps {
  clearFilters: () => void;
}

const EmptyState = ({ clearFilters }: EmptyStateProps) => (
  <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-12 sm:p-16 text-center">
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Home className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </div>
      <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-3'>New Properties Coming Soon</h3>
      <p className='text-sm text-gray-600 leading-relaxed mb-2'>
        We're curating an exclusive collection of premium properties just for you.
      </p>
      <p className='text-sm text-blue-600 font-medium mb-8'>
        Check back shortly for exciting new listings!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="default" className='bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg' asChild>
          <Link href="/book-appointment">
            <Phone className="mr-2 h-4 w-4" />
            Book Consultation
          </Link>
        </Button>
        <Button variant="outline" className='border-gray-300 hover:bg-white text-gray-700 font-medium' onClick={clearFilters}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  </div>
);

// ============================================================================
// LOADING STATE COMPONENT
// ============================================================================

const LoadingState = () => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 sm:p-20 text-center">
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
        <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-blue-600" />
      </div>
      <p className="text-base sm:text-lg font-semibold text-gray-900">Loading Properties</p>
      <p className="text-sm text-gray-500 mt-1">Finding the best matches for you...</p>
    </div>
  </div>
);

// ============================================================================
// PAGINATION COMPONENT
// ============================================================================

interface PaginationProps {
  pagination: any;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium text-sm text-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
              const pageNumber = Math.max(1, pagination.currentPage - 2) + index;
              if (pageNumber > pagination.totalPages) return null;

              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-semibold text-sm transition-all ${
                    pageNumber === pagination.currentPage
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium text-sm text-gray-700"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PropertiesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { properties, pagination, isLoading } = useSelector((state: RootState) => state.properties);
  const { user } = useSelector((state: RootState) => state.auth);

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>(DEFAULT_FILTERS);

  // Debounce filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  // Convert filters to Redux format
  const reduxFilters = useMemo(() => ({
    category: debouncedFilters.category,
    type: debouncedFilters.propertyType.length > 0
      ? debouncedFilters.propertyType.map(t => t.toUpperCase().replace(' ', '_')).join(',')
      : '',
    minPrice: debouncedFilters.price[0].toString(),
    maxPrice: debouncedFilters.price[1].toString(),
    location: debouncedFilters.location,
    bedrooms: debouncedFilters.bedrooms.length > 0
      ? Math.min(...debouncedFilters.bedrooms.map(b => b === '5+' ? 5 : parseInt(b))).toString()
      : '',
    bathrooms: debouncedFilters.bathrooms.length > 0
      ? Math.min(...debouncedFilters.bathrooms.map(b => b === '4+' ? 4 : parseInt(b))).toString()
      : '',
    page: '1'
  }), [debouncedFilters]);

  // Fetch properties
  useEffect(() => {
    dispatch(getProperties(reduxFilters) as any);
  }, [dispatch, reduxFilters]);

  // Event handlers
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleFavorite = (propertyId: string) => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    dispatch(toggleFavorite(propertyId) as any);
  };

  const handlePageChange = (page: number) => {
    dispatch(getProperties({ ...reduxFilters, page: page.toString() }) as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Filters (Desktop Only) */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-20 pt-15">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Main Content - Properties */}
          <main className="lg:col-span-6 pt-15">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Explore Properties
                </h1>
                <p className="text-sm text-gray-600 mt-1.5">
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} available
                </p>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden border-gray-300 hover:bg-gray-50 shrink-0">
                    <ListFilter className="h-4 w-4" />
                    <span className="sr-only">Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm p-0">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Property Filters</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    clearFilters={clearFilters}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Properties List */}
            <div className="space-y-4">
              {isLoading ? (
                <LoadingState />
              ) : properties.length > 0 ? (
                <>
                  <div className="grid gap-4 grid-cols-1">
                    {properties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        user={user}
                        onFavorite={handleFavorite}
                      />
                    ))}
                  </div>
                  <Pagination pagination={pagination} onPageChange={handlePageChange} />
                </>
              ) : (
                <EmptyState clearFilters={clearFilters} />
              )}
            </div>
          </main>

          {/* Right Sidebar - Insights (Desktop Only) */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-20 pt-6">
              <InsightsSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}