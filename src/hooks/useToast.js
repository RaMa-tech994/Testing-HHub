import { useCallback, useRef, useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((message, type = 'success') => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setToast({ message, type, id: Date.now() })
    timerRef.current = window.setTimeout(() => setToast(null), 2800)
  }, [])

  const hideToast = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setToast(null)
  }, [])

  return { toast, showToast, hideToast }
}
