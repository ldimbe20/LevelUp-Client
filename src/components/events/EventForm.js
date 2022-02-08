import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent } from './EventManager.js'
import { getGames } from "../games/GameManager.js"


export const EventForm = () => {
  const history = useHistory()
  const [gameTypes, setGameTypes] = useState([])


  //creating state to collect from input field


  const [currentEvent, setCurrentEvent] = useState({
    gameId:1,
    description: "",
    date: "",
    time: ""
  })

  useEffect(() => {
    
    getGames().then(gameData => setGameTypes(gameData))
  }, [])

  const changeEventState = (domEvent) => {
    const copy = {...currentEvent}
    // const copy = Object.assign({}, currentEvent)
    copy[domEvent.target.name] = domEvent.target.value

    setCurrentEvent(copy)
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Event</h2>

      <fieldset>
        <div>
          <label>Game Type</label>
          <select onChange={changeEventState} name="gameId" value={currentEvent.gameId}>
            <option value="0">Select a game type</option>
            {
              gameTypes.map(gameType => <option value={gameType.id}>{gameType.title}</option>)
            }
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input type="text" name="description" required autoFocus className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input type="date" name="date" required autoFocus className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input type="time" name="time" required autoFocus className="form-control"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      {/* TODO: create the rest of the input fields */}

      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          const event = {
            game:currentEvent.gameId,
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
          }

          // Send POST request to your API
          createEvent(event)
            .then(() => history.push("/events"))
        }}
        className="btn btn-primary">Create</button>
    </form>
  )
}


