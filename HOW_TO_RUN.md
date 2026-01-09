# How to Run the Website + Admin Project

## Project Architecture

Your project now has this structure:

```
Website Section     → Visitor landing pages, information (/)
Admin Section       → Authenticated dashboard (/dashboard, /operations, etc.)
Auth Section        → Login, register, forgot password (/login, /register)
API Routes          → Backend endpoints (/api/*)
```

## URLs & Navigation Map

### 🌐 Website URLs (Public)
- `/` - Homepage
- `/about` - About page
- `/features` - Features showcase
- `/pricing` - Pricing page
- `/contact` - Contact form

### 🔐 Auth URLs (Public, but leads to admin)
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password reset

### 🛠️ Admin URLs (Protected by authentication)
- `/dashboard` - Admin dashboard
- `/operations/booking-management` - Booking manager
- `/operations/cluster-management` - Cluster management
- `/communication/notification-automation` - Notifications
- `/user-management` - User management
- And more...

## Running the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="your_database_url"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Auth (if using NextAuth or similar)
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start at **http://localhost:3000**

### 4. Access in Browser
- **Website**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/dashboard (after login)

## File Structure Explained

```
src/
├── app/
│   ├── (website)/           ← Public website pages
│   │   ├── layout.tsx       ← Has navbar & footer
│   │   ├── page.tsx         ← Homepage (/)
│   │   └── ...
│   │
│   ├── (admin)/             ← Protected admin pages
│   │   ├── layout.tsx       ← Has sidebar & header
│   │   ├── dashboard/
│   │   │   └── page.tsx     ← Admin home
│   │   ├── operations/
│   │   ├── communication/
│   │   └── ...
│   │
│   ├── (auth)/              ← Auth pages
│   │   ├── layout.tsx       ← Minimal centered layout
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── api/                 ← API routes
│   │   ├── auth/
│   │   ├── user/
│   │   └── ...
│   │
│   └── layout.tsx           ← Root layout (global)
│
├── components/
│   ├── admin/               ← Admin-only components
│   ├── website/             ← Website-only components
│   └── ui/                  ← Shared UI components
│
└── ...
```

## Key Commands

```bash
# Development
npm run dev              # Start dev server on port 3000

# Build & Production
npm run build            # Build for production
npm start               # Start production server

# Linting & Type Checking
npm run lint            # Run ESLint

# Database (if using Prisma)
npx prisma migrate dev  # Run migrations
npx prisma studio      # Open Prisma Studio
```

## How Routing Works (Route Groups)

**Route groups** use parentheses `()` and are invisible to the URL:

| File Location | URL |
|---|---|
| `(website)/page.tsx` | `/` |
| `(website)/about/page.tsx` | `/about` |
| `(admin)/dashboard/page.tsx` | `/dashboard` |
| `(auth)/login/page.tsx` | `/login` |

The parentheses DON'T appear in the URL. They're just for organizing code!

## Layout Cascade

Each route group has its own `layout.tsx`:

```
Root Layout (app/layout.tsx)
    ↓
    ├→ Website Layout (app/(website)/layout.tsx)
    │   └→ Homepage, About, etc.
    │
    ├→ Admin Layout (app/(admin)/layout.tsx)
    │   └→ Dashboard, Reports, etc.
    │
    └→ Auth Layout (app/(auth)/layout.tsx)
        └→ Login, Register, etc.
```

## Navigation Between Sections

### Website to Admin
```tsx
import Link from 'next/link';

<Link href="/login">Go to Admin Login</Link>
```

### Admin to Website
```tsx
import Link from 'next/link';

<Link href="/">Back to Website</Link>
```

## Protecting Admin Routes

To protect `/dashboard` and other admin routes, add middleware:

Create `middleware.ts` in the root `src/` directory:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // If accessing admin routes without token, redirect to login
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/operations/:path*', '/communication/:path*', '/user-management/:path*'],
};
```

## Customization

### Change Homepage
- Edit: `src/app/(website)/page.tsx`

### Change Admin Dashboard
- Edit: `src/app/(admin)/dashboard/page.tsx`

### Change Login Page
- Edit: `src/app/(auth)/login/page.tsx`

### Change Navigation
- Website nav: Edit `src/app/(website)/layout.tsx`
- Admin sidebar: Edit `src/app/(admin)/layout.tsx`

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Environment Variables on Vercel
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all variables from `.env.local`

## Troubleshooting

### Port 3000 is already in use
```bash
npm run dev -- -p 3001
```
Then access at `http://localhost:3001`

### Changes not reflecting
1. Stop dev server (Ctrl+C)
2. Clear `.next` folder: `rm -rf .next`
3. Run `npm run dev` again

### Build errors
```bash
npm run build  # Check for errors
```

## Next Steps

1. ✅ Understand the folder structure
2. ✅ Run `npm run dev`
3. ✅ Visit http://localhost:3000
4. Add authentication (NextAuth or similar)
5. Connect database
6. Add API endpoints
7. Deploy to Vercel

## Support

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs
