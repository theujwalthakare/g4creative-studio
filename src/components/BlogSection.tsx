import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { Search, BookOpen, Clock, Tag, Sparkles, X, Share2, ShieldCheck, FileText, ChevronRight, Check } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [showSeoInspector, setShowSeoInspector] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const categories = ['All', 'Viral Content', 'Paid Ads', 'Influencer ROI', 'Social Strategy'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
              SEO Content & Industry Insights
            </div>
            <h2 className="text-5xl sm:text-7xl font-serif italic text-zinc-100 leading-[0.9]">
              Agency insights &{' '}
              <span className="text-zinc-500">
                SEO playbooks.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-md">
              Deep dives into social algorithms, viral hook scripting, paid media scaling, and direct CRM lead capture.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search insights or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 text-zinc-100 text-[10px] uppercase tracking-widest font-bold focus:border-emerald-400 focus:outline-none placeholder:text-zinc-500"
              id="blog-search-input"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-6 mb-12 pb-4 border-b border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${
                selectedCategory === cat
                  ? 'text-zinc-100 border-b border-emerald-400 pb-1'
                  : 'text-zinc-500 hover:text-emerald-400 pb-1'
              }`}
              id={`blog-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group cursor-pointer bg-zinc-900 border border-zinc-800 flex flex-col justify-between hover:border-emerald-400 transition-colors"
              id={`blog-card-${post.id}`}
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden bg-zinc-800 mb-6">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-2 py-1 bg-zinc-950 text-[9px] font-mono uppercase tracking-tighter text-emerald-400">
                    {post.category}
                  </div>
                  <div className="absolute bottom-4 right-4 text-[9px] font-mono font-bold text-zinc-950 bg-emerald-400 px-2 py-1 uppercase">
                    SEO {post.seoScore}/100
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 space-y-4">
                  <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-mono uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span>/</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-2xl font-serif italic text-zinc-100 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Author & Footer */}
              <div className="p-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 object-cover border border-zinc-800 grayscale" />
                  <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest">{post.author.name}</span>
                </div>
                <div className="text-lg text-emerald-400 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 p-8 sm:p-12 space-y-8">
              
              <button
                onClick={() => {
                  setActiveArticle(null);
                  setShowSeoInspector(false);
                }}
                className="absolute top-8 right-8 text-zinc-500 hover:text-emerald-400 transition-colors"
                id="close-article-modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="space-y-6 max-w-2xl pt-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                    {activeArticle.category}
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowSeoInspector(!showSeoInspector)}
                      className="text-[10px] text-zinc-500 hover:text-emerald-400 font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                      id="toggle-seo-inspector-btn"
                    >
                      <span>{showSeoInspector ? 'Hide SEO Tags' : 'Inspect SEO Meta Tags'}</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="text-zinc-500 hover:text-emerald-400 transition-colors"
                      title="Share Article Link"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-6xl font-serif italic text-zinc-100 leading-[0.9]">
                  {activeArticle.title}
                </h1>

                <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono uppercase tracking-widest pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <img src={activeArticle.author.avatar} alt={activeArticle.author.name} className="w-8 h-8 object-cover grayscale" />
                    <span className="text-zinc-100 font-bold">{activeArticle.author.name}</span>
                  </div>
                  <span>/</span>
                  <span>{activeArticle.date}</span>
                  <span>/</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* SEO Meta Inspector Drawer */}
              {showSeoInspector && (
                <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-400 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-zinc-800 pb-4 uppercase tracking-widest text-[10px]">
                    <span>SEO Content Optimization & Schema Markup</span>
                    <span>Score {activeArticle.seoScore}/100</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 font-bold">&lt;title&gt;</span>
                    <p className="text-zinc-300 mt-1">{activeArticle.title} | g4creative studio</p>
                  </div>
                  <div>
                    <span className="text-zinc-600 font-bold">&lt;meta name="description"&gt;</span>
                    <p className="text-zinc-300 mt-1">{activeArticle.metaDescription}</p>
                  </div>
                  <div>
                    <span className="text-zinc-600 font-bold">OpenGraph Tags:</span>
                    <p className="text-zinc-500 mt-1">og:title, og:image, og:type="article", canonical="https://g4creative.studio/blog/{activeArticle.slug}"</p>
                  </div>
                </div>
              )}

              {/* Cover Image */}
              <div className="aspect-video border border-zinc-800 bg-zinc-900 overflow-hidden">
                <img src={activeArticle.coverImage} alt={activeArticle.title} className="w-full h-full object-cover grayscale opacity-80" />
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-line font-sans">
                {activeArticle.content}
              </div>

              {/* Footer Tags */}
              <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4">
                {activeArticle.tags.map((t) => (
                  <span key={t} className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                    #{t}
                  </span>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
