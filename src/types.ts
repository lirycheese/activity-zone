export interface Course {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'article';
  views: number;
  duration: string;
  thumbnail: string;
  likes: number;
  favorites: number;
  episodes: { id: string; title: string; duration: string; thumbnail: string }[];
}

export interface PointRecord {
  id: string;
  action: string;
  points: number;
  date: string;
}

export interface Comment {
  id: string;
  userName: string;
  company: string;
  content: string;
  images: string[];
  timestamp: string;
}

export interface Feedback {
  id: string;
  content: string;
  images: string[];
  contact: string;
  timestamp: string;
}
