import React from 'react';
import Layout from '../components/Layout';
import ServerStatusComponent from '../components/sections/ServerStatus';
import { motion } from 'framer-motion';
import { Server, Shield, Clock } from 'lucide-react';

const ServerStatusPage = () => {
  return (
    <Layout>
      <div className="py-24 md:py-32 bg-charcoal min-h-screen">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              StealthRDP <span className="text-electric">Server Status</span>
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed">
              Real-time monitoring of our server infrastructure. Check the current status 
              and historical uptime of all StealthRDP services.
            </p>
          </motion.div>
          
          {/* Server Status Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ServerStatusComponent />
          </motion.div>
          
          {/* Additional Information */}
          <motion.div 
            className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div 
              className="bg-midnight rounded-xl border border-gray-800 p-8 shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 p-3 bg-charcoal inline-block rounded-lg">
                <Shield className="h-8 w-8 text-cyber" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Service Level Agreement</h3>
              <p className="text-gray-400">
                StealthRDP is committed to maintaining a 99.9% uptime for all our VPS services. 
                Our monitoring system alerts us instantly of any service disruptions.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-midnight rounded-xl border border-gray-800 p-8 shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 p-3 bg-charcoal inline-block rounded-lg">
                <Server className="h-8 w-8 text-electric" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Uptime Guarantee</h3>
              <p className="text-gray-400">
                We offer compensation credits for any monthly uptime percentage below our guaranteed 99.9%. 
                The real-time data on this page shows our actual performance against this commitment.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-midnight rounded-xl border border-gray-800 p-8 shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 p-3 bg-charcoal inline-block rounded-lg">
                <Clock className="h-8 w-8 text-cyber" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Incident Response</h3>
              <p className="text-gray-400">
                Our technical team is available 24/7 to respond to service disruptions. 
                Most issues are detected and resolved before they affect your service experience.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Additional Information Banner */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-midnight to-charcoal rounded-xl border border-gray-800 p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold text-white mb-2">Need Technical Assistance?</h3>
                <p className="text-gray-400">
                  Our support team is available 24/7 to help with any technical issues or questions.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a 
                  href="/contact" 
                  className="inline-block px-8 py-3 bg-electric text-midnight font-bold rounded-lg transition-all hover:bg-electric/90 hover:scale-105"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ServerStatusPage; 