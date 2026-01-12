import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function AIEthics() {
  return (
    <>
      <SEO 
        title="AI Use & Ethics Policy | Julisha AI Solutions"
        description="Our commitment to ethical, responsible, transparent, and human-centered development and deployment of Artificial Intelligence."
        url="https://julishasolutions.com/ai-ethics"
      />
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FFD700]">AI Use & Ethics Policy</h1>
          <p className="text-gray-400 mb-2">Effective Date: 01 January 2026</p>
          <p className="text-gray-400 mb-8">Last Updated: 01 January 2026</p>
          
          <div className="space-y-10 text-gray-300">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Purpose of This Policy</h2>
              <p className="mb-4">
                Julisha AI Solutions ("Julisha," "we," "our") is committed to the ethical, responsible, 
                transparent, and human-centered development and deployment of Artificial Intelligence (AI).
              </p>
              <p>
                This AI Use & Ethics Policy defines the principles, safeguards, and governance standards 
                guiding how we design, deploy, advise on, and manage AI systems for ourselves and our clients.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Scope</h2>
              <p className="mb-4">This Policy applies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All AI systems, models, agents, and automations developed or deployed by Julisha</li>
                <li>Client-facing AI solutions (chatbots, decision-support systems, workflow automation)</li>
                <li>Internal use of AI for operations, marketing, research, and service delivery</li>
                <li>AI training, literacy, and advisory engagements</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Core Principles of Responsible AI</h2>
              <p className="mb-6">Our approach is guided by internationally recognized principles:</p>
              
              <div className="space-y-6">
                <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-[#FFD700]">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.1 Human Oversight & Accountability</h3>
                  <p className="mb-3">AI must augment, not replace, human judgment.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Critical decisions retain human approval and escalation pathways</li>
                    <li>AI outputs are advisory; final accountability rests with humans</li>
                    <li>Clear roles and responsibilities are established for AI oversight</li>
                  </ul>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-[#FFD700]">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.2 Transparency & Explainability</h3>
                  <p className="mb-3">We strive to make AI behavior understandable to users and stakeholders.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Users should know when they are interacting with AI</li>
                    <li>Limitations, assumptions, and confidence levels are communicated where feasible</li>
                    <li>Black-box systems are avoided in regulated or high-impact environments unless justified and governed</li>
                  </ul>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-[#FFD700]">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.3 Fairness & Bias Mitigation</h3>
                  <p className="mb-3">AI systems must be designed to reduce harm and discrimination, not amplify it.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Bias risks are assessed during design and deployment</li>
                    <li>Training data quality and representativeness are evaluated where possible</li>
                    <li>Outputs that may affect individuals or groups are reviewed for fairness</li>
                  </ul>
                  <div className="mt-4 p-3 bg-gray-800 rounded">
                    <p className="text-sm text-[#FFD700]">
                      ⚠ We acknowledge that no AI system is bias-free; risk mitigation and monitoring are continuous responsibilities.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-[#FFD700]">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.4 Privacy & Data Protection</h3>
                  <p className="mb-3">AI must respect individual privacy and data rights.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Data minimization principles are applied</li>
                    <li>Sensitive personal data is avoided unless explicitly required and contractually agreed</li>
                    <li>Anonymization or aggregation is used where feasible</li>
                    <li>Processing aligns with GDPR, applicable US privacy laws, and contractual obligations</li>
                  </ul>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-[#FFD700]">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.5 Safety, Security & Reliability</h3>
                  <p className="mb-3">AI systems must be secure, resilient, and reliable.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Security controls protect against misuse and unauthorized access</li>
                    <li>System performance and reliability are continuously monitored</li>
                    <li>Incident response procedures are in place for AI-related issues</li>
                  </ul>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-[#FFD700]">
                  <h3 className="text-xl font-medium text-[#FFD700] mb-3">3.6 Lawfulness & Compliance</h3>
                  <p className="mb-3">AI use must comply with applicable laws, regulations, and ethical standards.</p>
                  <p className="mb-2">This includes alignment, where applicable, with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>EU AI Act risk-based principles</li>
                    <li>GDPR and data protection regulations</li>
                    <li>Sector-specific regulations (education, finance, healthcare, public sector)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use of AI</h2>
              <p className="mb-4">Users and clients agree not to use Julisha AI systems for:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Illegal, deceptive, or fraudulent activities</li>
                <li>Discrimination, harassment, or unlawful profiling</li>
                <li>Creation or dissemination of harmful, misleading, or malicious content</li>
                <li>Circumventing safeguards, security, or compliance mechanisms</li>
                <li>High-risk decision-making without appropriate human oversight</li>
              </ul>
              <p className="text-[#FFD700] font-medium">
                We reserve the right to suspend or terminate AI access where misuse or ethical risk is identified.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. AI Output Limitations & Disclaimers</h2>
              <p className="mb-4">Users acknowledge that:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>AI outputs may be inaccurate, incomplete, or outdated</li>
                <li>AI does not possess human understanding, intent, or moral judgment</li>
                <li>Outputs must be independently verified before reliance</li>
                <li>Julisha is not liable for decisions made solely or primarily based on AI outputs</li>
              </ul>
              <div className="bg-gray-900 border-l-4 border-[#FFD700] p-4 rounded-r">
                <p className="font-medium text-white">
                  AI-generated content does not constitute professional advice unless explicitly stated in a signed agreement.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Client Responsibilities in AI Deployments</h2>
              <p className="mb-4">Clients deploying AI solutions are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Defining appropriate use cases and risk tolerance</li>
                <li>Ensuring compliance with industry-specific regulations</li>
                <li>Implementing human oversight and escalation pathways</li>
                <li>Communicating AI usage transparently to end-users where required</li>
                <li>Monitoring real-world impact after deployment</li>
              </ul>
              <p className="text-gray-400 italic">
                Julisha provides guidance, not legal or regulatory guarantees.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. AI Governance & Risk Management</h2>
              <p className="mb-4">For enterprise and institutional clients, Julisha may support:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>AI risk assessments and classification</li>
                <li>Use-case approval frameworks</li>
                <li>Model documentation and usage guidelines</li>
                <li>Ethical review processes</li>
                <li>Staff AI literacy and governance training</li>
              </ul>
              <p className="text-gray-400">Governance depth depends on contractual scope.</p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Continuous Improvement & Review</h2>
              <p className="mb-4">AI ethics is not static.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Policies are reviewed periodically</li>
                <li>Feedback, incidents, and emerging risks inform improvements</li>
                <li>Regulatory developments are monitored</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Reporting Concerns or Incidents</h2>
              <p className="mb-4">
                Suspected misuse, bias, security incidents, or ethical concerns should be reported to:
              </p>
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <p>
                  <span className="text-gray-400">Email: </span>
                  <a href="mailto:julishaaisolutions@gmail.com" className="text-[#FFD700] hover:text-[#FFE44D]">
                    julishaaisolutions@gmail.com
                  </a>
                </p>
              </div>
              <p className="text-[#FFD700]">We take all reports seriously and investigate promptly.</p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Policy Updates</h2>
              <p>
                This Policy may be updated to reflect legal, technological, or operational changes. 
                Continued use of our AI services constitutes acceptance of the updated version.
              </p>
            </section>

            {/* Related Policies */}
            <section className="border-t border-gray-800 pt-8">
              <h2 className="text-xl font-semibold text-white mb-4">Related Policies</h2>
              <div className="flex flex-wrap gap-4">
                <Link to="/terms" className="text-[#FFD700] hover:text-[#FFE44D] underline">Terms of Service</Link>
                <Link to="/privacy" className="text-[#FFD700] hover:text-[#FFE44D] underline">Privacy Policy</Link>
                <Link to="/dpa" className="text-[#FFD700] hover:text-[#FFE44D] underline">Data Processing Agreement</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
