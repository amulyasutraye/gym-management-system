import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Retry function with exponential backoff
const retryWithBackoff = async (
  fn: () => Promise<any>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<any> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (i === maxRetries - 1) throw error;
      
      // Check if offline before retrying
      if (!navigator.onLine) {
        throw new Error('Cannot connect to the server. Please check your internet connection.');
      }
      
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const fetchUserData = async (firebaseUser: FirebaseUser) => {
    // Immediate check for online status
    if (!navigator.onLine) {
      throw new Error('Cannot fetch user data while offline. Please check your internet connection.');
    }

    try {
      const userDoc = await retryWithBackoff(async () => {
        // Double-check online status right before the fetch
        if (!navigator.onLine) {
          throw new Error('Lost internet connection. Please check your connection and try again.');
        }
        return await getDoc(doc(db, 'users', firebaseUser.uid));
      });
      return userDoc;
    } catch (error: any) {
      // Enhanced error message for offline state
      if (!navigator.onLine) {
        throw new Error('Cannot access user data while offline. Please check your internet connection and try again.');
      }
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Only attempt to fetch user data if online
          if (!navigator.onLine) {
            setState({
              user: null,
              isLoading: false,
              error: 'Cannot load user data while offline. Please check your internet connection.',
            });
            return;
          }

          const userDoc = await fetchUserData(firebaseUser);
          const userData = userDoc.data();
          
          if (!userData) {
            // If user document doesn't exist, create it
            const defaultUserData = {
              email: firebaseUser.email,
              name: firebaseUser.displayName || 'User',
              role: 'member',
              createdAt: new Date().toISOString()
            };
            
            if (navigator.onLine) {
              await setDoc(doc(db, 'users', firebaseUser.uid), defaultUserData);
            }
            
            setState({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email!,
                name: defaultUserData.name,
                role: defaultUserData.role,
              },
              isLoading: false,
              error: null,
            });
          } else {
            setState({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email!,
                name: userData.name,
                role: userData.role,
                profileImage: userData.profileImage,
              },
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          console.error('Error fetching user data:', error);
          setState({
            user: null,
            isLoading: false,
            error: error.message || 'Failed to load user data. Please check your internet connection and try again.',
          });
        }
      } else {
        setState({
          user: null,
          isLoading: false,
          error: null,
        });
      }
    });

    // Add online/offline event listeners with enhanced error messages
    const handleOnline = () => {
      setState(prev => ({ 
        ...prev, 
        error: null,
      }));
    };

    const handleOffline = () => {
      setState(prev => ({ 
        ...prev, 
        error: 'You are currently offline. Please check your internet connection to access your account.',
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setState({ ...state, isLoading: true, error: null });
    
    if (!navigator.onLine) {
      setState({
        user: null,
        isLoading: false,
        error: 'Cannot login while offline. Please check your internet connection and try again.',
      });
      throw new Error('Cannot login while offline');
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await fetchUserData(userCredential.user);
      const userData = userDoc.data();
      
      if (!userData) {
        throw new Error('User data not found');
      }
      
      setState({
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          name: userData.name,
          role: userData.role,
          profileImage: userData.profileImage,
        },
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        user: null,
        isLoading: false,
        error: error.message || 'Invalid credentials',
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, role: string = 'member') => {
    setState({ ...state, isLoading: true, error: null });
    
    if (!navigator.onLine) {
      setState({
        user: null,
        isLoading: false,
        error: 'Cannot register while offline. Please check your internet connection and try again.',
      });
      throw new Error('Cannot register while offline');
    }
    
    try {
      // Special case for admin registration
      if (email === 'admin@gymfit.com') {
        role = 'admin';
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      const userData = {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      setState({
        user: {
          id: userCredential.user.uid,
          email,
          name,
          role,
        },
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        user: null,
        isLoading: false,
        error: error.message || 'Failed to create account',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setState({
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        error: error.message || 'Failed to log out',
      });
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};