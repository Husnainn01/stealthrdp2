import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, Zap, ShieldCheck, Clock, Users, Code, Cpu, HardDrive, Globe, Settings, Laptop, Server, Bot, Gamepad2, Repeat, Disc, Monitor, Terminal, MoveRight, X } from 'lucide-react';
import { planApi, PlanApiResponse } from '@/lib/api/planApi';
import { testimonialApi } from '@/lib/api/testimonialApi';
import { ITestimonial } from '@/lib/models/Testimonial';

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
  const [usaPlans, setUsaPlans] = useState<PlanApiResponse[]>([]);
  const [euPlans, setEuPlans] = useState<PlanApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annually' | 'biannually'>('monthly');
  
  // Add countdown timer state
  const [countdown, setCountdown] = useState("48:00:00");
  
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState<boolean>(true);
  
  // Calculate discount percentage for each cycle
  const getDiscount = (plan: PlanApiResponse | undefined, cycle: string) => {
    if (!plan || !plan.billingOptions) return 0;
    
    switch (cycle) {
      case 'quarterly':
        return plan.billingOptions?.quarterly?.enabled ? plan.billingOptions.quarterly.discountPercentage : 0;
      case 'annually':
        return plan.billingOptions?.annual?.enabled ? plan.billingOptions.annual.discountPercentage : 0;
      case 'biannually':
        return plan.billingOptions?.biannual?.enabled ? plan.billingOptions.biannual.discountPercentage : 0;
      default:
        return 0;
    }
  };

  // Helper function to get current price based on billing cycle
  const getCurrentPrice = (plan: PlanApiResponse | undefined) => {
    if (!plan || !plan.monthlyPrice) return null;
    
    switch (billingCycle) {
      case 'monthly':
        return plan.monthlyPrice;
      case 'quarterly':
        if (plan.billingOptions?.quarterly?.enabled) {
          const discount = plan.billingOptions.quarterly.discountPercentage;
          const quarterlyTotal = plan.monthlyPrice * 3 * (1 - discount / 100);
          return quarterlyTotal / 3; // Return monthly equivalent
        }
        return plan.monthlyPrice;
      case 'annually':
        if (plan.billingOptions?.annual?.enabled) {
          const discount = plan.billingOptions?.annual?.discountPercentage;
          const annualTotal = plan.monthlyPrice * 12 * (1 - discount / 100);
          return annualTotal / 12; // Return monthly equivalent
        }
        return plan.monthlyPrice;
      case 'biannually':
        if (plan.billingOptions?.biannual?.enabled) {
          const discount = plan.billingOptions?.biannual?.discountPercentage;
          const biannualTotal = plan.monthlyPrice * 24 * (1 - discount / 100);
          return biannualTotal / 24; // Return monthly equivalent
        }
        return plan.monthlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  // Helper to check if a billing option is enabled for any plan
  const isBillingOptionEnabled = (cycle: string) => {
    if (!usaPlans.length) return false;
    
    switch (cycle) {
      case 'quarterly':
        return usaPlans.some(plan => plan.billingOptions?.quarterly?.enabled);
      case 'annually':
        return usaPlans.some(plan => plan.billingOptions?.annual?.enabled);
      case 'biannually':
        return usaPlans.some(plan => plan.billingOptions?.biannual?.enabled);
      default:
        return true; // Monthly is always enabled
    }
  };
  
  // Fetch plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const [usaData, euData] = await Promise.all([
          planApi.getPlans('USA'),
          planApi.getPlans('EU')
        ]);
        console.log('Fetched USA Plans for Homepage:', usaData);
        console.log('Fetched EU Plans for Homepage:', euData);
        
        // Sort plans by price to ensure consistent order
        const sortedUsaData = [...usaData].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
        const sortedEuData = [...euData].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
        
        setUsaPlans(sortedUsaData);
        setEuPlans(sortedEuData);
        setError(null);
      } catch (err) {
        console.error('Error fetching plans for homepage:', err);
        setError('Failed to load plans.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

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

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialsLoading(true);
        const data = await testimonialApi.getAllTestimonials();
        // Filter out any FAQ items that might be in the testimonials collection
        const actualTestimonials = data.filter(item => !item.isFaq);
        // Sort by displayOrder
        actualTestimonials.sort((a, b) => a.displayOrder - b.displayOrder);
        setTestimonials(actualTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

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

  // Get the featured testimonial (first one by display order or a fallback)
  const featuredTestimonial = testimonials.length > 0 ? testimonials[0] : null;

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
            <div className="flex items-baseline mb-5">
              <span className="text-3xl font-bold text-white">
                ${usaPlans.length > 0 ? (getCurrentPrice(usaPlans[0]) || usaPlans[0]?.monthlyPrice).toFixed(2) : '9.50'}
              </span>
              <span className="text-white/60 ml-2 text-sm">/month</span>
              {billingCycle !== 'monthly' && usaPlans.length > 0 && getDiscount(usaPlans[0], billingCycle) > 0 && (
                <span className="ml-2 text-xs text-cyber bg-cyber/10 px-1.5 py-0.5 rounded">
                  Save {getDiscount(usaPlans[0], billingCycle)}%
                </span>
              )}
            </div>
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
                      "I worry about data loss from hardware failures and have no reliable backup system in place."
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
                      "Our data is securely backed up on enterprise-grade servers with automated disaster recovery solutions."
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
                      "I worry about data loss from hardware failures and have no reliable backup system in place."
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
                      "Our data is securely backed up on enterprise-grade servers with automated disaster recovery solutions."
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
          </div>
          
          {/* Social Proof Counter - Reinforcement */}
          <div className="mt-12 flex justify-center">
            <div className="bg-midnight/50 border border-white/10 rounded-lg py-3 px-6 inline-flex items-center gap-4">
              <p className="text-white/60 text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-cyber" />
                <span>10,877 customers have solved these problems</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section - Advanced Pricing Psychology */}
      <section className="py-16 md:py-24 bg-midnight relative">
        <div className="plans-background"></div>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-electric/10 text-electric text-sm font-medium mb-4">Tailored Server Solutions</span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4 text-white">
              Select Your Performance Level
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              All plans include free migration assistance, 24/7 support, and our industry-leading uptime guarantee.
            </p>
          </div>
          
          {/* Pricing Toggle - Price Anchoring */}
          <div className="max-w-lg mx-auto mb-10">
            <div className="bg-charcoal/50 rounded-lg p-2 flex items-center">
              <div className="grid grid-cols-4 gap-2 w-full">
                <div 
                  className={`text-center py-2 px-2 rounded cursor-pointer transition-colors ${billingCycle === 'monthly' ? 'bg-midnight border border-electric' : 'hover:bg-midnight/50'}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  <p className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-white/70'}`}>Monthly</p>
                </div>
                <div 
                  className={`text-center py-2 px-2 rounded cursor-pointer transition-colors ${!isBillingOptionEnabled('quarterly') ? 'opacity-50 cursor-not-allowed' : billingCycle === 'quarterly' ? 'bg-midnight border border-electric' : 'hover:bg-midnight/50'}`}
                  onClick={() => isBillingOptionEnabled('quarterly') && setBillingCycle('quarterly')}
                >
                  <p className={`text-xs ${billingCycle === 'quarterly' ? 'text-white font-medium' : 'text-white/70'}`}>
                    Quarterly 
                    {usaPlans.length > 0 && usaPlans[0].billingOptions?.quarterly?.enabled && (
                      <span className="text-cyber text-[10px] ml-1">-{usaPlans[0].billingOptions.quarterly.discountPercentage}%</span>
                    )}
                  </p>
                </div>
                <div 
                  className={`text-center py-2 px-2 rounded cursor-pointer transition-colors ${!isBillingOptionEnabled('annually') ? 'opacity-50 cursor-not-allowed' : billingCycle === 'annually' ? 'bg-midnight border border-electric' : 'hover:bg-midnight/50'}`}
                  onClick={() => isBillingOptionEnabled('annually') && setBillingCycle('annually')}
                >
                  <p className={`text-xs ${billingCycle === 'annually' ? 'text-white font-medium' : 'text-white/70'}`}>
                    Annual 
                    {usaPlans.length > 0 && usaPlans[0].billingOptions?.annual?.enabled && (
                      <span className="text-cyber text-[10px] ml-1">-{usaPlans[0].billingOptions.annual.discountPercentage}%</span>
                    )}
                  </p>
                </div>
                <div 
                  className={`text-center py-2 px-2 rounded cursor-pointer transition-colors ${!isBillingOptionEnabled('biannually') ? 'opacity-50 cursor-not-allowed' : billingCycle === 'biannually' ? 'bg-midnight border border-electric' : 'hover:bg-midnight/50'}`}
                  onClick={() => isBillingOptionEnabled('biannually') && setBillingCycle('biannually')}
                >
                  <p className={`text-xs ${billingCycle === 'biannually' ? 'text-white font-medium' : 'text-white/70'}`}>
                    Biannual 
                    {usaPlans.length > 0 && usaPlans[0].billingOptions?.biannual?.enabled && (
                      <span className="text-cyber text-[10px] ml-1">-{usaPlans[0].billingOptions.biannual.discountPercentage}%</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Plans Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {loading ? (
              // Loading state
              <>
                <div className="bg-charcoal/50 border border-white/10 rounded-lg h-96 animate-pulse"></div>
                <div className="bg-charcoal/50 border border-white/10 rounded-lg h-96 animate-pulse"></div>
                <div className="bg-charcoal/50 border border-white/10 rounded-lg h-96 animate-pulse"></div>
              </>
            ) : error ? (
              // Error state
              <div className="col-span-3 text-center py-8">
                <p className="text-red-400">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : (
              // Filtered plans from the USA data center
              usaPlans.slice(0, 3).map((plan, index) => (
                <div 
                  key={plan._id} 
                  className={`bg-charcoal/50 border ${plan.popular ? 'border-electric' : 'border-white/10'} rounded-lg p-6 flex flex-col h-full relative ${plan.popular ? 'transform scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-electric text-midnight text-xs font-bold py-1 px-3 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-5">
                    <span className="text-3xl font-bold text-white">
                      ${getCurrentPrice(plan)?.toFixed(2)}
                    </span>
                    <span className="text-white/60 ml-2 text-sm">/month</span>
                    {billingCycle !== 'monthly' && getDiscount(plan, billingCycle) > 0 && (
                      <span className="ml-2 text-xs text-cyber bg-cyber/10 px-1.5 py-0.5 rounded">
                        Save {getDiscount(plan, billingCycle)}%
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-start gap-2">
                      <Cpu className="h-4 w-4 text-electric mt-0.5" />
                      <span className="text-white/80 text-sm">{plan.specs.cpu}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <HardDrive className="h-4 w-4 text-electric mt-0.5" />
                      <span className="text-white/80 text-sm">{plan.specs.ram}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Server className="h-4 w-4 text-electric mt-0.5" />
                      <span className="text-white/80 text-sm">{plan.specs.storage}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-electric mt-0.5" />
                      <span className="text-white/80 text-sm">{plan.specs.bandwidth}</span>
                    </div>
                  </div>
                  
                  <Button asChild className={`${plan.popular ? 'bg-electric text-midnight hover:bg-cyber' : 'bg-midnight hover:bg-charcoal border border-electric text-electric'} w-full`}>
                    <Link to={plan.purchaseUrl || '/plans'}>
                      Select Plan
                    </Link>
                  </Button>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-electric text-electric hover:bg-electric/10">
              <Link to="/plans" className="flex items-center gap-2">
                View All Plans <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator - Keep the JSX but remove the script tag */}

    </Layout>
  );
};

export default Index;
