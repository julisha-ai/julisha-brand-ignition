import SEO from '@/components/SEO';

export default function Terms() {
  return (
    <>
      <SEO 
        title="Terms of Service | Julisha Solutions"
        description="Read the terms and conditions governing your use of Julisha Solutions services."
        url="https://julishasolutions.com/terms"
      />
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#FFD700]">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last updated: January 2026</p>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Julisha Solutions website and services, you agree to be bound 
                by these Terms of Service. If you do not agree to these terms, you may not access or use 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Services Description</h2>
              <p>
                Julisha Solutions provides AI-powered brand management, digital marketing, and governance 
                consulting services. Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Brand Development and Strategy</li>
                <li>AI Integration Solutions</li>
                <li>Digital Marketing Services</li>
                <li>Governance and Compliance Consulting</li>
                <li>BrandWise Service Recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
              <p className="mb-4">When using our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with the proper functioning of our website</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p>
                All content on the Julisha Solutions website, including text, graphics, logos, images, 
                and software, is the property of Julisha Solutions or its licensors and is protected by 
                intellectual property laws. You may not reproduce, distribute, or create derivative works 
                without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Professional Services</h2>
              <p>
                Our consulting and advisory services are provided for informational purposes and should 
                not be considered as legal, financial, or regulatory advice. We recommend consulting with 
                qualified professionals for specific compliance and governance matters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Payment Terms</h2>
              <p>
                For paid services, payment terms will be specified in individual service agreements. 
                All fees are non-refundable unless otherwise stated in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Julisha Solutions shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising from your use 
                of our services. Our total liability shall not exceed the amount paid by you for the 
                specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Julisha Solutions, its officers, directors, 
                employees, and agents from any claims, damages, losses, or expenses arising from your 
                use of our services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to our services at any time, 
                with or without cause, and with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with applicable 
                laws, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of our services constitutes acceptance 
                of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at:
              </p>
              <p className="mt-2 text-[#FFD700]">
                Email: legal@julishasolutions.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
