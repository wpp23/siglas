import React, { createContext, useState } from 'react';

// Define the shape of your auth context
interface AuthContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null; 
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Provide a default value for the context
export const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: () => {}, 
  token: null,
  setToken: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
