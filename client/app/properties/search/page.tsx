'use client';

import { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '@/store/store';
import { searchProperties, toggleFavorite } from '@/store/propertySlice';

function SearchPageContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const { properties, pagination, isLoading } = useSelector((state: RootState) => state.properties);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    page: '1'
  });

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchProperties({
        q: searchQuery,
        ...filters
      }) as any);
    }
  }, [dispatch, searchQuery, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: '1'
    }));
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600">
          {searchQuery ? `Results for "${searchQuery}"` : 'Search results'}
          {pagination && ` (${pagination.totalCount} properties found)`}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Refine Results</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="FRESH_SALES">Fresh Sales</option>
              <option value="RESALE">Resale</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-8">Searching properties...</div>
      ) : (
        <>
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold mb-2">No properties found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters
              </p>
              <Link 
                href="/properties" 
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Browse All Properties
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {property.images.length > 0 && (
                      <div className="h-48 relative">
                        <Image
                          src={property.images[0]}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/properties/${property.id}`}>
                          <h3 className="font-semibold hover:text-blue-600">{property.title}</h3>
                        </Link>
                        {user && (
                          <button
                            onClick={() => handleFavorite(property.id)}
                            className={`text-2xl ${property.isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                          >
                            ♥
                          </button>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-2">{property.location}</p>
                      <p className="text-blue-600 font-bold text-lg">₹{property.price.toLocaleString()}</p>
                      
                      <div className="flex mt-2 text-sm text-gray-500">
                        {property.bedrooms && <span className="mr-3">{property.bedrooms} Beds</span>}
                        {property.bathrooms && <span className="mr-3">{property.bathrooms} Baths</span>}
                        {property.area && <span>{property.area} sq ft</span>}
                      </div>
                      
                      <div className="mt-2 flex space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          property.category === 'FRESH_SALES' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.category.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          property.type === 'APARTMENTS' ? 'bg-blue-100 text-blue-800' :
                          property.type === 'VILLAS' ? 'bg-green-100 text-green-800' :
                          property.type === 'OPEN_PLOTS' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {property.type.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Link
                          href={`/properties/${property.id}`}
                          className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/properties/${property.id}/inquiry`}
                          className="flex-1 border border-blue-600 text-blue-600 text-center py-2 rounded hover:bg-blue-50"
                        >
                          Inquire
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// Loading component for Suspense fallback
function SearchPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded"></div>
        </div>

        {/* Filters skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Results grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="flex space-x-2">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-10 flex-1 bg-gray-200 rounded"></div>
                  <div className="h-10 flex-1 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}