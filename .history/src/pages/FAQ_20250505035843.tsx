import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  const faqs = [
    {
      category: "General",
      items: [
        {
          question: "What services does StealthRDP offer?",
          answer: "StealthRDP specializes in providing robust Remote Desktop Protocols (RDPs), Virtual Private Servers (VPS), and web hosting solutions tailored to meet a variety of cloud-based needs. We offer pre-configured plans in the USA and EU, as well as a 'Build Your Own' VPS option."
        },
        {
          question: "How do I sign up for StealthRDP services?",
          answer: "You can sign up through our website, StealthRDP.com. Simply choose your desired service (USA RDP/VPS, EU RDP/VPS, or Build Your Own), select a plan and billing cycle, complete the payment process, and follow the instructions to set up your account."
        },
        {
          question: "Where are your data centers located?",
          answer: "We currently have data centers located in the United States (USA plans) and the Netherlands (EU plans). You can choose your preferred location when selecting a plan or building your own VPS."
        },
        {
          question: "What is the difference between USA and EU plans?",
          answer: "Our USA and EU plans offer similar performance tiers but are hosted in different geographic locations to provide lower latency for users in those regions. Specific resource allocations (CPU, RAM, Storage) may vary slightly between equivalent tiers. Please check the Plans page for detailed specifications."
        },
      ]
    },
    {
      category: "Billing & Payments",
      items: [
        {
          question: "What payment methods are accepted by StealthRDP?",
          answer: "We currently accept major Credit/Debit Cards and potentially cryptocurrency. Please refer to the checkout process or contact support for the most up-to-date list of accepted payment methods."
        },
        {
          question: "What billing cycles do you offer?",
          answer: "We offer Monthly, Quarterly, Annually (1 year), and BiAnnually (2 years) billing cycles. Longer billing cycles come with significant discounts (up to 30% off). You can select your preferred billing cycle on the Plans page."
        },
        {
          question: "How do the discounts work?",
          answer: "We offer discounts for longer billing periods compared to the standard monthly rate. Currently, the discounts are: Monthly (5%), Quarterly (10%), Annually (20%), and BiAnnually (30%). The discounted price is reflected when you select a billing cycle on the Plans page."
        },
        {
          question: "Is there a trial period for your services?",
          answer: "StealthRDP does not currently offer a free trial period. However, we are confident in the quality and reliability of our services."
        },
        {
          question: "How can I get a refund?",
          answer: "Our services are generally non-refundable. Refunds may be considered only in specific cases of significant service downtime caused by internal issues, subject to review and approval. Please refer to our Terms of Service for full details."
        },
        {
          question: "Can I cancel my service at any time?",
          answer: "Yes, you can cancel your service at any time. Please refer to our Terms of Service policy for details regarding the cancellation process and any potential implications."
        }
      ]
    },
    {
      category: "Services & Features",
      items: [
        {
          question: "Can I upgrade or downgrade my service plan?",
          answer: "Yes, service plan modifications may be possible. Please contact our support team for assistance with upgrading or downgrading your plan and to understand any pricing adjustments."
        },
        {
          question: "What kind of access do I get with RDP/VPS plans?",
          answer: "All our RDP and VPS plans come with full Administrator/Root access, giving you complete control over your server environment."
        },
        {
          question: "What operating systems are available?",
          answer: "We offer various Windows (Server and Desktop versions) and Linux (Ubuntu, CentOS, Debian, etc.) operating systems. The specific options may vary depending on the plan. You can typically choose your preferred OS during the setup process."
        },
        {
          question: "What is the 'Build Your Own VPS' option?",
          answer: "This option allows you to fully customize your VPS resources. You can select the exact amount of CPU cores, RAM, and SSD storage you need, choose your location (USA or EU), and pick your operating system, paying only for what you configure."
        },
        {
          question: "What features are included with the plans?",
          answer: "Standard features include dedicated IP addresses, high-speed (typically 1Gbps) network connections, unlimited bandwidth (on most plans), and 99.9% uptime guarantee. Specific features like support levels (Standard, Priority, Premium) can vary by plan tier. See the Plans and Features pages for details."
        }
      ]
    },
    {
      category: "Technical & Support",
      items: [
        {
          question: "What should I do if I experience technical issues?",
          answer: "If you encounter any technical problems, please contact our support team immediately via our ticketing system or email. Our support hours are extensive, and we aim to respond quickly (typically within 10-30 minutes during support hours)."
        },
        {
          question: "How quickly are services activated?",
          answer: "Service activation is typically very fast, usually within 5-10 minutes after payment confirmation, depending on the OS installation process. You will receive your service credentials via email."
        },
        {
          question: "How is my data protected with StealthRDP?",
          answer: "We prioritize security with measures like secure network infrastructure and clean IPs. While we implement robust security, we always recommend customers maintain their own regular backups for critical data."
        },
        {
          question: "What happens if I violate the Terms of Service?",
          answer: "Violating our Terms of Service (e.g., activities like port scanning, DDoS attacks, running botnets) can result in the suspension or termination of your services without refund. We enforce these policies strictly to maintain network integrity and legal compliance."
        }
      ]
    }
  ];
  
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

          {faqs.map((categoryData, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-cyber mb-6 border-b border-gray-800 pb-3">
                {categoryData.category}
              </h2>
              <div className="bg-midnight rounded-lg p-4 md:p-6 shadow-lg">
                <Accordion type="single" collapsible className="w-full">
                  {categoryData.items.map((faq, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`item-${categoryIndex}-${itemIndex}`}
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
            </div>
          ))}

          <div className="mt-16 bg-gradient-to-r from-cyber/10 to-electric/10 border border-electric/20 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Our expert support team is available during business hours to help you. Check our documentation or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-electric px-6 py-2.5 rounded-lg font-medium">
                Contact Support
              </button>
              {/* Link to documentation page if available */}
              {/* <button className="border border-electric text-electric hover:bg-electric/10 transition-all duration-200 px-6 py-2.5 rounded-lg font-medium">
                View Documentation
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
