import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface PlanProps {
  plan: {
    _id?: string;
    name: string;
    description: string;
    icon?: React.ReactNode;
    monthlyPrice: number | null;
    specs: {
      cpu: string;
      ram: string;
      storage: string;
      bandwidth?: string;
    };
    features?: string[];
    billingOptions?: {
      quarterly?: {
        enabled: boolean;
        discountPercentage: number;
      };
      annual?: {
        enabled: boolean;
        discountPercentage: number;
      };
      biannual?: {
        enabled: boolean;
        discountPercentage: number;
      };
    };
    isCustom?: boolean;
    popular?: boolean;
    purchaseUrl?: string;
  };
  billingCycle: 'monthly' | 'quarterly' | 'annually' | 'biannually';
  setBillingCycle: (cycle: 'monthly' | 'quarterly' | 'annually' | 'biannually') => void;
  currentPrice: number | null;
  totalBilled: number;
  originalTotal: number;
  billingPeriodText: string;
  discount: number;
  getPurchaseUrl: () => string;
}

const AnimatedPlanCard: React.FC<PlanProps> = ({
  plan,
  billingCycle,
  setBillingCycle,
  currentPrice,
  totalBilled,
  originalTotal,
  billingPeriodText,
  discount,
  getPurchaseUrl
}) => {
  const totalSavings = originalTotal - totalBilled;

  // Framer Motion variants
  const cardVariants = {
    initial: { 
      y: 0,
      scale: 1,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
    },
    hover: { 
      y: -10, 
      scale: 1.02,
      boxShadow: "0 20px 25px rgba(0, 240, 255, 0.2)"
    },
    tap: { 
      scale: 0.98 
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  const specVariants = {
    initial: { opacity: 0.7, scale: 1 },
    hover: { opacity: 1, scale: 1.05 }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        yoyo: Infinity,
        duration: 0.8
      }
    }
  };

  // Function to handle billing cycle click with stopPropagation
  const handleBillingCycleClick = (cycle: 'monthly' | 'quarterly' | 'annually' | 'biannually', e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
    setBillingCycle(cycle);
  };

  // Helper to determine which color highlight to use based on plan name
  const getPlanColor = () => {
    if (plan.isCustom) return 'border-cyber';
    return 'border-electric';
  };

  return (
    <div className="h-full relative">
      {/* Card with animations */}
      <motion.div
        className="h-full"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={cardVariants}
      >
        <Card className={`bg-[#0C0F2D] border ${plan.popular ? 'border-electric shadow-[0_0_20px_rgba(0,240,255,0.25)]' : 'border-gray-800'} rounded-xl flex flex-col h-full relative overflow-hidden`}>
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col h-full"
          >
            <CardHeader className="pb-3 bg-midnight pt-4 rounded-t-xl">
              <div className="flex justify-between">
                <motion.div variants={itemVariants} className="flex-1">
                  <div className="flex flex-col">
                    <div className="mb-2 pl-2">
                      <div className="h-14 w-14 flex items-center justify-center text-electric">
                        {plan.icon}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                    <p className="text-gray-400 mt-1 text-base">{plan.description}</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="text-right">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <div className="text-gray-400 text-base">Starting at</div>
                      <div>
                        <div className="font-bold text-2xl text-white">
                          €{currentPrice ? currentPrice.toFixed(2) : ""}
                          <span className="text-xl text-gray-400">/mo</span>
                        </div>
                      </div>
                      {plan.monthlyPrice > 0 && currentPrice !== plan.monthlyPrice && (
                        <motion.div 
                          className="text-base text-gray-500 line-through text-right"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.7 }}
                          transition={{ delay: 0.3 }}
                        >
                          €{plan.monthlyPrice.toFixed(2)}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <div className="font-bold text-2xl text-white">Custom Pricing</div>
                  )}
                </motion.div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-3 pb-2 flex-grow px-4">
              <div className="space-y-3">
                {/* Specs Grid */}
                <motion.div className="grid grid-cols-2 gap-2" variants={itemVariants}>
                  <div className="bg-[#101224] p-3 rounded-lg text-center border border-gray-800">
                    <div className="text-gray-400 text-sm mb-1">CPU</div>
                    <div className="text-white font-bold text-base">{plan.specs.cpu}</div>
                  </div>
                  <div className="bg-[#101224] p-3 rounded-lg text-center border border-gray-800">
                    <div className="text-gray-400 text-sm mb-1">RAM</div>
                    <div className="text-white font-bold text-base">{plan.specs.ram}</div>
                  </div>
                  <div className="bg-[#101224] p-3 rounded-lg text-center border border-gray-800">
                    <div className="text-gray-400 text-sm mb-1">Storage</div>
                    <div className="text-white font-bold text-base">{plan.specs.storage}</div>
                  </div>
                  <div className="bg-[#101224] p-3 rounded-lg text-center border border-gray-800">
                    <div className="text-gray-400 text-sm mb-1">Bandwidth</div>
                    <div className="text-white font-bold text-base">{plan.specs.bandwidth || "Unlimited"}</div>
                  </div>
                </motion.div>
                
                {/* Features List with Description split into points */}
                <motion.div className="space-y-2" variants={itemVariants}>
                  {/* Split the description by commas and display each part as a bullet */}
                  {/* {plan.description && plan.description.split(',').map((item, i) => (
                    <motion.div key={i} className="flex items-center gap-2" variants={itemVariants}>
                      <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item.trim()}</span>
                    </motion.div>
                  ))} */}
                  
                  {/* Standard features */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-1">
                    <motion.div className="flex items-center gap-2" variants={itemVariants}>
                      <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                      <span className="text-gray-300 text-sm">24/7 Support</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" variants={itemVariants}>
                      <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Root Access</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" variants={itemVariants}>
                      <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                      <span className="text-gray-300 text-sm">99.9% Uptime</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" variants={itemVariants}>
                      <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{plan.name.includes('USA') ? 'USA' : 'EU'} Location</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" variants={itemVariants}>
                      <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                      <span className="text-gray-300 text-sm">1Gbps Network</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" variants={itemVariants}>
                      <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Dedicated IP</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col items-stretch pt-2 px-4 pb-3 mt-auto relative z-10">
              {/* Billing Cycle Selection */}
              {!plan.isCustom && (
                <motion.div 
                  className="w-full mb-3"
                  variants={itemVariants}
                >
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Button
                      variant="ghost"
                      className={`rounded-xl px-2 py-2 text-xs transition-all duration-300 relative h-auto ${
                        billingCycle === 'monthly' 
                          ? 'bg-electric text-midnight shadow-sm' 
                          : 'bg-[#101224] text-gray-200 hover:text-white hover:bg-[#101224]/80 border border-gray-800'
                      }`}
                      onClick={(e) => handleBillingCycleClick('monthly', e)}
                    >
                      <div className="flex flex-col items-center w-full">
                        <span className="font-medium">Monthly</span>
                        <span className="bg-cyber text-black text-[10px] px-2 py-0.5 rounded-full mt-1 font-bold">-5%</span>
                      </div>
                      {billingCycle === 'monthly' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-50"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-electric"></span>
                        </span>
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className={`rounded-xl px-2 py-2 text-xs transition-all duration-300 relative h-auto ${
                        billingCycle === 'quarterly' 
                          ? 'bg-electric text-midnight shadow-sm' 
                          : 'bg-[#101224] text-gray-200 hover:text-white hover:bg-[#101224]/80 border border-gray-800'
                      }`}
                      onClick={(e) => handleBillingCycleClick('quarterly', e)}
                    >
                      <div className="flex flex-col items-center w-full">
                        <span className="font-medium">
                          <span className="hidden sm:inline">Quarterly</span>
                          <span className="sm:hidden">3 Months</span>
                        </span>
                        <span className="bg-cyber text-black text-[10px] px-2 py-0.5 rounded-full mt-1 font-bold">-10%</span>
                      </div>
                      {billingCycle === 'quarterly' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-50"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-electric"></span>
                        </span>
                      )}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="ghost"
                      className={`rounded-xl px-2 py-2 text-xs transition-all duration-300 relative h-auto ${
                        billingCycle === 'annually' 
                          ? 'bg-electric text-midnight shadow-sm' 
                          : 'bg-[#101224] text-gray-200 hover:text-white hover:bg-[#101224]/80 border border-gray-800'
                      }`}
                      onClick={(e) => handleBillingCycleClick('annually', e)}
                    >
                      <div className="flex flex-col items-center w-full">
                        <span className="font-medium">
                          <span className="hidden sm:inline">Annual</span>
                          <span className="sm:hidden">1 Year</span>
                        </span>
                        <span className="bg-cyber text-black text-[10px] px-2 py-0.5 rounded-full mt-1 font-bold">-20%</span>
                      </div>
                      {billingCycle === 'annually' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-50"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-electric"></span>
                        </span>
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className={`rounded-xl px-2 py-2 text-xs transition-all duration-300 relative h-auto ${
                        billingCycle === 'biannually' 
                          ? 'bg-electric text-midnight shadow-sm' 
                          : 'bg-[#101224] text-gray-200 hover:text-white hover:bg-[#101224]/80 border border-gray-800'
                      }`}
                      onClick={(e) => handleBillingCycleClick('biannually', e)}
                    >
                      <div className="flex flex-col items-center w-full">
                        <span className="font-medium">
                          <span className="hidden sm:inline">Biannual</span>
                          <span className="sm:hidden">2 Years</span>
                        </span>
                        <span className="bg-cyber text-black text-[10px] px-2 py-0.5 rounded-full mt-1 font-bold">-30%</span>
                      </div>
                      {billingCycle === 'biannually' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-50"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-electric"></span>
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Buy Now Button */}
              <motion.div
                variants={itemVariants}
                className="w-full"
              >
                <a 
                  href={getPurchaseUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full block"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    <Button 
                      className="w-full bg-electric hover:bg-electric/80 text-midnight font-bold py-2.5"
                    >
                      {plan.isCustom ? 'Configure Now' : 'Buy Now!'}
                    </Button>
                  </motion.div>
                </a>
              </motion.div>
            </CardFooter>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnimatedPlanCard;