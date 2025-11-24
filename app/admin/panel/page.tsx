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
  nsuId?: string
  major?: string
  currentJob?: string
  company?: string
  location?: string
  membershipTier?: string
  joinedAt: Date
  emailVerified: boolean
  isAdmin?: boolean
}

export default function AdminPanel() {
  const { user, userProfile } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState('')
  const [filterVerification, setFilterVerification] = useState('')

  // Check if current user is admin
  const isAdmin = userProfile?.email === 'admin@nsu.edu' || userProfile?.isAdmin === true

  useEffect(() => {
    if (!isAdmin) return

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users')
        const querySnapshot = await getDocs(usersRef)
        const usersData: User[] = []
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          usersData.push({
            uid: doc.id,
            displayName: data.displayName || 'Anonymous',
            email: data.email,
            nsuId: data.nsuId,
            major: data.major,
            currentJob: data.currentJob,
            company: data.company,
            location: data.location,
            membershipTier: data.membershipTier || 'basic',
            joinedAt: data.joinedAt?.toDate() || new Date(),
            emailVerified: data.emailVerified || false,
            isAdmin: data.isAdmin || false
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

  const toggleAdminStatus = async (uid: string, isAdmin: boolean) => {
    try {
      await updateDoc(doc(db, 'users', uid), {
        isAdmin: !isAdmin
      })
      
      setUsers(prev => prev.map(user => 
        user.uid === uid ? { ...user, isAdmin: !isAdmin } : user
      ))
    } catch (error) {
      console.error('Error updating admin status:', error)
    }
  }

  const verifyUser = async (uid: string) => {
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

  const deleteUser = async (uid: string) => {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
          <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
                <p className="text-red-100">Manage {users.length} registered users</p>
              </div>
              <Link 
                href="/dashboard"
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{users.length}</div>
              <div className="text-gray-600 text-sm">Total Users</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {users.filter(u => u.emailVerified).length}
              </div>
              <div className="text-gray-600 text-sm">Verified Users</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {users.filter(u => u.membershipTier === 'premium' || u.membershipTier === 'lifetime').length}
              </div>
              <div className="text-gray-600 text-sm">Premium Members</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {users.filter(u => u.joinedAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-gray-600 text-sm">New This Month</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Users
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by name, email, or company..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Tier
                </label>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Tiers</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="lifetime">Lifetime</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Status
                </label>
                <select
                  value={filterVerification}
                  onChange={(e) => setFilterVerification(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Users</option>
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Membership
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.uid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {user.displayName}
                            {user.isAdmin && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.company && (
                            <div className="text-sm text-gray-500">{user.company}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.membershipTier}
                          onChange={(e) => updateUserTier(user.uid, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-none ${
                            user.membershipTier === 'premium' 
                              ? 'bg-purple-100 text-purple-800' 
                              : user.membershipTier === 'lifetime'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          <option value="basic">Basic</option>
                          <option value="premium">Premium</option>
                          <option value="lifetime">Lifetime</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.emailVerified 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.emailVerified ? 'Verified' : 'Unverified'}
                          </span>
                          {!user.emailVerified && (
                            <button
                              onClick={() => verifyUser(user.uid)}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinedAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleAdminStatus(user.uid, user.isAdmin || false)}
                            className={`px-3 py-1 rounded text-xs font-medium ${
                              user.isAdmin 
                                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                          </button>
                          <button
                            onClick={() => deleteUser(user.uid)}
                            className="px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200"
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
                <div className="text-gray-400 text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
