import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { faqApi } from '@/lib/api/faqApi';
import { IFaq, FaqCategory } from '@/lib/models/Faq';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQPage = () => {
  // State for FAQ data
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  // Fetch FAQs on component mount
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const data = await faqApi.getPublishedFaqs();
        console.log('Fetched FAQs:', data);
        setFaqs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
        // Do NOT set fallback data here - we only want dynamic data
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Function to open network status in a new tab
  const openNetworkStatus = () => {
    window.location.href = '/server-status';
  };

  // Toggle FAQ expansion
  const toggleFaq = (faqId: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  // Group FAQs by category for display
  const groupedFaqs = faqs.reduce<Record<string, IFaq[]>>((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});
  
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

          {loading ? (
            <div className="bg-midnight rounded-lg p-6 shadow-lg flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber"></div>
            </div>
          ) : error ? (
            <div className="bg-midnight rounded-lg p-6 shadow-lg flex flex-col justify-center items-center h-64">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-midnight border border-white/20 text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div>
              {Object.entries(groupedFaqs).length > 0 ? (
                Object.entries(groupedFaqs).map(([category, categoryFaqs], categoryIndex) => (
                  <div key={categoryIndex} className="mb-12 last:mb-0">
                    <h2 className="text-2xl font-semibold mb-6 text-electric">{category}</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {categoryFaqs.map((faq) => (
                        <motion.div 
                          key={faq._id}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card 
                            className={`bg-[#0C0F2D] border ${expandedFaqs[faq._id] ? 'border-electric shadow-[0_0_20px_rgba(0,240,255,0.25)]' : 'border-gray-800'} rounded-xl overflow-hidden cursor-pointer transition-all duration-300`}
                            onClick={() => toggleFaq(faq._id)}
                          >
                            <CardHeader className="p-5">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg md:text-xl font-medium text-white flex items-center">
                                  <div className="mr-3 text-electric">
                                    <Check className="h-5 w-5" />
                                  </div>
                                  {faq.question}
                                </CardTitle>
                                <div className="text-electric">
                                  {expandedFaqs[faq._id] ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            {expandedFaqs[faq._id] && (
                              <CardContent className="px-5 pb-5 pt-0 text-gray-300">
                                <div className="border-t border-gray-700 pt-4">
                                  {faq.answer}
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-400">No FAQs available at the moment. Please check back later or visit our admin panel to add FAQs.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-16 bg-gradient-to-r from-cyber/10 to-electric/10 border border-electric/20 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Our expert support team is available 24/7 to help you with any inquiries. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                className="btn-electric px-6 py-2.5 rounded-lg font-medium" 
                onClick={() => window.open('https://stealthrdp.com/dash/submitticket.php', '_blank')}
              >
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

