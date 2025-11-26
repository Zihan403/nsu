// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration (build-time values)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Minimal verification
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.warn('Firebase config missing at build-time; Firebase will not initialize.');
}

// Initialize Firebase (only once, and only if config is available)
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

try {
  if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    console.log('Firebase initialized:', firebaseConfig.projectId);
    
    auth = getAuth(app);
    auth.settings.appVerificationDisabledForTesting = false;
    
    db = getFirestore(app);
    
    // Enable offline persistence (only in browser environment)
    if (typeof window !== 'undefined') {
      enableIndexedDbPersistence(db)
        .then(() => {
          console.log('✅ Firestore offline persistence enabled');
        })
        .catch((err) => {
          if (err.code === 'failed-precondition') {
            console.warn('⚠️ Firebase persistence: Multiple tabs open');
          } else if (err.code === 'unimplemented') {
            console.warn('⚠️ Firebase persistence: Browser does not support IndexedDB');
          } else {
            console.warn('⚠️ Firebase persistence error:', err);
          }
        });
    }
    
    storage = getStorage(app);
  } else {
    console.warn('Firebase config incomplete - skipped initialization');
  }
} catch (error) {
  console.error('Firebase init error:', error);
}

// Export references (may be undefined if not initialized)

export { app, auth, db, storage };
