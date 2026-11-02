import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useBodyLock, useFocusReturn, useSwipe } from '../hooks'
import { ChevronLeft, ChevronRight, CloseIcon, PauseIcon, PlayIcon } from './Icons'
import Media from './Media'

export default function Lightbox({ meetup, items, index, onStep, playing, onTogglePlay, onClose }) {
  const closeRef = useRef(null)
  const swipe = useSwipe(onStep)
  useBodyLock()
  useFocusReturn(closeRef)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onStep(1)
      else if (e.key === 'ArrowLeft') onStep(-1)
      else if (e.key === ' ' && e.target.tagName !== 'VIDEO' && e.target.tagName !== 'BUTTON') {
        e.preventDefault()
        onTogglePlay()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep, onTogglePlay])

  const item = items[index]

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${meetup.title} gallery`}>
      <div className="lightbox__bar">
        <span className="lightbox__count" aria-live="polite">{index + 1} / {items.length}</span>
        <div className="lightbox__actions">
          <button type="button" className="icon-btn" onClick={onTogglePlay} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} data-action="slideshow">
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close gallery" data-action="close-lightbox">
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="lightbox__stage" {...swipe} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" className="nav-arrow nav-arrow--prev" onClick={() => onStep(-1)} aria-label="Previous photo">
          <ChevronLeft />
        </button>
        <div className="lightbox__media fade-in" key={index}>
          <Media item={item} alt={`${meetup.title} — photo ${index + 1}`} slideshow={playing} onEnded={() => playing && onStep(1)} />
        </div>
        <button type="button" className="nav-arrow nav-arrow--next" onClick={() => onStep(1)} aria-label="Next photo">
          <ChevronRight />
        </button>
      </div>

      <div className="lightbox__caption">
        <strong>{meetup.title}</strong>
        <span>{meetup.date}</span>
      </div>
    </div>,
    document.body,
  )
}
