'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../../store/store';
import Image from 'next/image';
import { createAppointment } from '../../store/appointmentSlice';
import {
  Calendar,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  FileText,
  Shield,
  Star,
  AlertCircle,
  Loader2,
  CreditCard,
  QrCode,
  IndianRupee,
  Info,
  ArrowRight,
  Award,
  User
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function BookAppointmentPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, error } = useSelector((state: RootState) => state.appointments);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAppointment(formData) as any).unwrap();
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setCurrentStep(3);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8 pt-16 sm:pt-20">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  currentStep >= 1 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {currentStep > 1 ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : '1'}
                </div>
                <p className={`text-xs sm:text-sm font-medium mt-2 ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                  Payment
                </p>
              </div>
              
              <div className={`h-0.5 flex-1 mx-3 sm:mx-6 transition-colors ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  currentStep >= 2 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {currentStep > 2 ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : '2'}
                </div>
                <p className={`text-xs sm:text-sm font-medium mt-2 ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                  Details
                </p>
              </div>
              
              <div className={`h-0.5 flex-1 mx-3 sm:mx-6 transition-colors ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  currentStep >= 3 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {currentStep > 3 ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : '3'}
                </div>
                <p className={`text-xs sm:text-sm font-medium mt-2 ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                  Done
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-emerald-50 p-6 sm:p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                    <p className="text-sm sm:text-base text-gray-600">Your consultation request has been submitted successfully</p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Quick Response</p>
                      <p className="text-xs text-gray-600">Verification within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Email Update</p>
                      <p className="text-xs text-gray-600">Details sent to your inbox</p>
                    </div>
                  </div>
                </div>
                <Link href="/">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg border border-red-200 p-4 sm:p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Booking Failed</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-20 space-y-5">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Star className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Included Services</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Expert Consultation</p>
                      <p className="text-xs text-gray-600">One-on-one with senior advisor.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Property Analysis</p>
                      <p className="text-xs text-gray-600">Detailed evaluation of your property interests.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Market Insights</p>
                      <p className="text-xs text-gray-600">Current trends and investment opportunities.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Personalised Recommendations</p>
                      <p className="text-xs text-gray-600">Tailored advice based on your needs.</p>
                    </div>
                  </div>
                 
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Why Choose Us</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 font-medium">•</span>
                    <span>20+ years expertise</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 font-medium">•</span>
                    <span>Certified consultant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 font-medium">•</span>
                    <span>End-to-end support</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Center - Main Form */}
          <main className="lg:col-span-6">
            {/* Step 1: Payment */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Consultation Fee</h2>
                      <p className="text-sm text-gray-600">Secure your expert slot</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-8 text-center border border-gray-200">
                    <p className="text-gray-600 text-sm mb-2">One-Time Fee</p>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <IndianRupee className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" />
                      <span className="text-5xl sm:text-6xl font-bold text-gray-900">2999</span>
                    </div>
                    <p className="text-sm text-gray-500">Professional consultation</p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
                    <div className="text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <QrCode className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Scan to Pay</h3>
                      <p className="text-sm text-gray-600 mb-8">Use any UPI app</p>
                      
                      <div className="w-56 h-56 sm:w-64 sm:h-64 bg-gray-50 rounded-lg mx-auto mb-8 flex items-center justify-center border border-gray-200">
                        <Image 
                          src="/QR.png"
                          alt="QR Code"
                          height={224} 
                          width={224} 
                          className="object-contain" 
                        />
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                        <div className="flex items-start space-x-3">
                          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-2">Instructions</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Open Google Pay or PhonePe</li>
                              <li>• Scan QR code above</li>
                              <li>• Enter ₹2999 and confirm</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold flex items-center justify-center space-x-2"
                      >
                        <span>Payment Completed</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Your Information</h2>
                      <p className="text-sm text-gray-600">Complete your booking</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                          required
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Requirements & Preferred Dates *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us about your property needs and include 3 preferred consultation dates/times.&#10;&#10;Example: Looking for 3BHK in Banjara Hills. Dates: Jan 15 (10 AM), Jan 17 (2 PM), Jan 20 (11 AM)"
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 resize-none"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-2">Include at least 3 preferred dates and times</p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-5 h-5" />
                            <span>Confirm Booking</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-20 space-y-5">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Process</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-blue-600 text-sm">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Payment</p>
                        <p className="text-xs text-gray-600">Complete ₹2999 via UPI</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-blue-600 text-sm">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Details</p>
                        <p className="text-xs text-gray-600">Provide information</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-blue-600 text-sm">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Verification</p>
                        <p className="text-xs text-gray-600">Within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-blue-600 text-sm">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Meet Expert</p>
                        <p className="text-xs text-gray-600">Scheduled consultation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                  <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-blue-600"/>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      Need Help?
                    </h3>
                    <p className="text-xs text-gray-600">
                      Contact our support
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">+91 93813 03558</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">admin@sudharealty.in</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Secure</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All payments verified by admin. Your slot is secured after confirmation.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}