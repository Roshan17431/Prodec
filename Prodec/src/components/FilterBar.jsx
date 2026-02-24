import './FilterBar.css'

export default function FilterBar({ categories, active, onSelect }) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filter by category">
      {categories.map(cat => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          className={`filter-btn${active === cat.id ? ' active' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="filter-emoji">{cat.emoji}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  )
}
