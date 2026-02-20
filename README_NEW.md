# Foxxy.dev - Full Stack Portfolio Platform

> A modern, full-stack portfolio platform built with React, TypeScript, and Supabase. Create an account, manage your projects, and showcase your work with a beautiful, professional portfolio.

## 🚀 Quick Links

- ⚡ **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** ← **START HERE** (Step-by-step setup)
- 📖 **[QUICK_START.md](QUICK_START.md)** - Quick overview and features
- 📚 **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Complete developer guide
- 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and data flow
- 📝 **[DEVELOPMENT_SUMMARY.md](DEVELOPMENT_SUMMARY.md)** - What's been implemented
- 🔧 **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Database configuration

## ✨ Features

### 🔐 Authentication
- User registration with email/password
- Secure login with session management
- Logout functionality
- Protected routes and pages
- Session persistence

### 📁 Project Management
- **Create** new projects with full details
- **Read** all your projects in one place
- **Update** project information anytime
- **Delete** projects you no longer need
- Rich project metadata (tech stack, links, images)

### 👤 User Profiles
- Create user profile during registration
- View and edit profile information
- Manage account settings
- User data persisted to Supabase

### 🌐 Portfolio Display
- Beautiful portfolio homepage
- Showcase all your projects
- Display project details (images, links, tech stack)
- Real-time updates from database
- Default projects + user projects

### 🛡️ Security
- Row Level Security (RLS) on database
- Protected routes on frontend
- Secure authentication via Supabase Auth
- Input validation and error handling
- No exposed credentials

## 📊 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Router** - Page navigation
- **CSS** - Styling

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication service
  - Real-time database
  - Row Level Security

### DevOps
- **Node.js** - Runtime
- **npm** - Package manager
- **Git** - Version control

## 📋 Prerequisites

- Node.js 16+ ([download](https://nodejs.org/))
- npm 7+ (comes with Node.js)
- Supabase account ([free signup](https://supabase.com))
- Text editor (VS Code recommended)

## 🏃 Getting Started (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env.local` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for detailed setup.

### 3. Create Database Tables
Run SQL queries in Supabase SQL Editor:
- Create `users` table
- Create `projects` table  
- Enable Row Level Security policies

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for SQL.

### 4. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173`

### 5. Test the App
- Register account: `/register`
- Login: `/login`
- Dashboard: `/dashboard`
- Create projects
- View on homepage: `/`

**For complete setup instructions**, see [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # User dashboard
│   ├── ProjectManager.tsx     # Project CRUD
│   ├── UserProfile.tsx        # Profile editor
│   ├── Login.tsx              # Login form
│   ├── Register.tsx           # Registration form
│   ├── ProtectedRoute.tsx     # Route protection
│   ├── Header.tsx             # Navigation with auth
│   ├── ProjectsSection.tsx    # Display projects
│   └── ... (other components)
├── context/
│   └── AuthContext.tsx        # Authentication state
├── lib/
│   └── supabaseClient.ts      # Supabase setup
├── styles/
│   └── global.css             # Global styles
└── App.tsx                    # Main app with routing
```

## 🎯 Available Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Home/Portfolio page |
| `/register` | Public | Create new account |
| `/login` | Public | Login page |
| `/dashboard` | Protected | Manage projects |
| `/profile` | Protected | Edit profile |

## 🔧 Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📚 Documentation

### For Getting Started
1. **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Step-by-step setup guide ⭐
2. **[QUICK_START.md](QUICK_START.md)** - Quick overview

### For Learning
3. **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Developer guide
4. **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design

### For Reference
5. **[DEVELOPMENT_SUMMARY.md](DEVELOPMENT_SUMMARY.md)** - What's implemented
6. **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Database configuration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Creates optimized `dist/` folder ready to deploy.

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy with one click

### Deploy to Netlify
1. Build locally: `npm run build`
2. Deploy `dist/` folder to Netlify
3. Configure environment variables

## 🆘 Need Help?

### Common Issues

**"Environment variables not loading"**
- Update `.env.local`
- Restart dev server
- Variables must start with `VITE_`

**"Can't login"**
- Verify `.env.local` has correct URLs
- Check Supabase project is active
- Ensure database tables exist

**"Projects not showing"**
- Verify RLS policies are created
- Check user is logged in
- Review browser console for errors

**"Build fails"**
- Run `npm install` again
- Clear node_modules: `rm -r node_modules && npm install`
- Check TypeScript errors: `npm run build`

### Getting More Help

1. Check relevant documentation file
2. Review code comments in components
3. Check browser developer console
4. Review Supabase dashboard
5. See [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)

## 🎓 Learning Path

1. **Start**: [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Get it running
2. **Explore**: [QUICK_START.md](QUICK_START.md) - Try features
3. **Understand**: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Learn how
4. **Deep Dive**: [ARCHITECTURE.md](ARCHITECTURE.md) - System design
5. **Build**: Create new features with what you've learned

## ✨ Key Features Implemented

### Authentication System ✅
- User registration with validation
- Secure login with JWT tokens
- Session management
- Protected routes
- Logout functionality

### Project Management ✅
- Full CRUD operations
- Form validation
- Error handling
- Real-time updates
- Project display on homepage

### User Profiles ✅
- View user information
- Edit profile details
- Data persistence
- User preferences

### Frontend ✅
- Responsive design
- Loading states
- Error messages
- Smooth navigation
- Beautiful UI

### Backend ✅
- PostgreSQL database
- Row Level Security
- Real-time capabilities
- Scalable architecture
- Secure by default

## 🔐 Security Features

✅ **Authentication**
- Supabase Auth (OAuth ready)
- Secure passwords (hashed)
- JWT session tokens
- Automatic logout

✅ **Authorization**
- Row Level Security (RLS)
- Protected routes
- User-specific data access
- Frontend validation

✅ **Data Protection**
- Encrypted credentials
- HTTPS-only
- Foreign key constraints
- Input validation

## 📈 Performance

- Fast build times (~4 seconds)
- Code splitting & lazy loading
- Optimized bundle size (~219KB)
- Database indexes for speed
- Responsive design
- PWA support

## 🤝 Contributing

This is your custom application. Feel free to:
- Add new features
- Modify the design
- Extend the database schema
- Customize components
- Deploy and share

## 📄 License

This project is yours to use and modify as you see fit.

## 🎉 Next Steps

1. Read [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
2. Setup Supabase project
3. Configure environment variables
4. Create database tables
5. Run `npm run dev`
6. Test all features
7. Customize as needed
8. Deploy to production

## 💡 Tips

- Keep `.env.local` safe (don't commit it)
- Test in incognito mode to avoid cache issues
- Join Supabase community for help
- Keep dependencies updated
- Monitor database usage on free tier

## 📞 Support Resources

- [Supabase Docs](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Ready to get started?** → [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

**Questions?** → Check the documentation files above

**Build status**: ✅ Passing  
**Last updated**: February 20, 2026  
**Version**: 1.0.0  

---

Made with ❤️ using React, TypeScript, and Supabase

**Let's build something awesome!** 🚀
