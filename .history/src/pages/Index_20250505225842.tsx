import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section (Above the Fold) */}
      <section className="bg-steel pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="md:col-span-6">
              <h1 className="text-4xl md:text-5xl font-bold font-montserrat leading-[1.16] text-electric mb-4">
                Premium Remote Desktop Services
              </h1>
              <p className="text-white/80 text-lg leading-6 mb-8 font-[400] max-w-xl">
                Secure, high-performance RDP solutions with instant setup, 
                robust security features, and reliable 24/7 support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-cyber text-midnight hover:bg-cyber/90 font-montserrat font-bold text-base uppercase px-8 py-4">
                  <Link to="/plans">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="border-electric text-electric hover:bg-electric/10 px-8 py-4">
                  <Link to="/features">Learn More</Link>
                </Button>
              </div>
            </div>
            
            {/* Right Column: Illustration */}
            <div className="md:col-span-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(#00F0FF15_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <img 
                  src="/assets/images/server-illustration.png" 
                  alt="StealthRDP server visualization" 
                  className="w-full h-auto relative z-10"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://placehold.co/600x400/101224/00F0FF?text=StealthRDP';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Snapshot (Mid-Page) */}
      <section className="bg-midnight py-16 md:py-[64px]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 text-white">
            Why Choose StealthRDP
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="mb-8">
              <div className="w-8 h-8 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-2">Instant Setup</h3>
              <p className="text-white/80 leading-6">
                Get your RDP server up and running within minutes after payment. No waiting, no delays - start working immediately.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="mb-8">
              <div className="w-8 h-8 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-2">24/7 Support</h3>
              <p className="text-white/80 leading-6">
                Our dedicated team is available around the clock to assist with any technical issues or questions you may have.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="mb-8">
              <div className="w-8 h-8 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-montserrat text-white mb-2">Enhanced Security</h3>
              <p className="text-white/80 leading-6">
                Robust security measures including DDoS protection, secure data centers, and regular backups to keep your work safe.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="bg-steel py-16 md:py-[64px]">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-center mb-8 text-white">
            Trusted by Teams Worldwide
          </h2>
          
          {/* Client Logos */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <div className="h-10 w-auto opacity-70">
                  <img 
                    src={`/assets/images/client-${i}.png`} 
                    alt={`Client ${i}`} 
                    className="h-full w-auto"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://placehold.co/200x80/101224/FFFFFF7F?text=Client';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Testimonial */}
          <div className="bg-charcoal rounded-lg p-6 max-w-3xl mx-auto">
            <div className="text-electric mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <p className="text-white leading-6 mb-4">
              StealthRDP has been a game-changer for our remote operations. Their servers are lightning-fast, the security is top-notch, and customer support is responsive. We've experienced zero downtime since switching to their service.
            </p>
            <p className="text-white/80 text-sm font-montserrat font-semibold">
              Michael Thompson, CTO at DataTech Solutions
            </p>
          </div>
        </div>
      </section>
      
      {/* Feature Details */}
      <section className="bg-midnight py-16 md:py-[64px]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
            <div className="md:col-span-6 order-2 md:order-1">
              <img 
                src="/assets/images/feature-performance.png" 
                alt="High performance servers" 
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://placehold.co/600x400/101224/00F0FF?text=Performance';
                }}
              />
            </div>
            <div className="md:col-span-6 order-1 md:order-2">
              <h3 className="text-2xl md:text-[28px] leading-9 font-bold font-montserrat text-electric mb-4">
                High-Performance Infrastructure
              </h3>
              <p className="text-white/80 leading-6 mb-4">
                Our RDP servers are built on enterprise-grade hardware with NVMe SSDs, multiple CPU cores, and ample RAM to handle demanding workloads efficiently. Experience smooth operation with minimal latency, even for resource-intensive applications.
              </p>
              <Link to="/features" className="text-electric hover:underline">Learn More</Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6">
              <h3 className="text-2xl md:text-[28px] leading-9 font-bold font-montserrat text-electric mb-4">
                Advanced Security Measures
              </h3>
              <p className="text-white/80 leading-6 mb-4">
                We implement comprehensive security protocols including DDoS protection, encrypted connections, regular security audits, and network monitoring to protect your data and ensure continuous service availability.
              </p>
              <Link to="/security" className="text-electric hover:underline">Learn More</Link>
            </div>
            <div className="md:col-span-6">
              <img 
                src="/assets/images/feature-security.png" 
                alt="Advanced security features" 
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://placehold.co/600x400/101224/00F0FF?text=Security';
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Limited-Time Offer */}
      <section className="bg-cyber py-12 md:py-[48px]">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl md:text-[28px] leading-9 font-bold font-montserrat text-midnight mb-4">
              Limited-Time Special Offer: 20% Off All Plans
            </h2>
            <div className="font-bold text-xl md:text-2xl text-midnight mb-6">
              Ends in: <span id="countdown">48:00:00</span>
            </div>
            <Button asChild className="bg-midnight text-white hover:bg-midnight/90 font-montserrat font-bold text-base px-8 py-4">
              <Link to="/plans">Claim Offer</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="bg-midnight py-16 md:py-[64px]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-[36px] leading-[44px] font-bold font-montserrat text-electric mb-4">
              Ready to Experience Premium RDP Service?
            </h2>
            <p className="text-white/80 leading-6 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust StealthRDP for their remote desktop needs. Get started today with our easy setup process.
            </p>
            <Button asChild className="bg-cyber text-midnight hover:bg-cyber/90 font-montserrat font-bold text-base uppercase px-8 py-4">
              <Link to="/plans">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Temporarily comment out the useEffect hook
// React.useEffect(() => {
//   const countdownElement = document.getElementById('countdown');
//   if (countdownElement) {
//     let hours = 48;
//     let minutes = 0;
//     let seconds = 0;
//     
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         seconds--;
//       } else {
//         if (minutes > 0) {
//           minutes--;
//           seconds = 59;
//         } else {
//           if (hours > 0) {
//             hours--;
//             minutes = 59;
//             seconds = 59;
//           } else {
//             clearInterval(interval);
//           }
//         }
//       }
//       
//       const formattedHours = String(hours).padStart(2, '0');
//       const formattedMinutes = String(minutes).padStart(2, '0');
//       const formattedSeconds = String(seconds).padStart(2, '0');
//       
//       countdownElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
//     }, 1000);
//     
//     return () => clearInterval(interval);
//   }
// }, []);

export default Index;
