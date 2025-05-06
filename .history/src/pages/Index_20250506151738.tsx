import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, Zap, ShieldCheck, Clock, Users, Code, Cpu, HardDrive, Globe, Settings, Laptop, Server, Bot, Gamepad2, Repeat, Disc, Monitor, Terminal, MoveRight } from 'lucide-react';

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

      {/* 1. Hero Section - Pattern Interrupt + Visual Anchoring */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-16 relative overflow-hidden bg-gradient-to-b from-charcoal to-midnight">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#22D46B1A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pattern Interrupt Statement */}
            <p className="text-cyber font-medium mb-3 bg-midnight/40 py-1 px-3 rounded-full inline-block">Most VPS providers are selling you outdated technology</p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 text-electric fade-in">
              <span className="relative inline-block">
                <span className="relative z-10">Deploy Your Server</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-cyber/20 -rotate-1"></span>
              </span>{" "}
              in 60 Seconds
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
              Get high-performance VPS hosting without the technical complexity. Enterprise-grade hardware, 99.9% uptime, and instant setup.
            </p>
            
            {/* Visual Social Proof Counter - Anchoring Effect */}
            <div className="bg-midnight/50 border border-electric/20 rounded-lg py-3 px-4 mb-6 inline-block">
              <p className="text-white/90 text-sm flex items-center">
                <span className="text-electric font-bold text-lg mr-2 font-mono tabular-nums">5,219</span> 
                <span>servers deployed by businesses like yours</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-3 relative overflow-hidden group">
                <Link to="/plans">
                  Deploy Your Server Now
                  <span className="absolute top-0 right-0 bg-white/20 w-8 h-full transform translate-x-[-120%] skew-x-[20deg] transition-transform group-hover:translate-x-[180%] duration-700"></span>
                </Link>
              </Button>
            </div>
            
            {/* Starting Price Point with Loss Aversion */}
            <p className="mt-6 text-sm text-white/70 fade-in flex items-center justify-center gap-1" style={{ animationDelay: '0.6s' }}>
              <span className="text-white/50">Starting at only</span> 
              <span className="font-mono text-cyber font-bold">$9.50/month</span>
              <span className="text-white/50 ml-1">·</span>
              <span className="text-white/70">No hidden fees</span>
              <span className="text-white/50 ml-1">·</span>
              <span className="text-white/70">Cancel anytime</span>
            </p>
          </div>
        </div>
      </section>
      
      {/* OS Compatibility Section - With Cognitive Fluency */}
      <section className="py-8 bg-midnight">
        <div className="container">
          {/* Two-column layout for better cognitive organization */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left side: OS icons */}
            <div className="md:w-1/2">
              <h2 className="text-lg font-semibold font-montserrat text-center md:text-left mb-6 text-white/80">
                Works with Your Operating System
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Debian', icon: <Server className="h-5 w-5 text-electric" strokeWidth={1.5} /> },
                  { name: 'CentOS', icon: <HardDrive className="h-5 w-5 text-cyber" strokeWidth={1.5} /> },
                  { name: 'Rocky Linux', icon: <Cpu className="h-5 w-5 text-electric" strokeWidth={1.5} /> },
                  { name: 'Ubuntu', icon: <Terminal className="h-5 w-5 text-electric" strokeWidth={1.5} /> },
                  { name: 'Fedora', icon: <Disc className="h-5 w-5 text-cyber" strokeWidth={1.5} /> },
                  { name: 'FreeBSD', icon: <Bot className="h-5 w-5 text-electric" strokeWidth={1.5} /> },
                  { name: 'Alpine Linux', icon: <Code className="h-5 w-5 text-cyber" strokeWidth={1.5} /> },
                  { name: 'AlmaLinux', icon: <Server className="h-5 w-5 text-cyber" strokeWidth={1.5} /> },
                  { name: 'Windows', icon: <Monitor className="h-5 w-5 text-electric" strokeWidth={1.5} /> },
                ].map((os, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center gap-2 p-3 bg-midnight/50 border border-white/5 rounded-md transition-all duration-300 hover:border-electric/20 hover:bg-midnight/80"
                  >
                    {os.icon}
                    <span className="text-white/70 text-xs font-medium">{os.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side: Key differentiators that lead to benefits */}
            <div className="md:w-1/2">
              <h2 className="text-lg font-semibold font-montserrat text-center md:text-left mb-6 text-white/80">
                Why Our Server Technology Is Different
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-midnight/50 border border-white/5 rounded-md">
                  <Zap className="h-5 w-5 text-electric flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">NVMe SSD Storage</h3>
                    <p className="text-xs text-white/60">6x faster than traditional SSDs. Your applications load instantly.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-midnight/50 border border-white/5 rounded-md">
                  <ShieldCheck className="h-5 w-5 text-cyber flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">Enterprise-Grade Security</h3>
                    <p className="text-xs text-white/60">DDoS protection and isolated VM instances for maximum privacy.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-midnight/50 border border-white/5 rounded-md">
                  <Globe className="h-5 w-5 text-electric flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">Global Network</h3>
                    <p className="text-xs text-white/60">Strategically located data centers with 1Gbps network speeds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Signals Section - Authority Principle */}
      <section className="py-8 bg-charcoal border-t border-b border-white/5">
        <div className="container">
          {/* Expert Endorsement - Authority Principle */}
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <div className="bg-midnight/70 rounded-xl p-5 border border-white/10">
              <div className="flex flex-col items-center">
                <img src="/images/tech-expert.png" alt="Tech Expert" className="w-16 h-16 rounded-full mb-3 border-2 border-electric" />
                <h3 className="text-lg text-white font-medium mb-2">Thomas Chen</h3>
                <p className="text-xs text-white/50 mb-3">Cloud Infrastructure Specialist | Former AWS Engineer</p>
                <p className="text-sm text-white/80 italic">
                  "StealthRDP's architecture delivers exceptional performance while maintaining security. Their NVMe implementation is among the best I've tested in the industry."
                </p>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators with Advanced Framing */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16 max-w-5xl mx-auto">
            {/* Trust Signal 1: Secure Payments */}
            <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <div className="p-1.5 rounded-full bg-midnight/80">
                <ShieldCheck size={18} className="text-cyber" />
              </div>
              <span className="font-montserrat text-sm uppercase tracking-wider">Secure Payments</span>
            </div>
            {/* Trust Signal 2: Uptime with Accuracy */}
            <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <div className="p-1.5 rounded-full bg-midnight/80">
                <Zap size={18} className="text-electric" />
              </div>
              <span className="font-montserrat text-sm uppercase tracking-wider">99.9% Uptime SLA</span>
            </div>
            {/* Trust Signal 3: Support with Response Time */}
            <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <div className="p-1.5 rounded-full bg-midnight/80">
                <Users size={18} className="text-cyber" />
              </div>
              <span className="font-montserrat text-sm uppercase tracking-wider">24/7 Support <span className="text-xs opacity-70">({"<"}2hr response)</span></span>
            </div>
             {/* Trust Signal 4: Instant Setup with Urgency */}
             <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <div className="p-1.5 rounded-full bg-midnight/80">
                <Clock size={18} className="text-electric" />
              </div>
              <span className="font-montserrat text-sm uppercase tracking-wider">Instant Setup <span className="text-xs text-cyber">Today</span></span>
            </div>
             {/* User Social Proof */}
             <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <div className="p-1.5 rounded-full bg-midnight/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] text-cyber" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="font-montserrat text-sm uppercase tracking-wider">Trusted by 5,000+ Users</span> 
            </div>
          </div>
          
          {/* Limited Time Offer Banner - Scarcity + Loss Aversion */}
          <div className="mt-8 p-3 bg-electric/10 rounded-md border border-electric/30 text-center max-w-xl mx-auto relative overflow-hidden">
            <span className="absolute top-0 left-0 bg-electric text-[10px] text-midnight font-bold py-0.5 px-2">LIMITED TIME</span>
            <p className="text-sm text-white/90 mt-2">
              <span className="text-electric font-medium">30% OFF ALL PLANS</span> - Ends in <span className="font-mono font-bold text-white inline-block min-w-[55px]">48:00:00</span> 
            </p>
            <p className="text-xs text-white/60 mt-1">Use code <span className="font-mono font-bold text-cyber">POWER30</span> at checkout</p>
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
      
      {/* Use Cases Section - Benefit-Focused */}
      <section className="bg-charcoal py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-6 text-white">
            Solve Real Problems With Your VPS
          </h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-10">
            Join thousands of customers who use StealthRDP to overcome common challenges and achieve business goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Remote Work - Problem/Solution Format */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Laptop className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Remote Work Freedom</h3>
              <p className="text-white/60 text-sm mb-3 italic">"I need a reliable workspace accessible from anywhere."</p>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Access your full desktop environment from any device with enterprise-grade security. No more being tied to a single location or worrying about device specs.
              </p>
            </div>
            {/* Card 2: Web Hosting - Problem/Solution Format */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Server className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Reliable Web Presence</h3>
              <p className="text-white/60 text-sm mb-3 italic">"My website keeps going down with my current host."</p>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Host websites and applications on infrastructure that stays up when you need it most. Say goodbye to embarrassing downtimes and slow-loading pages.
              </p>
            </div>
            {/* Card 3: Development - Problem/Solution Format */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Code className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Development Sandbox</h3>
              <p className="text-white/60 text-sm mb-3 italic">"I need isolated environments for testing without risking production."</p>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Create separate environments for development, staging, and testing that perfectly mirror your production setup, without the security concerns.
              </p>
            </div>
            {/* Card 4: Specialized Software - Problem/Solution Format */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Bot className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Resource-Intensive Apps</h3>
              <p className="text-white/60 text-sm mb-3 italic">"My local machine can't handle the processing power I need."</p>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Run resource-hungry applications, AI tools, or data processing without hardware limitations or upgrading your device.
              </p>
            </div>
            {/* Card 5: Game Servers - Problem/Solution Format */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Gamepad2 className="h-10 w-10 text-electric mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Private Gaming Realm</h3>
              <p className="text-white/60 text-sm mb-3 italic">"I want a dedicated server for my friends without the technical hassle."</p>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Host multiplayer games with low latency and complete control. No more relying on third-party servers with limited customization options.
              </p>
            </div>
            {/* Card 6: Automation - Problem/Solution Format */}
            <div className="text-center p-6 rounded-lg bg-midnight/50 border border-white/10 card-hover flex flex-col">
              <Repeat className="h-10 w-10 text-cyber mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold font-montserrat text-white mb-2">Always-On Automation</h3>
              <p className="text-white/60 text-sm mb-3 italic">"I need scripts running 24/7 without keeping my computer on."</p>
              <p className="text-white/70 text-sm leading-relaxed flex-grow">
                Set up automated tasks, bots, or monitoring systems that run continuously without requiring your personal device to stay powered on.
              </p>
            </div>
          </div>
          {/* Social Validation - Cognitive Bias Reinforcement */}
          <div className="mt-12 text-center">
            <p className="text-white/60 text-sm">Join 5,000+ customers who've found their perfect VPS solution with us</p>
          </div>
        </div>
      </section>
      
      {/* Optimized VPS Plans Section - Reduces Choice Paralysis */}
      <section className="py-16 md:py-24 bg-midnight relative">
        <div className="plans-background"></div>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-electric/10 text-electric text-sm font-medium mb-4">Flexible Plans For Every Need</span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              Choose Your Perfect Server
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              All plans include free migration, 24/7 support, and industry-leading DDoS protection.
            </p>
          </div>
          
          {/* Featured Plans - Simplified Choice Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Plan 1: Most Economical */}
            <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-montserrat text-white mb-1">Bronze</h3>
                  <p className="text-white/60 text-sm">Perfect for personal projects</p>
                </div>
                
                <div className="flex items-baseline mb-5">
                  <span className="text-3xl font-bold text-white">$9.50</span>
                  <span className="text-white/60 ml-2 text-sm">/month</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">2 CPU Cores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">4 GB RAM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">60 GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Unlimited Bandwidth</span>
                  </li>
                </ul>
                
                {/* Billing Toggle - Presents Value Opportunity */}
                <div className="bg-charcoal/50 rounded-md p-3 mb-5">
                  <p className="text-white/70 text-xs mb-2">Choose billing cycle & save:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-midnight border border-electric/20 rounded p-2 text-center cursor-pointer">
                      <p className="text-white/90 text-xs">Monthly</p>
                    </div>
                    <div className="bg-electric/10 border border-electric rounded p-2 text-center cursor-pointer">
                      <p className="text-white text-xs">Annual <span className="text-cyber font-bold">-20%</span></p>
                    </div>
                  </div>
                </div>
                
                <Button asChild className="w-full py-3 bg-transparent hover:bg-electric/10 text-electric border border-electric transition-all">
                  <a href="https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=monthly" target="_blank" rel="noopener noreferrer">
                    Deploy Now
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Plan 2: Most Popular - Visual Emphasis */}
            <div className="bg-midnight border-2 border-electric rounded-xl overflow-hidden card-hover transform transition-all duration-300 hover:translate-y-[-8px] relative">
              <div className="absolute top-0 right-0 bg-electric text-midnight text-xs font-bold py-1 px-3 rounded-bl-md">
                MOST POPULAR
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-montserrat text-white mb-1">Silver</h3>
                  <p className="text-white/60 text-sm">Ideal for most applications</p>
                </div>
                
                <div className="flex items-baseline mb-5">
                  <span className="text-3xl font-bold text-white">$18.04</span>
                  <span className="text-white/60 ml-2 text-sm">/month</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">2 CPU Cores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">8 GB RAM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">80 GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Unlimited Bandwidth</span>
                  </li>
                </ul>
                
                {/* Billing Toggle - Presents Value Opportunity */}
                <div className="bg-charcoal/50 rounded-md p-3 mb-5">
                  <p className="text-white/70 text-xs mb-2">Choose billing cycle & save:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-midnight border border-electric/20 rounded p-2 text-center cursor-pointer">
                      <p className="text-white/90 text-xs">Monthly</p>
                    </div>
                    <div className="bg-electric/10 border border-electric rounded p-2 text-center cursor-pointer">
                      <p className="text-white text-xs">Annual <span className="text-cyber font-bold">-20%</span></p>
                    </div>
                  </div>
                </div>
                
                <Button asChild className="w-full py-3 bg-electric hover:bg-electric/90 text-midnight transition-all">
                  <a href="https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=monthly" target="_blank" rel="noopener noreferrer">
                    Deploy Now
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Plan 3: Custom Plan */}
            <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-montserrat text-white mb-1">Custom</h3>
                  <p className="text-white/60 text-sm">Tailor to your exact needs</p>
                </div>
                
                <div className="flex items-baseline mb-5">
                  <span className="text-3xl font-bold text-white">Custom</span>
                  <span className="text-white/60 ml-2 text-sm">/pricing</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Choose CPU Cores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Select RAM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Define Storage Size</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Choose Location (USA/EU)</span>
                  </li>
                </ul>
                
                {/* No billing toggle for custom plan */}
                <div className="h-[81px]"></div>
                
                <Button asChild className="w-full py-3 bg-cyber hover:bg-cyber/90 text-midnight transition-all">
                  <a href="https://stealthrdp.com/dash/index.php?rp=/store/build-your-own-rdp-vps" target="_blank" rel="noopener noreferrer">
                    Configure & Buy
                  </a>
                </Button>
              </div>
            </div>
            
          </div>
          
          {/* Social Proof + Full Comparison Link */}
          <div className="text-center mt-10">
            <Link to="/plans" className="inline-flex items-center gap-2 text-electric hover:text-cyber transition-colors">
              <span>Compare All Plans & Features</span>
              <MoveRight size={16} />
            </Link>
            
            {/* Added Money-Back Guarantee - Risk Reversal */}
            <p className="text-white/60 text-sm mt-8 flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-cyber" />
              <span>7-Day Money-Back Guarantee on all plans</span>
            </p>
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
      
      {/* Final Call to Action - Enhanced with Scarcity and FOMO */}
      <section className="py-12 md:py-16 bg-gradient-to-t from-charcoal to-midnight">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-electric">
              Stop Worrying About Your Server
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
              Join 5,000+ customers who switched to StealthRDP and never looked back. Deploy in 60 seconds and experience the difference.
            </p>
            
            {/* Benefit Bullets - Reinforcement */}
            <div className="flex flex-col items-center mb-8">
              <ul className="text-left space-y-2 inline-block">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                  <span className="text-white/80">Deploy in less than 60 seconds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                  <span className="text-white/80">No technical experience required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cyber flex-shrink-0" />
                  <span className="text-white/80">7-day money-back guarantee</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-3">
                <Link to="/plans">Deploy Your Server Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-electric text-electric hover:bg-electric/10 text-base px-8 py-3">
                <a href="https://stealthrdp.com/dash/submitticket.php" target="_blank" rel="noopener noreferrer">Get Help Choosing</a>
              </Button>
            </div>
            
            {/* Recent Activity - Social Proof Implementation */}
            <div className="mt-10 flex justify-center">
              <div className="bg-midnight/50 border border-white/10 rounded-lg py-2 px-4 flex items-center gap-2 max-w-md">
                <div className="bg-electric/20 p-1 rounded-full">
                  <Zap size={14} className="text-electric" />
                </div>
                <p className="text-white/70 text-xs">
                  <span className="text-white font-medium">43 new servers</span> deployed in the last 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
