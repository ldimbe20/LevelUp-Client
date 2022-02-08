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
            <h1> Play </h1>

            {event.description}
            {event.date} at {event.time}
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
