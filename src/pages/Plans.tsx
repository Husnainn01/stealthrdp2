import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Shield, Cpu, Database, Server, HardDrive, Settings, Globe, Zap, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { planApi, PlanApiResponse } from '../lib/api/planApi';

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

    return (
      <Card className={`bg-midnight border border-gray-800 hover:border-electric transition-all duration-300 card-hover flex flex-col ${plan.isCustom ? 'border-cyber' : ''}`}>
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
                    €{currentMonthlyPrice ? currentMonthlyPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                        <span className="text-base text-gray-400">/mo</span>
                  </div>
                </>
              ) : (
                <div className="font-bold text-2xl text-white">Custom Pricing</div>
              )}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </CardHeader>
        <CardContent className="pt-4 flex-grow">
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
                      {(plan.features || []).map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Check className={`h-4 w-4 ${plan.isCustom ? 'text-cyber' : 'text-cyber'}`} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
        <CardFooter className="flex flex-col items-stretch pt-4 mt-auto">
          {/* Add Billing Cycle Selector INSIDE card, if not custom */}
          {!plan.isCustom && (
            <div className="w-full mb-4 p-1 bg-gray-800/50 rounded-md">
              <div className="grid grid-cols-2 gap-1">
                {plan.billingOptions && (
                  <>
                    <div className="flex flex-col space-y-2 mb-4">
                      <span className="text-sm text-gray-400">Billing Cycle</span>
                      <div className="bg-gray-800/40 p-1 rounded-md grid grid-cols-2 sm:grid-cols-4 gap-1">
                        <Button
                          variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                          className={`h-auto py-2 text-xs ${billingCycle === 'monthly' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                          onClick={() => setBillingCycle('monthly')}
                        >
                          Monthly
                        </Button>
                        <Button
                          variant={billingCycle === 'quarterly' ? 'default' : 'outline'}
                          className={`h-auto py-2 text-xs ${billingCycle === 'quarterly' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                          onClick={() => setBillingCycle('quarterly')}
                          disabled={!plan.billingOptions?.quarterly?.enabled}
                        >
                          Quarterly
                          {plan.billingOptions?.quarterly?.enabled && (
                            <span className="ml-1 bg-cyber text-midnight text-[10px] rounded px-1">-{plan.billingOptions.quarterly.discountPercentage}%</span>
                          )}
                        </Button>
                        <Button
                          variant={billingCycle === 'annually' ? 'default' : 'outline'}
                          className={`h-auto py-2 text-xs ${billingCycle === 'annually' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                          onClick={() => setBillingCycle('annually')}
                          disabled={!plan.billingOptions?.annual?.enabled}
                        >
                          Annual
                          {plan.billingOptions?.annual?.enabled && (
                            <span className="ml-1 bg-cyber text-midnight text-[10px] rounded px-1">-{plan.billingOptions.annual.discountPercentage}%</span>
                          )}
                        </Button>
                        <Button
                          variant={billingCycle === 'biannually' ? 'default' : 'outline'}
                          className={`h-auto py-2 text-xs ${billingCycle === 'biannually' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                          onClick={() => setBillingCycle('biannually')}
                          disabled={!plan.billingOptions?.biannual?.enabled}
                        >
                          Biannual
                          {plan.billingOptions?.biannual?.enabled && (
                            <span className="ml-1 bg-cyber text-midnight text-[10px] rounded px-1">-{plan.billingOptions.biannual.discountPercentage}%</span>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/40 p-3 rounded-md mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monthly price:</span>
                        <span>€{currentMonthlyPrice ? currentMonthlyPrice.toFixed(2) : ""}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Billing period:</span>
                        <span>{billingPeriodText}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm mb-1">
                          <span>Discount:</span>
                          <span className="text-cyber">-{discount}%</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-gray-700">
                        <span>Total due today:</span>
                        <span>€{totalBilled.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-cyber mt-1">
                          <span>You save:</span>
                          <span>€{totalSavings.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Existing Buy Now Button */}
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
                <a href="https://stealthrdp.com/dash/submitticket.php" target="_blank" rel="noopener noreferrer">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
