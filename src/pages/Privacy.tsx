import SEO from '@/components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy | Julisha Solutions"
        description="Learn how Julisha Solutions collects, uses, and protects your personal information."
        url="https://julishasolutions.com/privacy"
      />
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFD700]">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last updated: January 2026</p>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                Julisha Solutions ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-[#FFD700] mb-2">Personal Information</h3>
              <p className="mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fill out contact forms or request demos</li>
                <li>Subscribe to our newsletter</li>
                <li>Use our BrandWise service recommendations tool</li>
                <li>Communicate with us via email or chat</li>
              </ul>
              
              <h3 className="text-xl font-medium text-[#FFD700] mb-2 mt-4">Automatically Collected Information</h3>
              <p>
                When you visit our website, we automatically collect certain information including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring URLs and navigation paths</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use collected information for purposes including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and improving our services</li>
                <li>Responding to inquiries and support requests</li>
                <li>Sending newsletters and marketing communications (with consent)</li>
                <li>Analyzing website usage to enhance user experience</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Analytics and Tracking</h2>
              <p>
                We use Google Analytics 4 to collect and analyze website usage data. This service may use 
                cookies and similar technologies to track your interactions with our website. You can opt 
                out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors (lawyers, accountants, auditors)</li>
                <li>Government authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights (GDPR Compliance)</h2>
              <p className="mb-4">If you are in the European Economic Area, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request erasure of your data</li>
                <li>Restrict or object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
              <p>
                We retain personal information for as long as necessary to fulfill the purposes outlined 
                in this policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p>
                For questions about this Privacy Policy or to exercise your rights, contact us at:
              </p>
              <p className="mt-2 text-[#FFD700]">
                Email: privacy@julishasolutions.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
