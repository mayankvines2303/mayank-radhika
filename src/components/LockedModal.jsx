import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { WEDDING } from '../config'
import { useBodyLock, useEscape, useFocusReturn } from '../hooks'
import { CloseIcon } from './Icons'

const HEARTS = [8, 18, 30, 42, 55, 67, 78, 90]

function AnimatedLock() {
  return (
    <svg className="lockanim" viewBox="0 0 64 64" aria-hidden="true">
      <g className="lockanim__shackle">
        <path d="M20 29V21a12 12 0 0 1 24 0v8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
      <rect x="12" y="28" width="40" height="30" rx="6" fill="currentColor" />
      <circle cx="32" cy="41" r="4" fill="#141414" />
      <rect x="30" y="42" width="4" height="9" rx="2" fill="#141414" />
    </svg>
  )
}

export default function LockedModal({ onClose }) {
  const closeRef = useRef(null)
  useEscape(onClose)
  useBodyLock()
  useFocusReturn(closeRef)

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="locked-title" onClick={onClose}>
      <div className="modal__hearts" aria-hidden="true">
        {HEARTS.map((left, i) => (
          <span key={left} style={{ left: `${left}%`, animationDelay: `${(i * 0.9) % 6}s`, animationDuration: `${7 + (i % 4)}s` }}>♥</span>
        ))}
      </div>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="icon-btn modal__close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        <AnimatedLock />
        <h2 id="locked-title" className="modal__title">{WEDDING.lockedHeading}</h2>
        <p className="modal__text">{WEDDING.lockedMessage}</p>
      </div>
    </div>,
    document.body,
  )
}
