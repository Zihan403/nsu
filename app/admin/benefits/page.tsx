'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Use global env variable that works on client side
const cloudName = typeof window !== 'undefined' 
  ? (window as any).ENV?.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  : process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const UploadWidget = dynamic(() => import('next-cloudinary').then(m => m.CldUploadWidget), { ssr: false })

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
}

export default function AdminBenefits() {
  const { user } = useAuth()
  const router = useRouter()
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    discount: '',
    description: '',
    image: '',
    color: 'blue',
    link: '/join',
    isExternal: false,
    status: 'active',
    contactEmail: '',
    instructions: '',
    promoCode: ''
  })

  const colors = ['blue', 'green', 'purple', 'orange', 'red', 'yellow', 'indigo', 'pink']
  const statuses = ['active', 'coming-soon', 'inactive']

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    // Add admin check here if needed
  }, [user, router])

  // Fetch benefits from Firestore
  useEffect(() => {
    if (!user) return

    const fetchBenefits = async () => {
      if (!db) {
        setLoading(false)
        return
      }

      try {
        const benefitsQuery = query(collection(db, 'benefits'), orderBy('status', 'asc'))
        const querySnapshot = await getDocs(benefitsQuery)
        
        const benefitsData: Benefit[] = []
        querySnapshot.forEach((doc) => {
          benefitsData.push({
            id: doc.id,
            ...doc.data()
          } as Benefit)
        })
        
        setBenefits(benefitsData)
      } catch (error) {
        console.error('Error fetching benefits:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBenefits()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db) return

    try {
      const benefitData = {
        ...formData,
        updatedAt: serverTimestamp()
      }

      if (editingBenefit) {
        await updateDoc(doc(db, 'benefits', editingBenefit.id), benefitData)
        setBenefits(benefits.map(item => item.id === editingBenefit.id ? { ...item, ...benefitData } : item))
      } else {
        const docRef = await addDoc(collection(db, 'benefits'), {
          ...benefitData,
          createdAt: serverTimestamp()
        })
        setBenefits([...benefits, { id: docRef.id, ...benefitData } as Benefit])
      }

      setFormData({
        title: '', discount: '', description: '', image: '', color: 'blue',
        link: '/join', isExternal: false, status: 'active', contactEmail: '', instructions: '', promoCode: ''
      })
      setShowForm(false)
      setEditingBenefit(null)
    } catch (error) {
      console.error('Error saving benefit:', error)
      alert('Error saving benefit. Please try again.')
    }
  }

  const handleEdit = (benefit: Benefit) => {
    setEditingBenefit(benefit)
    setFormData({
      title: benefit.title,
      discount: benefit.discount,
      description: benefit.description,
      image: benefit.image,
      color: benefit.color,
      link: benefit.link,
      isExternal: benefit.isExternal,
      status: benefit.status,
      contactEmail: benefit.contactEmail || '',
      instructions: benefit.instructions || '',
      promoCode: benefit.promoCode || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (benefitId: string) => {
    if (!confirm('Are you sure you want to delete this benefit?')) return
    if (!db) return

    try {
      await deleteDoc(doc(db, 'benefits', benefitId))
      setBenefits(benefits.filter(item => item.id !== benefitId))
    } catch (error) {
      console.error('Error deleting benefit:', error)
      alert('Error deleting benefit. Please try again.')
    }
  }

  const handleCancel = () => {
    setFormData({
      title: '', discount: '', description: '', image: '', color: 'blue',
      link: '/join', isExternal: false, status: 'active', contactEmail: '', instructions: '', promoCode: ''
    })
    setShowForm(false)
    setEditingBenefit(null)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
          <div className="px-8 py-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Benefits Management</h1>
                <p className="text-blue-200">Manage member perks and partner benefits</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Link
                  href="/admin/panel"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-blue-400/30 transition-all font-semibold w-full sm:w-auto text-center"
                >
                  ← Admin Panel
                </Link>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg"
                >
                  Add Benefit
                </button>
              </div>
            </div>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-8 overflow-y-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full min-h-fit max-h-none shadow-2xl border border-white/20 my-8">
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingBenefit ? 'Edit Benefit' : 'Add Benefit'}
                    </h2>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                        placeholder="Enter benefit title..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This appears as the main heading on benefit cards in user dashboard and benefits page
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                      <input
                        type="text"
                        required
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        placeholder="e.g., 10% OFF, COMING SOON"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This shows the discount amount or offer type (appears on both dashboard cards and benefits page)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="Brief description of the business or service..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This appears on both dashboard cards and the main benefits page as business description
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                      <div className="space-y-4">
                        <UploadWidget
                          uploadPreset="ml_default"
                          onSuccess={(result: any) => {
                            if (result?.info?.secure_url) {
                              const imageUrl = result.info.secure_url;
                              setFormData({ ...formData, image: imageUrl });
                              console.log('Image uploaded:', imageUrl);
                            }
                          }}
                        >
                          {({ open }: { open: () => void }) => (
                            <button
                              type="button"
                              onClick={() => open()}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              📤 {formData.image ? 'Change Image' : 'Upload Image'}
                            </button>
                          )}
                        </UploadWidget>
                        
                        {formData.image ? (
                          <div className="mt-4">
                            <Image
                              src={formData.image}
                              alt="Preview"
                              width={200}
                              height={120}
                              className="rounded-lg object-cover border-2 border-gray-200"
                            />
                          </div>
                        ) : (
                          <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                            No image uploaded yet. Click the button above to upload.
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                      <select
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      >
                        {colors.map(color => (
                          <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Changes the card color in user dashboard (blue=blue gradient, green=green gradient, etc.)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Active=shows normally, Coming Soon=shows with overlay, Draft=hidden from users
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                      <input
                        type="text"
                        required
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="https://partner-website.com or /join"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        🔗 Where users go when they click the benefit card (partner website, booking page, etc.)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        placeholder="partner@business.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        📧 If provided, shows as "Contact Details" in dashboard cards instead of instructions
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (Optional)</label>
                      <textarea
                        rows={3}
                        value={formData.instructions}
                        onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                        placeholder="How to claim this benefit..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        ℹ️ Shows as "How to Avail" in dashboard cards ONLY if no promo code is provided (e.g., "Show member card at checkout")
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code (Optional)</label>
                      <input
                        type="text"
                        value={formData.promoCode}
                        onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                        placeholder="e.g., SAVE10, WELCOME2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        If provided, shows in dashboard cards with copy button INSTEAD of instructions. Leave empty to show instructions.
                      </p>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isExternal"
                        checked={formData.isExternal}
                        onChange={(e) => setFormData({ ...formData, isExternal: e.target.checked })}
                        className="mr-2"
                      />
                      <label htmlFor="isExternal" className="text-sm text-gray-700">External link</label>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl transition-all font-semibold shadow-lg flex-1"
                    >
                      {editingBenefit ? 'Update Benefit' : 'Create Benefit'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl transition-all font-medium border border-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Benefits List */}
          <div className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Loading benefits...</p>
              </div>
            ) : benefits.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-2">No benefits found</h3>
                <p className="text-blue-200 mb-6">Start by adding your first member benefit</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Add First Benefit
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      <div className="w-full lg:w-48 h-32 lg:h-24 flex-shrink-0">
                        {benefit.image ? (
                          <Image
                            src={benefit.image}
                            alt={benefit.title}
                            width={192}
                            height={128}
                            className="w-full h-full object-cover rounded-xl border border-white/20"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 rounded-xl border border-white/20 flex items-center justify-center">
                            <span className="text-white/50 text-2xl"></span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                          <div className="flex-grow">
                            {/* Status and Discount */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                                benefit.status === 'active' ? 'bg-green-600/20 text-green-300' :
                                benefit.status === 'coming-soon' ? 'bg-yellow-600/20 text-yellow-300' :
                                'bg-gray-600/20 text-gray-300'
                              }`}>
                                {benefit.status.replace('-', ' ')}
                              </span>
                              <span className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                                {benefit.discount}
                              </span>
                              <span className="inline-block bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                                {benefit.color} theme
                              </span>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight">{benefit.title}</h3>
                            
                            {/* Description */}
                            <p className="text-blue-100 text-sm leading-relaxed mb-4 line-clamp-2">{benefit.description}</p>
                            
                            {/* Metadata */}
                            <div className="flex flex-wrap gap-4 text-xs text-blue-300">
                              {benefit.contactEmail && (
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                  {benefit.contactEmail}
                                </span>
                              )}
                              {benefit.instructions && (
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                  Has instructions
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                <a href={benefit.link} className="hover:text-white transition-colors">
                                  {benefit.isExternal ? 'External Link' : 'Internal Link'} →
                                </a>
                              </span>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-3 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(benefit)}
                              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-blue-600/30"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(benefit.id)}
                              className="bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-red-600/30"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}