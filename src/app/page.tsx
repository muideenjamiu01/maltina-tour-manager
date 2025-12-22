import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Maltina Tour</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/login"
                className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Educational Excellence Through{' '}
            <span className="text-primary">Innovation</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Maltina Tour connects schools with transformative educational
            experiences. Our comprehensive platform manages everything from
            school inspections to tour bookings, ensuring quality education
            delivery across all participating institutions.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/login"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Access Dashboard
            </Link>
            <Link
              href="#features"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-32">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Comprehensive Tour Management
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage educational tours and inspections
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-background/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">School Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Comprehensive directory and nomination system for educational
                  institutions.
                </p>
              </div>
              <div className="rounded-lg border bg-background/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">RECEE Inspections</h3>
                <p className="mt-2 text-muted-foreground">
                  Streamlined inspection processes and reporting for quality
                  assurance.
                </p>
              </div>
              <div className="rounded-lg border bg-background/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Tour Scheduling</h3>
                <p className="mt-2 text-muted-foreground">
                  Advanced booking system with calendar integration and slot
                  management.
                </p>
              </div>
              <div className="rounded-lg border bg-background/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Communication Hub</h3>
                <p className="mt-2 text-muted-foreground">
                  Integrated email and SMS systems for stakeholder engagement.
                </p>
              </div>
              <div className="rounded-lg border bg-background/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Analytics & Reports</h3>
                <p className="mt-2 text-muted-foreground">
                  Comprehensive reporting and analytics for data-driven
                  decisions.
                </p>
              </div>
              <div className="rounded-lg border bg-background/50 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">User Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Role-based access control for administrators and facilitators.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 Maltina Tour. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
