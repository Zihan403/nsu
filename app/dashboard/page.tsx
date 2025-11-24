'use client'

import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function Dashboard() {
  const { user, userProfile, signOut } = useAuth()
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(1) // Start at middle card
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleLogOut = async () => {
    await signOut()
    router.push('/')
  }

  const benefits = [
    {
      id: 1,
      title: 'Tax Services',
      category: 'Financial Services',
      discount: '10% OFF',
      code: 'NSUTAX10',
      description: 'Professional tax advisory services',
      validUntil: 'Dec 31, 2025',
      icon: '💼',
      gradient: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      status: 'active'
    },
    {
      id: 2,
      title: 'MIDAS',
      category: 'Automotive',
      discount: 'COMING SOON',
      code: 'MIDAS-SOON',
      description: 'Car servicing & diagnostics',
      validUntil: 'Coming soon',
      icon: '🚗',
      gradient: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      status: 'coming-soon'
    },
    {
      id: 3,
      title: "Dining Perks",
      category: 'Food & Dining',
      discount: 'COMING SOON',
      code: 'DINING-SOON',
      description: 'Exclusive dining benefits',
      validUntil: 'Coming soon',
      icon: '🍔',
      gradient: 'from-pink-500 to-pink-600',
      lightBg: 'bg-pink-50',
      textColor: 'text-pink-600',
      status: 'coming-soon'
    }
  ]

  const scrollToSlide = (index: number) => {
    setCurrentSlide(index)
    if (carouselRef.current) {
      const cards = carouselRef.current.children
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }

  const nextSlide = () => {
    const next = (currentSlide + 1) % benefits.length
    scrollToSlide(next)
  }

  const prevSlide = () => {
    const prev = (currentSlide - 1 + benefits.length) % benefits.length
    scrollToSlide(prev)
  }

  const recentActivity = [
    { icon: '✅', text: 'You registered for "Annual Networking Night"', time: '2 hours ago', color: 'text-green-600' },
    { icon: '🎉', text: 'Welcome to NSU Alumni Melbourne!', time: '1 day ago', color: 'text-blue-600' },
    { icon: '👋', text: 'Your profile was completed successfully', time: '1 day ago', color: 'text-purple-600' },
  ]

  // Get real stats from userProfile (placeholder for now, can be extended later)
  const stats = {
    eventsJoined: userProfile?.eventsJoined || 0,
    connections: userProfile?.connections || 0,
    activeBenefits: 3 // Default benefits for all members
  }

  // Function to download the member card
  const downloadMemberCard = () => {
    const cardElement = document.getElementById('member-card')
    if (!cardElement) return

    // Create a temporary clone with a solid background for html2canvas compatibility
    const clone = cardElement.cloneNode(true) as HTMLElement
    clone.style.backgroundColor = '#0f172a' // Solid dark blue instead of gradient
    
    // Temporarily append to DOM for rendering
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'fixed'
    tempContainer.style.left = '-9999px'
    tempContainer.style.top = '-9999px'
    tempContainer.appendChild(clone)
    document.body.appendChild(tempContainer)

    // Use html2canvas to capture the card
    import('html2canvas').then((html2canvas) => {
      html2canvas.default(clone, {
        scale: 2,
        backgroundColor: '#0f172a',
        logging: false,
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const link = document.createElement('a')
        link.download = `NSU-Member-Card-${userProfile?.memberId || 'card'}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        
        // Cleanup
        document.body.removeChild(tempContainer)
      }).catch((error) => {
        console.error('Error downloading member card:', error)
        document.body.removeChild(tempContainer)
      })
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Top Stats Bar - Innovative Design */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-6 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Welcome back, {userProfile?.displayName || userProfile?.firstName || 'Member'}!</h1>
                  <p className="text-sm text-blue-100">Member since {userProfile?.joinedAt ? new Date(userProfile.joinedAt).getFullYear() : new Date().getFullYear()}</p>
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/30 transition-all text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Exclusive Benefits - Modern Carousel */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">🎁 Your Exclusive Benefits</h2>
                  <Link href="/benefits" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    View All →
                  </Link>
                </div>
                
                <div className="relative">
                  {/* Carousel Container */}
                  <div 
                    ref={carouselRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-6 px-4 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {benefits.map((benefit, index) => (
                      <div
                        key={benefit.id}
                        onClick={() => scrollToSlide(index)}
                        className={`flex-shrink-0 w-56 snap-center transition-all duration-500 cursor-pointer ${
                          currentSlide === index 
                            ? 'scale-105 shadow-xl' 
                            : 'scale-95 opacity-60 hover:opacity-80'
                        }`}
                      >
                        <div className={`relative bg-gradient-to-br ${benefit.gradient} rounded-xl p-4 text-white h-48 overflow-hidden ${benefit.status === 'coming-soon' ? 'opacity-75' : ''}`}>
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
                          </div>

                          {/* Coming Soon Overlay */}
                          {benefit.status === 'coming-soon' && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm z-20">
                              <div className="text-center">
                                <div className="text-4xl mb-2">🔜</div>
                                <div className="font-bold text-white">Coming Soon</div>
                              </div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="relative z-10 h-full flex flex-col justify-between">
                            {/* Header */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-2xl">{benefit.icon}</div>
                                <div className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/30">
                                  <span className="font-bold text-sm">{benefit.discount}</span>
                                </div>
                              </div>
                              
                              <h3 className="text-lg font-bold mb-1">{benefit.title}</h3>
                              <p className="text-white/80 text-xs mb-2">{benefit.description}</p>
                            </div>

                            {/* Promo Code */}
                            <div>
                              {benefit.status === 'active' ? (
                                <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/20">
                                  <div className="text-xs text-white/70 mb-1">Promo Code</div>
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm font-mono font-bold tracking-wider">
                                      {benefit.code}
                                    </div>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        navigator.clipboard.writeText(benefit.code)
                                      }}
                                      className="bg-white text-blue-600 px-2 py-0.5 rounded text-xs font-semibold hover:bg-blue-50 transition-colors"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-white/10 backdrop-blur-md rounded-lg p-2.5 border border-white/20 text-center">
                                  <div className="text-xs text-white/70">Check back soon for details</div>
                                </div>
                              )}
                              
                              <div className="text-xs text-white/60 mt-1.5">
                                Valid: {benefit.validUntil}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                  >
                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-2">
                    {benefits.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === index 
                            ? 'bg-blue-600 w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Membership Card - Unique Design */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📇 Digital Member Card</h2>
                {/* Debug info - remove in production */}
                {(!userProfile?.memberId || !userProfile?.nsuId || !userProfile?.major) && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    ⚠️ <strong>Incomplete Profile:</strong> Please complete your profile edit to show Member ID, NSU ID, and Major. 
                    <Link href="/profile" className="underline ml-1 font-semibold">Edit now</Link>
                  </div>
                )}
                <div id="member-card" className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
                  {/* Background Logo Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <Image 
                      src="/assets/images/logos/Logo.jfif" 
                      alt="NSU Logo" 
                      width={300} 
                      height={300}
                      className="object-contain"
                    />
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        {/* Profile Image Placeholder */}
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center border-2 border-white/30 shadow-lg">
                          {userProfile?.photoURL ? (
                            <Image 
                              src={userProfile.photoURL} 
                              alt="Profile" 
                              width={80} 
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-blue-800 text-white text-3xl font-bold">
                              {userProfile?.firstName?.charAt(0) || ''}{userProfile?.lastName?.charAt(0) || ''}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-blue-200 mb-1">Melbourne NSUers</div>
                          <div className="text-3xl font-bold">Member Card</div>
                        </div>
                      </div>
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center p-2">
                        <Image 
                          src="/assets/images/logos/Logo.jfif" 
                          alt="NSU Logo" 
                          width={48} 
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <div className="text-xs text-blue-200 mb-1 font-medium">Member Name</div>
                        <div className="text-2xl font-bold">
                          {userProfile?.firstName && userProfile?.lastName 
                            ? `${userProfile.firstName} ${userProfile.lastName}`
                            : userProfile?.displayName || 'NSU Member'}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-blue-200 mb-1 font-medium">Member ID</div>
                          <div className="text-base font-mono font-bold bg-white/10 px-3 py-1.5 rounded backdrop-blur-sm">
                            {userProfile?.memberId || 'NSU-0000'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-blue-200 mb-1 font-medium">NSU ID</div>
                          <div className="text-base font-mono font-bold bg-white/10 px-3 py-1.5 rounded backdrop-blur-sm">
                            {userProfile?.nsuId || 'N/A'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-blue-200 mb-1 font-medium">Status</div>
                          <div className="text-base font-bold flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Active
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-blue-200 mb-1 font-medium">Major / Field of Study</div>
                        <div className="text-base font-semibold">{userProfile?.major || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-200">Member since {userProfile?.joinedAt ? new Date(userProfile.joinedAt).getFullYear() : new Date().getFullYear()}</span>
                      </div>
                      <button 
                        onClick={downloadMemberCard}
                        className="bg-white text-blue-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Activity Feed & Profile */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border-4 border-blue-100 mx-auto mb-3">
                    {userProfile?.photoURL ? (
                      <Image 
                        src={userProfile.photoURL} 
                        alt="Profile" 
                        width={80} 
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-bold">
                        {userProfile?.firstName?.charAt(0) || ''}{userProfile?.lastName?.charAt(0) || ''}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">
                    {userProfile?.firstName && userProfile?.lastName 
                      ? `${userProfile.firstName} ${userProfile.lastName}`
                      : userProfile?.displayName || 'Member'}
                  </h3>
                  <p className="text-sm text-gray-600">{userProfile?.major || 'NSU Alumni'}</p>
                  <p className="text-xs text-gray-500 mt-1">ID: {userProfile?.memberId || 'N/A'}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{userProfile?.phoneNumber || 'Not provided'}</span>
                  </div>
                </div>
                
                <Link
                  href="/profile"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  Edit Profile
                </Link>
              </div>

              {/* Quick Actions - Bullet List Style */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/benefits" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                    <span className="text-blue-600 group-hover:scale-110 transition-transform">🎫</span>
                    <span className="font-medium">View All Benefits</span>
                  </Link>
                  <Link href="/events" className="flex items-center gap-3 text-sm text-gray-700 hover:text-cyan-600 transition-colors group">
                    <span className="text-cyan-600 group-hover:scale-110 transition-transform">📅</span>
                    <span className="font-medium">Browse Events</span>
                  </Link>
                  <Link href="/directory" className="flex items-center gap-3 text-sm text-gray-700 hover:text-indigo-600 transition-colors group">
                    <span className="text-indigo-600 group-hover:scale-110 transition-transform">👥</span>
                    <span className="font-medium">Alumni Directory</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-sm text-gray-700 hover:text-teal-600 transition-colors group">
                    <span className="text-teal-600 group-hover:scale-110 transition-transform">💼</span>
                    <span className="font-medium">Job Board</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-sm text-gray-700 hover:text-sky-600 transition-colors group">
                    <span className="text-sky-600 group-hover:scale-110 transition-transform">🤝</span>
                    <span className="font-medium">Find a Mentor</span>
                  </Link>
                  <Link href="/benefits/giving-back" className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition-colors group">
                    <span className="text-red-600 group-hover:scale-110 transition-transform">❤️</span>
                    <span className="font-medium">Give Back</span>
                  </Link>
                </div>
              </div>

              {/* Activity Timeline - Vertical Design */}
              <div className="hidden"></div>

              {/* Quick Stats - List Style */}
              <div className="hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
