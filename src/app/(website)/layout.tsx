import Footer from '@/components/website/layout/footer';
import Navbar from '@/components/website/layout/navbar';

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#ff9e16]">
        {children}
      </main>
      <Footer />
    </>
  );
}
