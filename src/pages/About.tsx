
import React from "react";
import Navbar from "@/components/Navbar";
import { PenSquare, Heart, Star, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  // You can easily edit this content later as needed
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-primary/10 to-background">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <PenSquare className="h-10 w-10 text-primary mr-2" />
              <span className="text-4xl font-serif font-bold text-foreground">Syahi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Empowering Creative Writers</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A platform dedicated to the art of creative expression through written words.
              Share your stories, poems, and thoughts with a community that appreciates the beauty of language.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/new-writing">Start Writing</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/explore">Explore Writings</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Story</h2>
            
            <div className="prose prose-lg max-w-none">
              {/* You can easily edit this content later */}
              <p>
                Syahi was born from a simple yet powerful idea: to create a space where writers of all levels could share their work, receive feedback, and grow their craft in a supportive community.
              </p>
              
              <p>
                In a world where digital content is often consumed quickly and forgotten, we wanted to build a platform that celebrates the thoughtfulness and artistry of written expression. Whether you're a published author or someone who writes in private moments of inspiration, Syahi welcomes your voice.
              </p>
              
              <p>
                Our name, "Syahi," means "ink" in Hindi—a nod to the timeless tradition of putting pen to paper to capture human experiences, emotions, and imagination. Though we've embraced the digital medium, we honor the essence of writing as one of humanity's most profound forms of communication.
              </p>
              
              <h3 className="text-2xl font-serif font-semibold mt-8 mb-4">Our Mission</h3>
              
              <p>
                At Syahi, we believe that everyone has stories worth telling and perspectives worth sharing. Our mission is to:
              </p>
              
              <ul>
                <li>Provide a platform where writers can publish their work with pride</li>
                <li>Foster a community that offers constructive feedback and encouragement</li>
                <li>Celebrate diverse voices and styles across all forms of creative writing</li>
                <li>Make the joy of both writing and reading accessible to everyone</li>
              </ul>
              
              <h3 className="text-2xl font-serif font-semibold mt-8 mb-4">Join Our Community</h3>
              
              <p>
                Whether you're here to share your writing, discover new voices, or simply enjoy the beauty of words, we're delighted to have you as part of the Syahi community. Create an account to start sharing your work, or browse our collection of writings to find inspiration.
              </p>
              
              <p>
                We believe that words have power—to move, to heal, to connect, and to transform. Thank you for being part of this journey with us.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-8 bg-secondary/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Why Choose Syahi?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <PenSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Publishing</h3>
                <p className="text-muted-foreground">Share your writings with just a few clicks in a beautiful, distraction-free environment</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Feedback</h3>
                <p className="text-muted-foreground">Receive thoughtful ratings and comments to help improve your craft</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Supportive Community</h3>
                <p className="text-muted-foreground">Connect with fellow writers who share your passion for the written word</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reader Appreciation</h3>
                <p className="text-muted-foreground">Find an audience that values and celebrates your unique voice and perspective</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Syahi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
