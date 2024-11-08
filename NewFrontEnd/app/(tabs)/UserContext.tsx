// contexts/UserContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getSession } from './UserSession';

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const loadUser = async () => {
      const session = await getSession();
      if (session) {
        console.log('Session retrieved:', session);
        setUser(session);
      }
    };

    loadUser();
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};