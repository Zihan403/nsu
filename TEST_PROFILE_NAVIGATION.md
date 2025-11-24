# Profile Navigation & Form Submission Test Guide

## Issue: Cannot navigate to edit profile AND cannot update edited info

This guide will help identify exactly where the issue occurs.

---

## Prerequisites

1. **Open Developer Console** in your browser (F12 or Ctrl+Shift+I)
2. **Go to the "Console" tab** to see detailed logging
3. **Keep console open** while testing
4. **Ensure you are logged in** with email verified

---

## Test 1: Navigation to Edit Profile Page

### Steps:

1. Go to `/dashboard`
2. Look for the **"Edit Profile"** link (should be in the member card section or in the navigation dropdown)
3. **Click the link**
4. **Check Console:**
   - Should see: `🔗 Navigating to /profile`
   - Page should load the Edit Profile form

### Expected Console Output:
```
🔗 Navigating to /profile
EditProfile useEffect - userProfile: {uid: "...", firstName: "John", ...}
EditProfile form loaded with data: {firstName: "John", lastName: "Doe"}
```

### If Navigation Fails:
- [ ] Check if you're logged in and email is verified
- [ ] Check if you see any JavaScript errors in console (red text)
- [ ] Check browser network tab - is the request to `/profile` successful (200)?
- [ ] Try direct URL: `localhost:3000/profile` or your deployment URL + `/profile`

---

## Test 2: Form Submission (Update Profile)

### Steps:

1. **From Edit Profile page, make a change:**
   - Change First Name to a new value (e.g., "John" → "Johnny")
   - Or update Phone Number
   - Or add a Street Address
   
2. **Click "Save Changes" button**

3. **Check Console for this sequence:**

```
🔄 Form submission started {formData: {firstName: "Johnny", ...}}
📝 Update data prepared: {firstName: "Johnny", lastName: "...", displayName: "...", ...}
```

Then one of:

**SUCCESS PATH:**
```
💾 Calling updateUserProfile...
📤 updateUserProfile called with: {firstName: "Johnny", ...}
🔄 Attempt 1/3: Writing to Firestore for user [uid]
✅ Write successful
🔍 Fetching fresh profile data...
📦 Fresh profile fetched: {firstName: "Johnny", ...}
🎉 Profile update completed successfully
⏱️ Redirecting to dashboard in 1500ms...
(page redirects after 1.5 seconds)
```

**FAILURE PATH - Check for these errors:**

1. **"No user logged in"** → User session lost, need to login again
2. **Firebase error** → Check internet connection or Firebase permissions
3. **"Failed to update profile"** → Retry failed 3 times, check network
4. **Network timeout** → Firestore not responding, check connection

---

## Test 3: Verify Data Was Actually Saved

### Method 1: Check Firestore Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database**
4. Find the **`users`** collection
5. Find your user document
6. Check if the fields you updated have new values

### Method 2: Check on Dashboard
1. Click "Save Changes" and wait for redirect
2. Go back to `/profile` page
3. Check if your updated values appear in the form fields
4. In console, look for: `EditProfile form loaded with data: {firstName: "Johnny", ...}`

### Method 3: Reload and Verify Persistence
1. Save your changes
2. **Hard refresh the page** (Ctrl+Shift+R or Cmd+Shift+R)
3. Go to `/dashboard`
4. Check if member card shows updated info
5. Click "Edit Profile" again
6. Check if form still has your updated values

---

## Detailed Error Diagnosis

### Scenario A: Navigation Button Not Visible

**Possible Causes:**
- Not logged in (ProtectedRoute redirects to login)
- Email not verified (redirects to verify-account)
- User profile not loaded yet

**Test:**
- Open browser console
- Run: `firebase.auth().currentUser.email`
- Run: `firebase.auth().currentUser.emailVerified`
- Both should show valid values

---

### Scenario B: Click Button But Nothing Happens

**Possible Causes:**
- JavaScript error preventing click (check console for red errors)
- onClick handler not firing
- Navigation blocked by middleware

**Test:**
- Check console for any red error messages
- Click the button again and look for any console output
- Try direct URL navigation: change address bar to `/profile`

---

### Scenario C: Form Loads But Save Button Doesn't Work

**Possible Causes:**
- updateUserProfile function failing
- Firestore permissions issue
- Network/internet problem

**Test in Console:**
```javascript
// Check if you can access Firebase
console.log(firebase.app().name);  // Should show "[DEFAULT]"

// Check Firestore connection
console.log(firebase.firestore());  // Should show Firestore instance
```

---

### Scenario D: Save Says Success But Data Doesn't Update

**Possible Causes:**
- Data written but not being read back
- Stale user profile in state
- Firestore security rules blocking read

**Test:**
- Wait 2-3 seconds after save
- Hard refresh browser
- Go to Dashboard and Edit Profile again
- Check Firestore console directly

---

## Console Logs Reference

### When Opening /profile Page:
```
✅ Expected Output:
EditProfile useEffect - userProfile: {...}
EditProfile form loaded with data: {...}
```

### When Clicking Save:
```
✅ Expected Output:
🔄 Form submission started
📝 Update data prepared
💾 Calling updateUserProfile...
📤 updateUserProfile called with: {...}
🔄 Attempt 1/3: Writing to Firestore...
✅ Write successful
🔍 Fetching fresh profile data...
📦 Fresh profile fetched: {...}
🎉 Profile update completed successfully
⏱️ Redirecting to dashboard in 1500ms...
🔀 Redirecting now...
```

### If Something Goes Wrong:
```
❌ Error indicators to look for:
- "No user logged in"
- "Error updating profile"
- Network errors (ERR_CONNECTION_REFUSED, etc.)
- Firebase permission denied errors
```

---

## Quick Checklist

- [ ] Developer console open and monitoring
- [ ] Logged in with verified email
- [ ] Can see "Edit Profile" link on dashboard
- [ ] Can click link and page loads
- [ ] Can make form changes
- [ ] Can click "Save Changes" button
- [ ] Button shows "Saving..." state
- [ ] Console shows success logs
- [ ] Page redirects to dashboard
- [ ] Updated values appear on dashboard
- [ ] Hard refresh shows updated values still there
- [ ] Firestore shows updated data

---

## If Test Fails

Please share:

1. **Which test failed?** (Navigation, Form Submission, or Data Verification?)
2. **Console output** (copy the relevant logs)
3. **Error message shown** (if any)
4. **Browser/Device type** (Chrome, Firefox, Mobile, etc.)
5. **Are you online?** (check internet connection)

This information will help debug the exact issue!
