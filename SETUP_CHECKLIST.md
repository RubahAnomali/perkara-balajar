# ✅ SETUP CHECKLIST - Follow These Steps

## Phase 1: Environment Setup (5 minutes)

### Step 1: Verify Installation
- [ ] Node.js installed: `node --version` (should be 16+)
- [ ] npm installed: `npm --version` (should be 7+)
- [ ] Dependencies installed: `npm list | grep supabase`

If anything missing:
```bash
npm install @supabase/supabase-js --legacy-peer-deps
npm install
```

### Step 2: Create Supabase Account
- [ ] Go to https://supabase.com
- [ ] Click "Start your project"
- [ ] Sign up or login
- [ ] Create new organization
- [ ] Create new project
- [ ] Choose region (closest to you)
- [ ] Set password (keep safe!)
- [ ] Wait 2-5 minutes for creation

### Step 3: Get API Credentials
- [ ] In Supabase dashboard, go to **Settings > API**
- [ ] Copy **Project URL** (entire URL including domain)
- [ ] Copy **anon public** key (not service role!)
- [ ] Keep these safe - you'll use them next

### Step 4: Configure Environment Variables
- [ ] Open `.env.local` in project root
- [ ] Find these lines:
  ```
  VITE_SUPABASE_URL=
  VITE_SUPABASE_ANON_KEY=
  ```
- [ ] Paste your credentials:
  ```
  VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhb...your_key...
  ```
- [ ] Save file
- [ ] **IMPORTANT**: Restart dev server after this

---

## Phase 2: Database Setup (10 minutes)

### Step 5: Create Database Tables
- [ ] Go to Supabase dashboard
- [ ] Click **SQL Editor** in left sidebar
- [ ] Click **New Query**
- [ ] Copy and paste ALL of this SQL:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Create indexes for performance
CREATE INDEX projects_user_id_idx ON projects(user_id);
CREATE INDEX projects_created_at_idx ON projects(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
```

- [ ] Click **Run** or press `Ctrl+Enter`
- [ ] Wait for success message
- [ ] ✅ Tables created!

### Step 6: Create RLS Policies
- [ ] Same SQL Editor, click **New Query**
- [ ] Copy and paste ALL of this SQL:

```sql
-- Users table policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Projects table policies
CREATE POLICY "Anyone can read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

- [ ] Click **Run**
- [ ] Wait for success message
- [ ] ✅ Security policies created!

### Step 7: Verify Tables
- [ ] In Supabase, go to **Table Editor** (left sidebar)
- [ ] You should see two tables:
  - [ ] `users`
  - [ ] `projects`
- [ ] Click each to verify columns exist
- [ ] ✅ Database ready!

---

## Phase 3: Application Testing (10 minutes)

### Step 8: Start Development Server
```bash
npm run dev
```

- [ ] Wait for "Local: http://localhost:5173"
- [ ] Open browser to http://localhost:5173
- [ ] ✅ App loaded!

### Step 9: Test Registration
- [ ] Click **Sign Up** button in header
- [ ] Fill registration form:
  - Email: `test@example.com`
  - Username: `testuser`
  - Full Name: `Test User`
  - Password: `TestPass123!` (6+ chars)
  - Confirm: `TestPass123!`
- [ ] Click **Register**
- [ ] Should see success message
- [ ] ✅ Account created!

### Step 10: Test Login
- [ ] You should be redirected to login
- [ ] Email: `test@example.com`
- [ ] Password: `TestPass123!`
- [ ] Click **Login**
- [ ] Header should show **Dashboard** and **Logout** buttons
- [ ] ✅ Login works!

### Step 11: Test Dashboard
- [ ] Click **Dashboard** in header
- [ ] Should see "My Projects" title
- [ ] Click **Add New Project** button
- [ ] Form should appear

### Step 12: Create Test Project
- [ ] Title: `My Test Project`
- [ ] Description: `This is my first project`
- [ ] Image URL: Leave empty for now
- [ ] Technologies: `React, TypeScript`
- [ ] Live Link: `https://example.com`
- [ ] GitHub Link: `https://github.com/user/repo`
- [ ] Click **Create Project**
- [ ] Should see success message
- [ ] ✅ Project created!

### Step 13: Verify on Homepage
- [ ] Click home icon or go to `/`
- [ ] Scroll to **My Projects** section
- [ ] Your test project should appear!
- [ ] Click **Live Demo** and **GitHub** links work
- [ ] ✅ Data persisted!

### Step 14: Test Edit/Delete
- [ ] Go back to **Dashboard**
- [ ] Click **Edit** on your project
- [ ] Change title to `Updated Project`
- [ ] Click **Update Project**
- [ ] Verify on homepage updated
- [ ] Go back to Dashboard
- [ ] Click **Delete**
- [ ] Confirm deletion
- [ ] Verify removed from homepage
- [ ] ✅ CRUD works!

### Step 15: Test Profile
- [ ] In Dashboard, look for Profile link or click `/profile`
- [ ] Should see your email (read-only)
- [ ] Should see your username
- [ ] Should see your full name
- [ ] Change Full Name to something else
- [ ] Click **Update Profile**
- [ ] Should see success message
- [ ] ✅ Profile works!

### Step 16: Test Logout
- [ ] Click **Logout** button in header
- [ ] Should redirect to login
- [ ] Header should show **Login** and **Sign Up** buttons
- [ ] Try to navigate to `/dashboard`
- [ ] Should redirect back to login
- [ ] ✅ Protected routes work!

---

## Phase 4: Build & Verification (5 minutes)

### Step 17: Test Build
```bash
npm run build
```

- [ ] Wait for build to complete
- [ ] Should see "✓ built in X.XXs"
- [ ] No errors in output
- [ ] `dist` folder created
- [ ] ✅ Build successful!

### Step 18: Final Verification
- [ ] All tests in Phase 3 passed
- [ ] No console errors
- [ ] No broken links
- [ ] All routes work
- [ ] Database persists data
- [ ] ✅ Everything works!

---

## Phase 5: Next Steps

### What to Do Now

1. **Customize Your App** ✨
   - [ ] Update colors in `src/styles/global.css`
   - [ ] Change site name in `Header.tsx`
   - [ ] Add your own projects
   - [ ] Update About/Skills sections

2. **Optional Features** 🚀
   - [ ] Add email verification
   - [ ] Add password reset
   - [ ] Add profile picture upload
   - [ ] Add social login
   - [ ] Add more project fields

3. **Deploy to Production** 🌍
   - [ ] Choose hosting: Vercel, Netlify, etc.
   - [ ] Connect to GitHub
   - [ ] Set environment variables
   - [ ] Deploy!

4. **Learning** 📚
   - [ ] Read IMPLEMENTATION_GUIDE.md
   - [ ] Read ARCHITECTURE.md
   - [ ] Explore Supabase documentation
   - [ ] Start adding features!

---

## 🆘 Troubleshooting

### "Module cannot be found: @supabase/supabase-js"
```bash
npm install @supabase/supabase-js --legacy-peer-deps
npm run dev
```

### "Environment variables not loading"
- Check `.env.local` exists
- Verify `VITE_` prefix on variable names
- Restart dev server
- Check for typos in var names

### "Can't login - Wrong email/password"
- Verify credentials match what you registered
- Check Supabase project is active
- Make sure you're using the right database

### "Projects not showing on homepage"
- Verify projects created in Dashboard
- Check RLS policies are enabled
- Make sure user is logged in
- Check browser console for errors

### "Build fails"
- Run `npm install` to reinstall dependencies
- Clear node_modules and reinstall:
  ```bash
  rm -r node_modules
  npm install --legacy-peer-deps
  ```
- Check for TypeScript errors: `npm run build`

---

## ✅ Success Criteria

You're done when:

- ✅ Supabase project created
- ✅ API credentials in `.env.local`
- ✅ Database tables created
- ✅ RLS policies enabled
- ✅ Can register new account
- ✅ Can login with credentials
- ✅ Can create projects
- ✅ Projects appear on homepage
- ✅ Can edit and delete projects
- ✅ Can update profile
- ✅ Can logout
- ✅ Build passes with no errors
- ✅ All tests pass

---

## 📝 Notes

- Save your Supabase credentials somewhere safe
- Don't commit `.env.local` to Git (already in .gitignore)
- Test in private browser window to avoid cache issues
- Keep your Supabase project active (free tier is fine)
- Monitor your usage/database size

---

## 🎉 You're Ready!

Once all checks pass, your web application is:
- ✅ Fully functional
- ✅ Production-ready
- ✅ Secure
- ✅ Scalable

**Next**: Start customizing and building out more features!

---

**Questions?** Check the documentation files:
- QUICK_START.md
- IMPLEMENTATION_GUIDE.md
- ARCHITECTURE.md

**Happy coding!** 🚀
