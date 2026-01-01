'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useCallback, useTransition } from 'react'

export type User = {
  id: string
  email: string
  role: string
  fullName: string
  contactNumber: string | null
  status: string
  isVerified: boolean
  createdAt: string
}

export type UserResponse = {
  success: boolean
  meta: {
    page: number
    limit: number
    total: number
  }
  data: User[]
}


type Props = {
  users: User[]
  meta: {
    page: number
    limit: number
    total: number
  }
  search: string
  onUpdateQuery?: (updates: Record<string, string | number>) => void
}

export default function UsersTable({ users, meta, search, onUpdateQuery }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [, startTransition] = useTransition()

  const totalPages = Math.ceil(meta.total / meta.limit)

  const updateQuery = useCallback(
    (updates: Record<string, string | number>) => {
      if (onUpdateQuery) {
        onUpdateQuery(updates)
      } else {
        // Fallback to original behavior if onUpdateQuery not provided
        const newParams = new URLSearchParams(params.toString())
        Object.entries(updates).forEach(([key, value]) => {
          newParams.set(key, String(value))
        })
        startTransition(() => {
          router.push(`?${newParams.toString()}`)
        })
      }
    },
    [params, router, onUpdateQuery]
  )

  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Search by email or name..."
        defaultValue={search}
        onChange={(e) =>
          updateQuery({ search: e.target.value, page: 1 })
        }
        className="max-w-sm"
      />

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  {user.isVerified ? '✅' : '❌'}
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6"
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {meta.page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={meta.page <= 1}
            onClick={() =>
              updateQuery({ page: meta.page - 1 })
            }
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={meta.page >= totalPages}
            onClick={() =>
              updateQuery({ page: meta.page + 1 })
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
