# Dual Verification System - Email & SMS

## Overview

Users can now choose between **Email** or **SMS verification** during signup. Once verified through either method, they gain access to the dashboard.

---

## User Flow

### Signup Flow
1. User fills signup form with:
   - Full Name
   - Email
   - Password
   - NSU ID (optional)
   - Major (optional)
   - **Phone Number (optional)** ← NEW
2. Click "Create Account & Send Verification"
3. Account created in Firebase
4. Redirects to **`/verify-account`** page

### Verification Page
Users see two verification options:

#### Option 1: Email Verification ✉️
- Click "Email Verification" button
- Firebase sends verification email with clickable link
- User clicks link in email to verify
- User returns to verification page and clicks "I've Verified My Email"
- System checks verification status and redirects to dashboard

#### Option 2: SMS Verification 📱
- Click "SMS Verification" button (only if phone number provided)
- Firebase sends 6-digit code via SMS
- User enters code in verification form
- System validates code
- If valid, marks as verified and redirects to dashboard

---

## Technical Implementation

### New Files Created

1. **`app/verify-account/page.tsx`**
   - Unified verification interface
   - Supports both email and SMS methods
   - Real-time method selection
   - Code expiry tracking

2. **`app/api/user/[uid]/route.ts`**
   - GET endpoint to fetch user profile data
   - Used to retrieve phone number for SMS verification

3. **`app/api/user/verify/route.ts`**
   - POST endpoint to update verification status
   - Records which method was used (email/sms)
   - Tracks verification timestamp

### Updated Files

1. **`app/login/page.tsx`**
   - Added `phoneNumber` state
   - Phone input field in signup form
   - Passes phone number to signup function
   - Redirects to `/verify-account` after signup

2. **`contexts/AuthContext.tsx`**
   - Added `sendSMSVerification()` method
   - Added `verifySMSCode()` method
   - Phone number stored in user profile
   - Updated context value exports

---

## Key Features

✅ **User Choice** - Users pick their preferred verification method
✅ **Firebase Native** - Both methods use Firebase authentication
✅ **Optional Phone** - Phone number is optional for signup
✅ **Fallback Option** - Users can switch between methods on verification page
✅ **Code Expiry** - SMS codes expire in 10 minutes, email links in 1 hour
✅ **Resend Functionality** - Users can request new codes with cooldown
✅ **Phone Update** - If no phone on file, users directed to update profile

---

## Firebase Configuration Required

### SMS Verification Setup

1. Go to **Firebase Console** → Your Project
2. Click **Authentication** → **Settings** → **Phone numbers** tab
3. Enable **Phone authentication**
4. Add test phone numbers (for development):
   - Format: `+61412345678`
   - Use these to test SMS verification

### Email Verification Setup

Firebase email verification is already configured. Optionally customize:
1. Go to **Authentication** → **Templates**
2. Edit **Email address verification** template
3. Customize subject, sender, and HTML content

---

## Testing Guide

### Test Email Verification
1. Sign up with:
   - Email: `test@example.com`
   - Password: `TestPassword123`
   - Leave phone blank
2. On verification page, click "Email Verification"
3. Check Firebase email (or use Firebase Emulator)
4. Click link in email
5. Return to verification page
6. Click "I've Verified My Email"
7. Should redirect to dashboard ✓

### Test SMS Verification
1. Sign up with:
   - Email: `test@example.com`
   - Phone: `+61412345678` (Firebase test number)
   - Other fields as needed
2. On verification page, click "SMS Verification"
3. Should receive SMS code (or see in emulator)
4. Enter 6-digit code
5. Should redirect to dashboard ✓

### Test Switching Methods
1. Choose Email Verification
2. Click "Choose another method"
3. Select SMS Verification
4. Process continues with new method ✓

---

## Security Notes

- Phone numbers are optional but recommended for better security
- Codes are time-limited (SMS: 10 min, Email: 1 hour)
- Resend attempts have cooldowns to prevent spam
- Both methods require Firebase authentication
- User profile stores which method was used for audit purposes

---

## Database Schema

### User Profile Fields (Firestore)
```typescript
{
  uid: string
  email: string
  displayName: string
  phoneNumber?: string        // Optional, from signup
  emailVerified?: boolean
  phoneVerified?: boolean
  verifiedVia?: 'email' | 'sms'  // Which method was used
  verifiedAt?: Date
  membershipTier: 'basic'
  joinedAt: Date
  // ... other fields
}
```

---

## Next Steps

1. ✅ Create test Firebase project if not done
2. ✅ Enable SMS/Phone authentication in Firebase
3. ✅ Add test phone numbers to Firebase
4. ✅ Deploy and test signup flow
5. ✅ Test both verification methods
6. 🔄 Monitor verification success rates
7. 🔄 Collect user feedback

---

## Troubleshooting

### SMS Code Not Received
- Check phone number format: `+61412345678`
- Ensure SMS authentication enabled in Firebase
- Add phone as test number in Firebase Console
- Check SMS logs in Firebase Console

### Email Link Not Working
- Check email spam folder
- Ensure email is correctly configured in Firebase
- Links expire in 1 hour
- Request new link if needed

### User Can't Find Phone Input
- Phone number is only shown on signup form
- Can be added later in profile settings
- If missing, users directed to profile page

---

For questions or issues, refer to Firebase documentation:
- [Firebase Phone Auth](https://firebase.google.com/docs/auth/web/phone-auth)
- [Firebase Email Auth](https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email)
