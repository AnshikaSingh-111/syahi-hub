import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PenLine, Image, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getUserId, getUserName, saveWritingToStorage } from "@/lib/storage";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  type: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const NewWriting = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "poem",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    const userId = getUserId();
    const userName = getUserName(userId);
    
    const newWriting = {
      id: `writing-${Date.now()}`,
      title: data.title,
      content: data.content,
      type: data.type,
      excerpt: data.content.slice(0, 150) + (data.content.length > 150 ? "..." : ""),
      averageRating: 0,
      totalRatings: 0,
      commentsCount: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: userId,
      authorName: userName,
    };
    
    saveWritingToStorage(newWriting);
    
    toast.success("Your writing has been published! Everyone can now see it.");
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-accent/5 to-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <PenLine className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold">Create New Writing</h1>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Share your thoughts, stories, poems with readers around the world
            </p>
          </div>

          <div className="relative overflow-hidden bg-card border border-primary/20 rounded-xl p-6 shadow-xl">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter a title for your writing..." 
                          {...field}
                          className="text-lg py-6 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="poem">
                            <div className="flex items-center">
                              <span className="mr-2">🎭</span> Poem
                            </div>
                          </SelectItem>
                          <SelectItem value="story">
                            <div className="flex items-center">
                              <span className="mr-2">📚</span> Story
                            </div>
                          </SelectItem>
                          <SelectItem value="essay">
                            <div className="flex items-center">
                              <span className="mr-2">📝</span> Essay
                            </div>
                          </SelectItem>
                          <SelectItem value="other">
                            <div className="flex items-center">
                              <span className="mr-2">✨</span> Other
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Start writing your masterpiece here..." 
                          className="min-h-[300px] font-serif text-lg leading-relaxed border-primary/20 focus:border-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button type="button" variant="outline" className="mr-4 border-primary/20 hover:bg-primary/5">
                    <Image className="mr-2 h-4 w-4" /> Upload Image
                  </Button>
                  <div className="flex items-center gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/dashboard')} 
                      className="border-primary/20"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all shadow-md"
                    >
                      {isSubmitting ? (
                        <>Publishing...</>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" /> Publish Globally
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
            
            <div className="page-curl absolute bottom-0 right-0 w-24 h-24"></div>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Your writing will be published to all Syahi users around the world.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewWriting;
