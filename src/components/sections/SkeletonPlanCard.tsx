import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { motion } from 'framer-motion';

interface SkeletonPlanCardProps {
  delay?: number;
}

const SkeletonPlanCard: React.FC<SkeletonPlanCardProps> = ({ delay = 0 }) => {
  // Subtle pulse animation for the skeleton
  const pulseVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: 0.8, 
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse" as const, 
        duration: 1.5 
      } 
    }
  };

  // Card entry animation with staggered delay
  const cardEntryVariants = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="h-full relative"
      variants={cardEntryVariants}
      initial="initial"
      animate="animate"
    >
      <Card className="bg-[#0C0F2D] border border-gray-800 rounded-xl flex flex-col h-full relative overflow-hidden">
        {/* Shimmer Effect Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -inset-full h-full w-1/2 z-10 bg-gradient-to-r from-transparent via-electric/10 to-transparent skew-x-12"
            animate={{
              x: ["0%", "200%"]
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </div>

        <CardHeader className="pb-3 bg-midnight pt-4 rounded-t-xl">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="mb-2 pl-2">
                  <motion.div 
                    className="h-14 w-14 flex items-center justify-center bg-gray-800 rounded-full"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                <motion.div 
                  className="h-7 bg-gray-800 rounded w-3/4 mb-2"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.div 
                  className="h-5 bg-gray-800 rounded w-5/6"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>
            
            <div className="text-right">
              <motion.div 
                className="h-4 bg-gray-800 rounded w-16 mb-1 ml-auto"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
              <motion.div 
                className="h-7 bg-gray-800 rounded w-24 mb-1 ml-auto"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-3 pb-2 flex-grow px-4">
          <div className="space-y-3">
            {/* Skeleton Specs Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#101224] p-3 rounded-lg text-center border border-gray-800">
                  <motion.div 
                    className="h-4 bg-gray-800 rounded w-1/2 mx-auto mb-1"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div 
                    className="h-5 bg-gray-800 rounded w-2/3 mx-auto"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              ))}
            </div>
            
            {/* Skeleton Features */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <motion.div 
                      className="h-5 w-5 bg-gray-800 rounded-full flex-shrink-0"
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    />
                    <motion.div 
                      className="h-4 bg-gray-800 rounded w-3/4"
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Skeleton Footer */}
        <div className="px-4 pb-3 mt-auto">
          {/* Skeleton Billing Options */}
          <div className="w-full mb-3">
            <div className="grid grid-cols-2 gap-2 mb-2">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-10 bg-gray-800 rounded"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-10 bg-gray-800 rounded"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
              ))}
            </div>
          </div>
          
          {/* Skeleton Button */}
          <motion.div
            className="h-10 bg-gray-800 rounded w-full"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default SkeletonPlanCard; 