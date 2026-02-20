# 🚀 Quick Start Guide - Web Application

## ✅ What's Ready

Your web application is now a **full-stack application** with the following features:

- ✅ User Authentication (Register/Login)
- ✅ User Profiles
- ✅ Project Management (Create, Edit, Delete)
- ✅ Dashboard for users
- ✅ Protected Routes
- ✅ Supabase Integration

## 📋 Steps to Get Started

### Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for project to be ready
4. Go to **Settings > API**
5. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### Step 2: Configure Environment Variables

Edit `.env.local`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

### Step 3: Create Database Tables

Go to **SQL Editor** in Supabase and run:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  technologies TEXT[],
  live_link VARCHAR(500),
  github_link VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🎯 Test the Application

### 1. Create Account
- Click **"Sign Up"** in header
- Fill form with:
  - Email: `test@example.com`
  - Username: `testuser`
  - Full Name: `Test User`
  - Password: `secure123` (min 6 chars)

### 2. Login
- Email: `test@example.com`
- Password: `secure123`

### 3. Access Dashboard
- Click **"Dashboard"** in header
- Click **"Add New Project"**
- Fill in project details:
  - Title: `My First Project`
  - Description: `A cool project`
  - Technologies: `React, TypeScript`
  - Live Link: `https://example.com`
  - GitHub Link: `https://github.com/user/repo`

### 4. View Projects
- Projects appear on homepage
- Edit/Delete from Dashboard
- See them on Portfolio page

### 5. Logout
- Click **"Logout"** button

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          ← User dashboard
│   ├── ProjectManager.tsx     ← Project CRUD
│   ├── Login.tsx              ← Login page
│   ├── Register.tsx           ← Register page
│   ├── ProtectedRoute.tsx     ← Route protection
│   ├── Header.tsx             ← Updated header with auth
│   ├── ProjectsSection.tsx    ← Updated to show projects
│   └── ... (other components)
├── context/
│   └── AuthContext.tsx        ← Auth management
├── lib/
│   └── supabaseClient.ts      ← Supabase config
└── App.tsx                    ← Updated routing
```

---

## 🔑 Key Features

### Authentication
```typescript
import { useAuth } from '../context/AuthContext'

const { user, loading, signIn, signUp, signOut } = useAuth()
```

### Protected Routes
```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Database Operations
```typescript
// Get projects
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', user.id)
```

---

## 📚 Available Pages

| URL | Purpose |
|-----|---------|
| `/` | Home/Portfolio |
| `/register` | Create account |
| `/login` | Login page |
| `/dashboard` | Project management (Protected) |
| `/profile` | Edit user profile (Protected) |

---

## 🆘 Troubleshooting

**"Module not found Supabase"**
```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

**"Environment variables not loading"**
- Restart dev server
- Check `.env.local` format (must start with `VITE_`)

**"Can't login"**
- Verify `.env.local` has correct URLs
- Check Supabase project is active
- Ensure database tables are created

**"Projects not showing"**
- Check RLS policies are enabled
- Verify user is logged in
- Check console for SQL errors

---

## 🚀 Next Steps

1. ✅ **Customize styling** - Update CSS in `src/styles/`
2. ✅ **Add more fields** - Extend database schema
3. ✅ **Add profile picture** - Implement image upload
4. ✅ **Email verification** - Enable email confirmation
5. ✅ **Password reset** - Add forgot password flow

---

## 📖 Documentation

- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Supabase configuration details
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Complete development guide

---

**Happy coding!** 🎉 

If you have questions, check the docs or the code comments.
