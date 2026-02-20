# Foxxy.dev - Full Stack Portfolio Platform

> A modern, full-stack portfolio platform built with React, TypeScript, and Supabase. Create an account, manage your projects, and showcase your work with a beautiful, professional portfolio.

## 🚀 Quick Links

- ⚡ **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** ← **START HERE**
- 📖 **[QUICK_START.md](QUICK_START.md)** - Feature overview
- 📚 **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Developer guide
- 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design
- 📝 **[DEVELOPMENT_SUMMARY.md](DEVELOPMENT_SUMMARY.md)** - What's built

## ✨ Key Features

✅ User authentication (register/login)  
✅ Project management (create/edit/delete)  
✅ User profiles  
✅ Portfolio showcase  
✅ Database with Supabase  
✅ Row Level Security  
✅ Protected routes  

## 🏃 Quick Start (2 minutes)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

**Need setup help?** → [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

## 📋 Tech Stack

- React 18 + TypeScript
- Vite (fast build)
- React Router (navigation)
- Supabase (backend + database)
- PostgreSQL

## 📁 What's New

- ✨ 6 new authentication/admin components
- 🔐 Complete auth system
- 📦 Full database schema  
- 📚 Comprehensive documentation
- ✅ Production-ready code

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) | Step-by-step setup guide ⭐ |
| [QUICK_START.md](QUICK_START.md) | Feature overview |
| [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) | Complete dev guide |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design |
| [SUPABASE_SETUP.md](SUPABASE_SETUP.md) | Database setup |
| [DEVELOPMENT_SUMMARY.md](DEVELOPMENT_SUMMARY.md) | Summary of work |

## 🎯 Routes

```
Public:
  /              - Home page
  /login         - Login
  /register      - Sign up

Protected:
  /dashboard     - Manage projects
  /profile       - Edit profile
```

## 🆘 Troubleshooting

**Module not found:**
```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

**Env vars not loading:**
- Restart dev server
- Check variable names start with `VITE_`

**Can't login:**
- Verify `.env.local` has Supabase URLs
- Check database tables exist

**Projects not showing:**
- Verify RLS policies enabled
- Check browser console

## 📚 Learn More

- Read [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for complete setup
- See [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) for code examples
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design

## ✅ Status

- Build: ✅ Passing
- Components: ✅ 6 new components
- Database: ✅ Schema created
- Documentation: ✅ Comprehensive
- Ready for: ✅ Production deployment

---

**Start here:** [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)

**Questions?** Check the docs above
