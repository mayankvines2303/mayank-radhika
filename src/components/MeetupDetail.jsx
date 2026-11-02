import { useCallback, useEffect, useMemo, useState } from 'react'
import { SLIDESHOW_SECONDS } from '../config'
import { useSwipe } from '../hooks'
import { asset } from '../utils'
import { BackIcon, CalendarIcon, ChevronLeft, ChevronRight, ExpandIcon, PauseIcon, PinIcon, PlayIcon } from './Icons'
import Lightbox from './Lightbox'
import Media from './Media'

export default function MeetupDetail({ meetup }) {
  const { items } = meetup
  const n = items.length
  const start = Math.max(0, items.findIndex((i) => i.src === meetup.thumbnail))
  const [index, setIndex] = useState(start)
  const [lightbox, setLightbox] = useState(false)
  const [playing, setPlaying] = useState(false)

  const step = useCallback((d) => setIndex((i) => (i + d + n) % n), [n])
  const toggle = useCallback(() => setPlaying((p) => !p), [])
  const closeLightbox = useCallback(() => {
    setLightbox(false)
    setPlaying(false) // slideshow stops when the gallery closes
  }, [])
  const swipe = useSwipe(step)

  // Slideshow timer: photos advance after a few seconds, videos advance when they end.
  useEffect(() => {
    if (!playing) return
    const isVideo = items[index].type === 'video'
    const t = window.setTimeout(() => step(1), (isVideo ? 60 : SLIDESHOW_SECONDS) * 1000)
    return () => window.clearTimeout(t)
  }, [playing, index, items, step])

  // Arrow keys move through photos on the page too (the lightbox has its own handler).
  useEffect(() => {
    if (lightbox) return
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'VIDEO') return
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, step])

  const current = items[index]
  const backdrop = useMemo(() => asset(current.type === 'video' ? current.poster : current.src), [current])

  return (
    <article className="detail" data-meetup-page={meetup.id}>
      <a className="back" href="#browse" data-action="back">
        <BackIcon /> <span>Back</span>
      </a>

      <div className="viewer" {...swipe}>
        <div className="viewer__bg fade-in" key={`bg-${index}`} style={{ backgroundImage: `url("${backdrop}")` }} />
        <div className="viewer__media fade-in" key={index}>
          {/* while the lightbox is open the page viewer shows the still, so only one video plays */}
          <Media
            item={lightbox && current.type === 'video' ? { type: 'image', src: current.poster } : current}
            alt={`${meetup.title} — photo ${index + 1}`}
            slideshow={playing && !lightbox}
            onEnded={() => playing && step(1)}
          />
        </div>
        {!lightbox && !(current.type === 'video') && (
          <button type="button" className="viewer__hit" aria-label="Open photo in gallery" onClick={() => setLightbox(true)} />
        )}
        <button type="button" className="nav-arrow nav-arrow--prev" onClick={() => step(-1)} aria-label="Previous photo">
          <ChevronLeft />
        </button>
        <button type="button" className="nav-arrow nav-arrow--next" onClick={() => step(1)} aria-label="Next photo">
          <ChevronRight />
        </button>
        <span className="viewer__count">{index + 1} / {n}</span>
        <div className="viewer__actions">
          <button type="button" className="pill" onClick={toggle} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} data-action="slideshow">
            {playing ? <PauseIcon /> : <PlayIcon />} <span>{playing ? 'Pause' : 'Slideshow'}</span>
          </button>
          <button type="button" className="icon-btn icon-btn--bg" aria-label="Open full-screen gallery" onClick={() => setLightbox(true)} data-action="open-lightbox">
            <ExpandIcon />
          </button>
        </div>
      </div>

      <header className="detail__info">
        <h1 className="detail__title">{meetup.title}</h1>
        <p className="detail__meta">
          <span><CalendarIcon /> <time dateTime={meetup.isoDate}>{meetup.date}</time></span>
          <span><PinIcon /> {meetup.location}</span>
        </p>
        <p className="detail__desc">{meetup.description}</p>
      </header>

      <section className="gallery" aria-label={`${meetup.title} gallery`}>
        <h2 className="gallery__title">Gallery <small>{n} memories</small></h2>
        <ul className="gallery__grid">
          {items.map((it, i) => (
            <li key={it.src}>
              <button
                type="button"
                className={`tile${i === index ? ' is-current' : ''}`}
                onClick={() => {
                  setIndex(i)
                  setLightbox(true)
                }}
                aria-label={`Open ${it.type === 'video' ? 'video' : 'photo'} ${i + 1} of ${n}`}
                data-tile
              >
                <img src={asset(it.type === 'video' ? it.poster : it.src)} alt="" loading="lazy" decoding="async" draggable={false} />
                {it.type === 'video' && <span className="tile__play"><PlayIcon /></span>}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {lightbox && (
        <Lightbox meetup={meetup} items={items} index={index} onStep={step} playing={playing} onTogglePlay={toggle} onClose={closeLightbox} />
      )}
    </article>
  )
}
