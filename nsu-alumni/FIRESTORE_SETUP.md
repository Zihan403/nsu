# Firestore Database Setup Guide

## Your App's Database Structure

Your NSU Alumni app expects the following Firestore structure:

```
Firestore Database (root)
└── users/ (collection)
    └── {uid} (document - one for each user)
        ├── uid: string (user's Firebase Auth UID)
        ├── email: string
        ├── emailVerified: boolean
        ├── displayName: string
        ├── firstName: string (optional)
        ├── lastName: string (optional)
        ├── photoURL: string (optional)
        ├── phoneNumber: string (optional)
        ├── nsuId: string (optional - NSU ID number)
        ├── memberId: string (optional - generated member ID)
        ├── major: string (optional - study major)
        ├── address: string (optional - formatted address)
        ├── membershipTier: string ('basic' | 'premium' | 'lifetime')
        ├── joinedAt: timestamp
        ├── eventsJoined: number (optional)
        ├── connections: number (optional)
        └── isAdmin: boolean (optional)
```

---

## Why Your Database is Empty

When you created your Firestore database, it started **completely empty** (no collections). 

Your app is designed to **automatically create the user document** when someone signs up, but:
- ❌ No users have signed up yet
- ❌ The collections only get created when the first document is added

---

## How to Set Up Your Database

### Option 1: Create Your First User via App (Recommended)

**Steps:**

1. Go to your app at `http://localhost:3000` (or your deployment URL)
2. Click **"Join Us"** (or go to `/login`)
3. Click **"Sign Up"**
4. Fill in the signup form:
   - Email: `test@example.com`
   - Password: `TestPassword123!`
   - First Name: `John`
   - Last Name: `Doe`
   - NSU ID: `10001`
   - Major: `Computer Science`
   - Phone: `+61412345678`
5. Click **"Sign Up"**
6. **Verify your email** (check spam folder or use Firebase console)
7. Go to `/dashboard`

**What happens:**
- Firebase Auth creates a user account
- App automatically creates `users/{uid}` document in Firestore
- All your signup data is stored
- You can now edit profile and it will update

### Option 2: Create Manually in Firebase Console (Advanced)

**Steps:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database**
4. Click **"Start collection"**
5. Create collection named: `users`
6. Set the Document ID to your Firebase Auth UID
   - If you don't know it, skip to Option 3
7. Add fields manually:
   ```
   uid: "abc123xyz..." (your auth UID)
   email: "test@example.com"
   displayName: "John Doe"
   firstName: "John"
   lastName: "Doe"
   emailVerified: true
   membershipTier: "basic"
   joinedAt: (current timestamp)
   ```

### Option 3: Get Existing User UID from Firebase Auth

**If you already created a user but it's not in Firestore:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** > **Users**
4. You'll see your user(s) with their **UID** (copy this)
5. Go to **Firestore Database**
6. Create collection `users`
7. Create document with that UID
8. Add the user's data

---

## Security Rules for Development

While testing, use **permissive rules** (change before production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Allow read-only access to all users (for directory)
    match /users/{uid} {
      allow read: if request.auth != null;
    }
  }
}
```

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** > **Rules**
4. Paste the rules above
5. Click **"Publish"**

---

## Verify It's Working

After setting up:

1. Go to your app's dashboard
2. Check if member card displays info
3. Go to edit profile
4. Make a change and click save
5. Go back to dashboard
6. Verify the change appears
7. Go to [Firebase Console](https://console.firebase.google.com/) > **Firestore Database**
8. You should see your `users` collection with your data

---

## Troubleshooting

### "Users collection not found"
→ Follow **Option 1** (sign up through app) - this creates the collection automatically

### "Permission denied" when saving profile
→ Check your Firestore Security Rules (see section above)

### "Client is offline" error
→ Check your `.env.local` file has correct Firebase config:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Can see data in Firestore but not in app
→ Restart your app: `npm run dev`
→ Hard refresh browser: **Ctrl+Shift+R** (or Cmd+Shift+R on Mac)

---

## Next Steps

**Recommended Setup Order:**

1. ✅ Set Firebase Security Rules (from above)
2. ✅ Create your first user (via app signup - Option 1)
3. ✅ Verify email (check your inbox)
4. ✅ Log in and test editing profile
5. ✅ Check Firestore console that data is being stored
6. ✅ Deploy and test with friends/alumni

---

## Database Schema Reference

**Full User Document Example:**

```json
{
  "uid": "firebase_uid_here",
  "email": "john.doe@nsu.edu.au",
  "emailVerified": true,
  "displayName": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+61412345678",
  "nsuId": "10001",
  "memberId": "DOE0001",
  "major": "Computer Science",
  "photoURL": "https://storage.googleapis.com/...",
  "address": "123 Main Street, Melbourne, VIC 3000",
  "membershipTier": "basic",
  "joinedAt": "2025-11-23T10:30:00Z",
  "eventsJoined": 3,
  "connections": 12,
  "isAdmin": false
}
```

**All fields are optional except:**
- `uid` (automatically set by app)
- `email` (from auth)
- `displayName` (required)
- `emailVerified` (boolean)
- `membershipTier` (defaults to 'basic')
- `joinedAt` (auto-set to signup time)

---

## Production Checklist

Before deploying to production:

- [ ] Security rules are restrictive (not public read/write)
- [ ] At least one test user created and verified
- [ ] Profile edit tested and data persists
- [ ] Firebase Storage working for profile photos
- [ ] Email verification working
- [ ] Password reset working
- [ ] Google OAuth tested
- [ ] Database backup created (Firebase console)

