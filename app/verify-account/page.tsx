'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '../../lib/firebaseConfig'

function VerifyAccountContent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, sendEmailVerification } = useAuth()
  const router = useRouter()

  // Auto-check verification status when page loads
  useEffect(() => {
    const checkVerification = async () => {
      if (!user) {
        router.push('/login')
        return
      }

      // Reload user to get latest email verification status
      await user.reload()
      
      if (user.emailVerified) {
        // Email is verified! Redirect immediately
        router.push('/dashboard')
      }
    }

    checkVerification()

    // Also check every 2 seconds in case they verify in another tab
    const interval = setInterval(checkVerification, 2000)
    
    return () => clearInterval(interval)
  }, [user, router])

  const handleSendEmailVerification = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await sendEmailVerification()
      setSuccess('✓ Verification email sent! Check your inbox and click the link.')
      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email')
      setLoading(false)
    }
  }

  const handleCheckVerification = async () => {
    setLoading(true)
    setError('')
    try {
      if (user) {
        await user.reload()
        if (user.emailVerified) {
          setSuccess('✓ Email verified successfully!')
          router.push('/dashboard')
        } else {
          setError('Email not verified yet. Please check your inbox and click the verification link.')
          setLoading(false)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error checking verification status')
      setLoading(false)
    }
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
            <p className="text-gray-600 text-sm">
              We sent a verification link to your email address
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Verification Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <p className="text-blue-900 text-sm">
              <strong>Next steps:</strong>
            </p>
            <ol className="text-blue-800 text-sm mt-2 space-y-1 ml-4 list-decimal">
              <li>Check your email inbox for a verification link</li>
              <li>Click the link to verify your account</li>
              <li>You'll be automatically redirected once verified</li>
            </ol>
            <p className="text-blue-700 text-xs mt-3 font-medium">
              💡 After clicking the email link, this page will automatically detect verification and redirect you to the dashboard.
            </p>
          </div>

          {/* Main Action Button */}
          <button
            onClick={handleCheckVerification}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 mb-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Checking...
              </span>
            ) : (
              'Check Verification Status'
            )}
          </button>

          {/* Resend Email Button */}
          <button
            onClick={handleSendEmailVerification}
            disabled={loading}
            className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all"
          >
            Resend Verification Email
          </button>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyAccount() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyAccountContent />
    </Suspense>
  )
}
