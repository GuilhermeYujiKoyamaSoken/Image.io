'use client'

import React, { useEffect, useState } from 'react'
import Login from '@/app/login/page'
import { useAuth } from '@/resources'

interface AuthenticatedPageProps {
  children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const auth = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // evita hydration error

  if (!auth.isSessionValid()) return <Login />

  return <>{children}</>
}