'use client'

import Link from 'next/link'
import { mockAnalytics, mockUserStats } from '@/lib/mockData'

export default function AnalyticsDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Platform statistics, user metrics, and performance data
          </p>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Users */}
          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Total Users</p>
                <p className="text-4xl font-bold text-blue-400">{mockAnalytics.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-400 mt-2">↑ 8.5% this month</p>
              </div>
              <span className="text-5xl">👥</span>
            </div>
          </div>

          {/* Active Users */}
          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Active Users</p>
                <p className="text-4xl font-bold text-green-400">{mockAnalytics.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-2">{((mockAnalytics.activeUsers / mockAnalytics.totalUsers) * 100).toFixed(1)}% of total</p>
              </div>
              <span className="text-5xl">✓</span>
            </div>
          </div>

          {/* New Users This Month */}
          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">New Users</p>
                <p className="text-4xl font-bold text-cyan-400">{mockAnalytics.newUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-2">This month</p>
              </div>
              <span className="text-5xl">🆕</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="card-glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Revenue</p>
                <p className="text-4xl font-bold text-purple-400">₹{(mockAnalytics.revenueThisMonth / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-400 mt-2">This month</p>
              </div>
              <span className="text-5xl">💰</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Activity Stats */}
          <div className="card-glass">
            <h2 className="text-2xl font-bold text-white mb-6">User Activity</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Active Today</span>
                  <span className="text-blue-400 font-bold">{mockUserStats.activeUsersToday.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(mockUserStats.activeUsersToday / mockUserStats.totalUsers) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Active This Week</span>
                  <span className="text-green-400 font-bold">{mockUserStats.activeUsersThisWeek.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(mockUserStats.activeUsersThisWeek / mockUserStats.totalUsers) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Active This Month</span>
                  <span className="text-cyan-400 font-bold">{mockUserStats.activeUsersThisMonth.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full"
                    style={{ width: `${(mockUserStats.activeUsersThisMonth / mockUserStats.totalUsers) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-blue-400/20 mt-4">
                <p className="text-gray-300 mb-2">User Retention Rate</p>
                <p className="text-3xl font-bold text-purple-400">{mockUserStats.userRetentionRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Platform Health */}
          <div className="card-glass">
            <h2 className="text-2xl font-bold text-white mb-6">Platform Health</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-700/50">
                <p className="text-gray-400 text-sm mb-2">Platform Uptime</p>
                <p className="text-4xl font-bold text-green-400 mb-2">{mockAnalytics.platformUptime}%</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${mockAnalytics.platformUptime}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-700/50">
                <p className="text-gray-400 text-sm mb-2">User Satisfaction</p>
                <p className="text-4xl font-bold text-yellow-400 mb-2">{mockAnalytics.userSatisfaction}/5.0</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(mockAnalytics.userSatisfaction) ? 'text-yellow-400' : 'text-gray-600'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-700/50">
                <p className="text-gray-400 text-sm mb-2">Average Order Value</p>
                <p className="text-3xl font-bold text-cyan-400">₹{mockAnalytics.avgOrderValue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Symptoms */}
          <div className="card-glass">
            <h2 className="text-2xl font-bold text-white mb-6">Top Reported Symptoms</h2>
            <div className="space-y-4">
              {mockAnalytics.topSymptoms.map((symptom, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-blue-400">#{index + 1}</span>
                      <span className="text-white font-semibold">{symptom.label}</span>
                    </div>
                    <span className="text-green-400 font-bold">{symptom.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${symptom.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{symptom.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Medicines Sold */}
          <div className="card-glass">
            <h2 className="text-2xl font-bold text-white mb-6">Top Medicines Sold</h2>
            <div className="space-y-4">
              {mockAnalytics.medicinesSold.map((medicine, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-green-400">#{index + 1}</span>
                      <span className="text-white font-semibold">{medicine.label}</span>
                    </div>
                    <span className="text-cyan-400 font-bold">{medicine.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${medicine.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{medicine.percentage}% of sales</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders & Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="card-glass">
            <p className="text-gray-400 text-sm mb-2">Orders This Month</p>
            <p className="text-4xl font-bold text-blue-400 mb-2">{mockAnalytics.ordersThisMonth.toLocaleString()}</p>
            <p className="text-xs text-green-400">↑ 12.3% from last month</p>
          </div>
          <div className="card-glass">
            <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
            <p className="text-4xl font-bold text-purple-400 mb-2">₹{(mockAnalytics.revenueThisMonth / 100000).toFixed(1)}L</p>
            <p className="text-xs text-green-400">↑ 15.7% from last month</p>
          </div>
          <div className="card-glass">
            <p className="text-gray-400 text-sm mb-2">Avg Order Value</p>
            <p className="text-4xl font-bold text-cyan-400 mb-2">₹{mockAnalytics.avgOrderValue}</p>
            <p className="text-xs text-gray-400">Per transaction</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="card-glass mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Analytics Information</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>All statistics are based on mock data for demonstration purposes</li>
            <li>Charts update in real-time as users interact with the platform</li>
            <li>User retention rate measures repeat user engagement</li>
            <li>Platform uptime ensures 24/7 availability</li>
            <li>Top symptoms help identify common health concerns</li>
            <li>Medicine sales track the most popular health products</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
