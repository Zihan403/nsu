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

// Debug logging for production
console.log('🔍 Firebase Config Debug:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasProjectId: !!firebaseConfig.projectId,
  projectId: firebaseConfig.projectId,
  environment: process.env.NODE_ENV
});

// Verify Firebase config is loaded (skip during build)
if (!firebaseConfig.projectId) {
  console.error('🔴 FATAL: Firebase configuration not loaded!');
  console.error('Missing env vars. Check Railway Variables tab.');
  console.error('Required: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID, etc.');
}

// Initialize Firebase (only once, and only if config is available)
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

// Helper: fire a window event when Firebase becomes ready
const notifyReady = () => {
  if (typeof window !== 'undefined') {
    try { window.dispatchEvent(new Event('firebase-ready')); } catch {}
  }
};

try {
  if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    console.log('✅ Firebase app initialized:', firebaseConfig.projectId);
    
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
    notifyReady();
  } else {
    console.warn('⚠️ Firebase config incomplete - Firebase will not be initialized');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

console.log('🚀 Firebase configuration loaded successfully')
console.log('   - Project:', firebaseConfig.projectId)
console.log('   - Auth Domain:', firebaseConfig.authDomain)

export { app, auth, db, storage };

// Runtime fallback for platforms where build-time envs are missing (e.g., Railway cached build)
// This fetches env values at runtime and initializes Firebase on the client.
async function initFirebaseAtRuntime() {
  if (typeof window === 'undefined') return;
  if (app && auth && db) return;

  try {
    const res = await fetch('/api/runtime-env', { cache: 'no-store' });
    if (!res.ok) return;
    const env = await res.json();

    const runtimeConfig = {
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    } as any;

    if (runtimeConfig.projectId && runtimeConfig.apiKey) {
      app = getApps().length === 0 ? initializeApp(runtimeConfig) : getApps()[0];
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
      console.log('✅ Firebase initialized via runtime env:', runtimeConfig.projectId);
      notifyReady();
    } else {
      console.warn('⚠️ Runtime env did not include Firebase config');
    }
  } catch (e) {
    console.warn('⚠️ Failed to initialize Firebase at runtime:', e);
  }
}

if (typeof window !== 'undefined' && (!firebaseConfig.projectId || !firebaseConfig.apiKey)) {
  // Attempt runtime initialization after page load
  setTimeout(() => { initFirebaseAtRuntime(); }, 0);
}
