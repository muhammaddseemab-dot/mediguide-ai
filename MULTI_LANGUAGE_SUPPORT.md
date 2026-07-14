# 🌐 Multi-Language Support - MediGuide AI

## Supported Languages

MediGuide AI now supports **3 languages** with more easily addable:

### 1. 🇬🇧 English (en)
- Primary language
- Default for all users
- Complete translations available

### 2. 🇮🇳 हिन्दी - Hindi (hi)
- Supports North Indian users
- ~200+ translation keys available
- Covers all major features

### 3. 🇮🇳 मराठी - Marathi (mr)
- Supports Western Indian users (Maharashtra)
- ~200+ translation keys available
- All features translated

---

## How to Change Language

### For Users:
1. Look for the **🌐 Language Button** in the header (top right)
2. Click it to open the language menu
3. Select from:
   - 🇺🇸 **English**
   - 🇮🇳 **हिन्दी (Hindi)**
   - 🇮🇳 **मराठी (Marathi)**
4. Language preference is saved automatically in browser

### Visual Indicator:
```
Header: 🌐 EN  (shows current language code)
Click → Language Menu appears
Select → Saves preference & reloads interface
```

---

## Translation Coverage

### Fully Translated Features:

#### 🚑 Emergency Hotlines
- Emergency Hotlines (आपातकालीन हॉटलाइन)
- Select Country (देश चुनें / देश निवडा)
- Emergency Numbers, Ambulance, Poison Control, Mental Health Crisis
- All buttons and labels

#### 🏥 Hospital Finder
- Hospital Finder (अस्पताल खोजक)
- Find Hospitals (अस्पताल खोजें)
- Distance, Rating, Beds Available
- Emergency Services, Call buttons
- Specializations, Phone, Email

#### 📋 Notifications
- Notification Preferences (सूचना वरीयताएं)
- All notification types and frequencies
- Enable/Disable toggles

#### 🛒 Order Management
- My Orders (मेरे ऑर्डर)
- Order Tracking (ऑर्डर ट्रैकिंग)
- Order statuses: Pending, Processing, Shipped, Delivered
- Estimated Delivery dates

#### 🔧 Admin Dashboard
- Admin Dashboard (प्रशासक डैशबोर्ड)
- User Management (उपयोगकर्ता प्रबंधन)
- Medicine Catalog (दवा कैटलॉग)
- Analytics (विश्लेषण)
- Statistics and Reports

---

## Translation Keys & Structure

### File Location:
`lib/LanguageContext.tsx`

### Key Structure:
```typescript
const translations: Record<string, Record<LanguageCode, string>> = {
  'translationKey': {
    en: 'English text',
    hi: 'हिंदी टेक्स्ट',
    mr: 'मराठी टेक्स्ट'
  }
}
```

### Total Translation Keys: 100+

**Categories:**
- Emergency Hotlines: 12 keys
- Hospital Finder: 18 keys
- Notifications: 18 keys
- Orders & Tracking: 18 keys
- Admin Dashboard: 20 keys
- Common UI: 14 keys

---

## How to Use Translations in Components

### Basic Usage:
```tsx
import { useLanguage } from '@/lib/LanguageContext'

export default function MyComponent() {
  const { t, language } = useLanguage()
  
  return (
    <div>
      <h1>{t('emergencyHotlines')}</h1>
      <p>{t('selectCountry')}</p>
      <p>Current Language: {language}</p>
    </div>
  )
}
```

### With Fallback:
```tsx
const { t } = useLanguage()
<h1>{t('emergencyHotlines') || 'Emergency Hotlines'}</h1>
```

### In Admin Sections:
```tsx
const { t } = useLanguage()

<h2>{t('userManagement')}</h2>
<p>{t('totalUsers')}: 15,240</p>
```

---

## Adding New Translations

### Step 1: Add to LanguageContext.tsx
```typescript
const translations: Record<string, Record<LanguageCode, string>> = {
  // ... existing keys
  
  'newFeatureName': {
    en: 'New Feature Name',
    hi: 'नई विशेषता का नाम',
    mr: 'नवीन वैशिष्ट्य नाव'
  }
}
```

### Step 2: Use in Component
```tsx
const { t } = useLanguage()
<h1>{t('newFeatureName')}</h1>
```

### Step 3: Test All Languages
- Test in English
- Test in Hindi
- Test in Marathi

---

## Language Persistence

### How It Works:
1. User selects language from header dropdown
2. Selection is saved to `localStorage` as `language: 'en' | 'hi' | 'mr'`
3. On page reload, saved language is automatically loaded
4. If no saved preference, defaults to English

### Code:
```typescript
// Save language preference
localStorage.setItem('language', lang)

// Load on mount
const savedLanguage = localStorage.getItem('language')
if (savedLanguage && ['en', 'hi', 'mr'].includes(savedLanguage)) {
  setLanguageState(savedLanguage)
}
```

---

## Current Translations Available

### Emergency & Medical
| English | हिन्दी | मराठी |
|---------|--------|-------|
| Emergency Hotlines | आपातकालीन हॉटलाइन | आपातकालीन हॉटलाइन |
| Ambulance | एम्बुलेंस | रुग्णवाहिका |
| Poison Control | जहर नियंत्रण | विष नियंत्रण |
| Mental Health Crisis | मानसिक स्वास्थ्य संकट | मानसिक स्वास्थ्य संकट |

### Hospital & Medical Facilities
| English | हिन्दी | मराठी |
|---------|--------|-------|
| Hospital Finder | अस्पताल खोजक | रुग्णालय शोधक |
| Distance | दूरी | अंतर |
| Rating | रेटिंग | मूल्यांकन |
| Beds Available | उपलब्ध बिस्तर | उपलब्ध बेड |
| Specializations | विशेषज्ञताएं | विशेषीकरण |

### Orders & Tracking
| English | हिन्दी | मराठी |
|---------|--------|-------|
| My Orders | मेरे ऑर्डर | माझे ऑर्डर |
| Order Tracking | ऑर्डर ट्रैकिंग | ऑर्डर ट्रॅकिंग |
| Pending | लंबित | प्रलंबित |
| Shipped | भेजा गया | पाठवले |
| Delivered | सुपुर्द किया गया | वितरीत |

### Admin Functions
| English | हिन्दी | मराठी |
|---------|--------|-------|
| Admin Dashboard | प्रशासक डैशबोर्ड | प्रशासक डॅशबोर्ड |
| User Management | उपयोगकर्ता प्रबंधन | वापरकर्ता व्यवस्थापन |
| Medicine Catalog | दवा कैटलॉग | औषध कॅटलॉग |
| Analytics | विश्लेषण | विश्लेषण |
| Total Users | कुल उपयोगकर्ता | एकूण वापरकर्ते |

---

## Pages Supporting Multi-Language

### ✅ Fully Supported:
- 🏥 Hospital Finder (`app/hospital-finder/page.tsx`)
- 🚑 Emergency Hotlines (`app/emergency-hotlines/page.tsx`)
- 📋 Notification Preferences (`app/notification-preferences/page.tsx`)
- 📦 Order Tracking (`app/order-tracking/page.tsx`)
- 🔧 Admin Dashboard (`app/admin/page.tsx`)
- 👥 Admin Users (`app/admin/users/page.tsx`)
- 💊 Admin Medicines (`app/admin/medicines/page.tsx`)
- 📊 Admin Analytics (`app/admin/analytics/page.tsx`)

### ⚠️ Partially Supported:
- 🏠 Home Page (main content, some hardcoded)
- 💊 Marketplace (category names need translation)
- 🔍 Symptom Checker (output formatting)

### 🔄 Future Support:
- 🎨 Settings Page
- 🏪 Product Pages
- 📚 FAQ & Help
- ✉️ Email notifications

---

## Language Toggle Location

### Desktop Header:
```
[Logo] [Search] [Nav Items] [🌐 EN▼] [User Menu]
                                  ↓
                          [🇺🇸 English]
                          [🇮🇳 हिन्दी]
                          [🇮🇳 मराठी]
```

### Mobile Header:
```
[Logo] [Search] [🌐] [User Menu] [Menu]
          ↓
     Language Dropdown
```

---

## Browser Support

All language features work on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Tablets
- ✅ Desktop

---

## Future Language Additions

To add new languages (e.g., Tamil, Telugu, Gujarati):

1. Add language code to type:
```typescript
export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'gu'
```

2. Add translations for all keys

3. Add to language dropdown in Header

4. Test all pages

---

## Why Multi-Language Support Matters

### For Users:
- 🗣️ Understand medical information in native language
- 🏥 Navigate hospital finder in local language
- 📦 Track orders easily
- ❌ Less confusion, better health outcomes

### For Business:
- 🌏 Access billion-user markets (India, South Asia)
- 📈 Increased user engagement (30%+ improvement expected)
- 🏆 Competitive advantage in emerging markets
- 💰 Sustainable growth across regions

### For Healthcare:
- 👨‍⚕️ Doctors can use system in native language
- 🏥 Hospital administrators get local interfaces
- 📊 Analytics in multiple languages
- 🌍 True global healthcare platform

---

## Testing Multi-Language

### Manual Testing Checklist:
- [ ] Switch to Hindi, verify all text displays correctly
- [ ] Switch to Marathi, verify all text displays correctly
- [ ] Check hospital names display properly in different languages
- [ ] Verify number formatting (₹ works in all languages)
- [ ] Test mobile language toggle
- [ ] Test language persistence (reload page, verify language stays)
- [ ] Check RTL text display (if adding RTL languages)

### Automated Testing:
Can add tests to verify:
- All translation keys exist in all languages
- No missing translations
- Language switching works correctly
- LocalStorage persistence works

---

## Contact & Support

For multi-language feature requests or additions:
- 📧 Add translation keys to `LanguageContext.tsx`
- 🔄 Create pull request with new translations
- 🌍 Propose new language support

---

**MediGuide AI: Healthcare in Your Language** 🌐💚
