import { CheckCircle, Award, Target, TrendingUp, Shield, Clock, Users, Lightbulb, IndianRupee } from 'lucide-react';

export default function ConsultationValue() {
  const benefits = [
    {
      icon: Target,
      title: "Expert Property Analysis",
      description: "Detailed evaluation of properties matching your specific requirements and budget"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Current trends, pricing analysis, and future growth potential in your preferred areas"
    },
    {
      icon: Lightbulb,
      title: "Personalized Recommendations",
      description: "Tailored advice based on your unique needs, whether buying, selling, or investing"
    },
    {
      icon: Shield,
      title: "End-to-End Support",
      description: "Comprehensive assistance throughout your property journey with expert guidance"
    }
  ];

  const valuePoints = [
    "20+ years of proven expertise in Hyderabad real estate",
    "Strong negotiation skills saving you lakhs",
    "Verified properties with complete legal clarity",
   
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
           Benefits Of A{" "}
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent font-semibold">
              Professional Consultation
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Your consultation is an investment in making the right property decision—potentially saving you lakhs while securing your dream home or investment.          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: What You Get */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-900">What's Included</span>
            </div>
            
            <div className="space-y-5">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 tracking-wide">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-light leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Value Proposition */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Your Advantages</span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <div className="space-y-4 mb-8">
                {valuePoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 font-light leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-semibold text-gray-900">Time-Saving Promise</h4>
                </div>
                <p className="text-gray-700 text-sm font-light leading-relaxed">
                  Skip months of property hunting confusion. Get expert guidance that fast-tracks your search with pre-verified options matching your exact criteria.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-xl p-6 border border-amber-200/50 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2 tracking-wide">
                  Independent Consultation
                </h4>
                <p className="text-gray-700 text-sm font-light leading-relaxed">
                  This consultation is designed for clarity and guidance—there's <span className="font-medium text-gray-900">no obligation to buy property through Sudha Realty</span>. Whether you're feeling confused about the market or exploring your options, our expert advice empowers you to make informed decisions and purchase from anywhere that suits you best.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4 tracking-tight">
                Schedule Your Consultation
              </h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Join hundreds of satisfied clients who made informed property decisions with professional guidance. Take the first step towards your dream property today!
              </p>
             
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="w-6 h-6 text-gray-900" />
                <span className="text-4xl font-bold text-gray-900">2,999</span>
              </div>
              
              <a href="/book-appointment">
                <button className="w-full px-6 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  Book Your Consultation
                  <Award className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}