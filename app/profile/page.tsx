'use client'

import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
// Dynamically import widget only if cloud name exists to avoid runtime error
const UploadWidget = cloudName ? dynamic(() => import('next-cloudinary').then(m => m.CldUploadWidget), { ssr: false }) : null

export default function EditProfile() {
  const { user, userProfile, updateUserProfile } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    streetAddress: '',
    suburb: '',
    state: '',
    postcode: ''
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoURL, setPhotoURL] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Load user data
  useEffect(() => {
    console.log('EditProfile useEffect - userProfile:', userProfile)
    if (!userProfile) {
      setIsLoading(true)
      return
    }
    
    setIsLoading(false)

    // Parse address
    const addressParts = userProfile.address ? userProfile.address.split(',').map(s => s.trim()) : []

    setFormData({
      firstName: userProfile.firstName || '',
      lastName: userProfile.lastName || '',
      phoneNumber: userProfile.phoneNumber || '',
      streetAddress: addressParts[0] || '',
      suburb: addressParts[1] || '',
      state: addressParts[2] || '',
      postcode: addressParts[3] || ''
    })

    if (userProfile.photoURL) {
      setPhotoPreview(userProfile.photoURL)
    }
    console.log('EditProfile form loaded with data:', {firstName: userProfile.firstName, lastName: userProfile.lastName})
  }, [userProfile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhotoUpload = (result: any) => {
    if (result.event === 'success') {
      const url = result.info.secure_url
      setPhotoURL(url)
      setPhotoPreview(url)
      console.log('✅ Photo uploaded to Cloudinary:', url)
      setMessage({ type: 'success', text: 'Photo uploaded successfully!' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setMessage({ type: 'error', text: 'First name and last name are required' })
      return
    }

    console.log('🔄 Form submission started', {formData, photoURL})
    setSaving(true)
    setMessage(null)

    try {
      // Combine address fields
      const fullAddress = [formData.streetAddress, formData.suburb, formData.state, formData.postcode]
        .filter(Boolean)
        .join(', ')

      // Prepare update data
      const updateData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: `${formData.firstName} ${formData.lastName}`,
        phoneNumber: formData.phoneNumber,
        address: fullAddress
      }

      // Add photo URL if one was uploaded via Cloudinary
      if (photoURL) {
        updateData.photoURL = photoURL
        console.log('📸 Including photo URL:', photoURL)
      }

      console.log('📝 Update data prepared:', updateData)
      console.log('💾 Calling updateUserProfile...')
      
      await updateUserProfile(updateData)
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      
      console.log('⏱️ Redirecting to dashboard in 1500ms...')
      setTimeout(() => {
        console.log('🔀 Redirecting now...')
        setSaving(false)
        router.push('/dashboard')
      }, 1500)
    } catch (error: any) {
      console.error('❌ Error updating profile:', error)
      setSaving(false)
      setMessage({ type: 'error', text: error.message || 'Failed to update profile. Please try again.' })
    }
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600 mt-2">Update your personal information and profile picture</p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.type === 'success' ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Section */}
            <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-blue-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Photo</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-blue-100 shadow-lg">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white text-4xl font-bold">
                        {formData.firstName?.charAt(0) || 'U'}{formData.lastName?.charAt(0) || 'S'}
                      </div>
                    )}
                  </div>
                  {photoURL && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <UploadWidget
                    uploadPreset="nsu_alumni_photos"
                    onSuccess={handlePhotoUpload}
                    options={{
                      maxFileSize: 5242880, // 5MB
                      folder: 'nsu-alumni/profile-photos',
                      resourceType: 'image',
                      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
                    }}
                  >
                    {({ open }: any) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="bg-gradient-to-r from-slate-800 to-blue-800 hover:from-slate-900 hover:to-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
                      >
                        Choose Photo
                      </button>
                    )}
                  </UploadWidget>
                  <p className="text-sm text-gray-600 mt-3">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    This photo will appear on your dashboard and digital member card.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Doe"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userProfile?.email || user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+61 XXX XXX XXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Address</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Suburb
                  </label>
                  <input
                    type="text"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleInputChange}
                    placeholder="Melbourne"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  >
                    <option value="">Select State</option>
                    <option value="VIC">Victoria (VIC)</option>
                    <option value="NSW">New South Wales (NSW)</option>
                    <option value="QLD">Queensland (QLD)</option>
                    <option value="SA">South Australia (SA)</option>
                    <option value="WA">Western Australia (WA)</option>
                    <option value="TAS">Tasmania (TAS)</option>
                    <option value="NT">Northern Territory (NT)</option>
                    <option value="ACT">Australian Capital Territory (ACT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postcode
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="3000"
                    maxLength={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-slate-800 to-blue-800 hover:from-slate-900 hover:to-blue-900 text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                disabled={saving}
                className="sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}
