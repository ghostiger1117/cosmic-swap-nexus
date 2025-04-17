import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Twitter, Users } from 'lucide-react';

const AboutSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-2xl font-bold mb-6 relative">
      <span className="relative z-10">{title}</span>
      <span className="absolute bottom-0 left-0 h-1 w-12 bg-saturn-gold"></span>
    </h2>
    {children}
  </section>
);

const TeamMember = ({ 
  name, 
  role, 
  image, 
  twitter,
  github
}: { 
  name: string; 
  role: string; 
  image: string;
  twitter?: string;
  github?: string;
}) => (
  <div className="cosmic-card p-6">
    <div className="mb-4 w-20 h-20 mx-auto rounded-full overflow-hidden bg-white/10">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg font-medium text-center">{name}</h3>
    <p className="text-sm text-muted-foreground text-center mb-4">{role}</p>
    <div className="flex justify-center space-x-2">
      {twitter && (
        <a 
          href={twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Twitter size={16} />
        </a>
      )}
      {github && (
        <a 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Github size={16} />
        </a>
      )}
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-clip-text text-transparent bg-gold-gradient">SaturnSwaps</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pioneering the cosmic frontier of decentralized finance with innovative 
              solutions for seamless token swapping and liquidity provision.
            </p>
          </div>
          
          {/* Mission & Vision */}
          <AboutSection title="Our Mission">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p>
                  SaturnSwaps is on a mission to create an accessible, efficient, and secure 
                  decentralized trading platform that empowers users to take control of their 
                  financial future in the evolving crypto ecosystem.
                </p>
                <p>
                  We believe in a world where financial transactions are borderless, trustless, 
                  and accessible to everyone. Our platform is designed to remove barriers to entry 
                  and provide intuitive tools for both beginners and experienced traders.
                </p>
                <p>
                  By prioritizing security, transparency, and user experience, we're building a 
                  sustainable DeFi ecosystem that can grow and adapt to the needs of our community 
                  and the broader blockchain industry.
                </p>
              </div>
              <div className="cosmic-card p-6 flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-medium">Our Core Values</h3>
                <ul className="space-y-3">
                  {[
                    "User Sovereignty - Your keys, your crypto",
                    "Radical Transparency - Open-source code and operations",
                    "Continuous Innovation - Always improving our technology",
                    "Community First - Building for and with our users",
                    "Security By Design - No compromises on safety"
                  ].map((value, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-6 h-6 rounded-full bg-saturn-light/20 flex items-center justify-center text-saturn-light flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AboutSection>
          
          {/* Team */}
          <AboutSection title="Our Team">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg max-w-2xl">
                Meet the innovators, engineers, and visionaries building the future of 
                decentralized finance at SaturnSwaps.
              </p>
              <Button variant="outline" className="border-white/10 hidden md:flex items-center space-x-2">
                <Users size={16} />
                <span>Join Our Team</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <TeamMember 
                name="Alexandria Chen"
                role="Founder & CEO"
                image="/placeholder.svg"
                twitter="https://twitter.com"
                github="https://github.com"
              />
              <TeamMember 
                name="Marcus Johnson"
                role="CTO"
                image="/placeholder.svg"
                twitter="https://twitter.com"
                github="https://github.com"
              />
              <TeamMember 
                name="Sophia Williams"
                role="Lead Developer"
                image="/placeholder.svg"
                github="https://github.com"
              />
              <TeamMember 
                name="David Park"
                role="Head of Product"
                image="/placeholder.svg"
                twitter="https://twitter.com"
              />
            </div>
            <Button variant="outline" className="w-full mt-6 border-white/10 md:hidden flex items-center justify-center space-x-2">
              <Users size={16} />
              <span>Join Our Team</span>
            </Button>
          </AboutSection>
          
          {/* Backers & Partners */}
          <AboutSection title="Backers & Partners">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="mb-6">
                  SaturnSwaps is proudly backed by leading investors in the blockchain space 
                  and collaborates with trusted partners to build a stronger DeFi ecosystem.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="cosmic-card p-4 flex items-center justify-center h-24">
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
                          <span className="text-lg">P{i}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Partner {i}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cosmic-card p-6">
                <h3 className="text-xl font-medium mb-4">Our Achievements</h3>
                <div className="space-y-4">
                  <div className="p-3 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between">
                      <span>Total Value Locked</span>
                      <span className="font-medium">$1.7 Billion</span>
                    </div>
                  </div>
                  <div className="p-3 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between">
                      <span>Transactions Processed</span>
                      <span className="font-medium">12.5 Million+</span>
                    </div>
                  </div>
                  <div className="p-3 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between">
                      <span>Unique Users</span>
                      <span className="font-medium">230,000+</span>
                    </div>
                  </div>
                  <div className="p-3 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between">
                      <span>Supported Chains</span>
                      <span className="font-medium">7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AboutSection>
          
          {/* Roadmap */}
          <AboutSection title="Our Roadmap">
            <div className="cosmic-card p-6">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute top-0 bottom-0 left-3 md:left-1/2 w-0.5 bg-white/10"></div>
                
                <div className="space-y-10">
                  {[
                    {
                      date: "Q1 2025",
                      title: "Platform Launch",
                      description: "Initial release of SaturnSwaps with basic swapping and pool functionality.",
                      status: "completed"
                    },
                    {
                      date: "Q2 2025",
                      title: "Multi-chain Integration",
                      description: "Expansion to additional blockchains and cross-chain swapping capabilities.",
                      status: "in-progress"
                    },
                    {
                      date: "Q3 2025",
                      title: "Advanced Analytics",
                      description: "Release of comprehensive dashboard with portfolio tracking and market insights.",
                      status: "planned"
                    },
                    {
                      date: "Q4 2025",
                      title: "Governance & SAT Token",
                      description: "Introduction of the SAT governance token and community voting system.",
                      status: "planned"
                    },
                    {
                      date: "Q1 2026",
                      title: "Mobile Application",
                      description: "Launch of native mobile apps for iOS and Android platforms.",
                      status: "planned"
                    }
                  ].map((item, i) => (
                    <div key={i} className="relative flex flex-col md:flex-row">
                      {/* Milestone marker */}
                      <div 
                        className={`absolute left-0 md:left-1/2 w-6 h-6 rounded-full -ml-3 md:transform md:-translate-x-1/2 flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'in-progress' ? 'bg-yellow-500' : 'bg-white/20'
                        }`}
                      ></div>
                      
                      <div className="md:w-1/2 md:pr-10 md:text-right ml-10 md:ml-0">
                        {i % 2 === 0 ? (
                          <>
                            <h3 className="text-lg font-medium">{item.title}</h3>
                            <div className="text-sm text-saturn-gold mb-1">{item.date}</div>
                            <p className="text-muted-foreground">{item.description}</p>
                          </>
                        ) : null}
                      </div>
                      <div className="md:w-1/2 md:pl-10 ml-10 md:ml-0">
                        {i % 2 === 1 ? (
                          <>
                            <h3 className="text-lg font-medium">{item.title}</h3>
                            <div className="text-sm text-saturn-gold mb-1">{item.date}</div>
                            <p className="text-muted-foreground">{item.description}</p>
                          </>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AboutSection>
          
          {/* CTA Section */}
          <div className="cosmic-card p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Join the Cosmic Community</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of the SaturnSwaps ecosystem and help shape the future of decentralized finance.
              Join our community channels to stay updated and connect with like-minded enthusiasts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="cosmic-button flex items-center space-x-2">
                <Twitter size={16} />
                <span>Follow on Twitter</span>
              </Button>
              <Button variant="outline" className="border-white/10 flex items-center space-x-2">
                <Github size={16} />
                <span>View on GitHub</span>
              </Button>
              <Button variant="outline" className="border-white/10 flex items-center space-x-2">
                <ExternalLink size={16} />
                <span>Read Documentation</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
