export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  user: User;
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  image: string | null;
}

export interface Reaction {
  name: string;
  count: number;
  hasReacted: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  emailVerified: boolean;
  updatedAt: string;
  createdAt: string;
}
