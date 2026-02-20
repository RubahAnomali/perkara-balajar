# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React + TS)                │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Application Routes (App.tsx)         │  │
│  │  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │ Public Pages │  │ Protected     │              │  │
│  │  │ - Login      │  │ Pages         │              │  │
│  │  │ - Register   │  │ - Dashboard   │              │  │
│  │  │ - Home       │  │ - Profile     │              │  │
│  │  └──────────────┘  └──────────────┘              │  │
│  └───────────────────────────────────────────────────┘  │
│                          ↓                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Authentication Context (AuthContext)     │  │
│  │  ┌──────────────────────────────────────────┐   │  │
│  │  │ useAuth Hook                             │   │  │
│  │  │ - user                                   │   │  │
│  │  │ - loading state                          │   │  │
│  │  │ - signUp, signIn, signOut                │   │  │
│  │  └──────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────┘  │
│                          ↓                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │      Supabase Client (supabaseClient.ts)        │  │
│  │  - Authentication                               │  │
│  │  - Database queries                             │  │
│  │  - Real-time subscriptions                      │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Supabase Backend (Cloud)               │
│  ┌───────────────────────────────────────────────────┐  │
│  │         PostgreSQL Database                       │  │
│  │  ┌──────────────┐     ┌──────────────┐          │  │
│  │  │ users table  │     │ projects     │          │  │
│  │  │ - id         │     │ table        │          │  │
│  │  │ - email      │     │ - id         │          │  │
│  │  │ - username   │     │ - user_id    │          │  │
│  │  │ - full_name  │     │ - title      │          │  │
│  │  │ - created_at │     │ - description│          │  │
│  │  └──────────────┘     │ - technologies           │  │
│  │                        │ - links                  │  │
│  │                        └──────────────┘          │  │
│  └───────────────────────────────────────────────────┘  │
│                          ↓                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Authentication (Supabase Auth Service)          │  │
│  │  - User registration                             │  │
│  │  - Login/Session management                      │  │
│  │  - JWT tokens                                    │  │
│  │  - Row Level Security enforcement                │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Registration Flow
```
User fills Register Form
        ↓
    signUp() called
        ↓
Supabase Auth service
        ↓
Create auth.users entry
        ↓
Create public.users record
        ↓
Store credentials securely
        ↓
Login automatic/Redirect to login
```

### Login Flow
```
User enters credentials
        ↓
    signIn() called
        ↓
Supabase Auth validates
        ↓
JWT token issued
        ↓
AuthContext updated
        ↓
Route guards check authentication
        ↓
Access protected pages
```

### Project Management Flow
```
User in Dashboard
        ↓
Project Manager Component
        ↓
Form submission
        ↓
Insert/Update/Delete project
        ↓
Supabase handles RLS
        ↓
Database updated
        ↓
UI refreshes
        ↓
Projects visible on homepage
```

---

## Component Hierarchy

```
App
├── Routes
│   ├── Login (public)
│   ├── Register (public)
│   ├── Home (public)
│   │   ├── Header (with auth buttons)
│   │   ├── Hero
│   │   ├── ProjectsSection (fetches from Supabase)
│   │   ├── SkillsSection
│   │   ├── AboutSection
│   │   ├── ContactSection
│   │   └── Footer
│   ├── Dashboard (protected)
│   │   ├── Header
│   │   └── ProjectManager
│   │       ├── Form
│   │       └── Project Cards
│   └── Profile (protected)
│       ├── Header
│       └── UserProfile
│           ├── Info Display
│           └── Edit Form
```

---

## Authentication State Management

### AuthContext provides:
```typescript
{
  user: User | null           // Current logged-in user
  session: Session | null     // Current session
  loading: boolean            // Loading state
  
  signUp(email, password, userData)
  signIn(email, password)
  signOut()
}
```

### ProtectedRoute component:
```
Check loading state
    ↓
Check if user exists
    ↓
If no user: redirect to /login
    ↓
If user: render protected component
```

---

## Database Schema

### users table
```sql
- id (UUID, PK) → References auth.users(id)
- email (VARCHAR, UNIQUE) → From Auth
- username (VARCHAR, UNIQUE) → User input
- full_name (VARCHAR) → User input
- created_at (TIMESTAMP) → Auto
- updated_at (TIMESTAMP) → Auto RLS
```

### projects table
```sql
- id (UUID, PK) → Default gen_random_uuid()
- user_id (UUID, FK) → References users(id)
- title (VARCHAR) → Project name
- description (TEXT) → Project details
- image_url (VARCHAR) → Project thumbnail
- technologies (TEXT[]) → Array of tech stack
- live_link (VARCHAR) → Demo URL
- github_link (VARCHAR) → Repo URL
- created_at (TIMESTAMP) → Auto
- updated_at (TIMESTAMP) → Auto
```

---

## Security Features

### Row Level Security (RLS)
```sql
-- Users can only read own data
SELECT ✓ (auth.uid() = id)
UPDATE ✓ (auth.uid() = id)

-- Anyone can view projects
SELECT ✓ (true)

-- Only owner can modify
INSERT ✓ (auth.uid() = user_id)
UPDATE ✓ (auth.uid() = user_id)
DELETE ✓ (auth.uid() = user_id)
```

### Frontend Protection
- Protected routes redirect unauthorized users
- Session tokens automatically managed
- Credentials never exposed in client code
- API keys are public (anon key only)

### Backend Security
- Database enforced (RLS policies)
- Foreign key constraints
- Data validation
- HTTPS only

---

## Error Handling

### Authentication Errors
```typescript
try {
  await signIn(email, password)
} catch (error) {
  // Handle: user not found, wrong password, etc.
  setError(error.message)
}
```

### Database Errors
```typescript
try {
  const { data, error } = await supabase
    .from('projects')
    .insert([{ ... }])
  
  if (error) {
    // Handle: RLS violation, validation, etc.
    throw error
  }
} catch (error) {
  console.error(error)
}
```

---

## Performance Optimizations

1. **Code Splitting**
   - Lazy load route components
   - Suspense boundaries for sections

2. **Database Queries**
   - Only fetch needed columns
   - Use indexes for filtering
   - Pagination for large datasets

3. **Real-time Updates**
   - Supabase real-time subscriptions
   - Optimistic UI updates
   - Debounced search/filters

4. **Caching**
   - Browser cache headers
   - Local state management
   - Memoized components

---

## Typical User Journey

```
1. Landing Page
   ↓ (not logged in)
2. Click "Sign Up"
   ↓
3. Register Form
   - Email, username, name, password
   ↓
4. Account Created
   - Email should be verified (if enabled)
   ↓
5. Redirect to Login
   ↓
6. Enter Credentials
   ↓
7. Authenticated
   - Session token issued
   ↓
8. Dashboard Available
   - Click "Dashboard" in header
   ↓
9. Project Management
   - Add new projects
   - See in portfolio
   - Edit/Delete existing
   ↓
10. Profile Page
    - Update info
    ↓
11. Logout
    - Session cleared
    - Redirect to login
```

---

## Deployment Considerations

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, etc.
- Environment variables in deployment panel

### Backend
- Supabase handles hosting
- Database backups automatic
- Scaling handled by Supabase
- SSL/HTTPS included

### Testing
- Test with different user accounts
- Test RLS policies
- Test error states
- Test protected routes

---

**This architecture ensures:**
- ✅ Security (RLS, tokens, validation)
- ✅ Scalability (Supabase infrastructure)
- ✅ Maintainability (Clear separation)
- ✅ User Experience (Fast, responsive)
