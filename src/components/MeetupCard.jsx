import { asset } from '../utils'

export default function MeetupCard({ meetup }) {
  return (
    <a className="card" href={`#meetup-${meetup.id}`} data-meetup={meetup.id}>
      <span className="card__img">
        <img src={asset(meetup.thumbnail)} alt={`${meetup.title} thumbnail`} style={{ objectPosition: meetup.thumbnailPosition }} draggable={false} />
      </span>
      <span className="card__title">{meetup.title}</span>
      <time className="card__date" dateTime={meetup.isoDate}>{meetup.date}</time>
    </a>
  )
}
