import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy | Julisha AI Solutions"
        description="Learn how Julisha AI Solutions collects, uses, protects, and processes your personal data in accordance with GDPR and global data protection standards."
        url="https://julishasolutions.com/privacy"
      />
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD700]">Privacy Policy</h1>
          <p className="text-gray-400 mb-2">Effective Date: 01 January 2026</p>
          <p className="text-gray-400 mb-8">Last Updated: 01 January 2026</p>
          
          <div className="space-y-10 text-gray-300">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                Julisha AI Solutions, operating as Julisha Solutions ("Company," "we," "us," or "our"), is 
                committed to protecting your privacy and handling personal data responsibly, transparently, 
                and in accordance with applicable data protection laws.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, share, and protect personal data 
                when you interact with our services, websites, platforms, AI systems, and communications.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Scope of This Policy</h2>
              <p className="mb-4">This Privacy Policy applies to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Website visitors</li>
                <li>Clients and prospective clients</li>
                <li>Users of our AI systems, chatbots, and platforms</li>
                <li>Participants in training, events, and AI literacy programs</li>
                <li>Business partners and vendors</li>
              </ul>
              <p>
                This Policy should be read together with our{' '}
                <Link to="/terms" className="text-[#FFD700] hover:text-[#FFE44D] underline">Terms of Service</Link>, 
                contracts, and any applicable{' '}
                <Link to="/dpa" className="text-[#FFD700] hover:text-[#FFE44D] underline">Data Processing Agreements (DPAs)</Link>.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Legal Basis for Processing (GDPR Alignment)</h2>
              <p className="mb-4">
                Where applicable under the GDPR and similar regulations, we process personal data based on 
                one or more of the following lawful grounds:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Consent:</strong> Where you have given explicit consent</li>
                <li><strong className="text-white">Contract:</strong> Where processing is necessary for the performance of a contract</li>
                <li><strong className="text-white">Legal Obligation:</strong> Where we are required to comply with legal requirements</li>
                <li><strong className="text-white">Legitimate Interests:</strong> Where processing is necessary for our legitimate business interests</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Types of Data We Collect</h2>
              
              <h3 className="text-xl font-medium text-[#FFD700] mb-3">4.1 Personal Data You Provide</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Name, email address, phone number</li>
                <li>Organization, role, and business details</li>
                <li>Billing and payment information</li>
                <li>Communications and inquiries</li>
              </ul>
              
              <h3 className="text-xl font-medium text-[#FFD700] mb-3">4.2 Automatically Collected Data</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>IP address and device information</li>
                <li>Browser type, operating system</li>
                <li>Usage data, logs, and interaction metadata</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
              
              <h3 className="text-xl font-medium text-[#FFD700] mb-3">4.3 AI & Platform Interaction Data</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>User queries and prompts submitted to AI systems</li>
                <li>Chatbot interaction logs</li>
                <li>Feedback and usage analytics</li>
              </ul>
              
              <div className="bg-gray-900 border-l-4 border-[#FFD700] p-4 rounded-r">
                <p className="font-medium text-white">
                  ⚠ Important: We do not intentionally collect sensitive personal data unless explicitly 
                  required and contractually agreed.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. How We Use Personal Data</h2>
              <p className="mb-4">We use personal data to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Develop, train, and improve AI systems (in anonymized or aggregated form where possible)</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Deliver training, consulting, and advisory services</li>
                <li>Send service updates and operational communications</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. AI-Specific Data Use & Safeguards</h2>
              <p className="mb-4">Because we provide AI-powered services, you acknowledge that:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>AI systems may process user inputs to generate outputs</li>
                <li>Data may be temporarily stored for quality control, debugging, and performance optimization</li>
                <li>AI outputs are generated algorithmically and may not always be accurate</li>
              </ul>
              
              <h3 className="text-xl font-medium text-[#FFD700] mb-3">Safeguards We Apply:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access controls and role-based permissions</li>
                <li>Data minimization principles</li>
                <li>Human oversight for enterprise AI deployments</li>
                <li>Optional client-specific data isolation (where contractually agreed)</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies & Tracking Technologies</h2>
              <p className="mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Enable core website functionality</li>
                <li>Improve performance and user experience</li>
                <li>Analyze traffic and usage trends (including Google Analytics 4)</li>
              </ul>
              <p>
                You may manage or disable cookies via your browser settings. Some features may not function 
                properly without cookies. You can opt out of Google Analytics by installing the 
                Google Analytics Opt-out Browser Add-on.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Data Sharing & Disclosure</h2>
              <p className="mb-4">We may share personal data with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Trusted service providers (hosting, analytics, payment processors)</li>
                <li>Professional advisors (legal, accounting, compliance)</li>
                <li>Regulators or authorities where required by law</li>
              </ul>
              <p className="mt-4 text-[#FFD700] font-medium">
                We do not sell personal data to third parties.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
              <p className="mb-4">Where data is transferred outside your jurisdiction, we ensure appropriate safeguards, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contractual data protection clauses</li>
                <li>Adequate security and compliance controls</li>
                <li>Alignment with GDPR cross-border transfer requirements where applicable</li>
                <li>Standard Contractual Clauses (SCCs) where required</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Data Retention</h2>
              <p className="mb-4">We retain personal data only for as long as necessary to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Fulfill service obligations</li>
                <li>Meet legal, regulatory, or contractual requirements</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p>Data is securely deleted or anonymized when no longer required.</p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Your Rights (GDPR & Global Standards)</h2>
              <p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong className="text-white">Access</strong> — Request a copy of your personal data</li>
                <li><strong className="text-white">Rectification</strong> — Request correction or updates</li>
                <li><strong className="text-white">Erasure</strong> — Request deletion ("right to be forgotten")</li>
                <li><strong className="text-white">Restriction</strong> — Restrict or object to processing</li>
                <li><strong className="text-white">Portability</strong> — Receive your data in a portable format</li>
                <li><strong className="text-white">Withdraw Consent</strong> — Where processing is based on consent</li>
              </ul>
              <p>Requests can be made using the contact details below.</p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Security Measures</h2>
              <p className="mb-4">We implement administrative, technical, and organizational safeguards to protect personal data, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Encryption and secure storage</li>
                <li>Access controls and authentication</li>
                <li>Monitoring and incident response procedures</li>
              </ul>
              <p className="text-gray-400 italic">
                However, no system can be guaranteed 100% secure. We continuously review and update our security measures.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Children's Privacy</h2>
              <p>
                Our services are not directed at children under 18, and we do not knowingly collect personal 
                data from minors. If you believe we have inadvertently collected such data, please contact us 
                immediately for removal.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy to reflect changes in law, technology, or our services. 
                Updates will be posted with a revised "Last Updated" date. Continued use of our services 
                constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">15. Contact Information</h2>
              <p className="mb-4">For privacy-related questions, requests, or concerns, contact:</p>
              <div className="bg-gray-900 p-4 rounded-lg">
                <p className="font-semibold text-white mb-2">Julisha AI Solutions</p>
                <p>
                  <span className="text-gray-400">Email: </span>
                  <a href="mailto:julishaaisolutions@gmail.com" className="text-[#FFD700] hover:text-[#FFE44D]">
                    julishaaisolutions@gmail.com
                  </a>
                </p>
              </div>
            </section>

            {/* Related Policies */}
            <section className="border-t border-gray-800 pt-8">
              <h2 className="text-xl font-semibold text-white mb-4">Related Policies</h2>
              <div className="flex flex-wrap gap-4">
                <Link to="/terms" className="text-[#FFD700] hover:text-[#FFE44D] underline">Terms of Service</Link>
                <Link to="/ai-ethics" className="text-[#FFD700] hover:text-[#FFE44D] underline">AI Use & Ethics Policy</Link>
                <Link to="/dpa" className="text-[#FFD700] hover:text-[#FFE44D] underline">Data Processing Agreement</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
