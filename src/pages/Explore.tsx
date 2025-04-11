
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Star, Search, Filter, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Explore = () => {
  const [writings, setWritings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    // Fetch writings from localStorage
    const storedWritings = localStorage.getItem("publishedWritings");
    const fetchedWritings = storedWritings ? JSON.parse(storedWritings) : [];
    
    // If no writings found, provide some sample data
    const displayWritings = fetchedWritings.length > 0 ? fetchedWritings : [
      {
        id: "sample-1",
        title: "The Silent Echo",
        excerpt: "Within whispered valleys, memories dance like autumn leaves...",
        content: "Within whispered valleys, memories dance like autumn leaves,\nCarrying echoes of laughter long since faded.\nTime's gentle current sweeps through empty spaces,\nLeaving nothing but the silent echo of what once was.",
        type: "poem",
        averageRating: 4.8,
        totalRatings: 24,
        commentsCount: 7,
        createdAt: new Date().toISOString()
      },
      {
        id: "sample-2",
        title: "Journey to Solace",
        excerpt: "The morning fog wrapped around the small coastal town like a protective blanket...",
        content: "The morning fog wrapped around the small coastal town like a protective blanket, obscuring the jagged cliffs and whispering secrets to those who dared to listen...",
        type: "story",
        averageRating: 4.6,
        totalRatings: 15,
        commentsCount: 9,
        createdAt: new Date().toISOString()
      },
      {
        id: "sample-3",
        title: "Urban Whispers",
        excerpt: "Concrete jungles hiding untold stories beneath the surface of everyday life...",
        content: "Concrete towers reach for sky,\nShadows dance on busy streets.\nA thousand lives in passing glance,\nUrban whispers never sleep.",
        type: "poem",
        averageRating: 4.3,
        totalRatings: 18,
        commentsCount: 5,
        createdAt: new Date().toISOString()
      }
    ];
    
    setWritings(displayWritings);
  }, []);

  // Filter writings based on search query and type
  const filteredWritings = writings.filter(writing => {
    const matchesSearch = writing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          writing.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || writing.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 space-y-2">
            <BookOpen className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-serif font-bold">Explore Writings</h1>
            <p className="text-muted-foreground max-w-xl">
              Discover poems, stories, and creative expressions from writers around the world.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by title or content..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="poem">Poems</SelectItem>
                  <SelectItem value="story">Stories</SelectItem>
                  <SelectItem value="essay">Essays</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredWritings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWritings.map((writing) => (
                <Link key={writing.id} to={`/writing/${writing.id}`}>
                  <Card className="h-full writing-card hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {writing.type}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{writing.averageRating || "New"}</span>
                        </div>
                      </div>
                      <CardTitle className="font-serif mt-2">{writing.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {writing.excerpt || writing.content.slice(0, 150) + (writing.content.length > 150 ? "..." : "")}
                      </p>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground border-t pt-4">
                      <div className="flex justify-between w-full">
                        <span>{writing.totalRatings || 0} ratings</span>
                        <span>{writing.commentsCount || 0} comments</span>
                        <span>{new Date(writing.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex mx-auto justify-center items-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium">No writings found</h3>
              <p className="text-muted-foreground mt-2 mb-4">Try adjusting your search or filters</p>
              <Button onClick={() => { setSearchQuery(""); setFilterType("all"); }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-secondary py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Syahi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Explore;
