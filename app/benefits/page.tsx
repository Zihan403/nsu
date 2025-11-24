import Image from 'next/image'
import Link from 'next/link'

export default function Benefits() {
  const perks = [
    {
      title: "Professional Services Discount",
      discount: "10% OFF",
      description: "Enjoy 10% off professional financial, tax, and wealth advisory services through our official partner, The HR Block — a leading Melbourne-based financial advisory firm supporting the NSUers community.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
      color: "blue",
      link: "#",
      isExternal: false,
      status: "active"
    },
    {
      title: "Car Servicing & Diagnostics Discount",
      discount: "COMING SOON",
      description: "Receive discounts on car servicing, repairs, and diagnostics through MIDAS one of Melbourne's reliable automotive service providers. Coming soon for Melbourne NSUers members.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
      color: "purple",
      link: "#",
      isExternal: false,
      status: "coming-soon"
    },
    {
      title: "Dining & Everyday Perk",
      discount: "COMING SOON",
      description: "Exclusive dining perks coming soon for registered Melbourne NSUers members — a great way to save while connecting over casual meals with fellow alumni.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      color: "green",
      link: "#",
      isExternal: false,
      status: "coming-soon"
    },
    {
      title: "Giving Back & Volunteering",
      discount: "MAKE AN IMPACT",
      description: "Join our community initiatives and make a difference. Explore volunteer opportunities, gain event experience, and connect with purpose-driven members.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
      color: "orange",
      link: "/benefits/giving-back",
      isExternal: false,
      status: "active"
    }
  ]

  const colorClasses = {
    blue: {
      badge: "bg-gradient-to-r from-blue-600 to-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200"
    },
    purple: {
      badge: "bg-gradient-to-r from-purple-600 to-purple-700",
      button: "bg-purple-600 hover:bg-purple-700",
      border: "border-purple-200"
    },
    green: {
      badge: "bg-gradient-to-r from-green-600 to-green-700",
      button: "bg-green-600 hover:bg-green-700",
      border: "border-green-200"
    },
    orange: {
      badge: "bg-gradient-to-r from-orange-600 to-orange-700",
      button: "bg-orange-600 hover:bg-orange-700",
      border: "border-orange-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Perks & Benefits</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Our registered members enjoy exclusive perks designed to add value to their professional, personal, 
              and community lives — celebrating what it means to be part of the Melbourne NSUers network.
            </p>
          </div>
        </div>
      </div>

      {/* Perks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Member Perks Include:</h2>
          <p className="text-lg text-gray-600">Exclusive discounts and benefits for registered members</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={perk.image}
                  alt={perk.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                {/* Discount Badge */}
                <div className={`absolute top-4 right-4 ${colorClasses[perk.color as keyof typeof colorClasses].badge} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg`}>
                  {perk.discount}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 min-h-[56px]">
                  {perk.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-[120px]">
                  {perk.description}
                </p>
                {perk.link.startsWith('/') ? (
                  <Link 
                    href={perk.link}
                    className={`w-full ${colorClasses[perk.color as keyof typeof colorClasses].button} text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2`}
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <button 
                    className={`w-full ${colorClasses[perk.color as keyof typeof colorClasses].button} text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2`}
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Future Perks Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border-2 border-indigo-200">
          <div className="text-center">
            <div className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-bold mb-4">
              COMING SOON
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Future Partner Offers</h3>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              More exciting discounts and collaborations coming soon across hospitality, retail, lifestyle, 
              and education sectors. Stay tuned for more ways to enjoy being a Melbourne NSUers member!
            </p>
          </div>
        </div>
      </div>

      {/* Join Our Community CTA */}
      <div className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Unlock These Benefits?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join our community and start enjoying exclusive member perks, discounts, and networking opportunities today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Register Now Card */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h-2m0 0H10m2 0v2m0-2v-2m7 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Register Now</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                Start enjoying 10% discounts on services, dining, and more. Join our thriving community of alumni.
              </p>
              <a 
                href="/login"
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Learn More Card */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Learn More</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                Questions about our benefits or membership? Our team is here to help you get the most out of your membership.
              </p>
              <a 
                href="/contact"
                className="inline-block w-full text-center border-2 border-blue-400 text-blue-300 hover:bg-blue-600/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
