
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
import { PenLine, Image, Send } from "lucide-react";
import { toast } from "sonner";

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
    
    // Create a new writing object
    const newWriting = {
      id: `writing-${Date.now()}`,
      title: data.title,
      content: data.content,
      type: data.type,
      excerpt: data.content.slice(0, 150),
      averageRating: 0,
      totalRatings: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Get existing writings from localStorage
    const existingWritings = localStorage.getItem("publishedWritings");
    const allWritings = existingWritings ? JSON.parse(existingWritings) : [];
    
    // Add the new writing to the array
    allWritings.unshift(newWriting);
    
    // Save back to localStorage
    localStorage.setItem("publishedWritings", JSON.stringify(allWritings));
    
    // Dispatch a custom event to notify other components about the new writing
    window.dispatchEvent(new CustomEvent("writingPublished"));
    
    // Show success toast
    toast.success("Your writing has been published!");
    
    // Navigate to the dashboard after a short delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold">Create New Writing</h1>
            <p className="text-muted-foreground mt-1">
              Share your thoughts, stories, poems with the world
            </p>
          </div>

          <div className="relative overflow-hidden bg-background border border-primary/20 rounded-lg p-6 shadow-sm">
            <div className="book-spine absolute left-0 top-0 bottom-0 w-4 -ml-4 bg-primary rounded-l-lg hidden md:block"></div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title for your writing..." {...field} />
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
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="poem">Poem</SelectItem>
                          <SelectItem value="story">Story</SelectItem>
                          <SelectItem value="essay">Essay</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Start writing your masterpiece here..." 
                          className="min-h-[300px] font-serif" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center">
                  <Button type="button" variant="outline" className="mr-4">
                    <Image className="mr-2 h-4 w-4" /> Upload Image
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    <Send className="mr-2 h-4 w-4" /> {isSubmitting ? "Publishing..." : "Publish"}
                  </Button>
                </div>
              </form>
            </Form>
            
            <div className="page-curl absolute bottom-0 right-0 w-12 h-12"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewWriting;
