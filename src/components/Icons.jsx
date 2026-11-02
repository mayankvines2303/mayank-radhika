const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}
const I = (children, extra) => (props) => (
  <svg {...base} {...extra} {...props}>
    {children}
  </svg>
)

export const SearchIcon = I(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
)
export const MenuIcon = I(<path d="M4 6h16M4 12h16M4 18h16" />)
export const CaretIcon = I(<path d="m6 9 6 6 6-6" />)
export const CloseIcon = I(<path d="M6 6l12 12M18 6 6 18" />)
export const ChevronLeft = I(<path d="m15 5-7 7 7 7" />)
export const ChevronRight = I(<path d="m9 5 7 7-7 7" />)
export const BackIcon = I(<path d="M19 12H5m6-7-7 7 7 7" />)
export const CheckIcon = I(<path d="m5 12 5 5 9-10" />)
export const CalendarIcon = I(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </>,
)
export const PinIcon = I(
  <>
    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.800 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </>,
)
export const ExpandIcon = I(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />)
export const PlayIcon = I(<path d="M7 4.500v15l13-7.500z" fill="currentColor" />)
export const PauseIcon = I(
  <>
    <rect x="6" y="4.500" width="4" height="15" rx="1" fill="currentColor" />
    <rect x="14" y="4.500" width="4" height="15" rx="1" fill="currentColor" />
  </>,
)
export const LockIcon = I(
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" stroke="none" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </>,
)
