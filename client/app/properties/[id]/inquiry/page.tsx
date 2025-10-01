'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../../../../store/store';
import { getProperty } from '../../../../store/propertySlice';
import { createInquiry } from '../../../../store/inquirySlice';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  CheckCircle,
  ExternalLink,
  Home,
  Calendar,
  Heart,
  LogOut,
  ChevronRight,
  Send
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function InquiryPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentProperty: property } = useSelector((state: RootState) => state.properties);
  const { isLoading, error } = useSelector((state: RootState) => state.inquiries);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
  }, [dispatch, user, router]);

  useEffect(() => {
    if (propertyId) {
      dispatch(getProperty(propertyId) as any);
    }
  }, [dispatch, propertyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const inquiryData = {
      propertyId,
      ...formData
    };
    
    try {
      await dispatch(createInquiry(inquiryData) as any).unwrap();
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }
  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2 mt-6">
              <Home className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-900">Sudha Realty</h1>
            </div>
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/properties" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Properties</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/my-inquiries" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>My Inquiries</span>
            </Link>
            <Link href="/book-appointment" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <Link href="/favorites" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
            <div className="border-t border-slate-200 mt-4 pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-700 hover:bg-red-100 transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>LogOut</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              href={`/properties/${propertyId}`} 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Property</span>
            </Link>
          </div>

          <div className="max-w-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Send Inquiry</h1>
              <p className="text-slate-600">Get in touch with us about this property</p>
            </div>

            {/* Property Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-slate-900 text-lg">{property.title}</h2>
                  <div className="flex items-center space-x-1 text-slate-600 mt-1 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">₹{property.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-900">Inquiry Sent Successfully!</h3>
                    <p className="text-emerald-700 mt-1">We have received your inquiry and will contact you soon.</p>
                    <div className="mt-3">
                      <Link 
                        href="/my-inquiries" 
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View My Inquiries</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
                <p className="text-rose-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Please provide details about your inquiry..."
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}