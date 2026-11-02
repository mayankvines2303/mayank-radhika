import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

// Netflix-style horizontally scrolling row with desktop arrow controls.
export default function Row({ id, title, children }) {
  const scroller = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const update = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = scroller.current
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update, children])

  const scrollBy = (dir) => {
    const el = scroller.current
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="row" id={id} aria-labelledby={`${id}-title`}>
      <h2 className="row__title" id={`${id}-title`}>{title}</h2>
      <div className="row__wrap">
        {canLeft && (
          <button type="button" className="row__arrow row__arrow--left" aria-label={`Scroll ${title} left`} onClick={() => scrollBy(-1)}>
            <ChevronLeft />
          </button>
        )}
        <div className="row__scroller" ref={scroller} onScroll={update}>
          {children}
        </div>
        {canRight && (
          <button type="button" className="row__arrow row__arrow--right" aria-label={`Scroll ${title} right`} onClick={() => scrollBy(1)}>
            <ChevronRight />
          </button>
        )}
      </div>
    </section>
  )
}
