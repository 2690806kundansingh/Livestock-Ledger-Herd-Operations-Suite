// File: frontend/src/pages/DailyWorkLogPage.tsx

import React, { useState } from 'react';
import { useFarmVoice } from '../utils/speechVoice';
import {
  INITIAL_DAILY_WORK_POSTS,
  DAILY_SHIFT_CHORES,
  WorkPost,
  WorkCategory,
  WorkStatus,
  ShiftChoreItem,
} from '../data/dailyWorkFeedData';
import {
  Clock,
  PlusCircle,
  Volume2,
  VolumeX,
  Printer,
  Heart,
  ShieldCheck,
  Send,
  X,
  Sparkles,
  Layers,
  MapPin,
  Check,
  Camera,
} from 'lucide-react';

export const DailyWorkLogPage: React.FC = () => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  // Posts Feed State
  const [posts, setPosts] = useState<WorkPost[]>(INITIAL_DAILY_WORK_POSTS);
  const [chores, setChores] = useState<ShiftChoreItem[]>(DAILY_SHIFT_CHORES);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<WorkStatus | 'All'>('All');

  // Modal State for New Work Post
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [workerName, setWorkerName] = useState<string>('Sohan Lal Patel');
  const [workerRole, setWorkerRole] = useState<string>('Dairy Operations Lead');
  const [category, setCategory] = useState<WorkCategory>('Milking');
  const [zone, setZone] = useState<string>('Zone A (Cattle Dairy Barn)');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<WorkStatus>('Completed');
  const [photoUrl, setPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80'
  );
  const [metricLabel, setMetricLabel] = useState<string>('Volume Logged');
  const [metricValue, setMetricValue] = useState<string>('125 Liters');

  // Image Zoom Modal
  const [zoomPhoto, setZoomPhoto] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const handleToggleChore = (id: string) => {
    setChores((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isDone: !c.isDone } : c))
    );
  };

  const handleLikePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p))
    );
  };

  const handleToggleVerify = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, verifiedByManager: !p.verifiedByManager } : p
      )
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newPost: WorkPost = {
      id: `post-${Date.now()}`,
      workerName,
      workerRole,
      avatarUrl:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      timeAgo: 'Just now',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • Today',
      category,
      zone,
      title,
      description,
      status,
      photoUrl: photoUrl || undefined,
      metrics: metricLabel && metricValue ? [{ label: metricLabel, value: metricValue }] : undefined,
      verifiedByManager: false,
      likesCount: 1,
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setIsPostModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
    return true;
  });

  const completedChoresCount = chores.filter((c) => c.isDone).length;
  const progressPercent = Math.round((completedChoresCount / (chores.length || 1)) * 100);

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn text-slate-100">
      {/* 1. HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/70 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Live Farm Operations & Working Journal</span>
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              Shift Duty Feed
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Live Daily Working Details & Operations Feed
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Real-time farm shift updates posted by on-duty handlers, herd managers, and veterinary officers. Post completed chores, log pond aerator test readings, track morning/evening milking, and verify livestock welfare.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>📸 Post Today's Work Update</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <Printer className="h-4 w-4 text-cyan-400" />
              <span>Print Daily Shift Log</span>
            </button>

            <button
              onClick={() =>
                handleSpeech(
                  `Live Farm Feed. Today ${posts.length} working posts have been published across five zones. ${completedChoresCount} of ${chores.length} daily shift chores are marked completed.`
                )
              }
              className="px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition flex items-center gap-2"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
              <span>{isSpeaking ? 'Stop Audio' : '🔊 Listen Shift Briefing'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. DAILY SHIFT PROGRESS TRACKER */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Clock className="h-4 w-4" />
              <span>Daily 24-Hour Duty Checklist</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Farm Daily Chores Execution Board
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Tap any chore to mark it completed. Tap "Post Work" to upload photos and notes.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold text-emerald-400">
              {completedChoresCount} / {chores.length} Chores Completed ({progressPercent}%)
            </span>
            <div className="w-48 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500 shadow-md shadow-emerald-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Chores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {chores.map((chore) => (
            <div
              key={chore.id}
              onClick={() => handleToggleChore(chore.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                chore.isDone
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                  chore.isDone
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                    : 'border-slate-600 bg-slate-900'
                }`}
              >
                {chore.isDone && <Check className="h-3.5 w-3.5" />}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">{chore.timeSlot}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {chore.zone}
                  </span>
                </div>
                <h4 className={`text-xs font-bold leading-tight ${chore.isDone ? 'text-slate-300 line-through opacity-75' : 'text-white'}`}>
                  {chore.taskTitle}
                </h4>
                <span className="text-[10px] text-slate-500 block">Assigned: {chore.assignedWorker}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIVE POST FEED & FILTERS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Live Activity Stream</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Today's Field Work Posts
            </h2>
          </div>

          {/* Quick Post Button */}
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/50 self-start sm:self-auto"
          >
            <Camera className="h-4 w-4" />
            <span>Post New Field Update</span>
          </button>
        </div>

        {/* Category & Status Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
            {(['All', 'Milking', 'Feeding', 'Sanitation', 'Pond & Water', 'Veterinary', 'Biogas & Waste', 'Maintenance'] as const).map(
              (cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              }
            )}
          </div>

          <div className="flex items-center space-x-1.5 self-start sm:self-auto shrink-0">
            <span className="text-[11px] text-slate-500 font-medium">Status:</span>
            {(['All', 'Completed', 'In Progress'] as const).map((st) => {
              const isSelected = selectedStatus === st;
              return (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st as WorkStatus | 'All')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    isSelected
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/50'
                      : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                {/* Post Author Bar */}
                <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-800/80">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.avatarUrl}
                      alt={post.workerName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {post.workerName}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {post.workerRole} • <span className="text-emerald-400 font-mono">{post.timeAgo}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        post.status === 'Completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : post.status === 'In Progress'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>

                {/* Location & Category Pill Bar */}
                <div className="px-5 pt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>{post.zone}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-cyan-400 border border-slate-800 flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    <span>{post.category}</span>
                  </span>
                </div>

                {/* Post Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {post.description}
                  </p>

                  {/* Metrics Pills */}
                  {post.metrics && post.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      {post.metrics.map((m, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">{m.label}</span>
                          <span className="text-xs font-bold text-white font-mono">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Attached Work Photo */}
                {post.photoUrl && (
                  <div
                    onClick={() =>
                      setZoomPhoto({
                        isOpen: true,
                        url: post.photoUrl!,
                        title: post.title,
                      })
                    }
                    className="relative h-52 mx-5 mb-4 rounded-2xl overflow-hidden border border-slate-800 cursor-pointer group shadow-lg"
                  >
                    <img
                      src={post.photoUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition" />
                    <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-slate-950/90 text-[10px] font-bold text-white border border-slate-800 flex items-center gap-1">
                      <Camera className="h-3 w-3 text-emerald-400" />
                      <span>Tap to Enlarge</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs bg-slate-950/40">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="text-slate-400 hover:text-rose-400 font-bold flex items-center gap-1.5 transition"
                  >
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500/30" />
                    <span>{post.likesCount} Acknowledged</span>
                  </button>

                  <button
                    onClick={() => handleSpeech(`${post.title}. Reported by ${post.workerName}: ${post.description}`)}
                    className="text-slate-400 hover:text-emerald-400 font-bold flex items-center gap-1.5 transition"
                  >
                    <Volume2 className="h-4 w-4 text-emerald-400" />
                    <span>Listen</span>
                  </button>
                </div>

                {/* Manager Verification Pill */}
                <button
                  onClick={() => handleToggleVerify(post.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition flex items-center gap-1 ${
                    post.verifiedByManager
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                  title="Click to toggle manager verification"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{post.verifiedByManager ? 'Manager Verified ✓' : 'Verify'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CREATE NEW WORK POST MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Field Operations Journal
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Post Live Farm Duty Update
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Broadcast today's completed chores, milking volumes, pond aerator checks, or feeding rations to the farm management feed.
              </p>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Handler / Worker Name</label>
                  <input
                    type="text"
                    required
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    required
                    value={workerRole}
                    onChange={(e) => setWorkerRole(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Work Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WorkCategory)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Milking">Milking & Dairy</option>
                    <option value="Feeding">Feeding & Fodder</option>
                    <option value="Sanitation">Sanitation & Washdown</option>
                    <option value="Veterinary">Veterinary & Deworming</option>
                    <option value="Pond & Water">Pond & Water Aeration</option>
                    <option value="Biogas & Waste">Biogas & Waste Flush</option>
                    <option value="Maintenance">General Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Farm Zone / Shed Location</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Zone A (Cattle Dairy Barn)">Zone A (Cattle Dairy Barn)</option>
                    <option value="Zone B (Elevated Goat Machan)">Zone B (Elevated Goat Machan)</option>
                    <option value="Zone C (Freshwater Fish Pond)">Zone C (Freshwater Fish Pond)</option>
                    <option value="Zone D (Free-Range Country Poultry)">Zone D (Country Poultry Run)</option>
                    <option value="Zone E (Piggery & Biogas Digester)">Zone E (Piggery & Biogas)</option>
                    <option value="General Farm Perimeter">General Farm Perimeter</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Work Title / Activity Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Super Napier Fodder Distribution (450 kg)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Detailed Operational Observations & Notes</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail what was done, equipment used, health of animals, or biosecurity actions taken..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Metric Tag Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Key Metric Label (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Total Weight / DO Level"
                    value={metricLabel}
                    onChange={(e) => setMetricLabel(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Metric Value</label>
                  <input
                    type="text"
                    placeholder="e.g. 450 kg / 6.4 mg/L"
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Status and Photo Selector */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as WorkStatus)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Completed">Completed ✅</option>
                    <option value="In Progress">In Progress ⏳</option>
                    <option value="Needs Review">Needs Review ⚠️</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Preset Photo Attachment</label>
                  <select
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80">
                      Dairy Milking Barn
                    </option>
                    <option value="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80">
                      Fish Pond & Aerator
                    </option>
                    <option value="https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80">
                      Elevated Goat Machan
                    </option>
                    <option value="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80">
                      Country Poultry & Eggs
                    </option>
                    <option value="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80">
                      Yorkshire Piggery Alley
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Publish Live Work Post to Farm Feed</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ENLARGED PHOTO MODAL */}
      {zoomPhoto.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
            <button
              onClick={() => setZoomPhoto({ isOpen: false, url: '', title: '' })}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
            <img src={zoomPhoto.url} alt={zoomPhoto.title} className="w-full max-h-[75vh] object-contain bg-slate-950" />
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white">{zoomPhoto.title}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
