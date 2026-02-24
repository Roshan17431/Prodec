import { useState } from 'react'
import { CATEGORIES } from '../data/forumData.js'
import './PostCard.css'

const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
)

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function PostCard({ post, liked, onToggleLike }) {
  const [expanded, setExpanded] = useState(false)
  const cat = CATEGORY_MAP[post.category] || { label: post.category, emoji: '📌' }
  const isLong = post.body.length > 160

  return (
    <article className={`post-card${post.pinned ? ' pinned' : ''}`}>
      {post.pinned && <div className="pin-badge">📌 Pinned</div>}

      <div className="post-card-main">
        {/* Avatar */}
        <div
          className="avatar"
          style={{ background: post.author.color }}
          aria-hidden="true"
        >
          {post.author.avatar}
        </div>

        {/* Content */}
        <div className="post-content">
          {/* Category pill */}
          <span className="category-pill">
            {cat.emoji} {cat.label}
          </span>

          {/* Title */}
          <h2 className="post-title">{post.title}</h2>

          {/* Body */}
          <p className={`post-body${expanded ? ' expanded' : ''}`}>
            {post.body}
          </p>
          {isLong && (
            <button
              className="read-more"
              onClick={() => setExpanded(v => !v)}
            >
              {expanded ? 'Show less ▲' : 'Read more ▼'}
            </button>
          )}

          {/* Tags */}
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>

          {/* Meta row */}
          <div className="post-meta">
            <span className="meta-author">by {post.author.name}</span>
            <span className="meta-sep">·</span>
            <span className="meta-time">{timeAgo(post.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button
          className={`action-btn like-btn${liked ? ' liked' : ''}`}
          onClick={() => onToggleLike(post.id)}
          aria-label={liked ? 'Unlike' : 'Like'}
          aria-pressed={liked}
        >
          {liked ? '❤️' : '🤍'} {post.likes}
        </button>
        <button className="action-btn" aria-label="Replies">
          💬 {post.replies}
        </button>
        <button className="action-btn" aria-label="Views">
          👁️ {post.views}
        </button>
        <button className="action-btn share-btn" aria-label="Share">
          🔗 Share
        </button>
      </div>
    </article>
  )
}
