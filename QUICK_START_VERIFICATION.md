# Quick Setup - Email + SMS Verification

## What Changed?

✅ **Signup form** now has optional phone number field
✅ **New verification page** at `/verify-account` with both options
✅ Users can choose: **Email verification** OR **SMS verification**
✅ Both redirect to dashboard after successful verification

---

## Enable SMS Verification in Firebase (5 minutes)

### Step 1: Enable Phone Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **nsu-alumni-5685b** project
3. Click **Authentication** (left menu)
4. Click **Settings** (top)
5. Find **"Phone numbers"** section
6. Click **ENABLE** on phone authentication

### Step 2: Add Test Numbers (for development)
1. While in Authentication Settings
2. Scroll to **"Phone numbers"** section
3. Click **Add Test Number**
4. Enter: `+61412345678`
5. Generate a test OTP (Firebase will show you)
6. Repeat for more test numbers if needed

### Step 3: Done! 🎉
SMS verification is now enabled!

---

## Test It

### Test Email Verification
1. Go to `http://localhost:3000/login`
2. Click "Sign up" tab
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPass123
   - NSU ID: 2011012345
   - Major: Computer Science
   - Phone: (optional) +61412345678
4. Click "Create Account & Send Verification"
5. You're sent to verification page
6. Click "Email Verification"
7. Check your email inbox (or Firebase Emulator console)
8. Click the verification link in the email
9. Return to verification page
10. Click "I've Verified My Email"
11. ✅ Redirects to dashboard!

### Test SMS Verification
1. Repeat steps 1-4 above with phone: `+61412345678`
2. On verification page, click "SMS Verification"
3. You get SMS with code (or see in Firebase logs)
4. Enter the 6-digit code
5. Click "Verify Code"
6. ✅ Redirects to dashboard!

### Test Switching Methods
1. On verification page
2. Start with Email
3. Click "Choose another method"
4. Switch to SMS
5. ✅ Both methods work independently!

---

## Key Features

| Feature | Email | SMS |
|---------|-------|-----|
| Time limit | 1 hour | 10 minutes |
| Resend cooldown | 5 min | 5 min |
| Format | Click link | Enter code |
| Requires phone? | ❌ No | ✅ Yes |
| User choice | ✅ Yes | ✅ Yes |
| Firebase native | ✅ Yes | ✅ Yes |

---

## Files Added/Modified

**New Files:**
- `app/verify-account/page.tsx` - Verification interface
- `app/api/user/[uid]/route.ts` - Get user data
- `app/api/user/verify/route.ts` - Update verification status

**Modified Files:**
- `app/login/page.tsx` - Added phone field, redirect to verify page
- `contexts/AuthContext.tsx` - Added SMS methods

---

## Phone Number Field

**Signup form now shows:**
```
Name           [____________]
Email          [____________]
Password       [____________]
NSU ID         [_____]  Major [____]
Phone (NEW!)   [____________]  <- Optional, format: +61412345678
```

---

## Dashboard Access

After signup:
1. User is on `/verify-account` page
2. Must choose verification method
3. Completes verification (click email link or enter SMS code)
4. **Automatically redirects to `/dashboard`** ✅

---

## Common Questions

**Q: Is phone number required?**
A: No, it's optional. But SMS verification won't work without it.

**Q: Can users add phone number later?**
A: Yes, in `/profile/settings`

**Q: What if user forgets which method they chose?**
A: They can switch methods on verification page!

**Q: Do emails/SMS codes work?**
A: Yes, Firebase handles them all natively.

**Q: How long do codes last?**
A: Email links: 1 hour, SMS codes: 10 minutes

---

## Troubleshooting

❌ **SMS Code Not Received**
- Did you enable phone auth in Firebase? ✓
- Did you add test phone number? ✓
- Format correct? `+61412345678` ✓

❌ **Email Link Not Working**
- Did you check spam folder? ✓
- Did you click the verification link? ✓
- Is it within 1 hour? ✓

❌ **Can't See Phone Input**
- Only shows during signup
- Can add phone later in profile settings

---

## Next: Test the Full Flow

1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Try signup with email + SMS
4. Verify both methods work
5. Check dashboard loads correctly

**Everything should work automatically!** 🚀

Questions? Check `DUAL_VERIFICATION_SETUP.md` for detailed info.
