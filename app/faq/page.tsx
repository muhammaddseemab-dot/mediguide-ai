export default function FAQ() {
  const faqs = [
    {
      question: "What is MediGuide AI?",
      answer: "MediGuide AI is an AI-powered platform that provides health insights, symptom analysis, and emergency detection. It uses advanced artificial intelligence to analyze your symptoms and provide personalized recommendations."
    },
    {
      question: "How accurate is the symptom analysis?",
      answer: "Our AI system is trained on extensive medical data and provides insights based on patterns and medical knowledge. However, it's important to note that this is not a replacement for professional medical diagnosis and should be used as a supplementary tool."
    },
    {
      question: "Is MediGuide AI a replacement for doctors?",
      answer: "No, MediGuide AI is not a replacement for professional medical care. Always consult with healthcare professionals for serious health concerns, emergencies, or medical diagnoses."
    },
    {
      question: "What languages are supported?",
      answer: "MediGuide AI currently supports English, Hindi, and Marathi to make healthcare guidance accessible to a broader audience."
    },
    {
      question: "How does emergency detection work?",
      answer: "Our AI system can identify patterns in symptoms that may indicate emergency situations. When critical symptoms are detected, the system provides immediate guidance and suggests contacting emergency services."
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, we take data privacy and security very seriously. All health information is encrypted and handled according to strict privacy standards."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 rounded-lg bg-blue-50 p-6 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">Still have questions?</h2>
          <p className="mb-4 text-gray-600">Can't find the answer you're looking for? Please contact our support team.</p>
          <a href="/contact" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}