
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Twitter, Instagram, Facebook, Slack, MessageCircle, Send 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SaturnLogo from './SaturnLogo';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Newsletter */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <SaturnLogo className="w-8 h-8" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gold-gradient">
                SaturnSwaps
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The cosmic frontier of decentralized trading. Swap, earn, and build on the 
              intergalactic liquidity protocol.
            </p>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Join our newsletter</h4>
              <div className="flex items-center space-x-2">
                <Input 
                  type="email" 
                  placeholder="cosmic@email.com" 
                  className="bg-white/5 border-white/10"
                />
                <Button variant="outline" size="icon" className="shrink-0">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/swap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Swap
                </Link>
              </li>
              <li>
                <Link to="/pools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pools
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Connect With Us</h4>
            <div className="flex items-center space-x-3">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Slack size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-muted-foreground" />
              <a href="mailto:support@saturnswaps.com" className="text-sm text-muted-foreground hover:text-foreground">
                support@saturnswaps.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2025 SaturnSwaps. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
