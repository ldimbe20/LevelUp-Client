import React, { useEffect, useState } from "react"
import { getEvents, deleteEvent, joinEvent, leaveEvent} from "./EventManager.js"
import { Link, useHistory } from "react-router-dom"


export const EventList = (props) => {
  const [events, setEvents] = useState([])
  const history = useHistory()

  const getAllTheEvents = () => getEvents().then(data => setEvents(data))

  useEffect(() => {
    getAllTheEvents()
  }, [])

  // useEffect(() => {
  //   getEvents().then(data => setEvents(data))
  // }, [])

  return (
    <article className="event">
      {events.map((event) => {
        return (
          <section>
            <h1> Play {event.game.title}</h1>

            {event.description} event held on {event.date} at {event.time}

        <Link className="btn" to={`/events/${event.id}/update`}>Edit Event</Link>
        <button onClick={() => {
              deleteEvent(event.id).then(getAllTheEvents)
            }}>Delete Event</button>
            {
              event.joined
                ?
                // Leave button
                <button onClick={() => {
                  leaveEvent(event.id).then(getAllTheEvents)
                }}>
                  Leave Event
                </button>
                :
                // join button
                <button onClick={() => {
                  joinEvent(event.id).then(getAllTheEvents)
                }}>
                  Join Event
                </button>
            }
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
