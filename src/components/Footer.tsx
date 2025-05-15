import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="font-montserrat font-bold text-2xl text-white">
                Stealth<span className="text-electric">RDP</span>
              </span>
            </Link>
            <p className="text-gray-400 mt-4">
              Enterprise-grade remote desktop infrastructure with unmatched security and performance.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-montserrat font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/plans" className="text-gray-400 hover:text-electric transition-colors">RDP Plans</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-electric transition-colors">Features</Link></li>
              <li><Link to="/enterprise" className="text-gray-400 hover:text-electric transition-colors">Enterprise</Link></li>
              <li><Link to="/plans" className="text-gray-400 hover:text-electric transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-montserrat font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://docs.stealthrdp.com/hc/stealth-rdp-docs/en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors">Documentation</a></li>
              <li><a href="https://docs.stealthrdp.com/hc/stealth-rdp-docs/en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors">Tutorials</a></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-electric transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-electric transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-montserrat font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-electric transition-colors">About Us</Link></li>
              <li><a href="https://dash.stealthrdp.com/submitticket.php" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors">Contact Support</a></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-electric transition-colors">Privacy Policy</Link></li>
              <li><a href="https://docs.stealthrdp.com/hc/stealth-rdp-docs/en/categories/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Secure Checkout Section */}
        {/* <div className="mt-8 flex justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md mx-auto">
            <div className="text-center border-b border-gray-200 pb-2 mb-3">
              <p className="text-gray-700 font-montserrat text-sm font-semibold">Guaranteed Safe Checkout</p>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://i.imgur.com/QZJjFmv.png" 
                alt="Secure payment methods: Visa, Mastercard, American Express, Discover, Shop Pay, Apple Pay, Google Pay" 
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
         */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} StealthRDP. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* X/Twitter */}
            <a href="https://x.com/stealthrdp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            
            {/* Instagram */}
            <a href="https://www.instagram.com/stealth_rdp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
              </svg>
            </a>
            
            {/* Discord */}
            <a href="https://discord.gg/9JJFs4DDyF" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors" aria-label="Discord">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
              </svg>
            </a>
            
            {/* Telegram */}
            <a href="https://t.me/StealthRDP" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors" aria-label="Telegram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
