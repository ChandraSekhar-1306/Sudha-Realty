'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '../../../store/store';
import { getProperty, toggleFavorite } from '../../../store/propertySlice';
import {
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Square,
  Eye,
  Check,
  ArrowLeft,
} from 'lucide-react';

// shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function PropertyDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;

  const { currentProperty: property, isLoading } = useSelector((state: RootState) => state.properties);
  const { user, admin } = useSelector((state: RootState) => state.auth);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!user && !admin) {
      router.push('/auth');
      return;
    }
    if (propertyId) {
      dispatch(getProperty(propertyId) as any);
    }
  }, [dispatch, propertyId, user, admin, router]);

  const handleFavorite = () => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    if (property) {
      dispatch(toggleFavorite(property.id) as any);
    }
  };

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'FRESH_SALES':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'RESALE':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
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
      case 'FARMLAND':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (!user && !admin) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="p-6 pb-2">
          <div className="inline-flex items-center space-x-2 text-slate-500 text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Loading...</span>
          </div>
        </div>

        {/* Hero skeleton */}
        <div className="px-6 pt-2">
          <Card className="overflow-hidden border-slate-200">
            <Skeleton className="h-[32rem] w-full" />
          </Card>
        </div>

        {/* Content skeletons */}
        <div className="px-6 py-8 space-y-6">
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-40" />
              <div className="flex gap-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-10 w-40" />
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-32 mb-4" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <Card className="w-full max-w-md border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Property not found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href={user ? '/properties' : '/admin/properties'}>Back to Properties</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const backHref = user ? '/properties' : '/admin/properties';

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Top bar / Breadcrumb */}
        <div className="p-6 pb-2">
          <Button asChild variant="ghost" className="h-9 px-2 text-slate-600 hover:text-blue-600">
            <Link href={backHref} className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Properties</span>
            </Link>
          </Button>
        </div>

        {/* HERO — full-width image gallery */}
        <div className="px-6 pt-2">
          <Card className="overflow-hidden border-slate-200">
            {property.images.length > 0 ? (
              <div className="relative">
                {/* Main Image */}
                <div className="relative h-[32rem] md:h-[36rem] w-full">
                  <Image
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 shadow-sm bg-white/90 hover:bg-white"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 shadow-sm bg-white/90 hover:bg-white"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </>
                  )}

                  {/* Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs tracking-wide">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>

                  {/* Favorite */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant={property.isFavorite ? 'default' : 'secondary'}
                          onClick={handleFavorite}
                          className={property.isFavorite ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-white/90 hover:bg-white'}
                          aria-label="Toggle favorite"
                        >
                          <Heart className={`w-4 h-4 ${property.isFavorite ? 'fill-current' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{property.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Thumbnails */}
                {property.images.length > 1 && (
                  <div className="p-3 bg-slate-50 border-t border-slate-200">
                    <div className="flex gap-2 overflow-x-auto">
                      {property.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative h-14 w-20 flex-shrink-0 rounded overflow-hidden border transition-colors ${
                            currentImageIndex === index ? 'border-blue-500' : 'border-slate-300'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        >
                          <Image src={image} alt={`${property.title} ${index + 1}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[32rem] md:h-[36rem] bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-slate-500 text-sm">No images available</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* CONTENT — full-width, minimal cards */}
        <div className="px-6 py-8 space-y-6">
          {/* Main Info */}
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(property.category)}`}>
                  {property.category.replace('_', ' ')}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(property.type)}`}>
                  {property.type.replace('_', ' ')}
                </span>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900">{property.title}</h1>
                  <div className="mt-2 inline-flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()}</div>
              </div>

              <Separator className="my-6" />

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-slate-700">
                {property.bedrooms && (
                  <div className="inline-flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>
                      <span className="font-medium">{property.bedrooms}</span> Beds
                    </span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="inline-flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span>
                      <span className="font-medium">{property.bathrooms}</span> Baths
                    </span>
                  </div>
                )}
                {property.area && (
                  <div className="inline-flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    <span>
                      <span className="font-medium">{property.area}</span> sq ft
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button asChild className='bg-blue-600 hover:bg-blue-700 text-white'>
                  <Link href={`/properties/${property.id}/inquiry`}>Send Inquiry</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Description</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-slate-700 text-sm leading-relaxed">{property.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-900">Features</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
