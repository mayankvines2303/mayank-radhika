import { useState } from 'react'
import { PROFILES, SITE_TITLE } from '../config'
import { asset } from '../utils'

export default function ProfileGate({ onPick }) {
  const [picked, setPicked] = useState(null)

  const choose = (id) => {
    if (picked) return
    setPicked(id)
    // let the selection animation play, then go to the homepage
    window.setTimeout(() => onPick(id), 380)
  }

  return (
    <section className={`gate${picked ? ' gate--leaving' : ''}`} aria-labelledby="gate-title">
      <div className="gate__brand">{SITE_TITLE}</div>
      <h1 id="gate-title" className="gate__title">
        Who’s Watching?
      </h1>
      <ul className="gate__list">
        {PROFILES.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={`profile${picked === p.id ? ' is-picked' : ''}`}
              onClick={() => choose(p.id)}
              aria-label={`Watch as ${p.name}`}
              data-profile={p.id}
            >
              <span className="profile__img">
                <img src={asset(p.image)} alt="" draggable={false} />
              </span>
              <span className="profile__name">{p.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
