'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface OrderItem {
  id: number
  name: string
  price: number
  prescription: boolean
}

interface Order {
  items: OrderItem[]
  total: number
  date: string
  orderNumber: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    const pendingOrder = localStorage.getItem('pendingOrder')
    if (pendingOrder) {
      setOrder(JSON.parse(pendingOrder))
    } else {
      router.push('/marketplace')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill in all fields')
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Save order to localStorage (mock database)
    const completedOrder = {
      ...order,
      ...formData,
      status: 'confirmed',
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      paymentStatus: 'successful',
    }

    localStorage.setItem(`order_${order?.orderNumber}`, JSON.stringify(completedOrder))
    localStorage.removeItem('pendingOrder')

    setIsProcessing(false)
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg bg-white p-8 shadow-lg text-center">
              <div className="mb-4 text-6xl">✅</div>
              <h1 className="mb-2 text-3xl font-bold text-green-600">Order Placed Successfully!</h1>
              <p className="mb-6 text-gray-600">
                Your order has been confirmed and will be delivered soon.
              </p>

              <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
                <p className="text-sm text-gray-600">Order Number:</p>
                <p className="text-2xl font-bold text-gray-900">{order?.orderNumber}</p>
              </div>

              <div className="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Delivery Details</h3>
                <p className="text-sm text-gray-600">
                  Name: {formData.fullName}<br />
                  Address: {formData.address}, {formData.city} - {formData.pincode}<br />
                  Phone: {formData.phone}
                </p>
              </div>

              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-3xl font-bold text-green-600">₹{order?.total}</p>
              </div>

              <p className="mb-6 text-sm text-gray-600">
                You will receive an SMS with tracking details shortly.
              </p>

              <div className="space-y-3">
                <Link 
                  href="/order-tracking"
                  className="inline-block w-full rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
                >
                  Track Your Order
                </Link>
                <Link 
                  href="/marketplace"
                  className="inline-block w-full rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg font-semibold text-purple-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                {/* Shipping Address */}
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-lg border-l-4 border-blue-500">
                  <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="123 Main Street, Apartment 4B"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg border-l-4 border-purple-500">
                  <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="font-medium text-gray-900">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="font-medium text-gray-900">UPI Payment</span>
                    </label>
                    <label className="flex items-center rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="font-medium text-gray-900">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-lg font-semibold text-white hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 transition-all transform hover:scale-105 shadow-lg disabled:shadow-none"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg border-2 border-green-200">
                <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Order Summary</h2>

                <div className="mb-4 space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        {item.prescription && (
                          <div className="text-xs text-orange-600">Requires Prescription</div>
                        )}
                      </div>
                      <div className="font-medium text-gray-900">₹{item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">₹{order.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="text-gray-900">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-gray-900">₹0</span>
                  </div>
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-600">₹{order.total}</span>
                </div>

                <Link
                  href="/marketplace"
                  className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
