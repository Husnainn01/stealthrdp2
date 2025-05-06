import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Shield, Cpu, Database, Server, HardDrive, Settings, Globe, Zap, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annually' | 'biannually'>('monthly');

  // Calculate discount percentage for each cycle
  const getDiscount = (cycle) => {
    switch (cycle) {
      case 'monthly':
        return 5; // 5% discount for monthly
      case 'quarterly':
        return 10; // 10% discount for quarterly
      case 'annually':
        return 20; // 20% discount for annual
      case 'biannually':
        return 30; // 30% discount for biannual
      default:
        return 0;
    }
  };

  // USA VPS plan data
  const usaPlans = [
    {
      name: 'Bronze USA',
      description: 'Blazing Fast Connectivity',
      icon: <Cpu className="h-10 w-10 text-electric" />,
      monthlyPrice: 9.50,
      regularMonthlyPrice: 10.00, // Original price before discount
      quarterlyPrice: 27.00, // 3-month price with 10% discount (was €30.00)
      annuallyPrice: 96.00, // 12-month price with 20% discount (was €120.00)
      biannuallyPrice: 168.00, // 24-month price with 30% discount (was €240.00)
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
      monthlyPrice: 18.04,
      regularMonthlyPrice: 19.00, // Original price before discount
      quarterlyPrice: 51.30, // 3-month price with 10% discount (was €57.00)
      annuallyPrice: 182.88, // 12-month price with 20% discount (was €228.00)
      biannuallyPrice: 319.20, // 24-month price with 30% discount (was €456.00)
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
      monthlyPrice: 26.59,
      regularMonthlyPrice: 27.99, // Original price before discount
      quarterlyPrice: 75.54, // 3-month price with 10% discount (was €83.97)
      annuallyPrice: 269.88, // 12-month price with 20% discount (was €335.88)
      biannuallyPrice: 470.16, // 24-month price with 30% discount (was €671.76)
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
      monthlyPrice: 33.24,
      regularMonthlyPrice: 34.99, // Original price before discount
      quarterlyPrice: 94.47, // 3-month price with 10% discount (was €104.97)
      annuallyPrice: 335.88, // 12-month price with 20% discount (was €419.88)
      biannuallyPrice: 587.76, // 24-month price with 30% discount (was €839.76)
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
      monthlyPrice: 42.75,
      regularMonthlyPrice: 45.00, // Original price before discount
      quarterlyPrice: 121.50, // 3-month price with 10% discount (was €135.00)
      annuallyPrice: 432.00, // 12-month price with 20% discount (was €540.00)
      biannuallyPrice: 756.00, // 24-month price with 30% discount (was €1,080.00)
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
      monthlyPrice: 51.30,
      regularMonthlyPrice: 54.00, // Original price before discount
      quarterlyPrice: 145.80, // 3-month price with 10% discount (was €162.00)
      annuallyPrice: 518.40, // 12-month price with 20% discount (was €648.00)
      biannuallyPrice: 907.20, // 24-month price with 30% discount (was €1,296.00)
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
      name: 'Bronze EU',
      description: 'Secure. Fast. Limitless',
      icon: <Cpu className="h-10 w-10 text-electric" />,
      monthlyPrice: 9.50,
      regularMonthlyPrice: 10.00, // Original price before discount
      quarterlyPrice: 27.00, // 3-month price with 10% discount (was €30.00)
      annuallyPrice: 96.00, // 12-month price with 20% discount (was €120.00)
      biannuallyPrice: 168.00, // 24-month price with 30% discount (was €240.00)
      specs: {
        cpu: '2 Core',
        ram: '4 GB RAM',
        storage: '40 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Silver EU',
      description: 'Secure. Fast. Limitless',
      icon: <Server className="h-10 w-10 text-electric" />,
      monthlyPrice: 17.10,
      regularMonthlyPrice: 18.00, // Original price before discount
      quarterlyPrice: 48.60, // 3-month price with 10% discount (was €54.00)
      annuallyPrice: 172.80, // 12-month price with 20% discount (was €216.00)
      biannuallyPrice: 302.40, // 24-month price with 30% discount (was €432.00)
      specs: {
        cpu: '4 Core',
        ram: '8 GB RAM',
        storage: '80 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Gold EU',
      description: 'Secure. Fast. Limitless',
      icon: <HardDrive className="h-10 w-10 text-electric" />,
      monthlyPrice: 28.49,
      regularMonthlyPrice: 29.99, // Original price before discount
      quarterlyPrice: 80.97, // 3-month price with 10% discount (was €89.97)
      annuallyPrice: 287.90, // 12-month price with 20% discount (was €359.88)
      biannuallyPrice: 503.83, // 24-month price with 30% discount (was €719.76)
      specs: {
        cpu: '4 Core',
        ram: '16 GB RAM',
        storage: '100 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Platinum EU',
      description: 'Secure. Fast. Limitless',
      icon: <Database className="h-10 w-10 text-cyber" />,
      monthlyPrice: 33.24,
      regularMonthlyPrice: 34.99, // Original price before discount
      quarterlyPrice: 94.47, // 3-month price with 10% discount (was €104.97)
      annuallyPrice: 335.90, // 12-month price with 20% discount (was €419.88)
      biannuallyPrice: 587.83, // 24-month price with 30% discount (was €839.76)
      specs: {
        cpu: '6 Core',
        ram: '16 GB RAM',
        storage: '100 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Priority Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', '1Gbps Network', 'Dedicated IP']
    },
    {
      name: 'Diamond EU',
      description: 'Secure. Fast. Limitless',
      icon: <Shield className="h-10 w-10 text-cyber" />,
      monthlyPrice: 37.99,
      regularMonthlyPrice: 39.99, // Original price before discount
      quarterlyPrice: 107.97, // 3-month price with 10% discount (was €119.97)
      annuallyPrice: 383.90, // 12-month price with 20% discount (was €479.88)
      biannuallyPrice: 671.83, // 24-month price with 30% discount (was €959.76)
      specs: {
        cpu: '6 Core',
        ram: '24 GB RAM',
        storage: '120 GB SSD',
        bandwidth: 'Unlimited'
      },
      features: ['Windows/Linux OS', '24/7 Premium Support', 'Root Access', '99.9% Uptime', 'Netherlands Location', '1Gbps Network', 'Dedicated IP']
    }
  ];

  // Custom VPS plan data
  const customPlans = [
    {
      name: 'Build Your Own VPS',
      description: 'Tailor-made virtual server with flexible resources',
      icon: <Settings className="h-10 w-10 text-cyber" />,
      monthlyPrice: null,
      quarterlyPrice: null,
      annuallyPrice: null,
      biannuallyPrice: null,
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

  // Helper function to get current price based on billing cycle
  const getCurrentPrice = (plan) => {
    if (plan.monthlyPrice === null) return null;
    
    switch (billingCycle) {
      case 'monthly':
        return plan.monthlyPrice;
      case 'quarterly':
        return plan.quarterlyPrice / 3;
      case 'annually':
        return plan.annuallyPrice / 12;
      case 'biannually':
        return plan.biannuallyPrice / 24;
      default:
        return plan.monthlyPrice;
    }
  };

  const renderPlanCard = (plan) => {
    const currentMonthlyPrice = getCurrentPrice(plan);
    let totalBilled = 0;
    let originalTotal = 0;
    let billingPeriodText = '';

    switch (billingCycle) {
      case 'quarterly':
        totalBilled = plan.quarterlyPrice;
        originalTotal = plan.quarterlyPrice / (1 - getDiscount('quarterly') / 100);
        billingPeriodText = 'every 3 months';
        break;
      case 'annually':
        totalBilled = plan.annuallyPrice;
        originalTotal = plan.annuallyPrice / (1 - getDiscount('annually') / 100);
        billingPeriodText = 'per year';
        break;
      case 'biannually':
        totalBilled = plan.biannuallyPrice;
        originalTotal = plan.biannuallyPrice / (1 - getDiscount('biannually') / 100);
        billingPeriodText = 'every 2 years';
        break;
      default: // monthly
        totalBilled = plan.monthlyPrice;
        originalTotal = plan.regularMonthlyPrice;
        break;
    }

    const totalSavings = originalTotal - totalBilled;
    
    // Generate purchase URL based on plan name and billing cycle
    const getPurchaseUrl = () => {
      if (plan.isCustom) {
        return 'https://stealthrdp.com/dash/index.php?rp=/store/custom-build-your-rdp';
      }
      
      const planNameLower = plan.name.toLowerCase().replace(/\s+/g, '-');
      const billingCycleParam = billingCycle === 'biannually' ? 'biennially' : billingCycle;
      
      if (plan.name.includes('USA')) {
        return `https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/${planNameLower}&billingcycle=${billingCycleParam}`;
      } else if (plan.name.includes('EU')) {
        return `https://stealthrdp.com/dash/index.php?rp=/store/eu/${planNameLower}&billingcycle=${billingCycleParam}`;
      }
      
      return '#';
    };

    return (
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
                    €{currentMonthlyPrice.toFixed(2)}
                        <span className="text-sm text-gray-400 font-normal">/mo</span>
                  </div>
                  {billingCycle !== 'monthly' && (
                    <>
                      <div className="text-sm text-gray-300">
                        Billed as €{totalBilled.toFixed(2)} {billingPeriodText}
                      </div>
                      {totalSavings > 0 && (
                        <div className="text-sm text-cyber font-medium">
                          (Save €{totalSavings.toFixed(2)} total)
                        </div>
                      )}
                    </>
                  )}
                  {billingCycle === 'monthly' && plan.regularMonthlyPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      €{plan.regularMonthlyPrice.toFixed(2)}
                    </div>
                  )}
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
                  <a 
                    href={getPurchaseUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <Button className={`w-full ${plan.isCustom ? 'bg-cyber hover:bg-cyber/80' : 'bg-electric hover:bg-electric/80'} text-charcoal`}>
                      {plan.isCustom ? 'Configure Now' : 'Buy Now!'}
                    </Button>
                  </a>
                </CardFooter>
              </Card>
    );
  };

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
          
          {/* Location Tabs */}
          <Tabs defaultValue="usa" className="mb-10">
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
            
            {/* Billing Toggle - Now inside each tab content */}
            <TabsContent value="usa" className="mt-0">
              {/* Billing Toggle */}
              <div className="flex justify-center mb-10">
                <div className="bg-midnight p-2 rounded-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'monthly' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        Monthly
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('monthly')}%
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setBillingCycle('quarterly')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'quarterly' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        Quarterly
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('quarterly')}%
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setBillingCycle('annually')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'annually' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        Annually
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('annually')}%
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setBillingCycle('biannually')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'biannually' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        BiAnnually
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('biannually')}%
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {usaPlans.map((plan, index) => (
                  <div key={index}>
                    {renderPlanCard(plan)}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eu" className="mt-0">
              {/* Billing Toggle */}
              <div className="flex justify-center mb-10">
                <div className="bg-midnight p-2 rounded-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'monthly' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        Monthly
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('monthly')}%
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setBillingCycle('quarterly')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'quarterly' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        Quarterly
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('quarterly')}%
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setBillingCycle('annually')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'annually' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        Annually
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('annually')}%
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setBillingCycle('biannually')}
                      className={`px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                        billingCycle === 'biannually' ? 'bg-electric text-midnight font-medium' : 'text-gray-400 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center">
                        BiAnnually
                        <span className="text-xs bg-cyber text-charcoal rounded-full px-2 py-0.5 whitespace-nowrap">
                          Save {getDiscount('biannually')}%
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {euPlans.map((plan, index) => (
                  <div key={index}>
                    {renderPlanCard(plan)}
                  </div>
                ))}
              </div>
            </TabsContent>

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
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Features that brings <span className="text-electric">maximum power</span> to your <span className="text-cyber">Project</span>.
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                Elevate your experience with our high-performance infrastructure and premium service guarantees.
              </p>
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
