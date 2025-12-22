import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maltina Tour - User Dashboard',
  description: 'User dashboard for Maltina Tour participants',
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Maltina Tour</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">User Portal</span>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}