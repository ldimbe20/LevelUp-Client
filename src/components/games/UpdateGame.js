import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { updateGame, getGames, getSingleGames, getGameTypes } from './GameManager.js'



export const UpdateGame = () => {
  const history = useHistory()
  const [games, setGames] = useState([])
  const {gameId} = useParams()
  const parsedId = parseInt(gameId)
  const [gameTypes, setGameTypes] = useState([])



  const [currentGame, setCurrentGame] = useState({})



  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))

  }, [])

  useEffect(() => {
    // If you don't want to use a different serializer with no depth,
    // unpack the gameData and set the currentGame fields individually
    getSingleGames(parsedId).then(data => setCurrentGame(data)
    )
  }, [])

//! below is setting the target name to equal the target value, that way you can change the target value but it will still match up to the name. 

  const changeGameState = (domGame) => {
    const copy = {...currentGame}
    copy[domGame.target.name] = domGame.target.value

    setCurrentGame(copy)
  }
  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Edit Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" required autoFocus className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Maker: </label>
          <input type="text" name="maker" required autoFocus className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayer">Number of Players: </label>
          <input type="number" name="number_of_players" required autoFocus className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level: </label>
          <input type="number" name="skill_level" required autoFocus className="form-control"
            value={currentGame.skill_level}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div>
          <label>Game Type</label>
          <select onChange={changeGameState} name="game_type" value={currentGame.game_type}>
            <option value="0">Select a game type</option>
            {
              gameTypes.map(gameType => <option value={gameType.id}>{gameType.label}</option>)
            }
          </select>
        </div>
      </fieldset>

      {/* Because this is updating a game you need to use the same values as name as the new key names below. See line 34 */}

      <button type="submit"
        onClick={evt => {
          evt.preventDefault()

    //! fields on left must match the fields on server side- for this section after the . keys must match the name fields

          const game = {
            id: currentGame.id, 
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.number_of_players),
            skill_level: parseInt(currentGame.skill_level),
            game_type: parseInt(currentGame.game_type)
          }

          // Send POST request to your API
          updateGame(game)
            .then(() => history.push("/games"))
        }}
        className="btn btn-primary">Update</button>
    </form>
  )
}
