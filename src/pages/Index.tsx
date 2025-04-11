
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import AuthModal from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { Book, Star, MessageCircle, Users } from 'lucide-react';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');
  
  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const features = [
    {
      icon: <Book className="h-6 w-6" />,
      title: "Share Your Writings",
      description: "Publish your poems, stories, and other creative writings to a community of passionate readers."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Ratings & Feedback",
      description: "Receive honest ratings and constructive feedback to help you grow as a writer."
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Engaging Comments",
      description: "Engage in meaningful discussions about your work with readers and fellow writers."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community",
      description: "Join a supportive community of creators who share your passion for the written word."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero onRegisterClick={openRegisterModal} />
        
        <section className="py-16 px-4 md:px-8 bg-accent/50">
          <div className="max-w-7xl mx-auto">
            <div className="mx-auto max-w-2xl mb-12">
              <h2 className="text-3xl font-serif font-bold text-center mb-4">Why Join Syahi?</h2>
              <div className="h-1 w-24 bg-primary mx-auto rounded"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 ink-pattern opacity-10"></div>
          <div className="book-cover relative max-w-3xl mx-auto border border-primary/30 p-8 rounded-lg bg-background shadow-lg">
            <div className="book-spine absolute left-0 top-0 bottom-0 w-4 -ml-4 bg-primary rounded-l-lg hidden md:block"></div>
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold mb-6">Start Your Writing Journey Today</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of writers who have found their voice on Syahi.
                It's free to sign up and start sharing your work with the world.
              </p>
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg"
                asChild
              >
                <Link to="/new-writing">Create Your Account</Link>
              </Button>
            </div>
            <div className="page-curl"></div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Syahi. All rights reserved.</p>
        </div>
      </footer>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        mode={authModalMode}
        onModeChange={setAuthModalMode}
      />
    </div>
  );
};

export default Index;
