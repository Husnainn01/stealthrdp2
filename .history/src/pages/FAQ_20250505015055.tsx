
import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is StealthRDP?",
      answer: "StealthRDP is a secure, high-performance Remote Desktop Protocol (RDP) solution that provides businesses and individuals with enterprise-grade remote desktop infrastructure. Our service offers 99.9% uptime SLA, 24/7 expert support, and full root access to your virtual machines."
    },
    {
      question: "How do I get started with StealthRDP?",
      answer: "Getting started is simple: 1) Sign up for an account, 2) Choose and customize your plan based on your needs, and 3) Access your RDP immediately after payment through instant activation. Our intuitive dashboard makes setup and management straightforward."
    },
    {
      question: "What operating systems do you support?",
      answer: "StealthRDP supports Windows Server 2019/2022, Windows 10/11 Pro, and various Linux distributions including Ubuntu, CentOS, and Debian. All operating systems are regularly updated with the latest security patches."
    },
    {
      question: "Can I upgrade my plan at any time?",
      answer: "Yes, you can upgrade your plan at any time through your dashboard. The pricing will be prorated, so you only pay for the difference. Downgrades can be processed at the end of your billing cycle to avoid service interruption."
    },
    {
      question: "Do you offer dedicated IP addresses?",
      answer: "Yes, all StealthRDP plans come with a dedicated IP address. For enterprise customers who require multiple dedicated IPs, we offer IP blocks that can be assigned to your virtual machines as needed."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and various cryptocurrencies including Bitcoin, Ethereum, and Litecoin for enhanced privacy and security."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, we offer a 7-day money-back guarantee on all our plans. If you're not satisfied with our service for any reason, contact our support team within the first week for a full refund."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 technical support via live chat, email, and ticket system. Our support team consists of experienced professionals who can assist with setup, troubleshooting, and optimization of your StealthRDP environment."
    },
    {
      question: "Do you have data centers worldwide?",
      answer: "Yes, we operate data centers across North America, Europe, Asia-Pacific, and South America. This global infrastructure ensures low-latency connections regardless of your location or the location of your end users."
    },
    {
      question: "How secure is StealthRDP?",
      answer: "StealthRDP implements multiple layers of security including end-to-end encryption, two-factor authentication, intrusion detection systems, regular security audits, and DDoS protection. Your data and connections are protected with industry-standard AES-256 encryption."
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-montserrat bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-lg">
              Find answers to common questions about StealthRDP services
            </p>
          </div>
          
          <div className="bg-midnight rounded-2xl p-6 shadow-lg shadow-electric/10">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-gray-800 last:border-0"
                >
                  <AccordionTrigger className="text-white hover:text-electric font-montserrat font-medium text-lg py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-cyber/20 to-electric/20 p-6 rounded-xl text-center">
            <h3 className="text-2xl font-montserrat font-bold mb-3 text-white">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-4">
              Our expert support team is ready to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button className="btn-electric px-6 py-3 rounded-lg flex items-center justify-center">
                Contact Support
              </button>
              <button className="border border-electric text-electric hover:bg-electric/10 transition-all duration-200 px-6 py-3 rounded-lg flex items-center justify-center">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
