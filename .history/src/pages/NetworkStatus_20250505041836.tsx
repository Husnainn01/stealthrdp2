import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

// Simulated server status data
interface ServerStatus {
  name: string;
  status: 'operational' | 'maintenance' | 'degraded' | 'outage';
  uptime: number;
  lastUpdated: string;
}

const NetworkStatus = () => {
  const [statusData, setStatusData] = useState<{
    servers: ServerStatus[];
    overallStatus: 'operational' | 'maintenance' | 'degraded' | 'outage';
    lastChecked: string;
  }>({
    servers: [],
    overallStatus: 'operational',
    lastChecked: new Date().toISOString()
  });

  // Simulated data - in a real app, this would come from an API
  useEffect(() => {
    // Simulating API call with timeout
    const timer = setTimeout(() => {
      setStatusData({
        overallStatus: 'operational',
        lastChecked: new Date().toISOString(),
        servers: [
          {
            name: 'USA East RDP Servers',
            status: 'operational',
            uptime: 99.998,
            lastUpdated: new Date().toISOString()
          },
          {
            name: 'USA West RDP Servers',
            status: 'operational',
            uptime: 99.993,
            lastUpdated: new Date().toISOString()
          },
          {
            name: 'EU Amsterdam RDP Servers',
            status: 'operational',
            uptime: 99.996,
            lastUpdated: new Date().toISOString()
          },
          {
            name: 'Customer Portal',
            status: 'operational',
            uptime: 99.999,
            lastUpdated: new Date().toISOString()
          },
          {
            name: 'Payment Gateway',
            status: 'operational',
            uptime: 100,
            lastUpdated: new Date().toISOString()
          }
        ]
      });
    }, 500); // Simulate a short loading time

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-cyber';
      case 'maintenance':
        return 'bg-yellow-400';
      case 'degraded':
        return 'bg-orange-500';
      case 'outage':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'maintenance':
        return 'Maintenance';
      case 'degraded':
        return 'Degraded Performance';
      case 'outage':
        return 'Outage';
      default:
        return 'Unknown';
    }
  };

  // Function to format date in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="py-20 md:py-28 bg-charcoal text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-montserrat">
              Network <span className="text-electric">Status</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Real-time status of StealthRDP services and infrastructure.
            </p>
          </div>

          {/* Overall Status Card */}
          <div className="mb-8 bg-midnight rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <span className={`w-5 h-5 rounded-full ${getStatusColor(statusData.overallStatus)} mr-3`}></span>
              <h2 className="text-2xl font-bold">
                {statusData.overallStatus === 'operational'
                  ? 'All Systems Operational'
                  : 'System Status: ' + getStatusText(statusData.overallStatus)}
              </h2>
            </div>
            <p className="text-gray-400">
              Last checked: {formatDate(statusData.lastChecked)}
            </p>
          </div>

          {/* Individual Server Status Cards */}
          <div className="space-y-4">
            {statusData.servers.map((server, index) => (
              <div key={index} className="bg-midnight rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center mb-2 md:mb-0">
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(server.status)} mr-3`}></span>
                  <div>
                    <h3 className="font-medium text-white">{server.name}</h3>
                    <p className="text-sm text-gray-400">{getStatusText(server.status)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">
                    <span className="text-electric">{server.uptime.toFixed(3)}%</span> uptime
                  </p>
                  <p className="text-xs text-gray-400">
                    Updated: {formatDate(server.lastUpdated)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* History Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
            <div className="bg-midnight rounded-lg p-6">
              <p className="text-gray-300 text-center py-8">
                No incidents reported in the last 90 days.
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-midnight border border-electric text-electric hover:bg-electric/10 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Refresh Status
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NetworkStatus; 