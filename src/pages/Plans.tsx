import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Shield, Cpu, Database, Server, HardDrive, Settings, Globe, Zap, Clock, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { planApi, PlanApiResponse } from '../lib/api/planApi';
import AnimatedPlanCard from '../components/sections/AnimatedPlanCard';

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annually' | 'biannually'>('monthly');
  const [usaPlans, setUsaPlans] = useState<PlanApiResponse[]>([]);
  const [euPlans, setEuPlans] = useState<PlanApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Custom VPS plan data remains static
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

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const [usaData, euData] = await Promise.all([
          planApi.getPlans('USA'),
          planApi.getPlans('EU')
        ]);
        console.log('Fetched USA Plans:', usaData);
        console.log('Fetched EU Plans:', euData);
        setUsaPlans(usaData);
        setEuPlans(euData);
        setError(null);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to load plans. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Calculate discount percentage for each cycle
  const getDiscount = (plan, cycle) => {
    if (!plan || !plan.billingOptions) return 0;
    
    switch (cycle) {
      case 'quarterly':
        return plan.billingOptions?.quarterly?.enabled ? plan.billingOptions.quarterly.discountPercentage : 0;
      case 'annually':
        return plan.billingOptions?.annual?.enabled ? plan.billingOptions.annual.discountPercentage : 0;
      case 'biannually':
        return plan.billingOptions?.biannual?.enabled ? plan.billingOptions.biannual.discountPercentage : 0;
      default:
        return 0;
    }
  };

  // Helper function to get current price based on billing cycle
  const getCurrentPrice = (plan) => {
    if (!plan || plan.monthlyPrice === null) return null;
    
    switch (billingCycle) {
      case 'monthly':
        return plan.monthlyPrice;
      case 'quarterly':
        if (plan.billingOptions?.quarterly?.enabled) {
          const discount = plan.billingOptions.quarterly.discountPercentage;
          const quarterlyTotal = plan.monthlyPrice * 3 * (1 - discount / 100);
          return quarterlyTotal / 3; // Return monthly equivalent
        }
        return plan.monthlyPrice;
      case 'annually':
        if (plan.billingOptions?.annual?.enabled) {
          const discount = plan.billingOptions.annual.discountPercentage;
          const annualTotal = plan.monthlyPrice * 12 * (1 - discount / 100);
          return annualTotal / 12; // Return monthly equivalent
        }
        return plan.monthlyPrice;
      case 'biannually':
        if (plan.billingOptions?.biannual?.enabled) {
          const discount = plan.billingOptions.biannual.discountPercentage;
          const biannualTotal = plan.monthlyPrice * 24 * (1 - discount / 100);
          return biannualTotal / 24; // Return monthly equivalent
        }
        return plan.monthlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const renderPlanCard = (plan) => {
    const currentMonthlyPrice = getCurrentPrice(plan);
    let totalBilled = 0;
    let originalTotal = 0;
    let billingPeriodText = '';
    const discount = getDiscount(plan, billingCycle);

    switch (billingCycle) {
      case 'quarterly':
        if (plan.billingOptions?.quarterly?.enabled) {
          totalBilled = plan.monthlyPrice * 3 * (1 - discount / 100);
          originalTotal = plan.monthlyPrice * 3;
          billingPeriodText = 'every 3 months';
        } else {
          totalBilled = plan.monthlyPrice * 3;
          originalTotal = plan.monthlyPrice * 3;
          billingPeriodText = 'every 3 months';
        }
        break;
      case 'annually':
        if (plan.billingOptions?.annual?.enabled) {
          totalBilled = plan.monthlyPrice * 12 * (1 - discount / 100);
          originalTotal = plan.monthlyPrice * 12;
          billingPeriodText = 'per year';
        } else {
          totalBilled = plan.monthlyPrice * 12;
          originalTotal = plan.monthlyPrice * 12;
          billingPeriodText = 'per year';
        }
        break;
      case 'biannually':
        if (plan.billingOptions?.biannual?.enabled) {
          totalBilled = plan.monthlyPrice * 24 * (1 - discount / 100);
          originalTotal = plan.monthlyPrice * 24;
          billingPeriodText = 'every 2 years';
        } else {
          totalBilled = plan.monthlyPrice * 24;
          originalTotal = plan.monthlyPrice * 24;
          billingPeriodText = 'every 2 years';
        }
        break;
      default: // monthly
        totalBilled = plan.monthlyPrice;
        originalTotal = plan.monthlyPrice;
        billingPeriodText = 'per month';
        break;
    }

    const totalSavings = originalTotal - totalBilled;
    
    // Generate purchase URL based on plan name and billing cycle
    const getPurchaseUrl = () => {
      if (plan.isCustom) {
        return 'https://stealthrdp.com/dash/index.php?rp=/store/build-your-own-rdp-vps';
      }

      // Exact URLs for each plan and billing cycle
      const urls = {
        // USA Plans
        'Bronze USA': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=biennially'
        },
        'Silver USA': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=biennially'
        },
        'Gold USA': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=biennially'
        },
        'Platinum USA': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=biennially'
        },
        'Diamond USA': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=biennially'
        },
        'Emerald USA': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=biennially'
        },
        
        // EU Plans
        'Bronze EU': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/bronze-eu&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/bronze-eu&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/bronze-eu&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/bronze-eu&billingcycle=biennially'
        },
        'Silver EU': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/silver-eu&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/silver-eu&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/silver-eu&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/silver-eu&billingcycle=biennially'
        },
        'Gold EU': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/gold-eu&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/gold-eu&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/gold-eu&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/gold-eu&billingcycle=biennially'
        },
        'Platinum EU': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/platinum-eu&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/platinum-eu&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/platinum-eu&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/platinum-eu&billingcycle=biennially'
        },
        'Diamond EU': {
          monthly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/diamond-eu&billingcycle=monthly',
          quarterly: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/diamond-eu&billingcycle=quarterly',
          annually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/diamond-eu&billingcycle=annually',
          biannually: 'https://stealthrdp.com/dash/index.php?rp=/store/eu/diamond-eu&billingcycle=biennially'
        }
      };

      // Return the URL for this plan and billing cycle if available
      if (urls[plan.name] && urls[plan.name][billingCycle]) {
        return urls[plan.name][billingCycle];
      }
      
      // Fallback to the previous implementation
      const planNameLower = plan.name.toLowerCase().replace(/\s+/g, '-');
      const billingCycleParam = billingCycle === 'biannually' ? 'biennially' : 
                               billingCycle === 'annually' ? 'annually' : 
                               billingCycle;
      
      if (plan.name.includes('USA')) {
        return `https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/${planNameLower}&billingcycle=${billingCycleParam}`;
      } else if (plan.name.includes('EU')) {
        return `https://stealthrdp.com/dash/index.php?rp=/store/eu/${planNameLower}&billingcycle=${billingCycleParam}`;
      }
      
      return '#';
    };

    // Map CPU icon
    let icon = <Cpu className="h-10 w-10 text-cyber" />;
    if (plan.name.toLowerCase().includes('bronze')) {
      icon = <Cpu className="h-10 w-10 text-cyber" />;
    } else if (plan.name.toLowerCase().includes('silver')) {
      icon = <Server className="h-10 w-10 text-cyber" />;
    } else if (plan.name.toLowerCase().includes('gold')) {
      icon = <Database className="h-10 w-10 text-cyber" />;
    } else if (plan.name.toLowerCase().includes('platinum')) {
      icon = <HardDrive className="h-10 w-10 text-cyber" />;
    } else if (plan.name.toLowerCase().includes('diamond')) {
      icon = <Zap className="h-10 w-10 text-cyber" />;
    } else if (plan.name.toLowerCase().includes('emerald')) {
      icon = <Clock className="h-10 w-10 text-cyber" />;
    }

    // Add icon to plan
    const planWithIcon = {
      ...plan,
      icon
    };

    return (
      <AnimatedPlanCard
        plan={planWithIcon}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
        currentPrice={currentMonthlyPrice}
        totalBilled={totalBilled}
        originalTotal={originalTotal}
        billingPeriodText={billingPeriodText}
        discount={discount}
        getPurchaseUrl={getPurchaseUrl}
      />
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
            
            {/* Tab Content */}
            <TabsContent value="usa" className="mt-0">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-white/70">Loading plans...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {usaPlans.map((plan, index) => (
                    <div key={index}>
                      {renderPlanCard(plan)}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="eu" className="mt-0">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-white/70">Loading plans...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {euPlans.map((plan, index) => (
                    <div key={index}>
                      {renderPlanCard(plan)}
                    </div>
                  ))}
                </div>
              )}
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
          
          {/* Comparison Table */}
          <div className="mt-12 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">VPS Features Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full mb-8 border-collapse">
                <thead>
                  <tr className="bg-midnight text-white border-b border-gray-800">
                    <th className="px-4 py-3 text-left">Feature</th>
                    <th className="px-4 py-3 text-center">Basic</th>
                    <th className="px-4 py-3 text-center">Standard</th>
                    <th className="px-4 py-3 text-center">Premium</th>
                    <th className="px-4 py-3 text-center">Custom</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">Remote Desktop Protocol (RDP)</td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">Windows/Linux OS</td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">Managed Security</td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">SSD Storage</td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">99.9% Uptime Guarantee</td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">DDoS Protection</td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">Dedicated IP</td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">Resource Scaling</td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 text-white">Priority Support</td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-white">Custom Configuration</td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-gray-500 mx-auto" /></td>
                    <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-cyber mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12 md:mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-midnight p-5 rounded-lg border border-gray-800">
                <h3 className="text-white text-lg font-medium mb-2">What is a VPS?</h3>
                <p className="text-gray-400">A Virtual Private Server (VPS) is a virtualized server that looks like a dedicated server to the user but actually shares hardware with other VPSs. Our VPS plans give you full control with root access in a secure, isolated environment.</p>
              </div>
              
              <div className="bg-midnight p-5 rounded-lg border border-gray-800">
                <h3 className="text-white text-lg font-medium mb-2">What is RDP and why do I need it?</h3>
                <p className="text-gray-400">Remote Desktop Protocol (RDP) allows you to connect to and control your Windows server from anywhere. It provides a graphical interface to remotely manage your server, run applications, and work as if you were sitting in front of that computer.</p>
              </div>
              
              <div className="bg-midnight p-5 rounded-lg border border-gray-800">
                <h3 className="text-white text-lg font-medium mb-2">Can I upgrade my plan later?</h3>
                <p className="text-gray-400">Yes! You can easily upgrade to a higher plan at any time. The transition is seamless and we'll only charge you the prorated difference between plans.</p>
              </div>
              
              <div className="bg-midnight p-5 rounded-lg border border-gray-800">
                <h3 className="text-white text-lg font-medium mb-2">What operating systems are available?</h3>
                <p className="text-gray-400">We offer Windows Server 2019/2022 and various Linux distributions including Ubuntu, CentOS, and Debian. If you need a specific OS or version, please contact our support team.</p>
              </div>
              
              <div className="bg-midnight p-5 rounded-lg border border-gray-800">
                <h3 className="text-white text-lg font-medium mb-2">Do you offer a money-back guarantee?</h3>
                <p className="text-gray-400">Yes, we offer a 7-day money-back guarantee on all new VPS plans. If you're not satisfied with our service, you can request a refund within the first week of your purchase.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Choose your perfect VPS plan today and experience the performance, security, and reliability of StealthRDP.</p>
            <a href="#top" className="inline-block">
              <Button className="bg-electric hover:bg-electric/80 text-midnight text-lg px-8 py-3">
                Select a Plan Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
