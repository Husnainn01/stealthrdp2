import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, Calendar, InfoIcon, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { privacyPolicyApi } from '@/lib/api/privacyPolicyApi';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Custom styles for the privacy policy content
const privacyPolicyStyles = `
  .privacy-policy-content {
    color: white;
  }
  
  .privacy-policy-content h1,
  .privacy-policy-content h2,
  .privacy-policy-content h3,
  .privacy-policy-content h4,
  .privacy-policy-content h5,
  .privacy-policy-content h6 {
    color: white;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
    font-weight: 600;
    line-height: 1.3;
  }
  
  .privacy-policy-content h1 {
    font-size: 2.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }
  
  .privacy-policy-content h2 {
    font-size: 1.875rem;
    color: #00F0FF;
  }
  
  .privacy-policy-content h3 {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .privacy-policy-content p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .privacy-policy-content strong {
    color: #00F0FF;
    font-weight: 600;
  }
  
  .privacy-policy-content ul,
  .privacy-policy-content ol {
    margin-bottom: 1rem;
    margin-left: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .privacy-policy-content ul li,
  .privacy-policy-content ol li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }
  
  .privacy-policy-content a {
    color: #00F0FF;
    text-decoration: underline;
    transition: color 0.2s;
  }
  
  .privacy-policy-content a:hover {
    color: #22D46B;
  }
  
  .privacy-policy-content blockquote {
    border-left: 4px solid #00F0FF;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
  }
  
  .privacy-policy-content hr {
    border: 0;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 2rem 0;
  }
  
  .privacy-policy-card {
    transition: all 0.3s ease;
  }
  
  .privacy-policy-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 240, 255, 0.1), 0 8px 10px -6px rgba(0, 240, 255, 0.1);
  }
  
  .privacy-policy-section-card {
    transition: all 0.2s ease;
    cursor: pointer;
  }
  
  .privacy-policy-section-card:hover {
    background-color: rgba(16, 18, 36, 0.6);
  }
`;

// Extract the first section (Introduction) from the HTML content
const extractIntroduction = (htmlContent: string): string => {
  try {
    // Find the introduction section
    const introRegex = /<h3[^>]*>1\.\s*Introduction<\/h3>([\s\S]*?)(?=<h3)/i;
    const match = htmlContent.match(introRegex);
    
    if (match && match[1]) {
      return `<h3>1. Introduction</h3>${match[1].trim()}`;
    }
    
    // Fallback to first paragraph if no introduction section found
    const firstParaRegex = /<p>([\s\S]*?)<\/p>/i;
    const paraMatch = htmlContent.match(firstParaRegex);
    
    if (paraMatch && paraMatch[0]) {
      return paraMatch[0];
    }
    
    return '<p>This Privacy Policy describes how we handle your personal information.</p>';
  } catch (e) {
    return '<p>This Privacy Policy describes how we handle your personal information.</p>';
  }
};

// Extract sections from privacy policy
const extractSections = (htmlContent: string): { title: string, content: string }[] => {
  try {
    // Match all h3 headers and their content
    const sectionRegex = /<h3[^>]*>(.*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi;
    const sections: { title: string, content: string }[] = [];
    
    let match;
    while ((match = sectionRegex.exec(htmlContent)) !== null) {
      const title = match[1].replace(/^\d+\.\s*/, '').trim();
      const content = match[0].trim();
      sections.push({ title, content });
    }
    
    return sections;
  } catch (e) {
    return [];
  }
};

const PrivacyPolicy: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [policy, setPolicy] = useState<{
    content: string;
    lastUpdated: Date | string;
    effectiveDate: Date | string;
    publishedVersion: string;
  } | null>(null);
  const [expandedCard, setExpandedCard] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        const data = await privacyPolicyApi.getPrivacyPolicy();
        setPolicy(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setError('Failed to load privacy policy. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  // Format date for display
  const formatDate = (date: string | Date) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMMM d, yyyy');
    } catch (e) {
      return 'Unknown date';
    }
  };
  
  // Toggle section expansion
  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  // Get policy sections
  const sections = policy ? extractSections(policy.content) : [];
  const introduction = policy ? extractIntroduction(policy.content) : '';

  return (
    <Layout>
      {/* Inject custom styles */}
      <style>{privacyPolicyStyles}</style>
      
      {/* Hero Section */}
      <motion.section
        className="py-16 md:py-24 bg-gradient-to-b from-midnight to-charcoal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 inline-flex items-center justify-center p-2 bg-electric/10 rounded-full"
            >
              <FileText className="h-5 w-5 text-electric mr-2" />
              <span className="text-electric font-medium">Legal</span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/70 mb-8"
            >
              How we collect, use, and protect your personal information
            </motion.p>
            
            {!loading && policy && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4 text-sm"
              >
                <div className="bg-charcoal/50 border border-white/10 rounded-full px-4 py-2 inline-flex items-center">
                  <Calendar className="h-4 w-4 text-electric mr-2" />
                  <span className="text-white/80">
                    Effective: {formatDate(policy.effectiveDate)}
                  </span>
                </div>
                
                <div className="bg-charcoal/50 border border-white/10 rounded-full px-4 py-2 inline-flex items-center">
                  <Clock className="h-4 w-4 text-electric mr-2" />
                  <span className="text-white/80">
                    Last Updated: {formatDate(policy.lastUpdated)}
                  </span>
                </div>
                
                <div className="bg-charcoal/50 border border-white/10 rounded-full px-4 py-2 inline-flex items-center">
                  <InfoIcon className="h-4 w-4 text-electric mr-2" />
                  <span className="text-white/80">
                    Version {policy.publishedVersion}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>
      
      {/* Content Section */}
      <section className="py-16 bg-charcoal">
        <div className="container max-w-4xl mx-auto px-4 space-y-8">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-48 w-full bg-white/5 rounded-xl" />
              <Skeleton className="h-24 w-full bg-white/5 rounded-xl" />
              <Skeleton className="h-24 w-full bg-white/5 rounded-xl" />
              <Skeleton className="h-24 w-full bg-white/5 rounded-xl" />
            </div>
          ) : error ? (
            <div className="text-center py-12 px-6 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-red-500 mb-4 text-xl">
                <InfoIcon className="h-10 w-10 mx-auto mb-4" />
                Unable to load privacy policy
              </div>
              <p className="text-white/70 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-electric text-midnight rounded-md hover:bg-electric/90 transition-colors"
              >
                Refresh page
              </button>
            </div>
          ) : policy ? (
            <>
              {/* Main Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card 
                  className={`bg-midnight border-electric/20 shadow-glow-sm privacy-policy-card 
                    ${expandedCard ? 'border-electric/40' : 'cursor-pointer'}`}
                  onClick={() => !expandedCard && setExpandedCard(true)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-electric" />
                        <CardTitle className="text-white text-xl">Privacy Policy Summary</CardTitle>
                      </div>
                      {expandedCard ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/70 hover:text-electric hover:bg-midnight"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(false);
                          }}
                        >
                          <ChevronUp className="h-5 w-5" />
                        </Button>
                      ) : (
                        <ChevronDown className="h-5 w-5 text-electric" />
                      )}
                    </div>
                    <CardDescription className="text-white/70">
                      Important information about how we handle your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="privacy-policy-content">
                      <div dangerouslySetInnerHTML={{ __html: introduction }} />
                    </div>
                  </CardContent>
                  {!expandedCard && (
                    <CardFooter className="border-t border-white/5 pt-4 flex justify-center">
                      <Button 
                        variant="ghost" 
                        className="text-electric hover:bg-electric/10"
                      >
                        Read Full Policy
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
              
              {/* Expanded Content */}
              <AnimatePresence>
                {expandedCard && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {sections.filter(section => !section.title.toLowerCase().includes('introduction')).map((section, index) => (
                      <Card 
                        key={index}
                        className="bg-midnight/80 border-white/10 hover:border-electric/20 privacy-policy-section-card"
                        onClick={() => toggleSection(index)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-white text-lg">{section.title}</CardTitle>
                            {expandedSections.has(index) ? (
                              <ChevronUp className="h-5 w-5 text-electric" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-electric" />
                            )}
                          </div>
                        </CardHeader>
                        <AnimatePresence>
                          {expandedSections.has(index) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CardContent>
                                <div 
                                  className="privacy-policy-content"
                                  dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="text-center py-12 px-6 bg-charcoal/60 rounded-lg border border-white/10">
              <InfoIcon className="h-10 w-10 text-electric mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No Privacy Policy Available</h3>
              <p className="text-white/70">
                Our privacy policy is currently being updated. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy; 