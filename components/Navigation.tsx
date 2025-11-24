'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { user, userProfile, signOut } = useAuth()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsProfileDropdownOpen(false)
    router.push('/')
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src="/assets/images/logos/Logo.jfif" 
                  alt="NSU Alumni Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>



          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              About Us
            </Link>
            <Link href="/directory" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              Directory
            </Link>
            <Link href="/events" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              Events
            </Link>
            <Link href="/benefits" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              Benefits
            </Link>
            <Link href="/new-students" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              New Students
            </Link>
            <Link href="/news" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              News
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
              Contact
            </Link>
          </div>

          {/* Desktop CTA - Join Us or Dashboard Dropdown */}
          <div className="hidden md:flex items-center">
            {user && user.emailVerified ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 border border-slate-900 text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-slate-900 hover:text-white hover:border-slate-900 px-3 py-1.5 font-medium text-xs uppercase tracking-wide transition-all rounded"
                >
                  {/* Profile Image or Initials */}
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center border border-blue-400 flex-shrink-0">
                    {userProfile?.photoURL ? (
                      <img 
                        src={userProfile.photoURL} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-white">
                        {userProfile?.firstName?.charAt(0) || ''}{userProfile?.lastName?.charAt(0) || ''}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">Dashboard</span>
                  <svg 
                    className={`w-3 h-3 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      <span>📊</span>
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => {
                        console.log('🔗 Navigating to /profile')
                        setIsProfileDropdownOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      <span>👤</span>
                      <span>Edit Profile</span>
                    </Link>
                    <div className="border-t border-gray-200 py-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <span>🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-2 font-medium text-sm uppercase tracking-wide transition-all rounded"
              >
                Join Us
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-800">
            <Link href="/" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              Home
            </Link>
            <Link href="/about" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              About Us
            </Link>
            <Link href="/directory" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              Directory
            </Link>
            <Link href="/events" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              Events
            </Link>
            <Link href="/benefits" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              Benefits
            </Link>
            <Link href="/new-students" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              New Students
            </Link>
            <Link href="/news" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              News
            </Link>
            <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide py-2">
              Contact
            </Link>
            
            {/* Mobile CTA - Dashboard Dropdown or Join */}
            <div className="pt-4 border-t border-gray-800">
              {user && user.emailVerified ? (
                <div className="space-y-2">
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-300 hover:text-white py-2 text-sm"
                  >
                    <span>📊</span>
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-300 hover:text-white py-2 text-sm"
                  >
                    <span>👤</span>
                    <span>Edit Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 py-2 text-sm w-full text-left"
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="block border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-2 font-medium text-sm uppercase tracking-wide transition-all text-center rounded"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}