// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Verify Firebase config is loaded
if (!firebaseConfig.projectId) {
  console.error('🔴 FATAL: Firebase configuration not loaded! Check .env.local file')
  console.log('Expected env vars: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID, etc.')
}

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
console.log('✅ Firebase app initialized:', firebaseConfig.projectId)

const auth = getAuth(app);

// Enable MFA
auth.settings.appVerificationDisabledForTesting = false;

// Initialize Firestore with optimized settings
const db = getFirestore(app);

// Enable offline persistence (only in browser environment)
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log('✅ Firestore offline persistence enabled')
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('⚠️ Firebase persistence: Multiple tabs open - persistence disabled in this tab')
      } else if (err.code === 'unimplemented') {
        console.warn('⚠️ Firebase persistence: Browser does not support IndexedDB')
      } else {
        console.warn('⚠️ Firebase persistence error:', err)
      }
    });
}

const storage = getStorage(app);

console.log('🚀 Firebase configuration loaded successfully')
console.log('   - Project:', firebaseConfig.projectId)
console.log('   - Auth Domain:', firebaseConfig.authDomain)

export { app, auth, db, storage };
