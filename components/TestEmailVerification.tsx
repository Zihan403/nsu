'use client'

import { useState } from 'react'
import { auth } from '../lib/firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification, deleteUser } from 'firebase/auth'

export default function TestEmailVerification() {
  const [testEmail, setTestEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')

  const testEmailSending = async () => {
    if (!testEmail) {
      setResult('Please enter an email address')
      return
    }

    if (!auth) {
      setResult('Firebase auth not initialized')
      return
    }

    setIsLoading(true)
    setResult('Testing...')

    try {
      // Create a temporary user
      const tempPassword = 'tempPassword123'
      const userCredential = await createUserWithEmailAndPassword(auth, testEmail, tempPassword)
      const user = userCredential.user

      console.log('Temporary user created:', user.uid)

      // Try to send verification email
      await sendEmailVerification(user)
      
      // Delete the temporary user
      await deleteUser(user)

      setResult('✅ SUCCESS: Verification email sent! Check your inbox (and spam folder)')
      console.log('Email verification test successful')
    } catch (error: any) {
      console.error('Email verification test failed:', error)
      setResult(`❌ ERROR: ${error.message}`)
    }

    setIsLoading(false)
  }

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="text-sm font-semibold mb-2 text-gray-800">Test Email Verification</h3>
      <input
        type="email"
        value={testEmail}
        onChange={(e) => setTestEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full text-xs p-2 border border-gray-300 rounded mb-2 text-gray-800"
      />
      <button
        onClick={testEmailSending}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white text-xs py-2 px-3 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Email Verification'}
      </button>
      {result && (
        <div className={`mt-2 text-xs p-2 rounded ${
          result.includes('SUCCESS') 
            ? 'bg-green-100 text-green-800' 
            : result.includes('ERROR')
            ? 'bg-red-100 text-red-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {result}
        </div>
      )}
    </div>
  )
}