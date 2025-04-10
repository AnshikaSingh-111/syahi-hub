
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Heart, MessageCircle, Share2, Bookmark, Star } from "lucide-react";

// Mock data - in a real app, this would come from an API
const mockWriting = {
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
  author: {
    id: "user1",
    username: "poetic_soul",
    profilePic: "",
    bio: "Writer of poems and lover of words",
    joinedAt: new Date(2023, 5, 15),
  },
  createdAt: new Date(2023, 8, 15),
  updatedAt: new Date(2023, 8, 15),
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
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { toast } = useToast();
  
  // In a real app, you would fetch the writing based on the ID
  const writing = mockWriting;
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Rating submitted!",
      description: `You rated this ${writing.type} ${rating} stars.`,
    });
  };
  
  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    
    setIsSubmittingComment(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Comment posted!",
        description: "Your comment has been added to the discussion.",
      });
      setComment("");
      setIsSubmittingComment(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow px-4 py-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              {writing.type}
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4">{writing.title}</h1>
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={writing.author.profilePic} />
                <AvatarFallback>{writing.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{writing.author.username}</p>
                <p className="text-sm text-muted-foreground">
                  Posted on {writing.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="prose-syahi whitespace-pre-line">
                {writing.content}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4 mr-1" /> Like
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
            
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Rate this {writing.type}:</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRating(rating)}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
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
            <h2 className="text-xl font-serif font-bold mb-4">Comments ({writing.comments.length})</h2>
            
            <div className="space-y-6">
              {writing.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.profilePic} />
                    <AvatarFallback>
                      {comment.author.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-medium">{comment.author.username}</p>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">
                        {comment.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-1">{comment.content}</p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-serif font-bold mb-4">Add Your Comment</h2>
            <div className="flex space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>GU</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Textarea
                  placeholder="Share your thoughts on this writing..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button 
                    disabled={!comment.trim() || isSubmittingComment}
                    onClick={handleCommentSubmit}
                    className="flex items-center gap-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {isSubmittingComment ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
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

export default WritingPage;
