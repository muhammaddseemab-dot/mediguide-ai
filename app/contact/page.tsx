export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Contact Us</h1>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Get in Touch</h2>
            <p className="mb-6 text-gray-600">
              Have questions about MediGuide AI? We're here to help! Reach out to us using the information below.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:info@mediguide.ai" className="text-blue-600 hover:underline">
                    info@mediguide.ai
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+1 (234) 567-890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">123 Health Tech St, Innovation City, IC 12345</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={4} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
              </div>
              <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}