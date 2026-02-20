# Supabase Integration Guide

## 1. Setup Supabase Project

### Membuat Project di Supabase
1. Pergi ke [supabase.com](https://supabase.com)
2. Login atau buat akun baru
3. Klik "New Project"
4. Isi nama project dan password
5. Tunggu project berhasil dibuat

### Dapatkan Credentials
1. Pergi ke `Settings > API`
2. Copy `Project URL` dan `anon public` key
3. Simpan di `.env.local` Anda:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

## 2. Create Database Tables

Di Supabase SQL Editor, jalankan queries berikut:

### Tabel Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabel Projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  technologies TEXT[], -- Array of tech stack
  live_link VARCHAR(500),
  github_link VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX projects_user_id_idx ON projects(user_id);
```

### Tabel Skills (Optional)
```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  level VARCHAR(20), -- Beginner, Intermediate, Advanced
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX skills_user_id_idx ON skills(user_id);
```

## 3. Enable RLS (Row Level Security)

Untuk keamanan, enable RLS on all tables:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users dapat membaca own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users dapat update own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users dapat membaca all projects
CREATE POLICY "Anyone can read projects" ON projects
  FOR SELECT USING (true);

-- Users dapat insert projects milik mereka
CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users dapat update projects milik mereka
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

-- Users dapat delete projects milik mereka
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

## 4. Environment Variables

Update `.env.local` dengan kredensial Supabase Anda:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Testing

### Login/Register Pages
- Akses `http://localhost:5173/register` untuk membuat akun baru
- Akses `http://localhost:5173/login` untuk login
- Setelah login, Anda akan redirect ke homepage

### Fitur yang Tersedia
- **AuthContext**: Manage authentication state di seluruh app
- **useAuth hook**: Hook untuk akses user dan auth functions
- **Login Component**: Form login dengan validasi
- **Register Component**: Form register dengan validasi password

## 6. Menggunakan Auth dalam Components

```typescript
import { useAuth } from '../context/AuthContext'

export function MyComponent() {
  const { user, session, signOut, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please login</div>

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}
```

## 7. Protected Routes (Optional)

Untuk membuat protected route:

```typescript
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return children
}

// Usage in App.tsx:
// <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

## 8. Common Tasks

### Menyimpan Project Baru
```typescript
const { user } = useAuth()

const { data, error } = await supabase.from('projects').insert([
  {
    user_id: user.id,
    title: 'My Project',
    description: 'Project description',
    technologies: ['React', 'TypeScript'],
    live_link: 'https://example.com',
    github_link: 'https://github.com/user/repo'
  }
])
```

### Mengambil Projects User
```typescript
const { data: projects } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', user.id)
```

### Update User Profile
```typescript
const { data, error } = await supabase
  .from('users')
  .update({ full_name: 'New Name' })
  .eq('id', user.id)
```

## Error Handling

All auth functions throw errors that you can catch:

```typescript
try {
  await signIn(email, password)
} catch (error) {
  console.error('Login failed:', error.message)
  setError(error.message)
}
```

## Troubleshooting

### Environment Variables Not Loading
- Pastikan file `.env.local` ada di root project
- Restart dev server setelah update `.env.local`
- Format harus `VITE_` untuk diakses di frontend

### CORS Errors
- Supabase sudah configure CORS untuk projects Anda
- Jika error, check Settings > API > CORS di Supabase

### Authentication Not Working
- Verify credentials di `.env.local`
- Check email confirmation setting di Supabase Auth
- Review RLS policies jika query tidak return data

---

**Selamat menggunakan Supabase!** Jika ada pertanyaan atau masalah, beri tahu saya! 🚀
