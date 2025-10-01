'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../../../../store/store';
import { createProperty } from '../../../../store/adminSlice';
import {
  Building,
  Users,
  Calendar,
  MessageSquare,
  LogOut,
  Home,
  ChevronRight,
  Plus,
  X,
  MapPin,
  IndianRupee,
  Square,
  Bed,
  Bath,
  Star,
  Upload,
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

export default function AddPropertyPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { admin } = useSelector((state: RootState) => state.auth);
  const { isLoading, error } = useSelector((state: RootState) => state.admin);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    category: 'FRESH_SALES',
    type: 'APARTMENTS',
    features: [''],
    coordinates: {
      lat: '',
      lng: ''
    }
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('coordinates.')) {
      const coord = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [coord]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  router.push("/");
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // required fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('type', formData.type);

    // optional numeric fields
    if (formData.area) {
      formDataToSend.append('area', formData.area);
    }
    if (formData.bedrooms) {
      formDataToSend.append('bedrooms', formData.bedrooms);
    }
    if (formData.bathrooms) {
      formDataToSend.append('bathrooms', formData.bathrooms);
    }

    // optional features
    const validFeatures = formData.features.filter(f => f.trim() !== '');
    if (validFeatures.length > 0) {
      formDataToSend.append('features', JSON.stringify(validFeatures));
    }

    // optional coordinates
    if (formData.coordinates.lat && formData.coordinates.lng) {
      const lat = String(formData.coordinates.lat);
      const lng = String(formData.coordinates.lng);
      formDataToSend.append('coordinates', JSON.stringify({ lat, lng }));
    }

    // images
    images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    // debug log
    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      await dispatch(createProperty(formDataToSend) as any).unwrap();
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/properties');
      }, 2000);
      alert('Property created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create property');
    }
  };

  if (!admin) {
    router.push('/auth');
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
        <main className="flex-1 p-6">
          {/* Header Section */}
          
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-slate-600 mb-3">
              <Link href="/admin" className="hover:text-violet-600 transition-colors">
                Admin
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/admin/properties" className="hover:text-violet-600 transition-colors">
                Properties
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Add Property</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
              <Plus className="w-8 h-8 text-violet-600" />
              <span>Add New Property</span>
            </h1>
            <p className="text-slate-600 mt-2">Fill in the details to create a new property listing</p>
          </div>

         

          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* Success Message */}
              {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Property created successfully! Redirecting...</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl mb-6 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span>Property Details</span>
                  </h2>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                        Property Title *
                      </label>
                      <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter property title"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                        Description *
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Describe the property..."
                        required
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="w-4 h-4" />
                          <span>Price *</span>
                        </div>
                      </label>
                      <Input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter price"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>Location *</span>
                        </div>
                      </label>
                      <Input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter location"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                        Category *
                      </label>
                       <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Options</SelectLabel>
                              <SelectItem value="FRESH_SALES">Fresh Sales</SelectItem>
                              <SelectItem value="RESALE">Resale</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                    </div>

                    {/* Type */}
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
                        Property Type *
                      </label>
                          <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Property Type" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Options</SelectLabel>
                              <SelectItem value="OPEN_PLOTS">Open Plot</SelectItem>
                              <SelectItem value="APARTMENTS">Apartment</SelectItem>
                              <SelectItem value="VILLAS">Villa</SelectItem>
                              <SelectItem value="FARMLAND">Farmland</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    {/* Area */}
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-slate-700 mb-2">
                        <div className="flex items-center space-x-1">
                         
                          <span>Area (sq ft)</span>
                        </div>
                      </label>
                      <Input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter area"
                      />
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-700 mb-2">
                        <div className="flex items-center space-x-1">
                          <Bed className="w-4 h-4" />
                          <span>Bedrooms</span>
                        </div>
                      </label>
                      <Input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Number of bedrooms"
                      />
                    </div>

                    {/* Bathrooms */}
                    <div>
                      <label htmlFor="bathrooms" className="block text-sm font-medium text-slate-700 mb-2">
                        <div className="flex items-center space-x-1">
                          <Bath className="w-4 h-4" />
                          <span>Bathrooms</span>
                        </div>
                      </label>
                      <Input
                        type="number"
                        id="bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Number of bathrooms"
                      />
                    </div>

                    {/* Coordinates */}
                    <div>
                      <label htmlFor="coordinates.lat" className="block text-sm font-medium text-slate-700 mb-2">
                        Latitude
                      </label>
                      <Input
                        type="number"
                        step="any"
                        id="coordinates.lat"
                        name="coordinates.lat"
                        value={formData.coordinates.lat}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter latitude"
                      />
                    </div>

                    <div>
                      <label htmlFor="coordinates.lng" className="block text-sm font-medium text-slate-700 mb-2">
                        Longitude
                      </label>
                      <Input
                        type="number"
                        step="any"
                        id="coordinates.lng"
                        name="coordinates.lng"
                        value={formData.coordinates.lng}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter longitude"
                      />
                    </div>

                    {/* Features */}
                    <div className="md:col-span-2">
                      <label className="flex text-sm font-medium text-slate-700 mb-2  items-center space-x-1">
                       
                        <span>Features</span>
                      </label>
                      <div className="space-y-3">
                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              type="text"
                              value={feature}
                              onChange={(e) => handleFeatureChange(index, e.target.value)}
                              className="flex-1 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="Enter feature"
                            />
                           <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="inline-flex items-center justify-center rounded-md border border-transparent hover:border-rose-500 hover:border-[1px] hover:cursor-pointer hover:bg-rose-50 text-rose-600 hover:text-rose-700 transition-colors p-2"
                            title="Remove feature"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addFeature}
                          className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center space-x-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Feature</span>
                        </button>
                      </div>
                    </div>

                    {/* Images */}
                    <div className="md:col-span-2">
                      <label htmlFor="images" className="flex text-sm font-medium text-slate-700 mb-2  items-center space-x-1">
                        <Upload className="w-4 h-4" />
                        <span>Property Images</span>
                      </label>
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {images.length > 0 && (
                        <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Selected: {images.length} image(s)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-200">
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      onClick={() => router.push('/admin/properties')}
                      className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Create Property</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}