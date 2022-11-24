import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

import { auth } from '../firebase';

interface IAuth {
    user?: User;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error?: string;
    loading: boolean;
}

const AuthContext = createContext<IAuth>({
    user: undefined,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: undefined,
    loading: false
})

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User>()
    const [error, setError] = useState<string>();
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const router = useRouter()

    // Persisting the user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Logged in...
                setUser(user);
                setLoading(false)

            }
            else {
                // Not Logged in...
                setUser(undefined);
                setLoading(false);
                router.push('/login')
            }

            setInitialLoading(false)
        })
    }, [auth])

    const signUp = async (email: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false);
        }).catch((error) => {
            alert(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false);
        }).catch((error) => {
            alert(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const logout = async () => {
        setLoading(true);

        signOut(auth).then(() => {
            setUser(undefined)
        }).catch((error) => {
            alert(error.message)
        }).finally(() => {
            setLoading(false);
        })
    }

    const memoedValue = useMemo(() => ({
        user, signUp, signIn, loading, logout, error
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}