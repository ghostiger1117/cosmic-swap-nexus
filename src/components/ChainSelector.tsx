
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface ChainOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface ChainSelectorProps {
  selectedChain: ChainOption;
  onChainChange: (chain: ChainOption) => void;
}

const ChainSelector: React.FC<ChainSelectorProps> = ({ 
  selectedChain, 
  onChainChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const chains: ChainOption[] = [
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      icon: <span className="text-blue-400">⟠</span> 
    },
    { 
      id: 'bsc', 
      name: 'BNB Chain', 
      icon: <span className="text-yellow-400">B</span> 
    },
    { 
      id: 'polygon', 
      name: 'Polygon', 
      icon: <span className="text-purple-400">P</span> 
    },
    { 
      id: 'arbitrum', 
      name: 'Arbitrum', 
      icon: <span className="text-blue-500">A</span> 
    }
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 bg-white/10 hover:bg-white/15 rounded-lg py-1.5 px-3 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedChain.icon}
        <span className="text-sm font-medium">{selectedChain.name}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 rounded-lg bg-background/95 backdrop-blur-md border border-white/10 shadow-lg z-30">
          <div className="py-1">
            {chains.map((chain) => (
              <button
                key={chain.id}
                className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-white/5 transition-colors"
                onClick={() => {
                  onChainChange(chain);
                  setIsOpen(false);
                }}
              >
                {chain.icon}
                <span className="text-sm">{chain.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainSelector;
