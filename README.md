# Maltina Tour - Educational Excellence Platform

A production-ready Next.js 15 application for managing educational tours, school inspections, and academic programs. Built with TypeScript, Tailwind CSS, and modern React patterns.

## 🚀 Features

- **🏫 School Management**: Comprehensive directory and nomination system
- **🔍 RECEE Inspections**: Quality assurance and reporting tools
- **📅 Tour Scheduling**: Advanced booking system with calendar integration
- **📧 Communication Hub**: Integrated email and SMS management
- **📊 Analytics & Reports**: Data-driven insights and reporting
- **👥 User Management**: Role-based access control
- **🎯 Campaign Management**: Academic year and target tracking
- **📱 Responsive Design**: Mobile-friendly interface

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (TanStack Query) v5
- **HTTP Client**: Axios with interceptors
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (admin)/           # Admin dashboard routes
│   ├── (user)/            # User portal routes
│   ├── api/               # API endpoints
│   └── not-found/         # 404 page
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── admin/             # Admin-specific components
│   ├── auth/              # Authentication components
│   └── landing/           # Landing page components
├── lib/                    # Utilities and configurations
│   ├── api/               # API client and endpoints
│   ├── hooks/             # Custom React Query hooks
│   ├── providers/         # React providers
│   └── validators/        # Zod validation schemas
├── types/                  # TypeScript type definitions
└── contexts/              # React contexts
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd maltina-tour
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🔐 Authentication

The app includes a complete authentication system with:

- **Login/Register**: Email and password authentication
- **JWT Tokens**: Access and refresh token management
- **Role-based Access**: Admin, User, Facilitator, Inspector roles
- **Protected Routes**: Automatic redirection based on authentication status

### Demo Credentials

```
Admin: admin@maltina.com / admin123
User: user@maltina.com / user123
```

## 🗂 Key Modules

### Campaign Management
- Academic year management
- Target setting and progress tracking
- Campaign locking mechanism

### Schools
- School directory and registration
- Nomination and invitation system
- Assignment planning

### RECEE Inspections
- Inspection control and scheduling
- Report generation
- Inspector management

### Scheduling & Booking
- Tour booking system
- Calendar integration
- Slot management

### Communication
- Email template management
- SMS integration
- Communication history

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Built-in dark mode capabilities
- **Accessible**: WCAG compliant components
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Comprehensive error boundaries
- **Toast Notifications**: User feedback system

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom color scheme:
- Primary: #F5A623 (Orange/Gold)
- Custom CSS variables for theming
- Responsive breakpoints and utilities

### React Query
Configured with:
- 1-minute stale time
- 5-minute cache time
- Automatic retry logic
- Background refetching

### Axios
Pre-configured with:
- Request/response interceptors
- Automatic token management
- Error handling and retry logic
- Request/response logging (development)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Ensure these are set in your production environment:
- `NEXT_PUBLIC_API_BASE_URL`
- `JWT_SECRET`
- `DATABASE_URL` (if using a database)

## 📚 API Documentation

The project includes mock API endpoints in `/src/app/api/`. For production, replace these with your actual backend API endpoints.

### Key Endpoints
- `POST /api/auth/login` - User authentication
- `GET /api/campaigns` - Campaign data
- `GET /api/schools` - School information
- `GET /api/inspections` - Inspection data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples in the codebase

---

Built with ❤️ using Next.js 15 and modern web technologies.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
