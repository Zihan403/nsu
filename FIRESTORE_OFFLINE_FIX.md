# 🔧 Firestore Offline Error - Fix Guide

## Error: "Failed to get document because the client is offline"

This error occurs when Firestore cannot reach the database. **You DO NOT need PostgreSQL** - you need to fix your Firestore connection.

---

## ⚡ Quick Fixes (Try These First)

### 1. **Check Your Internet Connection**
```bash
# In browser console:
navigator.onLine  # Should be true
```
- If `false`: Fix your internet connection
- If `true`: Continue to next step

### 2. **Check Firestore is Initialized**
```bash
# In browser console:
firebase.firestore()  # Should show Firestore instance, not error
```
- If error: Firebase config is wrong, check `.env.local`

### 3. **Hard Refresh Your Browser**
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### 4. **Clear Browser Cache & Data**
- Open DevTools (F12)
- Application tab → Clear Site Data
- Close and reopen browser

### 5. **Check Firebase Console**
1. Go to https://console.firebase.google.com/
2. Select your project: `nsu-alumni-5685b`
3. Go to **Firestore Database**
4. Check status - should show **Active** (green)
5. If red/error: Your Firebase project might be paused or invalid

---

## 🔐 Firestore Security Rules (CRITICAL)

Your error is **likely caused by restrictive security rules**. Here's how to fix it:

### Step 1: Go to Firebase Console
1. https://console.firebase.google.com/
2. Select `nsu-alumni-5685b` project
3. Go to **Firestore Database** → **Rules** tab

### Step 2: Check/Update Your Rules

**FOR DEVELOPMENT (Allow All - TEMPORARY):**
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes (development only!)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**FOR PRODUCTION (Secure - Use This Later):**
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow anyone to read (for directory/public info)
    match /events/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.claims.admin == true;
    }
  }
}
```

### Step 3: Deploy Rules
1. Click **Publish** button
2. Wait for deployment to complete
3. Refresh your app (Ctrl+Shift+R)
4. Try to login/update profile again

---

## 🔍 Check If Firestore Data Exists

### Method 1: Firebase Console
1. Go to https://console.firebase.google.com/
2. Select `nsu-alumni-5685b`
3. **Firestore Database** → Collections
4. Look for `users` collection
5. Should see documents with UIDs as names

### Method 2: Browser Console
```javascript
// Try to fetch your own user data
firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
  .then(doc => console.log('✅ User data:', doc.data()))
  .catch(err => console.log('❌ Error:', err.message))
```

---

## 📝 Firestore Initialization Verification

Check browser console after refreshing the page. You should see:

```
✅ Firebase app initialized: nsu-alumni-5685b
✅ Firestore offline persistence enabled
🚀 Firebase configuration loaded successfully
   - Project: nsu-alumni-5685b
   - Auth Domain: nsu-alumni-5685b.firebaseapp.com
```

If you don't see these logs:
- Check that `.env.local` has all Firebase values
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors

---

## 🚨 If Still Getting Offline Error

Run this diagnostic in browser console:

```javascript
// 1. Check Firebase connection
console.log('🔷 Firebase Config Check:')
console.log('  Project:', firebase.app().name)
console.log('  Online:', navigator.onLine)

// 2. Try a simple write
firebase.firestore().collection('test').doc('test').set({time: new Date()})
  .then(() => console.log('✅ Firestore write successful'))
  .catch(err => console.log('❌ Firestore error:', err.code, err.message))

// 3. Try a simple read
firebase.firestore().collection('users').limit(1).get()
  .then(snap => console.log('✅ Firestore read successful, docs:', snap.size))
  .catch(err => console.log('❌ Firestore read error:', err.code, err.message))
```

### Common Error Codes:

| Code | Meaning | Fix |
|------|---------|-----|
| `PERMISSION_DENIED` | Security rules block access | Update security rules |
| `UNAUTHENTICATED` | Not logged in | Login first |
| `OFFLINE` | No internet or Firestore unreachable | Check internet / Firebase status |
| `INVALID_ARGUMENT` | Bad config | Check `.env.local` |

---

## ✅ After Fix - Test Flow

1. **Refresh browser** (Ctrl+Shift+R)
2. **Check console logs** - should see green ✅ messages
3. **Logout and login again**
4. **Try to edit profile** and save
5. **Check Firestore Console** - data should appear/update in real-time

---

## 🎯 Summary

- ✅ You **HAVE Firestore connected** (no PostgreSQL needed)
- ❌ The error means Firestore **cannot be reached or accessed**
- 🔧 **Fix**: Update security rules to allow reads/writes
- 🧪 **Test**: Use Firebase Console to verify data exists
- 📱 **Deploy**: Once working, update rules for production security

---

## Need Help?

If still not working, provide:
1. Screenshot of Firestore Database status (green/red)
2. Your current security rules
3. Exact error message from console
4. Result of diagnostic test above
