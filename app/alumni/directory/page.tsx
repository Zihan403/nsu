'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../lib/firebaseConfig'
import { useAuth } from '../../../contexts/AuthContext'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Link from 'next/link'

interface AlumniMember {
  uid: string
  displayName: string
  email: string
  nsuId?: string
  major?: string
  currentJob?: string
  company?: string
  location?: string
  membershipTier?: string
  joinedAt: Date
  photoURL?: string
}

export default function AlumniDirectory() {
  const { user } = useAuth()
  const [members, setMembers] = useState<AlumniMember[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterMajor, setFilterMajor] = useState('')
  const [filterLocation, setFilterLocation] = useState('')

  useEffect(() => {
    const fetchMembers = async () => {
      if (!db) {
        console.error('Firebase not initialized');
        setLoading(false);
        return;
      }
      
      try {
        const usersRef = collection(db, 'users')
        const querySnapshot = await getDocs(usersRef)
        const membersData: AlumniMember[] = []
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          // Only show verified members
          if (data.emailVerified) {
            membersData.push({
              uid: doc.id,
              displayName: data.displayName || 'Anonymous',
              email: data.email,
              nsuId: data.nsuId,
              major: data.major,
              currentJob: data.currentJob,
              company: data.company,
              location: data.location,
              membershipTier: data.membershipTier,
              joinedAt: data.joinedAt?.toDate() || new Date(),
              photoURL: data.photoURL
            })
          }
        })
        
        // Sort by name
        membersData.sort((a, b) => a.displayName.localeCompare(b.displayName))
        setMembers(membersData)
      } catch (error) {
        console.error('Error fetching members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.currentJob?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesMajor = !filterMajor || member.major === filterMajor
    const matchesLocation = !filterLocation || member.location?.includes(filterLocation)
    
    return matchesSearch && matchesMajor && matchesLocation
  })

  const majors = [...new Set(members.map(m => m.major).filter(Boolean))]
  const locations = [...new Set(members.map(m => m.location).filter(Boolean))]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Alumni Directory</h1>
                <p className="text-blue-100">Connect with {members.length} verified NSU alumni worldwide</p>
              </div>
              <Link 
                href="/dashboard"
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Alumni
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by name, company, or job title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major
                </label>
                <select
                  value={filterMajor}
                  onChange={(e) => setFilterMajor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Majors</option>
                  {majors.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredMembers.length} of {members.length} alumni
            </div>
          </div>

          {/* Alumni Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading alumni directory...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.uid} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {member.photoURL ? (
                        <img
                          src={member.photoURL}
                          alt={member.displayName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        member.displayName.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{member.displayName}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        member.membershipTier === 'premium' 
                          ? 'bg-purple-100 text-purple-800' 
                          : member.membershipTier === 'lifetime'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {member.membershipTier?.charAt(0).toUpperCase()}{member.membershipTier?.slice(1)} Member
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {member.currentJob && (
                      <div>
                        <span className="text-gray-500">Position:</span>
                        <p className="font-medium">{member.currentJob}</p>
                      </div>
                    )}
                    
                    {member.company && (
                      <div>
                        <span className="text-gray-500">Company:</span>
                        <p className="font-medium">{member.company}</p>
                      </div>
                    )}
                    
                    {member.major && (
                      <div>
                        <span className="text-gray-500">Major:</span>
                        <p className="font-medium">{member.major}</p>
                      </div>
                    )}
                    
                    {member.location && (
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <p className="font-medium">{member.location}</p>
                      </div>
                    )}
                    
                    {member.nsuId && (
                      <div>
                        <span className="text-gray-500">NSU ID:</span>
                        <p className="font-medium">{member.nsuId}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium"
                      onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                    >
                      Connect
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Member since {member.joinedAt.getFullYear()}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredMembers.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
