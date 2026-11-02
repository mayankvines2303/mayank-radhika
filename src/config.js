// ─────────────────────────────────────────────────────────────────────────────
//  EDIT ME — everything personal on the site lives in this one file.
//
//  • All image/video paths are relative to the `public/` folder.
//  • To change a profile photo, drop a new image into public/images/profiles/
//    and update the `image` path below (any .jpg/.png/.svg works).
//  • To change a location or description, just edit the text.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_TITLE = 'MAYANK & RADHIKA'

// Seconds each photo stays on screen during the slideshow.
export const SLIDESHOW_SECONDS = 3.5

export const PROFILES = [
  { id: 'mayank', name: 'Mayank', image: 'images/profiles/mayank.svg' },
  { id: 'radhika', name: 'Radhika', image: 'images/profiles/radhika.svg' },
  { id: 'kids', name: 'Kids', image: 'images/profiles/kids.svg' },
]

// helpers that build the gallery lists from the numbered files in each folder
const photos = (folder, count) =>
  Array.from({ length: count }, (_, i) => ({
    type: 'image',
    src: `images/${folder}/photo-${String(i + 1).padStart(2, '0')}.jpg`,
  }))

const video = (folder, n) => ({
  type: 'video',
  src: `images/${folder}/video-${String(n).padStart(2, '0')}.mp4`,
  poster: `images/${folder}/video-${String(n).padStart(2, '0')}-poster.jpg`,
})

export const MEETUPS = [
  {
    id: 'first',
    title: 'THE FIRST MEETUP',
    date: '17 April 2026',
    isoDate: '2026-04-17',
    location: 'Location — add later',
    description: 'Our first memory together. Add the story of this day here.',
    // best photo → card thumbnail + featured photo on the detail page
    thumbnail: 'images/meetup-1/photo-04.jpg',
    // which part of the photo stays visible inside the wide card (x% y%)
    thumbnailPosition: '50% 30%',
    // folder: 01 / "1st Meetup" — 8 photos + 1 video
    items: [...photos('meetup-1', 8), video('meetup-1', 1)],
  },
  {
    id: 'second',
    title: 'THE SECOND MEETUP',
    date: '30 July 2026',
    isoDate: '2026-07-30',
    location: 'Location — add later',
    description: 'Our second memory together. Add the story of this day here.',
    thumbnail: 'images/meetup-2/photo-04.jpg',
    thumbnailPosition: '50% 38%',
    // folder: 02 / "2nd Meetup" — 11 photos + 1 video
    items: [...photos('meetup-2', 11), video('meetup-2', 1)],
  },
  {
    id: 'third',
    title: 'THE THIRD MEETUP',
    date: '30 September 2026',
    isoDate: '2026-09-30',
    location: 'Location — add later',
    description: 'Our third memory together. Add the story of this day here.',
    thumbnail: 'images/meetup-3/photo-03.jpg',
    thumbnailPosition: '50% 40%',
    // folder: 03 / "3rd Meetup" — 6 photos + 2 videos
    items: [...photos('meetup-3', 6), video('meetup-3', 1), video('meetup-3', 2)],
  },
]

export const WEDDING = {
  title: 'THE WEDDING CHAPTER',
  // the exact uploaded poster — used as-is, never edited
  poster: 'images/wedding/wedding-chapter-poster.png',
  posterWidth: 1536,
  posterHeight: 1024,
  lockedHeading: 'THE MOST BEAUTIFUL CHAPTER IS YET TO BEGIN.',
  lockedMessage: "Let's get married soon to unlock it. ❤️",
}
