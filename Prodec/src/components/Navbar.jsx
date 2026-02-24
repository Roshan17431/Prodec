import { useState } from 'react'
import './Navbar.css'

export default function Navbar({ searchQuery, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <span className="logo-icon">🛠️</span>
          <span className="logo-text">PRODDEC</span>
        </a>

        {/* Desktop search */}
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="Search discussions…"
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            className="search-input"
            aria-label="Search discussions"
          />
        </div>

        {/* Desktop nav links */}
        <nav className="navbar-links" aria-label="Primary navigation">
          <a href="#forum" className="nav-link active">Forum</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#about" className="nav-link">About</a>
        </nav>

        {/* CTA */}
        <div className="navbar-actions">
          <button className="btn-sign-in">Sign In</button>
          <button className="btn-join">Join Free</button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <span className="search-icon">🔍</span>
            <input
              type="search"
              placeholder="Search discussions…"
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <nav className="mobile-links">
            <a href="#forum"      className="nav-link" onClick={() => setMenuOpen(false)}>Forum</a>
            <a href="#categories" className="nav-link" onClick={() => setMenuOpen(false)}>Categories</a>
            <a href="#about"      className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
          </nav>
          <div className="mobile-actions">
            <button className="btn-sign-in">Sign In</button>
            <button className="btn-join">Join Free</button>
          </div>
        </div>
      )}
    </header>
  )
}
