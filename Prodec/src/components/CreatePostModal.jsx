import { useState } from 'react'
import './CreatePostModal.css'

let nextId = 100

export default function CreatePostModal({ categories, onAdd, onClose }) {
  const [title, setTitle]       = useState('')
  const [body, setBody]         = useState('')
  const [category, setCategory] = useState(categories[0]?.id || 'general')
  const [tags, setTags]         = useState('')
  const [error, setError]       = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required.'); return }
    if (!body.trim())  { setError('Body is required.');  return }

    const newPost = {
      id: ++nextId,
      title: title.trim(),
      body: body.trim(),
      category,
      author: { name: 'You', avatar: 'YO', color: '#4f46e5' },
      tags: tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean),
      replies: 0,
      views: 1,
      likes: 0,
      pinned: false,
      createdAt: new Date().toISOString(),
    }
    onAdd(newPost)
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">✏️ New Discussion</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="form-error" role="alert">{error}</p>}

          <label className="form-label" htmlFor="post-title">Title *</label>
          <input
            id="post-title"
            className="form-input"
            type="text"
            placeholder="What's on your mind?"
            value={title}
            onChange={e => { setTitle(e.target.value); setError('') }}
            maxLength={120}
            autoFocus
          />

          <label className="form-label" htmlFor="post-category">Category *</label>
          <select
            id="post-category"
            className="form-input"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
            ))}
          </select>

          <label className="form-label" htmlFor="post-body">Body *</label>
          <textarea
            id="post-body"
            className="form-input form-textarea"
            placeholder="Share more details…"
            value={body}
            onChange={e => { setBody(e.target.value); setError('') }}
            rows={5}
          />

          <label className="form-label" htmlFor="post-tags">Tags <span className="form-hint">(comma-separated)</span></label>
          <input
            id="post-tags"
            className="form-input"
            type="text"
            placeholder="e.g. react, design, feedback"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Post Discussion</button>
          </div>
        </form>
      </div>
    </div>
  )
}
