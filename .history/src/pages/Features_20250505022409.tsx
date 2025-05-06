import React from 'react';
import Layout from '@/components/Layout';
import { Check, Shield, Cpu, Database, Server, HardDrive, Globe, Zap, Clock, Cloud, Lock, Users, Laptop, BarChart } from 'lucide-react';

const Features = () => {
  // Main service categories
  const serviceCategories = [
    {
      title: "Remote Desktop Protocol (RDP) Services",
      description: "Dedicated RDP servers with full admin rights for optimal remote computing",
      icon: <Server className="h-16 w-16 text-electric mb-4" />,
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
      icon: <Cloud className="h-16 w-16 text-electric mb-4" />,
      features: [
        "Cloud VPS solutions for versatile applications",
        "Windows VPS hosting with intuitive interface",
        "Linux VPS hosting for flexibility and customization",
        "Forex VPS optimized for traders",
        "Full root access for complete control"
      ]
    }
  ];

  // Hardware resources features
  const hardwareFeatures = [
    {
      title: "CPU Options",
      description: "Powerful processing capabilities to handle any workload",
      icon: <Cpu className="h-12 w-12 text-cyber mb-4" />,
      features: [
        "Range from 2 cores to 8 cores depending on plan",
        "Dedicated CPU resources with no overselling",
        "Optimized for high-performance applications",
        "Perfect for multi-tasking environments",
        "Low-latency processing for time-sensitive operations"
      ]
    },
    {
      title: "Memory (RAM)",
      description: "Ample memory for smooth multitasking and demanding applications",
      icon: <Database className="h-12 w-12 text-cyber mb-4" />,
      features: [
        "Options from 4GB to 32GB based on your needs",
        "Guaranteed dedicated RAM allocation",
        "High-speed memory access",
        "No resource contention with other users",
        "Ideal for memory-intensive applications"
      ]
    },
    {
      title: "Storage",
      description: "Fast, reliable SSD storage for optimal performance",
      icon: <HardDrive className="h-12 w-12 text-cyber mb-4" />,
      features: [
        "SSD storage ranging from 40GB to 150GB",
        "High-performance storage solutions",
        "Fast read/write speeds for demanding applications",
        "Daily data backups available",
        "Storage expansion options available"
      ]
    },
    {
      title: "Network",
      description: "Robust networking for fast, reliable connections",
      icon: <Globe className="h-12 w-12 text-cyber mb-4" />,
      features: [
        "1Gbps network speeds across all plans",
        "Unlimited bandwidth for unrestrained usage",
        "Dedicated IP addresses with each server",
        "Low-latency connections for real-time applications",
        "Premium network infrastructure with high availability"
      ]
    }
  ];

  // Security and management features
  const additionalFeatures = [
    {
      title: "Security Features",
      description: "Enterprise-grade protection for your virtual infrastructure",
      icon: <Shield className="h-12 w-12 text-electric mb-4" />,
      features: [
        "Secure network infrastructure",
        "Clean, dedicated IPs verified against blacklists",
        "Private network architecture",
        "Regular security updates and patches",
        "Firewall configuration options"
      ]
    },
    {
      title: "Management Features",
      description: "Intuitive tools to control and monitor your servers",
      icon: <Users className="h-12 w-12 text-electric mb-4" />,
      features: [
        "Comprehensive control panel for server management",
        "Ability to reset, stop, and start virtual machines",
        "Custom OS installation options",
        "24/7 customer support via ticket system",
        "Extensive knowledge base resources"
      ]
    },
    {
      title: "Data Protection",
      description: "Keep your data safe with robust backup solutions",
      icon: <Lock className="h-12 w-12 text-electric mb-4" />,
      features: [
        "Daily data backups available",
        "Disaster recovery options",
        "99.99% uptime guarantee",
        "Data integrity monitoring",
        "Robust data storage architecture"
      ]
    }
  ];

  // Specialized use cases
  const useCases = [
    {
      title: "Forex Trading",
      description: "Optimized infrastructure for trading platforms and algorithms",
      icon: <BarChart className="h-12 w-12 text-cyber mb-4" />,
      features: [
        "Low-latency connections for real-time trading",
        "Suitable for MetaTrader and EA bots",
        "High-frequency trading support",
        "24/7 uptime for global markets",
        "Proximity to financial exchanges"
      ]
    },
    {
      title: "Remote Work",
      description: "Seamless remote access for distributed teams",
      icon: <Laptop className="h-12 w-12 text-cyber mb-4" />,
      features: [
        "Multiple remote access accounts",
        "Run any software remotely",
        "Full admin access for complete control",
        "Secure connections from any location",
        "Consistent performance regardless of local hardware"
      ]
    },
    {
      title: "Enterprise Solutions",
      description: "Scalable infrastructure for business operations",
      icon: <Server className="h-12 w-12 text-cyber mb-4" />,
      features: [
        "Custom enterprise configurations available",
        "Multiple server deployment options",
        "Dedicated support channels",
        "Resource scaling as business grows",
        "Integration with existing infrastructure"
      ]
    }
  ];

  // Service guarantees
  const guarantees = [
    {
      title: "99.99% Uptime",
      description: "Our servers maintain exceptional reliability with minimal downtime",
      icon: <Clock className="h-16 w-16 text-electric mb-4" />
    },
    {
      title: "Instant Activation",
      description: "Get your server up and running immediately after purchase",
      icon: <Zap className="h-16 w-16 text-electric mb-4" />
    },
    {
      title: "24/7 Support",
      description: "Our technical experts are available around the clock to assist you",
      icon: <Users className="h-16 w-16 text-electric mb-4" />
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
      <section className="py-16 bg-midnight">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Core Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-charcoal rounded-xl p-8 card-hover">
                <div className="flex justify-center">{category.icon}</div>
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
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Resources Section */}
      <section className="py-16 bg-charcoal">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Premium Hardware Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardwareFeatures.map((feature, index) => (
              <div key={index} className="bg-midnight rounded-xl p-6 card-hover">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold font-montserrat text-white mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-6 text-center">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-cyber mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Management Section */}
      <section className="py-16 bg-midnight">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Security & Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-charcoal rounded-xl p-6 card-hover">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold font-montserrat text-white mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-6 text-center">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-cyber mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-charcoal">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Specialized Use Cases
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-midnight rounded-xl p-6 card-hover">
                <div className="flex justify-center">{useCase.icon}</div>
                <h3 className="text-xl font-bold font-montserrat text-white mb-2 text-center">{useCase.title}</h3>
                <p className="text-gray-400 text-sm mb-6 text-center">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.features.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-cyber mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees Section */}
      <section className="py-16 bg-midnight">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Our Guarantees
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="bg-charcoal rounded-xl p-8 flex flex-col items-center card-hover">
                {guarantee.icon}
                <h3 className="text-xl font-bold font-montserrat text-white mb-3 text-center">{guarantee.title}</h3>
                <p className="text-gray-400 text-center">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Locations Section */}
      <section className="py-16 bg-charcoal">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Global Server Locations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-midnight rounded-xl p-8 card-hover">
              <h3 className="text-2xl font-bold font-montserrat text-white mb-4 text-center">United States</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">Strategic US-based data centers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">1Gbps network speeds</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">Low-latency connections</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">Ideal for North American clients</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">Advanced security infrastructure</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-midnight rounded-xl p-8 card-hover">
              <h3 className="text-2xl font-bold font-montserrat text-white mb-4 text-center">Netherlands</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">European data center location</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">Offshore server options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">1Gbps network connectivity</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">Excellent for European businesses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                  <span className="text-gray-300">GDPR-compliant infrastructure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features; 