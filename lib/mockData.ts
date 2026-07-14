/**
 * Mock Data for MediGuide AI Features
 * Provides dummy data for all mock features without database calls
 */

// ============ EMERGENCY HOTLINES ============
export interface EmergencyHotline {
  id: string
  country: string
  countryCode: string
  emergencyNumber: string
  ambulanceNumber?: string
  poisonControlNumber?: string
  mentalHealthCrisis?: string
  description: string
  operatingHours: string
}

export const mockEmergencyHotlines: EmergencyHotline[] = [
  {
    id: '1',
    country: 'India',
    countryCode: 'IN',
    emergencyNumber: '102',
    ambulanceNumber: '108',
    poisonControlNumber: '1800-22-8800',
    mentalHealthCrisis: '9152987821',
    description: 'National emergency services in India',
    operatingHours: '24/7'
  },
  {
    id: '2',
    country: 'United States',
    countryCode: 'US',
    emergencyNumber: '911',
    ambulanceNumber: '911',
    poisonControlNumber: '1-800-222-1222',
    mentalHealthCrisis: '988',
    description: 'Emergency services across USA',
    operatingHours: '24/7'
  },
  {
    id: '3',
    country: 'United Kingdom',
    countryCode: 'UK',
    emergencyNumber: '999',
    ambulanceNumber: '999',
    poisonControlNumber: '111',
    mentalHealthCrisis: '116-123',
    description: 'Emergency services in UK',
    operatingHours: '24/7'
  },
  {
    id: '4',
    country: 'Canada',
    countryCode: 'CA',
    emergencyNumber: '911',
    ambulanceNumber: '911',
    poisonControlNumber: '1-800-268-9017',
    mentalHealthCrisis: '1-833-456-4566',
    description: 'Emergency services in Canada',
    operatingHours: '24/7'
  },
  {
    id: '5',
    country: 'Australia',
    countryCode: 'AU',
    emergencyNumber: '000',
    ambulanceNumber: '000',
    poisonControlNumber: '13-1126',
    mentalHealthCrisis: '1300-659-467',
    description: 'Emergency services in Australia',
    operatingHours: '24/7'
  },
  {
    id: '6',
    country: 'Germany',
    countryCode: 'DE',
    emergencyNumber: '112',
    ambulanceNumber: '112',
    poisonControlNumber: '030-19240',
    mentalHealthCrisis: '0800-1110111',
    description: 'Emergency services in Germany',
    operatingHours: '24/7'
  }
]

// ============ HOSPITALS (LOCATION-BASED) ============
export interface Hospital {
  id: string
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  phone: string
  email: string
  rating: number
  distance: number // in kilometers
  specializations: string[]
  bedsAvailable: number
  emergencyServices: boolean
  operatingHours: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Main Street, Downtown',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    phone: '+91 9876543210',
    email: 'info@citygeneralhospital.com',
    rating: 4.8,
    distance: 0.5,
    specializations: ['Cardiology', 'Neurology', 'Orthopedics', 'General Surgery'],
    bedsAvailable: 250,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.0760, longitude: 72.8777 }
  },
  {
    id: '2',
    name: 'Metro Medical Center',
    address: '456 Oak Avenue, North District',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400005',
    phone: '+91 9876543211',
    email: 'info@metromedical.com',
    rating: 4.6,
    distance: 1.2,
    specializations: ['Pediatrics', 'Oncology', 'Pulmonology', 'Internal Medicine'],
    bedsAvailable: 180,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.0822, longitude: 72.8634 }
  },
  {
    id: '3',
    name: 'Sunshine Care Hospital',
    address: '789 Pine Road, South City',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400008',
    phone: '+91 9876543212',
    email: 'contact@sunshinecare.com',
    rating: 4.5,
    distance: 2.1,
    specializations: ['Dermatology', 'Ophthalmology', 'ENT'],
    bedsAvailable: 150,
    emergencyServices: false,
    operatingHours: '7:00 AM - 10:00 PM',
    coordinates: { latitude: 19.0844, longitude: 72.8479 }
  },
  {
    id: '4',
    name: 'Apollo Hospitals',
    address: '321 Medical Complex, Central',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400010',
    phone: '+91 9876543213',
    email: 'contact@apollohospitals.com',
    rating: 4.9,
    distance: 1.5,
    specializations: ['All Specialties', 'Trauma Center', 'Intensive Care Unit', 'Cardiac Surgery'],
    bedsAvailable: 350,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.1136, longitude: 72.8697 }
  },
  {
    id: '5',
    name: 'Fortis Healthcare',
    address: '654 Health Avenue, East Wing',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400012',
    phone: '+91 9876543214',
    email: 'info@fortishealthcare.com',
    rating: 4.7,
    distance: 2.3,
    specializations: ['Oncology', 'Cardiology', 'General Surgery', 'Urology'],
    bedsAvailable: 280,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.1166, longitude: 72.8268 }
  },
  {
    id: '6',
    name: 'Max Super Specialty',
    address: '987 Care Boulevard, West End',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400014',
    phone: '+91 9876543215',
    email: 'support@maxspecialty.com',
    rating: 4.8,
    distance: 3.2,
    specializations: ['Neurosurgery', 'Cardiac Surgery', 'Orthopedic Surgery', 'Vascular Surgery'],
    bedsAvailable: 220,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.0900, longitude: 72.8600 }
  },
  {
    id: '7',
    name: 'Lifemax Medical Center',
    address: '147 Health Street, North',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400016',
    phone: '+91 9876543216',
    email: 'info@lifemaxmedical.com',
    rating: 4.4,
    distance: 0.8,
    specializations: ['General Medicine', 'Family Medicine', 'Preventive Care'],
    bedsAvailable: 120,
    emergencyServices: false,
    operatingHours: '9:00 AM - 9:00 PM',
    coordinates: { latitude: 19.1200, longitude: 72.8500 }
  },
  {
    id: '8',
    name: 'Indraprastha Apollo',
    address: '258 Medical Park, South',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400018',
    phone: '+91 9876543217',
    email: 'contact@apolloindia.com',
    rating: 4.9,
    distance: 2.7,
    specializations: ['All Specialties', 'Research Hospital', 'Teaching Hospital', 'Transplant Center'],
    bedsAvailable: 400,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.0850, longitude: 72.8750 }
  },
  {
    id: '9',
    name: 'Kokilaben Hospital',
    address: '369 Medical District, East',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400020',
    phone: '+91 9876543218',
    email: 'info@kokilabenhospital.com',
    rating: 4.8,
    distance: 3.5,
    specializations: ['Robotic Surgery', 'Cardiac Sciences', 'Neuro Sciences', 'Gastroenterology'],
    bedsAvailable: 300,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.1000, longitude: 72.8900 }
  },
  {
    id: '10',
    name: 'HCG Cancer Hospital',
    address: '741 Treatment Way, Medical Hub',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400022',
    phone: '+91 9876543219',
    email: 'info@hcgcancer.com',
    rating: 4.7,
    distance: 4.1,
    specializations: ['Oncology', 'Cancer Treatment', 'Radiation Therapy', 'Chemotherapy'],
    bedsAvailable: 200,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.0950, longitude: 72.8650 }
  },
  {
    id: '11',
    name: 'Manipal Hospitals',
    address: '852 Healthcare Plaza, Central',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400024',
    phone: '+91 9876543220',
    email: 'support@manipalhospitals.com',
    rating: 4.6,
    distance: 2.9,
    specializations: ['Orthopedics', 'Spine Surgery', 'Joint Replacement', 'Sports Medicine'],
    bedsAvailable: 250,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.1050, longitude: 72.8700 }
  },
  {
    id: '12',
    name: 'Jaslok Hospital',
    address: '963 Medical Lane, Premium',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400026',
    phone: '+91 9876543221',
    email: 'info@jaslokhospital.com',
    rating: 4.8,
    distance: 3.8,
    specializations: ['Multi-specialty', 'Premium Care', 'Diagnostics', 'Preventive Medicine'],
    bedsAvailable: 180,
    emergencyServices: true,
    operatingHours: '24/7',
    coordinates: { latitude: 19.0800, longitude: 72.8550 }
  }
]

// ============ LANGUAGES & TRANSLATIONS ============
export type LanguageCode = 'en' | 'hi' | 'mr'

export interface Translation {
  en: string
  hi: string
  mr: string
}

export const translations: Record<string, Translation> = {
  'home': {
    en: 'Home',
    hi: 'होम',
    mr: 'होम'
  },
  'symptomChecker': {
    en: 'Symptom Checker',
    hi: 'लक्षण जांच',
    mr: 'लक्षण तपासणी'
  },
  'hospitalFinder': {
    en: 'Hospital Finder',
    hi: 'अस्पताल खोजक',
    mr: 'रुग्णालय शोधक'
  },
  'emergencyHotlines': {
    en: 'Emergency Hotlines',
    hi: 'आपातकालीन हॉटलाइन',
    mr: 'आपातकालीन हॉटलाइन'
  },
  'nearbyHospitals': {
    en: 'Nearby Hospitals',
    hi: 'पास के अस्पताल',
    mr: 'जवळपास रुग्णालये'
  },
  'distance': {
    en: 'Distance',
    hi: 'दूरी',
    mr: 'अंतर'
  },
  'call': {
    en: 'Call',
    hi: 'कॉल करें',
    mr: 'कॉल करा'
  },
  'email': {
    en: 'Email',
    hi: 'ईमेल',
    mr: 'ईमेल'
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
  'emergencyServices': {
    en: 'Emergency Services',
    hi: 'आपातकालीन सेवाएं',
    mr: 'आपातकालीन सेवा'
  }
}

// ============ NOTIFICATIONS ============
export interface NotificationPreference {
  id: string
  type: 'email' | 'sms' | 'push'
  category: string
  enabled: boolean
  frequency: 'immediately' | 'daily' | 'weekly'
}

export const mockNotificationPreferences: NotificationPreference[] = [
  {
    id: '1',
    type: 'email',
    category: 'Health Reminders',
    enabled: true,
    frequency: 'daily'
  },
  {
    id: '2',
    type: 'email',
    category: 'Medicine Orders',
    enabled: true,
    frequency: 'immediately'
  },
  {
    id: '3',
    type: 'sms',
    category: 'Urgent Health Alerts',
    enabled: true,
    frequency: 'immediately'
  },
  {
    id: '4',
    type: 'push',
    category: 'Appointment Reminders',
    enabled: true,
    frequency: 'daily'
  },
  {
    id: '5',
    type: 'email',
    category: 'Newsletter & Tips',
    enabled: false,
    frequency: 'weekly'
  },
  {
    id: '6',
    type: 'push',
    category: 'New Features',
    enabled: true,
    frequency: 'weekly'
  }
]

// ============ ORDERS ============
export interface OrderItem {
  id: string
  medicineId: string
  medicineName: string
  quantity: number
  price: number
  dosage: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  totalPrice: number
  estimatedDelivery: string
  shippingAddress: string
  trackingNumber?: string
  paymentMethod: string
}

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      {
        id: '1',
        medicineId: 'm1',
        medicineName: 'Amoxicillin 500mg',
        quantity: 30,
        price: 450,
        dosage: '500mg'
      },
      {
        id: '2',
        medicineId: 'm2',
        medicineName: 'Paracetamol 650mg',
        quantity: 20,
        price: 150,
        dosage: '650mg'
      }
    ],
    totalPrice: 600,
    estimatedDelivery: '2024-01-17',
    shippingAddress: '123 Main Street, Mumbai, Maharashtra 400001',
    trackingNumber: 'TRACK-1234567890',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001002',
    date: '2024-01-18',
    status: 'shipped',
    items: [
      {
        id: '3',
        medicineId: 'm3',
        medicineName: 'Ibuprofen 400mg',
        quantity: 15,
        price: 250,
        dosage: '400mg'
      }
    ],
    totalPrice: 250,
    estimatedDelivery: '2024-01-20',
    shippingAddress: '456 Oak Avenue, Mumbai, Maharashtra 400005',
    trackingNumber: 'TRACK-9876543210',
    paymentMethod: 'Debit Card'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-001003',
    date: '2024-01-19',
    status: 'processing',
    items: [
      {
        id: '4',
        medicineId: 'm4',
        medicineName: 'Vitamin D3 1000IU',
        quantity: 60,
        price: 399,
        dosage: '1000IU'
      },
      {
        id: '5',
        medicineId: 'm5',
        medicineName: 'Calcium Tablets',
        quantity: 30,
        price: 299,
        dosage: '500mg'
      }
    ],
    totalPrice: 698,
    estimatedDelivery: '2024-01-22',
    shippingAddress: '789 Pine Road, Mumbai, Maharashtra 400008',
    paymentMethod: 'Net Banking'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-001004',
    date: '2024-01-20',
    status: 'pending',
    items: [
      {
        id: '6',
        medicineId: 'm6',
        medicineName: 'Omeprazole 20mg',
        quantity: 28,
        price: 320,
        dosage: '20mg'
      }
    ],
    totalPrice: 320,
    estimatedDelivery: '2024-01-25',
    shippingAddress: '321 Elm Street, Mumbai, Maharashtra 400010',
    paymentMethod: 'UPI'
  }
]

// ============ ADMIN USERS ============
export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'moderator' | 'support'
  status: 'active' | 'inactive'
  joinedDate: string
  lastLogin: string
  actions: number
}

export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@mediguide.com',
    name: 'Admin User',
    role: 'admin',
    status: 'active',
    joinedDate: '2023-01-01',
    lastLogin: '2024-01-20 10:30 AM',
    actions: 1250
  },
  {
    id: '2',
    email: 'moderator1@mediguide.com',
    name: 'John Moderator',
    role: 'moderator',
    status: 'active',
    joinedDate: '2023-06-15',
    lastLogin: '2024-01-19 03:15 PM',
    actions: 580
  },
  {
    id: '3',
    email: 'support@mediguide.com',
    name: 'Support Team Lead',
    role: 'support',
    status: 'active',
    joinedDate: '2023-09-20',
    lastLogin: '2024-01-20 08:45 AM',
    actions: 320
  },
  {
    id: '4',
    email: 'moderator2@mediguide.com',
    name: 'Sarah Johnson',
    role: 'moderator',
    status: 'inactive',
    joinedDate: '2023-03-10',
    lastLogin: '2024-01-10 02:00 PM',
    actions: 410
  }
]

// ============ MEDICINES ============
export interface Medicine {
  id: string
  name: string
  genericName: string
  dosage: string
  form: string
  manufacturer: string
  price: number
  stock: number
  category: string
  description: string
  sideEffects: string[]
  contraindications: string[]
  requiresPrescription: boolean
}

export const mockMedicines: Medicine[] = [
  {
    id: 'm1',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    dosage: '500mg',
    form: 'Capsule',
    manufacturer: 'Cipla Ltd',
    price: 15,
    stock: 450,
    category: 'Antibiotic',
    description: 'Broad-spectrum antibiotic used to treat bacterial infections',
    sideEffects: ['Nausea', 'Diarrhea', 'Rash'],
    contraindications: ['Penicillin allergy'],
    requiresPrescription: true
  },
  {
    id: 'm2',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    dosage: '650mg',
    form: 'Tablet',
    manufacturer: 'GSK India',
    price: 7.5,
    stock: 1200,
    category: 'Analgesic',
    description: 'Pain reliever and fever reducer',
    sideEffects: ['Rare liver damage in high doses'],
    contraindications: ['Liver disease'],
    requiresPrescription: false
  },
  {
    id: 'm3',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    dosage: '400mg',
    form: 'Tablet',
    manufacturer: 'Sun Pharma',
    price: 16.67,
    stock: 800,
    category: 'NSAID',
    description: 'Anti-inflammatory pain reliever',
    sideEffects: ['Stomach upset', 'Heartburn'],
    contraindications: ['Stomach ulcers', 'Kidney disease'],
    requiresPrescription: false
  },
  {
    id: 'm4',
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    dosage: '1000IU',
    form: 'Tablet',
    manufacturer: 'Organic India',
    price: 6.65,
    stock: 2000,
    category: 'Vitamin Supplement',
    description: 'Vitamin D supplement for bone health',
    sideEffects: ['Hypercalcemia in excessive doses'],
    contraindications: ['None known'],
    requiresPrescription: false
  },
  {
    id: 'm5',
    name: 'Calcium Tablets',
    genericName: 'Calcium Carbonate',
    dosage: '500mg',
    form: 'Tablet',
    manufacturer: 'Mankind Pharma',
    price: 9.97,
    stock: 600,
    category: 'Mineral Supplement',
    description: 'Calcium supplement for bone strength',
    sideEffects: ['Constipation', 'Gas'],
    contraindications: ['Kidney stones'],
    requiresPrescription: false
  },
  {
    id: 'm6',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    dosage: '20mg',
    form: 'Capsule',
    manufacturer: 'Dr. Reddy\'s',
    price: 11.43,
    stock: 350,
    category: 'Proton Pump Inhibitor',
    description: 'Reduces stomach acid production',
    sideEffects: ['Headache', 'Diarrhea', 'Nausea'],
    contraindications: ['Clopidogrel use'],
    requiresPrescription: true
  }
]

// ============ ANALYTICS ============
export interface AnalyticsData {
  label: string
  value: number
  percentage: number
}

export const mockAnalytics = {
  totalUsers: 15240,
  activeUsers: 8960,
  newUsers: 1230,
  ordersThisMonth: 3450,
  revenueThisMonth: 2850000,
  avgOrderValue: 825,
  topSymptoms: [
    { label: 'Headache', value: 2840, percentage: 18 },
    { label: 'Cough', value: 2156, percentage: 14 },
    { label: 'Fever', value: 1950, percentage: 12 },
    { label: 'Chest Pain', value: 1844, percentage: 12 },
    { label: 'Dizziness', value: 1540, percentage: 10 }
  ],
  medicinesSold: [
    { label: 'Paracetamol', value: 3420, percentage: 22 },
    { label: 'Amoxicillin', value: 2180, percentage: 14 },
    { label: 'Ibuprofen', value: 1950, percentage: 12 },
    { label: 'Vitamin D3', value: 1540, percentage: 10 },
    { label: 'Omeprazole', value: 1250, percentage: 8 }
  ],
  userSatisfaction: 4.6,
  platformUptime: 99.87
}

// ============ USER STATS ============
export interface UserStats {
  totalUsers: number
  activeUsersToday: number
  activeUsersThisWeek: number
  activeUsersThisMonth: number
  newUsersThisMonth: number
  userRetentionRate: number
}

export const mockUserStats: UserStats = {
  totalUsers: 15240,
  activeUsersToday: 2340,
  activeUsersThisWeek: 8960,
  activeUsersThisMonth: 12450,
  newUsersThisMonth: 1230,
  userRetentionRate: 78.5
}
