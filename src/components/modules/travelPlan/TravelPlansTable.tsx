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
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarDays, MapPin, DollarSign, Users, ShieldCheck, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { format } from 'date-fns'
import { useCallback, useTransition } from 'react'

export type TravelPlan = {
  id: string
  title: string
  description: string
  destination: string
  startDate: string
  endDate: string
  budget: number
  travelType: string
  maxMembers: number
  activities: string[]
  images: string[]
  status: string
  createdAt: string
  updatedAt: string
  creator: {
    id: string
    fullName: string
    avatar: string | null
    isVerified: boolean
    hasVerifiedBadge: boolean
  }
}

export type TravelPlanResponse = {
  success: boolean
  meta: {
    page: number
    limit: number
    total: number
  }
  data: TravelPlan[]
}

interface Props {
  travelPlans: TravelPlan[]
  meta: {
    page: number
    limit: number
    total: number
  }
  searchParams: {
    searchTerm: string
    destination: string
    travelType: string
    minBudget: string
    maxBudget: string
    startDate: string
    endDate: string
    status: string
    sortBy: string
    sortOrder: 'asc' | 'desc'
  }
}

export default function TravelPlansTable({ travelPlans, meta, searchParams }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [, startTransition] = useTransition()

  const updateQuery = useCallback(
    (updates: Record<string, string | number>) => {
      const newParams = new URLSearchParams(params.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === '' || value === undefined) {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      })
      router.push(`?${newParams.toString()}`)
    },
    [params, router]
  )

  const handleSort = (field: string) => {
    const currentSort = searchParams.sortBy
    const currentOrder = searchParams.sortOrder
    
    let newOrder: 'asc' | 'desc' = 'desc'
    if (currentSort === field) {
      newOrder = currentOrder === 'asc' ? 'desc' : 'asc'
    }
    
    updateQuery({
      sortBy: field,
      sortOrder: newOrder,
    })
  }

  const getSortIcon = (field: string) => {
    const currentSort = searchParams.sortBy
    const currentOrder = searchParams.sortOrder
    
    if (currentSort !== field) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    
    return currentOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const totalPages = Math.ceil(meta.total / meta.limit)

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search travel plans..."
                value={searchParams.searchTerm}
                onChange={(e) => updateQuery({ searchTerm: e.target.value, page: 1 })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input
                placeholder="Destination..."
                value={searchParams.destination}
                onChange={(e) => updateQuery({ destination: e.target.value, page: 1 })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Travel Type</label>
              <Select
                value={searchParams.travelType}
                onValueChange={(value) => updateQuery({ travelType: value, page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SOLO">Solo</SelectItem>
                  <SelectItem value="COUPLE">Couple</SelectItem>
                  <SelectItem value="FAMILY">Family</SelectItem>
                  <SelectItem value="GROUP">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={searchParams.status}
                onValueChange={(value) => updateQuery({ status: value, page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Budget</label>
              <Input
                type="number"
                placeholder="Min budget..."
                value={searchParams.minBudget}
                onChange={(e) => updateQuery({ minBudget: e.target.value, page: 1 })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Budget</label>
              <Input
                type="number"
                placeholder="Max budget..."
                value={searchParams.maxBudget}
                onChange={(e) => updateQuery({ maxBudget: e.target.value, page: 1 })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={searchParams.startDate}
                onChange={(e) => updateQuery({ startDate: e.target.value, page: 1 })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={searchParams.endDate}
                onChange={(e) => updateQuery({ endDate: e.target.value, page: 1 })}
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => updateQuery({
                searchTerm: '',
                destination: '',
                travelType: 'all',
                minBudget: '',
                maxBudget: '',
                startDate: '',
                endDate: '',
                status: 'all',
                page: 1
              })}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Travel Plan</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('destination')}
                      className="h-auto p-0 font-semibold"
                    >
                      Destination
                      {getSortIcon('destination')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('budget')}
                      className="h-auto p-0 font-semibold"
                    >
                      Budget
                      {getSortIcon('budget')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('startDate')}
                      className="h-auto p-0 font-semibold"
                    >
                      Start Date
                      {getSortIcon('startDate')}
                    </Button>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('createdAt')}
                      className="h-auto p-0 font-semibold"
                    >
                      Created
                      {getSortIcon('createdAt')}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {travelPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="font-medium">{plan.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {plan.description}
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {plan.activities.slice(0, 2).map((activity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                          {plan.activities.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{plan.activities.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={plan.creator.avatar || ''} />
                          <AvatarFallback>
                            {plan.creator.fullName?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{plan.creator.fullName}</div>
                          {plan.creator.hasVerifiedBadge && (
                            <div className="flex items-center gap-1">
                              <ShieldCheck className="h-3 w-3 text-blue-500" />
                              <span className="text-xs text-blue-500">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {plan.destination}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {plan.budget.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {format(new Date(plan.startDate), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{plan.travelType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={plan.status === 'OPEN' ? 'default' : 'secondary'}
                      >
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(plan.createdAt), 'MMM dd, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {travelPlans.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No travel plans found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuery({ page: meta.page - 1 })}
              disabled={meta.page <= 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={meta.page === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQuery({ page: pageNum })}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2">...</span>
                  <Button
                    variant={meta.page === totalPages ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQuery({ page: totalPages })}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuery({ page: meta.page + 1 })}
              disabled={meta.page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
