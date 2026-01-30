import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface AuthContextType {
    currentUser: User | null;
    userData: any;
    loading: boolean;
    signup: (email: string, password: string, additionalData?: any) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const signup = async (email: string, password: string, additionalData: any = {}) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Create user document
            try {
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    uid: userCredential.user.uid,
                    email: email,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    role: 'user', // Default role
                    ...additionalData
                });
            } catch (firestoreError) {
                console.error('Firestore error (non-blocking):', firestoreError);
                // Don't throw here, user is already created in Auth
            }
        } catch (error) {
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                // Fetch user data from Firestore
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        // If doc doesn't exist (e.g. created via other means), we might want to create it? 
                        // For now just set null
                        setUserData(null);
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userData,
        loading,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value as any}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
