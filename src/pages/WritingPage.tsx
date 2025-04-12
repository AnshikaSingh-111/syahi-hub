
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Heart, MessageCircle, Share2, Bookmark, Star } from "lucide-react";
import { toast } from "sonner";
import { getPublishedWritings, getDemoWritings } from "./Dashboard";

// Mock author data
const mockAuthor = {
  id: "user1",
  username: "poetic_soul",
  profilePic: "",
  bio: "Writer of poems and lover of words",
  joinedAt: new Date(2023, 5, 15),
};

// Default writing data
const defaultWriting = {
  id: "1",
  title: "Whispers of Dawn",
  content: `The morning light cascades through leaves,
Painting shadows on the dewy grass.
Birds awaken with melodies divine,
Nature's symphony at dawn's first pass.

Whispers carried on gentle winds,
Secrets of night now laid to rest.
The world awakens once again,
As sunlight puts darkness to the test.

In this moment between worlds,
Where dreams and reality entwine,
I find peace in solitude,
As day breaks with glory divine.`,
  type: "poem",
  authorId: "user1",
  author: mockAuthor,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  averageRating: 4.5,
  totalRatings: 12,
  comments: [
    {
      id: "comment1",
      content: "This poem beautifully captures the essence of dawn. The imagery is vivid and evocative.",
      author: {
        id: "user2",
        username: "literary_critic",
        profilePic: "",
        joinedAt: new Date(2023, 3, 10),
      },
      createdAt: new Date(2023, 8, 16),
    },
    {
      id: "comment2",
      content: "I love the line about 'Nature's symphony'. It resonates deeply with me as someone who enjoys early morning walks.",
      author: {
        id: "user3",
        username: "nature_lover",
        profilePic: "",
        joinedAt: new Date(2023, 2, 5),
      },
      createdAt: new Date(2023, 8, 17),
    }
  ]
};

const WritingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [writing, setWriting] = useState(defaultWriting);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { toast: useToastNotify } = useToast();
  
  useEffect(() => {
    // Fetch the writing based on the ID using shared function
    const fetchWriting = () => {
      // Get all writings using the shared function
      const allWritings = getPublishedWritings();
      const foundWriting = allWritings.find((w: any) => w.id === id);
      
      if (foundWriting) {
        // Ensure all required properties exist to prevent TypeScript errors
        const completeWriting = {
          ...foundWriting,
          author: foundWriting.author || {
            id: foundWriting.authorId || "unknown_user",
            username: foundWriting.authorName || "Anonymous Writer",
            profilePic: "",
            joinedAt: new Date(foundWriting.createdAt || Date.now())
          },
          comments: foundWriting.comments || [],
          updatedAt: foundWriting.updatedAt || foundWriting.createdAt || new Date().toISOString(),
          authorId: foundWriting.authorId || "anonymous"
        };
        
        setWriting(completeWriting);
        return;
      }
      
      // If not found in localStorage, try demo writings
      const demoWritings = getDemoWritings();
      const demoFoundWriting = demoWritings.find((w: any) => w.id === id);
      
      if (demoFoundWriting) {
        // Ensure demo writing has all required properties
        setWriting({
          ...demoFoundWriting,
          updatedAt: demoFoundWriting.updatedAt || demoFoundWriting.createdAt,
          authorId: demoFoundWriting.authorId || "user1",
          author: mockAuthor,
          comments: demoFoundWriting.comments || []
        });
        return;
      }
      
      // If not found anywhere, use default with complete properties
      setWriting(defaultWriting);
    };
    
    fetchWriting();
  }, [id]);
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    
    // Update the writing's rating in localStorage
    const storedWritings = localStorage.getItem("publishedWritings");
    if (storedWritings) {
      const writings = JSON.parse(storedWritings);
      const writingIndex = writings.findIndex((w: any) => w.id === id);
      
      if (writingIndex !== -1) {
        const currentWriting = writings[writingIndex];
        const newTotalRatings = (currentWriting.totalRatings || 0) + 1;
        const currentTotalPoints = (currentWriting.averageRating || 0) * (currentWriting.totalRatings || 0);
        const newAverageRating = (currentTotalPoints + rating) / newTotalRatings;
        
        writings[writingIndex] = {
          ...currentWriting,
          averageRating: newAverageRating,
          totalRatings: newTotalRatings,
        };
        
        localStorage.setItem("publishedWritings", JSON.stringify(writings));
        setWriting((prev) => ({
          ...prev,
          averageRating: newAverageRating,
          totalRatings: newTotalRatings,
        }));
      }
    }
    
    toast.success(`You rated this ${writing.type} ${rating} stars.`);
  };
  
  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    
    setIsSubmittingComment(true);
    
    const newComment = {
      id: `comment-${Date.now()}`,
      content: comment,
      author: {
        id: "current-user",
        username: "you",
        profilePic: "",
        joinedAt: new Date(),
      },
      createdAt: new Date(),
    };
    
    // Update comments in local state
    setWriting((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment],
      commentsCount: ((prev.comments && prev.comments.length) || 0) + 1,
    }));
    
    // Update comments in localStorage
    const storedWritings = localStorage.getItem("publishedWritings");
    if (storedWritings) {
      const writings = JSON.parse(storedWritings);
      const writingIndex = writings.findIndex((w: any) => w.id === id);
      
      if (writingIndex !== -1) {
        const updatedComments = [...(writings[writingIndex].comments || []), newComment];
        writings[writingIndex] = {
          ...writings[writingIndex],
          comments: updatedComments,
          commentsCount: updatedComments.length,
        };
        
        localStorage.setItem("publishedWritings", JSON.stringify(writings));
      }
    }
    
    toast.success("Your comment has been added to the discussion.");
    setComment("");
    setIsSubmittingComment(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 overflow-hidden border-primary/20 shadow-lg">
            <div className="bg-primary/5 px-6 py-8 border-b">
              <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                {writing.type}
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-6">{writing.title}</h1>
              
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={writing.author?.profilePic} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {writing.author?.username?.slice(0, 2).toUpperCase() || "AU"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-lg">{writing.author?.username || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground">
                    Posted on {new Date(writing.createdAt).toLocaleDateString('en-US', {
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <CardContent className="p-8">
              <div className="prose-syahi whitespace-pre-line text-lg leading-relaxed">
                {writing.content}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center mb-8 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-primary hover:bg-primary/10">
                <Heart className="h-5 w-5 mr-1" /> Like
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-primary hover:bg-primary/10">
                <Bookmark className="h-5 w-5 mr-1" /> Save
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-primary hover:bg-primary/10">
                <Share2 className="h-5 w-5 mr-1" /> Share
              </Button>
            </div>
            
            <div className="flex items-center bg-secondary p-2 rounded-md">
              <div className="mr-2 text-sm font-medium">Rate:</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRating(rating)}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        (hoverRating || userRating) >= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              Comments ({(writing.comments && writing.comments.length) || 0})
            </h2>
            
            <div className="space-y-6">
              {writing.comments && writing.comments.length > 0 ? (
                writing.comments.map((comment: any) => (
                  <Card key={comment.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="flex p-4">
                      <Avatar className="h-10 w-10 border border-primary/10">
                        <AvatarImage src={comment.author?.profilePic} />
                        <AvatarFallback className="bg-secondary text-primary">
                          {comment.author?.username?.slice(0, 2).toUpperCase() || "AN"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 ml-4">
                        <div className="flex items-center">
                          <p className="font-medium">{comment.author?.username || "Anonymous"}</p>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="mt-2">{comment.content}</p>
                        <Button variant="ghost" size="sm" className="mt-2 text-xs text-primary">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-secondary/30 rounded-lg">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
          
          <Card className="mb-8 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Add Your Comment</h2>
              <div className="flex space-x-4">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">YOU</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea
                    placeholder="Share your thoughts on this writing..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border-primary/20 focus:border-primary min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button 
                      disabled={!comment.trim() || isSubmittingComment}
                      onClick={handleCommentSubmit}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {isSubmittingComment ? "Posting..." : "Post Comment"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-background border-t border-border py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Syahi. All rights reserved.</p>
          <p className="text-muted-foreground text-xs mt-1">Share your writing journey with the world</p>
        </div>
      </footer>
    </div>
  );
};

export default WritingPage;
