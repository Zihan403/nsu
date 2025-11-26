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
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Link
                  href="/admin/events"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg transition-all font-semibold w-full sm:w-auto"
                >
                  📅 Manage Events
                </Link>
                <Link
                  href="/admin/messages"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-all font-semibold w-full sm:w-auto"
                >
                  📧 Contact Messages
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-blue-400/30 transition-all font-semibold w-full sm:w-auto"
                >
                  👤 Member Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{users.length}</div>
                <div className="text-gray-300 text-sm">Total Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {users.filter(u => u.emailVerified).length}
                </div>
                <div className="text-gray-300 text-sm">Verified Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {users.filter(u => u.membershipTier === 'premium' || u.membershipTier === 'lifetime').length}
                </div>
                <div className="text-gray-300 text-sm">Premium Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2">
                  {users.filter(u => u.joinedAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-gray-300 text-sm">New This Month</div>
              </div>
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
                        <div>
                          <div className="text-sm font-medium text-white flex items-center gap-2">
                            {user.displayName}
                            {user.isAdmin && (
                              <span className="bg-red-500/20 text-red-300 border border-red-400/30 px-2 py-1 rounded-full text-xs font-medium">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                          {user.company && (
                            <div className="text-sm text-gray-400">{user.company}</div>
                          )}
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
      </div>
    </ProtectedRoute>
  )
}
