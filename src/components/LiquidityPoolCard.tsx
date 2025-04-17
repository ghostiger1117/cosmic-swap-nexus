
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

interface LiquidityPoolProps {
  pool: {
    name: string;
    symbols: string[];
    icons: string[];
    apr: number;
    tvl: string;
    volume24h: string;
  };
}

const LiquidityPoolCard: React.FC<LiquidityPoolProps> = ({ pool }) => {
  return (
    <div className="cosmic-card p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2 mr-1">
              {pool.icons.map((icon, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg border border-white/10">
                  {icon}
                </div>
              ))}
            </div>
            <h3 className="text-lg font-medium">{pool.name}</h3>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {pool.symbols.join(' / ')}
          </div>
        </div>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8 border-white/10">
          <ExternalLink size={14} />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div>
          <div className="text-sm text-muted-foreground">APR</div>
          <div className="text-lg font-medium text-green-400">{pool.apr}%</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">TVL</div>
          <div className="text-lg font-medium">{pool.tvl}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">24h Volume</div>
          <div className="text-lg font-medium">{pool.volume24h}</div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button className="w-full cosmic-button">Add Liquidity</Button>
        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
          Farm
        </Button>
      </div>
    </div>
  );
};

export default LiquidityPoolCard;
