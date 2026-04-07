/**
 * Auth Hook
 * Manages user authentication state using Firebase Auth
 */

'use client'

import { useEffect, useState, useContext, createContext, ReactNode } from 'react'
import type { User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged(
        (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser)
          } else {
            setUser(null)
          }
          setLoading(false)
        },
        (err) => {
          setError(err.message)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (err: any) {
      setError(err?.message || 'Auth initialization failed')
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
