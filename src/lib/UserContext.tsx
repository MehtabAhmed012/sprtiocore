import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface UserContextType {
  user: User | null;
  role: 'admin' | 'editor' | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({ user: null, role: null, loading: true });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'editor' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const roleDoc = await getDoc(doc(db, 'roles', user.uid));
          if (roleDoc.exists()) {
            setRole(roleDoc.data().role);
          } else if (user.email === 'mehtabahmed.isb@gmail.com') {
            // Bootstrap Admin for the developer
            setRole('admin');
          } else {
            setRole(null);
          }
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, role, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
