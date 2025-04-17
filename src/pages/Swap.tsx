
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TokenSwapCard from '@/components/TokenSwapCard';
import ChainSelector from '@/components/ChainSelector';
import CoinChartCard from '@/components/CoinChartCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Clock, Wallet, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Mock data for the crypto chart
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

// Mock transaction history
const transactions = [
  {
    id: '0x1a2b3c',
    type: 'Swap',
    from: { symbol: 'ETH', amount: '0.5' },
    to: { symbol: 'USDC', amount: '1,750.25' },
    time: '10 mins ago',
    status: 'completed'
  },
  {
    id: '0x4d5e6f',
    type: 'Swap',
    from: { symbol: 'USDC', amount: '500' },
    to: { symbol: 'BTC', amount: '0.0077' },
    time: '2 hours ago',
    status: 'completed'
  },
  {
    id: '0x7g8h9i',
    type: 'Add Liquidity',
    from: { symbol: 'ETH/USDC', amount: '0.2/700' },
    to: { symbol: 'LP', amount: '450.75' },
    time: '1 day ago',
    status: 'completed'
  }
];

const Swap = () => {
  const [selectedChain, setSelectedChain] = useState({
    id: 'ethereum',
    name: 'Ethereum',
    icon: <span className="text-blue-400">⟠</span>
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Swap Tokens</h1>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="border-white/10">
                <Clock size={16} className="mr-2" />
                History
              </Button>
              <Button variant="outline" size="sm" className="border-white/10">
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
              <ChainSelector 
                selectedChain={selectedChain} 
                onChainChange={setSelectedChain} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Swap Card */}
            <div className="lg:col-span-1 flex justify-center">
              <TokenSwapCard />
            </div>
            
            {/* Price Chart and History */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="w-full justify-start mb-4 bg-white/5 rounded-lg border border-white/10 p-1">
                  <TabsTrigger value="chart" className="data-[state=active]:bg-saturn data-[state=active]:text-white">
                    Price Chart
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-saturn data-[state=active]:text-white">
                    Transaction History
                  </TabsTrigger>
                  <TabsTrigger value="info" className="data-[state=active]:bg-saturn data-[state=active]:text-white">
                    Token Info
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart" className="mt-0">
                  <div className="cosmic-card p-4">
                    <CoinChartCard coin={ethData} />
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <div className="cosmic-card p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Recent Transactions</h3>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View All
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {transactions.length ? (
                        transactions.map((tx) => (
                          <div key={tx.id} className="p-4 border border-white/10 rounded-lg bg-white/5">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="bg-saturn/20 text-saturn-light text-xs px-2 py-1 rounded">
                                    {tx.type}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {tx.time}
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <div className="text-sm">
                                    {tx.from.amount} {tx.from.symbol} → {tx.to.amount} {tx.to.symbol}
                                  </div>
                                </div>
                              </div>
                              <a 
                                href={`https://etherscan.io/tx/${tx.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-saturn-light hover:underline"
                              >
                                {tx.id.substring(0, 6)}...
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <Wallet className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                          <h3 className="text-lg font-medium">No transactions yet</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            Connect your wallet and make your first swap
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="mt-0">
                  <div className="cosmic-card p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl">
                        ⟠
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Ethereum</h3>
                        <div className="text-sm text-muted-foreground">ETH</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-sm text-muted-foreground">Current Price</span>
                        <span className="font-medium">${ethData.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-sm text-muted-foreground">Market Cap</span>
                        <span className="font-medium">$432.8B</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-sm text-muted-foreground">24h Volume</span>
                        <span className="font-medium">$18.7B</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-sm text-muted-foreground">All-Time High</span>
                        <span className="font-medium">$4,891.70</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contract Address</span>
                        <a 
                          href="https://etherscan.io/address/0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-saturn-light hover:underline"
                        >
                          0xEeee...eEEeE
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button variant="outline" className="border-white/10 flex items-center space-x-2">
                        <Info size={16} />
                        <span>View More Details</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Swap;
