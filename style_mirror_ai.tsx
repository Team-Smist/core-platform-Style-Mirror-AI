import { useEffect, useState, type ComponentType, type HTMLAttributes, type PropsWithChildren } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Shirt, 
  Cpu, 
  Monitor, 
  Maximize, 
  RefreshCcw, 
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Zap,
  Globe,
  Database,
  Layers,
  Sparkles,
  ShoppingCart,
  TrendingUp,
  Users
} from 'lucide-react';

/* =======================================================================
   THEME CONFIGURATION
   ======================================================================= */
// Using Tailwind classes primarily, but keeping standard color codes in mind:
// Primary: #2563EB (blue-600)
// Secondary: #1E40AF (blue-800)
// Accent: #38BDF8 (sky-400)
// Background: #0F172A (slate-900)
// Cards: #1E293B (slate-800)

/* =======================================================================
   DUMMY DATA
   ======================================================================= */
const DUMMY_CLOTHES = [
  { id: 'c1', name: 'Classic White Tee', category: 'T-Shirts', price: '$25.00', color: 'White', brand: 'StyleBasics', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80', overlay: 'https://via.placeholder.com/400x500/ffffff/000000?text=White+Tee+Overlay' },
  { id: 'c2', name: 'Urban Denim Jacket', category: 'Jackets', price: '$89.99', color: 'Blue', brand: 'DenimCo', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80', overlay: 'https://via.placeholder.com/400x500/3b82f6/ffffff?text=Denim+Jacket+Overlay' },
  { id: 'c3', name: 'Athletic Hoodie', category: 'Hoodies', price: '$55.00', color: 'Gray', brand: 'FitWear', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80', overlay: 'https://via.placeholder.com/400x500/9ca3af/ffffff?text=Hoodie+Overlay' },
  { id: 'c4', name: 'Summer Floral Dress', category: 'Dress', price: '$65.00', color: 'Multi', brand: 'Breeze', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80', overlay: 'https://via.placeholder.com/400x600/f472b6/ffffff?text=Dress+Overlay' },
  { id: 'c5', name: 'Slim Fit Chinos', category: 'Pants', price: '$45.00', color: 'Khaki', brand: 'StyleBasics', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80', overlay: 'https://via.placeholder.com/400x500/d97706/ffffff?text=Pants+Overlay' },
  { id: 'c6', name: 'Plaid Flannel Shirt', category: 'Shirts', price: '$35.00', color: 'Red/Black', brand: 'LumberJack', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=500&q=80', overlay: 'https://via.placeholder.com/400x500/ef4444/ffffff?text=Flannel+Overlay' },
];

const CATEGORIES = ['All', 'T-Shirts', 'Shirts', 'Jackets', 'Hoodies', 'Dress', 'Pants'];

const TEAM_MEMBERS = [
  { id: 't1', name: 'Ishara Kariyawasam', role: 'Group Leader / AI Specialist', github: '#', linkedin: '#' },
  { id: 't2', name: 'Madhura Ravishan Abeywickrama', role: 'DevOps & Backend Engineer', github: '#', linkedin: '#' },
  { id: 't3', name: 'Sithira Randula Jayasekara', role: 'Frontend Engineer', github: '#', linkedin: '#' },
  { id: 't4', name: 'Sahanmi Wijesiriwardhana', role: 'QA & Business Analyst', github: '#', linkedin: '#' },
  { id: 't5', name: 'Thiseni Nudara', role: 'UX/UI Designer', github: '#', linkedin: '#' },
];

type Garment = (typeof DUMMY_CLOTHES)[number];
type Category = (typeof CATEGORIES)[number];
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type IconComponent = ComponentType<{ className?: string; size?: number }>;

type GlassCardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
type SectionTitleProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};
type AnimatedButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  icon?: IconComponent;
  to?: string;
}>;

/* =======================================================================
   REUSABLE COMPONENTS
   ======================================================================= */

// --- Layout Components ---

const GlassCard = ({ children, className = '', ...props }: GlassCardProps) => (
  <div 
    className={`bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl ${className}`}
    {...props}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, centered = true }: SectionTitleProps) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-300 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const AnimatedButton = ({ children, onClick, variant = 'primary', className = '', icon: Icon, to }: AnimatedButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 group";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "bg-transparent border-2 border-sky-400 text-sky-400 hover:bg-sky-400/10"
  };

  const content = (
    <>
      {children}
      {Icon && <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${baseStyles} ${variants[variant]} ${className}`}
        >
          {content}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
};

// --- Navigation ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Demo', path: '/demo' },
    { name: 'Technology', path: '/technology' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all">
              <Camera className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Style Mirror<span className="text-sky-400">.ai</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-sky-400' : 'text-slate-300 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <AnimatedButton to="/demo" variant="primary" className="py-2 px-4 text-sm">
              Try Demo
            </AnimatedButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${location.pathname === link.path ? 'text-sky-400' : 'text-slate-300'}`}
                >
                  {link.name}
                </Link>
              ))}
              <AnimatedButton to="/demo" variant="primary" className="w-full mt-4" onClick={() => setIsOpen(false)}>
                Try Demo Now
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Camera className="text-sky-400 w-8 h-8" />
            <span className="text-2xl font-bold text-white">Style Mirror<span className="text-sky-400">.ai</span></span>
          </Link>
          <p className="text-slate-400 max-w-sm mb-6">
            Experience AI-powered virtual clothing try-on directly from your browser. See yourself before you buy.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-all"><Github size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-all"><Linkedin size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-all"><Mail size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li><Link to="/features" className="text-slate-400 hover:text-sky-400 transition-colors">Features</Link></li>
            <li><Link to="/technology" className="text-slate-400 hover:text-sky-400 transition-colors">Technology</Link></li>
            <li><Link to="/roadmap" className="text-slate-400 hover:text-sky-400 transition-colors">Roadmap</Link></li>
            <li><Link to="/demo" className="text-slate-400 hover:text-sky-400 transition-colors">Live Demo</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-slate-400 hover:text-sky-400 transition-colors">About Us</Link></li>
            <li><Link to="/about" className="text-slate-400 hover:text-sky-400 transition-colors">Team Smits</Link></li>
            <li><Link to="/contact" className="text-slate-400 hover:text-sky-400 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 text-sm">© 2026 Style Mirror AI by Team Smits. All rights reserved.</p>
        <p className="text-slate-500 text-sm mt-2 md:mt-0">University of Moratuwa - Software Engineering Project</p>
      </div>
    </div>
  </footer>
);

/* =======================================================================
   PAGES
   ======================================================================= */

// --- 1. Landing Page ---
const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>AI-Powered Virtual Fitting Room v1.0</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                See Yourself <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                  Before You Buy.
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
                Experience the future of fashion e-commerce. Use your webcam to virtually try on clothes in real-time with our advanced AI body detection technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton to="/demo" icon={ArrowRight}>
                  Try Virtual Mirror
                </AnimatedButton>
                <AnimatedButton to="/about" variant="outline">
                  Meet The Team
                </AnimatedButton>
              </div>
              
              <div className="mt-12 flex items-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2"><Zap size={16} className="text-yellow-400"/> Real-time Processing</div>
                <div className="flex items-center gap-2"><Monitor size={16} className="text-sky-400"/> Web-Based</div>
                <div className="flex items-center gap-2"><Users size={16} className="text-blue-400"/> 10k+ Try-ons</div>
              </div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/5] md:aspect-square max-w-lg mx-auto">
                {/* Main Mirror Frame */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-slate-700 to-slate-900 p-1 shadow-2xl shadow-blue-900/50">
                  <div className="absolute inset-0 rounded-[2.4rem] overflow-hidden bg-slate-800 relative group">
                    {/* Simulated Camera Feed */}
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" alt="Person looking in mirror" className="w-full h-full object-cover opacity-80" />
                    
                    {/* UI Overlay Simulation */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2 text-xs text-white">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Camera
                    </div>
                    
                    {/* Scanning Animation */}
                    <motion.div 
                      animate={{ y: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.8)] z-10"
                    />

                    {/* AI Bounding Boxes */}
                    <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/3 border-2 border-dashed border-sky-400/50 rounded-xl" />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 top-20 bg-slate-800 border border-slate-700 p-3 rounded-2xl shadow-xl flex items-center gap-3"
                >
                  <img src={DUMMY_CLOTHES[0].image} alt="Tee" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-white text-sm font-bold">Classic Tee</p>
                    <p className="text-sky-400 text-xs">Selected</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-8 bottom-32 bg-slate-800 border border-slate-700 p-3 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-2 text-sky-400 font-medium text-sm">
                    <Cpu size={16} /> AI Active
                  </div>
                  <div className="mt-2 w-24 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="h-full bg-sky-400"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 max-w-7xl py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Latency', value: '< 50ms' },
              { label: 'Accuracy', value: '98.5%' },
              { label: 'Clothing Items', value: '500+' },
              { label: 'Happy Users', value: '10k+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works preview */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionTitle 
            title="How It Works" 
            subtitle="Three simple steps to transform your online shopping experience."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Camera, title: "1. Turn on Camera", desc: "Allow browser access to your webcam. Your video is processed locally and never stored." },
              { icon: Cpu, title: "2. AI Detection", desc: "Our computer vision model instantly detects your body landmarks and posture." },
              { icon: Shirt, title: "3. Virtual Try-On", desc: "Select clothes from the catalog and watch them seamlessly overlay on your body in real-time." }
            ].map((step, i) => (
              <GlassCard key={i} className="p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 text-sky-400">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to see the future?</h2>
          <p className="text-xl text-slate-300 mb-10">Stop guessing your size. Start experiencing virtual fashion today.</p>
          <AnimatedButton to="/demo" className="text-lg px-8 py-4 mx-auto">
            Launch Virtual Fitting Room
          </AnimatedButton>
        </div>
      </section>
    </div>
  );
};

// --- 2. About Page ---
const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Mission Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold text-white mb-6">About Style Mirror AI</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We are revolutionizing online fashion retail by bridging the gap between digital browsing and physical fitting rooms using advanced Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-6">The Problem</h2>
            <p className="text-slate-300 mb-4 text-lg leading-relaxed">
              Online shopping has a major flaw: <strong>you can't try it on.</strong> This leads to high return rates, customer dissatisfaction, and massive environmental waste from return shipping.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Current size charts are confusing, and static images on models don't represent how a garment will look on different body types.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-sky-400 opacity-20 blur-xl rounded-full" />
            <GlassCard className="p-8 relative">
              <h2 className="text-3xl font-bold text-white mb-6">Our Solution</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                Style Mirror AI uses browser-based computer vision to map clothing onto your body in real-time. 
              </p>
              <ul className="space-y-4">
                {[
                  "No app installation required",
                  "100% private - processing happens on your device",
                  "Instant visual feedback before purchasing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-blue-600/30 flex items-center justify-center text-sky-400">
                      <ChevronRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>

        {/* Team Section */}
        <SectionTitle 
          title="Meet Team Smits" 
          subtitle="The engineering minds behind Style Mirror AI from the University of Moratuwa."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 text-center group hover:border-sky-400/50 transition-colors">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 mb-4 flex items-center justify-center overflow-hidden">
                   <Users className="text-slate-500 w-10 h-10 group-hover:text-sky-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sky-400 text-sm mb-6">{member.role}</p>
                
                <div className="flex justify-center gap-3">
                  <a href={member.github} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"><Github size={16} /></a>
                  <a href={member.linkedin} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"><Linkedin size={16} /></a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. Features Page ---
const Features = () => {
  const features = [
    { icon: Camera, title: "Real-Time Camera Feed", desc: "Access webcam streams directly in the browser with ultra-low latency." },
    { icon: Users, title: "Body Detection", desc: "Identifies human presence and isolates the subject from the background." },
    { icon: Layers, title: "Virtual Clothes Overlay", desc: "Dynamically superimposes 2D clothing assets over the user's video feed." },
    { icon: Cpu, title: "AI Landmark Detection", desc: "Maps 33 pose landmarks (shoulders, hips, etc.) to align garments perfectly." },
    { icon: Maximize, title: "Mirror Preview", desc: "Flippable interface acting as a true digital mirror for natural interaction." },
    { icon: TrendingUp, title: "Size Adjustment", desc: "Auto-scales clothing assets based on distance from the camera." },
    { icon: Monitor, title: "Responsive Interface", desc: "Works seamlessly across desktop and tablet browsers." },
    { icon: Zap, title: "Fast Processing", desc: "Optimized WebGL rendering ensures smooth 30+ FPS performance." },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionTitle 
          title="Core Features" 
          subtitle="Everything you need for a seamless virtual fitting experience."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="p-6 h-full hover:bg-slate-800/80 transition-all group">
                <feat.icon className="w-10 h-10 text-sky-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm">{feat.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 4. Technology Page ---
const Technology = () => {
  const stack = [
    { 
      category: "Frontend", 
      icon: Monitor, 
      color: "from-cyan-500 to-blue-500",
      items: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"] 
    },
    { 
      category: "AI & Vision", 
      icon: Cpu, 
      color: "from-purple-500 to-pink-500",
      items: ["MediaPipe Pose", "TensorFlow.js", "OpenCV", "WebGL"] 
    },
    { 
      category: "Backend (Planned)", 
      icon: Database, 
      color: "from-green-500 to-emerald-500",
      items: ["Node.js / Express", "Python FastAPI", "MongoDB", "Firebase Auth"] 
    },
    { 
      category: "Infrastructure", 
      icon: Globe, 
      color: "from-orange-500 to-red-500",
      items: ["Vercel", "GitHub Actions (CI/CD)", "Docker", "Render"] 
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionTitle 
          title="Technology Stack" 
          subtitle="Built with modern, scalable, and high-performance technologies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {stack.map((tech, i) => (
            <GlassCard key={i} className="p-8 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tech.color} opacity-10 rounded-bl-full`} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center`}>
                  <tech.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">{tech.category}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {tech.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 5. Roadmap Page ---
const Roadmap = () => {
  const phases = [
    {
      version: "Phase 1: MVP (Current)",
      status: "active",
      items: ["Real-time camera feed integration", "Basic 2D clothing overlay", "MediaPipe body landmark detection", "Responsive UI implementation"]
    },
    {
      version: "Phase 2: Enhancement",
      status: "upcoming",
      items: ["AI-based size recommendations", "Basic shopping cart integration", "User wishlists", "Improved garment scaling"]
    },
    {
      version: "Phase 3: Advanced",
      status: "future",
      items: ["3D clothing simulation", "Cloth physics (gravity/movement)", "Personalized avatar generation", "Background removal"]
    },
    {
      version: "Phase 4: Ecosystem",
      status: "future",
      items: ["Full E-commerce API integration", "Mobile App (React Native)", "AR glasses support", "Retailer dashboard & analytics"]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle 
          title="Future Roadmap" 
          subtitle="Our vision for the evolution of Style Mirror AI."
        />

        <div className="mt-16 space-y-8">
          {phases.map((phase, i) => (
            <div key={i} className="flex gap-6">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${phase.status === 'active' ? 'bg-sky-400 shadow-[0_0_10px_#38bdf8]' : 'bg-slate-700'}`} />
                {i !== phases.length - 1 && <div className={`w-0.5 h-full my-2 ${phase.status === 'active' ? 'bg-sky-400/50' : 'bg-slate-800'}`} />}
              </div>
              
              {/* Content */}
              <GlassCard className="flex-1 p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{phase.version}</h3>
                  {phase.status === 'active' && (
                     <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-bold rounded-full uppercase">In Progress</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-300">
                      <ChevronRight className={`w-5 h-5 mt-0.5 flex-shrink-0 ${phase.status === 'active' ? 'text-sky-400' : 'text-slate-600'}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 6. Contact Page ---
const Contact = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-4xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-slate-400 mb-10 text-lg">
              Have questions about the project, want to collaborate, or see a full demonstration? Reach out to Team Smits.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-white">Location</h4>
                  <p>University of Moratuwa, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email</h4>
                  <p>smistsoftwareproject@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">First Name</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Last Name</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <AnimatedButton className="w-full mt-4" icon={MessageSquare}>
                Send Message
              </AnimatedButton>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

// --- 7. Virtual Try-On Demo Page ---
const VirtualDemo = () => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [mirrorMode, setMirrorMode] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  // Filter clothes based on category
  const filteredClothes = selectedCategory === 'All' 
    ? DUMMY_CLOTHES 
    : DUMMY_CLOTHES.filter(c => c.category === selectedCategory);

  const startCamera = () => {
    setLoading(true);
    // Simulate camera/AI loading delay
    setTimeout(() => {
      setCameraActive(true);
      setLoading(false);
    }, 1500);
  };

  const stopCamera = () => {
    setCameraActive(false);
    setSelectedGarment(null);
    setShowOverlay(false);
  };

  const handleSelectGarment = (garment: Garment) => {
    if (!cameraActive) {
      alert("Please enable the camera first!");
      return;
    }
    
    // Simulate AI processing delay for applying garment
    setShowOverlay(false);
    setSelectedGarment(garment);
    setTimeout(() => setShowOverlay(true), 600);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col">
      {/* Demo Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-4 px-6 z-20">
        <div className="container mx-auto max-w-[1600px] flex items-center justify-between">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
             Virtual Try-On Studio <span className="px-2 py-0.5 bg-blue-600 text-xs rounded uppercase ml-2">Beta Simulation</span>
          </h1>
          <div className="flex items-center gap-4">
            {cameraActive && (
              <>
                <button 
                  onClick={() => setMirrorMode(!mirrorMode)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800"
                >
                  <RefreshCcw size={16} /> {mirrorMode ? 'Mirror: ON' : 'Mirror: OFF'}
                </button>
                <AnimatedButton variant="secondary" className="!py-1.5 !px-4 text-sm" onClick={stopCamera}>
                  Stop Camera
                </AnimatedButton>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto max-w-[1600px] p-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* Left: Camera/Mirror Area */}
        <div className="flex-1 h-full relative rounded-2xl overflow-hidden bg-black border border-slate-800 flex flex-col">
          {!cameraActive ? (
            // Camera Off State
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                <Camera className="w-10 h-10 text-slate-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Camera is Off</h2>
              <p className="text-slate-400 max-w-md mb-8">
                Click the button below to enable your webcam and start the virtual fitting simulation. Your video is not recorded.
              </p>
              <AnimatedButton 
                onClick={startCamera} 
                className="px-8"
              >
                {loading ? 'Initializing AI Models...' : 'Enable Camera'}
              </AnimatedButton>
            </div>
          ) : (
            // Camera On State (Simulated)
            <div className="relative flex-1 bg-slate-900 overflow-hidden">
              {/* Simulated Video Feed (Using a stock photo of a person for demo purposes) */}
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" 
                alt="Simulated Camera" 
                className={`w-full h-full object-cover transition-transform duration-300 ${mirrorMode ? '-scale-x-100' : ''}`}
              />
              
              {/* AI UI Overlays */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-lg p-3 text-xs font-mono text-sky-400 space-y-1">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> AI Engine: Active</div>
                <div>FPS: 32</div>
                <div>Landmarks: Detected (33)</div>
              </div>

              {/* Garment Overlay (Simulated) */}
              <AnimatePresence>
                {selectedGarment && showOverlay && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    {/* In a real app, this would be mapped precisely using canvas. 
                        Here we simulate it with an absolute positioned image */}
                    <div className="relative w-[60%] h-[70%] max-w-md mix-blend-multiply">
                       {/* Simulating the clothing fitting over the body */}
                       <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${selectedGarment.overlay})`, opacity: 0.8 }} />
                       
                       {/* Bounding box simulation */}
                       <div className="absolute inset-0 border border-sky-400/50 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] px-2 py-0.5 rounded">Fitted: {selectedGarment.name}</div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading State for changing clothes */}
              {selectedGarment && !showOverlay && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                   <div className="flex flex-col items-center">
                     <div className="w-10 h-10 border-4 border-slate-600 border-t-sky-400 rounded-full animate-spin mb-4" />
                     <p className="text-white font-medium">Aligning garment to body...</p>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Wardrobe Panel */}
        <GlassCard className="w-full lg:w-[450px] h-full flex flex-col rounded-2xl overflow-hidden border-slate-700">
          <div className="p-4 border-b border-slate-700 bg-slate-800/80">
            <h3 className="font-bold text-white text-lg mb-4">Virtual Wardrobe</h3>
            
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clothes Grid */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50">
            <div className="grid grid-cols-2 gap-4">
              {filteredClothes.map(garment => (
                <motion.div
                  key={garment.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSelectGarment(garment)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    selectedGarment?.id === garment.id ? 'border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="h-40 bg-slate-800 relative group">
                    <img src={garment.image} alt={garment.name} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                    {selectedGarment?.id === garment.id && (
                      <div className="absolute top-2 right-2 bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Trying On
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-slate-800">
                    <p className="text-xs text-sky-400 font-semibold mb-1">{garment.brand}</p>
                    <h4 className="text-white text-sm font-bold truncate">{garment.name}</h4>
                    <p className="text-slate-400 text-sm mt-1">{garment.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredClothes.length === 0 && (
              <div className="text-center text-slate-500 mt-10">
                No items found in this category.
              </div>
            )}
          </div>

          {/* Checkout/Action Area */}
          <div className="p-4 border-t border-slate-700 bg-slate-800/80">
             {selectedGarment ? (
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-slate-400">Currently wearing:</p>
                   <p className="font-bold text-white truncate max-w-[200px]">{selectedGarment.name}</p>
                 </div>
                 <AnimatedButton variant="primary" className="!py-2 !px-4 text-sm" icon={ShoppingCart}>
                   Buy Now
                 </AnimatedButton>
               </div>
             ) : (
               <p className="text-sm text-slate-400 text-center py-2">
                 Select an item from the wardrobe to try it on.
               </p>
             )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// --- 8. NotFound Page ---
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-800">404</h1>
    <h2 className="text-3xl font-bold text-white mt-4 mb-6">Page Not Found</h2>
    <p className="text-slate-400 mb-8 max-w-md">The virtual room you are looking for doesn't exist or has been moved.</p>
    <AnimatedButton to="/">Return Home</AnimatedButton>
  </div>
);

/* =======================================================================
   MAIN APP COMPONENT
   ======================================================================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-sky-500/30 selection:text-sky-200">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/demo" element={<VirtualDemo />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Hide footer on Demo page for app-like feel */}
        <Routes>
          <Route path="/demo" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}