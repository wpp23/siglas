import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

