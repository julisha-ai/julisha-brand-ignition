import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <>
      <SEO 
        title="Terms of Service | Julisha AI Solutions"
        description="Terms of Service governing your use of Julisha AI Solutions services, platforms, and AI-powered solutions."
        url="https://julishasolutions.com/terms"
      />
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD700]">Terms of Service</h1>
          <p className="text-gray-400 mb-2">Effective Date: 01 January 2026</p>
          <p className="text-gray-400 mb-8">Last Updated: 01 January 2026</p>
          
          <div className="space-y-10 text-gray-300">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                These Terms of Service ("Terms") govern your access to and use of the services, platforms, 
                software, content, and solutions provided by Julisha AI Solutions, operating as Julisha Solutions 
                ("Company," "we," "us," or "our").
              </p>
              <p className="mb-4">
                By accessing, using, purchasing, or engaging our services, you confirm that you have read, 
                understood, and agreed to be bound by these Terms, together with any applicable Service Orders, 
                Statements of Work (SOWs), or policies referenced herein. If you do not agree, you must not 
                access or use our services.
              </p>
              <p>
                You represent that you are at least 18 years old and have the legal authority to enter into 
                these Terms on behalf of yourself or the entity you represent.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Scope of Services</h2>
              <p className="mb-4">Julisha AI Solutions provides professional AI and digital services, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Autonomous & Intelligent Agent Development</li>
                <li>AI Consulting & Enterprise Advisory</li>
                <li>Conversational AI & Chatbot Development</li>
                <li>Workflow Automation & AI Integration</li>
                <li>Online Brand Management & Digital PR</li>
                <li>AI Literacy, Training & Capacity Building</li>
                <li>AI Governance, Ethics & Responsible AI Advisory</li>
              </ul>
              <p>
                The specific scope, deliverables, timelines, pricing, and obligations for each engagement 
                shall be defined in a separate written agreement, proposal, or Statement of Work. In the 
                event of conflict, the SOW shall prevail over these Terms for that engagement.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Client & User Responsibilities</h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information necessary for service delivery</li>
                <li>Use our services in compliance with all applicable laws, regulations, and industry standards</li>
                <li>Maintain the confidentiality and security of any access credentials provided</li>
                <li>Ensure that any data, content, or materials you provide do not infringe third-party rights</li>
                <li>Promptly notify us of any unauthorized use, security breach, or suspected misuse</li>
              </ul>
              <p className="text-[#FFD700] font-medium">
                You remain solely responsible for decisions, actions, and outcomes resulting from your use of 
                AI-generated outputs, recommendations, or automation tools.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. AI-Specific Disclosures & Limitations</h2>
              <p className="mb-4">You acknowledge and agree that:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>AI systems may generate inaccurate, incomplete, or biased outputs</li>
                <li>AI-generated content does not constitute legal, medical, financial, or regulatory advice</li>
                <li>Human review, validation, and oversight are required before relying on AI outputs for critical decisions</li>
                <li>Julisha Solutions does not guarantee AI outputs will be error-free, compliant, or suitable for every purpose</li>
              </ul>
              <div className="bg-gray-900 border-l-4 border-[#FFD700] p-4 rounded-r">
                <p className="font-medium text-white">
                  ⚠ You assume full responsibility for how AI outputs are used, implemented, or relied upon.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-medium text-[#FFD700] mb-3">5.1 Our Intellectual Property</h3>
              <p className="mb-4">
                All software, models, methodologies, workflows, frameworks, training materials, documentation, 
                branding, and underlying technology used or provided by Julisha AI Solutions are and remain our 
                exclusive intellectual property or that of our licensors.
              </p>
              <p className="mb-6">
                Except as expressly permitted in writing, you may not copy, modify, reverse engineer, distribute, 
                sublicense, or create derivative works from our proprietary materials.
              </p>
              
              <h3 className="text-xl font-medium text-[#FFD700] mb-3">5.2 Client Materials</h3>
              <p>
                You retain ownership of content and data you provide to us. You grant Julisha Solutions a limited, 
                non-exclusive license to use such materials solely for the purpose of delivering the agreed services.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Data Protection & Privacy</h2>
              <p className="mb-4">
                We process personal data in accordance with our{' '}
                <Link to="/privacy" className="text-[#FFD700] hover:text-[#FFE44D] underline">Privacy Policy</Link>, 
                applicable data protection laws, and recognized international standards, including where applicable:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>General Data Protection Regulation (GDPR – EU/EEA)</li>
                <li>Applicable U.S. data protection and consumer privacy laws</li>
              </ul>
              <p>
                By using our services, you consent to the collection, processing, storage, and use of data as 
                described in our Privacy Policy. Where required, Data Processing Agreements (DPAs) will be 
                executed separately.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Confidentiality</h2>
              <p className="mb-4">
                Both parties agree to maintain the confidentiality of all non-public, proprietary, or sensitive 
                information disclosed during the course of the engagement, unless disclosure is required by law 
                or permitted in writing.
              </p>
              <p className="text-[#FFD700]">
                This obligation survives termination of services.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Fees, Payments & Taxes</h2>
              <p className="mb-4">
                Fees for services are specified in individual service agreements, proposals, or Statements of Work.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fees are agreed upfront before work commences</li>
                <li>Payments are generally non-refundable after work begins</li>
                <li>Late payments may result in suspension of services</li>
                <li>You are responsible for applicable taxes unless otherwise specified</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">To the maximum extent permitted by law, Julisha AI Solutions shall not be liable for:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, business opportunities, or goodwill</li>
                <li>Errors, interruptions, or failures arising from third-party platforms or integrations</li>
                <li>Decisions or actions taken based on AI-generated outputs</li>
              </ul>
              <p>
                Our total cumulative liability for any claim shall not exceed the amount paid by you for the 
                specific service giving rise to the claim during the three (3) months preceding the event.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
              <p className="mb-4">You agree to indemnify and hold harmless Julisha AI Solutions from any claims, damages, liabilities, or expenses arising from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your misuse of the services</li>
                <li>Violation of these Terms</li>
                <li>Infringement of third-party rights</li>
                <li>Unlawful or unethical application of AI outputs</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Suspension & Termination</h2>
              <p className="mb-4">We may suspend or terminate access to services, with or without notice, if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>These Terms are breached</li>
                <li>Use poses legal, ethical, or security risks</li>
                <li>Required payments are not made</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Modifications to Services & Terms</h2>
              <p>
                We may update these Terms or modify services periodically to reflect legal, technological, or 
                business changes. Updated Terms will be effective upon posting. Continued use constitutes acceptance.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law & Dispute Resolution</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya, 
                without regard to conflict-of-law principles.
              </p>
              <p>
                The parties agree to first attempt good-faith negotiation before pursuing formal legal action. 
                Courts of competent jurisdiction in Kenya shall have exclusive jurisdiction, unless otherwise 
                agreed in writing.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Severability</h2>
              <p>
                If any provision of these Terms is found unenforceable, the remaining provisions shall remain 
                in full force and effect.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">15. Contact Information</h2>
              <p className="mb-4">For questions regarding these Terms, please contact:</p>
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
                <Link to="/privacy" className="text-[#FFD700] hover:text-[#FFE44D] underline">Privacy Policy</Link>
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
