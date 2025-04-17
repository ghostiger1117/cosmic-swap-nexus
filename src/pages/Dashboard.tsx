
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CoinChartCard from '@/components/CoinChartCard';
import { Button } from "@/components/ui/button";
import { 
  PieChart,
  BarChart,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw
} from 'lucide-react';
import { AreaChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const portfolioValue = 12482.59;
const portfolioChange = 3.2;

const tokenBalances = [
  { token: 'ETH', symbol: '⟠', amount: '1.25', value: 4485.53, change: 2.3 },
  { token: 'BTC', symbol: '₿', value: 3239.11, amount: '0.05', change: -1.2 },
  { token: 'USDC', symbol: '$', value: 2500.00, amount: '2500', change: 0 },
  { token: 'SAT', symbol: 'S', value: 1390.75, amount: '500', change: 15.7 },
  { token: 'LINK', symbol: 'L', value: 867.20, amount: '43.36', change: 5.4 }
];

const recentActivities = [
  { type: 'Swap', time: '2 hours ago', details: 'Swapped 0.2 ETH for 700 USDC' },
  { type: 'Add Liquidity', time: '5 hours ago', details: 'Added 0.1 ETH and 350 USDC to pool' },
  { type: 'Harvest', time: '1 day ago', details: 'Harvested 25 SAT from ETH-USDC farm' },
];

// Data for portfolio history chart
const portfolioHistory = [
  { date: 'Jan', value: 8500 },
  { date: 'Feb', value: 9200 },
  { date: 'Mar', value: 8800 },
  { date: 'Apr', value: 9600 },
  { date: 'May', value: 10200 },
  { date: 'Jun', value: 11000 },
  { date: 'Jul', value: 10800 },
  { date: 'Aug', value: 11500 },
  { date: 'Sep', value: 12000 },
  { date: 'Oct', value: 11700 },
  { date: 'Nov', value: 12300 },
  { date: 'Dec', value: 12482 }
];

// Mock data for the coin chart
const ethData = {
  id: 'eth',
  name: 'Ethereum',
  symbol: 'ETH',
  price: 3588.42,
  change: 2.3,
  data: Array.from({ length: 24 }, (_, i) => ({
    date: `${i}:00`,
    price: 3500 + Math.random() * 200
  }))
};

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const isPositive = portfolioChange >= 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button variant="outline" size="sm" className="mt-4 md:mt-0 border-white/10 flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Refresh Data</span>
            </Button>
          </div>
          
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="cosmic-card p-6 md:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-medium">Portfolio Value</h2>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-bold">${portfolioValue.toFixed(2)}</span>
                    <span className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{portfolioChange}%
                      {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(period => (
                    <button
                      key={period}
                      className={`px-2 py-1 text-xs rounded ${
                        timeframe === period 
                          ? 'bg-saturn text-white' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => setTimeframe(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={portfolioHistory}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }} 
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={false}
                      orientation="right"
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background/95 backdrop-blur-md p-2 border border-white/10 rounded">
                              <p className="text-xs">{label}</p>
                              <p className="text-sm font-medium">${payload[0].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8B5CF6" 
                      fillOpacity={1}
                      fill="url(#portfolioGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="cosmic-card p-6">
              <h2 className="text-lg font-medium mb-4">Portfolio Analytics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <DollarSign size={16} />
                    </div>
                    <span>Total Value</span>
                  </div>
                  <span className="font-medium">${portfolioValue.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <PieChart size={16} />
                    </div>
                    <span>Assets</span>
                  </div>
                  <span className="font-medium">{tokenBalances.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <BarChart size={16} />
                    </div>
                    <span>Pools</span>
                  </div>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                      <Calendar size={16} />
                    </div>
                    <span>First Activity</span>
                  </div>
                  <span className="font-medium">189 days ago</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Token Balances */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Token Balances</h2>
            <div className="cosmic-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4">Token</th>
                      <th className="text-right p-4">Balance</th>
                      <th className="text-right p-4">Value</th>
                      <th className="text-right p-4">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenBalances.map((token, index) => (
                      <tr 
                        key={token.token} 
                        className={index < tokenBalances.length - 1 ? "border-b border-white/5" : ""}
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
                              {token.symbol}
                            </div>
                            <span>{token.token}</span>
                          </div>
                        </td>
                        <td className="text-right p-4">{token.amount}</td>
                        <td className="text-right p-4">${token.value.toFixed(2)}</td>
                        <td className="text-right p-4">
                          <span className={token.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {token.change >= 0 ? '+' : ''}{token.change}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Additional Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Market Overview</h2>
              <CoinChartCard coin={ethData} />
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
              <div className="cosmic-card p-4">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="p-3 border border-white/10 rounded-lg bg-white/5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-saturn/20 flex items-center justify-center text-saturn-light mt-1">
                            <Clock size={16} />
                          </div>
                          <div>
                            <div className="font-medium">{activity.type}</div>
                            <div className="text-sm text-muted-foreground mt-1">{activity.details}</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 border-white/10">
                  View All Activity
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
