
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid
} from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CoinChartCardProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
    data: { date: string; price: number; }[];
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-md p-2 border border-white/10 rounded">
        <p className="text-xs">{`${label}`}</p>
        <p className="text-sm font-medium">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const CoinChartCard: React.FC<CoinChartCardProps> = ({ coin }) => {
  const isPositive = coin.change >= 0;

  return (
    <div className="cosmic-card p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-medium">{coin.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{coin.symbol}</span>
            <span>•</span>
            <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
              {isPositive ? '+' : ''}{coin.change}%
              {isPositive ? <ArrowUpRight size={14} className="inline ml-1" /> : <ArrowDownRight size={14} className="inline ml-1" />}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-medium">${coin.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="h-36 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={coin.data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id={`gradient-${coin.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#8B5CF6" : "#F87171"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? "#8B5CF6" : "#F87171"} stopOpacity={0} />
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
              domain={['dataMin - 100', 'dataMax + 100']} 
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? "#8B5CF6" : "#F87171"} 
              fillOpacity={1}
              fill={`url(#gradient-${coin.id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinChartCard;
