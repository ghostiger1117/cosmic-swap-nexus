
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Mail } from 'lucide-react';

// FAQ categories and questions
const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is SaturnSwaps?",
        answer: "SaturnSwaps is a decentralized exchange (DEX) platform that enables users to swap tokens, provide liquidity to pools, and earn rewards—all in a non-custodial environment where you maintain full control of your assets."
      },
      {
        question: "How do I connect my wallet?",
        answer: "To connect your wallet, click on the 'Connect Wallet' button in the top right corner of the page. We support multiple wallet providers including MetaMask, WalletConnect, and Coinbase Wallet. Follow the prompts to complete the connection process."
      },
      {
        question: "Which networks does SaturnSwaps support?",
        answer: "SaturnSwaps currently supports Ethereum, Binance Smart Chain, Polygon, Arbitrum, Optimism, Avalanche, and Fantom. We're constantly working to add support for additional networks."
      },
      {
        question: "Is SaturnSwaps safe to use?",
        answer: "SaturnSwaps prioritizes security through rigorous smart contract audits, transparent operations, and best-in-class security practices. However, as with all DeFi protocols, users should conduct their own research and never invest more than they can afford to lose."
      }
    ]
  },
  {
    category: "Trading & Swapping",
    questions: [
      {
        question: "How do token swaps work?",
        answer: "Token swaps on SaturnSwaps utilize automated market maker (AMM) technology. When you swap tokens, you're trading with a liquidity pool rather than directly with another person. The price is determined by the ratio of assets in the pool, following the constant product formula (x * y = k)."
      },
      {
        question: "What is slippage and how does it affect my trades?",
        answer: "Slippage is the difference between the expected price of a trade and the actual executed price. It occurs due to market volatility and transaction timing. You can set your slippage tolerance in the swap interface to control the maximum acceptable price change."
      },
      {
        question: "Why did my transaction fail?",
        answer: "Transactions can fail for several reasons, including insufficient gas, high network congestion, slippage tolerance set too low, or smart contract restrictions. Check your transaction details in your wallet or a blockchain explorer for specific error messages."
      },
      {
        question: "Can I cancel a pending transaction?",
        answer: "You cannot directly cancel a pending transaction, but you can attempt to replace it by sending another transaction with the same nonce and higher gas price. Some wallets offer a 'speed up' or 'cancel' feature that automates this process."
      }
    ]
  },
  {
    category: "Liquidity Pools",
    questions: [
      {
        question: "What are liquidity pools?",
        answer: "Liquidity pools are collections of tokens locked in smart contracts that provide liquidity for trading on the platform. When you add liquidity, you deposit an equal value of two tokens and receive LP tokens in return, representing your share of the pool."
      },
      {
        question: "How do I earn from providing liquidity?",
        answer: "Liquidity providers earn a portion of the trading fees generated by the pool proportional to their share. For example, if you provide 1% of a pool's liquidity, you'll receive 1% of the fees generated by trades in that pool."
      },
      {
        question: "What is impermanent loss?",
        answer: "Impermanent loss occurs when the price ratio of tokens in a pool changes compared to when you deposited them. If one token's price increases significantly relative to the other, you may have less value than if you had simply held the tokens. The loss is 'impermanent' because it can decrease if prices return to their original ratio."
      },
      {
        question: "How do I withdraw my liquidity?",
        answer: "To withdraw liquidity, navigate to the Pools section, find your position, and click 'Remove Liquidity'. You'll be able to specify how much of your position you want to withdraw, and your LP tokens will be burned in exchange for the underlying assets."
      }
    ]
  },
  {
    category: "Fees & Rewards",
    questions: [
      {
        question: "What fees does SaturnSwaps charge?",
        answer: "SaturnSwaps charges a 0.3% fee on all trades, which is distributed as follows: 0.25% goes to liquidity providers, and 0.05% goes to the protocol treasury for development and operational expenses."
      },
      {
        question: "Are there gas fees for transactions?",
        answer: "Yes, all blockchain transactions require gas fees paid to the network miners/validators, not to SaturnSwaps. These fees vary based on network congestion and complexity of the transaction."
      },
      {
        question: "How are APR/APY calculated for liquidity pools?",
        answer: "Annual Percentage Rate (APR) represents the annualized return based on current trading volume and fees. It's calculated using recent fee earnings extrapolated to a yearly timeframe, adjusted for your share of the pool."
      },
      {
        question: "Will there be a SaturnSwaps token?",
        answer: "Yes, we plan to launch the SAT governance token in Q4 2025, which will enable community governance, staking rewards, and additional utility within the SaturnSwaps ecosystem."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "How do I report a bug or issue?",
        answer: "You can report bugs or technical issues through our support form on the website, or by reaching out through our official Discord or Telegram channels. Please provide detailed information including your wallet address, transaction hash, and steps to reproduce the issue."
      },
      {
        question: "Where can I find the smart contract addresses?",
        answer: "All official smart contract addresses are listed in the 'Contracts' section of our documentation. Always verify contract addresses against our official sources to protect yourself from scams."
      },
      {
        question: "Is SaturnSwaps open source?",
        answer: "Yes, SaturnSwaps is committed to transparency and open-source development. Our core contracts and frontend code are publicly available on GitHub, allowing for community review and contributions."
      },
      {
        question: "How can I suggest a new feature?",
        answer: "Feature suggestions are welcome through our community forums, Discord channel, or by submitting a GitHub issue. Once the governance system is live, users will also be able to create formal improvement proposals."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query === '') {
      setFilteredFAQs(faqData);
      return;
    }
    
    const filtered = faqData.map(category => ({
      category: category.category,
      questions: category.questions.filter(q => 
        q.question.toLowerCase().includes(query) || 
        q.answer.toLowerCase().includes(query)
      )
    })).filter(category => category.questions.length > 0);
    
    setFilteredFAQs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about SaturnSwaps, or reach out to our support team 
              if you need additional help.
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10 bg-white/5 border-white/10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          {/* FAQ Categories */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {faqData.map((category, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="border-white/10 hover:bg-white/5 min-h-[60px]"
                  onClick={() => {
                    const element = document.getElementById(category.category.replace(/\s+/g, '-').toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {category.category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* FAQ Content */}
          <div className="space-y-16">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, index) => (
                category.questions.length > 0 && (
                  <div 
                    key={index} 
                    id={category.category.replace(/\s+/g, '-').toLowerCase()}
                    className="scroll-mt-24"
                  >
                    <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                    <div className="cosmic-card">
                      <Accordion type="single" collapsible className="divide-y divide-white/10">
                        {category.questions.map((item, i) => (
                          <AccordionItem key={i} value={`item-${index}-${i}`} className="border-none">
                            <AccordionTrigger className="py-5 px-6 hover:no-underline hover:bg-white/5">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-5 pt-0 text-muted-foreground">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                )
              ))
            ) : (
              <div className="cosmic-card p-10 text-center">
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any answers matching your search. Try different keywords or 
                  contact our support team for assistance.
                </p>
                <Button className="cosmic-button">Contact Support</Button>
              </div>
            )}
          </div>
          
          {/* Contact Section */}
          <div className="mt-16">
            <div className="cosmic-card p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                  <p className="text-muted-foreground mb-6">
                    If you couldn't find the answer you were looking for, feel free to reach out to our support team. 
                    We're here to help 24/7.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-saturn/20 flex items-center justify-center text-saturn-light flex-shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Send us an email at{" "}
                          <a href="mailto:support@saturnswaps.com" className="text-saturn-light hover:underline">
                            support@saturnswaps.com
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-saturn/20 flex items-center justify-center text-saturn-light flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Live Chat</h3>
                        <p className="text-sm text-muted-foreground">
                          Chat with our support team directly from our website during business hours.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-saturn/20 flex items-center justify-center text-saturn-light flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4M12 16h.01" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Knowledge Base</h3>
                        <p className="text-sm text-muted-foreground">
                          Browse our extensive documentation and tutorials for in-depth guidance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cosmic-card border border-white/10 p-6">
                  <h3 className="text-lg font-medium mb-4">Subscribe to Updates</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Stay informed about new features, security updates, and important announcements.
                  </p>
                  <div className="space-y-4">
                    <Input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="bg-white/5 border-white/10"
                    />
                    <Button className="w-full cosmic-button flex items-center justify-center space-x-2">
                      <span>Subscribe</span>
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    By subscribing, you agree to receive updates from SaturnSwaps. You can unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
