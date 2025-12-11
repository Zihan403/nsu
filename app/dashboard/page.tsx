'use client'

import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'

interface Benefit {
  id: string
  title: string
  discount: string
  description: string
  image: string
  color: string
  link: string
  isExternal: boolean
  status: string
  contactEmail?: string
  instructions?: string
  promoCode?: string
  partner?: string
  terms?: string
}

export default function Dashboard() {
  const { user, userProfile, signOut } = useAuth()
  const router = useRouter()

  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loadingBenefits, setLoadingBenefits] = useState(true);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfileReminder, setShowProfileReminder] = useState(true);

  const openModal = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBenefit(null);
    setIsModalOpen(false);
  };

  const handleLogOut = async () => {
    await signOut()
    router.push('/')
  }

  // Check if profile is incomplete
  const checkIncompleteFields = () => {
    if (!userProfile) return { isIncomplete: false, missingFields: [] };
    
    const missingFields: string[] = [];
    
    if (!userProfile.phoneNumber || userProfile.phoneNumber.trim() === '') missingFields.push('Phone Number');
    if (!userProfile.address || userProfile.address.trim() === '') missingFields.push('Address');
    if (!userProfile.major || userProfile.major.trim() === '') missingFields.push('Major');
    if (!userProfile.nsuId || userProfile.nsuId.trim() === '') missingFields.push('NSU ID');
    if (!userProfile.currentJob || userProfile.currentJob.trim() === '') missingFields.push('Current Job');
    if (!userProfile.company || userProfile.company.trim() === '') missingFields.push('Company');
    if (!userProfile.industry || userProfile.industry.trim() === '') missingFields.push('Industry');
    if (!userProfile.workLocation || userProfile.workLocation.trim() === '') missingFields.push('Work Location');
    
    return {
      isIncomplete: missingFields.length > 0,
      missingFields
    };
  };

  const profileStatus = checkIncompleteFields();

  // Static benefits as fallback
  const staticBenefits: Benefit[] = [
    {
      id: '1',
      title: 'The Hopkins Group',
      discount: '10% OFF',
      description: 'Financial planning & accounting',
      image: '',
      color: '#3B82F6',
      link: '',
      isExternal: false,
      status: 'active',
      contactEmail: 'arashedi@thehopkinsgroup.com.au',
      instructions: 'Contact: arashedi@thehopkinsgroup.com.au'
    },
    {
      id: '2',
      title: 'Subway Skye',
      discount: '10% OFF',
      description: 'Exclusive in-store discount',
      image: '',
      color: '#10B981',
      link: '',
      isExternal: false,
      status: 'active',
      contactEmail: '',
      instructions: 'Show the member card instore'
    },
    {
      id: '3',
      title: "More Partners",
      discount: 'COMING SOON',
      description: 'Exciting new partnerships',
      image: '',
      color: '#8B5CF6',
      link: '',
      isExternal: false,
      status: 'coming-soon',
      contactEmail: '',
      instructions: 'Check back soon for details'
    }
  ]

  // Fetch benefits from Firestore
  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        setLoadingBenefits(true)
        if (!db) {
          console.warn('Firebase not initialized, using static benefits')
          setBenefits(staticBenefits)
          setLoadingBenefits(false)
          return
        }
        const benefitsRef = collection(db, 'benefits')
        const querySnapshot = await getDocs(benefitsRef)
        const fetchedBenefits: Benefit[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          fetchedBenefits.push({
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            image: data.image || '',
            discount: data.discount || '',
            color: data.color || '#3B82F6',
            link: data.link || '',
            isExternal: data.isExternal || false,
            status: data.status || 'active',
            contactEmail: data.contactEmail || '',
            instructions: data.instructions || data.contact || '',
            promoCode: data.promoCode || data.code || '',
            partner: data.partner || '',
            terms: data.terms || ''
          })
        })

        setBenefits(fetchedBenefits)
      } catch (error) {
        console.error('Error fetching benefits:', error)
        setBenefits([])
      } finally {
        setLoadingBenefits(false)
      }
    }

    fetchBenefits()
  }, [])

  // Helper functions to get display properties from benefit data
  const getBenefitIcon = (benefit: Benefit) => {
    if (benefit.title.includes('Hopkins')) return '💼'
    if (benefit.title.includes('Subway')) return '🥪'
    if (benefit.status === 'coming-soon') return '🎉'
    return '🎁'
  }

  const getBenefitGradient = (benefit: Benefit) => {
    // Handle hex color codes
    if (benefit.color === '#10B981' || benefit.color === 'green' || benefit.color.includes('green')) return 'from-green-500 to-green-600'
    if (benefit.color === '#3B82F6' || benefit.color === 'blue' || benefit.color.includes('blue')) return 'from-blue-500 to-blue-600'
    if (benefit.color === '#8B5CF6' || benefit.color === 'purple' || benefit.color.includes('purple')) return 'from-purple-500 to-purple-600'
    if (benefit.color === '#F59E0B' || benefit.color === 'yellow' || benefit.color.includes('yellow')) return 'from-yellow-500 to-yellow-600'
    if (benefit.color === '#EF4444' || benefit.color === 'red' || benefit.color.includes('red')) return 'from-red-500 to-red-600'
    if (benefit.color === '#6B7280' || benefit.color === 'gray' || benefit.color.includes('gray')) return 'from-gray-500 to-gray-600'
    
    // Default fallback
    return 'from-blue-500 to-blue-600'
  }

  const getBenefitCode = (benefit: Benefit) => {
    // Only return code if there's an actual promo code in the benefit data
    if (benefit.status === 'coming-soon') return 'SOON'
    // Check if there's a promo code field in the original data (we'll need to add this)
    return '' // Default to empty - only show if promo code exists
  }



  const recentActivity = [
    { icon: '✓', text: 'You registered for "Annual Networking Night"', time: '2 hours ago', color: 'text-green-600' },
    { icon: '★', text: 'Welcome to NSU Alumni Melbourne!', time: '1 day ago', color: 'text-blue-600' },
    { icon: '👋', text: 'Your profile was completed successfully', time: '1 day ago', color: 'text-purple-600' },
  ]

  // Get real stats from userProfile (placeholder for now, can be extended later)
  const stats = {
    eventsJoined: userProfile?.eventsJoined || 0,
    connections: userProfile?.connections || 0,
    activeBenefits: loadingBenefits ? 0 : benefits.filter(b => b.status === 'active').length
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
        {/* Top Stats Bar - Responsive Design */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-6 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
              <div className="w-full sm:w-auto mb-2 sm:mb-0">
                <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {userProfile?.displayName || userProfile?.firstName || 'Member'}!</h1>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {userProfile?.isAdmin && (
                  <Link
                    href="/admin/panel"
                    className="bg-yellow-500/20 hover:bg-yellow-500/30 backdrop-blur-sm text-yellow-100 px-4 py-2 rounded-lg border border-yellow-400/30 transition-all text-sm font-semibold w-full sm:w-auto"
                  >
                    🔐 Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogOut}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/30 transition-all text-sm w-full sm:w-auto"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion Reminder */}
        {profileStatus.isIncomplete && showProfileReminder && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-orange-800 mb-1">
                      Complete Your Profile
                    </h3>
                    <p className="text-sm text-orange-700 mb-2">
                      Your profile is incomplete. Please update the following fields to get the most out of your membership:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profileStatus.missingFields.map((field, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {field}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Update Profile Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileReminder(false)}
                  className="flex-shrink-0 text-orange-600 hover:text-orange-800 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Exclusive Benefits - Modern Carousel */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Exclusive Benefits</h2>
                  <Link href="/benefits" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    View All →
                  </Link>
                </div>
                
                {/* Benefits Grid */}
                <div className="space-y-4">
                  {loadingBenefits ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="bg-gray-200 animate-pulse rounded-t-xl h-32"></div>
                          <div className="p-4">
                            <div className="bg-gray-200 animate-pulse h-4 rounded mb-2"></div>
                            <div className="bg-gray-200 animate-pulse h-3 rounded w-3/4 mb-2"></div>
                            <div className="bg-gray-200 animate-pulse h-6 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {benefits.length > 0 ? benefits.map((benefit) => (
                        <div
                          key={benefit.id}
                          onClick={() => openModal(benefit)}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group hover:-translate-y-1"
                        >
                          {/* Image Section */}
                          <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                            {benefit.image ? (
                              <img
                                src={benefit.image}
                                alt={benefit.title}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <div className="text-6xl opacity-80">
                                {getBenefitIcon(benefit)}
                              </div>
                            )}
                            {/* Status Badge */}
                            <div className="absolute top-2 right-2">
                              <span className={`text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm ${
                                benefit.status === 'active' ? 'bg-green-500' : 
                                benefit.status === 'coming-soon' ? 'bg-yellow-500' : 'bg-gray-500'
                              }`}>
                                {benefit.status === 'active' ? 'Active' : benefit.status === 'coming-soon' ? 'Coming Soon' : benefit.status}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="p-4">
                            <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 leading-tight">
                              {benefit.title}
                            </h3>
                            
                            {/* Discount/Offer Display */}
                            <div className="mb-3">
                              <span className="text-blue-600 font-bold text-xl">
                                {benefit.discount}
                              </span>
                            </div>

                            {/* Promo Code Preview */}
                            {benefit.promoCode && benefit.promoCode.trim() !== '' && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                                <div className="text-xs text-yellow-700 font-medium mb-1">Promo Code:</div>
                                <div className="text-sm font-mono font-bold text-yellow-800">
                                  {benefit.promoCode}
                                </div>
                              </div>
                            )}

                            {/* Description Preview */}
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                              {benefit.description}
                            </p>

                            {/* Click for Details */}
                            <div className="flex items-center justify-center">
                              <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                                Click for Details →
                              </span>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-full text-center py-12">
                          <div className="text-6xl mb-4">🎁</div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Benefits Available</h3>
                          <p className="text-gray-500">Check back later for exclusive member benefits!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Digital Membership Card - Unique Design */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Digital Member Card</h2>
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
                      priority
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
                              loading="lazy"
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
                          loading="lazy"
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-blue-200 mb-1 font-medium">Member ID</div>
                          <div className="text-base font-mono font-bold bg-white/10 px-3 py-1.5 rounded backdrop-blur-sm truncate break-all min-w-0">
                            {userProfile?.memberId || 'NSU-0000'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-blue-200 mb-1 font-medium">NSU ID</div>
                          <div className="text-base font-mono font-bold bg-white/10 px-3 py-1.5 rounded backdrop-blur-sm truncate break-all min-w-0">
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
                    
                    <div className="flex items-center justify-center pt-4 border-t border-white/20">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-200 font-semibold">Active Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Activity Feed & Profile */}
            <div className="space-y-6 mt-8 lg:mt-0">
              {/* Profile Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-slate-900">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border-4 border-blue-100 mx-auto mb-3">
                    {userProfile?.photoURL ? (
                      <Image 
                        src={userProfile.photoURL} 
                        alt="Profile" 
                        width={80} 
                        height={80}
                        className="object-cover w-full h-full"
                        loading="lazy"
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
                  className="block w-full text-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-2 rounded-lg hover:opacity-90 transition-all text-sm font-semibold"
                >
                  Edit Profile
                </Link>
              </div>

              {/* Quick Actions - Bullet List Style */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/benefits" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                    <span className="font-medium">View All Benefits</span>
                  </Link>
                  <Link href="/events" className="flex items-center gap-3 text-sm text-gray-700 hover:text-cyan-600 transition-colors group">
                    <span className="font-medium">Browse Events</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 text-sm text-gray-700 hover:text-green-600 transition-colors group">
                    <span className="font-medium">Contact Us</span>
                  </Link>
                  <Link href="/benefits/giving-back" className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition-colors group">
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
      
      {/* Benefit Details Modal */}
      {isModalOpen && selectedBenefit && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
              {selectedBenefit.image ? (
                <img
                  src={selectedBenefit.image}
                  alt={selectedBenefit.title}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl text-white/80">
                  {getBenefitIcon(selectedBenefit)}
                </div>
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Title and Discount */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">{selectedBenefit.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-blue-600">{selectedBenefit.discount}</span>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                    {selectedBenefit.status === 'active' ? 'Active' : selectedBenefit.status}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{selectedBenefit.description}</p>
              
              {/* Promo Code Section */}
              {selectedBenefit.promoCode && selectedBenefit.promoCode.trim() !== '' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-yellow-700 mb-2">Promo Code:</div>
                  <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border">
                    <span className="font-mono font-bold text-lg tracking-wider text-gray-800">
                      {selectedBenefit.promoCode}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedBenefit.promoCode || '');
                        alert('Promo code copied!');
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
              
              {/* How to Avail Instructions - Always show */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-700 mb-2">How to Avail:</div>
                <div className="text-gray-700 space-y-2">
                  {selectedBenefit.instructions ? (
                    <div className="whitespace-pre-line">{selectedBenefit.instructions}</div>
                  ) : selectedBenefit.contactEmail ? (
                    <div>
                      Contact us at: <a href={`mailto:${selectedBenefit.contactEmail}`} className="text-blue-600 underline">{selectedBenefit.contactEmail}</a>
                    </div>
                  ) : (
                    <div>Show your NSU Alumni membership card or digital member card to avail this benefit. Contact the partner directly for more details.</div>
                  )}
                  
                  {selectedBenefit.status !== 'active' && (
                    <div className="mt-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                      ⚠️ This benefit is currently {selectedBenefit.status}. Please check back later.
                    </div>
                  )}
                </div>
              </div>
              
              {/* Terms */}
              {selectedBenefit.terms && (
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">Terms & Conditions:</span>
                  <div className="mt-1">{selectedBenefit.terms}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}