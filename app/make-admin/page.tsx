'use client'

import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import { useAuth } from '@/contexts/AuthContext'

export default function MakeAdminPage() {
  const { user } = useAuth()
  const [status, setStatus] = useState('Checking...')

  useEffect(() => {
    const makeAdmin = async () => {
      if (!user) {
        setStatus('❌ Not logged in')
        return
      }

      const adminEmails = ['melbournensuers@gmail.com', 'zihansarowar403@gmail.com']
      
      if (!adminEmails.includes(user.email || '')) {
        setStatus('❌ Not authorized')
        return
      }

      if (!db) {
        setStatus('❌ Firebase not initialized')
        return
      }

      try {
        await updateDoc(doc(db, 'users', user.uid), {
          isAdmin: true
        })
        setStatus('✅ Admin access granted! Go to /admin/panel')
      } catch (error: any) {
        setStatus(`❌ Error: ${error.message}`)
      }
    }

    makeAdmin()
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Make Admin</h1>
        <p className="text-lg">{status}</p>
        {status.includes('✅') && (
          <a href="/admin/panel" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Admin Panel
          </a>
        )}
      </div>
    </div>
  )
}
