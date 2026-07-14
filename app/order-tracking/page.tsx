'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockOrders, Order } from '@/lib/mockData'
import { useLanguage } from '@/lib/LanguageContext'

const statusSteps = ['pending', 'processing', 'shipped', 'delivered']

function getStatusColor(status: string): string {
  switch (status) {
    case 'pending': return 'text-yellow-400'
    case 'processing': return 'text-blue-400'
    case 'shipped': return 'text-cyan-400'
    case 'delivered': return 'text-green-400'
    case 'cancelled': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'pending': return '⏳'
    case 'processing': return '⚙️'
    case 'shipped': return '🚚'
    case 'delivered': return '✅'
    case 'cancelled': return '❌'
    default: return '❓'
  }
}

function OrderStatusTimeline({ order }: { order: Order }) {
  const currentIndex = statusSteps.indexOf(order.status as any)

  return (
    <div className="my-4 p-4 rounded-lg bg-slate-700/30">
      <div className="flex justify-between items-center">
        {statusSteps.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                index <= currentIndex
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs font-semibold capitalize ${
              index <= currentIndex ? 'text-blue-300' : 'text-gray-400'
            }`}>
              {step}
            </span>
            {index < statusSteps.length - 1 && (
              <div className={`h-1 w-full mt-2 ${
                index < currentIndex ? 'bg-blue-600' : 'bg-gray-600'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OrderTrackingPage() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const { t } = useLanguage()

  if (mockOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Home
          </Link>
          <div className="text-center py-12">
            <p className="text-gray-300 text-xl">{t('noOrders')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('orderTracking')}
          </h1>
          <p className="text-gray-300 text-lg">
            {t('trackYourOrders')}
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
              className="card-glass cursor-pointer transition-all duration-300 hover:shadow-2xl overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl">{getStatusIcon(order.status)}</span>
                    <div>
                      <p className="text-lg font-bold text-white">{t('orderNumber')}: {order.orderNumber}</p>
                      <p className="text-sm text-gray-400">{t('orderDate')}: {order.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getStatusColor(order.status)} mb-2`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                  <p className="text-blue-400 font-semibold">{order.totalPrice.toLocaleString()} ₹</p>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrderId === order.id && (
                <div className="mt-6 pt-6 border-t border-blue-400/20">
                  {/* Status Timeline */}
                  <OrderStatusTimeline order={order} />

                  {/* Order Items */}
                  <div className="mt-6">
                    <h3 className="font-bold text-white mb-4 text-lg">Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                          <div>
                            <p className="font-semibold text-white">{item.medicineName}</p>
                            <p className="text-sm text-gray-400">Quantity: {item.quantity} | Dosage: {item.dosage}</p>
                          </div>
                          <p className="text-blue-400 font-semibold">₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-700/50">
                      <p className="text-sm text-gray-400 mb-1">Estimated Delivery</p>
                      <p className="text-white font-semibold">{order.estimatedDelivery}</p>
                    </div>
                    {order.trackingNumber && (
                      <div className="p-3 rounded-lg bg-slate-700/50">
                        <p className="text-sm text-gray-400 mb-1">Tracking Number</p>
                        <p className="text-white font-semibold font-mono text-sm">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <div className="mt-4 p-3 rounded-lg bg-slate-700/50">
                    <p className="text-sm text-gray-400 mb-1">Shipping Address</p>
                    <p className="text-white">{order.shippingAddress}</p>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-4 p-3 rounded-lg bg-slate-700/50">
                    <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                    <p className="text-white">{order.paymentMethod}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    {order.trackingNumber && (
                      <a
                        href={`https://www.google.com/search?q=track+${order.trackingNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-md btn-primary flex-1"
                      >
                        Track Package
                      </a>
                    )}
                    <a
                      href={`mailto:support@mediguide.com?subject=Order%20${order.orderNumber}`}
                      className="btn btn-md btn-ghost flex-1"
                    >
                      Contact Support
                    </a>
                  </div>
                </div>
              )}

              {/* Collapse Arrow */}
              <div className="flex justify-center mt-3 text-gray-400">
                <span className={`transform transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`}>
                  ⌄
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 card-glass">
          <h3 className="text-xl font-bold text-white mb-4">📦 Order Information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Click on any order to see detailed tracking information</li>
            <li>Track your package using the tracking number provided</li>
            <li>Estimated delivery dates are subject to change based on location</li>
            <li>Contact support if you have any questions about your order</li>
            <li>Keep your tracking number for reference</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
