
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="feature-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden relative">
      <CardHeader className="pb-2">
        <div className="bg-primary/10 text-primary p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="font-serif text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <div className="page-curl"></div>
    </Card>
  );
};

export default FeatureCard;
