import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, Zap, ShieldCheck, Clock, Users, Code, Cpu, HardDrive, Globe, Settings, Laptop, Server, Bot, Gamepad2, Repeat, Disc } from 'lucide-react';

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Swiper and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// USA Plan Data
const usaPlans = [
  {
    name: 'Bronze USA',
    description: 'Blazing Fast Connectivity',
    monthlyPrice: 9.50,
    specs: {
      cpu: '2 Core',
      ram: '4 GB RAM',
      storage: '60 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=monthly'
  },
  {
    name: 'Silver USA',
    description: 'Blazing Fast Connectivity',
    monthlyPrice: 18.04,
    specs: {
      cpu: '2 Core',
      ram: '8 GB RAM',
      storage: '80 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=monthly',
    popular: true
  },
  {
    name: 'Gold USA',
    description: 'Blazing Fast Connectivity',
    monthlyPrice: 26.59,
    specs: {
      cpu: '4 Core',
      ram: '16 GB RAM',
      storage: '100 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/gold-usa&billingcycle=monthly'
  },
  {
    name: 'Platinum USA',
    description: 'Blazing Fast Connectivity',
    monthlyPrice: 33.24,
    specs: {
      cpu: '6 Core',
      ram: '16 GB RAM',
      storage: '100 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/platinum-usa&billingcycle=monthly'
  },
  {
    name: 'Diamond USA',
    description: 'Blazing Fast Connectivity',
    monthlyPrice: 42.75,
    specs: {
      cpu: '6 Core',
      ram: '32 GB RAM',
      storage: '150 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/diamond-usa&billingcycle=monthly'
  },
  {
    name: 'Emerald USA',
    description: 'Blazing Fast Connectivity',
    monthlyPrice: 51.30,
    specs: {
      cpu: '8 Core',
      ram: '32 GB RAM',
      storage: '150 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/emerald-usa&billingcycle=monthly'
  }
];

// EU Plan Data
const euPlans = [
  {
    name: 'Bronze EU',
    description: 'Secure. Fast. Limitless',
    monthlyPrice: 9.50,
    specs: {
      cpu: '2 Core',
      ram: '4 GB RAM',
      storage: '40 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-eu-rdp-vps/bronze-eu&billingcycle=monthly'
  },
  {
    name: 'Silver EU',
    description: 'Secure. Fast. Limitless',
    monthlyPrice: 17.10,
    specs: {
      cpu: '4 Core',
      ram: '8 GB RAM',
      storage: '80 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-eu-rdp-vps/silver-eu&billingcycle=monthly'
  },
  {
    name: 'Gold EU',
    description: 'Secure. Fast. Limitless',
    monthlyPrice: 28.49,
    specs: {
      cpu: '4 Core',
      ram: '16 GB RAM',
      storage: '100 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-eu-rdp-vps/gold-eu&billingcycle=monthly'
  },
  {
    name: 'Platinum EU',
    description: 'Secure. Fast. Limitless',
    monthlyPrice: 33.24,
    specs: {
      cpu: '6 Core',
      ram: '16 GB RAM',
      storage: '100 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-eu-rdp-vps/platinum-eu&billingcycle=monthly'
  },
  {
    name: 'Diamond EU',
    description: 'Secure. Fast. Limitless', 
    monthlyPrice: 37.99,
    specs: {
      cpu: '6 Core',
      ram: '24 GB RAM',
      storage: '120 GB SSD',
      bandwidth: 'Unlimited'
    },
    purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-eu-rdp-vps/diamond-eu&billingcycle=monthly'
  }
];

// Add custom styles for sliders and components
const customStyles = `
  .swiper-pagination {
    display: none !important;
  }
  
  .plan-navigation-hint {
    display: none !important;
  }
  
  .swiper-pagination-bullet {
    background-color: #1E1E1E;
    opacity: 0.6;
    width: 8px;
    height: 8px;
    transition: all 0.3s ease;
  }
  
  .swiper-pagination-bullet-active {
    background-color: #22D46B;
    opacity: 1;
    transform: scale(1.2);
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #00F0FF;
    width: 12px;
    height: 12px;
    transition: transform 0.2s ease, opacity 0.2s ease;
    opacity: 0.7;
    background-color: rgba(11, 15, 45, 0.6);
    padding: 20px;
    border-radius: 50%;
  }
  
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    transform: scale(1.1);
    opacity: 1;
    background-color: rgba(11, 15, 45, 0.9);
  }
  
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 24px;
    font-weight: bold;
  }
  
  .plan-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    overflow: hidden;
    padding: 24px;
    height: 460px;
  }
  
  .plan-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,240,255,0.03) 0%, rgba(11,15,45,0) 70%);
    z-index: -1;
  }
  
  .plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.5), 0 0 15px rgba(0,240,255,0.1);
  }
  
  .popular-plan {
    transform: scale(1.02);
    border-color: #00F0FF !important;
    box-shadow: 0 10px 25px rgba(0,0,0,0.4), 0 0 20px rgba(0,240,255,0.15);
  }
  
  .popular-plan:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(0,240,255,0.2);
  }
  
  .popular-badge, .starting-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #00F0FF;
    color: #0B0F2D;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 6px 12px;
    border-bottom-left-radius: 8px;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 10px rgba(0,240,255,0.3);
    z-index: 2;
  }
  
  .starting-badge {
    background: #22D46B;
    right: 0;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 0;
  }
  
  .plan-card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .plan-name {
    font-size: 22px;
    line-height: 1.2;
    margin-bottom: 2px;
    height: 28px;
  }
  
  .plan-description {
    font-size: 14px;
    opacity: 0.7;
    margin-bottom: 16px;
    height: 18px;
  }
  
  .plan-price-container {
    display: flex;
    align-items: baseline;
    margin-bottom: 20px;
    height: 48px;
  }
  
  .plan-price {
    font-size: 32px;
    font-weight: 700;
    margin-right: 4px;
    background: linear-gradient(90deg, #FFF, #00F0FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .plan-period {
    font-size: 14px;
    opacity: 0.6;
  }
  
  .specs-list {
    margin: 20px 0;
    padding-left: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 180px;
  }
  
  .specs-list li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 24px;
  }
  
  .specs-list .check-icon {
    color: #22D46B;
    flex-shrink: 0;
    margin-right: 10px;
  }
  
  .specs-text {
    color: rgba(255, 255, 255, 0.85);
  }
  
  .plan-card-footer {
    margin-top: 20px;
    height: 48px;
  }
  
  .buy-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    height: 48px;
  }
  
  .buy-button-primary {
    background: #00F0FF;
    color: #0B0F2D;
  }
  
  .buy-button-primary:hover {
    background: #22D46B;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,240,255,0.3);
  }
  
  .buy-button-outline {
    background: transparent;
    border: 2px solid #00F0FF;
    color: #00F0FF;
  }
  
  .buy-button-outline:hover {
    background: rgba(0,240,255,0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,240,255,0.15);
  }
  
  .buy-button-custom {
    background: #22D46B;
    color: #0B0F2D;
  }
  
  .buy-button-custom:hover {
    background: #33E57C;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(34,212,107,0.3);
  }
  
  .plans-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(0,240,255,0.05) 0%, rgba(0,0,0,0) 70%);
    z-index: -1;
  }
  
  .compare-link {
    position: relative;
    display: inline-block;
    color: #00F0FF;
    font-weight: 600;
    margin-top: 20px;
    transition: all 0.3s ease;
  }
  
  .compare-link:hover {
    color: #22D46B;
    transform: translateX(3px);
  }
  
  .compare-link::after {
    content: '→';
    margin-left: 5px;
    transition: transform 0.3s ease;
  }
  
  .compare-link:hover::after {
    transform: translateX(3px);
  }
  
  .plans-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 20px;
  }
  
  @media (min-width: 768px) {
    .plans-container {
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      gap: 20px;
    }
  }
  
  .plan-section {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .plan-section {
      flex: 1;
      max-width: calc(33.33% - 14px);
    }
  }
  
  .plan-section-heading {
    text-align: center;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    height: 70px;
  }
  
  .plan-section-heading h3 {
    margin-bottom: 4px;
    display: inline-block;
    background: linear-gradient(90deg, #00F0FF, #22D46B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
  }
  
  .plan-section-heading p {
    opacity: 0.8;
  }
  
  .swiper {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .swiper-wrapper {
    align-items: stretch;
  }
  
  .swiper-slide {
    height: auto;
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }
  
  .plan-navigation-hint {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 20px;
  }
  
  .plan-navigation-hint svg {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.5;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(3px);
    }
    100% {
      opacity: 0.5;
      transform: translateX(0);
    }
  }
  
  .swiper-container {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    margin-top: 8px;
    display: flex;
    justify-content: center;
  }
`;

const Index = () => {
  // Swiper settings for plan sliders
  const planSliderSettings = {
    modules: [Pagination, Navigation, A11y],
    spaceBetween: 10,
    slidesPerView: 1,
    pagination: false,
    navigation: true,
    autoHeight: true,
    initialSlide: 0
  };

  return (
    <Layout>
      {/* Inject custom styles */}
      <style>{customStyles}</style>

      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden bg-gradient-to-b from-charcoal to-midnight">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#22D46B1A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 text-electric fade-in">
              Blazing-Fast & Secure VPS Hosting
            </h1>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-3">
                <Link to="/plans">Deploy Your Server Now</Link>
              </Button>
            </div>
            {/* Starting Price Point */}
            <p className="mt-6 text-sm text-white/70 fade-in" style={{ animationDelay: '0.6s' }}>
              Affordable Power: <Link to="/plans" className="font-semibold text-cyber hover:text-cyber/80 underline underline-offset-2">Plans starting from just $9.50/month.</Link>
            </p>
          </div>
        </div>
      </section>
      
      {/* MOVED & REVISED: Operating Systems Section */}
      <section className="py-8 bg-midnight">
        <div className="container">
          <h2 className="text-lg font-semibold font-montserrat text-center mb-6 text-white/80">
            Compatible with Your Favorite OS
          </h2>
          {/* Changed to flex layout for horizontal row */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 max-w-5xl mx-auto">
            {[
              { name: 'Debian', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg' },
              { name: 'CentOS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/centos/centos-original.svg' },
              { name: 'Rocky Linux', logo: 'https://rockylinux.org/images/rocky-linux-logo-square.svg' },
              { name: 'AlmaLinux', logo: 'https://almalinux.org/images/logo.svg' },
              { name: 'Ubuntu', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg' },
              { name: 'Fedora', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fedora/fedora-original.svg' },
              { name: 'FreeBSD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/freebsd/freebsd-original.svg' },
              { name: 'Alpine Linux', logo: 'https://alpinelinux.org/alpinelinux-logo.svg' },
              { name: 'Windows', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
            ].map((os, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-center transition-opacity duration-300 hover:opacity-80"
              >
                <img 
                  src={os.logo}
                  alt={`${os.name} logo`}
                  className="h-5 w-auto flex-shrink-0" 
                  style={{ filter: 'brightness(0) invert(1)' }} // Makes all logos white
                /> 
                <span className="text-white/80 text-sm font-medium whitespace-nowrap">{os.name}</span>
              </div>
            ))}
          </div>
           {/* Optional: Kept helper text, slightly adjusted */}
           <p className="text-center text-white/60 mt-6 text-xs">
            More options available during configuration. Windows licenses may incur additional costs.
          </p>
        </div>
      </section>
      
      {/* 2. Trust/Client Logo Bar */}
      <section className="py-8 bg-midnight">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16 max-w-5xl mx-auto">
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
             {/* Placeholder: User Trust Metric */}
             <div className="flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors">
               {/* Example Icon (replace if actual data available) */}
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyber" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
               <span className="font-montserrat text-sm uppercase tracking-wider">Trusted by 5,000+ Users</span> 
            </div>
          </div>
        </div>
      </section>
      
      {/* 3. Key Differentiators/Why Us? */}
      <section className="bg-charcoal py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-10 text-white">
            Experience the StealthRDP Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Performance -> Benefit */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Zap className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Blazing-Fast Speed</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Boost your applications with NVMe SSDs and high-performance CPUs for minimal latency.
              </p>
                </div>
            {/* Feature 2: Security -> Benefit */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <ShieldCheck className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Bulletproof Security</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Stay protected with robust DDoS mitigation and a secure network infrastructure.
              </p>
            </div>
            {/* Feature 3: Deployment -> Benefit */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Clock className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Get Started Instantly</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Launch your server in minutes. No waiting, just immediate access after checkout.
              </p>
            </div>
            {/* Feature 4: Support -> Benefit */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Users className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Reliable 24/7 Support</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our expert team is always available via ticket or chat to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEW SECTION: Use Cases */}
      <section className="bg-charcoal py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-10 text-white">
            Unlock Your Potential: What Can You Do?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Remote Desktop - Refined */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Laptop className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Work Seamlessly, Anywhere</h3>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Access your full Windows desktop and applications securely from any device. Stay productive without being tied down.
              </p>
                </div>
            {/* Card 2: Web Hosting - Refined */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Server className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Power Your Online Presence</h3>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Host demanding websites, critical business applications, or databases with blazing NVMe speed and reliable uptime.
              </p>
              </div>
            {/* Card 3: Development - Refined */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Code className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Build & Test Securely</h3>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Spin up isolated, powerful environments for coding, testing, and deploying your next big idea, safely and efficiently.
              </p>
            </div>
            {/* Card 4: Specialized Software - Refined */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Bot className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Deploy Your Custom Apps</h3>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Run resource-intensive applications like trading bots or custom tools with the power and control you need.
              </p>
                </div>
            {/* NEW Card 5: Game Servers */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Gamepad2 className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Host Private Game Worlds</h3>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Create stable, low-latency servers for your favorite multiplayer games like Minecraft, Valheim, and more.
              </p>
            </div>
            {/* NEW Card 6: Automation */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Repeat className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Run Tasks 24/7</h3>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Automate workflows, run monitoring scripts, or operate bots continuously without using your own computer.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. VPS Plans Section - Redesigned as horizontal panes */}
      <section className="py-16 md:py-24 bg-midnight relative">
        <div className="plans-background"></div>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              Choose Your Perfect VPS Plan
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Select from our curated USA/EU plans or build your own custom configuration.
              All plans include DDoS protection and 24/7 support.
            </p>
          </div>
          
          {/* Horizontal Plans Container */}
          <div className="plans-container">
            
            {/* Section 1: USA Plans */}
            <div className="plan-section">
              <div className="plan-section-heading">
                <h3 className="text-2xl font-semibold font-montserrat mb-2">USA Location</h3>
                <p className="text-white/60 text-sm">High-performance servers in the USA</p>
              </div>
              
              <Swiper
                {...planSliderSettings}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                {usaPlans.map((plan, index) => (
                  <SwiperSlide key={`usa-${index}`}>
                    <div className={`bg-midnight border ${plan.popular ? 'popular-plan border-2' : 'border-white/10'} rounded-xl overflow-hidden card-hover plan-card`}>
                      {plan.popular && (
                        <div className="popular-badge">
                          POPULAR
                        </div>
                      )}
                      {index === 0 && (
                        <div className="starting-badge">
                          STARTING FROM
                        </div>
                      )}
                      
                      <div className="plan-card-content">
                        <h4 className="plan-name font-bold font-montserrat text-white">{plan.name}</h4>
                        <p className="plan-description">{plan.description}</p>
                        
                        <div className="plan-price-container">
                          <span className="plan-price">${plan.monthlyPrice.toFixed(2)}</span>
                          <span className="plan-period">/month</span>
                </div>
                        
                        <ul className="specs-list">
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.cpu}</span>
                          </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.ram}</span>
                  </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.storage}</span>
                  </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.bandwidth}</span>
                  </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">USA Location</span>
                  </li>
                </ul>
                      </div>
                      
                      <div className="plan-card-footer">
                        <Button asChild className={`buy-button ${plan.popular ? 'buy-button-primary' : 'buy-button-outline'}`}>
                          <a href={plan.purchaseUrl} target="_blank" rel="noopener noreferrer">
                            Buy Now!
                          </a>
                </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="plan-navigation-hint">
                <span>Swipe or use arrows to see more plans</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
            
            {/* Section 2: EU Plans */}
            <div className="plan-section">
              <div className="plan-section-heading">
                <h3 className="text-2xl font-semibold font-montserrat mb-2">EU Location</h3>
                <p className="text-white/60 text-sm">Security-focused servers in the Netherlands</p>
              </div>
              
              <Swiper
                {...planSliderSettings}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                {euPlans.map((plan, index) => (
                  <SwiperSlide key={`eu-${index}`}>
                    <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover plan-card">
                      {index === 0 && (
                        <div className="starting-badge">
                          STARTING FROM
                        </div>
                      )}
                      
                      <div className="plan-card-content">
                        <h4 className="plan-name font-bold font-montserrat text-white">{plan.name}</h4>
                        <p className="plan-description">{plan.description}</p>
                        
                        <div className="plan-price-container">
                          <span className="plan-price">€{plan.monthlyPrice.toFixed(2)}</span>
                          <span className="plan-period">/month</span>
                </div>
                        
                        <ul className="specs-list">
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.cpu}</span>
                  </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.ram}</span>
                  </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.storage}</span>
                  </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">{plan.specs.bandwidth}</span>
                  </li>
                          <li>
                            <Check className="h-4 w-4 check-icon" />
                            <span className="specs-text">Netherlands Location</span>
                  </li>
                </ul>
                      </div>
                      
                      <div className="plan-card-footer">
                        <Button asChild className="buy-button buy-button-outline">
                          <a href={plan.purchaseUrl} target="_blank" rel="noopener noreferrer">
                            Buy Now!
                          </a>
                </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="plan-navigation-hint">
                <span>Swipe or use arrows to see more plans</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
            
            {/* Section 3: Build Your Own - Static */}
            <div className="plan-section">
              <div className="plan-section-heading">
                <h3 className="text-2xl font-semibold font-montserrat mb-2">Custom VPS</h3>
                <p className="text-white/60 text-sm">Build your own configuration</p>
              </div>
              
              <div className="swiper-container">
                <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover plan-card">
                  <div className="plan-card-content">
                    <h4 className="plan-name font-bold font-montserrat text-white">Build Your Own VPS</h4>
                    <p className="plan-description">Tailor resources to your exact needs</p>
                    
                    <div className="plan-price-container">
                      <span className="plan-price">Custom</span>
                      <span className="plan-period">/price</span>
                </div>
                    
                    <ul className="specs-list">
                      <li>
                        <Check className="h-4 w-4 check-icon" />
                        <span className="specs-text">Choose CPU Cores</span>
                  </li>
                      <li>
                        <Check className="h-4 w-4 check-icon" />
                        <span className="specs-text">Select RAM Amount</span>
                  </li>
                      <li>
                        <Check className="h-4 w-4 check-icon" />
                        <span className="specs-text">Define SSD Storage Size</span>
                  </li>
                      <li>
                        <Check className="h-4 w-4 check-icon" />
                        <span className="specs-text">Select Operating System</span>
                  </li>
                      <li>
                        <Check className="h-4 w-4 check-icon" />
                        <span className="specs-text">Choose Your Location</span>
                  </li>
                </ul>
                  </div>
                  
                  <div className="plan-card-footer">
                    <Button asChild className="buy-button buy-button-custom">
                      <a href="https://stealthrdp.com/dash/index.php?rp=/store/build-your-own-rdp-vps" target="_blank" rel="noopener noreferrer">
                        Configure & Buy
                      </a>
                </Button>
                  </div>
                </div>
              </div>
              <div className="plan-navigation-hint" style={{visibility: 'hidden'}}>
                <span>Swipe or use arrows to see more plans</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
            
          </div>
          
          {/* "View All Plans" link */}
          <div className="text-center mt-10">
            <Link to="/plans" className="compare-link">
              Compare All Plans & Features
            </Link>
          </div>
        </div>
      </section>
      
      {/* Enhanced Detailed Features Section (from Features.tsx) */}
      <section className="py-12 md:py-16 bg-charcoal">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-10 text-white">
            Everything You Need for Peak Performance
              </h2>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Feature: High-Performance CPU -> Benefit */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Cpu className="h-8 w-8 text-cyber flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Powerful Processing</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Handle demanding workloads smoothly with dedicated high-performance CPU cores.
                </p>
                <Link to="/features#hardware" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
              </div>
            </div>

            {/* Feature: NVMe SSD Storage -> Benefit */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <HardDrive className="h-8 w-8 text-electric flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Ultra-Fast NVMe Storage</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Experience rapid load times and file access with cutting-edge NVMe SSD technology.
                </p>
                 <Link to="/features#hardware" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: Robust Network -> Benefit */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Globe className="h-8 w-8 text-cyber flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Unrestricted Network</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Enjoy high-speed 1Gbps connectivity and unlimited bandwidth without limitations.
                </p>
                 <Link to="/features#hardware" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: Advanced Security -> Benefit */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <ShieldCheck className="h-8 w-8 text-electric flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Stay Secure & Protected</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Benefit from multi-layered DDoS protection, clean IPs, and configurable firewalls.
                </p>
                 <Link to="/features#security" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: Full Control -> Benefit */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Settings className="h-8 w-8 text-cyber flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Complete Server Control</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Gain full root/admin access and manage your server easily via our intuitive control panel.
                </p>
                 <Link to="/features#management" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

            {/* Feature: OS Choice -> Benefit */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover">
              <Laptop className="h-8 w-8 text-electric flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-white mb-1">Choose Your Environment</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Select your preferred OS (Windows Server or Linux distros) during instant setup.
                </p>
                 <Link to="/features#management" className="text-electric/80 text-xs hover:text-electric font-medium mt-2 inline-block">Learn More →</Link>
             </div>
            </div>

          </div>

          {/* Add CTA for help/guidance */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-white mb-3">Not Sure Which Plan Fits?</h3>
            <p className="text-white/70 mb-5 max-w-lg mx-auto">Let our experts help you find the perfect solution for your needs.</p>
            <Button asChild variant="outline" className="border-electric text-electric hover:bg-electric/10">
              <a href="https://stealthrdp.com/dash/submitticket.php" target="_blank" rel="noopener noreferrer">Contact Support</a>
            </Button>
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
