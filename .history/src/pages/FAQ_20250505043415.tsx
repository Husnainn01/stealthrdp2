import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  // Organized FAQ list by categories
  const faqs = [
    // Services & Plans
    {
      question: "What services does StealthRDP offer?",
      answer: "StealthRDP specializes in providing robust Remote Desktop Protocol (RDP) servers, Virtual Private Servers (VPS), and dedicated hosting solutions. We offer pre-configured plans in the USA and EU regions, as well as a 'Build Your Own' custom VPS option that allows you to select your exact specifications."
    },
    {
      question: "Where are your data centers located?",
      answer: "We currently operate data centers in the United States (for USA plans) and the Netherlands (for EU plans). All our data centers feature state-of-the-art infrastructure with redundant power supplies, cooling systems, and network connections to ensure maximum reliability and uptime."
    },
    {
      question: "What is the difference between USA and EU plans?",
      answer: "USA and EU plans offer similar specifications but are hosted in different geographic locations. USA plans are hosted in our US-based data centers, while EU plans are hosted in the Netherlands. The main difference is latency - choose the region closest to your location or target audience for optimal performance. Resource allocations and pricing may vary slightly between equivalent tiers in different regions."
    },
    {
      question: "What is the 'Build Your Own VPS' option?",
      answer: "Our Build Your Own VPS option allows complete customization of your server resources. You can select your preferred CPU cores (1-32), RAM (1GB-128GB), and SSD storage (20GB-2TB) based on your specific needs. You can also choose your preferred operating system, data center location (USA or EU), and billing cycle. This option provides maximum flexibility and ensures you only pay for exactly what you need."
    },
    {
      question: "What operating systems are available?",
      answer: "We offer a wide range of Windows and Linux operating systems. For Windows, we support Windows Server 2016, 2019, 2022, as well as Windows 10 and 11. For Linux, we offer Ubuntu (18.04, 20.04, 22.04), CentOS (7, 8, Stream), Debian (10, 11), and other popular distributions. Custom OS installations may be available upon request."
    },
    {
      question: "What features are included with StealthRDP plans?",
      answer: "All our plans include: dedicated IPv4 addresses, high-speed network connections (1Gbps standard), unlimited bandwidth (fair usage policy applies), full Administrator/Root access, 99.99% uptime guarantee, DDoS protection, and responsive technical support. Higher-tier plans include additional features like priority support, enhanced DDoS protection, and faster provisioning times."
    },
    
    // Pricing & Billing
    {
      question: "What billing cycles do you offer?",
      answer: "We offer flexible billing cycles to suit different needs: Monthly (5% discount compared to standard rates), Quarterly (10% discount), Annual (20% discount), and BiAnnual/2-year (30% discount). The longer the billing cycle you choose, the greater your savings."
    },
    {
      question: "How do the discounts work?",
      answer: "Discounts are automatically applied based on your selected billing cycle. For example, if a plan costs $100/month at standard rates, you would pay $95/month on the monthly cycle (5% off), $90/month on the quarterly cycle (10% off), $80/month on the annual cycle (20% off), or $70/month on the biannual cycle (30% off). The total amount charged will be for the entire period (e.g., 3 months for quarterly billing)."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), as well as select cryptocurrencies. For enterprise customers, we may offer additional payment options including wire transfers and purchase orders. Contact our sales team for more information about payment options for your specific location."
    },
    {
      question: "Is there a trial period for your services?",
      answer: "We do not currently offer a free trial period. However, we provide a 48-hour satisfaction guarantee on new accounts. If you're not completely satisfied with our service within the first 48 hours, contact our support team to discuss your concerns. We're confident in the quality of our services and work hard to ensure customer satisfaction."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Our services are generally non-refundable after the 48-hour satisfaction guarantee period. Refunds may be considered on a case-by-case basis for significant service disruptions caused by our infrastructure, subject to review. Please refer to our Terms of Service for detailed information about our refund policy."
    },
    
    // Account Management
    {
      question: "How do I sign up for StealthRDP services?",
      answer: "Signing up is simple: 1) Choose your desired service (USA RDP/VPS, EU RDP/VPS, or Build Your Own) on our website, 2) Select a plan and billing cycle that meets your needs, 3) Complete the checkout process with your payment information, 4) Receive your service credentials via email within minutes of payment confirmation, 5) Log in and start using your new server!"
    },
    {
      question: "How quickly are services activated?",
      answer: "Most services are activated within 5-10 minutes after payment confirmation. The exact time depends on the operating system being installed and current system load. For standard Windows and Linux installations, activation is typically completed within 5 minutes. For custom configurations or during peak periods, it may take up to 15 minutes. You'll receive an email with your login credentials as soon as your server is ready."
    },
    {
      question: "Can I upgrade or downgrade my service plan?",
      answer: "Yes, you can upgrade your plan at any time through your client area. When upgrading, you'll only be charged the prorated difference between your current plan and the new plan for the remaining billing period. Downgrades are typically processed at the end of your current billing cycle. Please contact our support team for assistance with plan changes."
    },
    {
      question: "Can I cancel my service at any time?",
      answer: "Yes, you can cancel your service at any time through your client area. For monthly plans, service will continue until the end of the current paid period. For longer billing cycles, please review our Terms of Service regarding potential refunds for unused service time. To retain your data, make sure to back up all important information before cancellation, as all data is permanently deleted upon service termination."
    },
    
    // Technical Support & Security
    {
      question: "What kind of access do I get with RDP/VPS plans?",
      answer: "All our RDP and VPS plans include full Administrator (Windows) or Root (Linux) access, giving you complete control over your server environment. This allows you to install software, configure settings, and manage users according to your requirements. We do not impose any restrictions on legitimate software installations or configurations."
    },
    {
      question: "What should I do if I experience technical issues?",
      answer: "If you encounter technical problems, you can contact our support team via the ticketing system in your client area or by emailing support@stealthrdp.com. Our technical support team is available 24/7, with typical response times of 10-30 minutes during business hours and within 2 hours outside business hours. For critical issues affecting service availability, we offer priority support for enterprise customers."
    },
    {
      question: "How is my data protected with StealthRDP?",
      answer: "We implement multiple security measures to protect your data: 1) Physical security at our data centers including biometric access controls and 24/7 surveillance, 2) Network security with enterprise-grade firewalls and DDoS protection, 3) Regular security patches and updates for host systems, 4) Encrypted storage options available on request. However, we recommend maintaining your own regular backups of critical data as an additional precaution."
    },
    {
      question: "Do you provide backup services?",
      answer: "We perform weekly backups of our entire server infrastructure for disaster recovery purposes. However, PLEASE DO NOT use your server as a storage solution for critically important data. While we take all precautions, servers can experience hardware issues or become unresponsive. It is your responsibility to perform regular backups of your important data. We cannot restore individual files if hardware issues occur. Remember: Your data's safety is ultimately your responsibility. We recommend implementing your own backup strategy for any data you cannot afford to lose."
    },
    {
      question: "What happens if I violate the Terms of Service?",
      answer: "Violations of our Terms of Service may result in immediate suspension or termination of your services without refund. Prohibited activities include illegal content distribution, unauthorized scanning or hacking attempts, spamming, operating botnets, and resource abuse affecting other customers. We strictly enforce these policies to maintain network integrity, service quality, and legal compliance. Minor violations may receive a warning, while serious violations will result in immediate account termination."
    },
    {
      question: "Is DDoS protection included with all plans?",
      answer: "Yes, all our plans include basic DDoS protection that mitigates common attacks up to 10Gbps. Higher-tier plans include enhanced DDoS protection with coverage up to 50Gbps. For customers requiring additional protection, we offer premium DDoS mitigation as an add-on service, providing coverage up to 100Gbps with advanced traffic filtering capabilities."
    }
  ];
  
  // Function to open network status in a new tab
  const openNetworkStatus = () => {
    window.open('https://status.stealthrdp.com', '_blank');
  };
  
  return (
    <Layout>
      <div className="py-20 md:py-28 bg-charcoal text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-montserrat">
              Frequently Asked <span className="text-electric">Questions</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find answers to common questions about StealthRDP services, plans, billing, and technical details.
            </p>
          </div>

          {/* Network Status Bar */}
          <div className="mb-8 bg-midnight rounded-lg p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="font-medium text-white text-lg flex items-center">
                <span className="w-3 h-3 rounded-full bg-cyber mr-2"></span>
                All Systems Operational
              </h3>
              <p className="text-gray-400 text-sm">Check our real-time service status</p>
            </div>
            <button 
              onClick={openNetworkStatus} 
              className="mt-3 sm:mt-0 px-4 py-2 bg-midnight border border-electric text-electric hover:bg-electric/10 rounded-lg text-sm font-medium transition-colors"
            >
              View Network Status
            </button>
          </div>

          {/* Single Accordion for all FAQs */}
          <div className="bg-midnight rounded-lg p-4 md:p-6 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <AccordionTrigger className="text-left hover:text-electric py-4 text-base md:text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-1 pb-4 text-sm md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-16 bg-gradient-to-r from-cyber/10 to-electric/10 border border-electric/20 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Our expert support team is available 24/7 to help you with any inquiries. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-electric px-6 py-2.5 rounded-lg font-medium" onClick={() => window.open('mailto:support@stealthrdp.com', '_self')}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
