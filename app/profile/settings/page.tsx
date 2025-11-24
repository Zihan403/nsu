'use client'

import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import Link from 'next/link'

export default function ProfileSettings() {
  const { user, userProfile, updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    nsuId: userProfile?.nsuId || '',
    major: userProfile?.major || '',
    currentJob: userProfile?.currentJob || '',
    company: userProfile?.company || '',
    location: userProfile?.location || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')

    try {
      await updateUserProfile(formData)
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!user || !userProfile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
                <p className="text-blue-100">Manage your alumni profile information</p>
              </div>
              <Link 
                href="/dashboard"
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {success && (
            <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          {/* Profile Content */}
          <div className="p-8">
            {!isEditing ? (
              /* View Mode */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-lg text-gray-900">{userProfile.displayName || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <p className="text-lg text-gray-900">{userProfile.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">NSU ID</label>
                      <p className="text-lg text-gray-900">{userProfile.nsuId || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Major</label>
                      <p className="text-lg text-gray-900">{userProfile.major || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Current Job</label>
                      <p className="text-lg text-gray-900">{userProfile.currentJob || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Company</label>
                      <p className="text-lg text-gray-900">{userProfile.company || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-lg text-gray-900">{userProfile.location || 'Not provided'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Membership Tier</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                      userProfile.membershipTier === 'premium' 
                        ? 'bg-purple-100 text-purple-800' 
                        : userProfile.membershipTier === 'lifetime'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {userProfile.membershipTier?.charAt(0).toUpperCase()}{userProfile.membershipTier?.slice(1)} Member
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                    <p className="text-lg text-gray-900">{userProfile.joinedAt?.toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Verification</h4>
                        <p className="text-sm text-gray-500">Your email address is verified</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NSU ID
                    </label>
                    <input
                      type="text"
                      name="nsuId"
                      value={formData.nsuId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. 2011012345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Major
                    </label>
                    <select
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select major</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business Administration">Business Administration</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Economics">Economics</option>
                      <option value="English">English</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Law">Law</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Job Title
                    </label>
                    <input
                      type="text"
                      name="currentJob"
                      value={formData.currentJob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. Google Australia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. Melbourne, Australia"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
