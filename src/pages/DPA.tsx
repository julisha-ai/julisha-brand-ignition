import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function DPA() {
  return (
    <>
      <SEO 
        title="Data Processing Agreement | Julisha AI Solutions"
        description="Data Processing Agreement (DPA) governing the processing of personal data by Julisha AI Solutions on behalf of clients, in compliance with GDPR and data protection standards."
        url="https://julishasolutions.com/dpa"
      />
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD700]">Data Processing Agreement</h1>
          <p className="text-gray-400 mb-2">Effective Date: 01 January 2026</p>
          <p className="text-gray-400 mb-8">Last Updated: 01 January 2026</p>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-8">
            <p className="text-gray-300">
              This Data Processing Agreement ("DPA") forms part of the agreement between:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-300">
              <li><strong className="text-white">Controller:</strong> The Client ("Client," "you")</li>
              <li><strong className="text-white">Processor:</strong> Julisha AI Solutions, operating as Julisha Solutions ("Julisha," "we," "us")</li>
            </ul>
          </div>
          
          <div className="space-y-10 text-gray-300">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Purpose & Scope</h2>
              <p className="mb-4">
                This DPA governs the processing of Personal Data by Julisha on behalf of the Client in 
                connection with the provision of AI, consulting, automation, chatbot, training, and related services.
              </p>
              <p>
                This DPA applies where Julisha acts as a Data Processor under the GDPR, UK GDPR, or 
                equivalent data protection laws.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Definitions</h2>
              <p className="mb-4">Unless otherwise defined, capitalized terms have the meanings given under:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Regulation (EU) 2016/679 (GDPR)</li>
                <li>Applicable data protection laws</li>
              </ul>
              <h3 className="text-lg font-medium text-[#FFD700] mb-3">Key definitions:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Personal Data:</strong> Any information relating to an identified or identifiable natural person</li>
                <li><strong className="text-white">Processing:</strong> Any operation performed on Personal Data</li>
                <li><strong className="text-white">Controller:</strong> Entity determining purposes and means of processing</li>
                <li><strong className="text-white">Processor:</strong> Entity processing Personal Data on behalf of the Controller</li>
                <li><strong className="text-white">Data Subject:</strong> The individual to whom Personal Data relates</li>
                <li><strong className="text-white">Sub-processor:</strong> Third party engaged by the Processor to process Personal Data</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Roles & Responsibilities</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-900 p-5 rounded-lg">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.1 Client (Controller)</h3>
                  <p className="mb-3">The Client:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Determines the purposes and means of processing</li>
                    <li>Ensures a lawful basis for processing Personal Data</li>
                    <li>Is responsible for notices, consent, and compliance obligations</li>
                  </ul>
                </div>

                <div className="bg-gray-900 p-5 rounded-lg">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.2 Julisha (Processor)</h3>
                  <p className="mb-3">Julisha:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Processes Personal Data only on documented instructions from the Client</li>
                    <li>Ensures confidentiality and security</li>
                    <li>Assists the Client with compliance obligations under GDPR</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Details of Processing (Article 28(3))</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-[#FFD700] mb-2">4.1 Subject Matter</h3>
                  <p>Provision of AI-powered services, consulting, automation, chatbot systems, analytics, and training.</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#FFD700] mb-2">4.2 Duration</h3>
                  <p>For the duration of the services and as required for legal or contractual obligations.</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#FFD700] mb-2">4.3 Nature & Purpose</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hosting and operating AI systems</li>
                    <li>Processing user interactions and prompts</li>
                    <li>Analytics, optimization, and support</li>
                    <li>Training and advisory services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#FFD700] mb-2">4.4 Categories of Data Subjects</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Client employees</li>
                    <li>Customers, users, students, or stakeholders</li>
                    <li>Website or platform users</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#FFD700] mb-2">4.5 Categories of Personal Data</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Identifiers (name, email, role)</li>
                    <li>Communication content</li>
                    <li>Usage and interaction data</li>
                    <li>Technical metadata (IP, logs)</li>
                  </ul>
                  <div className="bg-gray-800 border-l-4 border-[#FFD700] p-3 rounded-r">
                    <p className="text-sm text-[#FFD700]">
                      ⚠ Special category data is processed only where explicitly agreed in writing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Processor Obligations</h2>
              <p className="mb-4">Julisha shall:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Process Personal Data only on documented instructions</li>
                <li>Ensure personnel are bound by confidentiality</li>
                <li>Implement appropriate technical and organizational measures</li>
                <li>Assist with data subject rights requests</li>
                <li>Assist with DPIAs and regulatory consultations where applicable</li>
                <li>Notify the Client of Personal Data breaches without undue delay</li>
              </ol>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Security Measures (Article 32)</h2>
              <p className="mb-4">Julisha implements safeguards including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Access controls and authentication</li>
                <li>Data encryption where appropriate</li>
                <li>Secure hosting environments</li>
                <li>Monitoring and incident response procedures</li>
              </ul>
              <p className="text-gray-400">Security measures are continuously reviewed and updated.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Sub-Processors</h2>
              
              <h3 className="text-lg font-medium text-[#FFD700] mb-3">7.1 Authorization</h3>
              <p className="mb-4">The Client provides general authorization for Julisha to engage sub-processors.</p>
              
              <h3 className="text-lg font-medium text-[#FFD700] mb-3">7.2 Obligations</h3>
              <p className="mb-3">All sub-processors are bound by:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Equivalent data protection obligations</li>
                <li>Confidentiality and security requirements</li>
              </ul>
              
              <h3 className="text-lg font-medium text-[#FFD700] mb-3">7.3 Changes</h3>
              <p>Julisha will inform the Client of material changes to sub-processors where required.</p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. International Data Transfers</h2>
              <p className="mb-4">Where Personal Data is transferred outside the EU/EEA or UK, Julisha ensures appropriate safeguards, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Adequacy decisions</li>
                <li>Contractual and technical protections</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Data Subject Rights Assistance</h2>
              <p className="mb-4">Julisha shall assist the Client, where technically feasible, with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access requests</li>
                <li>Rectification</li>
                <li>Erasure</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Personal Data Breach Notification</h2>
              <p>
                Julisha shall notify the Client without undue delay after becoming aware of a Personal Data 
                breach and provide relevant details to support compliance obligations.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Audits & Compliance</h2>
              <p>
                Upon reasonable notice, the Client may audit Julisha's compliance or receive relevant 
                third-party certifications or documentation, subject to confidentiality and security constraints.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Data Deletion or Return</h2>
              <p className="mb-4">Upon termination of services, Julisha shall, at the Client's choice:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Delete Personal Data, or</li>
                <li>Return Personal Data and delete remaining copies</li>
              </ul>
              <p className="text-gray-400">Unless retention is required by law.</p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Liability & Precedence</h2>
              <p>
                Liability under this DPA is subject to the limitations set out in the main agreement. 
                In case of conflict, this DPA prevails regarding data protection matters.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Governing Law</h2>
              <p>
                This DPA is governed by the laws specified in the primary agreement, typically the 
                Republic of Kenya, unless otherwise agreed to meet GDPR requirements.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">15. Contact</h2>
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
                <Link to="/privacy" className="text-[#FFD700] hover:text-[#FFE44D] underline">Privacy Policy</Link>
                <Link to="/ai-ethics" className="text-[#FFD700] hover:text-[#FFE44D] underline">AI Use & Ethics Policy</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
