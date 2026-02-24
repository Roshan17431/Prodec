import { useState, useMemo } from 'react'
import { CATEGORIES, POSTS } from '../data/forumData.js'
import FilterBar from './FilterBar.jsx'
import PostCard from './PostCard.jsx'
import CreatePostModal from './CreatePostModal.jsx'
import './ForumPage.css'

const SORT_OPTIONS = [
  { value: 'newest',  label: '🕐 Newest' },
  { value: 'popular', label: '🔥 Popular' },
  { value: 'most-replied', label: '💬 Most Replies' },
]

export default function ForumPage({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [posts, setPosts] = useState(POSTS)
  const [showModal, setShowModal] = useState(false)
  const [likedPosts, setLikedPosts] = useState(new Set())

  const filtered = useMemo(() => {
    let list = [...posts]

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q)) ||
          p.author.name.toLowerCase().includes(q)
      )
    }

    // Pinned first
    list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

    // Sort
    if (sortBy === 'newest') {
      list.sort((a, b) => {
        if (a.pinned !== b.pinned) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    } else if (sortBy === 'popular') {
      list.sort((a, b) => {
        if (a.pinned !== b.pinned) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        return b.likes - a.likes
      })
    } else if (sortBy === 'most-replied') {
      list.sort((a, b) => {
        if (a.pinned !== b.pinned) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        return b.replies - a.replies
      })
    }

    return list
  }, [posts, activeCategory, searchQuery, sortBy])

  function handleAddPost(newPost) {
    setPosts(prev => [newPost, ...prev])
    setShowModal(false)
  }

  function handleToggleLike(postId) {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
        setPosts(ps => ps.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p))
      } else {
        next.add(postId)
        setPosts(ps => ps.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p))
      }
      return next
    })
  }

  return (
    <div className="forum-page" id="forum">
      {/* Hero */}
      <div className="forum-hero">
        <div className="forum-hero-text">
          <h1 className="forum-title">Community Forum</h1>
          <p className="forum-subtitle">
            Discuss ideas, share projects, ask questions and connect with fellow builders.
          </p>
        </div>
        <button className="btn-new-post" onClick={() => setShowModal(true)}>
          ✏️ New Post
        </button>
      </div>

      {/* Stats bar */}
      <div className="forum-stats">
        <div className="stat"><span className="stat-value">{posts.length}</span><span className="stat-label">Posts</span></div>
        <div className="stat-divider" />
        <div className="stat"><span className="stat-value">6</span><span className="stat-label">Members</span></div>
        <div className="stat-divider" />
        <div className="stat"><span className="stat-value">{CATEGORIES.length - 1}</span><span className="stat-label">Categories</span></div>
      </div>

      {/* Filters */}
      <FilterBar
        categories={CATEGORIES}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Sort & count */}
      <div className="forum-toolbar">
        <span className="results-count">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          aria-label="Sort posts by"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-emoji">🔍</p>
          <p className="empty-msg">No posts found. Try a different search or category.</p>
          <button className="btn-new-post" onClick={() => setShowModal(true)}>
            Start a new discussion
          </button>
        </div>
      ) : (
        <div className="post-list">
          {filtered.map(post => (
            <PostCard
              key={post.id}
              post={post}
              liked={likedPosts.has(post.id)}
              onToggleLike={handleToggleLike}
            />
          ))}
        </div>
      )}

      {/* Create post modal */}
      {showModal && (
        <CreatePostModal
          categories={CATEGORIES.filter(c => c.id !== 'all')}
          onAdd={handleAddPost}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
