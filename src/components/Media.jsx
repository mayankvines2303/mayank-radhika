import { useEffect, useRef } from 'react'
import { asset } from '../utils'

// Renders one gallery item (photo or video). While the slideshow is playing a
// video starts by itself and the slideshow moves on when it ends.
export default function Media({ item, alt, slideshow = false, onEnded, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v || !slideshow) return
    const p = v.play()
    if (p?.catch) {
      p.catch(() => {
        // autoplay with sound can be blocked — retry muted
        v.muted = true
        v.play().catch(() => {})
      })
    }
  }, [slideshow, item])

  if (item.type === 'video') {
    return (
      <video
        ref={ref}
        className={className}
        src={asset(item.src)}
        poster={asset(item.poster)}
        controls
        playsInline
        preload="metadata"
        onEnded={onEnded}
      />
    )
  }
  return <img className={className} src={asset(item.src)} alt={alt} draggable={false} decoding="async" />
}
