import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Shield, Cpu, Database, Server, HardDrive, Settings, Globe, Zap, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // USA VPS plan data
  const usaPlans = [
    {
      name: 'Bronze USA',
      description: 'Blazing Fast Connectivity',
      icon: <Cpu className="h-10 w-10 text-electric" />,
      monthlyPrice: 7.00,
      yearlyPrice: 168.00, // yearly price for 2 years
      specs: {
        cpu: '2 Core',
        ram: '4 GB RAM',
        storage: '60 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime', 'USA Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Silver USA',
      description: 'Blazing Fast Connectivity',
      icon: <Server className="h-10 w-10 text-electric" />,
      monthlyPrice: 13.29,
      yearlyPrice: 318.96,
      specs: {
        cpu: '2 Core',
        ram: '8 GB RAM',
        storage: '80 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime', 'USA Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Gold USA',
      description: 'Blazing Fast Connectivity',
      icon: <HardDrive className="h-10 w-10 text-electric" />,
      monthlyPrice: 19.69,
      yearlyPrice: 472.56,
      specs: {
        cpu: '4 Core',
        ram: '16 GB RAM',
        storage: '100 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'USA Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Platinum USA',
      description: 'Blazing Fast Connectivity',
      icon: <Database className="h-10 w-10 text-cyber" />,
      monthlyPrice: 24.49,
      yearlyPrice: 587.76,
      specs: {
        cpu: '6 Core',
        ram: '16 GB RAM',
        storage: '100 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'USA Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Diamond USA',
      description: 'Blazing Fast Connectivity',
      icon: <Shield className="h-10 w-10 text-cyber" />,
      monthlyPrice: 31.50,
      yearlyPrice: 756.00,
      specs: {
        cpu: '6 Core',
        ram: '32 GB RAM',
        storage: '150 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Premium Support', 'Root Access', '99.9% Uptime', 'USA Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Emerald USA',
      description: 'Blazing Fast Connectivity',
      icon: <Server className="h-10 w-10 text-cyber" />,
      monthlyPrice: 37.80,
      yearlyPrice: 907.20,
      specs: {
        cpu: '8 Core',
        ram: '32 GB RAM',
        storage: '150 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Premium Support', 'Root Access', '99.9% Uptime', 'USA Location', '1Gbps Network', 'Dedicated IP']
    }
  ];

  // EU VPS plan data
  const euPlans = [
    {
      name: 'Basic EU VPS',
      description: 'Entry-level VPS with reliable performance',
      icon: <Cpu className="h-10 w-10 text-electric" />,
      monthlyPrice: 29.99,
      yearlyPrice: 299.90,
      specs: {
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        storage: '80 GB SSD',
        bandwidth: '2 TB Bandwidth'
      },
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime', 'Netherlands Location']
    },
    {
      name: 'Standard EU VPS',
      description: 'Balanced performance for everyday usage',
      icon: <Server className="h-10 w-10 text-electric" />,
      monthlyPrice: 49.99,
      yearlyPrice: 499.90,
      specs: {
        cpu: '4 vCPU',
        ram: '8 GB RAM',
        storage: '160 GB SSD',
        bandwidth: '4 TB Bandwidth'
      },
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', 'Free Domain']
    },
    {
      name: 'Pro EU VPS',
      description: 'Enhanced power for demanding applications',
      icon: <HardDrive className="h-10 w-10 text-electric" />,
      monthlyPrice: 69.99,
      yearlyPrice: 699.90,
      specs: {
        cpu: '6 vCPU',
        ram: '16 GB RAM',
        storage: '320 GB SSD',
        bandwidth: '6 TB Bandwidth'
      },
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', 'Free Domain', 'Daily Backups']
    },
    {
      name: 'Business EU VPS',
      description: 'Powerful resources for business workloads',
      icon: <Database className="h-10 w-10 text-cyber" />,
      monthlyPrice: 99.99,
      yearlyPrice: 999.90,
      specs: {
        cpu: '8 vCPU',
        ram: '32 GB RAM',
        storage: '640 GB SSD',
        bandwidth: '8 TB Bandwidth'
      },
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', 'Free Domain', 'Daily Backups']
    }
  ];

  // Custom VPS plan data
  const customPlans = [
    {
      name: 'Build Your Own VPS',
      description: 'Tailor-made virtual server with flexible resources',
      icon: <Settings className="h-10 w-10 text-cyber" />,
      monthlyPrice: null,
      yearlyPrice: null,
      specs: {
        cpu: 'Custom CPU',
        ram: 'Custom RAM',
        storage: 'Custom Storage',
        bandwidth: 'Flexible Bandwidth'
      },
      features: [
        'Windows/Linux OS',
        'Customizable Resources',
        'Scale Up or Down as Needed',
        'Choose Your Location (USA or EU)',
        'Pay Only for What You Need',
        'Full Configuration Control'
      ],
      isCustom: true
    }
  ];

  const renderPlanCard = (plan) => (
    <Card className={`bg-midnight border-gray-800 hover:border-electric transition-all duration-300 card-hover ${plan.isCustom ? 'border-cyber' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-gray-800/50">
            {plan.icon}
          </div>
          <div className="text-right">
            {plan.monthlyPrice !== null ? (
              <>
                <span className="text-sm text-gray-400">Starting at</span>
                <div className="font-bold text-2xl text-white">
                  €{billingCycle === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice / 12).toFixed(2)}
                  <span className="text-sm text-gray-400 font-normal">/mo</span>
                </div>
              </>
            ) : (
              <div className="font-bold text-xl text-cyber">Custom Pricing</div>
            )}
          </div>
        </div>
        <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
        <CardDescription className="text-gray-400">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center">
              <span className="text-gray-400">CPU</span>
              <span className="text-white font-medium">{plan.specs.cpu}</span>
            </div>
            <div className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center">
              <span className="text-gray-400">RAM</span>
              <span className="text-white font-medium">{plan.specs.ram}</span>
            </div>
            <div className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center">
              <span className="text-gray-400">Storage</span>
              <span className="text-white font-medium">{plan.specs.storage}</span>
            </div>
            <div className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center">
              <span className="text-gray-400">Bandwidth</span>
              <span className="text-white font-medium">{plan.specs.bandwidth}</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-2">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Check className={`h-4 w-4 ${plan.isCustom ? 'text-cyber' : 'text-cyber'}`} />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${plan.isCustom ? 'bg-cyber hover:bg-cyber/80' : 'bg-electric hover:bg-electric/80'} text-charcoal`}>
          {plan.isCustom ? 'Configure Now' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Layout>
      <div className="py-20 md:py-28 bg-charcoal">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              StealthRDP <span className="text-electric">VPS Plans</span>
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              High-performance virtual private servers with unparalleled speed, security, and reliability. Choose the plan that fits your needs.
            </p>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-midnight inline-flex p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md transition-all ${
                  billingCycle === 'monthly' ? 'bg-electric text-midnight font-medium' : 'text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md transition-all ${
                  billingCycle === 'yearly' ? 'bg-electric text-midnight font-medium' : 'text-gray-400'
                }`}
              >
                Yearly (Save 16%)
              </button>
            </div>
          </div>
          
          {/* Location Tabs */}
          <Tabs defaultValue="usa" className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-midnight p-1">
                <TabsTrigger value="usa" className="data-[state=active]:bg-electric data-[state=active]:text-midnight">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>USA Plans</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="eu" className="data-[state=active]:bg-electric data-[state=active]:text-midnight">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>EU Plans</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="custom" className="data-[state=active]:bg-cyber data-[state=active]:text-midnight">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Build Your Own</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* USA Plans */}
            <TabsContent value="usa" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {usaPlans.map((plan, index) => (
                  <div key={index}>
                    {renderPlanCard(plan)}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* EU Plans */}
            <TabsContent value="eu" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {euPlans.map((plan, index) => (
                  <div key={index}>
                    {renderPlanCard(plan)}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Custom Plans */}
            <TabsContent value="custom" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="bg-midnight border border-cyber rounded-xl p-8 md:p-12 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-6">
                        Design Your <span className="text-cyber">Ideal Server</span>
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Our custom VPS solution allows you to build exactly the server you need. Choose your CPU cores, RAM amount, storage space, and more to create a perfectly tailored virtual private server.
                      </p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Complete resource customization</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Choice of US or EU data centers</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Pay only for what you actually need</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Instant scaling as your needs change</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyber/20 to-electric/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                        <Settings className="h-40 w-40 text-cyber relative z-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {customPlans.map((plan, index) => (
                    <div key={index}>
                      {renderPlanCard(plan)}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Easy Steps Section */}
          <div className="py-16 border-t border-gray-800">
            <div className="text-center mb-16">
              <h3 className="text-xl md:text-2xl font-semibold text-electric mb-4">
                Features that brings maximum power to your Project.
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-midnight rounded-xl p-6 text-center hover:border-electric border border-gray-800 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <Zap className="h-16 w-16 text-electric" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Instant Activation</h4>
                <p className="text-gray-400">
                  Experience the speed of instant activation: launch your services instantly and seamlessly!
                </p>
              </div>
              
              <div className="bg-midnight rounded-xl p-6 text-center hover:border-electric border border-gray-800 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <Clock className="h-16 w-16 text-electric" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">99.99% Server Uptime</h4>
                <p className="text-gray-400">
                  Server uptime for uninterrupted online presence and maximum business continuity.
                </p>
              </div>
              
              <div className="bg-midnight rounded-xl p-6 text-center hover:border-electric border border-gray-800 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <Globe className="h-16 w-16 text-electric" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Low Latency Network</h4>
                <p className="text-gray-400">
                  Strengthening your online presence with global reach and unparalleled resilience.
                </p>
              </div>
              
              <div className="bg-midnight rounded-xl p-6 text-center hover:border-electric border border-gray-800 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <Database className="h-16 w-16 text-electric" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Disaster Recovery</h4>
                <p className="text-gray-400">
                  Empowering you with weekly data assurance and during hardware failures.
                </p>
              </div>
            </div>
          </div>
          
          {/* FAQs CTA */}
          <div className="text-center mt-16">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Have questions about our VPS plans?</h3>
            <p className="text-gray-400 mb-6">Check our frequently asked questions or contact our support team.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="border-electric text-electric hover:bg-electric/10">
                <a href="/faq">Read FAQs</a>
              </Button>
              <Button asChild className="bg-cyber text-midnight hover:bg-cyber/90">
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
