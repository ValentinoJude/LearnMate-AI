"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  user: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  // Load user from Local Storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('currentUser'); // Clear invalid data
      }
    }
  }, []);

  // Save user to Local Storage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  // Mock Login Function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Basic validation
    if (!email || !password) return false;
    console.log(`Mock Login attempt with: ${email} / ${password}`);
    
    // Simulate successful login for any non-empty email/password
    const mockUser = {
        id: 'user-' + email.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(), // Simple ID generation
        name: email.split('@')[0] || 'User',
        email: email
    };

    setUser(mockUser);
    return true;
  };

  // Mock Signup Function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
     // Basic validation
     if (!name || !email || !password) return false;
     console.log(`Mock Signup attempt for: ${name} <${email}>`);

     // Simulate successful signup
     const mockUser = {
        id: 'user-' + email.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
        name: name,
        email: email
     };

     setUser(mockUser);
     return true;
  };

  // Logout Function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 