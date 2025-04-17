
import React from 'react';

interface SaturnLogoProps {
  className?: string;
}

const SaturnLogo: React.FC<SaturnLogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Planet */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saturn-gold/90 to-saturn/90 animate-pulse"></div>
      </div>
      
      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-5 rounded-full border-2 border-saturn-gold/80 transform -rotate-12 animate-rotate-slow"></div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-saturn-gold/20 blur-md animate-glow"></div>
      </div>
    </div>
  );
};

export default SaturnLogo;
