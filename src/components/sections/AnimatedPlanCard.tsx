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
        <Card className={`bg-midnight border-2 ${plan.popular ? 'border-electric shadow-[0_0_20px_rgba(0,240,255,0.25)]' : 'border-gray-800'} rounded-xl p-5 flex flex-col h-full relative overflow-hidden`}>
          {plan.popular && (
            <motion.div 
              className="absolute top-4 right-4 bg-electric/20 text-electric text-xs font-bold py-1 px-3 rounded-full border border-electric/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Best Value
            </motion.div>
          )}
          
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col h-full"
          >
            <CardHeader className="pb-2">
              <motion.div className="flex items-center justify-between mb-2" variants={itemVariants}>
                <div className="p-2 rounded-lg bg-gray-800/50">
                  {plan.icon}
                </div>
                <div className="text-right">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <span className="text-sm text-gray-400">Starting at</span>
                      <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-electric">
                        €{currentPrice ? currentPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                        <span className="text-base text-gray-400">/mo</span>
                      </div>
                      {plan.monthlyPrice > 0 && (
                        <motion.div 
                          className="text-xs text-gray-500 line-through"
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
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="pt-4 flex-grow">
              <div className="space-y-4">
                {/* Specs */}
                <motion.div className="grid grid-cols-2 gap-2 text-sm" variants={itemVariants}>
                  <motion.div 
                    className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center"
                    variants={specVariants}
                    whileHover="hover"
                  >
                    <span className="text-gray-400">CPU</span>
                    <span className="text-white font-medium">{plan.specs.cpu}</span>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center"
                    variants={specVariants}
                    whileHover="hover"
                  >
                    <span className="text-gray-400">RAM</span>
                    <span className="text-white font-medium">{plan.specs.ram}</span>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center"
                    variants={specVariants}
                    whileHover="hover"
                  >
                    <span className="text-gray-400">Storage</span>
                    <span className="text-white font-medium">{plan.specs.storage}</span>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-800/40 p-2 rounded flex flex-col items-center justify-center"
                    variants={specVariants}
                    whileHover="hover"
                  >
                    <span className="text-gray-400">Bandwidth</span>
                    <span className="text-white font-medium">{plan.specs.bandwidth || "Unlimited"}</span>
                  </motion.div>
                </motion.div>
                
                {/* Features */}
                <motion.div className="space-y-2" variants={itemVariants}>
                  {(plan.features || []).map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center space-x-2"
                      variants={itemVariants}
                      custom={i}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check className={`h-4 w-4 ${plan.isCustom ? 'text-cyber' : 'text-cyber'}`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col items-stretch pt-4 mt-auto relative z-10">
              {/* Add Billing Cycle Selector INSIDE card, if not custom */}
              {!plan.isCustom && (
                <motion.div 
                  className="w-full mb-4 p-1 bg-gray-800/50 rounded-md"
                  variants={itemVariants}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {plan.billingOptions && (
                      <>
                        <div className="flex flex-col space-y-2 mb-4 relative">
                          <span className="text-sm text-gray-400">Billing Cycle</span>
                          <div className="flex flex-wrap gap-1">
                            <Button
                              variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                              className={`h-auto py-1 px-2 text-xs flex-1 min-w-[70px] ${billingCycle === 'monthly' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                              onClick={(e) => handleBillingCycleClick('monthly', e)}
                            >
                              Monthly
                            </Button>
                            <Button
                              variant={billingCycle === 'quarterly' ? 'default' : 'outline'}
                              className={`h-auto py-1 px-2 text-xs flex-1 min-w-[70px] ${billingCycle === 'quarterly' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                              onClick={(e) => handleBillingCycleClick('quarterly', e)}
                              disabled={!plan.billingOptions?.quarterly?.enabled}
                            >
                              <div className="flex flex-col items-center">
                                <span>Quarterly</span>
                                {plan.billingOptions?.quarterly?.enabled && (
                                  <span className="bg-cyber text-midnight text-[10px] rounded px-1">-{plan.billingOptions.quarterly.discountPercentage}%</span>
                                )}
                              </div>
                            </Button>
                            <Button
                              variant={billingCycle === 'annually' ? 'default' : 'outline'}
                              className={`h-auto py-1 px-2 text-xs flex-1 min-w-[70px] ${billingCycle === 'annually' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                              onClick={(e) => handleBillingCycleClick('annually', e)}
                              disabled={!plan.billingOptions?.annual?.enabled}
                            >
                              <div className="flex flex-col items-center">
                                <span>Annual</span>
                                {plan.billingOptions?.annual?.enabled && (
                                  <span className="bg-cyber text-midnight text-[10px] rounded px-1">-{plan.billingOptions.annual.discountPercentage}%</span>
                                )}
                              </div>
                            </Button>
                            <Button
                              variant={billingCycle === 'biannually' ? 'default' : 'outline'}
                              className={`h-auto py-1 px-2 text-xs flex-1 min-w-[70px] ${billingCycle === 'biannually' ? 'bg-electric text-midnight' : 'bg-transparent text-gray-300'}`}
                              onClick={(e) => handleBillingCycleClick('biannually', e)}
                              disabled={!plan.billingOptions?.biannual?.enabled}
                            >
                              <div className="flex flex-col items-center">
                                <span>Biannual</span>
                                {plan.billingOptions?.biannual?.enabled && (
                                  <span className="bg-cyber text-midnight text-[10px] rounded px-1">-{plan.billingOptions.biannual.discountPercentage}%</span>
                                )}
                              </div>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800/40 p-3 rounded-md mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Monthly price:</span>
                            <span>€{currentPrice ? currentPrice.toFixed(2) : ""}</span>
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
                      className={`w-full ${plan.isCustom ? 'bg-cyber hover:bg-cyber/80' : 'bg-electric hover:bg-electric/80'} text-charcoal font-medium`}
                    >
                      {plan.isCustom ? 'Configure Now' : 'Buy Now!'}
                    </Button>
                  </motion.div>
                </a>
              </motion.div>
            </CardFooter>
            
            {/* Overlay glow effect */}
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-electric/0 via-electric/20 to-electric/0 rounded-xl opacity-0 blur-xl"
              animate={{ opacity: plan.popular ? 0.4 : 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnimatedPlanCard; 