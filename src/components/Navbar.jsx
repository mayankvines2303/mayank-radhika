import { useEffect, useRef, useState } from 'react'
import { PROFILES, SITE_TITLE } from '../config'
import { asset } from '../utils'
import { CaretIcon, CheckIcon, CloseIcon, MenuIcon, SearchIcon } from './Icons'

export default function Navbar({ profile, query, setQuery, onGoSection, onPickProfile, onSwitch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searching, setSearching] = useState(Boolean(query))
  const [solid, setSolid] = useState(false)
  const rootRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setMenuOpen(false)
        setProfileOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      setProfileOpen(false)
      if (searching && document.activeElement === inputRef.current) closeSearch()
    }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searching])

  const openSearch = () => {
    setMenuOpen(false)
    setProfileOpen(false)
    setSearching(true)
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }
  const closeSearch = () => {
    setQuery('')
    setSearching(false)
  }

  const go = (fn) => () => {
    setMenuOpen(false)
    setProfileOpen(false)
    fn()
  }

  return (
    <header ref={rootRef} className={`nav${solid || menuOpen || profileOpen ? ' nav--solid' : ''}${searching ? ' nav--searching' : ''}`}>
      <div className="nav__left">
        <div className="nav__menuwrap">
          <button
            type="button"
            className="icon-btn nav__burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => {
              setProfileOpen(false)
              setMenuOpen((v) => !v)
            }}
          >
            <MenuIcon />
          </button>
          {menuOpen && (
            <nav id="main-menu" className="dropdown dropdown--left" aria-label="Main menu">
              <button type="button" onClick={go(() => onGoSection('top'))}>Home</button>
              <button type="button" onClick={go(() => onGoSection('meetups'))}>The Meetups</button>
              <button type="button" onClick={go(() => onGoSection('wedding'))}>The Wedding Chapter</button>
              <hr />
              <button type="button" onClick={go(onSwitch)}>Switch Profile</button>
            </nav>
          )}
        </div>
        <a className="nav__brand" href="#browse" onClick={() => onGoSection('top')}>
          {SITE_TITLE}
        </a>
      </div>

      <div className="nav__right">
        <div className={`search${searching ? ' is-open' : ''}`}>
          <button type="button" className="icon-btn" aria-label="Search" onClick={searching ? () => inputRef.current?.focus() : openSearch}>
            <SearchIcon />
          </button>
          {searching && (
            <>
              <input
                ref={inputRef}
                className="search__input"
                type="search"
                placeholder="Search memories"
                aria-label="Search memories"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              <button type="button" className="icon-btn search__close" aria-label="Close search" onClick={closeSearch}>
                <CloseIcon />
              </button>
            </>
          )}
        </div>

        <div className="nav__profilewrap">
          <button
            type="button"
            className="nav__profile"
            aria-label={`Profile: ${profile.name}`}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            onClick={() => {
              setMenuOpen(false)
              setProfileOpen((v) => !v)
            }}
          >
            <img src={asset(profile.image)} alt="" draggable={false} />
            <CaretIcon className={`caret${profileOpen ? ' caret--up' : ''}`} />
          </button>
          {profileOpen && (
            <div className="dropdown dropdown--right" role="menu">
              {PROFILES.map((p) => (
                <button key={p.id} type="button" role="menuitem" className="dropdown__profile" onClick={go(() => onPickProfile(p.id))}>
                  <img src={asset(p.image)} alt="" />
                  <span>{p.name}</span>
                  {p.id === profile.id && <CheckIcon className="dropdown__check" />}
                </button>
              ))}
              <hr />
              <button type="button" role="menuitem" onClick={go(onSwitch)}>Switch Profile</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
