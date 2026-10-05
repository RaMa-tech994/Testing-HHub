export function Toast({ toast, onClose }) {
  if (!toast) return null
  return (
    <div className={`toast toast-${toast.type}`} role="status">
      <span>{toast.message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Uždaryti pranešimą">
        ×
      </button>
    </div>
  )
}
