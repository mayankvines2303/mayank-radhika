import { useState } from 'react'
import { MEETUPS, WEDDING } from '../config'
import LockedModal from './LockedModal'
import MeetupCard from './MeetupCard'
import Row from './Row'
import WeddingCard from './WeddingCard'

export default function Home({ query }) {
  const [locked, setLocked] = useState(false)
  const q = query.trim().toLowerCase()

  const meetups = MEETUPS.filter(
    (m) => !q || [m.title, m.date, m.location, m.description].join(' ').toLowerCase().includes(q),
  )
  const showWedding = !q || [WEDDING.title, 'locked', 'coming soon', 'wedding', 'chapter'].join(' ').toLowerCase().includes(q)

  return (
    <div className="home">
      {meetups.length > 0 && (
        <Row id="meetups" title="THE MEETUPS">
          {meetups.map((m) => (
            <MeetupCard key={m.id} meetup={m} />
          ))}
        </Row>
      )}

      {showWedding && (
        <Row id="wedding" title={WEDDING.title}>
          <WeddingCard onOpen={() => setLocked(true)} />
        </Row>
      )}

      {meetups.length === 0 && !showWedding && (
        <p className="empty" role="status">Nothing matches “{query.trim()}”. Try “meetup”, “April” or “wedding”.</p>
      )}

      {locked && <LockedModal onClose={() => setLocked(false)} />}
    </div>
  )
}
