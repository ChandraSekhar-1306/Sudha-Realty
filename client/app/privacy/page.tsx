import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-gray-600 font-light text-lg">
            Effective date: October 3, 2025
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <p className="text-gray-700 leading-relaxed font-light">
              At <span className="font-semibold text-gray-900">Sudha Realty</span>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you share with us through our website, consultation bookings, and property inquiries.
            </p>
          </div>

          {/* Section 1 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed font-light mb-4">
              We collect personal information that you voluntarily provide when interacting with our platform. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 font-light space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Details shared during property consultations or inquiries</li>
              <li>Payment details for consultation fees (processed securely via trusted payment partners)</li>
              <li>Technical information such as your IP address, browser type, and device information</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed font-light mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 font-light space-y-2">
              <li>Respond to your inquiries and consultation requests</li>
              <li>Process bookings and communicate updates</li>
              <li>Provide property recommendations and personalized service</li>
              <li>Improve our website’s functionality and user experience</li>
              <li>Comply with legal obligations and prevent fraudulent activity</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed font-light">
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. This includes secure data transmission (HTTPS), encrypted storage, and restricted access to sensitive information.  
              While we take reasonable precautions, no system is completely secure, and you share information with us at your own risk.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Sharing Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed font-light mb-4">
              We do not sell, rent, or trade your personal data. We may share information only in the following cases:
            </p>
            <ul className="list-disc list-inside text-gray-700 font-light space-y-2">
              <li>With service providers (e.g., email, payment, or hosting partners) to help us operate our services</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, users, or property from fraud or abuse</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed font-light">
              Our website may use cookies and similar technologies to improve user experience, analyze traffic, and remember your preferences. You can adjust your browser settings to disable cookies, though some features may not function properly as a result.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed font-light mb-4">
              Depending on your location, you may have rights regarding your personal data, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 font-light space-y-2">
              <li>Accessing the personal information we hold about you</li>
              <li>Requesting corrections or deletion of your data</li>
              <li>Withdrawing consent for data processing (where applicable)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-light mt-4">
              To exercise these rights, contact us at{" "}
              <a href="mailto:admin@sudharealty.in" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                admin@sudharealty.in
              </a>.
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed font-light">
              We retain your personal information only for as long as necessary to provide our services, fulfill legal obligations, or resolve disputes. When no longer required, your data will be securely deleted or anonymized.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed font-light mb-4">
              We may update this Privacy Policy periodically to reflect changes in our data practices or legal requirements. The revised version will be posted on this page with an updated effective date.
            </p>
            <p className="text-gray-700 leading-relaxed font-light">
              We encourage you to review this page occasionally to stay informed about how we protect your data.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed font-light mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-700 font-light">
                Email:{" "}
                <a href="mailto:admin@sudharealty.in" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  admin@sudharealty.in
                </a>
              </p>
              <p className="text-gray-700 font-light">
                Phone:{" "}
                <a href="tel:+919381303558" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  +91 93813 03558
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 font-light">
            © {new Date().getFullYear()} Sudha Realty. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
