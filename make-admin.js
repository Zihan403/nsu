// Run this in browser console at localhost:3000 after logging in
// This will update your account to admin

import { doc, updateDoc } from 'firebase/firestore';
import { db } from './lib/firebaseConfig';

const makeAdmin = async (email) => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (user && user.email === email) {
    await updateDoc(doc(db, 'users', user.uid), {
      isAdmin: true
    });
    console.log('✅ Admin access granted! Refresh the page.');
  }
};

// Call this with your email
makeAdmin('zihansarowar403@gmail.com');
