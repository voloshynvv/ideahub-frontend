export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  user: User;
  reactions: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  image: string | null;
}
