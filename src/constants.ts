import { Course, PointRecord, Comment } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: '抑郁症到底是什么？——抑郁症科普公开课',
    category: '心理障碍',
    type: 'video',
    views: 3937,
    duration: '01:11:33',
    thumbnail: 'https://picsum.photos/seed/psych1/400/225',
    likes: 3,
    favorites: 39,
    episodes: [
      { id: '1-1', title: '抑郁症到底是什么？——抑郁症科普公开课', duration: '01:11:33', thumbnail: 'https://picsum.photos/seed/psych1/400/225' }
    ]
  },
  {
    id: '2',
    title: '我有一只黑狗，它的名字叫抑郁',
    category: '心理障碍',
    type: 'video',
    views: 312,
    duration: '04:18',
    thumbnail: 'https://picsum.photos/seed/psych2/400/225',
    likes: 12,
    favorites: 45,
    episodes: []
  },
  {
    id: '3',
    title: '一起来聊抑郁症：关注青少年和年轻',
    category: '心理障碍',
    type: 'video',
    views: 896,
    duration: '00:30',
    thumbnail: 'https://picsum.photos/seed/psych3/400/225',
    likes: 5,
    favorites: 22,
    episodes: []
  },
  {
    id: '4',
    title: '一起来聊抑郁症：关注产后妇女',
    category: '心理障碍',
    type: 'video',
    views: 626,
    duration: '00:30',
    thumbnail: 'https://picsum.photos/seed/psych4/400/225',
    likes: 8,
    favorites: 15,
    episodes: []
  },
  {
    id: '5',
    title: '与黑狗一起生活',
    category: '心理障碍',
    type: 'video',
    views: 476,
    duration: '05:57',
    thumbnail: 'https://picsum.photos/seed/psych5/400/225',
    likes: 20,
    favorites: 60,
    episodes: []
  }
];

export const CATEGORIES = [
  '心理障碍',
  '正念冥想',
  '个人成长',
  '婚恋情感',
  '情绪管理',
  '职场人际',
  '子女教育'
];

export const POINT_RECORDS: PointRecord[] = [
  { id: '1', action: '完成课程', points: 10, date: '2026-03-13 16:42:07' },
  { id: '2', action: '进入课程', points: 2, date: '2026-03-13 16:41:12' },
  { id: '3', action: '进入直播', points: 2, date: '2026-01-08 10:56:51' },
  { id: '4', action: '量表测评', points: 5, date: '2025-11-26 09:58:09' },
  { id: '5', action: '量表测评', points: 5, date: '2025-11-26 09:04:30' },
  { id: '6', action: '量表测评', points: 5, date: '2025-11-25 19:05:21' },
  { id: '7', action: '量表测评', points: 5, date: '2025-11-24 17:41:26' },
  { id: '8', action: '量表测评', points: 5, date: '2025-11-24 17:38:40' }
];

export const COMMENTS: Comment[] = [
  {
    id: '1',
    userName: '张三',
    company: '某某科技有限公司',
    content: '今天的课程非常有收获，特别是关于情绪管理的部分。',
    images: ['https://picsum.photos/seed/comment1/300/300'],
    timestamp: '2026-03-15 10:00'
  },
  {
    id: '2',
    userName: '李四',
    company: '华夏集团',
    content: '分享一下我们公司开展的EAP服务，大家反馈都很不错。',
    images: ['https://picsum.photos/seed/comment2/300/300', 'https://picsum.photos/seed/comment3/300/300'],
    timestamp: '2026-03-14 15:30'
  }
];
