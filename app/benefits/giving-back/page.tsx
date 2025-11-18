import Link from 'next/link'

export default function GivingBack() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark Blue */}
      <div className="bg-[#1a1f71] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold">Giving back</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/benefits" className="hover:text-blue-600">Benefits</Link>
            <span>/</span>
            <span className="text-gray-900">Giving back</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="mb-20">
          <p className="text-[#1a1f71] text-xl leading-relaxed max-w-4xl">
            Share your advice and experience by mentoring, offer employment opportunities, or help us offer 
            financial support to initiatives or students in need.
          </p>
        </div>

        {/* Three Pillars Section */}
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          {/* Internships and Talent */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <svg className="w-24 h-24 text-[#1a1f71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#1a1f71] mb-4">Internships and talent</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Get in touch with students and recent graduates to offer internships and promote job opportunities.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center text-[#1a1f71] font-semibold hover:underline group"
            >
              Find NSU talent
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mentoring */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <svg className="w-24 h-24 text-[#1a1f71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#1a1f71] mb-4">Mentoring</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Share your knowledge and expertise to inspire the next generation of leaders and industry professionals.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center text-[#1a1f71] font-semibold hover:underline group"
            >
              Become a mentor
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Gifts and Financial Support */}
          <div className="text-center">
            <div className="mb-6 flex justify-center relative">
              <svg className="w-24 h-24 text-[#1a1f71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
              <div className="absolute top-2 right-8 w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold text-[#1a1f71] mb-4">Gifts and financial support</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Your donation or gift can create transformative experiences for students, researchers, industry, and the community.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center text-[#1a1f71] font-semibold hover:underline group"
            >
              Find ways to give
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Volunteer Opportunities Section */}
        <div className="border-t-2 border-gray-200 pt-16 mb-16">
          <h2 className="text-3xl font-bold text-[#1a1f71] mb-8">Volunteer & Get Involved</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Community Events */}
            <div className="border-l-4 border-[#1a1f71] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Event Volunteer</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Help organize and run NSU alumni events, networking sessions, and cultural celebrations. 
                Gain event management experience, expand your network, and connect with diverse members.
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Time commitment:</span> Flexible - 4-8 hours per event
              </p>
            </div>

            {/* Career Workshops */}
            <div className="border-l-4 border-[#1a1f71] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Workshop Facilitator</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Share your professional expertise by conducting workshops on resume building, interview skills, 
                or industry insights. Establish thought leadership and public speaking experience.
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Time commitment:</span> 2-4 hours per workshop
              </p>
            </div>

            {/* Student Support */}
            <div className="border-l-4 border-[#1a1f71] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Student Support & Mentorship</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Guide new international students settling into Melbourne. Share your experiences, provide advice, 
                and help them navigate university life while building meaningful connections.
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Time commitment:</span> 2-3 hours per month
              </p>
            </div>

            {/* Content Creation */}
            <div className="border-l-4 border-[#1a1f71] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Content Creation & Social Media</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Create engaging content and manage social media campaigns. Build your portfolio, develop 
                digital marketing skills, and enjoy remote flexibility.
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Time commitment:</span> Flexible - Remote opportunity
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#1a1f71] text-white py-12 px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Whether you want to mentor, volunteer, or provide financial support — every contribution helps shape the future of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#1a1f71] px-8 py-3 font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Involved
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/benefits"
              className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              Back to Benefits
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

