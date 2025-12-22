import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maltina Tour - Authentication',
  description: 'Login to access your Maltina Tour dashboard',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary">Maltina Tour</h1>
            <p className="mt-2 text-muted-foreground">
              Educational Excellence Through Innovation
            </p>
          </div>
          <div className="rounded-lg border bg-background/80 backdrop-blur-sm p-6 shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}