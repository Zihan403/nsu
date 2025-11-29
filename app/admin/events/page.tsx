'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Use global env variable that works on client side
const cloudName = typeof window !== 'undefined' 
  ? (window as any).ENV?.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  : process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const UploadWidget = dynamic(() => import('next-cloudinary').then(m => m.CldUploadWidget), { ssr: false })

interface Event {
  id: string
  date: string
  time: string
  title: string
  description: string
  location: string
  locationUrl?: string
  category: string
  image?: string
}

export default function AdminEventsPage() {
  const { userProfile } = useAuth()
  const isAdmin = userProfile?.isAdmin || false
  
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    title: '',
    description: '',
    location: '',
    locationUrl: '',
    category: 'Social',
    image: ''
  })

  useEffect(() => {
    if (!isAdmin) return
    
    // Test Firebase connection
    if (db) {
      console.log('✅ Firebase db initialized in admin events page')
    } else {
      console.error('❌ Firebase db NOT initialized in admin events page')
    }
    
    fetchEvents()
  }, [isAdmin])

  const fetchEvents = async () => {
    if (!db) {
      console.error('Firebase db not initialized in fetchEvents')
      setLoading(false)
      return
    }
    
    try {
      console.log('Fetching events from Firestore...')
      const eventsQuery = query(collection(db, 'events'), orderBy('date', 'desc'))
      const querySnapshot = await getDocs(eventsQuery)
      
      const eventsData: Event[] = []
      querySnapshot.forEach((doc) => {
        eventsData.push({
          id: doc.id,
          ...doc.data()
        } as Event)
      })
      
      console.log(`Fetched ${eventsData.length} events`)
      setEvents(eventsData)
    } catch (error: any) {
      console.error('Error fetching events:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!db) {
      alert('❌ Firebase not initialized')
      console.error('Firebase db is not initialized')
      return
    }

    try {
      console.log('Saving event data:', formData)
      
      if (editingEvent) {
        // Update existing event
        await updateDoc(doc(db, 'events', editingEvent.id), formData)
        console.log('Event updated successfully')
        alert('✅ Event updated successfully!')
      } else {
        // Create new event
        const docRef = await addDoc(collection(db, 'events'), formData)
        console.log('Event created successfully with ID:', docRef.id)
        alert('✅ Event created successfully!')
      }
      
      setShowForm(false)
      setEditingEvent(null)
      resetForm()
      fetchEvents()
    } catch (error: any) {
      console.error('Error saving event:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      alert(`❌ Error saving event: ${error.message}\n\nCheck console for details.`)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      date: event.date,
      time: event.time,
      title: event.title,
      description: event.description,
      location: event.location,
      locationUrl: event.locationUrl || '',
      category: event.category,
      image: event.image || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (eventId: string) => {
    if (!db) return
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      await deleteDoc(doc(db, 'events', eventId))
      alert('Event deleted successfully!')
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event')
    }
  }

  const resetForm = () => {
    setFormData({
      date: '',
      time: '',
      title: '',
      description: '',
      location: '',
      locationUrl: '',
      category: 'Social',
      image: ''
    })
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">📅 Manage Events</h1>
                <p className="text-blue-200">{events.length} events</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Link
                  href="/admin/panel"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-blue-400/30 transition-all font-semibold w-full sm:w-auto"
                >
                  ← Admin Panel
                </Link>
                <button
                  onClick={() => {
                    setShowForm(!showForm)
                    setEditingEvent(null)
                    resetForm()
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all w-full sm:w-auto"
                >
                  + Create Event
                </button>
              </div>
            </div>
          </div>

          {/* Create/Edit Form */}
          {showForm && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Event Title</label>
                  <input
                    type="text"
                    placeholder="Reconnect 2025: Strengthening the NSU Bond"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Description (max 100 words)</label>
                  <textarea
                    placeholder="Event description..."
                    value={formData.description}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/)
                      if (words.length <= 100 || e.target.value === '') {
                        setFormData({...formData, description: e.target.value})
                      }
                    }}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 text-white placeholder-gray-400"
                    required
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    {formData.description.trim() ? formData.description.trim().split(/\s+/).length : 0} / 100 words
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="Community Hub at The Dock"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Location URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="e.g., https://maps.google.com/..."
                      value={formData.locationUrl}
                      onChange={(e) => setFormData({...formData, locationUrl: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    >
                      <option>Social</option>
                      <option>Networking</option>
                      <option>Professional Development</option>
                      <option>Career Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Event Image (Required)</label>
                    <p className="text-xs text-gray-400 mb-2">📐 Recommended: 1200 x 675 pixels (16:9 ratio) for best display quality</p>
                    <div className="space-y-2">
                      <UploadWidget
                        uploadPreset="ml_default"
                        onSuccess={(result: any) => {
                          const imageUrl = result?.info?.secure_url
                          if (imageUrl) {
                            setFormData({...formData, image: imageUrl})
                            console.log('Image uploaded:', imageUrl)
                          }
                        }}
                      >
                        {({ open }) => (
                          <button
                            type="button"
                            onClick={() => open()}
                            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
                          >
                            📤 {formData.image ? 'Change Image' : 'Upload Image'}
                          </button>
                        )}
                      </UploadWidget>
                      {formData.image && (
                        <div className="relative h-40 w-full border-2 border-blue-500 rounded-lg overflow-hidden">
                          <img
                            src={formData.image}
                            alt="Event Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, image: ''})}
                            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {!formData.image && (
                        <p className="text-sm text-gray-400 text-center py-4 border-2 border-dashed border-white/20 rounded-lg">
                          No image uploaded yet. Click the button above to upload.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingEvent(null)
                      resetForm()
                    }}
                    className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Events List */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading events...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md p-6 hover:bg-white/15 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-blue-300">
                          📅 {event.date} • {event.time}
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{event.description}</p>
                      <p className="text-sm text-gray-400">
                        📍 {event.location}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}