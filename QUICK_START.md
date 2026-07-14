# MediGuide AI - Quick Start Guide

## 🚀 Start Development Server

### Option 1: Using NPM (Recommended)
```bash
cd "c:\Users\Usmani\Desktop\MediGuide AI"
npm run dev
```

Then open your browser to: **http://localhost:3000**

### Option 2: Using Batch File
Double-click this file in File Explorer:
```
c:\Users\Usmani\Desktop\MediGuide AI\start-dev.bat
```

### Option 3: Manual Steps
1. Open PowerShell or Command Prompt
2. Navigate to the project:
   ```
   cd "c:\Users\Usmani\Desktop\MediGuide AI"
   ```
3. Ensure dependencies are installed:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Wait for message: `Ready in XXXms`
6. Open browser to: `http://localhost:3000`

---

## 📍 What You'll See

### Home Page
- **Hero Section**: Welcome message with platform overview
- **Feature Cards**: 4 key features
  - ✓ AI-Powered Analysis
  - ✓ Emergency Detection
  - ✓ Medicine Marketplace
  - ✓ Multi-Language Support

### Header Navigation
- Logo with icon
- Navigation links: Home, Symptom Checker, Marketplace, About, Contact
- Language selector (EN, हिंदी, मराठी)
- Theme toggle (Light/Dark mode)
- Mobile hamburger menu (on small screens)

### Features Working
- [x] Responsive design (mobile-first)
- [x] Dark/Light theme toggle
- [x] Language selector (UI ready)
- [x] Smooth animations
- [x] Professional styling
- [x] Accessibility features

---

## 🔧 Other Available Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Check TypeScript
npm run type-check

# Format code
npm run format

# Run tests
npm run test

# Watch tests
npm run test:watch

# Database commands
npm run db:migrate    # Run migrations
npm run db:generate   # Generate Prisma client
npm run db:seed       # Seed database
npm run db:studio     # Open Prisma Studio
npm run db:reset      # Reset database
```

---

## ⚙️ Environment Setup

The project uses these environment variables (already configured):

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/mediguide_ai
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

To add Gemini API or Google OAuth, update `.env.local`:
```
NEXT_PUBLIC_GEMINI_API_KEY=your-api-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## 🐛 Troubleshooting

### Issue: Port 3000 already in use
```bash
# Find and kill the process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Dependencies not installed
```bash
npm install --legacy-peer-deps
```

### Issue: TypeScript errors
```bash
npm run type-check  # See all errors
```

### Issue: Database connection error
Make sure PostgreSQL is running and DATABASE_URL is correct in `.env.local`

---

## 📱 Testing Responsive Design

1. Open http://localhost:3000
2. Press F12 to open DevTools
3. Click the mobile device icon (top-left of DevTools)
4. Try different screen sizes:
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1920px (Full screen)

---

## 🎨 Theme Testing

1. Click the moon/sun icon in the top-right
2. Theme switches between light and dark
3. Preference is saved to browser localStorage

---

## 🌐 Language Testing

1. Click the language selector (top-right, shows "EN")
2. Select from English, हिंदी, or मराठी
3. UI state changes (full translation coming in Phase 2)

---

## 📊 Project Status

**Progress**: 7 of 71 tasks (9.8%)

**Completed:**
- ✅ Project foundation
- ✅ UI components
- ✅ Authentication setup
- ✅ Database schema

**Next:**
- 🔄 User registration
- 🔄 Profile management
- 🔄 Symptom checker
- 🔄 Emergency detection
- 🔄 Medicine marketplace

---

## 📚 Documentation

- **COMPLETION_STATUS.md** - Detailed status report
- **VISUAL_WALKTHROUGH.md** - UI and architecture guide
- **DATABASE.md** - Database schema details
- **PROJECT_STRUCTURE.md** - File organization

---

## 🆘 Need Help?

1. Check error messages in terminal running `npm run dev`
2. Review browser console (F12)
3. Check `.env.local` for missing configuration
4. Ensure Node.js v18+ is installed: `node --version`
5. Ensure npm is updated: `npm install -g npm@latest`

---

**Status**: Ready for localhost testing
**Last Updated**: 2024
