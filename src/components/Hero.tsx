
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PenLine, BookOpen } from "lucide-react";

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero = ({ onRegisterClick }: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 ink-pattern opacity-10"></div>
      <div className="book-cover relative mx-auto max-w-4xl px-6 lg:px-8 py-16 border-2 border-primary/30 rounded-lg bg-accent/30 shadow-lg">
        <div className="book-spine absolute left-0 top-0 bottom-0 w-8 -ml-8 bg-primary rounded-l-lg hidden md:block"></div>
        <div className="book-pages absolute -left-2 top-4 bottom-4 w-4 bg-background/80 border-r border-primary/20 hidden md:block"></div>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Where Words Come To Life
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Syahi is a community of writers and readers. Share your poems, stories, and writings with the world, and discover new voices that resonate with you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={onRegisterClick} size="lg" className="rounded-full px-8">
              <PenLine className="mr-2 h-5 w-5" /> Start Writing
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
              <Link to="/dashboard">
                <BookOpen className="mr-2 h-5 w-5" /> Explore Writings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
