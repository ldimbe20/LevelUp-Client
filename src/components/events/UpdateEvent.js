import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createEvent, getEvents, getSingleEvents, updateEvent } from './EventManager.js'
import { getGames } from "../games/GameManager.js"


export const UpdateEvent = () => {
  const history = useHistory()
  const [games, setGames] = useState([])
  const {eventId} = useParams()
  const parsedId = parseInt(eventId)


  const [currentEvent, setCurrentEvent] = useState({})

  useEffect(() => {
    getGames().then(gameData => setGames(gameData))
  }, [])

  useEffect(() => {
    // If you don't want to use a different serializer with no depth,
    // unpack the eventData and set the currentEvent fields individually
    getSingleEvents(parsedId).then(setCurrentEvent)
  }, [])


  const changeEventState = (domEvent) => {
    const copy = {...currentEvent}
    copy[domEvent.target.name] = domEvent.target.value

    setCurrentEvent(copy)
  }
console.log(eventId)
  return (
    <form className="eventForm">
      <h2 className="eventForm__time">Update Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input type="time" name="time" required className="form-control"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input type="date" name="date" required className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description </label>
          <textarea name="description" required className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
          ></textarea>
        </div>
      </fieldset>

      <fieldset>
        <div>
          <label>Event Type</label>
          <select onChange={changeEventState} name="game" value={currentEvent.game}>
            <option value="0">Select a Game</option>
            {
              games.map(game => <option value={game.id}>{game.title}</option>)
            }
          </select>
        </div>
      </fieldset>

      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()
          const UpdatedEvent = {
            id:currentEvent.id,
            description:currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            game: parseInt(currentEvent.game)
          }

          updateEvent(UpdatedEvent).then(() => history.push('/events'))
           
        }}
        className="btn btn-primary">Update</button>
    </form>
  )
}