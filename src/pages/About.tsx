import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Server, Globe, Users, Clock, Trophy, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeploymentCTA from '@/components/sections/DeploymentCTA';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-midnight opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#22D46B10_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-montserrat bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-electric">StealthRDP</span>
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Providing enterprise-grade remote desktop services with unmatched performance, security, and reliability since 2018.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-midnight">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-white">Our Story</h2>
              <p className="text-gray-300 mb-6">
                StealthRDP was founded in 2018 with a simple yet powerful mission: to provide reliable, high-performance remote desktop solutions for businesses and individuals around the world.
              </p>
              <p className="text-gray-300 mb-6">
                What began as a small operation serving a niche market has grown into a trusted provider of enterprise-grade RDP and VPS solutions. Our commitment to performance, security, and customer service has helped us build a global customer base that relies on our infrastructure every day.
              </p>
              <p className="text-gray-300">
                Today, StealthRDP powers thousands of virtual machines across multiple datacenters, enabling businesses to operate efficiently in an increasingly remote world.
              </p>
            </div>
            <div className="bg-charcoal rounded-xl p-8 border border-gray-800 relative overflow-hidden">
              <div className="absolute -bottom-16 -right-16 opacity-5 z-0">
                <Server className="w-64 h-64 text-electric" />
              </div>
              <div className="relative z-10">
                <div className="mb-6">
                  <span className="bg-electric/10 text-electric px-4 py-1 rounded-full text-sm font-medium">Founded 2018</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Company Milestones</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                      <Clock className="h-4 w-4 text-cyber" />
                    </div>
                    <div>
                      <span className="text-white font-medium">2018</span>
                      <p className="text-gray-400 text-sm">Company founded with first datacenter in the USA</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                      <Globe className="h-4 w-4 text-cyber" />
                    </div>
                    <div>
                      <span className="text-white font-medium">2020</span>
                      <p className="text-gray-400 text-sm">Expanded to European market with Netherlands datacenter</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                      <Users className="h-4 w-4 text-cyber" />
                    </div>
                    <div>
                      <span className="text-white font-medium">2022</span>
                      <p className="text-gray-400 text-sm">Reached 10,000+ active customers worldwide</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                      <Trophy className="h-4 w-4 text-cyber" />
                    </div>
                    <div>
                      <span className="text-white font-medium">2023</span>
                      <p className="text-gray-400 text-sm">99.9% uptime achievement across all infrastructure</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-charcoal">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-white">Our Values</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              At StealthRDP, we're guided by a set of core values that inform everything we do, from 
              how we build our infrastructure to how we support our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-midnight p-6 rounded-xl border border-gray-800 h-full">
              <div className="bg-electric/10 p-3 rounded-lg w-max mb-4">
                <Shield className="h-6 w-6 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Security First</h3>
              <p className="text-gray-300">
                We prioritize the security of our customers' data and systems above all else. 
                Our infrastructure is built with multiple layers of protection to keep your 
                operations safe.
              </p>
            </div>
            
            <div className="bg-midnight p-6 rounded-xl border border-gray-800 h-full">
              <div className="bg-electric/10 p-3 rounded-lg w-max mb-4">
                <Target className="h-6 w-6 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Relentless Reliability</h3>
              <p className="text-gray-300">
                Downtime isn't an option for our customers, so it isn't an option for us. 
                We engineer our systems for 99.9% uptime and continuously monitor to ensure 
                peak performance.
              </p>
            </div>
            
            <div className="bg-midnight p-6 rounded-xl border border-gray-800 h-full">
              <div className="bg-electric/10 p-3 rounded-lg w-max mb-4">
                <Heart className="h-6 w-6 text-electric" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Customer-Centric</h3>
              <p className="text-gray-300">
                Our success is measured by our customers' success. We provide responsive, 
                knowledgeable support and continuously evolve our services based on customer 
                feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-midnight">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-charcoal p-5 rounded-xl border border-gray-800">
                  <div className="mb-3 text-cyber font-bold text-3xl">24/7</div>
                  <div className="text-white font-semibold mb-1">Technical Support</div>
                  <p className="text-gray-400 text-sm">Round-the-clock assistance for all customers</p>
                </div>
                
                <div className="bg-charcoal p-5 rounded-xl border border-gray-800">
                  <div className="mb-3 text-cyber font-bold text-3xl">99.9%</div>
                  <div className="text-white font-semibold mb-1">Uptime Guaranteed</div>
                  <p className="text-gray-400 text-sm">Reliability you can depend on</p>
                </div>
                
                <div className="bg-charcoal p-5 rounded-xl border border-gray-800">
                  <div className="mb-3 text-cyber font-bold text-3xl">10k+</div>
                  <div className="text-white font-semibold mb-1">Satisfied Customers</div>
                  <p className="text-gray-400 text-sm">Businesses of all sizes trust us</p>
                </div>
                
                <div className="bg-charcoal p-5 rounded-xl border border-gray-800">
                  <div className="mb-3 text-cyber font-bold text-3xl">60s</div>
                  <div className="text-white font-semibold mb-1">Server Deployment</div>
                  <p className="text-gray-400 text-sm">Get up and running instantly</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-white">Why Choose StealthRDP</h2>
              <p className="text-gray-300 mb-6">
                We're not just another RDP provider. StealthRDP stands out through our commitment to excellence in every aspect of our service.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                    <Shield className="h-4 w-4 text-cyber" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Enterprise-Grade Security</span>
                    <p className="text-gray-400 text-sm">Advanced protection against modern threats</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                    <Server className="h-4 w-4 text-cyber" />
                  </div>
                  <div>
                    <span className="text-white font-medium">High-Performance Infrastructure</span>
                    <p className="text-gray-400 text-sm">Cutting-edge hardware for demanding workloads</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                    <Globe className="h-4 w-4 text-cyber" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Global Data Centers</span>
                    <p className="text-gray-400 text-sm">Strategic locations for optimal performance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-cyber/10 p-1 rounded-full mr-3 mt-1">
                    <Users className="h-4 w-4 text-cyber" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Expert Support Team</span>
                    <p className="text-gray-400 text-sm">Knowledgeable professionals ready to help</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-charcoal to-midnight">
        <div className="container max-w-6xl">
          <DeploymentCTA startingPrice="9.50" />
        </div>
      </section>
    </Layout>
  );
};

export default About; 