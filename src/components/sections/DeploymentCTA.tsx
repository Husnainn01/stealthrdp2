import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Clock, Users } from 'lucide-react';

interface DeploymentCTAProps {
  startingPrice?: string;
}

const DeploymentCTA: React.FC<DeploymentCTAProps> = ({ 
  startingPrice = "9.50" 
}) => {
  return (
    <div>
      <div className="mb-4">
        <span className="inline-block px-4 py-1 rounded-full bg-electric/10 text-electric text-xs font-medium tracking-wider">
          JOIN 10,877+ SERVER OWNERS
        </span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-6 leading-tight">
        Ready to Stop <span className="text-electric">Wasting<br />Time</span> on Server<br />Management?
      </h2>
      
      <p className="text-white/80 mb-8 text-lg">
        Deploy your high-performance VPS in the next 60 seconds and<br />
        focus on what matters — your actual work.
      </p>
      
      <div className="space-y-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-electric/10 mt-0.5">
            <ShieldCheck className="h-5 w-5 text-electric" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Secure Transactions</h3>
            <p className="text-white/60 text-sm">Bank-level encryption keeps your payment information protected.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-electric/10 mt-0.5">
            <Clock className="h-5 w-5 text-electric" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Instant Deployment</h3>
            <p className="text-white/60 text-sm">Full server access within 60 seconds of purchase. No waiting.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-electric/10 mt-0.5">
            <Users className="h-5 w-5 text-electric" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Expert Support</h3>
            <p className="text-white/60 text-sm">24/7 technical assistance with average response under 2 hours.</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button asChild className="w-full sm:w-auto bg-cyber text-midnight hover:bg-cyber/90 transition-all font-medium py-6 px-8 shadow-[0_4px_12px_rgba(34,212,107,0.3)]">
          <Link to="/plans">
            DEPLOY YOUR SERVER NOW
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent border-electric/30 text-electric hover:bg-electric/5 transition-all py-6 px-8">
          <Link to="/contact">
            Ask a Pre-Sales Question
          </Link>
        </Button>
      </div>
      
      <p className="text-white/60 text-sm mt-4">
        Starting at just <span className="text-cyber font-mono font-medium">${startingPrice}/month</span> · Cancel anytime
      </p>
    </div>
  );
};

export default DeploymentCTA; 