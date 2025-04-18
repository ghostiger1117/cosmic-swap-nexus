
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from 'lucide-react';
import SaturnLogo from './SaturnLogo';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Temporary state until Supabase integration

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const connectWallet = () => {
    setIsWalletConnected(true);
    console.log("Wallet connection requested");
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    console.log("Wallet disconnected");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    console.log("Sign out requested");
  };

  return (
    <nav className="py-4 px-4 md:px-8 relative z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <SaturnLogo className="w-10 h-10" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gold-gradient">
            SaturnSwaps
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/" className="px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
            Home
          </Link>
          <Link to="/swap" className="px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
            Swap
          </Link>
          <Link to="/pools" className="px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
            Pools
          </Link>
          <Link to="/dashboard" className="px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
            Dashboard
          </Link>
          <Link to="/about" className="px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
            About
          </Link>
          <Link to="/faq" className="px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
            FAQ
          </Link>
          
          {isWalletConnected ? (
            <Button 
              onClick={disconnectWallet}
              className="ml-4 flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10"
            >
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span>0x1a2...3b4c</span>
            </Button>
          ) : (
            <Button 
              onClick={connectWallet} 
              className="ml-4 cosmic-button flex items-center space-x-2"
            >
              <Wallet size={16} />
              <span>Connect Wallet</span>
            </Button>
          )}

          {isSignedIn ? (
            <UserAvatar 
              email="user@example.com"
              onSignOut={handleSignOut}
            />
          ) : (
            <Link to="/signin">
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-saturn-blue/95 backdrop-blur-md py-4 px-4 space-y-3 border-y border-white/10">
          <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            Home
          </Link>
          <Link to="/swap" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            Swap
          </Link>
          <Link to="/pools" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            Pools
          </Link>
          <Link to="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            Dashboard
          </Link>
          <Link to="/about" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            About
          </Link>
          <Link to="/faq" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            FAQ
          </Link>
          
          {isWalletConnected ? (
            <Button 
              onClick={disconnectWallet}
              className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10"
            >
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span>0x1a2...3b4c</span>
            </Button>
          ) : (
            <Button 
              onClick={connectWallet} 
              className="w-full cosmic-button flex items-center justify-center space-x-2"
            >
              <Wallet size={16} />
              <span>Connect Wallet</span>
            </Button>
          )}

          {isSignedIn ? (
            <UserAvatar 
              email="user@example.com"
              onSignOut={handleSignOut}
            />
          ) : (
            <Link to="/signin" className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
