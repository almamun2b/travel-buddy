import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh container mx-auto px-6">{children}</main>
      <Footer />
    </>
  );
}
