
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, PenSquare, LogIn } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };
  
  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <PenSquare className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-serif font-bold text-foreground">Syahi</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/explore" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">Explore</Link>
            <Link to="/about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">About</Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-2">
            <Button variant="outline" onClick={openLoginModal} className="flex items-center gap-1">
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Button>
            <Button onClick={openRegisterModal}>Sign Up</Button>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent">Home</Link>
            <Link to="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent">Explore</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent">About</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-4 space-y-2">
              <Button variant="outline" onClick={openLoginModal} className="w-full justify-center">Login</Button>
              <Button onClick={openRegisterModal} className="w-full justify-center">Sign Up</Button>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        mode={authModalMode}
        onModeChange={setAuthModalMode}
      />
    </nav>
  );
};

export default Navbar;
