import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, Zap, ShieldCheck, Clock, Users, Code, Cpu, HardDrive, Globe, Settings, Laptop } from 'lucide-react';

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Add custom styles for the slider dots to match the design system
const customSliderStyles = `
  .custom-dots {
    bottom: -25px; /* Position dots below the slider */
  }

  .custom-dots li {
    margin: 0 4px; /* Use base unit multiple for spacing */
    cursor: pointer; /* Add pointer cursor for better affordance */
  }

  /* Default :before styles are not needed due to customPaging */

 .custom-dots li.slick-active button:before {
    color: #22D46B; /* Cyber Green - active */
    opacity: 1;
  }

  .dot { /* Style for customPaging dot element */
    width: 8px; /* Base unit */
    height: 8px; /* Base unit */
    border-radius: 50%;
    background-color: #1E1E1E; /* Steel Gray - inactive */
    opacity: 0.6;
    transition: all 0.2s ease-in-out;
    pointer-events: none; /* Ensure div doesn't block clicks on parent li */
  }

  .slick-active .dot {
     background-color: #22D46B; /* Cyber Green - active */
     opacity: 1;
     transform: scale(1.1); /* Slight scale on active */
  }
`;

const Index = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    customPaging: i => (
      <div className="dot"></div>
    )
  };

  return (
    <Layout>
      {/* Inject custom slider styles */}
      <style>{customSliderStyles}</style>

      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden bg-gradient-to-b from-charcoal to-midnight">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#22D46B1A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 text-electric fade-in">
              Blazing-Fast & Secure VPS Hosting
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
              Instant deployment, NVMe SSD speed, robust DDoS protection, 99.9% uptime guarantee, and expert 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-3">
                <Link to="/plans">Deploy Your Server Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric text-electric hover:bg-electric/10 text-base px-8 py-3">
                <Link to="/plans">View Plans & Pricing</Link>
              </Button>
            </div>
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-6 text-white/60 text-sm fade-in" style={{ animationDelay: '0.6s' }}>
              <span className="flex items-center gap-1.5 whitespace-nowrap"><Check size={16} /> Instant Setup</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap"><ShieldCheck size={16} /> 99.9% Uptime</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap"><Users size={16} /> 24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust/Client Logo Bar */}
      <section className="py-8 bg-midnight">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16 max-w-4xl mx-auto">
            {/* Trust Signal 1: Secure Payments */}
            <div className="flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors">
              <ShieldCheck size={20} className="text-cyber" />
              <span className="font-montserrat text-sm uppercase tracking-wider">Secure Payments</span>
            </div>
            {/* Trust Signal 2: Uptime */}
            <div className="flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors">
              <Zap size={20} className="text-electric" />
              <span className="font-montserrat text-sm uppercase tracking-wider">99.9% Uptime SLA</span>
            </div>
            {/* Trust Signal 3: Support */}
            <div className="flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors">
              <Users size={20} className="text-cyber" />
              <span className="font-montserrat text-sm uppercase tracking-wider">24/7 Support</span>
            </div>
             {/* Trust Signal 4: Instant Setup */}
             <div className="flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors">
              <Clock size={20} className="text-electric" />
              <span className="font-montserrat text-sm uppercase tracking-wider">Instant Setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Differentiators/Why Us? */}
      <section className="bg-charcoal py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-10 text-white">
            Why Choose StealthRDP?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Performance */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Zap className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Unmatched Performance</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Experience lightning-fast speeds with our NVMe SSDs and high-performance CPU cores, optimized for demanding workloads.
              </p>
            </div>
            {/* Feature 2: Security */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <ShieldCheck className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Rock-Solid Security</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Benefit from robust DDoS protection, secure network infrastructure, and proactive monitoring to keep your data safe.
              </p>
            </div>
            {/* Feature 3: Deployment */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Clock className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Instant Deployment</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Get your VPS server up and running in minutes after checkout. No waiting, just immediate access.
              </p>
            </div>
            {/* Feature 4: Support */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Users className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Expert Support</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our knowledgeable support team is available 24/7 via ticket or chat to assist with any issues or questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simplified Plans Preview -> Changed to Slider */}
      <section className="py-12 md:py-16 bg-midnight overflow-hidden">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              Scalable VPS Plans for Every Need
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Choose from pre-configured plans in multiple locations or build your own. All powered by high-performance hardware and robust security.
            </p>
          </div>

          {/* --- Slider Implementation --- */}
          <div className="max-w-lg mx-auto">
            <Slider {...sliderSettings}>
              {/* Slide 1: USA Plans Range */}
              <div className="px-2 pb-4">
                <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover flex flex-col h-full">
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold font-montserrat text-white mb-1">USA Location Plans</h3>
                    <p className="text-white/70 text-sm mb-4">High performance servers hosted in the US.</p>
                    <div className="flex items-baseline mb-4">
                      <span className="text-sm text-white/70 mr-1">Starting from</span>
                      <span className="text-3xl font-bold text-white">$9.50</span>
                      <span className="text-white/60 ml-1 text-sm">/month</span>
                    </div>
                    <ul className="space-y-2 mb-5 text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">2-8 Core CPU</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">4-32 GB RAM</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">60-150 GB SSD</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">Unlimited Bandwidth</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">DDoS Protection Included</span></li>
                    </ul>
                  </div>
                  <div className="p-6 pt-0 mt-auto">
                     <Button asChild className="w-full border border-electric text-electric hover:bg-electric/10 transition-colors">
                       <Link to="/plans">Explore USA Plans</Link>
                     </Button>
                  </div>
                </div>
              </div>

              {/* Slide 2: EU Plans Range */}
              <div className="px-2 pb-4">
                <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover flex flex-col h-full">
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold font-montserrat text-white mb-1">EU Location Plans</h3>
                    <p className="text-white/70 text-sm mb-4">Secure servers hosted in the Netherlands.</p>
                    <div className="flex items-baseline mb-4">
                      <span className="text-sm text-white/70 mr-1">Starting from</span>
                      <span className="text-3xl font-bold text-white">€9.50</span>
                      <span className="text-white/60 ml-1 text-sm">/month</span>
                    </div>
                    <ul className="space-y-2 mb-5 text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">2-6 Core CPU</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">4-24 GB RAM</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">40-120 GB SSD</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">Unlimited Bandwidth</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">DDoS Protection Included</span></li>
                    </ul>
                  </div>
                  <div className="p-6 pt-0 mt-auto">
                     <Button asChild className="w-full border border-electric text-electric hover:bg-electric/10 transition-colors">
                       <Link to="/plans">Explore EU Plans</Link>
                     </Button>
                  </div>
                </div>
              </div>

              {/* Slide 3: Build Your Own */}
              <div className="px-2 pb-4">
                <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover flex flex-col h-full">
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold font-montserrat text-white mb-1">Build Your Own VPS</h3>
                    <p className="text-white/70 text-sm mb-4">Tailor resources to your exact needs</p>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold text-white">Custom Price</span>
                    </div>
                    <ul className="space-y-2 mb-5 text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">Choose CPU Cores</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">Select RAM Amount</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">Define SSD Storage Size</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">Select Operating System</span></li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyber flex-shrink-0" /><span className="text-white/80">Add Optional Features</span></li>
                    </ul>
                  </div>
                  <div className="p-6 pt-0 mt-auto">
                     <Button asChild className="w-full btn-cyber">
                       <a href="https://stealthrdp.com/dash/index.php?rp=/store/build-your-own-rdp-vps" target="_blank" rel="noopener noreferrer">
                         Configure & Buy
                       </a>
                     </Button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
          {/* --- End Slider Implementation --- */}

          {/* Billing Cycle Hint */}
          <p className="text-center text-white/60 text-sm mt-6 mb-4 max-w-lg mx-auto">
            Pricing shown based on monthly billing. Choose from Monthly, Quarterly, Annual & Biannual options on the full plans page for greater savings!
          </p>

          <div className="text-center mt-12">
            <Link to="/plans" className="text-electric hover:underline font-semibold">
              Compare All Plans & Features →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Enhanced Detailed Features Section (from Features.tsx) */}
      <section className="py-12 md:py-16 bg-charcoal">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-10 text-white">
            Powerhouse Features Included
          </h2>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Feature: High-Performance CPU */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Cpu className="h-8 w-8 text-cyber flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">High-Performance CPU</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Dedicated cores (2-8 based on plan) optimized for demanding workloads and low-latency processing.
                </p>
                <Link to="/features#hardware" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
              </div>
            </div>

            {/* Feature: NVMe SSD Storage */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <HardDrive className="h-8 w-8 text-electric flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">NVMe SSD Storage</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Experience blazing-fast read/write speeds with pure NVMe SSDs for optimal application performance.
                </p>
                 <Link to="/features#hardware" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: Robust Network */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Globe className="h-8 w-8 text-cyber flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">1Gbps Network & Unlimited BW</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Unrestrained usage with high-speed connectivity and dedicated IPs on premium infrastructure.
                </p>
                 <Link to="/features#hardware" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: Advanced Security */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <ShieldCheck className="h-8 w-8 text-electric flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Advanced Security</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Multi-layered DDoS protection, secure network, clean IPs, and configurable firewalls.
                </p>
                 <Link to="/features#security" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: Full Control */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Settings className="h-8 w-8 text-cyber flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Full Control & Management</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Root/Admin access, intuitive control panel for reboots/reinstalls, and OS selection.
                </p>
                 <Link to="/features#management" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: OS Choice */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Laptop className="h-8 w-8 text-electric flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Windows & Linux OS</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Choose your preferred operating system during setup, including various Linux distributions and Windows Server.
                </p>
                 <Link to="/features#management" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Social Proof (Testimonial) */}
      <section className="py-12 md:py-16 bg-midnight">
         <div className="container">
           <div className="bg-charcoal rounded-lg p-8 md:p-12 max-w-4xl mx-auto text-center shadow-xl border border-white/10">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-electric mx-auto mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-2.13a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
             </svg>
             <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed mb-6">
               "Switching to StealthRDP cut our application load times in half. The performance is outstanding, and their support team resolved a complex issue for us within minutes. Highly recommended!"
             </p>
             <p className="font-semibold text-white font-montserrat text-lg">
               - Alex Johnson, Infrastructure Lead at Innovate Solutions
             </p>
           </div>
         </div>
       </section>

      {/* NEW: Newsletter Signup Section */}
      <section className="py-12 md:py-16 bg-charcoal">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold font-montserrat text-white mb-3">Stay Updated</h2>
            <p className="text-white/70 mb-6">Get occasional emails about special offers, new features, and tech tips.</p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}> 
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-grow px-4 py-2.5 rounded-md bg-midnight border border-white/20 text-white placeholder:text-white/50 focus:border-electric focus:ring-electric focus:outline-none text-sm"
                required
              />
              <Button type="submit" variant="outline" className="border-electric text-electric hover:bg-electric/10 px-6 py-2.5 text-sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* 8. Final Call to Action */}
      <section className="py-12 md:py-16 bg-gradient-to-t from-charcoal to-midnight">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-electric">
              Ready for Reliable, High-Performance VPS?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Stop worrying about downtime and performance. Deploy your secure StealthRDP server today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-3">
                <Link to="/plans">Deploy Your Server Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric text-electric hover:bg-electric/10 text-base px-8 py-3">
                 <a href="https://stealthrdp.com/dash/submitticket.php" target="_blank" rel="noopener noreferrer">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
