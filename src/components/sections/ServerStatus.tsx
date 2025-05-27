import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMonitors, getUptimeStats, statusMap, Monitor } from '../../lib/api/uptimeApi';
import { ArrowUpCircle, ArrowDownCircle, AlertCircle, Clock, Activity, RefreshCw, ExternalLink, Server, Shield, Wifi } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

const ServerStatus: React.FC = () => {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  const fetchData = async () => {
    try {
      setRefreshing(true);
      
      // Fetch monitors with more detailed error handling
      let monitorsData;
      try {
        monitorsData = await getMonitors();
        console.log('Monitors data received:', monitorsData ? monitorsData.length : 0, 'monitors');
        if (monitorsData.length === 0) {
          console.warn('No monitors returned from API');
        }
      } catch (monitorErr: any) {
        console.error('Error fetching monitors:', monitorErr);
        setDebugInfo(prev => ({ ...prev, monitorError: monitorErr?.message || 'Unknown error' }));
        throw new Error(`Monitor fetch failed: ${monitorErr?.message || 'Unknown error'}`);
      }

      // Fetch stats with more detailed error handling
      let statsData;
      try {
        statsData = await getUptimeStats();
        console.log('Stats data received:', statsData);
        if (!statsData) {
          console.warn('No stats data returned from API');
        }
      } catch (statsErr: any) {
        console.error('Error fetching stats:', statsErr);
        setDebugInfo(prev => ({ ...prev, statsError: statsErr?.message || 'Unknown error' }));
        throw new Error(`Stats fetch failed: ${statsErr?.message || 'Unknown error'}`);
      }
      
      setMonitors(monitorsData);
      setStats(statsData);
      setLastUpdated(new Date());
      setError(null);
      
      // Set debug info for UI rendering
      setDebugInfo({
        monitorsCount: monitorsData.length,
        statsReceived: !!statsData,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Error fetching uptime data:', err);
      setError(`Failed to load server status: ${err?.message || 'Unknown error'}`);
      setDebugInfo(prev => ({ 
        ...prev, 
        error: err?.message || 'Unknown error',
        stack: err?.stack
      }));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Add a function to directly test the API connection
  const testApiConnection = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      console.log('Testing server API connection');
      
      // Determine API URL based on environment
      const apiUrl = window.location.hostname === 'www.stealthrdp.com' || window.location.hostname === 'stealthrdp.com'
        ? 'https://stealthrdp2-production.up.railway.app/api/uptime'
        : 'http://localhost:5001/api/uptime';
      
      console.log(`Using API URL: ${apiUrl}`);
      
      // Make a direct axios request to our server API
      const response = await axios.post(apiUrl, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        withCredentials: false // Set to false to avoid CORS credentials issues
      });
      
      console.log('Server API test response:', response);
      
      setDebugInfo({
        directApiTest: true,
        status: response.status,
        stat: response.data?.stat,
        monitorCount: response.data?.monitors?.length || 0,
        timestamp: new Date().toISOString()
      });
      
      if (response.data?.stat === 'ok') {
        setError('API test successful! Try refreshing the page.');
      } else {
        setError(`API test failed with status: ${response.data?.stat}. See console for details.`);
      }
    } catch (err: any) {
      console.error('API test error:', err);
      
      let errorDetail = 'Unknown error';
      if (err.response) {
        // The server responded with a non-2xx status
        errorDetail = `Server responded with ${err.response.status}: ${JSON.stringify(err.response.data)}`;
      } else if (err.request) {
        // No response received
        errorDetail = 'No response received from server (is the Express server running?)';
      } else {
        // Error setting up the request
        errorDetail = err.message;
      }
      
      setError(`API test failed: ${errorDetail}`);
      setDebugInfo({
        directApiTest: true,
        error: err.message,
        errorType: err.name,
        errorDetail,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto refresh every 60 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const getStatusColor = (status: number) => {
    switch (status) {
      case 2: return 'text-cyber';
      case 8: return 'text-amber-500';
      case 9: return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status: number) => {
    switch (status) {
      case 2: return 'bg-cyber/10';
      case 8: return 'bg-amber-500/10';
      case 9: return 'bg-red-500/10';
      default: return 'bg-gray-700/30';
    }
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 2: return <ArrowUpCircle className="h-5 w-5 text-cyber" />;
      case 8: return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 9: return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const progressVariants = (percentage: number) => ({
    hidden: { width: 0 },
    visible: { 
      width: `${percentage}%`,
      transition: { duration: 1, ease: "easeOut" }
    }
  });

  const renderUptimeBar = (percentage: number, days: string) => (
    <motion.div className="mb-6" variants={itemVariants}>
      <div className="flex justify-between mb-1 text-sm">
        <span className="text-gray-400">Last {days}</span>
        <span className={`font-semibold ${percentage > 99 ? 'text-cyber' : percentage > 95 ? 'text-electric' : 'text-amber-500'}`}>
          {percentage.toFixed(2)}%
        </span>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full rounded-full ${
            percentage > 99 ? 'bg-cyber' : 
            percentage > 95 ? 'bg-electric' : 
            'bg-amber-500'
          }`}
          variants={progressVariants(percentage)}
          initial="hidden"
          animate="visible"
        />
      </div>
    </motion.div>
  );

  const responseTimeLabel = (time: number) => {
    if (time < 50) return 'Excellent';
    if (time < 100) return 'Good';
    if (time < 200) return 'Average';
    return 'Slow';
  };

  const responseTimeColor = (time: number) => {
    if (time < 50) return 'text-cyber';
    if (time < 100) return 'text-electric';
    if (time < 200) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-midnight rounded-xl border border-gray-800 overflow-hidden shadow-lg">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Activity className="mr-3 h-6 w-6 text-electric" />
            Server Status
            {refreshing && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="ml-3"
              >
                <div className="h-2 w-2 rounded-full bg-electric"></div>
              </motion.div>
            )}
          </h2>
          <div className="flex space-x-3">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={testApiConnection}
              className="flex items-center text-sm bg-amber-500/20 px-3 py-1.5 rounded text-amber-500 hover:bg-amber-500/30 transition-all"
              disabled={refreshing || loading}
            >
              Test API
            </motion.button> */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchData}
              className="flex items-center text-sm text-gray-400 hover:text-electric bg-charcoal px-3 py-1.5 rounded transition-all"
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${refreshing ? 'animate-spin text-electric' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-16"
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-4"
                >
                  <RefreshCw className="h-12 w-12 text-electric" />
                </motion.div>
                <p className="text-gray-400">Loading server status data...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-lg"
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="mb-4">{error}</p>
              
              {/* Fallback option to external status page */}
              <div className="mt-2 mb-4 text-white bg-gray-800/80 p-4 rounded-lg">
                <p className="text-sm mb-2">
                  If you're having trouble accessing the API, you can view the status page externally:
                </p>
                <a 
                  href="https://status.stealthrdp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-midnight hover:bg-midnight/80 text-electric rounded transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View External Status Page
                </a>
              </div>
              
              {/* Troubleshooting suggestion */}
              {error.includes('No response received') ? (
                <div className="mt-4 mb-4 bg-gray-900/50 p-4 rounded-lg text-white">
                  <p className="font-semibold mb-2">Troubleshooting Tips:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Make sure the Express server is running</li>
                    <li>Check that the Express server is running on port 5001</li>
                    <li>Verify the UPTIMEROBOT_API_KEY is set in the server's .env file</li>
                    <li>Check the server console for any error messages</li>
                  </ul>
                </div>
              ) : null}
              
              {/* Debug information (remove in production) */}
              {debugInfo && (
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-xs font-mono text-gray-300 whitespace-pre-wrap">
                  <p className="mb-2 text-white">Debug Information:</p>
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              )}
              
              <motion.button 
                onClick={fetchData}
                className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : monitors.length === 0 ? (
            <motion.div 
              className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-6 rounded-lg"
              key="no-monitors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="mb-2">No monitor data received from API.</p>
              <p className="mb-4">This could be due to a server configuration issue or no monitors being set up in UptimeRobot.</p>
              
              {/* Fallback option to external status page */}
              <div className="mt-2 mb-4 text-white bg-gray-800/80 p-4 rounded-lg">
                <p className="text-sm mb-2">
                  View the official status page directly:
                </p>
                <a 
                  href="https://status.stealthrdp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-midnight hover:bg-midnight/80 text-electric rounded-lg transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Status Page
                </a>
              </div>
              
              {/* Debug information (remove in production) */}
              {debugInfo && (
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-xs font-mono text-gray-300 whitespace-pre-wrap">
                  <p className="mb-2 text-white">Debug Information:</p>
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              )}
              
              <motion.button 
                onClick={fetchData}
                className="mt-4 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key="data"
            >
              {/* Overall Status */}
              <motion.div variants={itemVariants} className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                  <motion.div 
                    className="bg-charcoal rounded-xl p-6 text-center shadow-md border border-gray-800 relative overflow-hidden"
                    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -right-4 -top-4 opacity-5">
                      <Server className="h-24 w-24 text-electric" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stats?.total || 0}</div>
                    <div className="text-sm text-gray-400">Total Monitors</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-charcoal rounded-xl p-6 text-center shadow-md border border-gray-800 relative overflow-hidden"
                    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -right-4 -top-4 opacity-5">
                      <ArrowUpCircle className="h-24 w-24 text-cyber" />
                    </div>
                    <div className="text-4xl font-bold text-cyber mb-2">{stats?.up || 0}</div>
                    <div className="text-sm text-gray-400">Up</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-charcoal rounded-xl p-6 text-center shadow-md border border-gray-800 relative overflow-hidden"
                    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -right-4 -top-4 opacity-5">
                      <ArrowDownCircle className="h-24 w-24 text-red-500" />
                    </div>
                    <div className="text-4xl font-bold text-red-500 mb-2">{stats?.down || 0}</div>
                    <div className="text-sm text-gray-400">Down</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-charcoal rounded-xl p-6 text-center shadow-md border border-gray-800 relative overflow-hidden"
                    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -right-4 -top-4 opacity-5">
                      <Clock className="h-24 w-24 text-gray-500" />
                    </div>
                    <div className="text-4xl font-bold text-gray-500 mb-2">{stats?.paused || 0}</div>
                    <div className="text-sm text-gray-400">Paused</div>
                  </motion.div>
                </div>

                <motion.div 
                  className="bg-charcoal rounded-xl p-6 shadow-md border border-gray-800 mb-8"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-6 flex items-center"
                    variants={itemVariants}
                  >
                    <Shield className="h-5 w-5 text-electric mr-2" />
                    Overall Uptime
                  </motion.h3>
                  
                  {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        {renderUptimeBar(stats.overall.day1, '24 hours')}
                        {renderUptimeBar(stats.overall.day7, '7 days')}
                      </div>
                      <div>
                        {renderUptimeBar(stats.overall.day30, '30 days')}
                        {renderUptimeBar(stats.overall.day90, '90 days')}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
              
              {/* Monitor List */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Wifi className="h-5 w-5 text-electric mr-2" />
                  Services Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {monitors.map((monitor) => (
                    <motion.div 
                      key={monitor.id}
                      className="bg-charcoal rounded-xl p-5 border border-gray-800 shadow-md"
                      variants={itemVariants}
                      whileHover={{ 
                        y: -4, 
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                        borderColor: monitor.status === 2 ? 'rgba(34, 212, 107, 0.3)' : 
                                    monitor.status === 9 ? 'rgba(239, 68, 68, 0.3)' : 
                                    'rgba(245, 158, 11, 0.3)'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${getStatusBgColor(monitor.status)} mr-3`}>
                            {getStatusIcon(monitor.status)}
                          </div>
                          <div>
                            <div className="font-medium text-white text-lg">{monitor.friendly_name}</div>
                          </div>
                        </div>
                        <div className={`${getStatusColor(monitor.status)} font-medium px-3 py-1 rounded-full text-sm ${getStatusBgColor(monitor.status)}`}>
                          {statusMap[monitor.status as keyof typeof statusMap]}
                        </div>
                      </div>
                      
                      {/* Uptime ratio for this monitor */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm">
                            <span className="text-gray-400">Uptime: </span>
                            <span className={Number(monitor.custom_uptime_ratio?.split('-')[3] || 100) > 99 ? 'text-cyber' : 'text-amber-500'}>
                              {monitor.custom_uptime_ratio?.split('-')[3] || monitor.all_time_uptime_ratio || '100.00'}%
                            </span>
                          </div>
                          {monitor.average_response ? (
                            <div className="text-sm">
                              <span className="text-gray-400">Response: </span>
                              <span className={responseTimeColor(monitor.average_response)}>
                                {monitor.average_response}ms
                              </span>
                              <span className="text-xs ml-1 text-gray-500">
                                ({responseTimeLabel(monitor.average_response)})
                              </span>
                            </div>
                          ) : null}
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${
                              Number(monitor.custom_uptime_ratio?.split('-')[3] || 100) > 99.9 ? 'bg-cyber' : 
                              Number(monitor.custom_uptime_ratio?.split('-')[3] || 100) > 99 ? 'bg-electric' : 
                              'bg-amber-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, Number(monitor.custom_uptime_ratio?.split('-')[3] || monitor.all_time_uptime_ratio || 100))}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Footer with external link and last updated */}
              <motion.div
                className="mt-8 flex flex-col md:flex-row justify-between items-center bg-charcoal rounded-xl p-4 border border-gray-800"
                variants={itemVariants}
              >
                {lastUpdated && (
                  <motion.div 
                    className="text-sm text-gray-400 flex items-center mb-2 md:mb-0"
                    variants={itemVariants}
                  >
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Last updated: {formatDistanceToNow(lastUpdated)} ago
                  </motion.div>
                )}
                
                <a 
                  href="https://status.stealthrdp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-gray-400 hover:text-electric transition-colors"
                >
                  View Detailed Status <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServerStatus; 