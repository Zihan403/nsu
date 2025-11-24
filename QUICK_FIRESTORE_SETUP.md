# ⚡ Quick Database Setup (5 minutes)

## Problem
Your Firestore database is empty because:
- ✅ Database exists
- ✅ Your app knows where to write data
- ❌ No collections exist yet (created when first data is added)
- ❌ No security rules defined yet

## Solution: 2 Steps to Get Running

### Step 1: Set Firebase Security Rules (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **nsu-alumni-5685b**
3. Click **Firestore Database** (left menu)
4. Click **Rules** tab at top
5. **Replace everything** with this code:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Anyone logged in can read all users (for directory)
    match /users/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

6. Click **Publish** button (orange button at bottom right)
7. Wait 30 seconds for rules to activate

### Step 2: Create Your First User (3 minutes)

**Option A: Through the App (Recommended)**

1. Go to `http://localhost:3000` (your app)
2. Click **"Join Us"** button
3. Fill signup form:
   - Email: `test@alumni.nsu.edu.au`
   - Password: `TestPassword123!`
   - First Name: `Test`
   - Last Name: `User`
   - NSU ID: `10001`
   - Major: `Computer Science`
   - Phone: `+61412345678`
4. Click **"Sign Up"**
5. **Check your email** for verification link (check spam!)
6. Click the verification link
7. Go back to app and log in
8. You're done! ✅

**Option B: In Firebase Console (If you have existing auth users)**

If you already have users created but not in Firestore:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Authentication** (left menu)
3. Click **Users** tab
4. Copy the **UID** of your user
5. Click **Firestore Database** (left menu)
6. Click **"+ Start collection"** button
7. Collection ID: `users` → Click Next
8. Document ID: Paste the UID you copied → Click Auto ID, then paste UID
9. Add these fields:
   - `uid`: (paste same UID)
   - `email`: (your email)
   - `displayName`: (your name)
   - `emailVerified`: `true`
   - `membershipTier`: `basic`
   - `joinedAt`: Click timestamp icon, use today's date
10. Click **Save**

---

## Verify It Works

After completing steps above:

1. Refresh your app: **F5** or **Ctrl+R**
2. Go to `/dashboard`
3. **Edit Profile** - make any change
4. Click **"Save Changes"**
5. Should see: ✅ "Profile updated successfully!"
6. Go back to dashboard - see your changes? ✅

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Permission denied" | Run Step 1 again - rules might not have published |
| "Client is offline" | Check `.env.local` has correct Firebase keys |
| Can't verify email | Check spam folder or use app without verification (development only) |
| Changes don't save | Hard refresh: **Ctrl+Shift+R** (or Cmd+Shift+R) |
| Data visible in Firebase but not app | Restart app: Stop `npm run dev`, run again |

---

## Next: Add More Users

Repeat Step 2 for each person who needs to join!

Your app will automatically:
- ✅ Create their Firestore document
- ✅ Store their profile photo
- ✅ Track their updates
- ✅ Generate their member ID

