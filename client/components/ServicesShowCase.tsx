import { Shield, Users, Eye, Building2, MapPin, Camera, ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesShowcase() {
  const services = [
    {
      icon: Shield,
      badge: "Property Monitoring",
      title: "Property Inspection",
      tagline: "Your Eyes on the Land, Wherever You Are",
      description: "Professional property monitoring service for absentee landowners. Get regular detailed reports with photos, market analysis, and status verification—manage your investment from anywhere in the world.",
      features: [
        "High-resolution property photos",
        "Market value assessment",
        "Physical status verification",
        "Expert recommendations"
      ],
      color: "from-blue-600 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      badgeColor: "bg-blue-100 text-blue-900",
      link: "/property-monitoring"
    },
    {
      icon: Users,
      badge: "Community Platform",
      title: "Community Listings",
      tagline: "Connect Directly with Property Owners",
      description: "A dedicated platform for property owners to showcase their properties directly to thousands of potential buyers and tenants. Wide reach, verified inquiries, and professional listing features.",
      features: [
        "Wide audience reach",
        "Professional platform",
        "Verified inquiries",
        "Direct owner connection"
      ],
      color: "from-purple-600 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      badgeColor: "bg-purple-100 text-purple-900",
      link: "/listing"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50/30 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">


          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
            Beyond Traditional{" "}
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent font-semibold">
              Real Estate Services
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Innovative solutions designed for modern property owners and investors who need more than just buying and selling support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-br ${service.bgColor} p-8 border-b border-gray-100`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`px-3 py-1.5 ${service.badgeColor} rounded-full`}>
                      <span className="text-xs font-medium">{service.badge}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {service.tagline}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a href={service.link}>
                    <button className={`w-full px-6 py-3.5 bg-gradient-to-r ${service.color} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3`}>
                      Learn More
                      <ArrowRight className="w-5 h-5 transition-all" />
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info Card */}
        {/* <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                Need Help Choosing the Right Service?
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Our team is ready to understand your unique requirements and recommend the perfect solution. 
                Whether you're an NRI investor, property owner, or looking to list your property—we've got you covered.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a href="/book-appointment">
                <button className="w-full px-6 py-3.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  Book Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </a>
              <a href="/contact">
                <button className="w-full px-6 py-3.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}