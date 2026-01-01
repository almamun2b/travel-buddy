'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { LayoutDashboard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { $fetch } from '@/lib/fetch'

interface UserInfo {
  success: boolean
  data?: {
    email: string
  }
}

interface NavbarAuthProps {
  initialUserInfo?: UserInfo | null
}

export default function NavbarAuth({ initialUserInfo }: NavbarAuthProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(
    initialUserInfo ?? null
  )
  const [isLoading, setIsLoading] = useState(false)
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (initialUserInfo !== undefined || hasFetchedRef.current) return

    hasFetchedRef.current = true
    setIsLoading(true)

    const fetchUserInfo = async () => {
      try {
        const data = await $fetch.get<UserInfo>('/auth/me')
        setUserInfo(data ?? null)
      } catch {
        setUserInfo(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()
  }, [initialUserInfo])

  return (
    <div className="flex items-center justify-end w-28">
      {isLoading && <AuthSkeleton />}

      {!isLoading && userInfo?.data?.email && <DashboardButton />}

      {!isLoading && !userInfo?.data?.email && <LoginButton />}
    </div>
  )
}


function AuthSkeleton() {
  return <Skeleton className="h-9 w-24 rounded-full" />
}

function DashboardButton() {
  return (
    <>
      {/* Desktop */}
      <Button
        asChild
        size="sm"
        className="hidden rounded-full px-5 md:inline-flex"
      >
        <Link href="/dashboard">Dashboard</Link>
      </Button>

      {/* Mobile */}
      <Button
        asChild
        size="icon"
        className="rounded-full md:hidden"
      >
        <Link href="/dashboard">
          <LayoutDashboard className="h-5 w-5" />
        </Link>
      </Button>
    </>
  )
}

function LoginButton() {
  return (
    <Button asChild size="sm" className="rounded-full px-5">
      <Link href="/login">Login</Link>
    </Button>
  )
}
