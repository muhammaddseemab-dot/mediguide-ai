'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockMedicines, Medicine } from '@/lib/mockData'

export default function MedicineManagementPage() {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const categories = ['all', ...new Set(medicines.map(m => m.category))]

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || med.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const updateStock = (medicineId: string, newStock: number) => {
    setMedicines(medicines.map(m =>
      m.id === medicineId ? { ...m, stock: Math.max(0, newStock) } : m
    ))
  }

  const updatePrice = (medicineId: string, newPrice: number) => {
    setMedicines(medicines.map(m =>
      m.id === medicineId ? { ...m, price: Math.max(0, newPrice) } : m
    ))
  }

  const togglePrescriptionRequired = (medicineId: string) => {
    setMedicines(medicines.map(m =>
      m.id === medicineId ? { ...m, requiresPrescription: !m.requiresPrescription } : m
    ))
  }

  const getLowStockColor = (stock: number): string => {
    if (stock > 500) return 'text-green-400'
    if (stock > 100) return 'text-yellow-400'
    return 'text-red-400'
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
            Medicine Catalog Management
          </h1>
          <p className="text-gray-300 text-lg">
            Manage medicines, stock levels, and pricing
          </p>
        </div>

        {/* Controls */}
        <div className="card-glass mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Search Medicines</label>
              <input
                type="text"
                placeholder="Search by name or generic name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-base w-full"
              />
            </div>

            {/* Filter by Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Filter by Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input-base w-full"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.id} className="card-glass">
              {/* Header */}
              <div className="mb-4 pb-4 border-b border-blue-400/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{medicine.name}</h3>
                    <p className="text-sm text-gray-400">{medicine.genericName}</p>
                  </div>
                  <span className="text-3xl">💊</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="badge badge-primary text-xs">{medicine.category}</span>
                  <span className="badge badge-secondary text-xs">{medicine.dosage}</span>
                  <span className={`badge text-xs ${medicine.requiresPrescription ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                    {medicine.requiresPrescription ? 'Rx Required' : 'OTC'}
                  </span>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-3 mb-4 pb-4 border-b border-blue-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Manufacturer:</span>
                  <span className="text-white font-semibold">{medicine.manufacturer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Form:</span>
                  <span className="text-white font-semibold">{medicine.form}</span>
                </div>
              </div>

              {/* Price Control */}
              <div className="mb-4 pb-4 border-b border-blue-400/20">
                <label className="text-sm font-semibold text-gray-300 mb-2 block">Price: ₹</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={medicine.price}
                    onChange={(e) => updatePrice(medicine.id, parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    className="input-base flex-1"
                  />
                  <span className="text-blue-400 font-bold text-lg flex items-center">₹{medicine.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Stock Control */}
              <div className="mb-4 pb-4 border-b border-blue-400/20">
                <label className="text-sm font-semibold text-gray-300 mb-2 block">Stock Level:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStock(medicine.id, medicine.stock - 10)}
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    value={medicine.stock}
                    onChange={(e) => updateStock(medicine.id, parseInt(e.target.value))}
                    min="0"
                    className="input-base flex-1"
                  />
                  <button
                    onClick={() => updateStock(medicine.id, medicine.stock + 10)}
                    className="btn btn-sm btn-primary"
                  >
                    +10
                  </button>
                  <span className={`font-bold text-lg flex items-center ${getLowStockColor(medicine.stock)}`}>
                    {medicine.stock}
                  </span>
                </div>
              </div>

              {/* Description */}
              {medicine.description && (
                <div className="mb-4 pb-4 border-b border-blue-400/20">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Description:</p>
                  <p className="text-gray-400 text-sm">{medicine.description}</p>
                </div>
              )}

              {/* Side Effects */}
              {medicine.sideEffects.length > 0 && (
                <div className="mb-4 pb-4 border-b border-blue-400/20">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Side Effects:</p>
                  <div className="flex flex-wrap gap-2">
                    {medicine.sideEffects.map((effect) => (
                      <span key={effect} className="badge bg-yellow-500/20 text-yellow-300 text-xs">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contraindications */}
              {medicine.contraindications.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Contraindications:</p>
                  <div className="flex flex-wrap gap-2">
                    {medicine.contraindications.map((contra) => (
                      <span key={contra} className="badge bg-red-500/20 text-red-300 text-xs">
                        {contra}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prescription Toggle */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-gray-300">Requires Prescription:</span>
                <button
                  onClick={() => togglePrescriptionRequired(medicine.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    medicine.requiresPrescription ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      medicine.requiresPrescription ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No medicines found matching your criteria
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Total Medicines</p>
            <p className="text-2xl font-bold text-blue-400">{medicines.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Total Stock Value</p>
            <p className="text-2xl font-bold text-green-400">
              ₹{medicines.reduce((sum, m) => sum + (m.stock * m.price), 0).toLocaleString()}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Low Stock Items</p>
            <p className="text-2xl font-bold text-red-400">
              {medicines.filter(m => m.stock < 100).length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm mb-2">Prescription Required</p>
            <p className="text-2xl font-bold text-yellow-400">
              {medicines.filter(m => m.requiresPrescription).length}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="card-glass mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Medicine Management Features</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Search medicines by name or generic name</li>
            <li>Filter by category</li>
            <li>Update prices in real-time</li>
            <li>Manage stock levels with +/- buttons</li>
            <li>Toggle prescription requirement</li>
            <li>View side effects and contraindications</li>
            <li>Monitor low stock items</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
