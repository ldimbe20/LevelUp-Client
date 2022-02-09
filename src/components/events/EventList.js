import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { Link, useHistory } from "react-router-dom"

export const EventList = (props) => {
  const [events, setEvents] = useState([])

  const history = useHistory()

  useEffect(() => {
    getEvents().then(data => setEvents(data))
  }, [])

  return (
    <article className="event">
      {events.map((event) => {
        return (
          <section>
            <h1> Play {event.game.title}</h1>

            {event.description} event held on {event.date} at {event.time}

        <Link className="btn" to={`/events/${event.id}/update`}>Edit Event</Link>
          </section>
        )
      })
      }


      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/events/new" })
        }}
      >Register New Event</button>


    </article>
  )
}
