'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../../../lib/firebaseConfig'
import { useAuth } from '../../../contexts/AuthContext'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Link from 'next/link'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  status: 'unread' | 'read' | 'replied'
}

export default function AdminMessages() {
  const { user, userProfile } = useAuth()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [filterStatus, setFilterStatus] = useState('')

  // Check if current user is admin
  const isAdmin = userProfile?.email === 'melbournensuers@gmail.com' || 
                  userProfile?.email === 'zihansarowar403@gmail.com' || 
                  userProfile?.isAdmin === true

  useEffect(() => {
    if (!isAdmin) return

    const fetchMessages = async () => {
      if (!db) {
        console.error('Firebase not initialized')
        setLoading(false)
        return
      }

      try {
        const messagesRef = collection(db, 'contactMessages')
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(messagesQuery)
        const messagesData: ContactMessage[] = []
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          messagesData.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            createdAt: data.createdAt?.toDate() || new Date(),
            status: data.status || 'unread'
          })
        })
        
        setMessages(messagesData)
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [isAdmin])

  const updateMessageStatus = async (id: string, newStatus: 'unread' | 'read' | 'replied') => {
    if (!db) return
    try {
      await updateDoc(doc(db, 'contactMessages', id), {
        status: newStatus
      })
      
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, status: newStatus } : msg
      ))
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!db || !confirm('Are you sure you want to delete this message?')) return
    
    try {
      await deleteDoc(doc(db, 'contactMessages', id))
      setMessages(prev => prev.filter(msg => msg.id !== id))
      setSelectedMessage(null)
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (message.status === 'unread') {
      updateMessageStatus(message.id, 'read')
    }
  }

  const filteredMessages = filterStatus
    ? messages.filter(msg => msg.status === filterStatus)
    : messages

  const unreadCount = messages.filter(msg => msg.status === 'unread').length

  if (!isAdmin) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-blue-100">You don't have permission to access this page.</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
                <p className="text-blue-100 mt-1">
                  {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
              <Link
                href="/admin/panel"
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Admin Panel
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Messages List */}
              <div className="lg:col-span-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-100 mb-2">Filter by Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <p className="text-blue-100 text-center py-8">No messages found</p>
                  ) : (
                    filteredMessages.map((message) => (
                      <button
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`w-full text-left p-4 rounded-lg transition-all ${
                          selectedMessage?.id === message.id
                            ? 'bg-white/20 border border-white/30'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-white truncate flex-1">{message.name}</h3>
                          {message.status === 'unread' && (
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                          )}
                        </div>
                        <p className="text-sm text-blue-200 mb-1">{message.subject}</p>
                        <p className="text-xs text-blue-100">
                          {message.createdAt.toLocaleDateString()} {message.createdAt.toLocaleTimeString()}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Message Details */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                {selectedMessage ? (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.subject}</h2>
                        <div className="flex items-center gap-4 text-sm text-blue-100">
                          <span>From: {selectedMessage.name}</span>
                          <span>•</span>
                          <a href={`mailto:${selectedMessage.email}`} className="text-blue-300 hover:text-blue-200">
                            {selectedMessage.email}
                          </a>
                        </div>
                        <p className="text-xs text-blue-200 mt-1">
                          {selectedMessage.createdAt.toLocaleDateString()} at {selectedMessage.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={selectedMessage.status}
                          onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value as 'unread' | 'read' | 'replied')}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button
                          onClick={() => deleteMessage(selectedMessage.id)}
                          className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-sm transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
                      <h3 className="text-sm font-semibold text-blue-200 mb-3">Message:</h3>
                      <p className="text-white whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all text-center"
                      >
                        Reply via Email
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedMessage.email)
                          alert('Email copied to clipboard!')
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                      >
                        Copy Email
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full py-20 text-blue-100">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg">Select a message to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
