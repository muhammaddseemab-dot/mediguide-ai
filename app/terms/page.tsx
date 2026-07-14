export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Acceptance of Terms</h2>
            <p>
              By accessing and using MediGuide AI, you accept and agree to be bound by the terms 
              and provision of this agreement. These Terms of Service govern your use of our platform.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Medical Disclaimer</h2>
            <p className="mb-4 font-semibold text-red-600">
              IMPORTANT: MediGuide AI is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Always seek the advice of your physician or other qualified health provider</li>
              <li>Never disregard professional medical advice because of something you have read on MediGuide AI</li>
              <li>If you think you may have a medical emergency, call your doctor or emergency services immediately</li>
              <li>The information provided is for educational and informational purposes only</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Use License</h2>
            <p className="mb-4">Permission is granted to temporarily access MediGuide AI for personal, non-commercial use only. This license shall automatically terminate if you violate any restrictions.</p>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes or public display</li>
              <li>Reverse engineer any software contained on the platform</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">User Responsibilities</h2>
            <p className="mb-4">By using MediGuide AI, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Use the platform responsibly and lawfully</li>
              <li>Respect the privacy and rights of others</li>
              <li>Not attempt to harm or disrupt the platform</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
            <p>
              MediGuide AI shall not be held liable for any damages arising from the use or inability 
              to use our platform. We provide the service "as is" without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Privacy</h2>
            <p>
              Your privacy is important to us. Please review our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>,
              which also governs your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting on the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@mediguide.ai" className="text-blue-600 hover:underline">
                legal@mediguide.ai
              </a>
            </p>
          </section>

          <div className="mt-8 border-t border-gray-200 pt-8 text-sm text-gray-500">
            <p>Last updated: July 11, 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}