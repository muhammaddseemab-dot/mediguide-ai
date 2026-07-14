'use client'

import React from 'react'
import Link from 'next/link'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-blue-200 bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-white mb-4">MediGuide AI</h3>
            <p className="text-sm text-slate-400">
              Advanced healthcare solutions powered by artificial intelligence
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/symptom-checker" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Symptom Checker</Link></li>
              <li><Link href="/marketplace" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Marketplace</Link></li>
              <li><Link href="/about" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-slate-400">
                <a href="mailto:info@mediguide.ai" className="hover:text-blue-400 transition-colors">info@mediguide.ai</a>
              </li>
              <li className="text-sm text-slate-400">
                <span>+1 (234) 567-890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p className="mb-2">© {currentYear} MediGuide AI. All rights reserved.</p>
          <p className="text-xs">
            <strong>Medical Disclaimer:</strong> This platform provides AI-generated health insights, not medical diagnoses. 
            Always consult healthcare professionals for serious concerns.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
