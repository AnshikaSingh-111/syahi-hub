
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine, Book, Bookmark, Settings, Star } from "lucide-react";

// Mock data
const mockWritings = [
  {
    id: "1",
    title: "Whispers of Dawn",
    excerpt: "The morning light cascades through leaves, painting shadows on the dewy grass...",
    type: "poem",
    averageRating: 4.5,
    totalRatings: 12,
    commentsCount: 5,
    createdAt: new Date(2023, 8, 15)
  },
  {
    id: "2",
    title: "The Forgotten Path",
    excerpt: "The cobblestone path stretched before her, weathered by time and the countless souls who had traversed it...",
    type: "story",
    averageRating: 4.2,
    totalRatings: 8,
    commentsCount: 3,
    createdAt: new Date(2023, 9, 22)
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("my-writings");
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Navbar />
      
      <main className="flex-grow px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold">Welcome back, Writer!</h1>
              <p className="text-muted-foreground mt-1">Manage your writings and explore your dashboard</p>
            </div>
            
            <Link to="/new-writing">
              <Button className="flex items-center gap-2">
                <PenLine className="h-4 w-4" /> New Writing
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="my-writings" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="my-writings" className="flex items-center gap-2">
                <Book className="h-4 w-4" /> My Writings
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" /> Saved
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <Star className="h-4 w-4" /> Stats
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-writings">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockWritings.map((writing) => (
                  <Link key={writing.id} to={`/writing/${writing.id}`}>
                    <Card className="h-full writing-card hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {writing.type}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{writing.averageRating}</span>
                          </div>
                        </div>
                        <CardTitle className="font-serif mt-2">{writing.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">{writing.excerpt}</p>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
                        <div className="flex justify-between w-full">
                          <span>{writing.totalRatings} ratings</span>
                          <span>{writing.commentsCount} comments</span>
                          <span>{writing.createdAt.toLocaleDateString()}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
                
                <Link to="/new-writing">
                  <Card className="h-full border-dashed border-2 flex items-center justify-center hover:border-primary transition-colors writing-card">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <PenLine className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="font-medium text-lg">Create New Writing</p>
                      <p className="text-muted-foreground text-center mt-2">Share your poems, stories or other creative works</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">No Saved Writings Yet</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  When you save writings from other authors, they will appear here for easy access
                </p>
                <Button variant="outline" className="mt-4">
                  Explore Writings
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Star className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Your Writing Statistics</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Detailed statistics about your writings, ratings, and engagement will appear here
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Settings className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Account Settings</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Manage your profile, privacy settings, and notification preferences
                </p>
                <Button variant="outline" className="mt-4">
                  Edit Profile
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-background border-t border-border py-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Syahi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
