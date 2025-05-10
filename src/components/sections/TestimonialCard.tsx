import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RecentActivityFeed, { Activity } from './RecentActivityFeed';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    position: string;
    company: string;
    image: string;
    quote: string;
    rating: number;
  };
  recentActivities: Activity[];
  clientBadge?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  goToIndex?: (index: number) => void;
  hasMultiple?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial,
  recentActivities,
  clientBadge = "Client",
  onPrevious,
  onNext,
  goToIndex,
  hasMultiple = false,
  currentIndex = 0,
  totalCount = 1
}) => {
  return (
    <div className="bg-[#0A0E24] rounded-xl border border-white/5 p-6 shadow-xl relative group overflow-hidden">
      {hasMultiple && (
        <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button 
            onClick={onPrevious}
            className="w-8 h-8 bg-charcoal border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-midnight transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}
      
      {hasMultiple && (
        <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button 
            onClick={onNext}
            className="w-8 h-8 bg-charcoal border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-midnight transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="mb-8 pb-8 border-b border-white/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-full border-2 border-electric/30 overflow-hidden flex-shrink-0"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <motion.h4 
                className="text-white font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {testimonial.name}
              </motion.h4>
              <motion.p 
                className="text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                {testimonial.position} at {testimonial.company}
              </motion.p>
            </div>
            <motion.div 
              className="ml-auto bg-electric/10 rounded-md px-2 py-1 text-xs text-electric font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {clientBadge}
            </motion.div>
          </div>
          
          <motion.p 
            className="text-white/80 italic mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {testimonial.quote}
          </motion.p>
          
          <motion.div 
            className="flex text-cyber gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={i < testimonial.rating ? 'currentColor' : 'none'}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <RecentActivityFeed activities={recentActivities} />
      </motion.div>
      
      {/* Testimonial indicators */}
      {hasMultiple && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: totalCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex && goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-electric w-4' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard; 