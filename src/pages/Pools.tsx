
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiquidityPoolCard from '@/components/LiquidityPoolCard';
import ChainSelector from '@/components/ChainSelector';
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, SlidersHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for liquidity pools
const allPools = [
  {
    name: 'ETH-USDC',
    symbols: ['ETH', 'USDC'],
    icons: ['⟠', '$'],
    apr: 12.5,
    tvl: '$42.6M',
    volume24h: '$8.2M'
  },
  {
    name: 'BTC-ETH',
    symbols: ['BTC', 'ETH'],
    icons: ['₿', '⟠'],
    apr: 8.3,
    tvl: '$38.1M',
    volume24h: '$6.7M'
  },
  {
    name: 'SAT-ETH',
    symbols: ['SAT', 'ETH'],
    icons: ['S', '⟠'],
    apr: 22.7,
    tvl: '$12.5M',
    volume24h: '$4.3M'
  },
  {
    name: 'USDC-USDT',
    symbols: ['USDC', 'USDT'],
    icons: ['$', '₮'],
    apr: 4.1,
    tvl: '$56.2M',
    volume24h: '$15.8M'
  },
  {
    name: 'ETH-DAI',
    symbols: ['ETH', 'DAI'],
    icons: ['⟠', 'D'],
    apr: 9.8,
    tvl: '$28.4M',
    volume24h: '$5.9M'
  },
  {
    name: 'LINK-ETH',
    symbols: ['LINK', 'ETH'],
    icons: ['L', '⟠'],
    apr: 15.2,
    tvl: '$18.3M',
    volume24h: '$3.7M'
  }
];

const Pools = () => {
  const [selectedChain, setSelectedChain] = useState({
    id: 'ethereum',
    name: 'Ethereum',
    icon: <span className="text-blue-400">⟠</span>
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('apr');

  // Filter pools by search query
  const filteredPools = allPools.filter(pool => 
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.symbols.some(symbol => symbol.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort pools by selected criteria
  const sortedPools = [...filteredPools].sort((a, b) => {
    if (sortBy === 'apr') return b.apr - a.apr;
    if (sortBy === 'tvl') return parseFloat(b.tvl.slice(1, -1)) - parseFloat(a.tvl.slice(1, -1));
    if (sortBy === 'volume') return parseFloat(b.volume24h.slice(1, -1)) - parseFloat(a.volume24h.slice(1, -1));
    return 0;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold">Liquidity Pools</h1>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button className="cosmic-button flex items-center space-x-2">
                <PlusCircle size={16} />
                <span>Create Pool</span>
              </Button>
              <ChainSelector 
                selectedChain={selectedChain} 
                onChainChange={setSelectedChain} 
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg">
              <TabsTrigger value="all" className="data-[state=active]:bg-saturn data-[state=active]:text-white">
                All Pools
              </TabsTrigger>
              <TabsTrigger value="my" className="data-[state=active]:bg-saturn data-[state=active]:text-white">
                My Positions
              </TabsTrigger>
              <TabsTrigger value="farm" className="data-[state=active]:bg-saturn data-[state=active]:text-white">
                Farming
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search pools..."
                    className="pl-10 bg-white/5 border-white/10"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    className="cosmic-select text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="apr">APR</option>
                    <option value="tvl">TVL</option>
                    <option value="volume">Volume</option>
                  </select>
                  <Button variant="outline" size="icon" className="h-10 w-10 border-white/10">
                    <SlidersHorizontal size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPools.length > 0 ? (
                  sortedPools.map((pool, index) => (
                    <LiquidityPoolCard key={index} pool={pool} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-20">
                    <h3 className="text-lg font-medium">No pools found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="my" className="mt-4 cosmic-card p-10 text-center">
              <h3 className="text-lg font-medium">Connect Wallet to View Your Positions</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                You'll need to connect your wallet to see your liquidity positions
              </p>
              <Button className="cosmic-button">
                Connect Wallet
              </Button>
            </TabsContent>
            
            <TabsContent value="farm" className="mt-4 cosmic-card p-10 text-center">
              <h3 className="text-lg font-medium">Farming Opportunities</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Earn additional rewards by staking your LP tokens
              </p>
              <Button className="cosmic-button">
                Explore Farms
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pools;
