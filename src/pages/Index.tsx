
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TokenSwapCard from '@/components/TokenSwapCard';
import CoinChartCard from '@/components/CoinChartCard';
import LiquidityPoolCard from '@/components/LiquidityPoolCard';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Wallet, 
  BarChart3, 
  Droplets, 
  Globe, 
  Shield 
} from 'lucide-react';

// Mock data for the crypto charts
const coinData = [
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3588.42,
    change: 2.3,
    data: Array.from({ length: 24 }, (_, i) => ({
      date: `${i}:00`,
      price: 3500 + Math.random() * 200
    }))
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 64782.15,
    change: -1.2,
    data: Array.from({ length: 24 }, (_, i) => ({
      date: `${i}:00`,
      price: 64000 + Math.random() * 2000
    }))
  },
  {
    id: 'sat',
    name: 'Saturn',
    symbol: 'SAT',
    price: 2.78,
    change: 15.7,
    data: Array.from({ length: 24 }, (_, i) => ({
      date: `${i}:00`,
      price: 2.4 + Math.random() * 0.6
    }))
  }
];

// Mock data for liquidity pools
const pools = [
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
  }
];

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="cosmic-card p-6">
    <div className="mb-4 p-3 w-12 h-12 flex items-center justify-center rounded-lg bg-saturn/20 text-saturn-light">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Swap and Charts Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex justify-center">
              <TokenSwapCard />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Live Market Data</h2>
              <div className="space-y-4">
                {coinData.map((coin) => (
                  <CoinChartCard key={coin.id} coin={coin} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Liquidity Pools Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-black/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="text-2xl font-bold">Popular Liquidity Pools</h2>
                <p className="text-muted-foreground mt-2">Provide liquidity and earn fees from swaps</p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0 border-white/10">
                View All Pools <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pools.map((pool, index) => (
                <LiquidityPoolCard key={index} pool={pool} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Why Choose SaturnSwaps</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform offers cutting-edge DeFi solutions powered by transparent, 
            audited smart contracts and a user-friendly interface.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Wallet}
              title="Non-custodial Trading"
              description="Keep full control of your assets while trading. Your keys, your crypto - always."
            />
            <FeatureCard 
              icon={Droplets}
              title="Optimized Liquidity"
              description="Our smart routing ensures the best prices with minimal slippage across all pools."
            />
            <FeatureCard 
              icon={BarChart3}
              title="Transparent Analytics"
              description="Track your performance with detailed, real-time analytics and insights."
            />
            <FeatureCard 
              icon={Globe}
              title="Multi-chain Support"
              description="Trade across Ethereum, BSC, Polygon, and more networks from a single interface."
            />
            <FeatureCard 
              icon={Shield}
              title="Security First"
              description="All our contracts are audited by leading firms and secured with industry best practices."
            />
            <FeatureCard 
              icon={ArrowRight}
              title="Easy Onboarding"
              description="Start swapping in seconds with an intuitive interface designed for both beginners and pros."
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-saturn-dark/30 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="cosmic-card p-10 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Cosmic Trading Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of traders exploring the cosmic frontier of DeFi with SaturnSwaps.
              </p>
              <Button className="cosmic-button text-lg px-8 py-6">
                Launch the App <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
