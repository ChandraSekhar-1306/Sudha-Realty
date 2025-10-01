import Image from "next/image";
import { Award, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";


const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-background to-secondary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Professional Photo */}
          <div className="relative">
            <div className="relative z-10 animate-scale-in">
              <Image
                src="/pic.jpg"
                alt="Sudha - Professional Real Estate Expert and Consultant"
                width={400}
                height={500}
                className="w-full max-w-md mx-auto rounded-2xl shadow-elegant hover-lift"
                priority
              />
            </div>
          </div>

          {/* About Content */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6 tracking-tight leading-tight">
              Meet Your Trusted{" "}
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent font-semibold">
                Real Estate Expert
              </span>
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light tracking-wide">
                With more than twenty years of trusted experience in real estate, I take great pride in helping clients and their families find the perfect homes and make wise investment choices. My commitment to honesty, heartfelt guidance, and personalized care has helped many families turn their real estate dreams into reality.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light tracking-wide">
               Whether you’re a first-time buyer, a seasoned investor, or planning to sell, I’m dedicated to supporting you every step of the way. With deep market knowledge and strong negotiation skills, I strive to create positive, stress-free experiences, building lasting relationships based on trust and shared success.
              </p>
            </div>

            {/* Key Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 hover:border-indigo-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                <div>
                  <h4 className="font-medium text-foreground tracking-wide">
                    Market Expertise
                  </h4>
                  <p className="text-sm text-muted-foreground font-light">
                    Deep local market knowledge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 hover:border-indigo-200 transition-colors">
                <Heart className="w-6 h-6 text-indigo-600" />
                <div>
                  <h4 className="font-medium text-foreground tracking-wide">
                    Client First
                  </h4>
                  <p className="text-sm text-muted-foreground font-light">
                    Your success is my priority
                  </p>
                </div>
              </div>
            </div>
            <Link href={"/book-appointment"}>
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base tracking-wide rounded-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 flex items-center gap-3 group border border-indigo-500/30">
              Schedule Personal Consultation
              <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
