'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Home,
  Phone,
  Mail,
  ListFilter,
  RotateCcw,
  Users,
  Sparkles,
  Building2,
  MessageSquare,
  ArrowRight,
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
import Navbar from '@/components/Navbar';

// ============================================================================
// TYPES
// ============================================================================

type ListingCategory = 'SALE' | 'RENT';

type Filters = {
  category: ListingCategory;
  price: [number, number];
  bedrooms: ('1' | '2' | '3' | '4' | '5+')[];
  bathrooms: ('1' | '2' | '3' | '4+')[];
  propertyType: ('Apartment' | 'Villa' | 'Open Plot' | 'Farmland')[];
  facing: ('North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West')[];
  location: string;
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

// Price ranges based on category
const PRICE_RANGES = {
  SALE: {
    min: 5000000,
    max: 60000000,
    step: 5000000,
    default: [5000000, 60000000] as [number, number],
  },
  RENT: {
    min: 10000,
    max: 200000,
    step: 10000,
    default: [10000, 200000] as [number, number],
  },
};

const DEFAULT_FILTERS: Filters = {
  category: 'SALE',
  price: PRICE_RANGES.SALE.default,
  bedrooms: [],
  bathrooms: [],
  propertyType: [],
  facing: [],
  location: '',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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

  const handleCategoryChange = (category: ListingCategory) => {
    onFilterChange({ 
      category,
      price: PRICE_RANGES[category].default
    });
  };

  const isPlotOrFarmlandSelected = useMemo(() => {
    if (filters.propertyType.length === 0) return false;
    const residentialTypes = ['Apartment', 'Villa'];
    return filters.propertyType.every(type => !residentialTypes.includes(type));
  }, [filters.propertyType]);

  const priceConfig = PRICE_RANGES[filters.category];

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
          {/* Category Toggle */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-900">Listing Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCategoryChange('SALE')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  filters.category === 'SALE'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => handleCategoryChange('RENT')}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  filters.category === 'RENT'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                For Rent
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-900">
              {filters.category === 'RENT' ? 'Monthly Rent' : 'Price Range'}
            </Label>
            <Slider
              value={filters.price}
              onValueChange={(newPrice) => onFilterChange({ price: newPrice as [number, number] })}
              min={priceConfig.min}
              max={priceConfig.max}
              step={priceConfig.step}
              className="mt-6"
            />
            <div className="flex justify-between text-xs font-medium text-gray-600 mt-3">
              <span>{formatCurrency(filters.price[0])}</span>
              <span>{formatCurrency(filters.price[1])}</span>
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
            <h3 className="font-semibold text-gray-900">Popular Locations</h3>
            <p className="text-xs text-gray-600 mt-0.5">Areas we're looking for</p>
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
              className="text-xs border-gray-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-default"
            >
              {location}
            </Button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          We're actively seeking property listings in these prime locations.
        </p>
      </div>
    </div>

    {/* List Your Property */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            List Your<br />Property Here
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Reach thousands of buyers and tenants. Contact us to feature your property on our platform.
        </p>
        <div className="space-y-2 mb-5">
          <a href="tel:+919381303558" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span>+91 93813 03558</span>
          </a>
          <a href="mailto:admin@sudharealty.in" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
            <Mail className="w-4 h-4" />
            <span>admin@sudharealty.in</span>
          </a>
        </div>
        
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
        <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </div>
      <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-3'>No Community Listings Yet</h3>
      <p className='text-sm text-gray-600 leading-relaxed mb-2'>
        We're building a platform where property owners can showcase their properties directly to interested buyers.
      </p>
      
      
      <div className="bg-white rounded-lg p-5 mb-8 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Interested in Listing?</h4>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <a href="tel:+919381303558" className="hover:text-blue-600 transition-colors">+91 93813 03558</a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <a href="mailto:admin@sudharealty.in" className="hover:text-blue-600 transition-colors">admin@sudharealty.in</a>
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        
        <Button variant="outline" className='border-gray-300 hover:bg-white text-gray-700 font-medium' asChild>
          <Link href="/properties">
            <Home className="mr-2 h-4 w-4" />
            View Managed Properties
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CommunityListingsPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Mock empty properties array
  const properties: any[] = [];

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

          {/* Main Content - Listings */}
          <main className="lg:col-span-6 pt-15">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Community Listings
                </h1>
                <p className="text-sm text-gray-600 mt-1.5">
                  {properties.length} {properties.length === 1 ? 'listing' : 'listings'} available
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

            {/* Listings Display */}
            <div className="space-y-4">
              <EmptyState clearFilters={clearFilters} />
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