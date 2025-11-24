# Firebase Firestore Schema Documentation

## Collections & Documents

### 1. `users/{uid}` Collection

This is the main collection for all user profiles. Each document is keyed by the Firebase Authentication UID.

#### Document Structure:

```json
{
  // Core Authentication Fields (REQUIRED)
  "uid": "firebase-uid-string",
  "email": "user@example.com",
  "emailVerified": false,
  
  // Basic Profile Fields
  "displayName": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+61412345678",
  
  // NSU Member Fields (From Signup)
  "memberId": "DOE0001",
  "nsuId": "10001",
  "major": "Computer Science",
  
  // Address Fields (From Profile Edit)
  "address": "123 Main St, Melbourne, VIC, 3000",
  "streetAddress": "123 Main St",
  "suburb": "Melbourne",
  "state": "VIC",
  "postcode": "3000",
  
  // Professional Fields (From Profile Edit)
  "currentJob": "Software Engineer",
  "company": "Tech Company",
  "location": "Melbourne, Australia",
  
  // Media Fields
  "photoURL": "https://storage.googleapis.com/...",
  
  // Membership Fields
  "membershipTier": "basic",
  "joinedAt": "2025-11-23T10:00:00Z",
  
  // Engagement Metrics
  "eventsJoined": 0,
  "connections": 0,
  
  // Admin Fields
  "isAdmin": false
}
```

## Data Flow

### Signup Flow (Login Page)

```
User fills signup form:
├─ Email
├─ Password
├─ First Name
├─ Last Name
├─ NSU ID
├─ Major
├─ Phone Number (with country code)
└─ Password strength requirements

↓

Login Page (login/page.tsx) validates all fields

↓

Calls: signUp(email, password, additionalInfo)

additionalInfo includes:
{
  firstName: "John",
  lastName: "Doe",
  displayName: "John Doe",
  nsuId: "10001",
  memberId: "DOE0001",
  major: "Computer Science",
  phoneNumber: "+61412345678"
}

↓

AuthContext.signUp() processes:
├─ Creates Firebase Auth user
├─ Creates Firestore document in 'users' collection
├─ Spreads additionalInfo into profile
├─ Sends email verification
└─ User stays logged in (can't access protected routes until verified)
```

### Profile Edit Flow

```
User navigates to /profile

↓

Form pre-populated with existing data from userProfile context

↓

User edits:
├─ Photo upload (to Firebase Storage)
├─ Phone Number
├─ Address fields
└─ Professional info

↓

Calls: updateUserProfile(updateData)

updateData includes:
{
  firstName: "...",
  lastName: "...",
  phoneNumber: "...",
  address: "...",
  photoURL: "..." (if photo uploaded)
}

↓

AuthContext.updateUserProfile():
├─ Sends merge update to Firestore
├─ Fetches FRESH data back from Firestore
├─ Updates userProfile context
└─ Dashboard re-renders with new data
```

### Dashboard Display

```
Dashboard Page loads

↓

useAuth() hook provides userProfile

↓

Renders Member Card with fields:
├─ displayName (from signup)
├─ firstName + lastName (from signup)
├─ memberId (generated: lastName + last 4 digits of nsuId)
├─ nsuId (from signup)
├─ major (from signup)
├─ photoURL (from profile edit)
└─ joinedAt (auto-generated on signup)

↓

If any required field is missing:
└─ Show warning: "Incomplete Profile - Please complete your profile edit"
```

## Required Fields for Member Card Display

For the digital member card to display properly, these fields are REQUIRED:

```
✅ MUST HAVE (from signup):
  - firstName
  - lastName
  - nsuId
  - memberId (auto-generated)
  - major
  - phoneNumber

✅ OPTIONAL (from profile edit):
  - photoURL
  - phoneNumber (can be updated)
  - address
```

## Debugging Checklist

### If Member Card Shows "N/A" Values:

1. **Check Browser Console** → Look for logs:
   ```
   "Creating user profile in Firestore: {...}"
   "Profile fetched from Firestore: {...}"
   ```

2. **Check Firestore in Firebase Console**:
   - Go to: Firebase Console → Firestore Database → users collection
   - Look for your user's document (keyed by uid)
   - Verify fields: firstName, lastName, nsuId, memberId, major exist

3. **Check if signup form is validating**:
   - All fields must be filled in the signup form
   - NSU ID must be 4+ digits
   - Password must meet strength requirements

4. **Check profile edit flow**:
   - If data appears after signup, visit /profile
   - Add missing info there
   - Click Save

### If Data Doesn't Persist:

1. Check browser console for errors
2. Verify Firebase rules allow writes to 'users/{uid}'
3. Check internet connection
4. Check localStorage/IndexedDB not interfering

## Firebase Firestore Rules Template

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own profile
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

## Testing the Data Flow

### Test 1: Signup and verify data saved
```
1. Sign up with all required fields filled
2. Open browser console
3. Look for: "Creating user profile in Firestore: {firstName: 'John', lastName: 'Doe', ...}"
4. Click to verify email
5. Go to dashboard
6. Member card should show all fields
```

### Test 2: Edit profile and verify persistence
```
1. Go to /profile
2. Change phone number or add address
3. Upload a photo (optional)
4. Click Save
5. Should redirect to dashboard
6. Member card should show updated phone and address
7. Profile photo should appear
```

### Test 3: Refresh and verify data persists
```
1. Refresh the page (F5)
2. Dashboard should still show all data
3. No fields should reset to "N/A"
4. Check console: "Profile fetched from Firestore: {...}" with all fields
```

## Solution If Data Still Missing

If you follow all the above and data still isn't showing:

1. **Clear browser data**:
   - Delete IndexedDB cache
   - Clear localStorage
   - Clear cookies

2. **Hard refresh**:
   - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

3. **Check Firestore Security Rules**:
   - Make sure rules allow authenticated users to write to 'users/{uid}'

4. **Check if additionalInfo is being passed**:
   - Add this to login/page.tsx before calling signUp():
     ```tsx
     console.log('About to signup with:', {
       email,
       firstName,
       lastName,
       nsuId,
       major,
       phoneNumber: fullPhoneNumber,
       memberId: `${lastName}${nsuId.slice(-4)}`
     })
     ```

## Summary

The system IS properly set up to:
✅ Collect member info during signup
✅ Store it in Firestore with proper fields
✅ Retrieve it and display on dashboard
✅ Allow editing and persistence
✅ Show warnings if info is missing

The issue is likely one of:
1. Signup validation failing silently
2. Firestore rules blocking writes
3. Browser cache/localStorage issue
4. Missing/wrong field values from signup form

Use the debugging checklist above to identify which one.
