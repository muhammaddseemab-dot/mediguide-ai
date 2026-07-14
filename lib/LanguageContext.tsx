'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type LanguageCode = 'en' | 'hi' | 'mr'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string, lang?: LanguageCode) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<string, Record<LanguageCode, string>> = {
  // Emergency Hotlines
  'emergencyHotlines': {
    en: 'Emergency Hotlines',
    hi: 'आपातकालीन हॉटलाइन',
    mr: 'आपातकालीन हॉटलाइन'
  },
  'selectCountry': {
    en: 'Select a country to view emergency hotlines',
    hi: 'आपातकालीन हॉटलाइन देखने के लिए एक देश चुनें',
    mr: 'आपातकालीन हॉटलाइन पाहण्याकरिता देश निवडा'
  },
  'country': {
    en: 'Country',
    hi: 'देश',
    mr: 'देश'
  },
  'emergencyNumber': {
    en: 'Emergency Number',
    hi: 'आपातकालीन नंबर',
    mr: 'आपातकाल क्रमांक'
  },
  'ambulance': {
    en: 'Ambulance',
    hi: 'एम्बुलेंस',
    mr: 'रुग्णवाहिका'
  },
  'poisonControl': {
    en: 'Poison Control',
    hi: 'जहर नियंत्रण',
    mr: 'विष नियंत्रण'
  },
  'mentalHealthCrisis': {
    en: 'Mental Health Crisis',
    hi: 'मानसिक स्वास्थ्य संकट',
    mr: 'मानसिक स्वास्थ्य संकट'
  },
  'operatingHours': {
    en: 'Operating Hours',
    hi: 'संचालन समय',
    mr: 'कार्य तास'
  },
  'call': {
    en: 'Call',
    hi: 'कॉल करें',
    mr: 'कॉल करा'
  },

  // Hospital Finder
  'hospitalFinder': {
    en: 'Hospital Finder',
    hi: 'अस्पताल खोजक',
    mr: 'रुग्णालय शोधक'
  },
  'nearbyHospitals': {
    en: 'Nearby Hospitals',
    hi: 'पास के अस्पताल',
    mr: 'जवळपास रुग्णालये'
  },
  'findHospitals': {
    en: 'Find hospitals near you with emergency services and real-time availability',
    hi: 'आपके पास आपातकालीन सेवाओं के साथ अस्पताल खोजें',
    mr: 'तुमच्या जवळ आपातकालीन सेवा असलेले रुग्णालय शोधा'
  },
  'distance': {
    en: 'Distance',
    hi: 'दूरी',
    mr: 'अंतर'
  },
  'km': {
    en: 'km away',
    hi: 'किमी दूर',
    mr: 'किमी दूर'
  },
  'rating': {
    en: 'Rating',
    hi: 'रेटिंग',
    mr: 'मूल्यांकन'
  },
  'bedsAvailable': {
    en: 'Beds Available',
    hi: 'उपलब्ध बिस्तर',
    mr: 'उपलब्ध बेड'
  },
  'email': {
    en: 'Email',
    hi: 'ईमेल',
    mr: 'ईमेल'
  },
  'phone': {
    en: 'Phone',
    hi: 'फोन',
    mr: 'फोन'
  },
  'specializations': {
    en: 'Specializations',
    hi: 'विशेषज्ञताएं',
    mr: 'विशेषीकरण'
  },
  'emergencyServices': {
    en: 'Emergency Services Available',
    hi: 'आपातकालीन सेवाएं उपलब्ध',
    mr: 'आपातकालीन सेवा उपलब्ध'
  },

  // Notifications
  'notifications': {
    en: 'Notifications',
    hi: 'सूचनाएं',
    mr: 'सूचना'
  },
  'notificationPreferences': {
    en: 'Notification Preferences',
    hi: 'सूचना वरीयताएं',
    mr: 'सूचना प्राधान्ये'
  },
  'manageNotifications': {
    en: 'Manage how you receive notifications from MediGuide AI',
    hi: 'प्रबंधित करें कि आप MediGuide AI से कैसे सूचनाएं प्राप्त करते हैं',
    mr: 'व्यवस्थापित करा की तुम MediGuide AI पासून कसे सूचना मिवतील'
  },
  'type': {
    en: 'Type',
    hi: 'प्रकार',
    mr: 'प्रकार'
  },
  'category': {
    en: 'Category',
    hi: 'श्रेणी',
    mr: 'वर्ग'
  },
  'frequency': {
    en: 'Frequency',
    hi: 'आवृत्ति',
    mr: 'वारंवारता'
  },
  'enabled': {
    en: 'Enabled',
    hi: 'सक्षम',
    mr: 'सक्षम'
  },
  'immediately': {
    en: 'Immediately',
    hi: 'तुरंत',
    mr: 'तत्काळ'
  },
  'daily': {
    en: 'Daily',
    hi: 'दैनिक',
    mr: 'दैनिक'
  },
  'weekly': {
    en: 'Weekly',
    hi: 'साप्ताहिक',
    mr: 'साप्ताहिक'
  },
  'save': {
    en: 'Save Preferences',
    hi: 'वरीयताएं सहेजें',
    mr: 'प्राधान्ये साठवा'
  },
  'saved': {
    en: 'Preferences saved successfully!',
    hi: 'वरीयताएं सफलतापूर्वक सहेजी गई!',
    mr: 'प्राधान्ये यशस्वीरित्या साठवली गेली!'
  },

  // Orders
  'orders': {
    en: 'My Orders',
    hi: 'मेरे ऑर्डर',
    mr: 'माझे ऑर्डर'
  },
  'orderTracking': {
    en: 'Order Tracking',
    hi: 'ऑर्डर ट्रैकिंग',
    mr: 'ऑर्डर ट्रॅकिंग'
  },
  'trackYourOrders': {
    en: 'Track your medicine orders and delivery status',
    hi: 'अपने दवा ऑर्डर और डिलीवरी स्थिति को ट्रैक करें',
    mr: 'तुमचे औषध ऑर्डर आणि डिलीव्हरी स्थिती ट्रॅक करा'
  },
  'orderNumber': {
    en: 'Order Number',
    hi: 'ऑर्डर नंबर',
    mr: 'ऑर्डर क्रमांक'
  },
  'orderDate': {
    en: 'Order Date',
    hi: 'ऑर्डर तारीख',
    mr: 'ऑर्डर डेट'
  },
  'status': {
    en: 'Status',
    hi: 'स्थिति',
    mr: 'स्थिती'
  },
  'totalPrice': {
    en: 'Total Price',
    hi: 'कुल मूल्य',
    mr: 'एकूण किंमत'
  },
  'estimatedDelivery': {
    en: 'Estimated Delivery',
    hi: 'अनुमानित डिलीवरी',
    mr: 'अनुमानित डिलीव्हरी'
  },
  'trackingNumber': {
    en: 'Tracking Number',
    hi: 'ट्रैकिंग नंबर',
    mr: 'ट्रॅकिंग क्रमांक'
  },
  'pending': {
    en: 'Pending',
    hi: 'लंबित',
    mr: 'प्रलंबित'
  },
  'processing': {
    en: 'Processing',
    hi: 'प्रसंस्करण',
    mr: 'प्रक्रियाकरण'
  },
  'shipped': {
    en: 'Shipped',
    hi: 'भेजा गया',
    mr: 'पाठवले'
  },
  'delivered': {
    en: 'Delivered',
    hi: 'सुपुर्द किया गया',
    mr: 'वितरीत'
  },
  'cancelled': {
    en: 'Cancelled',
    hi: 'रद्द',
    mr: 'रद्द'
  },
  'noOrders': {
    en: 'No orders yet',
    hi: 'अभी कोई ऑर्डर नहीं',
    mr: 'अजून कोणीही ऑर्डर नाही'
  },

  // Admin
  'admin': {
    en: 'Admin Dashboard',
    hi: 'प्रशासक डैशबोर्ड',
    mr: 'प्रशासक डॅशबोर्ड'
  },
  'userManagement': {
    en: 'User Management',
    hi: 'उपयोगकर्ता प्रबंधन',
    mr: 'वापरकर्ता व्यवस्थापन'
  },
  'medicineManagement': {
    en: 'Medicine Catalog',
    hi: 'दवा कैटलॉग',
    mr: 'औषध कॅटलॉग'
  },
  'analytics': {
    en: 'Analytics',
    hi: 'विश्लेषण',
    mr: 'विश्लेषण'
  },
  'users': {
    en: 'Users',
    hi: 'उपयोगकर्ता',
    mr: 'वापरकर्ते'
  },
  'medicines': {
    en: 'Medicines',
    hi: 'दवाएं',
    mr: 'औषधे'
  },
  'statistics': {
    en: 'Statistics',
    hi: 'आंकड़े',
    mr: 'आकडे'
  },
  'role': {
    en: 'Role',
    hi: 'भूमिका',
    mr: 'भूमिका'
  },
  'joinedDate': {
    en: 'Joined Date',
    hi: 'शामिल होने की तारीख',
    mr: 'सामील झालेली तारीख'
  },
  'lastLogin': {
    en: 'Last Login',
    hi: 'अंतिम लॉगिन',
    mr: 'शेवटचे लॉगिन'
  },
  'actions': {
    en: 'Actions',
    hi: 'कार्य',
    mr: 'क्रिया'
  },
  'genericName': {
    en: 'Generic Name',
    hi: 'सामान्य नाम',
    mr: 'सामान्य नाव'
  },
  'dosage': {
    en: 'Dosage',
    hi: 'खुराक',
    mr: 'खुराक'
  },
  'manufacturer': {
    en: 'Manufacturer',
    hi: 'निर्माता',
    mr: 'निर्माता'
  },
  'price': {
    en: 'Price',
    hi: 'कीमत',
    mr: 'किंमत'
  },
  'stock': {
    en: 'Stock',
    hi: 'स्टॉक',
    mr: 'साठ्या'
  },
  'totalUsers': {
    en: 'Total Users',
    hi: 'कुल उपयोगकर्ता',
    mr: 'एकूण वापरकर्ते'
  },
  'activeUsers': {
    en: 'Active Users',
    hi: 'सक्रिय उपयोगकर्ता',
    mr: 'सक्रिय वापरकर्ते'
  },
  'newUsers': {
    en: 'New Users This Month',
    hi: 'इस महीने नए उपयोगकर्ता',
    mr: 'या महिन्यातील नवीन वापरकर्ते'
  },
  'revenue': {
    en: 'Revenue',
    hi: 'राजस्व',
    mr: 'महसूल'
  },
  'topSymptoms': {
    en: 'Top Symptoms',
    hi: 'शीर्ष लक्षण',
    mr: 'शीर्ष लक्षण'
  },
  'medicinesSold': {
    en: 'Medicines Sold',
    hi: 'बिकी दवाएं',
    mr: 'विकल्या गेलेल्या औषधे'
  },
  'satisfaction': {
    en: 'User Satisfaction',
    hi: 'उपयोगकर्ता संतुष्टि',
    mr: 'वापरकर्ता संतुष्टी'
  },
  'uptime': {
    en: 'Platform Uptime',
    hi: 'प्लेटफॉर्म अपटाइम',
    mr: 'प्लॅटफॉर्म अपटाइम'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage on mount
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as LanguageCode | null
    if (savedLanguage && ['en', 'hi', 'mr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string, lang?: LanguageCode): string => {
    const targetLang = lang || language
    return translations[key]?.[targetLang] || translations[key]?.['en'] || key
  }

  // Always provide the context, use default values until mounted
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
