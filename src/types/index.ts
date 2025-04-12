
export interface User {
  id: string;
  username: string;
  email: string;
  profilePic?: string;
  bio?: string;
  joinedAt: Date;
}

export interface Writing {
  id: string;
  title: string;
  content: string;
  type: 'poem' | 'story' | 'essay' | 'other';
  authorId: string;
  author?: User;
  authorName?: string; // Added for compatibility with local storage implementation
  createdAt: Date | string;
  updatedAt: Date | string;
  averageRating: number;
  totalRatings: number;
  comments: Comment[];
  excerpt?: string;
  commentsCount?: number;
}

export interface Comment {
  id: string;
  content: string;
  authorId?: string;
  author: {
    id: string;
    username: string;
    profilePic?: string;
    joinedAt: Date;
  };
  writingId?: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  value: number; // 1-5
  authorId: string;
  writingId: string;
  createdAt: Date;
}
