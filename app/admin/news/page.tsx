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

interface NewsArticle {
  id: string
  title: string
  description: string
  image: string
  category: string
  url: string
  external: boolean
  publishDate?: string
  author?: string
}

export default function AdminNews() {
  const { user } = useAuth()
  const router = useRouter()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: 'NEWS',
    url: '',
    external: true
  })

  const categories = ['NEWS', 'EVENTS', 'MEDIA COVERAGE', 'ANNOUNCEMENTS', 'SUCCESS STORIES']

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    // Add admin check here if needed
  }, [user, router])

  // Fetch news from Firestore
  useEffect(() => {
    if (!user) return

    const fetchNews = async () => {
      if (!db) {
        setLoading(false)
        return
      }

      try {
        const newsQuery = query(collection(db, 'news'), orderBy('publishDate', 'desc'))
        const querySnapshot = await getDocs(newsQuery)
        
        const newsData: NewsArticle[] = []
        querySnapshot.forEach((doc) => {
          newsData.push({
            id: doc.id,
            ...doc.data()
          } as NewsArticle)
        })
        
        setNews(newsData)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db) return

    try {
      const newsData = {
        ...formData,
        publishDate: serverTimestamp()
      }

      if (editingNews) {
        await updateDoc(doc(db, 'news', editingNews.id), newsData)
        // Refetch news after update
        const newsQuery = query(collection(db, 'news'), orderBy('publishDate', 'desc'))
        const querySnapshot = await getDocs(newsQuery)
        const newsDataArray: NewsArticle[] = []
        querySnapshot.forEach((doc) => {
          newsDataArray.push({
            id: doc.id,
            ...doc.data()
          } as NewsArticle)
        })
        setNews(newsDataArray)
      } else {
        const docRef = await addDoc(collection(db, 'news'), newsData)
        // Refetch news after add
        const newsQuery = query(collection(db, 'news'), orderBy('publishDate', 'desc'))
        const querySnapshot = await getDocs(newsQuery)
        const newsDataArray: NewsArticle[] = []
        querySnapshot.forEach((doc) => {
          newsDataArray.push({
            id: doc.id,
            ...doc.data()
          } as NewsArticle)
        })
        setNews(newsDataArray)
      }

      setFormData({ title: '', description: '', image: '', category: 'NEWS', url: '', external: true })
      setShowForm(false)
      setEditingNews(null)
    } catch (error) {
      console.error('Error saving news:', error)
      alert('Error saving news. Please try again.')
    }
  }

  const handleEdit = (newsItem: NewsArticle) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      image: newsItem.image,
      category: newsItem.category,
      url: newsItem.url || '',
      external: newsItem.external !== false
    })
    setShowForm(true)
  }

  const handleDelete = async (newsId: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return
    if (!db) return

    try {
      await deleteDoc(doc(db, 'news', newsId))
      setNews(news.filter(item => item.id !== newsId))
    } catch (error) {
      console.error('Error deleting news:', error)
      alert('Error deleting news. Please try again.')
    }
  }

  const handleCancel = () => {
    setFormData({ title: '', description: '', image: '', category: 'NEWS', url: '', external: true })
    setShowForm(false)
    setEditingNews(null)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
          <div className="px-8 py-6 border-b border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">News Management</h1>
                <p className="text-blue-200">Manage news articles and media coverage</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="/admin/panel"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-blue-400/30 transition-all font-semibold w-full sm:w-auto text-center"
                >
                  ← Admin Panel
                </Link>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold shadow-lg"
                >
                  Add News Article
                </button>
              </div>
            </div>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
                <form onSubmit={handleSubmit} className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    {editingNews ? 'Edit News Article' : 'Add News Article'}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                        placeholder="Enter news article title..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        📰 This appears as the main headline on news cards and the news page
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-black"
                        placeholder="Enter news article description..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This appears as article preview text on news cards and as content on the news page
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Image</label>
                      <div className="space-y-4">
                        {/* Option 1: Upload Image */}
                        <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200">
                          <div className="text-center">
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
                                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl transition-all font-semibold shadow-lg"
                                >
                                  📤 {formData.image ? 'Change Image' : 'Upload Image'}
                                </button>
                              )}
                            </UploadWidget>
                            <p className="text-sm text-gray-600 mt-2">Or enter image URL below</p>
                          </div>
                        </div>
                        
                        {/* Option 2: Image URL */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Or Image URL</label>
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                            placeholder="https://example.com/image.jpg"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Alternative to upload - paste direct image URL (appears on news cards and homepage)
                          </p>
                        </div>
                        
                        {/* Image Preview */}
                        {formData.image ? (
                          <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                            <Image
                              src={formData.image}
                              alt="Preview"
                              width={300}
                              height={180}
                              className="rounded-xl object-cover border-2 border-gray-200 w-full max-w-xs"
                            />
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-8 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500">
                            <div className="text-4xl mb-2">🖼️</div>
                            <p>No image selected</p>
                            <p className="text-sm">Upload an image or enter URL above</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-black"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        📚 Category helps organize news articles and may affect where they appear on the site
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Article URL</label>
                      <input
                        type="url"
                        required
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                        placeholder="https://example.com/article"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        🔗 Where users go when they click "Read More" on the news card (external article, blog post, etc.)
                      </p>
                    </div>



                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="external"
                          checked={formData.external}
                          onChange={(e) => setFormData({ ...formData, external: e.target.checked })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="external" className="ml-3 text-sm font-medium text-blue-800">
                          🔗 External link (opens in new tab)
                        </label>
                      </div>
                      <p className="text-xs text-blue-600 mt-1 ml-7">Check this if the URL leads to an external website</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl transition-all font-semibold shadow-lg flex-1"
                    >
                      {editingNews ? 'Update Article' : 'Create Article'}
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

          {/* News List */}
          <div className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Loading news articles...</p>
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-white mb-2">No news articles found</h3>
                <p className="text-blue-200 mb-6">Start by adding your first news article</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Add First Article
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {news.map((newsItem) => (
                  <div key={newsItem.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      <div className="w-full lg:w-48 h-32 lg:h-24 flex-shrink-0">
                        {newsItem.image ? (
                          <Image
                            src={newsItem.image}
                            alt={newsItem.title}
                            width={192}
                            height={128}
                            className="w-full h-full object-cover rounded-xl border border-white/20"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 rounded-xl border border-white/20 flex items-center justify-center">
                            <span className="text-white/50 text-2xl">📰</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                          <div className="flex-grow">
                            {/* Category Badge */}
                            <div className="mb-3">
                              <span className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                                {newsItem.category}
                              </span>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight">{newsItem.title}</h3>
                            
                            {/* Description */}
                            <p className="text-blue-100 text-sm leading-relaxed mb-4 line-clamp-2">{newsItem.description}</p>
                            
                            {/* Metadata */}
                            <div className="flex flex-wrap gap-4 text-xs text-blue-300">
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>

                              </span>
                              {newsItem.external && (
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                  External Link
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                  View Article →
                                </a>
                              </span>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-3 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(newsItem)}
                              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-blue-600/30"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(newsItem.id)}
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