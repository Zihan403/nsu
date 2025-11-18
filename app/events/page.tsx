'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Events() {
  const [searchTopic, setSearchTopic] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('All times')
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  // Sample events data
  const events = [
    {
      id: 1,
      date: "12 November 2025",
      title: "Leadership and Decision-Making in Alumni Networks",
      description: "NSU Business Alumni Network (NBAN) invites you to our seventh annual symposium - a full-day, in-person event exploring how emerging leadership strategies impact alumni engagement and professional development.",
      location: "Melbourne CBD",
      category: "Professional",
      image: "/api/img/300/200"
    },
    {
      id: 2,
      date: "18 November 2025",
      title: "Free alumni webinar: Career Transitions #Decoded",
      description: "Join Professor Sarah Rahman, Director of the NSU Career Development Center, on Tuesday 18 November for a comprehensive guide to navigating career transitions in today's dynamic job market.",
      location: "Alumni",
      category: "Career",
      image: "/api/img/300/200"
    },
    {
      id: 3,
      date: "18 November 2025",
      title: "Networking and Mentoring Excellence in Professional Growth",
      description: "NSU Melbourne Chapter's Department of Alumni Relations is delighted to host this hybrid seminar featuring Emerita Professor Dr. Aminul Islam. Prof Islam will share insights on building meaningful professional relationships.",
      location: "Melbourne",
      category: "Networking",
      image: "/api/img/300/200"
    },
    {
      id: 4,
      date: "3 December 2025",
      title: "NSU Melbourne Alumni Celebration",
      description: "Hosted by Professor Steven Vaughan, Dean of NSU Melbourne Chapter, this end-of-year celebration is a chance to reconnect with alumni, colleagues, and friends while celebrating our achievements.",
      location: "NSU Melbourne Alumni Center",
      category: "Social",
      image: "/api/img/300/200"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        {/* Background particles effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
          {/* Search Bar */}
          <div className="mb-16">
            <div className="relative max-w-lg mx-auto group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search all things NSU"
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 shadow-lg transition-all duration-200 ease-in-out
                         hover:border-blue-300 hover:shadow-xl hover:bg-gray-50
                         focus:outline-none focus:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white focus:shadow-xl
                         active:scale-[0.99]"
                onFocus={(e) => e.target.placeholder = ""}
                onBlur={(e) => e.target.placeholder = "Search all things NSU"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Events</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Find out about a range of alumni events from leadership panels and 
              masterclasses to industry and alumni engagement opportunities, both online 
              and in person.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Search Events */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Search events</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Topic"
                  value={searchTopic}
                  onChange={(e) => setSearchTopic(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex gap-4">
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option>Browse: Time period</option>
                    <option>This week</option>
                    <option>This month</option>
                    <option>Next month</option>
                    <option>All times</option>
                  </select>
                  <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Browse by Category */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by category</h2>
              <div className="space-y-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option>Browse: All categories</option>
                  <option>Professional Development</option>
                  <option>Networking</option>
                  <option>Social Events</option>
                  <option>Career Services</option>
                  <option>Industry Panels</option>
                </select>
                <button className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                  Browse
                </button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Event Content */}
                  <div className="lg:col-span-2 p-8">
                    <div className="mb-4">
                      <span className="text-gray-500 text-sm">{event.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-4 hover:text-blue-800 transition-colors cursor-pointer">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="text-sm font-semibold text-gray-900">
                      {event.location}
                    </div>
                  </div>

                  {/* Event Image */}
                  <div className="lg:col-span-1">
                    <div className="h-64 lg:h-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
