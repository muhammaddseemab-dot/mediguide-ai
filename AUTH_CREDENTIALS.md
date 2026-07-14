# Authentication System - Sign In & Sign Up

## Overview

Complete authentication system with sign-in and sign-up pages featuring test credentials for easy testing.

---

## Test Credentials

Use these credentials to sign in. Click on any credential card to auto-fill the form.

### 1. Regular User
```
Email: user@mediguide.com
Password: password123
Role: User
Name: John Doe
```

### 2. Admin User
```
Email: admin@mediguide.com
Password: admin123
Role: Admin
Name: Admin User
```

### 3. Doctor User
```
Email: doctor@mediguide.com
Password: doctor123
Role: Doctor
Name: Dr. Smith
```

---

## Pages Created

### 1. Sign In Page (`/signin`)
**URL:** http://localhost:3000/signin

**Features:**
- ✅ Email and password input
- ✅ Remember me checkbox
- ✅ Show/hide password toggle
- ✅ Test credentials display
- ✅ Click to auto-fill feature
- ✅ Form validation
- ✅ Error messages
- ✅ Sign up link
- ✅ Professional design

**Functionality:**
- Validates email and password
- Checks against test credentials
- Stores user session in localStorage
- Redirects based on user role:
  - Admin → `/admin` dashboard
  - Doctor → `/profile`
  - User → `/profile`

---

### 2. Sign Up Page (`/signup`)
**URL:** http://localhost:3000/signup

**Features:**
- ✅ Full name input
- ✅ Email input
- ✅ Phone number input
- ✅ Date of birth picker
- ✅ Gender selection
- ✅ Password input with strength info
- ✅ Confirm password input
- ✅ Terms and conditions checkbox
- ✅ Show/hide password toggles
- ✅ Form validation
- ✅ Error handling
- ✅ Success messages

**Functionality:**
- Validates all fields
- Checks for duplicate email
- Stores new user in localStorage
- Requires 6+ character password
- Must confirm password match
- Redirects to sign in after successful signup

---

## Updated Components

### Header (`components/layout/Header.tsx`)
**Enhanced Features:**
- ✅ Sign In / Sign Up buttons (when logged out)
- ✅ User dropdown menu (when logged in)
- ✅ User avatar with initials
- ✅ Logout functionality
- ✅ Quick access to profile and settings
- ✅ Admin dashboard link (admin only)
- ✅ Mobile responsive menu

**User Menu Shows:**
- User name and email
- User role
- Links to profile, settings, admin (if applicable)
- Logout button

---

## How to Test

### Test Sign In:

1. **Navigate to Sign In:**
   - Go to: http://localhost:3000/signin
   - Or click "Sign In" in header

2. **Auto-Fill Credentials:**
   - Scroll down to "Test Credentials"
   - Click on any user card
   - Form auto-fills with that user's credentials

3. **Sign In:**
   - Click "Sign In" button
   - See loading state for 1.5 seconds
   - Get redirected to appropriate page

4. **Verify Session:**
   - Header now shows user avatar
   - Click avatar to see user menu
   - Session persists on page refresh

---

### Test Sign Up:

1. **Navigate to Sign Up:**
   - Go to: http://localhost:3000/signup
   - Or click "Sign Up" in header

2. **Fill Form:**
   - Full Name: Your Name
   - Email: your@email.com
   - Phone: 9876543210
   - Date of Birth: Any date
   - Gender: Select option
   - Password: password123
   - Confirm Password: password123
   - Check "I agree to Terms"

3. **Create Account:**
   - Click "Sign Up" button
   - See success message
   - Auto-redirected to sign in after 2 seconds

4. **Sign In with New Account:**
   - Use the email and password you just created
   - Should successfully sign in

---

### Test User Menu:

1. **Sign In** with any test credential
2. **Look at Header:**
   - See user avatar with first initial
   - See user name on desktop
3. **Click Avatar:**
   - Dropdown menu appears
   - Shows name, email, role
   - Options: Profile, Settings, Admin (if admin)
4. **Click Logout:**
   - User session cleared
   - Redirected to home
   - Header shows Sign In / Sign Up buttons again

---

## Data Storage

### Sign In Session
Stored in localStorage at key: `currentUser`
```javascript
{
  email: "user@mediguide.com",
  name: "John Doe",
  role: "user",
  signedInAt: "2026-07-14T..."
}
```

### Remember Me
Stored at key: `rememberMe`
```javascript
{
  email: "user@mediguide.com"
}
```

### User Accounts (Sign Up)
Stored at key: `users` (as JSON array)
```javascript
[
  {
    id: "user_1234567890",
    fullName: "New User",
    email: "new@email.com",
    phone: "9876543210",
    dateOfBirth: "1990-01-01",
    gender: "male",
    password: "password123",
    role: "user",
    createdAt: "2026-07-14T...",
    verified: false
  }
]
```

---

## Features Summary

### Sign In Page
- Email/password authentication
- Test credential cards with click-to-fill
- Remember me functionality
- Password visibility toggle
- Error handling
- Professional gradient background
- Mobile responsive

### Sign Up Page
- Complete user registration form
- Form validation for all fields
- Duplicate email detection
- Password strength requirement
- Password confirmation
- Terms and conditions agreement
- Benefits showcase
- Professional design

### Header Integration
- Dynamic sign in/sign up buttons
- User avatar dropdown
- User info display
- Quick logout
- Admin dashboard access
- Mobile responsive

---

## Upcoming Features (Optional)

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Social login (Google, Facebook)
- [ ] Profile picture upload
- [ ] Account settings page
- [ ] User preferences
- [ ] Activity history
- [ ] Session management
- [ ] Remember me auto-fill

---

## Security Notes (Demo Only)

⚠️ **This is a demo implementation using localStorage**

For production, you should:
- Use a real backend authentication system
- Hash passwords before storage
- Use secure JWT tokens
- Implement HTTPS
- Use secure cookies
- Add rate limiting
- Implement CSRF protection
- Add email verification
- Use OAuth2 for external services

---

## Quick Links

- **Sign In:** http://localhost:3000/signin
- **Sign Up:** http://localhost:3000/signup
- **Profile:** http://localhost:3000/(dashboard)/profile
- **Settings:** http://localhost:3000/settings
- **Admin:** http://localhost:3000/admin

---

## Testing Credentials at a Glance

| Role | Email | Password | Access |
|------|-------|----------|--------|
| User | user@mediguide.com | password123 | Profile |
| Admin | admin@mediguide.com | admin123 | Admin Dashboard |
| Doctor | doctor@mediguide.com | doctor123 | Profile |

---

**Status: COMPLETE & WORKING** ✅

All authentication pages are fully functional and ready for testing!
