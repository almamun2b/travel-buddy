import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { Suspense } from "react";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<div className="h-14 w-full border-b bg-background" />}>
        <Navbar />
      </Suspense>
      <main className="min-h-dvh container mx-auto px-6">{children}</main>
      <Footer />
    </>
  );
}
