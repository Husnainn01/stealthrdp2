import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Check, Shield, Cpu, Database, Server, HardDrive, Globe, Zap, Clock, Cloud, Lock, Users, Laptop, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { featureApi } from '@/lib/api/featureApi';
import { IFeature } from '@/lib/models/Feature';

// Icon mapping component
const IconComponent: React.FC<{ name: string }> = ({ name }) => {
  const props = { className: "h-12 w-12 text-cyber mb-4" };
  switch (name) {
    case 'Server': return <Server {...props} />;
    case 'Cloud': return <Cloud {...props} />;
    case 'Settings': return <Settings {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Database': return <Database {...props} />;
    case 'HardDrive': return <HardDrive {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Shield': return <Shield {...props} />;
    case 'Users': return <Users {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'BarChart': return <BarChart {...props} />;
    case 'Laptop': return <Laptop {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Clock': return <Clock {...props} />;
    default: return <Server {...props} />; // Default icon
  }
};

// Function to split description into bullet points
const splitDescriptionToBullets = (description: string): string[] => {
  // Split by newlines or periods followed by a space
  if (description.includes('\n')) {
    return description.split('\n').filter(item => item.trim() !== '');
  } else if (description.includes('. ')) {
    return description.split('. ')
      .filter(item => item.trim() !== '')
      .map(item => item.endsWith('.') ? item : `${item}.`);
  } else {
    return [description]; // Return as single item if no clear separator
  }
};

const Features = () => {
  // State for storing features from API
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allFeatures, setAllFeatures] = useState<IFeature[]>([]);
  
  // Grouped features by category
  const [coreServices, setCoreServices] = useState<IFeature[]>([]);
  const [hardwareFeatures, setHardwareFeatures] = useState<IFeature[]>([]);
  const [additionalFeatures, setAdditionalFeatures] = useState<IFeature[]>([]);
  const [useCases, setUseCases] = useState<IFeature[]>([]);
  const [guarantees, setGuarantees] = useState<IFeature[]>([]);

  // Fetch features from API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const features = await featureApi.getFeatures();
        console.log('Fetched features:', features);
        setAllFeatures(features);
        
        // Group features by category
        setCoreServices(features.filter(f => f.category === 'core-services').sort((a, b) => a.displayOrder - b.displayOrder));
        setHardwareFeatures(features.filter(f => f.category === 'hardware-resources').sort((a, b) => a.displayOrder - b.displayOrder));
        setAdditionalFeatures(features.filter(f => f.category === 'security-management').sort((a, b) => a.displayOrder - b.displayOrder));
        setUseCases(features.filter(f => f.category === 'specialized-use-cases').sort((a, b) => a.displayOrder - b.displayOrder));
        setGuarantees(features.filter(f => f.category === 'service-guarantees').sort((a, b) => a.displayOrder - b.displayOrder));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to load features. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Fallback service categories if API fails or data is empty
  const defaultServiceCategories = [
    {
      title: "Remote Desktop Protocol (RDP) Services",
      description: "Dedicated RDP servers with full admin rights for optimal remote computing",
      iconName: "Server",
      features: [
        "Dedicated servers with full administrative privileges",
        "Multiple locations (USA and Netherlands)",
        "Various tiers with different resource allocations",
        "Secure remote access from anywhere",
        "Instant activation after purchase"
      ]
    },
    {
      title: "Virtual Private Server (VPS) Hosting",
      description: "High-performance cloud infrastructure for businesses and individuals",
      iconName: "Cloud",
      features: [
        "Cloud VPS solutions for versatile applications",
        "Windows VPS hosting with intuitive interface",
        "Linux VPS hosting for flexibility and customization",
        "Forex VPS optimized for traders",
        "Full root access for complete control"
      ]
    },
    {
      title: "Build Your Own VPS",
      description: "Tailor-made virtual server with flexible resources to match your exact requirements",
      iconName: "Settings",
      features: [
        "Customizable CPU, RAM, and storage options",
        "Select your preferred location (USA or Netherlands)",
        "Choose your operating system",
        "Scale resources up or down as your needs change",
        "Pay only for what you need with flexible billing"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-midnight opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#22D46B10_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent fade-in">
              Enterprise-Grade RDP Features
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
              Discover our comprehensive suite of features designed to deliver secure, high-performance remote desktop solutions for businesses and individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 bg-midnight" id="core-services">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Core Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Loading skeleton for core services
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-charcoal animate-pulse rounded-xl p-8 card-hover h-[400px]"></div>
              ))
            ) : error || coreServices.length === 0 ? (
              // Fallback to default data if error or empty
              defaultServiceCategories.map((category, index) => (
                <div key={index} className="bg-charcoal rounded-xl p-8 card-hover">
                  <div className="flex justify-center">
                    <IconComponent name={category.iconName} />
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat text-white mb-4 text-center">{category.title}</h3>
                  <p className="text-gray-400 mb-8 text-center">{category.description}</p>
                  <div className="space-y-3">
                    {category.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Dynamic data from API
              coreServices.map((feature) => (
                <div key={feature._id.toString()} className="bg-charcoal rounded-xl p-8 card-hover">
                  <div className="flex justify-center">
                    <IconComponent name={feature.iconName} />
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat text-white mb-4 text-center">{feature.title}</h3>
                  <div className="space-y-3">
                    {splitDescriptionToBullets(feature.description).map((item, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Hardware Resources Section */}
      <section className="py-16 bg-charcoal" id="hardware">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">Hardware Resources</h2>
            <p className="text-gray-400">
              Our high-performance infrastructure provides the power and reliability your applications need to thrive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Loading skeleton for hardware features
              [...Array(4)].map((_, index) => (
                <div key={index} className="bg-midnight animate-pulse rounded-xl p-6 card-hover h-[300px]"></div>
              ))
            ) : (
              // Display hardware features from API or fallback to empty state with CTA
              hardwareFeatures.length > 0 ? (
                hardwareFeatures.map((feature) => (
                  <div key={feature._id.toString()} className="bg-midnight rounded-xl p-6 card-hover">
                    <div className="flex justify-center">
                      <IconComponent name={feature.iconName} />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-4 text-center">{feature.title}</h3>
                    <div className="space-y-2">
                      {splitDescriptionToBullets(feature.description).map((item, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-cyber mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 bg-midnight/50 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-center mb-4">Hardware resource information will be available soon.</p>
                  <Button asChild className="bg-cyber text-midnight hover:bg-cyber/90">
                    <Link to="/plans">View Available Plans</Link>
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Security & Management Section */}
      <section className="py-16 bg-midnight" id="security">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">Security & Management</h2>
            <p className="text-gray-400">
              Protecting your data and simplifying server management are our top priorities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-charcoal animate-pulse rounded-xl p-6 card-hover h-[300px]"></div>
              ))
            ) : (
              // Display security features from API or empty state
              additionalFeatures.length > 0 ? (
                additionalFeatures.map((feature) => (
                  <div key={feature._id.toString()} className="bg-charcoal rounded-xl p-6 card-hover">
                    <div className="flex justify-center">
                      <IconComponent name={feature.iconName} />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-4 text-center">{feature.title}</h3>
                    <div className="space-y-2">
                      {splitDescriptionToBullets(feature.description).map((item, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-cyber mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 bg-charcoal/50 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-center mb-4">Security and management details will be available soon.</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-charcoal" id="use-cases">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">Specialized Use Cases</h2>
            <p className="text-gray-400">
              Our servers are optimized for a variety of specific applications and industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-midnight animate-pulse rounded-xl p-6 card-hover h-[300px]"></div>
              ))
            ) : (
              // Display use cases from API or empty state
              useCases.length > 0 ? (
                useCases.map((feature) => (
                  <div key={feature._id.toString()} className="bg-midnight rounded-xl p-6 card-hover">
                    <div className="flex justify-center">
                      <IconComponent name={feature.iconName} />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-4 text-center">{feature.title}</h3>
                    <div className="space-y-2">
                      {splitDescriptionToBullets(feature.description).map((item, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-cyber mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 bg-midnight/50 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-center mb-4">Specialized use case information will be available soon.</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Service Guarantees Section */}
      <section className="py-16 bg-midnight" id="guarantees">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">Our Guarantees</h2>
            <p className="text-gray-400">
              We stand behind our service with these core commitments to all customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-charcoal/50 animate-pulse rounded-xl p-8 card-hover h-[200px]"></div>
              ))
            ) : (
              // Display guarantees from API or fallback
              guarantees.length > 0 ? (
                guarantees.map((feature) => (
                  <div key={feature._id.toString()} className="bg-charcoal/50 rounded-xl p-8 card-hover">
                    <div className="flex justify-center">
                      <IconComponent name={feature.iconName} />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-4">{feature.title}</h3>
                    <div className="space-y-2 text-left">
                      {splitDescriptionToBullets(feature.description).map((item, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-cyber mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 bg-charcoal/50 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-center mb-4">Our service guarantees will be published soon.</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-charcoal to-midnight">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-white">Ready to Experience These Features?</h2>
            <p className="text-gray-300 mb-8">
              Deploy your server today and see why thousands of customers trust StealthRDP for their remote computing needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90">
                <Link to="/plans">View Our Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric text-electric hover:bg-electric/10">
                <a href="https://stealthrdp.com/dash/submitticket.php" target="_blank" rel="noopener noreferrer">Contact Sales</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features; 