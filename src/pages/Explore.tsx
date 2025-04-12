
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Star, Search, Filter, BookOpen, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { getWritingsFromStorage } from "@/lib/storage";
import { getDemoWritings } from "./Dashboard";

const Explore = () => {
  const [writings, setWritings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWritings = () => {
      setIsLoading(true);
      const fetchedWritings = getWritingsFromStorage();
      const displayWritings = fetchedWritings.length > 0 ? fetchedWritings : getDemoWritings();
      setWritings(displayWritings);
      setIsLoading(false);
    };
    
    fetchWritings();
    
    // Set up event listeners for real-time updates
    const handlePublish = () => {
      const updatedWritings = getWritingsFromStorage();
      setWritings(updatedWritings.length > 0 ? updatedWritings : getDemoWritings());
    };
    
    window.addEventListener("writingPublished", handlePublish);
    window.addEventListener("writingUpdated", handlePublish);
    window.addEventListener("storage", handlePublish);
    
    return () => {
      window.removeEventListener("writingPublished", handlePublish);
      window.removeEventListener("writingUpdated", handlePublish);
      window.removeEventListener("storage", handlePublish);
    };
  }, []);

  const filteredWritings = writings.filter(writing => {
    const matchesSearch = writing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          writing.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || writing.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-accent/5 to-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Discover Writings
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Explore poems, stories, and creative expressions from writers across the globe.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-secondary/30 p-4 rounded-xl shadow-sm">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
              <Input 
                placeholder="Search by title or content..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="border-primary/20 focus:border-primary">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-primary/60" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="poem">
                    <div className="flex items-center">
                      <span className="mr-2">🎭</span> Poems
                    </div>
                  </SelectItem>
                  <SelectItem value="story">
                    <div className="flex items-center">
                      <span className="mr-2">📚</span> Stories
                    </div>
                  </SelectItem>
                  <SelectItem value="essay">
                    <div className="flex items-center">
                      <span className="mr-2">📝</span> Essays
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center">
                      <span className="mr-2">✨</span> Other
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-64 writing-card animate-pulse">
                  <CardHeader className="bg-secondary/50 h-24"></CardHeader>
                  <CardContent className="h-36"></CardContent>
                </Card>
              ))}
            </div>
          ) : filteredWritings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWritings.map((writing) => (
                <Link key={writing.id} to={`/writing/${writing.id}`}>
                  <Card className="h-full writing-card hover:shadow-lg transition-all border-primary/10 overflow-hidden">
                    <CardHeader className="pb-2 bg-gradient-to-br from-primary/5 to-transparent border-b">
                      <div className="flex justify-between items-start">
                        <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {writing.type === "poem" && "🎭 Poem"}
                          {writing.type === "story" && "📚 Story"}
                          {writing.type === "essay" && "📝 Essay"} 
                          {writing.type === "other" && "✨ Other"}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{writing.averageRating ? writing.averageRating.toFixed(1) : "New"}</span>
                        </div>
                      </div>
                      <CardTitle className="font-serif mt-2 line-clamp-2">{writing.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-muted-foreground line-clamp-3 font-serif">
                        {writing.excerpt || writing.content.slice(0, 150) + (writing.content.length > 150 ? "..." : "")}
                      </p>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground border-t pt-4 flex flex-col items-start">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {writing.authorName ? writing.authorName.slice(0, 2).toUpperCase() : "AN"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{writing.authorName || "Anonymous Writer"}</span>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          <span>{writing.totalRatings || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span>{writing.commentsCount || 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{new Date(writing.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary/20 rounded-xl shadow-inner">
              <div className="inline-flex mx-auto justify-center items-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Search className="h-10 w-10 text-primary/60" />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-2">No writings found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any writings matching your criteria. Try adjusting your search or filters.
              </p>
              <Button 
                onClick={() => { setSearchQuery(""); setFilterType("all"); }}
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-primary/5 py-8 px-4 border-t border-primary/10 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="font-serif text-xl mb-2">Syahi - Where Words Come Alive</h3>
          <p className="text-muted-foreground">© {new Date().getFullYear()} Syahi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Explore;
