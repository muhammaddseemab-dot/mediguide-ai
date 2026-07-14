import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// Sample emergency contact data for different regions
const emergencyContactsByRegion = {
  'US-NY': [
    {
      name: 'NYC Emergency Services',
      type: 'emergency',
      phone: '911',
      email: 'help@nyc.gov',
    },
    {
      name: 'Poison Control',
      type: 'poison_control',
      phone: '1-800-222-1222',
      email: null,
    },
  ],
  'IN-MH': [
    {
      name: 'Mumbai Emergency',
      type: 'emergency',
      phone: '108',
      email: 'mh-emergency@gov.in',
    },
    {
      name: 'Poison Control - India',
      type: 'poison_control',
      phone: '1800-11-6680',
      email: null,
    },
  ],
  'IN-KA': [
    {
      name: 'Bangalore Emergency',
      type: 'emergency',
      phone: '108',
      email: 'ka-emergency@gov.in',
    },
    {
      name: 'All India Institute of Medical Sciences',
      type: 'hospital',
      phone: '080-2659-6000',
      email: 'contact@aiimsbangalore.edu.in',
    },
  ],
  'IN-TG': [
    {
      name: 'Hyderabad Emergency',
      type: 'emergency',
      phone: '108',
      email: 'tg-emergency@gov.in',
    },
  ],
}

// Sample medicines for demonstration
const sampleMedicines: Prisma.MedicineCreateInput[] = [
  // Pain Relief
  {
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    dosage: '200mg',
    price: new Prisma.Decimal('2.99'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Johnson & Johnson',
    category: 'painkiller',
    sideEffects: ['nausea', 'heartburn', 'diarrhea'],
    contraindications: ['aspirin allergy', 'severe kidney disease'],
    description: 'Over-the-counter pain reliever and fever reducer',
    stock: 500,
  },
  {
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    dosage: '325mg',
    price: new Prisma.Decimal('1.50'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Bayer',
    category: 'painkiller',
    sideEffects: ['bleeding', 'stomach pain', 'nausea'],
    contraindications: ['bleeding disorders', 'ulcers'],
    description: 'Pain reliever and blood thinner',
    stock: 750,
  },
  {
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    dosage: '500mg',
    price: new Prisma.Decimal('1.25'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Calpol',
    category: 'fever_reducer',
    sideEffects: ['liver damage (overdose)', 'nausea'],
    contraindications: ['liver disease', 'alcoholism'],
    description: 'Fever reducer and pain reliever',
    stock: 600,
  },

  // Antibiotics
  {
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    dosage: '500mg',
    price: new Prisma.Decimal('5.99'),
    availability: true,
    prescriptionRequired: true,
    manufacturer: 'Pfizer',
    category: 'antibiotic',
    sideEffects: ['diarrhea', 'nausea', 'rash'],
    contraindications: ['penicillin allergy'],
    description: 'Antibiotic for bacterial infections',
    stock: 300,
  },
  {
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    dosage: '250mg',
    price: new Prisma.Decimal('8.50'),
    availability: true,
    prescriptionRequired: true,
    manufacturer: 'Ranbaxy',
    category: 'antibiotic',
    sideEffects: ['nausea', 'diarrhea', 'abdominal pain'],
    contraindications: ['liver disease', 'macrolide allergy'],
    description: 'Broad-spectrum antibiotic',
    stock: 250,
  },

  // Antihistamines
  {
    name: 'Cetirizine',
    genericName: 'Cetirizine HCl',
    dosage: '10mg',
    price: new Prisma.Decimal('3.50'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'UCB Pharma',
    category: 'antihistamine',
    sideEffects: ['drowsiness', 'headache', 'dry mouth'],
    contraindications: ['severe kidney disease'],
    description: 'Non-drowsy antihistamine for allergies',
    stock: 400,
  },
  {
    name: 'Loratadine',
    genericName: 'Loratadine',
    dosage: '10mg',
    price: new Prisma.Decimal('4.25'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Claritin',
    category: 'antihistamine',
    sideEffects: ['headache', 'dry mouth', 'fatigue'],
    contraindications: ['liver disease'],
    description: 'Long-acting antihistamine',
    stock: 350,
  },

  // Vitamins
  {
    name: 'Vitamin C',
    genericName: 'Ascorbic Acid',
    dosage: '1000mg',
    price: new Prisma.Decimal('2.50'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Now Foods',
    category: 'vitamin',
    sideEffects: ['nausea', 'kidney stones (high doses)'],
    contraindications: ['glucose-6-phosphate dehydrogenase deficiency'],
    description: 'Immune system support supplement',
    stock: 800,
  },
  {
    name: 'Multivitamin',
    genericName: 'Multivitamin Complex',
    dosage: 'Once daily',
    price: new Prisma.Decimal('5.99'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Centrum',
    category: 'vitamin',
    sideEffects: ['nausea', 'constipation', 'heartburn'],
    contraindications: ['hemochromatosis', 'certain cancers'],
    description: 'Complete daily vitamin and mineral supplement',
    stock: 550,
  },

  // Cough & Cold
  {
    name: 'Cough Syrup with Dextromethorphan',
    genericName: 'Dextromethorphan HBr',
    dosage: '10mg/5ml',
    price: new Prisma.Decimal('4.99'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Robitussin',
    category: 'cough_medicine',
    sideEffects: ['dizziness', 'nausea', 'drowsiness'],
    contraindications: ['MAOI use', 'productive cough'],
    description: 'Cough suppressant for dry cough',
    stock: 300,
  },
  {
    name: 'Decongestant Spray',
    genericName: 'Oxymetazoline HCl',
    dosage: '0.05%',
    price: new Prisma.Decimal('3.75'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Afrin',
    category: 'decongestant',
    sideEffects: ['nasal irritation', 'rebound congestion'],
    contraindications: ['hypertension', 'heart disease'],
    description: 'Nasal decongestant spray',
    stock: 400,
  },

  // Digestive
  {
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    dosage: '20mg',
    price: new Prisma.Decimal('6.99'),
    availability: true,
    prescriptionRequired: true,
    manufacturer: 'AstraZeneca',
    category: 'digestive',
    sideEffects: ['headache', 'diarrhea', 'nausea'],
    contraindications: ['vitamin B12 deficiency', 'long-term use'],
    description: 'Proton pump inhibitor for acid reflux',
    stock: 200,
  },
  {
    name: 'Antacid Tablet',
    genericName: 'Calcium Carbonate',
    dosage: '750mg',
    price: new Prisma.Decimal('2.25'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Tums',
    category: 'antacid',
    sideEffects: ['constipation', 'gas', 'bloating'],
    contraindications: ['kidney disease'],
    description: 'Fast-acting antacid for heartburn',
    stock: 600,
  },

  // Sleeping Aids
  {
    name: 'Melatonin',
    genericName: 'Melatonin',
    dosage: '5mg',
    price: new Prisma.Decimal('3.99'),
    availability: true,
    prescriptionRequired: false,
    manufacturer: 'Nature Made',
    category: 'sleep_aid',
    sideEffects: ['headache', 'dizziness', 'nausea'],
    contraindications: ['bipolar disorder', 'depression'],
    description: 'Natural sleep aid supplement',
    stock: 450,
  },
]

// Test user data
const testUsers: Prisma.UserCreateInput[] = [
  {
    email: 'demo@mediguide.com',
    name: 'Demo User',
    healthProfile: {
      create: {
        age: 35,
        gender: 'male',
        bloodType: 'O+',
        allergies: ['peanuts', 'penicillin'],
        chronicConditions: ['hypertension'],
        language: 'en',
        theme: 'light',
        emergencyContacts: {
          name: 'John Doe',
          relationship: 'spouse',
          phone: '+1-555-0123',
          email: 'john@example.com',
        },
      },
    },
  },
  {
    email: 'demo-hi@mediguide.com',
    name: 'डेमो यूजर',
    healthProfile: {
      create: {
        age: 28,
        gender: 'female',
        bloodType: 'B+',
        allergies: ['sulfa drugs'],
        chronicConditions: ['diabetes'],
        language: 'hi',
        theme: 'dark',
        emergencyContacts: {
          name: 'प्रिया शर्मा',
          relationship: 'माता',
          phone: '+91-9876543210',
          email: 'priya@example.com',
        },
      },
    },
  },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean up existing data
  console.log('🗑️  Cleaning up existing data...')
  await prisma.medicineOrderItem.deleteMany()
  await prisma.medicineOrder.deleteMany()
  await prisma.medicine.deleteMany()
  await prisma.emergencyLog.deleteMany()
  await prisma.consultation.deleteMany()
  await prisma.healthProfile.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()
  await prisma.auditLog.deleteMany()

  // Seed medicines
  console.log('💊 Seeding medicines...')
  const createdMedicines = await Promise.all(
    sampleMedicines.map((medicine) => prisma.medicine.create({ data: medicine }))
  )
  console.log(`✅ Created ${createdMedicines.length} medicines`)

  // Seed test users
  console.log('👤 Seeding test users...')
  const createdUsers = await Promise.all(
    testUsers.map((user) => prisma.user.create({ data: user }))
  )
  console.log(`✅ Created ${createdUsers.length} test users`)

  // Create sample consultations with conversation history
  console.log('📋 Seeding sample consultations...')
  const firstUser = createdUsers[0]
  const consultation = await prisma.consultation.create({
    data: {
      userId: firstUser.id,
      symptoms: ['headache', 'fever', 'cough'],
      severity: 'moderate',
      confidenceLevel: 85,
      emergencyDetected: false,
      language: 'en',
      aiAnalysis: {
        severity: 'moderate',
        confidence: 85,
        recommendations: [
          {
            title: 'Rest and Hydration',
            description: 'Get plenty of rest and drink fluids',
            priority: 'high',
          },
          {
            title: 'Over-the-counter Pain Relief',
            description: 'Consider acetaminophen or ibuprofen',
            priority: 'medium',
          },
        ],
        warnings: [
          'If symptoms persist beyond 7 days, consult a healthcare provider',
        ],
      },
      conversationHistory: [
        {
          role: 'assistant',
          content:
            'Hello! I am MediGuide AI. Tell me about your symptoms and I will provide health insights.',
          timestamp: new Date(Date.now() - 5000),
        },
        {
          role: 'user',
          content: 'I have a headache, fever, and cough',
          timestamp: new Date(Date.now() - 4000),
        },
        {
          role: 'assistant',
          content:
            'These symptoms suggest a possible cold or mild flu. Let me analyze further.',
          timestamp: new Date(Date.now() - 2000),
        },
      ],
      recommendations: [
        {
          type: 'medicine',
          name: 'Paracetamol 500mg',
          dosage: '1 tablet every 6 hours',
          duration: '3-5 days',
        },
        {
          type: 'lifestyle',
          name: 'Rest and Recovery',
          description: 'Take adequate rest and stay hydrated',
        },
      ],
    },
  })
  console.log(`✅ Created sample consultation`)

  // Create sample medicine order
  console.log('🛍️  Seeding sample medicine order...')
  const order = await prisma.medicineOrder.create({
    data: {
      userId: firstUser.id,
      consultationId: consultation.id,
      totalAmount: new Prisma.Decimal('12.50'),
      orderStatus: 'pending',
      medicineItems: {
        create: [
          {
            medicineId: createdMedicines[2].id, // Paracetamol
            quantity: 2,
            unitPrice: new Prisma.Decimal('1.25'),
          },
        ],
      },
    },
  })
  console.log(`✅ Created sample medicine order`)

  // Create sample emergency log
  console.log('🚨 Seeding sample emergency log...')
  const emergencyLog = await prisma.emergencyLog.create({
    data: {
      userId: firstUser.id,
      consultationId: consultation.id,
      symptoms: ['chest pain', 'shortness of breath', 'dizziness'],
      detectionConfidence: 95,
      emergencyLevel: 'critical',
      emergencyContactsProvided: emergencyContactsByRegion['US-NY'],
      hospitalInfo: [
        {
          name: 'New York Presbyterian Hospital',
          address: '525 E 68th St, New York, NY 10065',
          phone: '212-746-5454',
          distance: '2.3 km',
        },
      ],
      adminNotified: true,
      responseTimeMs: 342,
    },
  })
  console.log(`✅ Created sample emergency log`)

  // Create audit log
  console.log('📊 Seeding audit logs...')
  await prisma.auditLog.create({
    data: {
      userId: firstUser.id,
      action: 'viewed_health_data',
      resource: 'health_profile',
      resourceId: firstUser.id,
      ipAddress: '127.0.0.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  })
  console.log(`✅ Created audit log`)

  console.log('✨ Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   • Medicines: ${createdMedicines.length}`)
  console.log(`   • Test Users: ${createdUsers.length}`)
  console.log(`   • Sample Consultations: 1`)
  console.log(`   • Sample Medicine Orders: 1`)
  console.log(`   • Sample Emergency Logs: 1`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
