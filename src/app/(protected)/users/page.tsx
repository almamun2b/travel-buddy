import dynamic from 'next/dynamic';
import { getAllUsers } from "@/services/user/getAllUsers";
import { Suspense } from 'react';

const UsersTable = dynamic(() => import("@/components/modules/user/UsersTable"));

export const userFilterableFields = [
  "email",
  "role", 
  "status",
  "gender",
  "isVerified",
  "hasVerifiedBadge",
  "searchTerm",
] as const;

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    email?: string;
    role?: string;
    status?: string;
    gender?: string;
    isVerified?: string;
    hasVerifiedBadge?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  
  // Build query parameters
  const queryParams: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    searchTerm?: string;
    email?: string;
    role?: string;
    status?: string;
    gender?: string;
    isVerified?: boolean;
    hasVerifiedBadge?: boolean;
  } = {
    page: currentPage,
    limit: 14,
    sortBy: params.sortBy || 'createdAt',
    sortOrder: (params.sortOrder as 'asc' | 'desc') || 'desc',
  };

  // Only include filters if they have values
  if (params.search) queryParams.searchTerm = params.search;
  if (params.email) queryParams.email = params.email;
  if (params.role && params.role !== 'all') queryParams.role = params.role;
  if (params.status && params.status !== 'all') queryParams.status = params.status;
  if (params.gender && params.gender !== 'all') queryParams.gender = params.gender;
  if (params.isVerified && params.isVerified !== 'all') {
    queryParams.isVerified = params.isVerified === 'true' ? true : false;
  }
  if (params.hasVerifiedBadge && params.hasVerifiedBadge !== 'all') {
    queryParams.hasVerifiedBadge = params.hasVerifiedBadge === 'true' ? true : false;
  }

  // Create searchParams for UsersTable component
  const tableSearchParams = {
    searchTerm: params.search || '',
    email: params.email || '',
    role: params.role || '',
    status: params.status || '',
    gender: params.gender || '',
    isVerified: params.isVerified === 'true' ? true : (params.isVerified === 'false' ? false : undefined),
    hasVerifiedBadge: params.hasVerifiedBadge === 'true' ? true : (params.hasVerifiedBadge === 'false' ? false : undefined),
    sortBy: params.sortBy || 'createdAt',
    sortOrder: (params.sortOrder as 'asc' | 'desc') || 'desc',
  };

  // Fetch users on server
  const result = await getAllUsers(queryParams);

  const users = result?.success ? (result.data || []) : [];
  const meta = result?.success ? (result.meta || { page: 1, limit: 14, total: 0 }) : { page: 1, limit: 14, total: 0 };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">View and manage all users in the system</p>
      </div>
      
      {!result?.success ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load users. Please try again later.</p>
        </div>
      ) : (
        <Suspense fallback={<div>Loading users table...</div>}>
          <UsersTable 
            users={users} 
            meta={meta} 
            searchParams={tableSearchParams}
          />
        </Suspense>
      )}
    </div>
  );
}
