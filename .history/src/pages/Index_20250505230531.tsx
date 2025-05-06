import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden bg-steel">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#22D46B10_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 text-electric fade-in">
              Premium Remote Desktop Servers
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
              Secure, high-performance RDP solutions with instant setup, robust security features, and reliable 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-4">
                <Link to="/plans">View Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric text-electric hover:bg-electric/10 text-base px-8 py-4">
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Benefits Section */}
      <section className="bg-midnight py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Why Choose StealthRDP
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-charcoal rounded-xl p-6 card-hover">
              <div className="w-14 h-14 rounded-full bg-cyber/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">Instant Setup</h3>
              <p className="text-white/80">
                Get your RDP server up and running within minutes after payment. No waiting, no delays - start working immediately.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-charcoal rounded-xl p-6 card-hover">
              <div className="w-14 h-14 rounded-full bg-electric/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">24/7 Support</h3>
              <p className="text-white/80">
                Our dedicated team is available around the clock to assist with any technical issues or questions you may have.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-charcoal rounded-xl p-6 card-hover">
              <div className="w-14 h-14 rounded-full bg-cyber/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-3">Enhanced Security</h3>
              <p className="text-white/80">
                Robust security measures including DDoS protection, secure data centers, and regular backups to keep your work safe.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-charcoal">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-midnight rounded-xl p-6 relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center mb-4 text-electric font-montserrat font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold font-montserrat text-white mb-3">Choose a Plan</h3>
                <p className="text-white/80 flex-grow">
                  Select from our range of RDP plans designed to meet different needs and budgets.
                </p>
                <Link to="/plans" className="text-electric hover:underline mt-4 inline-block">
                  View Plans →
                </Link>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-gradient-to-r from-electric to-transparent -translate-y-1/2 z-0"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-midnight rounded-xl p-6 relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center mb-4 text-electric font-montserrat font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold font-montserrat text-white mb-3">Complete Payment</h3>
                <p className="text-white/80 flex-grow">
                  Choose your preferred payment method. We accept multiple cryptocurrencies and other payment options.
                </p>
                <Link to="/payment" className="text-electric hover:underline mt-4 inline-block">
                  Payment Methods →
                </Link>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-gradient-to-r from-electric to-transparent -translate-y-1/2 z-0"></div>
            </div>
            
            {/* Step 3 */}
            <div>
              <div className="bg-midnight rounded-xl p-6 relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center mb-4 text-electric font-montserrat font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold font-montserrat text-white mb-3">Instant Access</h3>
                <p className="text-white/80 flex-grow">
                  Receive your RDP login details immediately after payment confirmation. Start using your server right away.
                </p>
                <Link to="/getting-started" className="text-electric hover:underline mt-4 inline-block">
                  Getting Started →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Plans Preview Section */}
      <section className="py-16 bg-gradient-to-b from-midnight to-charcoal">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Our RDP Server Plans
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Choose the plan that best suits your requirements. All plans include 24/7 support and DDoS protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-midnight border border-gray-800 rounded-xl overflow-hidden card-hover">
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat text-white mb-1">Standard RDP</h3>
                <p className="text-white/80 text-sm mb-4">Perfect for everyday tasks and browsing</p>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-white">$15</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">2 vCPU Cores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">4GB RAM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">80GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">Unlimited Bandwidth</span>
                  </li>
                </ul>
                <Button asChild className="w-full border border-electric text-electric hover:bg-electric/10 transition-colors">
                  <Link to="/plans">Select Plan</Link>
                </Button>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-midnight border-2 border-electric rounded-xl overflow-hidden relative card-hover">
              <div className="absolute top-0 right-0 bg-electric text-midnight px-3 py-1 text-xs font-bold font-montserrat rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat text-white mb-1">Professional RDP</h3>
                <p className="text-white/80 text-sm mb-4">Ideal for business and professional use</p>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-white">$30</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">4 vCPU Cores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">8GB RAM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">120GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">Unlimited Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">Priority Support</span>
                  </li>
                </ul>
                <Button asChild className="w-full btn-electric">
                  <Link to="/plans">Select Plan</Link>
                </Button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-midnight border border-gray-800 rounded-xl overflow-hidden card-hover">
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat text-white mb-1">Enterprise RDP</h3>
                <p className="text-white/80 text-sm mb-4">For high-demand applications and services</p>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold text-white">$50</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">8 vCPU Cores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">16GB RAM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">250GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">Unlimited Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-2 mt-0.5" />
                    <span className="text-white/80">24/7 Premium Support</span>
                  </li>
                </ul>
                <Button asChild className="w-full border border-electric text-electric hover:bg-electric/10 transition-colors">
                  <Link to="/plans">Select Plan</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/plans" className="text-electric hover:underline">
              Compare All Plans →
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-charcoal">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-midnight to-charcoal p-8 sm:p-10 md:p-12 rounded-2xl border border-gray-800 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#22D46B05_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-electric">
                Ready to Get Your Premium RDP Server?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Experience the power, security, and reliability of our RDP solutions. Get started today with instant activation and 24/7 support.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-4">
                  <Link to="/plans">Choose a Plan</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-electric text-electric hover:bg-electric/10">
                  <a href="https://stealthrdp.com/dash/submitticket.php" target="_blank" rel="noopener noreferrer">Contact Support</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
