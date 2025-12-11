'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { onAuthStateChanged, reload } from 'firebase/auth'
import { auth } from '@/lib/firebaseConfig'
import Link from 'next/link'

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const { user, sendEmailVerification } = useAuth()
  const router = useRouter()

  // Check initial user state and redirect if needed
  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (user.emailVerified) {
      setRedirecting(true)
      router.push('/dashboard')
    }
  }, [user, router])

  // Monitor email verification status
  useEffect(() => {
    if (!user || redirecting) return
    
    if (!auth) {
      console.error('Firebase auth not initialized')
      return
    }

    const checkVerification = () => {
      const unsubscribe = onAuthStateChanged(auth!, async (currentUser) => {
        if (currentUser) {
          await reload(currentUser)
          if (currentUser.emailVerified) {
            setSuccess(true)
            setRedirecting(true)
            setTimeout(() => {
              router.push('/dashboard')
            }, 2000)
          }
        }
      })
      return unsubscribe
    }

    const unsubscribe = checkVerification()
    
    // Check every 3 seconds for email verification
    const interval = setInterval(async () => {
      if (user && !redirecting) {
        await reload(user)
        if (user.emailVerified) {
          setSuccess(true)
          setRedirecting(true)
          clearInterval(interval)
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        }
      }
    }, 3000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [user, router, redirecting])

  const handleResendEmail = async () => {
    if (!user) return
    
    setResendLoading(true)
    setError('')

    try {
      await sendEmailVerification()
      setError('') // Clear any previous errors
      alert('✅ Verification email sent successfully!\n\n📧 Please check your inbox AND spam/junk folder.\n\nIf you find it in spam, mark it as "Not Spam".')
    } catch (error: any) {
      setError('Failed to send verification email. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }

  const handleRefreshStatus = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      await reload(user)
      if (user.emailVerified) {
        setSuccess(true)
        setRedirecting(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError('Email not verified yet. Please check your inbox.')
      }
    } catch (error) {
      setError('Failed to check verification status.')
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while redirecting
  if (redirecting || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. Redirecting to dashboard...
            </p>
          </div>
          
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h1>
          <p className="text-gray-600 mb-4">
            We've sent a verification link to <strong>{user?.email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Click the link in the email to verify your account. This page will automatically update when verified.
          </p>
          
          {/* Spam Folder Notice */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-yellow-800 mb-1">Can't find the verification email?</p>
                <p className="text-sm text-yellow-700">
                  <strong>Please check your spam/junk folder!</strong> Verification emails sometimes get filtered. 
                  If you find it there, mark it as "Not Spam" to receive future emails.
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleRefreshStatus}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'I\'ve verified my email'}
          </button>
          
          <button
            onClick={handleResendEmail}
            disabled={resendLoading}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            {resendLoading ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Didn't receive the email? Check your spam folder.</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Sign In
          </Link>
        </div>
        
        {/* Auto-refresh indicator */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center text-xs text-gray-500">
            <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Auto-checking verification status...
          </div>
        </div>
      </div>
    </div>
  )
}
