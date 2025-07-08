# 🔐 BusTracker Authentication Setup Guide

## Overview
This guide will help you set up the authentication system for your BusTracker admin dashboard using Supabase Auth directly.

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

### 3. Authentication Setup

#### A. Create Admin User
1. Go to your Supabase Dashboard
2. Navigate to **Authentication > Users**
3. Click **"Add User"**
4. Enter your admin credentials:
   - Email: `admin@bustracker.com`
   - Password: `your-secure-password`
5. Set user as **confirmed**

#### B. Enable Email Auth
1. Go to Authentication > Settings in Supabase Dashboard
2. Enable "Enable email confirmations" (optional)
3. Configure email templates if needed

### 4. Database Setup (Optional)
Only create these tables if you need them for bus tracking:
```sql
-- Create terminals table
CREATE TABLE terminals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create routes table
CREATE TABLE routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  start_terminal_id UUID REFERENCES terminals(id),
  end_terminal_id UUID REFERENCES terminals(id),
  stops JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create buses table
CREATE TABLE buses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration VARCHAR(50) UNIQUE NOT NULL,
  total_seats INTEGER NOT NULL,
  occupied_seats INTEGER DEFAULT 0,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  terminal_id UUID REFERENCES terminals(id),
  route_id UUID REFERENCES routes(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Start Development
```bash
npm run dev
```

## 🔧 Features

### Authentication Features
- ✅ Email/Password authentication via Supabase Auth
- ✅ Session management with automatic persistence
- ✅ Loading states and error handling
- ✅ Secure password handling
- ✅ No custom database tables required

### Security Features
- ✅ Supabase Auth built-in security
- ✅ Environment variable protection
- ✅ Input validation
- ✅ Session timeout handling
- ✅ Clean error handling

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
- **AuthContext**: Simplified authentication state management
- **Protected Routes**: Automatic redirect for unauthenticated users

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use different keys for development/production
- Rotate keys regularly

### 2. Password Policy
- Use strong passwords
- Consider adding password reset functionality
- Enable email verification

### 3. Access Control
- All database operations require authentication
- Use Supabase Auth for user management
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
- Ensure user exists in Supabase Auth

#### 4. Loading loops
- ✅ **FIXED**: Removed custom admin_users table dependency
- ✅ **FIXED**: Simplified authentication to use Supabase Auth directly
- ✅ **FIXED**: Eliminated fetchAdminUser calls that caused loops

### Debug Mode
Add this to your `.env` file for debugging:
```env
VITE_DEBUG=true
```

## 📝 API Reference

### AuthContext Methods
```typescript
const { 
  user,           // Current user object from Supabase Auth
  session,        // Current session
  loading,        // Loading state
  signIn,         // Sign in function
  signOut         // Sign out function
} = useAuth();
```

### Database Tables (Optional)
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