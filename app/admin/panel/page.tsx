'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebaseConfig'
import { useAuth } from '../../../contexts/AuthContext'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Link from 'next/link'

interface User {
  uid: string
  displayName: string
  email: string
  photoURL?: string
  phoneNumber?: string
  nsuId?: string
  major?: string
  currentJob?: string
  company?: string
  location?: string
  address?: string
  industry?: string
  workLocation?: string
  membershipTier?: string
  joinedAt: Date
  emailVerified: boolean
  isAdmin?: boolean
  bio?: string
  linkedIn?: string
  github?: string
  website?: string
  graduationYear?: string
  skills?: string[]
}

export default function AdminPanel() {
  const { user, userProfile } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState('')
  const [filterVerification, setFilterVerification] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const openUserModal = (user: User) => {
    console.log('Opening modal for user:', user)
    console.log('Professional fields:', {
      currentJob: user.currentJob,
      company: user.company,
      industry: user.industry,
      workLocation: user.workLocation
    })
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const closeUserModal = () => {
    setSelectedUser(null)
    setShowUserModal(false)
  }

  // Super admins that cannot be removed
  const SUPER_ADMINS = ['zihansarowar403@gmail.com', 'melbournensuer@gmail.com']
  
  // Check if email is a super admin
  const isSuperAdmin = (email: string) => SUPER_ADMINS.includes(email.toLowerCase())
  
  // Check if current user is admin
  const isAdmin = userProfile?.isAdmin === true || isSuperAdmin(userProfile?.email || '')

  useEffect(() => {
    if (!isAdmin) return

    const fetchUsers = async () => {
      if (!db) {
        console.error('Firebase not initialized');
        setLoading(false);
        return;
      }

      try {
        const usersRef = collection(db, 'users')
        const querySnapshot = await getDocs(usersRef)
        const usersData: User[] = []
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          // Debug log to check what photoURL data we're getting
          if (data.photoURL) {
            console.log(`User ${data.displayName}: photoURL =`, data.photoURL)
          }
          usersData.push({
            uid: doc.id,
            displayName: data.displayName || 'Anonymous',
            email: data.email,
            photoURL: data.photoURL || data.photoUrl || null, // Check multiple possible field names
            phoneNumber: data.phoneNumber,
            nsuId: data.nsuId,
            major: data.major,
            currentJob: data.currentJob,
            company: data.company,
            location: data.location,
            address: data.address,
            membershipTier: data.membershipTier || 'basic',
            joinedAt: data.joinedAt?.toDate() || new Date(),
            emailVerified: data.emailVerified || false,
            isAdmin: data.isAdmin || false,
            bio: data.bio,
            linkedIn: data.linkedIn,
            github: data.github,
            website: data.website,
            graduationYear: data.graduationYear,
            skills: data.skills,
            industry: data.industry,
            workLocation: data.workLocation
          })
        })
        
        // Sort by join date (newest first)
        usersData.sort((a, b) => b.joinedAt.getTime() - a.joinedAt.getTime())
        setUsers(usersData)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [isAdmin])

  const updateUserTier = async (uid: string, newTier: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'users', uid), {
        membershipTier: newTier
      })
      
      setUsers(prev => prev.map(user => 
        user.uid === uid ? { ...user, membershipTier: newTier } : user
      ))
    } catch (error) {
      console.error('Error updating user tier:', error)
    }
  }

  const toggleAdminStatus = async (uid: string, currentIsAdmin: boolean, userEmail: string) => {
    if (!db) return;
    
    // Prevent removing super admin status
    if (isSuperAdmin(userEmail)) {
      alert('Cannot modify super admin status for protected accounts.')
      return
    }
    
    try {
      await updateDoc(doc(db, 'users', uid), {
        isAdmin: !currentIsAdmin
      })
      
      setUsers(prev => prev.map(user => 
        user.uid === uid ? { ...user, isAdmin: !currentIsAdmin } : user
      ))
    } catch (error) {
      console.error('Error updating admin status:', error)
    }
  }

  const verifyUser = async (uid: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'users', uid), {
        emailVerified: true,
        verificationCode: null
      })
      
      setUsers(prev => prev.map(user => 
        user.uid === uid ? { ...user, emailVerified: true } : user
      ))
    } catch (error) {
      console.error('Error verifying user:', error)
    }
  }

  const deleteUser = async (uid: string, userEmail: string) => {
    if (!db) return;
    
    // Prevent deleting super admins
    if (isSuperAdmin(userEmail)) {
      alert('Cannot delete super admin accounts.')
      return
    }
    
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      await deleteDoc(doc(db, 'users', uid))
      setUsers(prev => prev.filter(user => user.uid !== uid))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTier = !filterTier || user.membershipTier === filterTier
    const matchesVerification = filterVerification === '' || 
                               (filterVerification === 'verified' && user.emailVerified) ||
                               (filterVerification === 'unverified' && !user.emailVerified)
    
    return matchesSearch && matchesTier && matchesVerification
  })

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-300 mb-4">You don't have permission to access the admin panel.</p>
          <Link href="/dashboard" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Panel</h1>
                <p className="text-blue-200">Manage {users.length} registered users</p>
              </div>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Link
                  href="/admin/events"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all font-medium text-sm shadow"
                >
                  Manage Events
                </Link>
                <Link
                  href="/admin/news"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-all font-medium text-sm shadow"
                >
                  Manage News
                </Link>
                <Link
                  href="/admin/benefits"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all font-medium text-sm shadow"
                >
                  Manage Benefits
                </Link>
                <Link
                  href="/admin/messages"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all font-medium text-sm shadow"
                >
                  Contact Messages
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-md border border-blue-400/30 transition-all font-medium text-sm shadow"
                >
                  Member Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center min-w-0">
              <div className="text-2xl font-bold text-blue-400 mb-2">{users.length}</div>
              <div className="text-gray-300 text-sm truncate">Total Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center min-w-0">
              <div className="text-2xl font-bold text-green-400 mb-2">
                {users.filter(u => u.emailVerified).length}
              </div>
              <div className="text-gray-300 text-sm truncate">Verified Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center min-w-0">
              <div className="text-2xl font-bold text-cyan-400 mb-2">
                {users.filter(u => u.membershipTier === 'premium' || u.membershipTier === 'lifetime').length}
              </div>
              <div className="text-gray-300 text-sm truncate">Premium Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center min-w-0">
              <div className="text-2xl font-bold text-orange-400 mb-2">
                {users.filter(u => u.joinedAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-gray-300 text-sm truncate">New This Month</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Search Users
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="Search by name, email, or company..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Membership Tier
                </label>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                >
                  <option value="" className="bg-white text-gray-900">All Tiers</option>
                  <option value="basic" className="bg-white text-gray-900">Basic</option>
                  <option value="premium" className="bg-white text-gray-900">Premium</option>
                  <option value="lifetime" className="bg-white text-gray-900">Lifetime</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Verification Status
                </label>
                <select
                  value={filterVerification}
                  onChange={(e) => setFilterVerification(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                >
                  <option value="">All Users</option>
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Membership
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.map((user) => (
                    <tr key={user.uid} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Profile Picture */}
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                            {user.photoURL ? (
                              <img 
                                src={user.photoURL} 
                                alt={user.displayName}
                                className="w-full h-full object-cover"
                                onLoad={() => console.log(`Image loaded successfully for ${user.displayName}`)}
                                onError={(e) => {
                                  console.log(`Image failed to load for ${user.displayName}:`, user.photoURL);
                                  // Hide the image and show fallback
                                  const imgElement = e.target as HTMLImageElement;
                                  const container = imgElement.parentElement;
                                  if (container) {
                                    container.innerHTML = `<div class="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">${user.displayName.charAt(0).toUpperCase()}</div>`;
                                  }
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                {user.displayName.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <button 
                              onClick={() => openUserModal(user)}
                              className="text-sm font-medium text-white hover:text-blue-300 transition-colors flex items-center gap-2 cursor-pointer"
                            >
                              {user.displayName}
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-3a3 3 0 00-3 3v1h12v-1a3 3 0 00-3-3h-3zM8 8a4 4 0 108 0 4 4 0 00-8 0z" />
                              </svg>
                              {user.isAdmin && (
                                <span className="bg-red-500/20 text-red-300 border border-red-400/30 px-2 py-1 rounded-full text-xs font-medium">
                                  ADMIN
                                </span>
                              )}
                            </button>
                            <div className="text-sm text-gray-400">{user.email}</div>
                            {user.company && (
                              <div className="text-sm text-gray-400">{user.company}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.membershipTier}
                          onChange={(e) => updateUserTier(user.uid, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            user.membershipTier === 'premium' 
                              ? 'bg-purple-500/20 text-purple-300 border-purple-400/30' 
                              : user.membershipTier === 'lifetime'
                              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                              : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                          }`}
                        >
                          <option value="basic" className="bg-white text-gray-900">Basic</option>
                          <option value="premium" className="bg-white text-gray-900">Premium</option>
                          <option value="lifetime" className="bg-white text-gray-900">Lifetime</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            user.emailVerified 
                              ? 'bg-green-500/20 text-green-300 border-green-400/30' 
                              : 'bg-red-500/20 text-red-300 border-red-400/30'
                          }`}>
                            {user.emailVerified ? 'Verified' : 'Unverified'}
                          </span>
                          {!user.emailVerified && (
                            <button
                              onClick={() => verifyUser(user.uid)}
                              className="text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-1 rounded hover:bg-blue-500/30"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {user.joinedAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          {isSuperAdmin(user.email) ? (
                            <span className="px-3 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                              Super Admin
                            </span>
                          ) : (
                            <button
                              onClick={() => toggleAdminStatus(user.uid, user.isAdmin || false, user.email)}
                              className={`px-3 py-1 rounded text-xs font-medium border ${
                                user.isAdmin 
                                  ? 'bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30' 
                                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                              }`}
                            >
                              {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user.uid, user.email)}
                            disabled={isSuperAdmin(user.email)}
                            className={`px-3 py-1 rounded text-xs font-medium border ${
                              isSuperAdmin(user.email)
                                ? 'bg-gray-500/20 text-gray-400 border-gray-400/30 cursor-not-allowed opacity-50'
                                : 'bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30'
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeUserModal}
          >
            <div 
              className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100">
                      {selectedUser.photoURL ? (
                        <img 
                          src={selectedUser.photoURL} 
                          alt={selectedUser.displayName}
                          className="w-20 h-20 rounded-full object-cover"
                          onLoad={() => console.log(`Modal image loaded successfully for ${selectedUser.displayName}`)}
                          onError={(e) => {
                            console.log(`Modal image failed to load for ${selectedUser.displayName}:`, selectedUser.photoURL);
                            // Hide the image and show fallback
                            const imgElement = e.target as HTMLImageElement;
                            const container = imgElement.parentElement;
                            if (container) {
                              container.innerHTML = `<div class="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">${selectedUser.displayName.charAt(0).toUpperCase()}</div>`;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                          {selectedUser.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedUser.displayName}</h2>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      {selectedUser.isAdmin && (
                        <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                          ADMIN
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={closeUserModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                    {selectedUser.phoneNumber && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900">{selectedUser.phoneNumber}</p>
                      </div>
                    )}
                    {selectedUser.nsuId && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">NSU ID</label>
                        <p className="text-gray-900">{selectedUser.nsuId}</p>
                      </div>
                    )}
                    {selectedUser.major && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Major</label>
                        <p className="text-gray-900">{selectedUser.major}</p>
                      </div>
                    )}
                    {selectedUser.graduationYear && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Graduation Year</label>
                        <p className="text-gray-900">{selectedUser.graduationYear}</p>
                      </div>
                    )}
                    {selectedUser.location && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <p className="text-gray-900">{selectedUser.location}</p>
                      </div>
                    )}
                    {selectedUser.address && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="text-gray-900">{selectedUser.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Information */}
                {(selectedUser.currentJob?.trim() || selectedUser.company?.trim() || selectedUser.industry?.trim() || selectedUser.workLocation?.trim()) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedUser.currentJob?.trim() && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Current Job</label>
                          <p className="text-gray-900">{selectedUser.currentJob}</p>
                        </div>
                      )}
                      {selectedUser.company?.trim() && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Company</label>
                          <p className="text-gray-900">{selectedUser.company}</p>
                        </div>
                      )}
                      {selectedUser.industry?.trim() && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Industry</label>
                          <p className="text-gray-900">{selectedUser.industry}</p>
                        </div>
                      )}
                      {selectedUser.workLocation?.trim() && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Work Location</label>
                          <p className="text-gray-900">{selectedUser.workLocation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {selectedUser.bio && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Bio</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedUser.bio}</p>
                  </div>
                )}

                {/* Skills */}
                {selectedUser.skills && selectedUser.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {(selectedUser.linkedIn || selectedUser.github || selectedUser.website) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Social Links</h3>
                    <div className="space-y-2">
                      {selectedUser.linkedIn && (
                        <a href={selectedUser.linkedIn} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {selectedUser.github && (
                        <a href={selectedUser.github} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {selectedUser.website && (
                        <a href={selectedUser.website} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 text-green-600 hover:text-green-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Membership Tier</label>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        selectedUser.membershipTier === 'premium' ? 'bg-purple-100 text-purple-800' :
                        selectedUser.membershipTier === 'lifetime' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedUser.membershipTier ? selectedUser.membershipTier.charAt(0).toUpperCase() + selectedUser.membershipTier.slice(1) : 'Basic'}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email Verified</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        selectedUser.emailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUser.emailVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Joined</label>
                      <p className="text-gray-900">{selectedUser.joinedAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">User ID</label>
                      <p className="text-gray-900 font-mono text-sm">{selectedUser.uid}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={closeUserModal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
