
import React from 'react';
import { Home, Zap, GraduationCap, User, Plus } from 'lucide-react';
import { Post, Alert, StudyResource } from './types';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <Home size={22} /> },
  { id: 'funs', label: 'Funs', icon: <Zap size={22} /> },
  { id: 'create', label: 'Post', icon: <Plus size={22} /> },
  { id: 'study', label: 'Focus Mode', icon: <GraduationCap size={22} /> },
  { id: 'profile', label: 'Profile', icon: <User size={22} /> },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Anonymous Phantom',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=phantom',
    timestamp: '2H AGO',
    type: 'meme',
    content: "When the professor says 'this won't be in the exam' but it's 80% of the paper.",
    mediaUrl: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=600&h=400',
    score: 1240,
    commentsCount: 84,
    isTrending: true,
  },
  {
    id: '2',
    author: 'Ghost_Writer_22',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ghostwriter',
    timestamp: '5H AGO',
    type: 'text',
    content: "Spotted: Two seniors high-fiving after accidentally setting off the fire alarm in the bio lab. Absolute legends.",
    score: 450,
    commentsCount: 12,
  },
  {
    id: '3',
    author: 'Caffeine_Addict',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=coffee',
    timestamp: '1D AGO',
    type: 'video',
    content: "The canteen coffee finally did it. I can hear colors now.",
    mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600&h=800',
    score: 890,
    commentsCount: 45,
  }
];

export const MOCK_FUNS_POSTS: Post[] = [
  {
    id: 'f1',
    author: '@MemeGhost',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=f1',
    timestamp: '1H AGO',
    type: 'meme',
    content: 'Caffeine loading... 80% complete.',
    mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=600',
    score: 3400,
    commentsCount: 120,
  },
  {
    id: 'f2',
    author: '@CampusCam',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=f2',
    timestamp: '3H AGO',
    type: 'video',
    content: 'Last night at the hostel was absolute chaos.',
    mediaUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400&h=500',
    score: 1200,
    commentsCount: 45,
  },
  {
    id: 'f3',
    author: '@StickerBoss',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=f3',
    timestamp: '5H AGO',
    type: 'sticker',
    content: 'Me during the 8AM lecture.',
    mediaUrl: 'https://api.dicebear.com/7.x/big-smile/svg?seed=sleepy',
    score: 890,
    commentsCount: 30,
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    type: 'exam',
    title: 'End Sem Schedule Released',
    description: 'Download the official timetable for the Nov-Dec examinations.',
    timestamp: '10m ago',
    isNew: true,
  },
  {
    id: 'a2',
    type: 'holiday',
    title: 'Holiday Announcement',
    description: 'The college will remain closed tomorrow due to regional festivals.',
    timestamp: '2h ago',
    isNew: true,
  }
];

export const MOCK_STUDY_RESOURCES: StudyResource[] = [
  { id: 's1', type: 'syllabus', title: 'Exam Syllabus', meta: '8 OFFICIAL DOCS • CS • 3RD' },
  { id: 's2', type: 'notes', title: 'Lecture Notes', meta: '56 HANDWRITTEN • CS • 3RD' },
];

export const TRENDING_TOPICS = [
  { tag: '#EndSemWar', reach: '2.4K' },
  { tag: '#CanteenChaos', reach: '2.4K' },
];
