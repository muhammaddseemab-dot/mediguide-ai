export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              use our symptom checker, or contact us for support. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information (name, email address, phone number)</li>
              <li>Health information (symptoms, medical history, emergency contacts)</li>
              <li>Usage data (how you interact with our platform)</li>
              <li>Device information (IP address, browser type, operating system)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide AI-powered health insights and symptom analysis</li>
              <li>Detect emergency situations and provide appropriate guidance</li>
              <li>Improve our services and develop new features</li>
              <li>Communicate with you about your account and our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. All 
              health data is encrypted both in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Restrict or object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@mediguide.ai" className="text-blue-600 hover:underline">
                privacy@mediguide.ai
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