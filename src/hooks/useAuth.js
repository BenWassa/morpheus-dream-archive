import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isConfigured } from '../firebase.js';
import { ALLOWED_UIDS } from '../config/whitelist.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isConfigured);

  useEffect(() => {
    if (!isConfigured) return;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAllowed = user ? ALLOWED_UIDS.includes(user.uid) : false;

  return { user, loading, isAllowed };
}
