
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero = ({ onRegisterClick }: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 ink-pattern opacity-10"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Explore Writings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
