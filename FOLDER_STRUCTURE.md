# Maltina Tour Manager - Project Structure Guide

## Overview
This is a Next.js 15 application with two main sections:
1. **Website** - Public landing pages and information (route group: `(website)`)
2. **Admin** - Admin dashboard and management tools (route group: `(admin)`)
3. **Auth** - Authentication pages (route group: `(auth)`)

## Routing Explained

### Route Groups in Next.js
Route groups use parentheses `()` and **don't affect the URL**. They're purely organizational.

| File Path | URL Path |
|-----------|----------|
| `(website)/page.tsx` | `/` |
| `(website)/about/page.tsx` | `/about` |
| `(website)/pricing/page.tsx` | `/pricing` |
| `(admin)/dashboard/page.tsx` | `/dashboard` |
| `(admin)/operations/booking-management/page.tsx` | `/operations/booking-management` |
| `(auth)/login/page.tsx` | `/login` |
| `(auth)/register/page.tsx` | `/register` |

### Layout Hierarchy
```
app/
├── layout.tsx               ← Root layout (applies to ALL pages)
│   ├── (website)/layout.tsx ← Website-specific layout
│   │   └── page.tsx         ← Homepage
│   ├── (admin)/layout.tsx   ← Admin-specific layout (sidebar, header)
│   │   └── dashboard/page.tsx
│   └── (auth)/layout.tsx    ← Auth-specific layout
│       └── login/page.tsx
```

## Folder Structure

```
src/
├── app/
│   ├── (website)/
│   │   ├── layout.tsx                 # Navbar, footer, website-specific styling
│   │   ├── page.tsx                   # Homepage (/)
│   │   ├── about/
│   │   │   └── page.tsx               # /about
│   │   ├── features/
│   │   │   └── page.tsx               # /features
│   │   ├── pricing/
│   │   │   └── page.tsx               # /pricing
│   │   └── components/                # Website-only components
│   │       ├── HeroSection.tsx
│   │       ├── FeatureCard.tsx
│   │       └── PricingTable.tsx
│   │
│   ├── (admin)/
│   │   ├── layout.tsx                 # Sidebar, admin header, admin styling
│   │   ├── dashboard/
│   │   │   └── page.tsx               # /dashboard (admin home)
│   │   ├── operations/
│   │   │   ├── booking-management/
│   │   │   ├── cluster-management/
│   │   │   ├── campaign-management/
│   │   │   └── ...
│   │   ├── communication/
│   │   │   ├── notification-automation/
│   │   │   ├── emails-sent/
│   │   │   ├── sms-sent/
│   │   │   └── ...
│   │   ├── user-management/
│   │   ├── reports-analytics/
│   │   ├── competition/
│   │   └── settings/
│   │
│   ├── (auth)/
│   │   ├── layout.tsx                 # Centered, minimal auth layout
│   │   ├── login/
│   │   │   └── page.tsx               # /login
│   │   ├── register/
│   │   │   └── page.tsx               # /register
│   │   └── forgot-password/
│   │       └── page.tsx               # /forgot-password
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── roles-permissions/
│   │   ├── user-accounts/
│   │   └── ...
│   │
│   ├── layout.tsx                     # Root layout (global)
│   ├── page.tsx                       # Redirect logic
│   ├── error.tsx
│   ├── loading.tsx
│   ├── globals.css
│   └── not-found/
│
├── components/
│   ├── admin/                         # Admin-only components
│   │   ├── admin-header.tsx
│   │   ├── sidebar/
│   │   ├── modals/
│   │   └── ...
│   ├── website/                       # Website-only components
│   │   ├── HeroSection.tsx
│   │   ├── FeatureCard.tsx
│   │   └── ...
│   └── ui/                            # Shared UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
│
├── contexts/
│   └── auth-context.tsx
│
├── hooks/
│   ├── use-auth.ts
│   ├── use-toast.ts
│   └── ...
│
├── lib/
│   ├── api/
│   ├── hooks/
│   ├── providers/
│   └── validators/
│
└── types/
    └── *.types.ts
```

## Running the Application

### Development
```bash
npm run dev
```
- Website: http://localhost:3000
- Admin: http://localhost:3000/dashboard (if authenticated)
- Login: http://localhost:3000/login

### Production Build
```bash
npm run build
npm run start
```

## Key Files Setup

### 1. Root Layout (`app/layout.tsx`)
- Global styles (Tailwind, fonts)
- Global providers (React Query, Auth Context)
- Applies to ALL routes

### 2. Website Layout (`app/(website)/layout.tsx`)
- Navigation bar
- Footer
- Website-specific styles (light theme, marketing design)
- Does NOT include sidebar or admin elements

### 3. Admin Layout (`app/(admin)/layout.tsx`)
- Admin header
- Sidebar with navigation
- Admin-specific styling
- Authentication protection (redirect to login if not authenticated)

### 4. Auth Layout (`app/(auth)/layout.tsx`)
- Centered, minimal design
- No sidebar or header
- Login/registration specific styling

## Navigation Examples

### From Website to Admin
```tsx
// In website component
import Link from 'next/link';

export default function WebsiteNav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/login">Admin Login</Link>
    </nav>
  );
}
```

### From Admin to Website
```tsx
// In admin component
import Link from 'next/link';

export default function AdminNav() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/">Back to Website</Link>
    </nav>
  );
}
```

## Environment & Configuration

### .env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your_database_url
```

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Add image optimization for website images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
```

## Best Practices

1. **Keep Layouts Specific**
   - Website layout: Navigation, footer, marketing design
   - Admin layout: Sidebar, admin header, data management design
   - Auth layout: Minimal, centered

2. **Reuse Components**
   - `components/ui/` for shared components (Button, Card, Dialog, etc.)
   - `components/admin/` for admin-only components
   - `components/website/` for website-only components

3. **Protect Admin Routes**
   - Add authentication middleware
   - Redirect to `/login` if not authenticated

4. **Asset Organization**
   - `/public/website/` for website images
   - `/public/admin/` for admin images
   - `/public/logos/` for shared logos

5. **Styling**
   - Global styles in `globals.css`
   - Component-scoped styles with Tailwind CSS
   - Theme variables if needed

## Migration from Old Structure

If you have old files in `(user)/` route group, you can:
1. Move them into `(website)/` if they're public pages
2. Move them into `(admin)/` if they're user dashboards
3. Or keep `(user)/` as a separate section for user-only pages

## Next Steps

1. ✅ Understand the folder structure
2. Create `/app/(website)/layout.tsx` with navbar/footer
3. Move landing page to `/app/(website)/page.tsx`
4. Ensure `/app/(admin)/layout.tsx` has sidebar
5. Test routing: `/`, `/about`, `/dashboard`, `/login`
6. Add authentication middleware
7. Deploy to Vercel
