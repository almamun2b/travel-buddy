'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import UsersTable from "@/components/modules/user/UsersTable";
import { getAllUsers } from "@/services/user/getAllUsers";
import type { User } from "@/components/modules/user/UsersTable";

function UsersPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [users, setUsers] = useState<User[]>([])
  const [meta, setMeta] = useState({ page: 1, limit: 20, total: 0 })
  const [loading, setLoading] = useState(true)

  const currentPage = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search') || ''

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const result = await getAllUsers({
          page: currentPage,
          limit: 20,
          searchTerm: search,
        })
        if (result?.success) {
          setUsers(result.data || [])
          setMeta(result.meta || { page: 1, limit: 20, total: 0 })
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage, search])

  const updateQuery = (updates: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, String(value))
    })
    router.push(`?${newParams.toString()}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-6"></div>
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">View and manage all users in the system</p>
      </div>
      <UsersTable 
        users={users} 
        meta={meta} 
        search={search}
        onUpdateQuery={updateQuery}
      />
    </div>
  )
}

export default function UsersPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-6"></div>
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <UsersPageContent />
    </Suspense>
  )
}
