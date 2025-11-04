'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import {
  Camera,
  LineChart,
  ShieldCheck,
  MessageSquareQuote,
  CheckCircle2,
  MapPin,
  FileText,
  Clock,
  Eye,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Navbar from '@/components/Navbar';

// ============================================================================
// FORM SCHEMA
// ============================================================================

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  whatsappNumber: z.string().min(10, 'Please enter a valid WhatsApp number.'),
  location: z.string().min(10, 'Please provide a location link or detailed landmarks.'),
  propertySchedule: z.any().refine((files) => files?.length === 1, "Property Schedule is required."),
  layoutCopy: z.any().optional(),
});

// ============================================================================
// CONSTANTS
// ============================================================================

const SERVICE_FEATURES = [
  {
    icon: Camera,
    title: 'Current Photos',
    description: 'High-resolution images of your property showing its present condition and any changes.',
  },
  {
    icon: LineChart,
    title: 'Market Analysis',
    description: 'Up-to-date assessment of your property\'s market value and investment potential.',
  },
  {
    icon: ShieldCheck,
    title: 'Status Verification',
    description: 'Comprehensive verification of physical status and any other noticeable changes.',
  },
  {
    icon: MessageSquareQuote,
    title: 'Expert Insights',
    description: 'Professional recommendations on property management and value optimization.',
  },
];

const KEY_BENEFITS = [
  {
    icon: Eye,
    title: 'Property Inspection',
    description: 'Scheduled visit and detailed report on your property\'s condition.',
  },
  {
    icon: Shield,
    title: 'Protection from Encroachment',
    description: 'Early detection of unauthorized occupation or boundary disputes.',
  },
  {
    icon: TrendingUp,
    title: 'Value Tracking',
    description: 'Keep track of your property\'s market value and appreciation.',
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PropertyGuardianPage() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsappNumber: '',
      location: '',
      propertySchedule: undefined,
      layoutCopy: undefined,
    },
  });

  const propertyScheduleRef = form.register("propertySchedule");
  const layoutCopyRef = form.register("layoutCopy");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowSuccessDialog(true);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Service Information */}
            <div className="lg:col-span-7 space-y-8 pt-8">
              {/* Hero Section */}
              <div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                  Property <span className='text-indigo-600'>Inspection</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Peace of mind for absentee landowners. We act as your eyes on the ground, 
                  providing detailed updates on your property so you can manage 
                  your investment from anywhere in the world.
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What's Included in Your Report
                </h2>
                <div className="space-y-5">
                  {SERVICE_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              {/* <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose Property Monitoring?
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {KEY_BENEFITS.map((benefit, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                        <benefit.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Who Is This For */}
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Who Is This Service For?
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>NRI property owners living abroad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Investors with multiple properties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Property owners in different cities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Anyone who can't regularly visit their property</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Request Form */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 pt-8">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  {/* Form Header */}
                  <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                      Request Your Report
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Fill in your details and we'll contact you with a personalized quote.
                    </p>
                  </div>

                  {/* Form Content */}
                  <div className="p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-gray-900">
                                  Full Name
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                   
                                    {...field}
                                    className="border-gray-200 focus:ring-2 focus:ring-blue-600"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-gray-900">
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                  
                                    {...field}
                                    className="border-gray-200 focus:ring-2 focus:ring-blue-600"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* WhatsApp Number */}
                        <FormField
                          control={form.control}
                          name="whatsappNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-900">
                                WhatsApp Number
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+91 12345 67890" 
                                  {...field}
                                  className="border-gray-200 focus:ring-2 focus:ring-blue-600"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Property Location */}
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-900">
                                Property Location
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Google Maps link or detailed landmarks..."
                                  className="min-h-[80px] border-gray-200 focus:ring-2 focus:ring-blue-600"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* File Uploads */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="propertySchedule"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-gray-900">
                                  Property Schedule *
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    type="file"
                                    accept="image/*,.pdf"
                                    {...propertyScheduleRef}
                                    className="border-gray-200 text-sm"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="layoutCopy"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-gray-900">
                                  Layout Copy (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    type="file"
                                    accept="image/*,.pdf"
                                    {...layoutCopyRef}
                                    className="border-gray-200 text-sm"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 shadow-sm"
                        >
                          Submit for Quote
                        </Button>
                      </form>
                    </Form>

                    {/* Additional Info */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-start gap-3 text-xs text-gray-600">
                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                        <p>
                          Our team typically responds within 24 hours with a customized 
                          quote based on your property's location and requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Request Received!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Thank you for your submission. Our Property Guardian team has received your 
              details and will get back to you within 24 hours with a personalized quote 
              for your property monitoring service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowSuccessDialog(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}