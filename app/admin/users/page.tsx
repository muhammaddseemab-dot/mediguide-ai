'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockAdminUsers, AdminUser } from '@/lib/mockData'

export default function UserManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'moderator' | 'support'>('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
  }

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-300 border border-red-500/30'
      case 'moderator': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
      case 'support': return 'bg-green-500/20 text-green-300 border border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            User Management
          </h1>
          <p className="text-gray-300 text-lg">
            Manage admin users, moderators, and support staff
          </p>
        </div>

        {/* Controls */}
        <div className="card-glass mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Search Users</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-base w-full"
              />
            </div>

            {/* Filter by Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Filter by Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="input-base w-full"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card-glass overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-400/20">
                <th className="text-left py-4 px-4 text-white font-bold">Name</th>
                <th className="text-left py-4 px-4 text-white font-bold">Email</th>
                <th className="text-left py-4 px-4 text-white font-bold">Role</th>
                <th className="text-left py-4 px-4 text-white font-bold">Status</th>
                <th className="text-left py-4 px-4 text-white font-bold">Joined</th>
                <th className="text-left py-4 px-4 text-white font-bold">Last Login</th>
                <th className="text-left py-4 px-4 text-white font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-blue-400/10 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-4 text-white font-semibold">{user.name}</td>
                  <td className="py-4 px-4 text-gray-300 text-sm">{user.email}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {user.status === 'active' ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300 text-sm">{user.joinedDate}</td>
                  <td className="py-4 px-4 text-gray-300 text-sm">{user.lastLogin}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                        user.status === 'active'
                          ? 'bg-red-600/30 text-red-300 hover:bg-red-600/50'
                          : 'bg-green-600/30 text-green-300 hover:bg-green-600/50'
                      }`}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No users found matching your criteria
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Total Users</p>
            <p className="text-2xl font-bold text-blue-400">{users.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Active Users</p>
            <p className="text-2xl font-bold text-green-400">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Total Actions</p>
            <p className="text-2xl font-bold text-cyan-400">
              {users.reduce((sum, u) => sum + u.actions, 0).toLocaleString()}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Admins</p>
            <p className="text-2xl font-bold text-red-400">
              {users.filter(u => u.role === 'admin').length}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="card-glass mt-8">
          <h3 className="text-xl font-bold text-white mb-4">User Management Features</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Search users by name or email</li>
            <li>Filter by role (Admin, Moderator, Support)</li>
            <li>View user status (Active/Inactive)</li>
            <li>Activate or deactivate user accounts</li>
            <li>Track user activity and last login times</li>
            <li>View total actions performed by each user</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
