
import React, { useState } from 'react';
import { ChevronDown, Settings, ArrowDownUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TokenOption {
  id: string;
  symbol: string;
  name: string;
  icon: string;
}

const popularTokens: TokenOption[] = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', icon: '⟠' },
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: '$' },
  { id: 'bnb', symbol: 'BNB', name: 'Binance Coin', icon: 'B' },
];

const TokenSwapCard = () => {
  const { toast } = useToast();
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [fromToken, setFromToken] = useState<TokenOption>(popularTokens[0]);
  const [toToken, setToToken] = useState<TokenOption>(popularTokens[2]);
  const [showFromTokenList, setShowFromTokenList] = useState<boolean>(false);
  const [showToTokenList, setShowToTokenList] = useState<boolean>(false);
  const [slippage, setSlippage] = useState<string>('0.5');

  // Calculate the "to" amount based on the "from" amount and a mock price ratio
  const calculateToAmount = (value: string) => {
    const mockPrice = fromToken.id === 'eth' && toToken.id === 'usdc' ? 3500 :
                      fromToken.id === 'btc' && toToken.id === 'usdc' ? 65000 :
                      fromToken.id === 'usdc' && toToken.id === 'eth' ? 0.000285 :
                      fromToken.id === 'usdc' && toToken.id === 'btc' ? 0.0000154 : 1;
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const calculatedValue = (numericValue * mockPrice).toFixed(6);
      setToAmount(calculatedValue);
    } else {
      setToAmount('');
    }
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    calculateToAmount(value);
  };

  const handleTokenSwap = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    // Recalculate the amounts
    if (toAmount) {
      setFromAmount(toAmount);
      calculateToAmount(toAmount);
    }
  };

  const handleSwapSubmit = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Swap initiated",
      description: `Swapping ${fromAmount} ${fromToken.symbol} to ${toAmount} ${toToken.symbol}`,
    });
    
    console.log('Swap submitted:', {
      fromToken,
      toToken,
      fromAmount,
      toAmount,
      slippage
    });
  };

  return (
    <div className="cosmic-card max-w-md w-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Swap Tokens</h2>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings size={18} />
          </Button>
        </div>

        {/* From Token */}
        <div className="space-y-2 mb-2">
          <label className="text-sm text-muted-foreground">From</label>
          <div className="relative">
            <div className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10">
              <input
                type="number"
                value={fromAmount}
                onChange={handleFromAmountChange}
                placeholder="0.0"
                className="w-full bg-transparent text-lg outline-none"
              />
              <button
                onClick={() => setShowFromTokenList(!showFromTokenList)}
                className="flex items-center space-x-1 bg-white/10 rounded-lg py-1 px-3 ml-2"
              >
                <span className="text-xl">{fromToken.icon}</span>
                <span>{fromToken.symbol}</span>
                <ChevronDown size={16} />
              </button>
            </div>
            
            {/* From Token Dropdown */}
            {showFromTokenList && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-background border border-white/10 shadow-lg z-10">
                <div className="p-2">
                  {popularTokens.map((token) => (
                    <button
                      key={token.id}
                      onClick={() => {
                        setFromToken(token);
                        setShowFromTokenList(false);
                        calculateToAmount(fromAmount);
                      }}
                      className="flex items-center space-x-2 w-full p-2 hover:bg-white/5 rounded-lg"
                    >
                      <span className="text-xl">{token.icon}</span>
                      <div className="text-left">
                        <div>{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center -my-2 z-10 relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-black/30 border-white/10 h-10 w-10"
            onClick={handleTokenSwap}
          >
            <ArrowDownUp size={16} />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2 mb-6">
          <label className="text-sm text-muted-foreground">To</label>
          <div className="relative">
            <div className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10">
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="w-full bg-transparent text-lg outline-none"
              />
              <button
                onClick={() => setShowToTokenList(!showToTokenList)}
                className="flex items-center space-x-1 bg-white/10 rounded-lg py-1 px-3 ml-2"
              >
                <span className="text-xl">{toToken.icon}</span>
                <span>{toToken.symbol}</span>
                <ChevronDown size={16} />
              </button>
            </div>
            
            {/* To Token Dropdown */}
            {showToTokenList && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-background border border-white/10 shadow-lg z-10">
                <div className="p-2">
                  {popularTokens.map((token) => (
                    <button
                      key={token.id}
                      onClick={() => {
                        setToToken(token);
                        setShowToTokenList(false);
                        calculateToAmount(fromAmount);
                      }}
                      className="flex items-center space-x-2 w-full p-2 hover:bg-white/5 rounded-lg"
                    >
                      <span className="text-xl">{token.icon}</span>
                      <div className="text-left">
                        <div>{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Slippage Tolerance */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Slippage Tolerance</span>
            <span className="text-sm">{slippage}%</span>
          </div>
          <div className="mt-2 flex space-x-2">
            {["0.1", "0.5", "1.0", "3.0"].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`py-1 px-3 rounded-lg text-sm ${
                  slippage === value
                    ? "bg-saturn text-white"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>

        {/* Swap Button */}
        <Button 
          className="w-full cosmic-button" 
          onClick={handleSwapSubmit}
          disabled={!fromAmount || parseFloat(fromAmount) <= 0}
        >
          {!fromAmount 
            ? "Enter an amount" 
            : parseFloat(fromAmount) <= 0 
              ? "Invalid amount" 
              : "Swap Tokens"
          }
        </Button>
      </div>
    </div>
  );
};

export default TokenSwapCard;
