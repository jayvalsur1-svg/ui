import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share2,
  Verified,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Sparkles,
  ArrowRight,
  UserPlus,
  UserCheck,
  Search,
  Bell,
  Home,
  Compass,
  Mail,
  User,
  X,
  Code2,
  Smile,
  Check
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  codeSnippet?: string;
  image?: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  reposts: number;
  isReposted: boolean;
  repliesCount: number;
  isBookmarked: boolean;
  replies: { author: string; handle: string; text: string; time: string }[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      name: 'Kai Takahashi',
      handle: '@kaitanaka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      verified: true,
    },
    content: 'Just deployed our new multi-agent orchestrator on edge runtimes. Cold starts dropped from 420ms to 8ms. If you are still running monolithic LLM pipelines in 2026, here is the architectural shift you need:',
    codeSnippet: `// Edge-Native Agent Dispatcher
export const dispatchTask = async (task: TaskPayload) => {
  const node = await selectNearestWorker(task.region);
  return node.executeStream({
    spec: task.spec,
    contextLimit: 128_000,
    timeoutMs: 3_500
  });
};`,
    timestamp: '2h ago',
    likes: 412,
    isLiked: false,
    reposts: 84,
    isReposted: false,
    repliesCount: 38,
    isBookmarked: false,
    replies: [
      { author: 'Devon Ray', handle: '@devonray', text: 'Insane latency drop! Are you utilizing Cloudflare Workers or Deno Deploy?', time: '1h ago' },
      { author: 'Elena Rostova', handle: '@erostova', text: 'Bookmarked. The context allocation pattern is super clean.', time: '45m ago' }
    ]
  },
  {
    id: 'p2',
    author: {
      name: 'Kai Takahashi',
      handle: '@kaitanaka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      verified: true,
    },
    content: 'Sunday design sprint: Rebuilding vintage 1970s analog VU meters entirely with SVG arcs and Web Audio API ballistics. Physical materiality in software interface design hits completely different when you sweat the spring dynamics.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    timestamp: 'Yesterday',
    likes: 890,
    isLiked: true,
    reposts: 142,
    isReposted: true,
    repliesCount: 64,
    isBookmarked: true,
    replies: []
  },
  {
    id: 'p3',
    author: {
      name: 'Kai Takahashi',
      handle: '@kaitanaka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      verified: true,
    },
    content: 'The most underrated skill in engineering leadership is pruning: saying no to 9 out of 10 feature ideas so the core experience feels like zero-friction magic.',
    timestamp: '3d ago',
    likes: 1240,
    isLiked: false,
    reposts: 310,
    isReposted: false,
    repliesCount: 92,
    isBookmarked: false,
    replies: []
  }
];

export const SocialDemo: React.FC = () => {
  // Profile interaction states
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(14280);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'media' | 'likes' | 'community'>('posts');

  // Posts state
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  
  // Inline comment state
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // Messaging drawer
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', sender: 'them', text: 'Hey Kai! Loved your post on edge runtimes. Are you open to a podcast conversation next week?', time: '10:42 AM' },
    { id: 'm2', sender: 'me', text: 'Thanks Sarah! Yes, I would love to. Feel free to send over the invite link.', time: '10:45 AM' },
    { id: 'm3', sender: 'them', text: 'Awesome, sending it right now!', time: '10:46 AM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Toggle follow state
  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  // Toggle post like
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  // Toggle repost
  const handleRepost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isReposted = !p.isReposted;
          return {
            ...p,
            isReposted,
            reposts: isReposted ? p.reposts + 1 : p.reposts - 1,
          };
        }
        return p;
      })
    );
  };

  // Toggle bookmark
  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p))
    );
  };

  // Publish new post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `p_${Date.now()}`,
      author: {
        name: 'Kai Takahashi',
        handle: '@kaitanaka',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
        verified: true,
      },
      content: newPostText,
      timestamp: 'Just now',
      likes: 1,
      isLiked: true,
      reposts: 0,
      isReposted: false,
      repliesCount: 0,
      isBookmarked: false,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  // Submit comment
  const handleSubmitComment = (postId: string) => {
    if (!commentInput.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            repliesCount: p.repliesCount + 1,
            replies: [
              ...p.replies,
              {
                author: 'You (Guest Explorer)',
                handle: '@guest_user',
                text: commentInput,
                time: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );

    setCommentInput('');
    setActiveCommentPostId(null);
  };

  // Send direct message
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages([
      ...chatMessages,
      { id: `cm_${Date.now()}`, sender: 'me', text: chatInput, time: 'Just now' },
    ]);
    setChatInput('');
  };

  return (
    <DemoViewerShell
      demoId="social"
      demoTitle="Synapse // Creator Network"
      category="Social Networking & Developer Community"
      styleBadge="Social Profile & Community"
    >
      <div className="min-h-screen bg-[#090B10] text-slate-100 font-sans pb-24 selection:bg-purple-600 selection:text-white">
        
        {/* Sub-Header Bar */}
        <div className="border-b border-white/10 bg-[#0E1118]/80 backdrop-blur-xl px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SYNAPSE // CREATOR PLATFORM
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
              COMMUNITY GRAPH V4
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMessageOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>Direct Messages</span>
            </button>

            <Link
              to="/request?style=social"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1 shadow-md transition-all"
            >
              <Sparkles className="w-3 h-3" />
              <span>Order Social App</span>
            </Link>
          </div>
        </div>

        {/* Profile Container */}
        <div className="max-w-4xl mx-auto px-2 sm:px-6 pt-4 sm:pt-6">
          
          {/* Main Card with Cover Image */}
          <div className="rounded-3xl bg-[#10131D] border border-white/10 overflow-hidden shadow-2xl">
            
            {/* Cinematic Cover Banner */}
            <div className="relative h-44 sm:h-64 w-full bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
                alt="Profile Cover Banner"
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131D] via-transparent to-black/20" />
              
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-purple-200">
                Founding Fellow @ Synapse
              </div>
            </div>

            {/* Profile Avatar & Header Actions */}
            <div className="px-4 sm:px-8 pb-6 relative">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
                
                {/* Avatar with ring */}
                <div className="relative">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-[#10131D] overflow-hidden bg-slate-800 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
                      alt="Kai Takahashi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Indicator Badge */}
                  <span className="absolute bottom-1 right-2 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-[#10131D] flex items-center justify-center" title="Online in Studio" />
                </div>

                {/* Profile Primary Action Buttons */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => setIsMessageOpen(true)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Send Direct Message"
                  >
                    <Mail className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleFollowToggle}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all ${
                      isFollowing
                        ? 'bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/20 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-purple-300" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Follow Kai</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Bio & Details */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white">
                      Kai Takahashi
                    </h1>
                    <Verified className="w-5 h-5 text-purple-400 fill-purple-400/20" />
                  </div>
                  <span className="text-xs font-mono text-purple-300/80">@kaitanaka • he/him</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Distributed Systems Engineer & Creative Technologist. Building agentic web runtimes. Former Principal @ Stripeflow. Obsessed with high-contrast typography, WebGL shaders, and tactile hardware synthesizers.
                </p>

                {/* Meta details (location, link, join date) */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                    <a href="#github" className="text-purple-400 hover:underline">takahashi.dev</a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Joined October 2022</span>
                  </div>
                </div>

                {/* Profile Interactive Statistics */}
                <div className="flex items-center gap-6 pt-3 border-t border-white/5 text-xs">
                  <div>
                    <span className="font-bold text-white font-mono text-sm">{followerCount.toLocaleString()}</span>
                    <span className="text-slate-400 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-white font-mono text-sm">842</span>
                    <span className="text-slate-400 ml-1">Following</span>
                  </div>
                  <div>
                    <span className="font-bold text-white font-mono text-sm">48.9k</span>
                    <span className="text-slate-400 ml-1">Likes</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="font-bold text-purple-400 font-mono text-sm">98.4</span>
                    <span className="text-slate-400 ml-1">Impact Score</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex border-t border-white/10 px-4 sm:px-8 bg-[#0D1018] overflow-x-auto">
              {[
                { id: 'posts', label: 'Posts & Insights' },
                { id: 'replies', label: 'Replies' },
                { id: 'media', label: 'Media Gallery' },
                { id: 'likes', label: 'Curated Likes' },
                { id: 'community', label: 'Follower Circle' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-white font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* TAB CONTENT */}
          <div className="mt-6 space-y-4">
            
            {/* POSTS TAB */}
            {activeTab === 'posts' && (
              <>
                {/* Live Post Composer */}
                <form 
                  onSubmit={handleCreatePost}
                  className="p-4 rounded-2xl bg-[#10131D] border border-white/10 shadow-lg space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                      alt="Current User"
                      className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-purple-500/30"
                    />
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder="Share a breakthrough, architecture pattern, or question with the community..."
                      rows={2}
                      className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-slate-400">
                      <button type="button" className="p-1.5 rounded-lg hover:bg-white/5 text-purple-400" title="Attach Media">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-1.5 rounded-lg hover:bg-white/5 text-purple-400" title="Insert Code Snippet">
                        <Code2 className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={!newPostText.trim()}
                      className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Send className="w-3 h-3" />
                      <span>Publish</span>
                    </button>
                  </div>
                </form>

                {/* Feed Posts */}
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="p-5 rounded-2xl bg-[#10131D] border border-white/10 hover:border-purple-500/20 transition-all space-y-4"
                  >
                    {/* Author Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-white">{post.author.name}</span>
                            {post.author.verified && <Verified className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">{post.author.handle} • {post.timestamp}</span>
                        </div>
                      </div>

                      <button className="text-slate-400 hover:text-slate-200 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Text */}
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Optional Code Snippet Block */}
                    {post.codeSnippet && (
                      <div className="rounded-xl bg-[#090A10] border border-white/10 p-3 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                        <pre>{post.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Optional Image Attachment */}
                    {post.image && (
                      <div className="rounded-2xl overflow-hidden border border-white/10 max-h-96">
                        <img src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Interactive Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
                      
                      {/* Replies */}
                      <button
                        onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.repliesCount}</span>
                      </button>

                      {/* Repost */}
                      <button
                        onClick={() => handleRepost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.isReposted ? 'text-emerald-400 font-bold' : 'hover:text-emerald-400'
                        }`}
                      >
                        <Repeat2 className="w-4 h-4" />
                        <span>{post.reposts}</span>
                      </button>

                      {/* Like */}
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.isBookmarked ? 'text-purple-400 font-bold' : 'hover:text-purple-300'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-purple-400' : ''}`} />
                      </button>

                      {/* Share */}
                      <button className="hover:text-slate-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>

                    </div>

                    {/* Inline Reply Composer & Thread List */}
                    {activeCommentPostId === post.id && (
                      <div className="pt-3 border-t border-white/10 space-y-3">
                        {/* Existing replies */}
                        {post.replies.map((r, i) => (
                          <div key={i} className="p-3 rounded-xl bg-black/40 text-xs space-y-1">
                            <div className="flex justify-between font-mono text-[10px] text-slate-400">
                              <span className="font-bold text-purple-300">{r.author} ({r.handle})</span>
                              <span>{r.time}</span>
                            </div>
                            <p className="text-slate-200">{r.text}</p>
                          </div>
                        ))}

                        {/* Reply input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Write your constructive reply..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment(post.id)}
                            className="flex-1 bg-[#161926] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => handleSubmitComment(post.id)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}

                  </article>
                ))}
              </>
            )}

            {/* MEDIA GALLERY TAB */}
            {activeTab === 'media' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
                  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
                  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
                  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
                  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
                  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
                ].map((img, idx) => (
                  <div key={idx} className="h-44 rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer">
                    <img src={img} alt="Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-white">
                      Inspect Artifact
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REPLIES TAB */}
            {activeTab === 'replies' && (
              <div className="p-8 rounded-2xl bg-[#10131D] border border-white/10 text-center space-y-2">
                <MessageCircle className="w-8 h-8 text-purple-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Public Discourse Threads</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Kai has participated in 420 technical architecture discussions across distributed systems & AI web agents.
                </p>
              </div>
            )}

            {/* CURATED LIKES TAB */}
            {activeTab === 'likes' && (
              <div className="p-8 rounded-2xl bg-[#10131D] border border-white/10 text-center space-y-2">
                <Heart className="w-8 h-8 text-rose-500 mx-auto fill-rose-500/20" />
                <h4 className="font-bold text-sm text-white">Curated Engineering Likes</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  48.9k liked posts on WebGL renderers, distributed edge networks, and typography specimens.
                </p>
              </div>
            )}

            {/* COMMUNITY FOLLOWER CIRCLE TAB */}
            {activeTab === 'community' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Sarah Lin', handle: '@sarahlin', bio: 'AI Research Lead @ Synthetix. Exploring mechanistic interpretability.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
                  { name: 'Marcus Sterling', handle: '@msterling', bio: 'Founding Partner @ Horizon Capital. Former core dev on Redis.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
                  { name: 'Devon Ray', handle: '@devonray', bio: 'Staff Systems Architect @ Cloudflare. Rust & WASM fanatic.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
                  { name: 'Dr. Marcus Wei', handle: '@mwei_bio', bio: 'Biomedical computation & spatial genomics researcher.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
                ].map((f, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#10131D] border border-white/10 flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-xs text-white">{f.name}</div>
                        <div className="text-[10px] font-mono text-purple-300">{f.handle}</div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{f.bio}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 rounded-lg border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white text-[10px] font-mono font-bold transition-all shrink-0">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* DIRECT MESSAGING MODAL / DRAWER */}
        {isMessageOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl bg-[#10131D] border border-white/15 shadow-2xl flex flex-col h-[520px] overflow-hidden">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0D1018]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                      alt="Sarah Lin"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0D1018]" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Sarah Lin</div>
                    <div className="text-[10px] text-slate-400 font-mono">Active now • AI Lead</div>
                  </div>
                </div>

                <button onClick={() => setIsMessageOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-purple-600 text-white rounded-br-none'
                          : 'bg-[#181C2B] text-slate-200 border border-white/5 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input Footer */}
              <form onSubmit={handleSendChat} className="p-3 border-t border-white/10 bg-[#0D1018] flex gap-2">
                <input
                  type="text"
                  placeholder="Type an instant message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-[#161926] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </DemoViewerShell>
  );
};
