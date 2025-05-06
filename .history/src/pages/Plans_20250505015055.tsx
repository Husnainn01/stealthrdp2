
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Shield, Cpu, Database, Server, HardDrive } from 'lucide-react';

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // VPS plan data
  const plans = [
    {
      name: 'Basic VPS',
      description: 'Entry-level VPS with reliable performance',
      icon: <Cpu className="h-10 w-10 text-electric" />,
      monthlyPrice: 29.99,
      yearlyPrice: 299.90, // 10 months price (2 months free)
      specs: {
        cpu: '2 vCPU',
        ram: '4 GB RAM',
        storage: '80 GB SSD',
        bandwidth: '2 TB Bandwidth'
      },
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime']
    },
    {
      name: 'Standard VPS',
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
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime', 'Free Domain']
    },
    {
      name: 'Pro VPS',
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
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'Free Domain', 'Daily Backups']
    },
    {
      name: 'Business VPS',
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
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'Free Domain', 'Daily Backups', 'DDoS Protection']
    },
    {
      name: 'Enterprise VPS',
      description: 'High-performance solution for enterprise needs',
      icon: <Shield className="h-10 w-10 text-cyber" />,
      monthlyPrice: 149.99,
      yearlyPrice: 1499.90,
      specs: {
        cpu: '12 vCPU',
        ram: '64 GB RAM',
        storage: '1 TB SSD',
        bandwidth: '12 TB Bandwidth'
      },
      features: ['Windows/Linux OS', '24/7 Premium Support', 'Root Access', '99.9% Uptime', 'Free Domain', 'Daily Backups', 'DDoS Protection', 'Dedicated IP']
    },
    {
      name: 'Ultimate VPS',
      description: 'Our most powerful VPS configuration',
      icon: <Server className="h-10 w-10 text-cyber" />,
      monthlyPrice: 199.99,
      yearlyPrice: 1999.90,
      specs: {
        cpu: '16 vCPU',
        ram: '128 GB RAM',
        storage: '2 TB SSD',
        bandwidth: '20 TB Bandwidth'
      },
      features: ['Windows/Linux OS', '24/7 Premium Support', 'Root Access', '99.9% Uptime', 'Free Domain', 'Daily Backups', 'DDoS Protection', 'Dedicated IP', 'Load Balancing']
    }
  ];

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
          
          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className="bg-midnight border-gray-800 hover:border-electric transition-all duration-300 card-hover">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-gray-800/50">
                      {plan.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">Starting at</span>
                      <div className="font-bold text-2xl text-white">
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice / 12).toFixed(2)}
                        <span className="text-sm text-gray-400 font-normal">/mo</span>
                      </div>
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
                          <Check className="h-4 w-4 text-cyber" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-electric hover:bg-electric/80 text-charcoal">
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* FAQs CTA */}
          <div className="text-center">
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
