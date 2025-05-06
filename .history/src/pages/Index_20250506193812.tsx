import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, Zap, ShieldCheck, Clock, Users, Code, Cpu, HardDrive, Globe, Settings, Laptop, Server, Bot, Gamepad2, Repeat, Disc, Monitor, Terminal, MoveRight, X } from 'lucide-react';

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
  // Add billing period state
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const discountRates = {
    monthly: 1,
    quarterly: 0.9, // 10% discount
    annual: 0.8,    // 20% discount
    biannual: 0.7   // 30% discount
  };
  
  // Function to calculate discounted price
  const getDiscountedPrice = (basePrice, period) => {
    return (basePrice * discountRates[period]).toFixed(2);
  };
  
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
  
  // Add countdown timer state
  const [countdown, setCountdown] = useState("48:00:00");
  
  // Add countdown timer effect
  useEffect(() => {
    // Set the date we're counting down to (3 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 3);
    
    // Update the count down every 1 second
    const timer = setInterval(() => {
      // Get current date and time
      const now = new Date().getTime();
      
      // Find the distance between now and the count down date
      const distance = countDownDate.getTime() - now;
      
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Format the time with leading zeros
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      
      // Display the result
      if (days > 0) {
        setCountdown(`${days}d ${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      } else {
        setCountdown(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      }
      
      // If the count down is finished, clear interval
      if (distance < 0) {
        clearInterval(timer);
        setCountdown("EXPIRED");
      }
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Handle billing period change
  const handleBillingPeriodChange = (period) => {
    setBillingPeriod(period);
  };

  // Add calculateSavings function
  const calculateSavings = () => {
    // Get input values
    const currentCostElement = document.getElementById('current-cost') as HTMLInputElement;
    const managementHoursElement = document.getElementById('management-hours') as HTMLInputElement;
    const hourlyRateElement = document.getElementById('hourly-rate') as HTMLInputElement;

    const currentCost = parseFloat(currentCostElement?.value || '0');
    const managementHours = parseFloat(managementHoursElement?.value || '0');
    const hourlyRate = parseFloat(hourlyRateElement?.value || '0');
    
    // Calculate savings
    const stealthRDPCost = currentCost > 50 ? currentCost * 0.65 : 9.50; // Estimated cost with StealthRDP (35% savings or minimum plan)
    const hostingSavings = currentCost - stealthRDPCost;
    const timeSavings = (managementHours * 0.7) * hourlyRate; // Assume 70% time savings
    
    // Calculate total annual savings
    const totalMonthlySavings = hostingSavings + timeSavings;
    const totalAnnualSavings = totalMonthlySavings * 12;
    
    // Update results
    const hostingSavingsElement = document.getElementById('hosting-savings');
    const timeSavingsElement = document.getElementById('time-savings');
    const totalSavingsElement = document.getElementById('total-savings');
    
    if (hostingSavingsElement) hostingSavingsElement.textContent = '$' + hostingSavings.toFixed(2);
    if (timeSavingsElement) timeSavingsElement.textContent = '$' + timeSavings.toFixed(2);
    if (totalSavingsElement) totalSavingsElement.textContent = '$' + totalAnnualSavings.toFixed(2);
    
    // Show recommended plan
    const recommendedPlanDiv = document.getElementById('recommended-plan');
    const planNameElement = document.getElementById('plan-name');
    
    if (planNameElement) {
      if (currentCost < 15) {
        planNameElement.textContent = 'Bronze Plan';
      } else if (currentCost < 30) {
        planNameElement.textContent = 'Silver Plan';
      } else {
        planNameElement.textContent = 'Gold Plan';
      }
    }
    
    if (recommendedPlanDiv) recommendedPlanDiv.classList.remove('hidden');
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
                <span className="text-electric font-bold text-lg mr-2 font-mono tabular-nums">25000+</span> 
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
              <span className="font-montserrat text-sm uppercase tracking-wider">Trusted by 10,877+ Users</span> 
            </div>
          </div>
          
          {/* Limited Time Offer Banner - Scarcity + Loss Aversion */}
          <div className="mt-8 p-3 bg-electric/10 rounded-md border border-electric/30 text-center max-w-xl mx-auto relative overflow-hidden">
            <span className="absolute top-0 left-0 bg-electric text-[10px] text-midnight font-bold py-0.5 px-2">LIMITED TIME</span>
            <p className="text-sm text-white/90 mt-2">
              <span className="text-electric font-medium">UP TO 30% OFF</span> based on plan duration <span className="text-cyber">+ EXTRA 5% OFF</span> on annual plans - Ends in <span className="font-mono font-bold text-white inline-block min-w-[55px]">{countdown}</span> 
            </p>
            <p className="text-xs text-white/60 mt-1">Use code <span className="font-mono font-bold text-cyber">POWER30</span> at checkout</p>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section - Problem Agitation & Resolution Framework */}
      <section className="bg-charcoal py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-electric/10 text-electric text-sm font-medium mb-4">What Our Customers Solve</span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-4">
              Stop Struggling with These Common Server Problems
          </h2>
            <p className="text-white/70">
              Our customers come to us when they're frustrated with traditional hosting limitations.
              Here's how we help them overcome these challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Remote Work - Before/After Framework */}
            <div className="bg-midnight/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Before - Problem State */}
              <div className="p-5 border-b border-white/10 bg-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2} />
                </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">Before StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "I'm tied to my office computer and can't access my work when traveling or at home."
                    </p>
              </div>
                </div>
              </div>
              {/* After - Solution State */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <Check className="h-4 w-4 text-cyber" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">With StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "I can access my full desktop environment from any device, anywhere, with all my files and applications."
                    </p>
                    <div className="mt-4 flex items-center">
                      <Laptop className="h-6 w-6 text-electric" strokeWidth={1.5} />
                      <span className="ml-2 text-xs text-white/80 font-medium">Remote Work Freedom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 2: Hosting - Before/After Framework */}
            <div className="bg-midnight/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Before - Problem State */}
              <div className="p-5 border-b border-white/10 bg-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2} />
                </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">Before StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "My website keeps going down during traffic spikes and my support tickets go unanswered."
                    </p>
              </div>
                </div>
              </div>
              {/* After - Solution State */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <Check className="h-4 w-4 text-cyber" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">With StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "My website stays up even during heavy traffic, and support responds within 2 hours when I need help."
                    </p>
                    <div className="mt-4 flex items-center">
                      <Server className="h-6 w-6 text-electric" strokeWidth={1.5} />
                      <span className="ml-2 text-xs text-white/80 font-medium">Reliable Web Hosting</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 3: Developer - Before/After Framework */}
            <div className="bg-midnight/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Before - Problem State */}
              <div className="p-5 border-b border-white/10 bg-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2} />
                  </div>
            <div>
                    <h3 className="text-white/90 font-medium mb-2">Before StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "My local development environment doesn't match production and causes deployment issues."
                    </p>
                </div>
                </div>
              </div>
              {/* After - Solution State */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <Check className="h-4 w-4 text-cyber" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">With StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "I have identical dev, staging, and prod environments that ensure smooth deployments every time."
                </p>
                    <div className="mt-4 flex items-center">
                      <Code className="h-6 w-6 text-electric" strokeWidth={1.5} />
                      <span className="ml-2 text-xs text-white/80 font-medium">Development Sandbox</span>
              </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* View More Button for Mobile - Progressive Disclosure */}
            <div className="lg:hidden col-span-full mt-4 text-center">
              <Button variant="outline" className="border-electric text-electric hover:bg-electric/10">
                View More Use Cases
              </Button>
            </div>
            
            {/* Additional Cards for Desktop Only */}
            <div className="hidden lg:block bg-midnight/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Before - Problem State */}
              <div className="p-5 border-b border-white/10 bg-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">Before StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "Processing our data analytics takes forever on my workstation and interrupts my other tasks."
                    </p>
                  </div>
                </div>
              </div>
              {/* After - Solution State */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <Check className="h-4 w-4 text-cyber" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">With StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "Our data processing runs on a VPS server while I work uninterrupted on my local machine."
                    </p>
                    <div className="mt-4 flex items-center">
                      <Bot className="h-6 w-6 text-electric" strokeWidth={1.5} />
                      <span className="ml-2 text-xs text-white/80 font-medium">Data Analytics Platform</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block bg-midnight/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Before - Problem State */}
              <div className="p-5 border-b border-white/10 bg-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">Before StealthRDP</h3>
                    </p>
                    <div className="mt-4 flex items-center">
                      <Server className="h-6 w-6 text-electric" strokeWidth={1.5} />
                      <span className="ml-2 text-xs text-white/80 font-medium">Secure Data Storage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block bg-midnight/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Before - Problem State */}
              <div className="p-5 border-b border-white/10 bg-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">Before StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "My automation scripts only run when my laptop is on, and they're unreliable."
                    </p>
                  </div>
                </div>
              </div>
              {/* After - Solution State */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <Check className="h-4 w-4 text-cyber" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">With StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "My scripts run 24/7 regardless of my device status, with perfect reliability and uptime."
                    </p>
                    <div className="mt-4 flex items-center">
                      <Repeat className="h-6 w-6 text-electric" strokeWidth={1.5} />
                      <span className="ml-2 text-xs text-white/80 font-medium">Always-On Automation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block bg-midnight/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Before - Problem State */}
              <div className="p-5 border-b border-white/10 bg-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-midnight/80 mt-1">
                    <X className="h-4 w-4 text-red-500" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium mb-2">Before StealthRDP</h3>
                    <p className="text-white/60 text-sm">
                      "My computer freezes when running resource-intensive applications like 3D rendering."
                    </p>
                  </div>
                </div>
              </div>
                <div className="bg-midnight border border-electric text-center py-2 px-2 rounded cursor-pointer">
                  <p className="text-white text-xs font-medium">Monthly</p>
                </div>
                <div className="text-center py-2 px-2 rounded cursor-pointer hover:bg-midnight/50 transition-colors">
                  <p className="text-white/70 text-xs">Quarterly <span className="text-cyber text-[10px]">-10%</span></p>
                </div>
                <div className="text-center py-2 px-2 rounded cursor-pointer hover:bg-midnight/50 transition-colors">
                  <p className="text-white/70 text-xs">Annual <span className="text-cyber text-[10px]">-20%</span></p>
                </div>
                <div className="text-center py-2 px-2 rounded cursor-pointer hover:bg-midnight/50 transition-colors bg-midnight/20 border border-electric/10">
                  <p className="text-white/70 text-xs">Biannual <span className="text-cyber text-[10px]">-30%</span></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing Cards - Price Anchoring and Decoy Effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Plan 1: Starter - Decoy */}
            <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-montserrat text-white mb-1">Bronze</h3>
                  <p className="text-white/60 text-sm">Personal projects & light workloads</p>
                </div>
                
                <div className="flex items-baseline mb-5">
                  <span className="text-3xl font-bold text-white">${getDiscountedPrice(9.50, billingPeriod)}</span>
                  <span className="text-white/60 ml-2 text-sm">
                    /{billingPeriod === 'monthly' ? 'month' : 
                      billingPeriod === 'quarterly' ? 'quarter' : 
                      billingPeriod === 'annual' ? 'year' : '2 years'}
                  </span>
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
                  <li className="flex items-start opacity-50">
                    <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Performance Boost</span>
                  </li>
                </ul>
                
                <Button asChild className="w-full py-3 bg-transparent hover:bg-electric/10 text-electric border border-electric transition-all">
                  <a 
                    href={`https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=${billingPeriod}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Deploy Now
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Plan 2: Value Champion - Target Plan - The Decoy Effect uses this as the intended choice */}
            <div className="bg-midnight border-2 border-electric rounded-xl overflow-hidden card-hover transform transition-all duration-300 hover:translate-y-[-8px] relative md:scale-105 z-10 shadow-lg shadow-electric/20">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-40 bg-electric text-midnight text-xs font-bold py-1 px-3 rounded-full text-center">
                MOST POPULAR
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-montserrat text-white mb-1">Silver</h3>
                  <p className="text-white/60 text-sm">Professional applications & multitasking</p>
                </div>
                
                <div className="flex items-baseline mb-5">
                  <span className="text-3xl font-bold text-white">${getDiscountedPrice(18.04, billingPeriod)}</span>
                  <span className="text-white/60 ml-2 text-sm">
                    /{billingPeriod === 'monthly' ? 'month' : 
                      billingPeriod === 'quarterly' ? 'quarter' : 
                      billingPeriod === 'annual' ? 'year' : '2 years'}
                  </span>
                  <span className="ml-2 text-xs text-cyber bg-cyber/10 px-1.5 py-0.5 rounded">Best Value</span>
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
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Performance Boost</span>
                  </li>
                </ul>
                
                {/* Loss Aversion */}
                <div className="bg-electric/5 border border-electric/20 rounded-md py-2 px-3 mb-5">
                  <p className="text-white/80 text-xs flex items-center">
                    <Clock className="h-3.5 w-3.5 text-electric mr-1.5" />
                    <span>Deploy in 60 seconds + <span className="text-electric font-medium">FREE migration</span></span>
                  </p>
                </div>
                
                <Button asChild className="w-full py-3 bg-electric hover:bg-electric/90 text-midnight transition-all font-bold">
                  <a 
                    href={`https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=${billingPeriod}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Deploy Now
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Plan 3: Customizable */}
            <div className="bg-midnight border border-white/10 rounded-xl overflow-hidden card-hover transform transition-all duration-300 hover:translate-y-[-8px]">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-montserrat text-white mb-1">Custom</h3>
                  <p className="text-white/60 text-sm">Enterprise & specialized workloads</p>
                </div>
                
                <div className="flex items-baseline mb-5">
                  <span className="text-2xl font-bold text-white">Custom</span>
                  <span className="text-white/60 ml-2 text-sm">pricing</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Custom CPU Cores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Custom RAM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Custom Storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Unlimited Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Premium Support</span>
                  </li>
                </ul>
                
                <Button asChild className="w-full py-3 bg-cyber hover:bg-cyber/90 text-midnight transition-all">
                  <a href="https://stealthrdp.com/dash/index.php?rp=/store/build-your-own-rdp-vps" target="_blank" rel="noopener noreferrer">
                    Configure & Deploy
                  </a>
                </Button>
              </div>
            </div>
            
          </div>
          
          {/* Social Proof + Risk Reversal */}
          <div className="flex flex-col items-center mt-10 gap-5">
            <Link to="/plans" className="inline-flex items-center gap-2 text-electric hover:text-cyber transition-colors">
              <span>View All 11 Plans & Features</span>
              <MoveRight size={16} />
            </Link>
            
            {/* Added Money-Back Guarantee - Risk Reversal */}
            <div className="bg-electric/5 border border-electric/10 rounded-lg py-3 px-6 flex items-center gap-3">
              <ShieldCheck size={18} className="text-cyber" />
              <div className="flex flex-col">
                <p className="text-white text-sm font-medium">Secure Checkout Protection</p>
                <p className="text-white/60 text-xs">SSL encrypted payment processing, your data is safe with us</p>
              </div>
            </div>
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
      
      {/* Final Call to Action - ZipTap Method */}
      <section className="py-16 md:py-20 bg-gradient-to-t from-charcoal to-midnight relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#00F0FF1A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Two-column layout for better CTA hierarchy */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              {/* Left column: Conversion content */}
              <div className="lg:col-span-3">
                <span className="inline-block px-3 py-1 rounded-full bg-electric/10 text-electric text-xs font-medium mb-4">JOIN 10,877+ SERVER OWNERS</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4 text-white leading-tight">
                  Ready to Stop <span className="text-electric relative">Wasting Time<span className="absolute bottom-1 left-0 w-full h-2 bg-cyber/20 -rotate-1"></span></span> on Server Management?
                </h2>
                
                <p className="text-white/80 text-lg mb-8 max-w-xl">
                  Deploy your high-performance VPS in the next 60 seconds and focus on what matters — your actual work.
                </p>

                {/* ZipTap Bullets - Zero Risk, Instant, Proof points */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-cyber/20 mt-1">
                      <ShieldCheck className="h-4 w-4 text-cyber" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Secure Transactions</h3>
                      <p className="text-white/60 text-sm">Bank-level encryption keeps your payment information protected.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-electric/20 mt-1">
                      <Clock className="h-4 w-4 text-electric" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Instant Deployment</h3>
                      <p className="text-white/60 text-sm">Full server access within 60 seconds of purchase. No waiting.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-cyber/20 mt-1">
                      <Users className="h-4 w-4 text-cyber" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Expert Support</h3>
                      <p className="text-white/60 text-sm">24/7 technical assistance with average response under 2 hours.</p>
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button asChild size="lg" className="bg-cyber text-midnight hover:bg-cyber/90 font-bold uppercase text-base px-8 py-3.5">
                    <Link to="/plans">Deploy Your Server Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-electric text-electric hover:bg-electric/10 text-base">
                    <a href="https://stealthrdp.com/dash/submitticket.php" target="_blank" rel="noopener noreferrer">Ask a Pre-Sales Question</a>
                  </Button>
                </div>
                
                {/* Price anchor + Scarcity */}
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <span>Starting at just</span>
                  <span className="text-cyber font-mono font-bold">$9.50/month</span>
                  <span className="text-white/40">·</span>
                  <span>Cancel anytime</span>
                </p>
              </div>
              
              {/* Right column: Authority + Testimonial */}
              <div className="lg:col-span-2 bg-midnight/50 rounded-xl p-6 border border-white/10">
                {/* Expert testimonial - Authority */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/images/customer-avatar.png" alt="Enterprise Customer" className="w-12 h-12 rounded-full border-2 border-electric" />
                    <div>
                      <h4 className="text-white font-medium">Michael Robertson</h4>
                      <p className="text-white/50 text-xs">CTO at TechFlow Solutions</p>
                    </div>
                  </div>
                  <blockquote className="text-white/80 text-sm italic mb-4">
                    "We migrated our entire development infrastructure to StealthRDP and reduced our hosting costs by 40% while improving performance. The migration was seamless, and we've had zero downtime in 8 months."
                  </blockquote>
                  
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyber" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                {/* Recent activity feed - Social Proof */}
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-white/90 text-xs uppercase tracking-wider mb-3">Recent Customer Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-electric/10 rounded-full flex items-center justify-center">
                        <Server className="h-4 w-4 text-electric" strokeWidth={1.5} />
                      </div>
                      <p className="text-white/70 text-xs">Ryan S. deployed a Silver plan <span className="text-white/40">3 minutes ago</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyber/10 rounded-full flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-cyber" strokeWidth={1.5} />
                      </div>
                      <p className="text-white/70 text-xs">Jamie T. renewed for 12 months <span className="text-white/40">17 minutes ago</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-electric/10 rounded-full flex items-center justify-center">
                        <Server className="h-4 w-4 text-electric" strokeWidth={1.5} />
                      </div>
                      <p className="text-white/70 text-xs">Alex M. deployed a Custom plan <span className="text-white/40">25 minutes ago</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator - Keep the JSX but remove the script tag */}
      <section className="py-12 md:py-16 bg-midnight">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-1 rounded-full bg-electric/10 text-electric text-sm font-medium mb-4">CALCULATE YOUR SAVINGS</span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              See How Much You Could Save
            </h2>
            <p className="text-white/80">
              Compare your current server costs with StealthRDP and discover your potential savings.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-charcoal/50 rounded-xl p-6 md:p-8 border border-white/10">
            {/* Calculator Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs Column */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Your Current Setup</h3>
                
                {/* Current Monthly Cost */}
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium block">Current Monthly Hosting Cost ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
                    <input 
                      type="number" 
                      className="w-full px-8 py-2.5 bg-midnight border border-white/20 rounded-md text-white focus:border-electric focus:outline-none"
                      placeholder="e.g. 50"
                      id="current-cost"
                    />
                  </div>
                </div>
                
                {/* Server Management Hours */}
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium block">Hours Spent on Server Management (Monthly)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2.5 bg-midnight border border-white/20 rounded-md text-white focus:border-electric focus:outline-none"
                    placeholder="e.g. 10"
                    id="management-hours"
                  />
                </div>
                
                {/* Hourly Rate */}
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium block">Your Hourly Rate ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
                    <input 
                      type="number" 
                      className="w-full px-8 py-2.5 bg-midnight border border-white/20 rounded-md text-white focus:border-electric focus:outline-none"
                      placeholder="e.g. 25"
                      id="hourly-rate"
                    />
                  </div>
                </div>
                
                {/* Calculate Button */}
                <Button 
                  className="w-full mt-4 bg-cyber text-midnight hover:bg-cyber/90 font-bold" 
                  onClick={calculateSavings}
                >
                  Calculate My Savings
                </Button>
              </div>
              
              {/* Results Column */}
              <div className="bg-midnight/50 rounded-lg p-6 border border-white/10 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Your Potential Savings</h3>
                
                <div className="space-y-6">
                  {/* Monthly Hosting Savings */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Monthly Hosting Savings:</span>
                    <span className="text-white font-mono text-xl font-bold" id="hosting-savings">$0.00</span>
                  </div>
                  
                  {/* Time Savings */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Time Value Savings:</span>
                    <span className="text-white font-mono text-xl font-bold" id="time-savings">$0.00</span>
                  </div>
                  
                  {/* Divider */}
                  <div className="border-t border-white/10 my-2 py-2"></div>
                  
                  {/* Total Annual Savings */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 font-medium">Total Annual Savings:</span>
                    <span className="text-electric font-mono text-2xl font-bold" id="total-savings">$0.00</span>
                  </div>
                  
                  {/* StealthRDP Suggested Plan */}
                  <div className="mt-4 bg-electric/10 rounded-md p-3 border border-electric/20 hidden" id="recommended-plan">
                    <p className="text-white text-sm font-medium">Recommended Plan:</p>
                    <p className="text-electric text-lg font-bold" id="plan-name">Silver Plan</p>
                    <Link to="/plans" className="text-xs text-white/70 underline mt-1 inline-block">View plan details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial about savings */}
          <div className="mt-10 max-w-2xl mx-auto text-center">
            <p className="text-white/70 italic text-sm">
              "We switched to StealthRDP and saved over $3,000 annually compared to our previous dedicated server setup. The performance is better and we spend way less time on maintenance."
            </p>
            <p className="text-white font-medium mt-2">— David Chen, CTO at DataTech Systems</p>
          </div>
        </div>
      </section>

      {/* Pricing Toggle - Price Anchoring */}
      <div className="max-w-lg mx-auto mb-10">
        <div className="bg-charcoal/50 rounded-lg p-2 flex items-center">
          <div className="grid grid-cols-4 gap-2 w-full">
            <div 
              className={`${billingPeriod === 'monthly' ? 'bg-midnight border border-electric' : ''} text-center py-2 px-2 rounded cursor-pointer hover:bg-midnight/50 transition-colors`}
              onClick={() => handleBillingPeriodChange('monthly')}
            >
              <p className={`${billingPeriod === 'monthly' ? 'text-white' : 'text-white/70'} text-xs font-medium`}>Monthly</p>
            </div>
            <div 
              className={`${billingPeriod === 'quarterly' ? 'bg-midnight border border-electric' : ''} text-center py-2 px-2 rounded cursor-pointer hover:bg-midnight/50 transition-colors`}
              onClick={() => handleBillingPeriodChange('quarterly')}
            >
              <p className={`${billingPeriod === 'quarterly' ? 'text-white' : 'text-white/70'} text-xs`}>Quarterly <span className="text-cyber text-[10px]">-10%</span></p>
            </div>
            <div 
              className={`${billingPeriod === 'annual' ? 'bg-midnight border border-electric' : ''} text-center py-2 px-2 rounded cursor-pointer hover:bg-midnight/50 transition-colors`}
              onClick={() => handleBillingPeriodChange('annual')}
            >
              <p className={`${billingPeriod === 'annual' ? 'text-white' : 'text-white/70'} text-xs`}>Annual <span className="text-cyber text-[10px]">-20%</span></p>
            </div>
            <div 
              className={`${billingPeriod === 'biannual' ? 'bg-midnight border border-electric' : ''} text-center py-2 px-2 rounded cursor-pointer hover:bg-midnight/50 transition-colors`}
              onClick={() => handleBillingPeriodChange('biannual')}
            >
              <p className={`${billingPeriod === 'biannual' ? 'text-white' : 'text-white/70'} text-xs`}>Biannual <span className="text-cyber text-[10px]">-30%</span></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
