import { useCallback, useEffect, useRef, useState } from 'react'
import { MEETUPS, PROFILES } from './config'
import Home from './components/Home'
import MeetupDetail from './components/MeetupDetail'
import Navbar from './components/Navbar'
import ProfileGate from './components/ProfileGate'
import { readSession, writeSession } from './utils'

const PROFILE_KEY = 'mr-profile'

function readRoute() {
  // hash routes: #profiles · #browse · #meetup-first / -second / -third
  const hash = window.location.hash.replace(/^#/, '')
  if (hash.startsWith('meetup-')) return { name: 'meetup', id: hash.slice(7) }
  if (hash === 'browse') return { name: 'browse' }
  return { name: 'profiles' }
}

const go = (path) => {
  window.location.hash = path
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [profileId, setProfileId] = useState(() => readSession(PROFILE_KEY))
  const [query, setQuery] = useState('')
  const pendingScroll = useRef(null)

  useEffect(() => {
    const onHash = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const profile = PROFILES.find((p) => p.id === profileId)
  const meetup = route.name === 'meetup' ? MEETUPS.find((m) => m.id === route.id) : null

  // Guards: no profile yet → profile screen; unknown meetup → homepage.
  useEffect(() => {
    if (route.name !== 'profiles' && !profile) window.location.replace('#profiles')
    else if (route.name === 'meetup' && !meetup) window.location.replace('#browse')
  }, [route, profile, meetup])

  const key = route.name + (route.id || '')
  useEffect(() => {
    const target = pendingScroll.current
    pendingScroll.current = null
    if (target && target !== 'top') {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [key])

  const pickProfile = useCallback((id) => {
    writeSession(PROFILE_KEY, id)
    setProfileId(id)
    go('browse')
  }, [])

  // quick-switch from the profile dropdown: change profile, stay on the current page
  const switchTo = useCallback((id) => {
    writeSession(PROFILE_KEY, id)
    setProfileId(id)
  }, [])

  const onGoSection = useCallback(
    (section) => {
      setQuery('')
      if (route.name === 'browse') {
        if (section === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
        else document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        pendingScroll.current = section
        go('browse')
      }
    },
    [route.name],
  )

  const onQuery = useCallback(
    (value) => {
      setQuery(value)
      if (value.trim() && route.name !== 'browse') go('browse')
    },
    [route.name],
  )

  if (route.name === 'profiles' || !profile) {
    return (
      <div className="page" key="profiles">
        <ProfileGate onPick={pickProfile} />
      </div>
    )
  }

  return (
    <>
      <Navbar profile={profile} query={query} setQuery={onQuery} onGoSection={onGoSection} onPickProfile={switchTo} onSwitch={() => go('profiles')} />
      <main className="page page--app" key={key}>
        {route.name === 'meetup' && meetup ? <MeetupDetail meetup={meetup} /> : <Home query={query} />}
      </main>
    </>
  )
}
