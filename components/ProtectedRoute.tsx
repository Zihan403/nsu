'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
      } else if (!user.emailVerified) {
        router.push('/verify-account')
      }
    }
  }, [user, loading, router, redirectTo])

  // Show content immediately if user is verified, otherwise show nothing (will redirect)
  if (loading || !user || !user.emailVerified) {
    return null
  }

  return <>{children}</>
}