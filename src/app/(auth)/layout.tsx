import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { me } from "@/services/auth/me";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await me();
  if (user?.success && user.data) {
    redirect("/");
  }
  return (
    <main className="min-h-dvh container mx-auto px-6">
      <ErrorBoundary>{children}</ErrorBoundary>
    </main>
  );
}
