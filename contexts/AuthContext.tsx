'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  reload,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebaseConfig'

interface UserProfile {
  uid: string
  email: string
  displayName: string
  firstName?: string
  lastName?: string
  memberId?: string
  photoURL?: string
  nsuId?: string
  major?: string
  address?: string
  currentJob?: string
  company?: string
  location?: string
  membershipTier?: 'basic' | 'premium' | 'lifetime'
  joinedAt: Date
  phoneNumber?: string
  emailVerified?: boolean
  isAdmin?: boolean
  eventsJoined?: number
  connections?: number
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, additionalInfo?: Partial<UserProfile>) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>
  sendEmailVerification: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) {
      console.warn('Firebase database not initialized during AuthContext setup')
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth!, async (user) => {
      try {
        if (user) {
          setUser(user)
          // Fetch user profile from Firestore with retry logic
          let retries = 3
          let profileFetched = false
          
          while (retries > 0 && !profileFetched) {
            try {
              const profileDoc = await getDoc(doc(db!, 'users', user.uid))
              if (profileDoc.exists()) {
                const profileData = profileDoc.data() as UserProfile
                console.log('Profile fetched from Firestore:', profileData)
                setUserProfile(profileData)
                profileFetched = true
              } else {
                // Create profile if it doesn't exist
                const newProfile: any = {
                  uid: user.uid,
                  email: user.email!,
                  displayName: user.displayName || user.email!.split('@')[0],
                  membershipTier: 'basic',
                  joinedAt: new Date()
                }

                // Only add photoURL if it exists
                if (user.photoURL) {
                  newProfile.photoURL = user.photoURL
                }

                // Remove any undefined values
                Object.keys(newProfile).forEach(key => {
                  if (newProfile[key] === undefined) {
                    delete newProfile[key]
                  }
                })

                console.log('Creating default profile in Firestore:', newProfile)
                await setDoc(doc(db!, 'users', user.uid), newProfile)
                setUserProfile(newProfile)
                profileFetched = true
              }
            } catch (firestoreError: any) {
              const errorCode = firestoreError?.code || 'UNKNOWN'
              const errorMsg = firestoreError?.message || 'Unknown error'
              
              // Provide helpful error messages
              let helpText = ''
              if (errorCode === 'OFFLINE') {
                helpText = ' (No internet or Firestore unreachable - check Firebase Console)'
              } else if (errorCode === 'PERMISSION_DENIED') {
                helpText = ' (Check Firestore Security Rules - may be too restrictive)'
              } else if (errorCode === 'UNAUTHENTICATED') {
                helpText = ' (User not authenticated)'
              }
              
              console.error(`❌ Error fetching user profile (attempt ${4 - retries}/3): ${errorCode}${helpText}`, firestoreError)
              retries--
              
              if (retries > 0) {
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)))
              } else {
                // If all retries fail, create a minimal profile from auth user
                console.warn('⚠️ Using fallback profile data due to connection issues')
                console.warn('📋 Suggestion: Check Firebase Console Firestore Database status and Security Rules')
                setUserProfile({
                  uid: user.uid,
                  email: user.email!,
                  displayName: user.displayName || user.email!.split('@')[0],
                  membershipTier: 'basic',
                  joinedAt: new Date()
                })
              }
            }
          }
        } else {
          setUser(null)
          setUserProfile(null)
        }
      } catch (error) {
        console.error('Error in auth state change:', error)
      } finally {
        // Always set loading to false, even if there's an error
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase auth not initialized')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Don't check email verification here - let ProtectedRoute handle redirects
      // This allows users to sign in and be redirected to /verify-account if needed
    } catch (error: any) {
      // Handle MFA required error
      if (error.code === 'auth/multi-factor-auth-required') {
        throw error // Let the component handle MFA resolution
      }
      throw error
    }
  }

  const signUp = async (email: string, password: string, additionalInfo?: Partial<UserProfile>) => {
    if (!db) throw new Error('Firebase database not initialized')
    if (!auth) throw new Error('Firebase auth not initialized')
    
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user

    // Create user profile in Firestore with all fields explicitly
    const userProfile: any = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || email.split('@')[0],
      membershipTier: 'basic',
      joinedAt: new Date(),
      emailVerified: false, // Mark as not verified initially
      // Ensure all fields from additionalInfo are included
      firstName: additionalInfo?.firstName || '',
      lastName: additionalInfo?.lastName || '',
      nsuId: additionalInfo?.nsuId || '',
      memberId: additionalInfo?.memberId || '',
      major: additionalInfo?.major || '',
      phoneNumber: additionalInfo?.phoneNumber || '',
      // Spread any other additional info
      ...additionalInfo
    }

    // Only add photoURL if it exists
    if (user.photoURL) {
      userProfile.photoURL = user.photoURL
    }

    // Remove any undefined or empty string values (but keep explicit empties from signup)
    Object.keys(userProfile).forEach(key => {
      if (userProfile[key] === undefined) {
        delete userProfile[key]
      }
    })

    // Log what we're saving (for debugging)
    console.log('Creating user profile in Firestore:', userProfile)

    await setDoc(doc(db!, 'users', user.uid), userProfile)
    
    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName: userProfile.displayName
    })

    // Send Firebase email verification
    await sendEmailVerification(user)
    
    // DON'T sign out - let them stay logged in to see verification page
    // They won't be able to access protected routes until verified
  }

  const signInWithGoogle = async () => {
    if (!db) throw new Error('Firebase database not initialized')
    if (!auth) throw new Error('Firebase auth not initialized')
    
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if user profile exists, if not create it
    const profileDoc = await getDoc(doc(db!, 'users', user.uid))
    if (!profileDoc.exists()) {
      const userProfile: any = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || user.email!.split('@')[0],
        membershipTier: 'basic',
        joinedAt: new Date(),
        emailVerified: user.emailVerified
      }

      // Only add photoURL if it exists
      if (user.photoURL) {
        userProfile.photoURL = user.photoURL
      }

      // Remove any undefined values
      Object.keys(userProfile).forEach(key => {
        if (userProfile[key] === undefined) {
          delete userProfile[key]
        }
      })

      await setDoc(doc(db!, 'users', user.uid), userProfile)
    }
  }

  const logOut = async () => {
    if (!auth) throw new Error('Firebase auth not initialized')
    await signOut(auth)
  }

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    console.log('📤 updateUserProfile called with:', data)
    if (!user) throw new Error('No user logged in')
    if (!db) throw new Error('Firebase database not initialized')
    
    try {
      // Try to update with retry logic
      let retries = 3
      let updated = false
      
      while (retries > 0 && !updated) {
        try {
          console.log(`🔄 Attempt ${4 - retries}/3: Writing to Firestore for user ${user.uid}`)
          // Merge with existing data
          await setDoc(doc(db!, 'users', user.uid), data, { merge: true })
          console.log('✅ Write successful')
          
          // Fetch fresh data from Firestore to ensure we have the latest
          console.log('🔍 Fetching fresh profile data...')
          const freshDoc = await getDoc(doc(db!, 'users', user.uid))
          if (freshDoc.exists()) {
            const freshData = freshDoc.data() as UserProfile
            console.log('📦 Fresh profile fetched:', freshData)
            setUserProfile(freshData)
          }
          
          updated = true
          console.log('🎉 Profile update completed successfully')
        } catch (error: any) {
          console.error(`❌ Error updating profile (attempt ${4 - retries}/3):`, error)
          retries--
          
          if (retries > 0) {
            const delay = 1000 * (4 - retries)
            console.log(`⏳ Retrying in ${delay}ms...`)
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, delay))
          } else {
            throw new Error('Failed to update profile. Please check your internet connection and try again.')
          }
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const sendEmailVerificationFunc = async () => {
    if (!user) throw new Error('No user logged in')
    await sendEmailVerification(user)
  }

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut: logOut,
    updateUserProfile,
    sendEmailVerification: sendEmailVerificationFunc
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}