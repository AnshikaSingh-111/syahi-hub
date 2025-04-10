
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
  type: 'poem' | 'story' | 'other';
  authorId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  averageRating: number;
  totalRatings: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  writingId: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  value: number; // 1-5
  authorId: string;
  writingId: string;
  createdAt: Date;
}
