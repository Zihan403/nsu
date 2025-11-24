'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '../../lib/firebaseConfig'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nsuId, setNsuId] = useState('')
  const [major, setMajor] = useState('')
  const [countryCode, setCountryCode] = useState('+61')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  })
  
  const { signIn, signUp, signInWithGoogle, user, loading: authLoading } = useAuth()
  const router = useRouter()

  // Password strength checker
  useEffect(() => {
    if (!isSignUp) return

    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
    
    setPasswordRequirements(requirements)
    
    // Calculate strength (0-100)
    const metRequirements = Object.values(requirements).filter(Boolean).length
    setPasswordStrength((metRequirements / 5) * 100)
  }, [password, isSignUp])

  useEffect(() => {
    // Only redirect VERIFIED users to dashboard
    // Don't redirect during signup or if email not verified
    console.log('Login useEffect:', { user: !!user, authLoading, emailVerified: user?.emailVerified, isSignUp })
    
    if (user && !authLoading && user.emailVerified && !isSignUp) {
      console.log('Redirecting to dashboard...')
      router.push('/dashboard')
    } else if (user && !authLoading && !user.emailVerified) {
      // If user is logged in but not verified, send to verification page
      console.log('Redirecting to verify-account...')
      router.push('/verify-account')
    }
  }, [user, authLoading, router, isSignUp])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        // Validate all required fields
        if (!firstName.trim()) {
          setError('First name is required')
          setLoading(false)
          return
        }
        
        if (!lastName.trim()) {
          setError('Last name is required')
          setLoading(false)
          return
        }
        
        if (!email.trim()) {
          setError('Email is required')
          setLoading(false)
          return
        }
        
        if (!nsuId.trim()) {
          setError('NSU ID is required')
          setLoading(false)
          return
        }
        
        // Validate NSU ID format (must be numbers)
        if (!/^\d+$/.test(nsuId)) {
          setError('NSU ID must contain only numbers')
          setLoading(false)
          return
        }
        
        if (nsuId.length < 4) {
          setError('NSU ID must be at least 4 digits')
          setLoading(false)
          return
        }
        
        if (!major.trim()) {
          setError('Major/Field of study is required')
          setLoading(false)
          return
        }
        
        if (!phoneNumber.trim()) {
          setError('Phone number is required')
          setLoading(false)
          return
        }
        
        // Validate password strength
        if (!passwordRequirements.minLength) {
          setError('Password must be at least 8 characters long')
          setLoading(false)
          return
        }
        
        if (!passwordRequirements.hasUpperCase) {
          setError('Password must contain at least one uppercase letter')
          setLoading(false)
          return
        }
        
        if (!passwordRequirements.hasLowerCase) {
          setError('Password must contain at least one lowercase letter')
          setLoading(false)
          return
        }
        
        if (!passwordRequirements.hasNumber) {
          setError('Password must contain at least one number')
          setLoading(false)
          return
        }
        
        if (!passwordRequirements.hasSpecialChar) {
          setError('Password must contain at least one special character')
          setLoading(false)
          return
        }
        
        // Combine country code and phone number
        const fullPhoneNumber = `${countryCode}${phoneNumber}`.replace(/\s+/g, '')
        
        // Generate member ID: lastName + last 4 digits of NSU ID
        const memberId = `${lastName.toUpperCase()}${nsuId.slice(-4)}`
        
        try {
          await signUp(email, password, {
            firstName,
            lastName,
            displayName: `${firstName} ${lastName}`,
            nsuId,
            memberId,
            major,
            phoneNumber: fullPhoneNumber
          })
          
          // Successfully signed up - navigate immediately
          window.location.href = '/verify-account'
        } catch (signUpError: any) {
          setError(signUpError.message)
          setLoading(false)
        }
      } else {
        // Sign In flow
        try {
          console.log('Attempting sign in...')
          await signIn(email, password)
          if (auth?.currentUser) {
            console.log('Sign in successful, user object:', auth.currentUser)
          }
          // Don't set loading to false - let useEffect handle redirect
          // The useEffect will check user.emailVerified and redirect appropriately
        } catch (signInError: any) {
          console.error('Sign in error:', signInError)
          setError(signInError.message || 'Failed to sign in. Please check your credentials.')
          setLoading(false)
        }
      }
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    
    try {
      await signInWithGoogle()
    } catch (err: any) {
      setError(err.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Form */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Join NSU Alumni' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {isSignUp ? 'Create your account to connect with alumni' : 'Sign in to access your alumni network'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
                required
                minLength={isSignUp ? 8 : 6}
              />
              
              {/* Password Strength Indicator - Only show during sign up */}
              {isSignUp && password.length > 0 && (
                <div className="mt-3">
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Password Strength</span>
                      <span className={`text-xs font-semibold ${
                        passwordStrength < 40 ? 'text-red-600' :
                        passwordStrength < 80 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength < 40 ? 'Weak' :
                         passwordStrength < 80 ? 'Medium' :
                         'Strong'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength < 40 ? 'bg-red-500' :
                          passwordStrength < 80 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Requirements Checklist */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700 mb-1">Password must contain:</p>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={passwordRequirements.minLength ? 'text-green-600' : 'text-gray-400'}>
                          {passwordRequirements.minLength ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.minLength ? 'text-green-700' : 'text-gray-600'}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={passwordRequirements.hasUpperCase ? 'text-green-600' : 'text-gray-400'}>
                          {passwordRequirements.hasUpperCase ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.hasUpperCase ? 'text-green-700' : 'text-gray-600'}>
                          One uppercase letter (A-Z)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={passwordRequirements.hasLowerCase ? 'text-green-600' : 'text-gray-400'}>
                          {passwordRequirements.hasLowerCase ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.hasLowerCase ? 'text-green-700' : 'text-gray-600'}>
                          One lowercase letter (a-z)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-400'}>
                          {passwordRequirements.hasNumber ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.hasNumber ? 'text-green-700' : 'text-gray-600'}>
                          One number (0-9)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={passwordRequirements.hasSpecialChar ? 'text-green-600' : 'text-gray-400'}>
                          {passwordRequirements.hasSpecialChar ? '✓' : '○'}
                        </span>
                        <span className={passwordRequirements.hasSpecialChar ? 'text-green-700' : 'text-gray-600'}>
                          One special character (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NSU ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nsuId}
                    onChange={(e) => setNsuId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="e.g. 2011012345"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Major <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    required
                  >
                    <option value="">Select major</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Economics">Economics</option>
                    <option value="English">English</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Law">Law</option>
                  </select>
                </div>
              </div>
            )}

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 w-24"
                    required
                  >
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+64">+64 (NZ)</option>
                    <option value="+91">+91 (India)</option>
                    <option value="+880">+880 (Bangladesh)</option>
                    <option value="+86">+86 (China)</option>
                    <option value="+81">+81 (Japan)</option>
                    <option value="+82">+82 (Korea)</option>
                    <option value="+66">+66 (Thailand)</option>
                    <option value="+60">+60 (Malaysia)</option>
                    <option value="+65">+65 (Singapore)</option>
                    <option value="+62">+62 (Indonesia)</option>
                    <option value="+63">+63 (Philippines)</option>
                    <option value="+84">+84 (Vietnam)</option>
                    <option value="+33">+33 (France)</option>
                    <option value="+49">+49 (Germany)</option>
                    <option value="+39">+39 (Italy)</option>
                    <option value="+34">+34 (Spain)</option>
                    <option value="+31">+31 (Netherlands)</option>
                    <option value="+45">+45 (Denmark)</option>
                    <option value="+46">+46 (Sweden)</option>
                    <option value="+47">+47 (Norway)</option>
                    <option value="+41">+41 (Switzerland)</option>
                    <option value="+43">+43 (Austria)</option>
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="412345678"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter number without country code (e.g., 412345678)</p>
              </div>
            )}

            {!isSignUp && (
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account & Send Verification' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6">
            <div className="text-center text-gray-500 mb-4">Or continue with</div>
            
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 py-3 rounded-lg font-medium text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* reCAPTCHA container (hidden) */}
      <div id="recaptcha-container"></div>
    </div>
  )
}
