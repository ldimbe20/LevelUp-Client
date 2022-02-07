import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent, getGameTypes } from './EventManager.js'


export const EventForm = () => {
  const history = useHistory()
  const [gameTypes, setGameTypes] = useState([])


  //creating state to collect from input field


  const [currentEvent, setCurrentEvent] = useState({
    gameId: 1,
    description: "",
    date: "",
    time: "",
    gamerId: 1,
  })

//   useEffect(() => {
    
//     getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
//   }, [])

  const changeEventState = (domEvent) => {
    const copy = {...currentEvent}
    // const copy = Object.assign({}, currentEvent)
    copy[domEvent.target.name] = domEvent.target.value

    setCurrentEvent(copy)
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>

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
            maker: currentEvent.maker,
            title: currentEvent.title,
            number_of_players: parseInt(currentEvent.numberOfPlayers),
            skill_level: parseInt(currentEvent.skillLevel),
            game_type: parseInt(currentEvent.gameTypeId)
          }

          // Send POST request to your API
          createEvent(event)
            .then(() => history.push("/events"))
        }}
        className="btn btn-primary">Create</button>
    </form>
  )
}