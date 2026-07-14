'use client'

import Link from 'next/link'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Manage MediGuide AI platform resources and analytics
          </p>
        </div>

        {/* Admin Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* User Management */}
          <Link href="/admin/users" className="group">
            <div className="card-glass h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 mb-2">
                    User Management
                  </h3>
                  <p className="text-gray-400">
                    Manage users, roles, and permissions
                  </p>
                </div>
                <span className="text-4xl">👥</span>
              </div>
              <div className="pt-4 border-t border-blue-400/20 flex items-center justify-between">
                <span className="text-blue-400 font-semibold">View Users</span>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </Link>

          {/* Medicine Management */}
          <Link href="/admin/medicines" className="group">
            <div className="card-glass h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 mb-2">
                    Medicine Catalog
                  </h3>
                  <p className="text-gray-400">
                    Manage medicines and inventory
                  </p>
                </div>
                <span className="text-4xl">💊</span>
              </div>
              <div className="pt-4 border-t border-blue-400/20 flex items-center justify-between">
                <span className="text-blue-400 font-semibold">View Medicines</span>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link href="/admin/analytics" className="group">
            <div className="card-glass h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 mb-2">
                    Analytics
                  </h3>
                  <p className="text-gray-400">
                    View platform statistics and insights
                  </p>
                </div>
                <span className="text-4xl">📊</span>
              </div>
              <div className="pt-4 border-t border-blue-400/20 flex items-center justify-between">
                <span className="text-blue-400 font-semibold">View Analytics</span>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="card-glass mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-700/50">
              <p className="text-gray-400 text-sm mb-2">Total Users</p>
              <p className="text-3xl font-bold text-blue-400">15,240</p>
              <p className="text-xs text-gray-500 mt-2">↑ 8.5% from last month</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/50">
              <p className="text-gray-400 text-sm mb-2">Active Today</p>
              <p className="text-3xl font-bold text-green-400">2,340</p>
              <p className="text-xs text-gray-500 mt-2">15.4% of total users</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/50">
              <p className="text-gray-400 text-sm mb-2">Orders This Month</p>
              <p className="text-3xl font-bold text-cyan-400">3,450</p>
              <p className="text-xs text-gray-500 mt-2">↑ 12.3% from last month</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-700/50">
              <p className="text-gray-400 text-sm mb-2">Platform Uptime</p>
              <p className="text-3xl font-bold text-purple-400">99.87%</p>
              <p className="text-xs text-gray-500 mt-2">Excellent performance</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-glass">
          <h2 className="text-2xl font-bold text-white mb-6">Important Notes</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>This is a mock admin dashboard with sample data</li>
            <li>All statistics are for demonstration purposes only</li>
            <li>Navigate to specific sections using the menu above</li>
            <li>In a production environment, this would be connected to a real database</li>
            <li>Admin features require proper authentication and authorization</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
