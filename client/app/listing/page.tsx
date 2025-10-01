"use client";
import React from 'react';
import {Construction, Clock, Sparkles, ArrowRight, Home, Users } from 'lucide-react';
import Navbar from "@/components/Navbar";


const Listings = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
        <Navbar />
      
      
      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Animated Construction Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-white rounded-full p-8 shadow-xl border-4 border-indigo-100">
                <Construction className="w-20 h-20 text-indigo-600 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
              Coming Soon
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
              Community Listings
              <span className="block text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mt-2">
                Under Construction
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              We're building something special! This platform will allow property owners to showcase their properties and reach a wider audience.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Community Platform</h3>
              <p className="text-slate-600">
                This section will feature properties listed by individual owners looking to connect with potential buyers or tenants directly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Wider Reach</h3>
              <p className="text-slate-600">
                Property owners will be able to leverage our platform to gain visibility and connect with interested parties across the region.
              </p>
            </div>
          </div>

          {/* Disclaimer Box */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-2">Important Notice</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Properties in this section are independently listed by owners. Sudha Realty provides the platform but does not manage or verify these listings. All inquiries and transactions are directly between property owners and interested parties.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Looking for Professionally Managed Properties?
            </h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Browse our curated collection of properties managed and verified by the Sudha Realty team.
            </p>
            <button
              onClick={() => window.location.href = '/properties'}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View Managed Properties
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Timeline Hint */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Stay tuned! We're working hard to launch this feature soon.
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Listings;