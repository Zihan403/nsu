'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function NewStudentsPage() {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({})

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const gettingStartedSteps = [
    {
      id: 'myki',
      number: '1',
      title: 'Getting Your Myki Card',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Myki is your ticket to Melbourne's public transport system (trams, trains, and buses).
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Where to Get It:</h4>
            <ul className="space-y-2 text-blue-800">
              <li>• 7-Eleven stores</li>
              <li>• Train stations (vending machines)</li>
              <li>• Premium stations (customer service counters)</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">How to Top Up:</h4>
            <ul className="space-y-2 text-green-800">
              <li>• Download the Myki app</li>
              <li>• At 7-Eleven or train stations</li>
              <li>• Online at ptv.vic.gov.au</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            Tip: Register your Myki card online for balance protection!
          </p>
        </div>
      )
    },
    {
      id: 'bank',
      number: '2',
      title: 'Opening a Bank Account',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Opening an Australian bank account is essential for receiving payments and managing your finances.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <h4 className="font-semibold text-sky-900 mb-2">Major Banks:</h4>
              <ul className="space-y-1 text-sky-800">
                <li>• Commonwealth Bank</li>
                <li>• ANZ</li>
                <li>• NAB</li>
                <li>• Westpac</li>
              </ul>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">What You'll Need:</h4>
              <ul className="space-y-1 text-orange-800">
                <li>• Passport</li>
                <li>• Student visa</li>
                <li>• Proof of enrollment</li>
                <li>• Australian address</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Pro tip: Many banks offer fee-free accounts for students!
          </p>
        </div>
      )
    },
    {
      id: 'sim',
      number: '3',
      title: 'Getting a SIM Card',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Stay connected with an Australian mobile number for calls, texts, and data.
          </p>
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <h4 className="font-semibold text-cyan-900 mb-2">Popular Providers:</h4>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <div>
                <p className="font-medium text-cyan-800">Postpaid (Monthly Plans):</p>
                <ul className="text-cyan-700 ml-4">
                  <li>• Telstra</li>
                  <li>• Optus</li>
                  <li>• Vodafone</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-cyan-800">Prepaid (Pay-as-you-go):</p>
                <ul className="text-cyan-700 ml-4">
                  <li>• Boost Mobile</li>
                  <li>• Belong</li>
                  <li>• Amaysim</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            You can buy SIM cards at airports, supermarkets, or directly from provider stores.
          </p>
        </div>
      )
    },
    {
      id: 'housing',
      number: '4',
      title: 'Finding Accommodation',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Finding the right place to live is crucial for your comfort and success in Melbourne.
          </p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-900 mb-2">Housing Options:</h4>
            <ul className="space-y-2 text-indigo-800">
              <li>• University accommodation (on-campus)</li>
              <li>• Shared apartments (off-campus)</li>
              <li>• Homestay with Australian families</li>
              <li>• Private rentals</li>
            </ul>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-900 mb-2">Where to Search:</h4>
            <ul className="space-y-2 text-indigo-800">
              <li>• realestate.com.au</li>
              <li>• domain.com.au</li>
              <li>• Flatmates.com.au</li>
              <li>• Facebook housing groups</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            Always inspect properties before signing and read lease agreements carefully!
          </p>
        </div>
      )
    },
    {
      id: 'work',
      number: '5',
      title: 'Work Rights & Setup',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            International students can work part-time while studying in Australia.
          </p>
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Work Limitations:</h4>
            <ul className="space-y-2 text-yellow-800">
              <li>• Up to 48 hours per fortnight during semester</li>
              <li>• Unlimited hours during breaks</li>
              <li>• Must have valid student visa with work rights</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">What You Need:</h4>
            <ol className="space-y-2 text-green-800">
              <li>1. Apply for Tax File Number (TFN) at ato.gov.au</li>
              <li>2. Open Australian bank account</li>
              <li>3. Get Superannuation fund (retirement savings)</li>
              <li>4. Understand your workplace rights at fairwork.gov.au</li>
            </ol>
          </div>
          <p className="text-sm text-gray-500">
            Remember: Your studies should remain your primary focus!
          </p>
        </div>
      )
    }
  ]

  const essentialApps = [
    { name: 'PTV', description: 'Public transport', logo: '/assets/logos/ptv.png' },
    { name: 'Service VIC', description: 'Government services', logo: '/assets/logos/servicevic.png' },
    { name: 'Uber', description: 'Ride-sharing', logo: '/assets/logos/uber-app-icon-hd.png' },
    { name: 'Seek', description: 'Job search', logo: '/assets/logos/seek.png' },
    { name: 'CommBank', description: 'Mobile banking', logo: '/assets/logos/commonwealth.jpg' },
    { name: 'Google Maps', description: 'Navigation', logo: '/assets/logos/map.png' }
  ]

  const emergencyContacts = [
    { service: 'Emergency Services', contact: '000', note: 'Police, Fire, Ambulance' },
    { service: 'Emergency (from mobile)', contact: '112', note: 'Works without network' },
    { service: 'Police Non-Emergency', contact: '131 444', note: 'For non-urgent matters' },
    { service: 'Lifeline Crisis Support', contact: '13 11 14', note: '24/7 counselling' },
    { service: 'Beyond Blue', contact: '1300 22 4636', note: 'Mental health support' },
    { service: "Royal Melbourne Hospital", contact: '(03) 9342 7000', note: '300 Grattan St, Parkville' },
    { service: "St Vincent's Hospital", contact: '(03) 9231 2211', note: '41 Victoria Pde, Fitzroy' },
    { service: 'Poison Information', contact: '13 11 26', note: '24/7 poison advice' },
    { service: 'Translating Service', contact: '131 450', note: 'Free interpreter service' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/icons/welcome.jpeg')" }}
        ></div>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 via-blue-800/70 to-blue-900/75"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up text-white drop-shadow-lg">Welcome to Melbourne!</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200 drop-shadow-md">
            Your Complete Guide to Starting Your Journey in Australia
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <span className="font-semibold">International Student Hub</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <span className="font-semibold">Essential Resources</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Everything You Need to Know
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Moving to a new country can be overwhelming, but we are here to help! This guide covers all the essentials 
            to help you settle into Melbourne smoothly.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <p className="text-sm text-gray-700">Get your Myki card for transport</p>
            </div>
            <div className="text-center p-4 bg-sky-50 rounded-lg">
              <div className="text-3xl font-bold text-sky-600 mb-2">2</div>
              <p className="text-sm text-gray-700">Open an Australian bank account</p>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-lg">
              <div className="text-3xl font-bold text-cyan-600 mb-2">3</div>
              <p className="text-sm text-gray-700">Get a local SIM card</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
              <p className="text-sm text-gray-700">Find your perfect accommodation</p>
            </div>
          </div>
        </div>

        {/* President's Welcome Message */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12 animate-fade-in-up animation-delay-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Welcome Message from the President</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Message Content */}
            <div className="flex-1 space-y-4 text-gray-700 leading-relaxed">
              <p className="font-semibold text-lg text-blue-900">Warm Greetings to all Melbourne NSUers,</p>
              
              <p>
                It is my pleasure to welcome you to the official online home of the Melbourne NSUers Alumni Association. This platform marks an exciting new chapter for our community — a space designed to help us stay connected, support one another, and grow stronger together.
              </p>
              
              <p>
                To our new graduates who have recently flown from Bangladesh to start a new journey in Melbourne — congratulations on reaching an important milestone. We know stepping into a new country can feel overwhelming, but please remember you are not alone. This alumni community is your home away from home.
              </p>
              
              <p>
                Our website has been created to help you settle in with confidence. From essential guides about living in Melbourne to career support, events, and connecting with senior alumni — everything here is designed to make your transition smoother. And if you ever feel uncertain or need help at any stage, please reach out. We are here for you.
              </p>
              
              <p>
                To our existing and senior members, thank you for your continuous support and commitment to this community. As we focus on building a stronger, more connected network that represents NSU on a global stage, your guidance, experience, and engagement are invaluable. Together, we can elevate our alumni presence and create meaningful opportunities for the next generation.
              </p>
              
              <p>
                Thank you for being part of this journey. Let us continue to uphold the NSU spirit and build a united community that we are all proud of.
              </p>
              
              <div className="pt-4 border-t border-blue-200 mt-6">
                <p className="font-semibold text-gray-900">Warm regards,</p>
                <p className="font-bold text-blue-900 text-lg">Tanveer Masud</p>
                <p className="text-gray-600 italic">President, Melbourne NSUers Alumni Association</p>
              </div>
            </div>
            
            {/* President Photo */}
            <div className="md:w-80 flex-shrink-0">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-blue-900 shadow-lg mb-4">
                    <Image 
                      src="/assets/images/team/tanvir.jpg"
                      alt="Tanveer Masud"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Tanveer Masud</h3>
                  <p className="text-blue-600 font-semibold mb-2">President</p>
                  <p className="text-gray-600 text-sm">Melbourne NSUers Alumni Association</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Accordion */}
        <div className="mb-12 animate-fade-in-up animation-delay-400">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Getting Started Guide</h2>
          <div className="space-y-4">
            {gettingStartedSteps.map((step, index) => (
              <div 
                key={step.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleSection(step.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                    <span className="text-xl font-semibold text-gray-800">{step.title}</span>
                  </div>
                  <svg 
                    className={`w-6 h-6 text-gray-500 transition-transform ${openSections[step.id] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections[step.id] && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    {step.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Essential Apps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Essential Apps to Download</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {essentialApps.map((app, index) => (
              <div 
                key={index}
                className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-4 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center">
                    <Image 
                      src={app.logo} 
                      alt={app.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{app.name}</h3>
                  <p className="text-sm text-gray-600">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-12 animate-fade-in-up animation-delay-800">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Safety First</h2>
          
          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Emergency Numbers</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-red-600 mb-1">000</div>
                <p className="text-sm text-red-800">Police, Fire, Ambulance</p>
              </div>
              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">112</div>
                <p className="text-sm text-blue-800">Mobile Emergency (works without signal)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 overflow-x-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Contact Numbers</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Note</th>
                </tr>
              </thead>
              <tbody>
                {emergencyContacts.map((contact, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">{contact.service}</td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">{contact.contact}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{contact.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Safety Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Stay in well-lit areas at night</li>
                <li>• Keep valuables out of sight</li>
                <li>• Share your location with trusted contacts</li>
                <li>• Use official taxi or ride-sharing apps</li>
                <li>• Trust your instincts</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Health & Wellbeing</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Get Overseas Student Health Cover (OSHC)</li>
                <li>• Register with a local GP</li>
                <li>• Access free mental health support</li>
                <li>• Stay connected with family and friends</li>
                <li>• Join student support groups</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section - Ready to Join Our Community */}
        <div className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl text-blue-100 mb-16 leading-relaxed">
              Connect with 500+ NSU alumni in Melbourne and start your networking journey today.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Become a Member Card */}
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Become a Member</h3>
                <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                  Join the NSU alumni network in Melbourne and unlock exclusive benefits, events, and networking opportunities.
                </p>
                <a href="/join" className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Get Started
                </a>
              </div>

              {/* Get Support Card */}
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Need Help?</h3>
                <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                  Have questions or need assistance settling into Melbourne? Our support team is here to help you.
                </p>
                <a href="/contact" className="inline-block w-full text-center border-2 border-blue-400 text-blue-300 hover:bg-blue-600/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

