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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
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
            {/* President */}
            <div className="flex justify-center mb-12">
              <div className="group">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                      alt="Dr. Rashid Ahmed"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <svg className="w-4 h-4 text-yellow-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Dr. Rashid Ahmed</h3>
                  <p className="text-blue-600 font-semibold text-lg">President</p>
                  <p className="text-gray-600 text-sm">EEE '08</p>
                </div>
              </div>
            </div>

            {/* Connection line from President */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-12 bg-gradient-to-b from-blue-400 to-transparent"></div>
            </div>

            {/* Vice President & General Secretary */}
            <div className="flex justify-center gap-32 mb-12">
              {/* Vice President */}
              <div className="group relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Fatima Khan"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Fatima Khan</h3>
                  <p className="text-green-600 font-semibold">Vice President</p>
                  <p className="text-gray-600 text-sm">BBA '12</p>
                </div>
              </div>

              {/* General Secretary */}
              <div className="group relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Mohammad Hassan"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Mohammad Hassan</h3>
                  <p className="text-purple-600 font-semibold">General Secretary</p>
                  <p className="text-gray-600 text-sm">CSE '15</p>
                </div>
              </div>
            </div>

            {/* Connection lines to members */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
            </div>

            {/* Executive Members - First Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 max-w-4xl mx-auto">
              {/* Treasurer */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Ayesha Rahman"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Ayesha Rahman</h3>
                  <p className="text-orange-600 font-medium text-sm">Treasurer</p>
                  <p className="text-gray-600 text-xs">Pharmacy '10</p>
                </div>
              </div>

              {/* Joint Secretary */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Ahmed Karim"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Ahmed Karim</h3>
                  <p className="text-teal-600 font-medium text-sm">Joint Secretary</p>
                  <p className="text-gray-600 text-xs">CSE '14</p>
                </div>
              </div>

              {/* Events Coordinator */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Samira Islam"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Samira Islam</h3>
                  <p className="text-pink-600 font-medium text-sm">Events Coordinator</p>
                  <p className="text-gray-600 text-xs">BBA '16</p>
                </div>
              </div>

              {/* Communications Lead */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Tanvir Hasan"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Tanvir Hasan</h3>
                  <p className="text-indigo-600 font-medium text-sm">Communications Lead</p>
                  <p className="text-gray-600 text-xs">EEE '13</p>
                </div>
              </div>
            </div>

            {/* Executive Members - Second Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {/* Membership Coordinator */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Nadia Sultana"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Nadia Sultana</h3>
                  <p className="text-red-600 font-medium text-sm">Membership Coordinator</p>
                  <p className="text-gray-600 text-xs">Law '11</p>
                </div>
              </div>

              {/* IT Coordinator */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Sabbir Ahmed"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Sabbir Ahmed</h3>
                  <p className="text-cyan-600 font-medium text-sm">IT Coordinator</p>
                  <p className="text-gray-600 text-xs">CSE '17</p>
                </div>
              </div>

              {/* Social Coordinator */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Rubaiya Khan"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Rubaiya Khan</h3>
                  <p className="text-yellow-600 font-medium text-sm">Social Coordinator</p>
                  <p className="text-gray-600 text-xs">Architecture '15</p>
                </div>
              </div>

              {/* Mentorship Lead */}
              <div className="group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                    alt="Imran Hossain"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="text-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Imran Hossain</h3>
                  <p className="text-emerald-600 font-medium text-sm">Mentorship Lead</p>
                  <p className="text-gray-600 text-xs">Business '09</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Journey */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">A decade of building community and creating impact</p>
          </div>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="relative pl-20 md:pl-32 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  {/* Year badge */}
                  <div className="absolute left-0 md:left-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                    <span className="text-white font-bold text-lg">{milestone.year}</span>
                  </div>
                  
                  {/* Content card */}
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-blue-500 hover:border-blue-600 transform hover:-translate-y-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-blue-600">{milestone.title}</span>
                    </h3>
                    <ul className="space-y-3">
                      {milestone.events.map((event, eventIndex) => (
                        <li key={eventIndex} className="flex items-start gap-3 text-gray-700">
                          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="leading-relaxed">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're a recent graduate or a seasoned professional, 
            there's a place for you in our growing network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/join"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Become a Member
            </a>
            <a 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
