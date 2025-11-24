'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Events() {
  const [searchTopic, setSearchTopic] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('All times')
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  // Sample events data
  const events = [
    {
      id: 1,
      date: "November 24, 2025",
      time: "6:00 PM",
      title: "Reconnect 2025: Strengthening the NSU Bond",
      description: "Join Melbourne NSUers for our signature annual event, Reconnect 2025! This is your chance to reconnect with fellow NSU alumni, celebrate our shared legacy, and strengthen the bonds that make our community special. Whether you're a recent graduate or a senior alumnus, this event brings together generations of NSUers to network, share stories, and build lasting friendships. Enjoy an evening of meaningful conversations, delicious food, refreshments, and the warmth of our tight-knit NSU family.",
      location: "Community Hub at The Dock",
      locationUrl: "https://www.facebook.com/share/1Gyav2U2zR/",
      category: "Social",
      image: "/assets/images/events/reconnect.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 text-white">
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
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-900 to-slate-900 text-white font-semibold rounded-md hover:from-blue-800 hover:to-slate-800 transition-colors">
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
                <button className="w-full px-8 py-3 bg-gradient-to-r from-blue-900 to-slate-900 text-white font-semibold rounded-md hover:from-blue-800 hover:to-slate-800 transition-colors">
                  Browse
                </button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-12">
            {events.map((event) => {
              const isExpanded = expandedEvent === event.id
              
              return (
                <div key={event.id} className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Event Image - Left Side */}
                  <div className="lg:col-span-2 h-64 lg:h-72 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Event Content - Right Side */}
                  <div className="lg:col-span-3 bg-white border-b-2 border-r-2 border-t-2 border-gray-200 p-6 lg:p-8">
                    {/* Date and Time Header */}
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        📅 {event.date} • {event.time}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                      {event.title}
                    </h3>
                    
                    {/* Location */}
                    <div className="mb-3">
                      <a 
                        href={event.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        📍 {event.location}
                      </a>
                    </div>
                    
                    {/* Description - Expandable */}
                    <div className="mb-4">
                      {isExpanded ? (
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {event.description}
                        </p>
                      ) : (
                        <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                          {event.description.substring(0, 150) + '...'}
                        </p>
                      )}
                      <button
                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                        className="text-white font-semibold text-xs mt-2 bg-gradient-to-r from-slate-900 to-blue-900 px-3 py-1 rounded hover:from-slate-800 hover:to-blue-800 transition-colors"
                      >
                        {isExpanded ? '- Show Less' : '+ Show More'}
                      </button>
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex justify-end">
                      <a
                        href={event.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800 text-white font-semibold px-6 py-2 text-sm transition-colors"
                      >
                        ATTEND
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
