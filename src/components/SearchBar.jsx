import { useState } from 'react'

const QUICK_PICKS = ['Ahmedabad', 'Mumbai', 'Delhi', 'London', 'New York', 'Tokyo']

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <div className="searchbar">
      <form className="searchbar__field" onSubmit={handleSubmit}>
        <span className="searchbar__index">📍</span>
        <input
          type="text"
          placeholder="Search a city…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Search city"
        />
        <button type="submit" className="searchbar__submit" disabled={loading}>
          {loading ? '…' : 'Search'}
        </button>
      </form>

      <div className="searchbar__quick">
        {QUICK_PICKS.map((city) => (
          <button
            key={city}
            type="button"
            className="searchbar__chip"
            onClick={() => {
              setValue(city)
              onSearch(city)
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}
