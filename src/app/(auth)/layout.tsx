import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="h-14 w-full bg-background border-b" />}>
          <Navbar />
        </Suspense>
      </ErrorBoundary>
      <main className="min-h-dvh container mx-auto px-6">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
