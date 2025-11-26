import Image from 'next/image'

export default function About() {
  const teamMembers = [
    {
      name: "Dr. Rashid Ahmed",
      role: "President",
      year: "EEE '08",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Senior Software Architect at Atlassian with 15+ years in tech leadership."
    },
    {
      name: "Fatima Khan",
      role: "Vice President",
      year: "BBA '12",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", 
      bio: "Financial Controller at ANZ Bank, specializing in corporate finance and risk management."
    },
    {
      name: "Mohammad Hassan",
      role: "Secretary",
      year: "CSE '15",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Product Manager at Canva, passionate about building communities and fostering connections."
    },
    {
      name: "Ayesha Rahman",
      role: "Treasurer",
      year: "Pharmacy '10",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Senior Pharmacist at Royal Melbourne Hospital, active in healthcare innovation."
    }
  ]

  const milestones = [
    { 
      year: "2015", 
      title: "Kick-off",
      events: [
        "First reunion held on 12th December",
        "EOI process initiated for Executive Body (EB) formation"
      ]
    },
    { 
      year: "2016", 
      title: "Formal Beginning",
      events: [
        "Executive Body officially formed on 12th January",
        "Formally registered with CAV on 17th August",
        "NSU Vice Chancellor & Board met Melbourne NSUers",
        "MelbNSUers held the biggest Bangladeshi alumni event in Melbourne on 29th October"
      ]
    },
    { 
      year: "2017", 
      title: "Focus on Community",
      events: [
        "Contributed to NSUSSC's flood relief initiative",
        "Hosted a career workshop for young graduates"
      ]
    },
    { 
      year: "2018", 
      title: "Connecting People",
      events: [
        "Strengthened connections between NSU and NSUers in Melbourne",
        "Held Class of 2018 Annual Event",
        "Conducted Career Development Workshop"
      ]
    },
    { 
      year: "2019", 
      title: "Refreshed Perspective",
      events: [
        "New Executive Body announced on 3rd June",
        "Hosted Iftar party, Futsal tournament, and the popular BBQ party"
      ]
    },
    { 
      year: "2020", 
      title: "NSU Recognises",
      events: [
        "NSU Vice Chancellor acknowledged and rewarded MelbNSUers",
        "Formed a COVID Response Team to assist young NSUers in Australia and Bangladesh"
      ]
    },
    { 
      year: "2021", 
      title: "COVID Strikes",
      events: [
        "Launched fund collection initiatives to support NSUers in Bangladesh and Australia"
      ]
    },
    { 
      year: "2022", 
      title: "MelbNSUers Rocks",
      events: [
        "Hosted one of Melbourne's largest events after COVID",
        "NSUer Jon Kabir performed live with Warfaze at \"Rock with MelbNSUers\""
      ]
    },
    { 
      year: "2023", 
      title: "Refreshed EB Starts",
      events: [
        "New Executive Body announced on 27th October",
        "Held BBQ, Badminton Tournament, and Bijoy Dibosh celebration"
      ]
    },
    { 
      year: "2024", 
      title: "Busy Bee NSUers",
      events: [
        "Organised the first ever International Mother Language Day celebration in a unique style",
        "Cinegala event amazed the Melbourne community and gained recognition abroad"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Melbourne NSUers</h1>
            <p className="text-2xl font-semibold text-blue-100 mb-2">
              "Connecting NSUers in Melbourne — Beyond Borders, Beyond Generations."
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To build the strongest overseas chapter of North South University by connecting NSUers in Melbourne — 
              creating a legacy network that inspires collaboration, empowers members, and strengthens the global NSU community.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Melbourne NSUers unites North South University graduates in Melbourne to foster connection, professional growth, and community impact. 
              We create opportunities for alumni to network, support one another, and give back to the communities in Australia and Bangladesh 
              while proudly representing the NSU spirit beyond borders.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Connection & Belonging</h3>
              <p className="text-gray-700">Uniting NSUers in Melbourne through shared identity, friendship, and community spirit.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Growth & Empowerment</h3>
              <p className="text-gray-700">Fostering personal, professional, and leadership development through collaboration and mentorship.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community & Legacy</h3>
              <p className="text-gray-700">Giving back to society and building a legacy that strengthens the global NSU network.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Body */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive Body</h2>
            <p className="text-xl text-gray-600">Our organizational structure and leadership hierarchy</p>
          </div>
          
          <div className="relative">
            {/* President & Vice President */}
            <div className="flex justify-center gap-16 mb-12">
              {/* President */}
              <div className="group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/tanvir.jpg"
                    alt="Tanveer Masud"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    priority
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Tanveer Masud</h3>
                  <p className="text-blue-600 font-semibold text-lg">President</p>
                </div>
              </div>

              {/* Vice President */}
              <div className="group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/Aveen Ali.jpg"
                    alt="Aveen Ali"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Aveen Ali</h3>
                  <p className="text-green-600 font-semibold text-lg">Vice President</p>
                </div>
              </div>
            </div>

            {/* Secretaries - First Row */}
            <div className="grid grid-cols-3 gap-8 mb-8 max-w-4xl mx-auto">
              {/* Secretary Cultural */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/Fahria_Afrin.jpeg"
                    alt="Fahria Afrin"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Fahria Afrin</h3>
                  <p className="text-teal-600 font-medium text-sm">Secretary</p>
                  <p className="text-gray-600 text-xs">Cultural</p>
                </div>
              </div>

              {/* Secretary Community Engagement */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/sarzana asif.jpeg"
                    alt="Sarjana Asif"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top scale-125 group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Sarjana Asif</h3>
                  <p className="text-pink-600 font-medium text-sm">Secretary</p>
                  <p className="text-gray-600 text-xs">Community Engagement</p>
                </div>
              </div>

              {/* Secretary Media & Sports */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/Majedul_Huq.JPG"
                    alt="Majedul Huq"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Majedul Huq</h3>
                  <p className="text-indigo-600 font-medium text-sm">Secretary</p>
                  <p className="text-gray-600 text-xs">Media & Sports</p>
                </div>
              </div>
            </div>

            {/* Secretaries - Second Row */}
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Secretary Events */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/Namia Nowshin.jpg"
                    alt="Namia Nowshin"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Namia Nowshin</h3>
                  <p className="text-red-600 font-medium text-sm">Secretary</p>
                  <p className="text-gray-600 text-xs">Events</p>
                </div>
              </div>

              {/* Secretary Alumni Growth & Membership */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/MD Sarowar Hossain.jpeg"
                    alt="Md Sarowar Hossain"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top scale-125 group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Md Sarowar Hossain</h3>
                  <p className="text-purple-600 font-medium text-sm">Secretary</p>
                  <p className="text-gray-600 text-xs">Alumni Growth & Membership</p>
                </div>
              </div>

              {/* Secretary Marketing & Global Engagement */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="/assets/images/team/Md. Rayan Ahmad.jpeg"
                    alt="Rayan Ahmed"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top scale-125 group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Rayan Ahmed</h3>
                  <p className="text-orange-600 font-medium text-sm">Secretary</p>
                  <p className="text-gray-600 text-xs">Marketing & Global Engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Journey */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">A decade of building community and creating impact</p>
          </div>
          
          <div className="relative">
            {/* Center vertical line - hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800"></div>
            
            {/* Left vertical line - visible on mobile only */}
            <div className="md:hidden absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800"></div>
            
            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Year badge - left on mobile, center on desktop */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <span className="text-white font-bold text-xl">{milestone.year}</span>
                  </div>
                  
                  {/* Content card - full width on mobile, alternating sides on desktop */}
                  <div className={`flex-1 md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border-2 border-blue-100 hover:border-blue-300 transform hover:-translate-y-2">
                      <h3 className={`text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3 ${
                        index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                          {milestone.title}
                        </span>
                      </h3>
                      <ul className="space-y-3 md:space-y-4">
                        {milestone.events.map((event, eventIndex) => (
                          <li 
                            key={eventIndex} 
                            className={`flex items-start gap-2 md:gap-3 text-gray-700 ${
                              index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                            }`}
                          >
                            <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mt-0.5">
                              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="leading-relaxed text-sm md:text-base">{event}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Spacer for the other side - desktop only */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Community CTA */}
      <div className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Whether you're a recent graduate or a seasoned professional, there's a place for you in our network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Join Now Card */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Become a Member</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                Join our growing network and get access to events, mentorship, and professional opportunities.
              </p>
              <a 
                href="/login"
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Join Now
              </a>
            </div>

            {/* Contact Us Card */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Get in Touch</h3>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                Have questions or want to learn more about our community? We'd love to hear from you.
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
