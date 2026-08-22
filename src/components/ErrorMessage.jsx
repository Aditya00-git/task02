export default function ErrorMessage({ title = "Couldn't load the weather", message, onRetry, children }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-box__title">{title}</p>
      {message && <p className="error-box__detail">{message}</p>}
      {children}
      {!children && onRetry && (
        <button className="error-box__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
