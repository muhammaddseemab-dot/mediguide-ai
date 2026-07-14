'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const medicines = [
  { id: 1, name: 'Paracetamol 500mg', price: 15, category: 'Pain Relief', inStock: true, prescription: false },
  { id: 2, name: 'Ibuprofen 400mg', price: 25, category: 'Pain Relief', inStock: true, prescription: false },
  { id: 3, name: 'Vitamin D3 1000IU', price: 35, category: 'Vitamins', inStock: true, prescription: false },
  { id: 4, name: 'Omeprazole 20mg', price: 45, category: 'Digestive', inStock: false, prescription: true },
  { id: 5, name: 'Amoxicillin 500mg', price: 55, category: 'Antibiotics', inStock: true, prescription: true },
  { id: 6, name: 'Cetirizine 10mg', price: 20, category: 'Allergy', inStock: true, prescription: false },
  { id: 7, name: 'Aspirin 75mg', price: 12, category: 'Pain Relief', inStock: true, prescription: false },
  { id: 8, name: 'Multivitamin Daily', price: 40, category: 'Vitamins', inStock: true, prescription: false },
  { id: 9, name: 'Iron Supplement 325mg', price: 30, category: 'Vitamins', inStock: true, prescription: false },
  { id: 10, name: 'Calcium Citrate 500mg', price: 28, category: 'Vitamins', inStock: true, prescription: false },
  { id: 11, name: 'Vitamin B12 1000mcg', price: 25, category: 'Vitamins', inStock: true, prescription: false },
  { id: 12, name: 'Metformin 500mg', price: 18, category: 'Diabetic', inStock: true, prescription: true },
  { id: 13, name: 'Lisinopril 5mg', price: 22, category: 'Blood Pressure', inStock: true, prescription: true },
  { id: 14, name: 'Losartan 50mg', price: 32, category: 'Blood Pressure', inStock: true, prescription: true },
  { id: 15, name: 'Atorvastatin 10mg', price: 38, category: 'Cholesterol', inStock: true, prescription: true },
  { id: 16, name: 'Azithromycin 500mg', price: 65, category: 'Antibiotics', inStock: true, prescription: true },
  { id: 17, name: 'Ciprofloxacin 500mg', price: 48, category: 'Antibiotics', inStock: true, prescription: true },
  { id: 18, name: 'Ranitidine 150mg', price: 16, category: 'Digestive', inStock: true, prescription: false },
  { id: 19, name: 'Loperamide 2mg', price: 14, category: 'Digestive', inStock: true, prescription: false },
  { id: 20, name: 'Antacid Tablet', price: 10, category: 'Digestive', inStock: true, prescription: false },
  { id: 21, name: 'Loratadine 10mg', price: 18, category: 'Allergy', inStock: true, prescription: false },
  { id: 22, name: 'Fexofenadine 180mg', price: 35, category: 'Allergy', inStock: true, prescription: false },
  { id: 23, name: 'Diphenhydramine 25mg', price: 22, category: 'Allergy', inStock: true, prescription: false },
  { id: 24, name: 'Ointment Antibiotic', price: 15, category: 'Topical', inStock: true, prescription: false },
  { id: 25, name: 'Hydrocortisone Cream 1%', price: 20, category: 'Topical', inStock: true, prescription: false },
  { id: 26, name: 'Salicylic Acid 2%', price: 18, category: 'Topical', inStock: true, prescription: false },
  { id: 27, name: 'Cough Syrup 100ml', price: 12, category: 'Cough & Cold', inStock: true, prescription: false },
  { id: 28, name: 'Throat Lozenge Pack', price: 8, category: 'Cough & Cold', inStock: true, prescription: false },
  { id: 29, name: 'Decongestant Spray', price: 14, category: 'Cough & Cold', inStock: true, prescription: false },
  { id: 30, name: 'Sleeping Aid Tablet', price: 35, category: 'Sleep Aid', inStock: true, prescription: true },
  { id: 31, name: 'Probiotic Capsule', price: 42, category: 'Digestive', inStock: true, prescription: false },
  { id: 32, name: 'Zinc Supplement 50mg', price: 24, category: 'Vitamins', inStock: true, prescription: false },
]

export default function Marketplace() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<number[]>([])

  const categories = ['All', 'Pain Relief', 'Vitamins', 'Digestive', 'Antibiotics', 'Allergy', 'Diabetic', 'Blood Pressure', 'Cholesterol', 'Topical', 'Cough & Cold', 'Sleep Aid']

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (id: number) => {
    setCart([...cart, id])
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Please add items to cart before checkout')
      return
    }

    // Get cart items details
    const cartItems = cart.map(id => {
      const medicine = medicines.find(m => m.id === id)
      return {
        id,
        name: medicine?.name || '',
        price: medicine?.price || 0,
        prescription: medicine?.prescription || false,
      }
    })

    const total = cart.reduce((total, id) => {
      const medicine = medicines.find(m => m.id === id)
      return total + (medicine?.price || 0)
    }, 0)

    // Store cart in localStorage
    localStorage.setItem('pendingOrder', JSON.stringify({
      items: cartItems,
      total,
      date: new Date().toISOString(),
      orderNumber: `ORD-${Date.now()}`,
    }))

    // Redirect to checkout page
    router.push('/checkout')
  }

  const cartTotal = cart.reduce((total, id) => {
    const medicine = medicines.find(m => m.id === id)
    return total + (medicine?.price || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Medicine Marketplace</h1>
          <p className="text-lg text-gray-600">
            Find and order medicines with prescription management
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Search */}
            <div>
              <label htmlFor="search" className="mb-2 block text-sm font-medium text-gray-700">
                Search Medicines
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search by medicine name..."
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Medicine Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMedicines.map(medicine => (
                <div key={medicine.id} className="rounded-lg bg-white p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white mt-2 ${
                      medicine.category === 'Pain Relief' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                      medicine.category === 'Vitamins' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      medicine.category === 'Digestive' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                      medicine.category === 'Antibiotics' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                      medicine.category === 'Allergy' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      medicine.category === 'Diabetic' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                      medicine.category === 'Blood Pressure' ? 'bg-gradient-to-r from-rose-500 to-red-500' :
                      medicine.category === 'Cholesterol' ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500' :
                      medicine.category === 'Topical' ? 'bg-gradient-to-r from-lime-500 to-green-500' :
                      medicine.category === 'Cough & Cold' ? 'bg-gradient-to-r from-sky-500 to-cyan-500' :
                      medicine.category === 'Sleep Aid' ? 'bg-gradient-to-r from-violet-500 to-purple-500' :
                      'bg-gradient-to-r from-gray-500 to-slate-500'
                    }`}>
                      {medicine.category}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{medicine.price}</span>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {medicine.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                      </span>
                    </div>
                    
                    {medicine.prescription && (
                      <div className="mb-2 rounded bg-orange-100 px-2 py-1 text-xs font-bold text-orange-800 inline-block">
                        📋 Prescription Required
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(medicine.id)}
                    disabled={!medicine.inStock}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-white font-semibold transition-all hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {cart.includes(medicine.id) ? '✓ Added to Cart' : '🛒 Add to Cart'}
                  </button>
                </div>
              ))}
            </div>

            {filteredMedicines.length === 0 && (
              <div className="rounded-lg bg-white p-8 text-center shadow-lg">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No medicines found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Shopping Cart ({cart.length})
              </h3>
              
              {cart.length === 0 ? (
                <div className="text-center text-gray-500">
                  <div className="mb-2 text-2xl">🛒</div>
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((id, index) => {
                    const medicine = medicines.find(m => m.id === id)
                    return medicine ? (
                      <div key={index} className="rounded border p-2 flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 break-words">{medicine.name}</div>
                          <div className="text-sm text-gray-600">₹{medicine.price}</div>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="ml-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded px-2 py-1 text-xs font-medium whitespace-nowrap"
                          title="Remove from cart"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null
                  })}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        ₹{cartTotal}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 text-center shadow">
            <div className="mb-2 text-2xl">🚚</div>
            <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Same-day delivery in most areas</p>
          </div>
          <div className="rounded-lg bg-white p-4 text-center shadow">
            <div className="mb-2 text-2xl">📋</div>
            <h3 className="font-semibold text-gray-900">Prescription Management</h3>
            <p className="text-sm text-gray-600">Easy prescription upload and verification</p>
          </div>
          <div className="rounded-lg bg-white p-4 text-center shadow">
            <div className="mb-2 text-2xl">💰</div>
            <h3 className="font-semibold text-gray-900">Best Prices</h3>
            <p className="text-sm text-gray-600">Competitive pricing with quality assurance</p>
          </div>
        </div>
      </div>
    </div>
  )
}