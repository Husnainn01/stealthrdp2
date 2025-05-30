import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Shield, Cpu, Database, Server, HardDrive, Settings, Globe, Zap, Clock, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { planApi, PlanApiResponse } from '../lib/api/planApi';
import AnimatedPlanCard from '../components/sections/AnimatedPlanCard';
import { motion } from 'framer-motion';
import SkeletonPlanCard from '../components/sections/SkeletonPlanCard';

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
        
        // Process plans to add features from descriptions
        const processedUsaPlans = usaData.map(plan => {
          // Generate standard features for each plan
          const standardFeatures = [
            'Windows/Linux OS',
            '24/7 Support',
            'Root Access',
            '99.9% Uptime',
            'USA Location',
            '1Gbps Network',
            'Dedicated IP'
          ];
          
          return {
            ...plan,
            features: standardFeatures
          };
        });
        
        const processedEuPlans = euData.map(plan => {
          const standardFeatures = [
            'Windows/Linux OS',
            '24/7 Support',
            'Root Access',
            '99.9% Uptime',
            'EU Location',
            '1Gbps Network',
            'Dedicated IP'
          ];
          
          return {
            ...plan,
            features: standardFeatures
          };
        });
        
        setUsaPlans(processedUsaPlans);
        setEuPlans(processedEuPlans);
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
      case 'monthly':
        // Add a 5% discount for monthly plans
        return 5;
      case 'quarterly':
        return plan.billingOptions?.quarterly?.enabled ? plan.billingOptions.quarterly.discountPercentage : 10;
      case 'annually':
        return plan.billingOptions?.annual?.enabled ? plan.billingOptions.annual.discountPercentage : 20;
      case 'biannually':
        return plan.billingOptions?.biannual?.enabled ? plan.billingOptions.biannual.discountPercentage : 30;
      default:
        return 0;
    }
  };

  // Helper function to get current price based on billing cycle
  const getCurrentPrice = (plan) => {
    if (!plan || plan.monthlyPrice === null) return null;
    
    // Calculate the base price (always use the list price before any discounts)
    const basePrice = plan.monthlyPrice;
    
    switch (billingCycle) {
      case 'monthly':
        // Apply 5% discount to monthly price
        return basePrice * 0.95;
      case 'quarterly':
        if (plan.billingOptions?.quarterly?.enabled) {
          const discount = plan.billingOptions.quarterly.discountPercentage;
          const quarterlyTotal = basePrice * 3 * (1 - discount / 100);
          return quarterlyTotal / 3; // Return monthly equivalent
        }
        return basePrice * 0.9; // 10% discount
      case 'annually':
        if (plan.billingOptions?.annual?.enabled) {
          const discount = plan.billingOptions.annual.discountPercentage;
          const annualTotal = basePrice * 12 * (1 - discount / 100);
          return annualTotal / 12; // Return monthly equivalent
        }
        return basePrice * 0.8; // 20% discount
      case 'biannually':
        if (plan.billingOptions?.biannual?.enabled) {
          const discount = plan.billingOptions.biannual.discountPercentage;
          const biannualTotal = basePrice * 24 * (1 - discount / 100);
          return biannualTotal / 24; // Return monthly equivalent
        }
        return basePrice * 0.7; // 30% discount
      default:
        return basePrice;
    }
  };

  const renderPlanCard = (plan) => {
    const currentMonthlyPrice = getCurrentPrice(plan);
    let totalBilled = 0;
    let originalTotal = 0;
    let billingPeriodText = '';
    const discount = getDiscount(plan, billingCycle);

    switch (billingCycle) {
      case 'monthly':
        // For monthly, we need to show the original price and the discounted price
        totalBilled = currentMonthlyPrice; // Already has 5% discount applied
        originalTotal = plan.monthlyPrice; // Original monthly price without discount
        billingPeriodText = 'per month';
        break;
      case 'quarterly':
        if (plan.billingOptions?.quarterly?.enabled) {
          totalBilled = plan.monthlyPrice * 3 * (1 - discount / 100);
          originalTotal = plan.monthlyPrice * 3;
          billingPeriodText = 'every 3 months';
        } else {
          // Default to 10% discount if not explicitly configured
          totalBilled = plan.monthlyPrice * 3 * 0.9;
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
          // Default to 20% discount if not explicitly configured
          totalBilled = plan.monthlyPrice * 12 * 0.8;
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
          // Default to 30% discount if not explicitly configured
          totalBilled = plan.monthlyPrice * 24 * 0.7;
          originalTotal = plan.monthlyPrice * 24;
          billingPeriodText = 'every 2 years';
        }
        break;
      default: // monthly
        totalBilled = currentMonthlyPrice;
        originalTotal = plan.monthlyPrice;
        billingPeriodText = 'per month';
        break;
    }

    const totalSavings = originalTotal - totalBilled;
    
    // Generate purchase URL based on plan name and billing cycle
    const getPurchaseUrl = () => {
      if (plan.isCustom) {
        return 'https://dash.stealthrdp.com/index.php?rp=/store/build-your-own-rdp-vps';
      }

      // Exact URLs for each plan and billing cycle
      const urls = {
        // USA Plans
        'Bronze USA': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=biennially'
        },
        'Silver USA': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=biennially'
        },
        'Gold USA': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=biennially'
        },
        'Platinum USA': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=biennially'
        },
        'Diamond USA': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=biennially'
        },
        'Emerald USA': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=biennially'
        },
        
        // EU Plans
        'Bronze EU': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/bronze-eu&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/bronze-eu&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/bronze-eu&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/bronze-eu&billingcycle=biennially'
        },
        'Silver EU': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/silver-eu&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/silver-eu&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/silver-eu&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/silver-eu&billingcycle=biennially'
        },
        'Gold EU': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/gold-eu&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/gold-eu&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/gold-eu&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/gold-eu&billingcycle=biennially'
        },
        'Platinum EU': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/platinum-eu&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/platinum-eu&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/platinum-eu&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/platinum-eu&billingcycle=biennially'
        },
        'Diamond EU': {
          monthly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/diamond-eu&billingcycle=monthly',
          quarterly: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/diamond-eu&billingcycle=quarterly',
          annually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/diamond-eu&billingcycle=annually',
          biannually: 'https://dash.stealthrdp.com/index.php?rp=/store/eu/diamond-eu&billingcycle=biennially'
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.6 }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 0.6,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 3
      }
    }
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
              <TabsList className="bg-charcoal border border-gray-800 p-1 rounded-full">
                <TabsTrigger value="usa" className="data-[state=active]:bg-electric data-[state=active]:text-midnight rounded-full">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>USA Plans</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="eu" className="data-[state=active]:bg-electric data-[state=active]:text-midnight rounded-full">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>EU Plans</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="custom" className="data-[state=active]:bg-cyber data-[state=active]:text-midnight rounded-full">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      <SkeletonPlanCard delay={i} />
                    </div>
                  ))}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      <SkeletonPlanCard delay={i} />
                    </div>
                  ))}
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
                <motion.div 
                  className="bg-midnight border border-cyber rounded-xl p-8 md:p-12 mb-8 relative overflow-hidden"
                  initial="hidden"
                  animate="show"
                  variants={containerVariants}
                  whileHover="hover"
                >
                  {/* Background glow effect */}
                  <motion.div 
                    className="absolute -inset-0 bg-gradient-to-br from-cyber/10 via-electric/5 to-cyber/10 rounded-xl blur-xl"
                    variants={glowVariants}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                    <div>
                      <motion.h2 
                        className="text-3xl font-bold text-white mb-6"
                        variants={itemVariants}
                      >
                        Design Your <span className="text-cyber">Ideal Server</span>
                      </motion.h2>
                      <motion.p 
                        className="text-gray-300 mb-6"
                        variants={itemVariants}
                      >
                        Our custom VPS solution allows you to build exactly the server you need. Choose your CPU cores, RAM amount, storage space, and more to create a perfectly tailored virtual private server.
                      </motion.p>
                      <motion.ul 
                        className="space-y-3 mb-8"
                        variants={containerVariants}
                      >
                        <motion.li 
                          className="flex items-start"
                          variants={featureVariants}
                          whileHover={{ x: 5 }}
                        >
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Complete resource customization</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          variants={featureVariants}
                          whileHover={{ x: 5 }}
                        >
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Choice of US or EU data centers</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          variants={featureVariants}
                          whileHover={{ x: 5 }}
                        >
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Pay only for what you actually need</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          variants={featureVariants}
                          whileHover={{ x: 5 }}
                        >
                          <Check className="h-5 w-5 text-cyber mr-3 mt-0.5" />
                          <span className="text-gray-300">Instant scaling as your needs change</span>
                        </motion.li>
                      </motion.ul>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative">
                        <motion.div 
                          className="w-64 h-64 rounded-full bg-gradient-to-br from-cyber/20 to-electric/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-xl"
                          animate={{ 
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror"
                          }}
                        />
                        <motion.div
                          variants={iconVariants}
                          whileHover="hover"
                        >
                          <Settings className="h-40 w-40 text-cyber relative z-10" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
