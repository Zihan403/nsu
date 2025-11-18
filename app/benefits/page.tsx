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
      isExternal: false
    },
    {
      title: "Car Servicing & Diagnostics Discount",
      discount: "10% OFF",
      description: "Receive 10% off on all car servicing, repairs, and diagnostics through MIDAS one of Melbourne's reliable automotive service providers supporting our alumni members.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
      color: "purple",
      link: "#",
      isExternal: false
    },
    {
      title: "Dining & Everyday Perk",
      discount: "10% OFF",
      description: "Enjoy 10% off at Hungry Jacks, exclusive to registered Melbourne NSUers members — a great way to save while connecting over casual meals with fellow alumni.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      color: "green",
      link: "#",
      isExternal: false
    },
    {
      title: "Giving Back & Volunteering",
      discount: "MAKE AN IMPACT",
      description: "Join our community initiatives and make a difference. Explore volunteer opportunities, gain event experience, and connect with purpose-driven members.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
      color: "orange",
      link: "/benefits/giving-back",
      isExternal: false
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
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

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Unlock These Benefits?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Register now to start enjoying exclusive member perks and discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/join"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Become a Member
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
