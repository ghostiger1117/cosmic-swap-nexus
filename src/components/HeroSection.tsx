
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import ChainSelector, { ChainOption } from './ChainSelector';

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedChain, setSelectedChain] = useState<ChainOption>({
    id: 'ethereum',
    name: 'Ethereum',
    icon: <span className="text-blue-400">⟠</span>
  });

  // This function properly handles ChainOption
  const handleChainChange = (chain: ChainOption) => {
    setSelectedChain(chain);
  };

  return (
    <div className="relative z-10 pt-20 pb-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-40 left-1/4 w-72 h-72 bg-saturn-light/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-saturn-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Chain Selector Positioned at Top Right */}
          <div className="absolute top-0 right-4 md:right-10">
            <ChainSelector 
              selectedChain={selectedChain} 
              onChainChange={handleChainChange} 
            />
          </div>
          
          {/* Hero Title with Gradient */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-saturn-gold via-saturn-light to-white">
              Cosmic Trading
            </span>{" "}
            <span className="block mt-2">
              Enters a New Orbit
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Experience intergalactic swaps, earn celestial yields, and explore the cosmic 
            frontier of decentralized finance with SaturnSwaps.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              className="cosmic-button text-lg px-8 py-6"
              onClick={() => navigate('/swap')}
            >
              Start Swapping
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-6 border-white/10 hover:bg-white/5"
              onClick={() => navigate('/pools')}
            >
              Explore Pools
            </Button>
          </div>
          
          {/* Stats Container */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full">
            <div className="cosmic-card p-6 text-center">
              <div className="text-saturn-gold font-bold text-3xl mb-2">$1.7B+</div>
              <div className="text-muted-foreground">Total Value Locked</div>
            </div>
            <div className="cosmic-card p-6 text-center">
              <div className="text-saturn-gold font-bold text-3xl mb-2">32K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="cosmic-card p-6 text-center">
              <div className="text-saturn-gold font-bold text-3xl mb-2">7</div>
              <div className="text-muted-foreground">Supported Chains</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
