
export type Section = 'home' | 'funs' | 'study' | 'alerts' | 'profile' | 'create';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  liked?: boolean;
  disliked?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  type: 'meme' | 'text' | 'video' | 'sticker' | 'photo' | 'comment';
  content: string;
  mediaUrl?: string;
  score: number;
  commentsCount: number;
  isTrending?: boolean;
  liked?: boolean;
  disliked?: boolean;
  saved?: boolean;
  comments?: Comment[];
}

export interface Alert {
  id: string;
  type: 'exam' | 'holiday' | 'note' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isNew: boolean;
}

export interface StudyResource {
  id: string;
  title: string;
  meta: string;
  type: 'syllabus' | 'notes' | 'pyq' | 'books';
}
