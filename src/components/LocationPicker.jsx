export default function LocationPicker({ results, onSelect }) {
  return (
    <div className="location-picker">
      <p className="location-picker__title">Multiple matches — pick one:</p>
      <ul>
        {results.map((loc) => (
          <li key={loc.id}>
            <button onClick={() => onSelect(loc)}>
              {loc.name}
              <span>{[loc.admin1, loc.country].filter(Boolean).join(', ')}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
