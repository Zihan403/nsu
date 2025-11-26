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

// Client-side runtime init fallback: if build-time envs were missing
async function initAtRuntime() {
  if (typeof window === 'undefined') return;
  if (app && auth && db) return;
  try {
    const res = await fetch('/api/runtime-env', { cache: 'no-store' });
    if (!res.ok) return;
    const env = await res.json();
    if (env.NEXT_PUBLIC_FIREBASE_API_KEY && env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const cfg = {
        apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      } as any;
      app = getApps().length === 0 ? initializeApp(cfg) : getApps()[0];
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
      console.log('Firebase initialized from runtime env');
    }
  } catch {}
}

if (typeof window !== 'undefined' && (!firebaseConfig.apiKey || !firebaseConfig.projectId)) {
  setTimeout(initAtRuntime, 0);
}

// Export references (may be undefined if not initialized)

export { app, auth, db, storage };
