
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import AuthModal from '@/components/AuthModal';
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
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Why Join Syahi?</h2>
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
        
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Start Your Writing Journey Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of writers who have found their voice on Syahi.
              It's free to sign up and start sharing your work with the world.
            </p>
            <button
              onClick={openRegisterModal}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Create Your Account
            </button>
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
