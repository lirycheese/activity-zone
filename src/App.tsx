/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  HelpCircle, 
  ChevronLeft, 
  Search, 
  BookMarked, 
  Coins, 
  Play, 
  Heart, 
  Star, 
  Plus, 
  Send,
  CheckCircle2,
  Clock,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { COURSES, CATEGORIES, POINT_RECORDS, COMMENTS } from './constants';
import { Course, PointRecord, Comment, Feedback } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Header = ({ title, showBack = true, rightElement }: { title: string; showBack?: boolean; rightElement?: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {rightElement}
      </div>
    </div>
  );
};

// --- Pages ---

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">专员活动专区</h1>
        <p className="text-gray-500">学习 · 互动 · 成长</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {[
          { icon: BookOpen, label: '学习区', sub: '学习课程', color: 'bg-blue-500', path: '/learning' },
          { icon: MessageSquare, label: '互动区', sub: '精彩E刻', color: 'bg-emerald-500', path: '/interaction' },
          { icon: HelpCircle, label: '提问区', sub: '成长不停', color: 'bg-orange-500', path: '/question' },
        ].map((item, idx) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className={cn("p-3 rounded-xl text-white transition-transform group-hover:scale-110", item.color)}>
              <item.icon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-lg">{item.label}</div>
              <div className="text-sm text-gray-500">{item.sub}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const LearningZone = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const navigate = useNavigate();

  const filteredCourses = COURSES.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        title="心理课程" 
        rightElement={
          <>
            <button onClick={() => {}} className="p-1 rounded-full hover:bg-gray-100">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={() => navigate('/learning/completed')} className="p-1 rounded-full hover:bg-gray-100">
              <BookMarked className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={() => navigate('/learning/points')} className="p-1 rounded-full hover:bg-gray-100">
              <Coins className="w-5 h-5 text-gray-600" />
            </button>
          </>
        }
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-24 bg-gray-50 border-r border-gray-100 overflow-y-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "w-full py-4 px-2 text-sm text-center transition-colors",
                activeCategory === cat 
                  ? "bg-blue-600 text-white font-bold" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredCourses.map(course => (
            <motion.div
              layoutId={course.id}
              key={course.id}
              onClick={() => navigate(`/learning/course/${course.id}`)}
              className="flex gap-3 bg-white rounded-xl overflow-hidden cursor-pointer group"
            >
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">视频</span>
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" /> {course.views}
                  </span>
                </div>
              </div>
              <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded flex items-center gap-1">
                  <Clock className="w-2 h-2" /> {course.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const course = COURSES.find(c => c.id === id);
  const navigate = useNavigate();

  if (!course) return <div>Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative aspect-video bg-black">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 p-2 bg-black/40 rounded-full text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={course.thumbnail} alt="Video Player Placeholder" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Play className="w-8 h-8 text-white fill-current ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <div className="h-full bg-blue-500 w-1/3"></div>
        </div>
      </div>

      <div className="bg-white p-4 space-y-4 shadow-sm">
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-lg font-bold text-gray-900 leading-tight flex-1">
            {course.title}
          </h1>
          <button className="flex-shrink-0 flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            简介 <ChevronLeft className="w-3 h-3 rotate-180" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1.5"><Play className="w-4 h-4" /> 播放量 {course.views}</span>
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" /> 喜欢 {course.likes}</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> 收藏 {course.favorites}</span>
        </div>
      </div>

      <div className="mt-2 bg-white p-4">
        <h2 className="font-bold text-gray-900 mb-4">选集</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {course.episodes.length > 0 ? course.episodes.map(ep => (
            <div key={ep.id} className="w-40 flex-shrink-0 space-y-2">
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-blue-500">
                <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                  {ep.duration}
                </div>
                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                   <div className="w-2 h-4 flex gap-0.5 items-end">
                      <div className="w-0.5 h-full bg-blue-500 animate-pulse"></div>
                      <div className="w-0.5 h-2/3 bg-blue-500 animate-pulse delay-75"></div>
                      <div className="w-0.5 h-1/2 bg-blue-500 animate-pulse delay-150"></div>
                   </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 line-clamp-2">{ep.title}</p>
            </div>
          )) : (
            <div className="text-sm text-gray-400 py-4">暂无选集</div>
          )}
        </div>
      </div>
    </div>
  );
};

const PointsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="我的积分" />
      
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white px-6 py-10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span>可用积分</span>
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">规则</span>
          </div>
          <div className="text-6xl font-black text-gray-900">229</div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-10 right-10"
        >
          <Coins className="w-12 h-12 text-yellow-400 fill-current opacity-40" />
        </motion.div>
      </div>

      <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-sm p-4 space-y-6">
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <div className="h-px flex-1 bg-gray-100"></div>
          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-blue-400 fill-current" /> 积分明细 <Star className="w-3 h-3 text-blue-400 fill-current" /></span>
          <div className="h-px flex-1 bg-gray-100"></div>
        </div>

        <div className="space-y-6">
          {POINT_RECORDS.map(record => (
            <div key={record.id} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0">
              <div className="space-y-1">
                <div className="font-bold text-gray-900">{record.action}</div>
                <div className="text-xs text-gray-400">{record.date}</div>
              </div>
              <div className="text-lg font-bold text-orange-500">+{record.points}分</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InteractionZone = () => {
  const [comments, setComments] = useState(COMMENTS);
  const [newComment, setNewComment] = useState('');

  const handlePost = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      userName: '当前用户',
      company: '某某科技有限公司',
      content: newComment,
      images: [],
      timestamp: new Date().toLocaleString()
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="精彩E刻" />
      
      {/* Intro Image */}
      <div className="w-full aspect-[21/9] bg-blue-600 relative overflow-hidden">
        <img src="https://picsum.photos/seed/interaction/1200/500" alt="Intro" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
          <h2 className="text-2xl font-black mb-1">精彩E刻</h2>
          <p className="text-sm opacity-90">分享你的EAP服务点滴，共同成长</p>
        </div>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-4">
        <AnimatePresence>
          {comments.map(comment => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={comment.id} 
              className="bg-white rounded-2xl p-4 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{comment.userName}</div>
                  <div className="text-[10px] text-gray-400">{comment.company}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
              {comment.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {comment.images.map((img, i) => (
                    <img key={i} src={img} alt="Comment" className="rounded-lg w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                  ))}
                </div>
              )}
              <div className="text-[10px] text-gray-300">{comment.timestamp}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 flex items-center gap-3 z-20">
        <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 flex items-center gap-2">
          <input 
            type="text" 
            placeholder="分享你的精彩瞬间..." 
            className="flex-1 bg-transparent text-sm outline-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePost()}
          />
          <Plus className="w-5 h-5 text-gray-400" />
        </div>
        <button 
          onClick={handlePost}
          className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
          disabled={!newComment.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const QuestionZone = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    const feedback: Feedback = {
      id: Date.now().toString(),
      content,
      contact,
      images: [],
      timestamp: new Date().toLocaleString()
    };
    setFeedbackList([feedback, ...feedbackList]);
    setContent('');
    setContact('');
    alert('提交成功！');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="意见反馈" 
        rightElement={
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-blue-600 font-medium"
          >
            {showHistory ? '返回反馈' : '历史记录'}
          </button>
        }
      />

      <div className="p-4">
        {!showHistory ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm relative">
              <textarea 
                className="w-full h-40 text-sm outline-none resize-none placeholder:text-gray-300"
                placeholder="请输入你遇到的问题和建议意见，以便我们提供更好的服务。"
                maxLength={500}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-300">
                {content.length}/500
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div className="text-sm font-medium text-gray-700">添加图片 (0/4)</div>
              <button className="w-20 h-20 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300 hover:border-blue-200 hover:text-blue-300 transition-colors">
                <Plus className="w-8 h-8" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <input 
                type="text" 
                placeholder="请输入联系电话或邮箱" 
                className="w-full text-sm outline-none placeholder:text-gray-300"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform disabled:opacity-50"
            >
              提交
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbackList.length > 0 ? feedbackList.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-gray-400">{item.timestamp}</span>
                   <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">已提交</span>
                </div>
                <p className="text-sm text-gray-700">{item.content}</p>
                {item.contact && <div className="text-xs text-gray-400">联系方式: {item.contact}</div>}
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-300 space-y-4">
                <HelpCircle className="w-16 h-16 opacity-20" />
                <p>暂无提交记录</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CompletedCourses = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="已完成课程" />
      <div className="p-4 space-y-4">
        {COURSES.slice(0, 2).map(course => (
          <div key={course.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
            <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{course.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">完成时间: 2026-03-13</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[450px] min-h-screen bg-white shadow-2xl relative flex flex-col overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<LearningZone />} />
            <Route path="/learning/course/:id" element={<CourseDetail />} />
            <Route path="/learning/points" element={<PointsPage />} />
            <Route path="/learning/completed" element={<CompletedCourses />} />
            <Route path="/interaction" element={<InteractionZone />} />
            <Route path="/question" element={<QuestionZone />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
