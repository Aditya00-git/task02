export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__bars">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loader__label">{label}</p>
    </div>
  )
}
