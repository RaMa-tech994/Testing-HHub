import { useEffect } from 'react'
import { IconClose } from './Icons'

export function Modal({
  open,
  title,
  onClose,
  children,
  wide = false,
  side = false,
}) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`overlay ${side ? 'overlay-side' : ''}`} onMouseDown={onClose}>
      <div
        className={`modal ${wide ? 'modal-wide' : ''} ${side ? 'drawer' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="dialog-title">{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Uždaryti">
            <IconClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
