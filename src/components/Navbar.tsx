import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-montserrat font-bold text-2xl text-white">Stealth<span className="text-electric">RDP</span></span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-white hover:text-electric transition-colors">Home</Link>
          <Link to="/plans" className="text-white hover:text-electric transition-colors">Plans</Link>
          <Link to="/features" className="text-white hover:text-electric transition-colors">Features</Link>
          <Link 
            to="/server-status" 
            className="text-white hover:text-electric transition-colors"
          >
            Server Status
          </Link>
          <Link to="/blog" className="text-white hover:text-electric transition-colors">Blog</Link>
          <Link to="/faq" className="text-white hover:text-electric transition-colors">FAQ</Link>
          <Button asChild className="btn-electric">
            <a 
              href="https://dash.stealthrdp.com/index.php?rp=/login" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Client Area
            </a>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-charcoal shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-electric py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/plans" 
              className="text-white hover:text-electric py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Plans
            </Link>
            <Link 
              to="/features" 
              className="text-white hover:text-electric py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/server-status" 
              className="text-white hover:text-electric py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Server Status
            </Link>
            <Link 
              to="/blog" 
              className="text-white hover:text-electric py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/faq" 
              className="text-white hover:text-electric py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <a 
              href="https://stealthrdp.com/dash/index.php?rp=/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-electric py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Client Area
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
