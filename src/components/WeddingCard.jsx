import { WEDDING } from '../config'
import { asset } from '../utils'
import { LockIcon } from './Icons'

export default function WeddingCard({ onOpen }) {
  return (
    <button type="button" className="wedding" onClick={onOpen} aria-haspopup="dialog" aria-label={`${WEDDING.title} — locked`} data-wedding>
      <span className="wedding__img" style={{ aspectRatio: `${WEDDING.posterWidth} / ${WEDDING.posterHeight}` }}>
        <img
          src={asset(WEDDING.poster)}
          alt="The Wedding Chapter poster — locked"
          width={WEDDING.posterWidth}
          height={WEDDING.posterHeight}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
      <span className="wedding__meta">
        <LockIcon className="wedding__lock" />
        <span className="badge">LOCKED</span>
        <span className="wedding__soon">Coming soon</span>
      </span>
    </button>
  )
}
