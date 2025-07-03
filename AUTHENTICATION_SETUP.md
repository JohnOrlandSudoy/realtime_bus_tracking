# 🔐 BusTracker Authentication Setup Guide

## Overview
This guide will help you set up the authentication system for your BusTracker admin dashboard using Supabase.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup

#### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

#### B. Environment Variables
Create a `.env` file in your project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

#### A. Run Migrations
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref your-project-ref`
4. Run migrations: `supabase db push`

#### B. Manual Setup (Alternative)
If you prefer to run SQL manually:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the migration files in order:
   - `20250606054254_flat_coral.sql` (existing tables)
   - `20250606054255_auth_system.sql` (new auth system)

### 4. Authentication Configuration

#### A. Enable Email Auth
1. Go to Authentication > Settings in Supabase Dashboard
2. Enable "Enable email confirmations" (optional)
3. Configure email templates if needed

#### B. Default Admin Account
The migration creates a default admin account:
- **Email**: `admin@bustracker.com`
- **Password**: `admin123`

⚠️ **Important**: Change this password after first login!

### 5. Start Development
```bash
npm run dev
```

## 🔧 Features

### Authentication Features
- ✅ Email/Password authentication
- ✅ User registration and login
- ✅ Session management
- ✅ Role-based access (admin/super_admin)
- ✅ Secure password handling
- ✅ Loading states and error handling

### Security Features
- ✅ Row Level Security (RLS) enabled
- ✅ Admin-only access to all tables
- ✅ Automatic user profile creation
- ✅ Login tracking
- ✅ Session management

### UI Features
- ✅ Premium pink/white design
- ✅ Responsive layout
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error/success messages
- ✅ Password visibility toggle

## 🎨 Design System

### Color Palette
- **Primary Pink**: `#E23A7B` (busPink)
- **Accent Pink**: `pink-400`
- **White**: Clean backgrounds
- **Gray**: Text and borders

### Components
- **LoginPage**: Premium authentication interface
- **AuthContext**: Authentication state management
- **Protected Routes**: Automatic redirect for unauthenticated users

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use different keys for development/production
- Rotate keys regularly

### 2. Password Policy
- Implement strong password requirements
- Consider adding password reset functionality
- Enable email verification

### 3. Access Control
- All database operations require authentication
- Admin users only can access the system
- Session timeout handling

## 🚨 Troubleshooting

### Common Issues

#### 1. "Missing Supabase environment variables"
- Check your `.env` file exists
- Verify variable names are correct
- Restart your development server

#### 2. "Cannot find module '@supabase/supabase-js'"
- Run `npm install` to install dependencies
- Check package.json includes the dependency

#### 3. Authentication errors
- Verify Supabase project URL and key
- Check email/password format
- Ensure user exists in database

#### 4. Database connection issues
- Verify Supabase project is active
- Check RLS policies are correctly applied
- Ensure migrations ran successfully

### Debug Mode
Add this to your `.env` file for debugging:
```env
VITE_DEBUG=true
```

## 📝 API Reference

### AuthContext Methods
```typescript
const { 
  user,           // Current user object
  adminUser,      // Extended admin profile
  session,        // Current session
  loading,        // Loading state
  signIn,         // Sign in function
  signOut,        // Sign out function
  signUp          // Sign up function
} = useAuth();
```

### Database Tables
- `admin_users`: Extended user profiles
- `terminals`: Bus terminals/stops
- `routes`: Bus routes
- `buses`: Fleet vehicles

## 🔄 Next Steps

### Recommended Enhancements
1. **Password Reset**: Add forgot password functionality
2. **Email Verification**: Require email confirmation
3. **Two-Factor Auth**: Add 2FA for enhanced security
4. **User Management**: Admin panel for user management
5. **Audit Logs**: Track user actions
6. **Session Management**: Advanced session controls

### Production Deployment
1. Set up production Supabase project
2. Configure custom domain
3. Set up SSL certificates
4. Configure backup strategies
5. Monitor performance and errors

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Check browser console for errors
4. Verify all environment variables are set

---

**Happy coding! 🚌✨** 