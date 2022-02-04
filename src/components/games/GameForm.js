import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    //!getting state for gametypes

    useEffect(() => {
        getGameTypes() .then(setGameTypes)
      }, [])
      

    const changeGameState = (evt) => {
        evt.preventDefault()
        const copy = { ...currentGame }
        setCurrentGame(copy)
        const fetchOption = {
            method: "POST",
            headers: {
                //lets the api know the information its about to get is json
                "Content-Type": "application/json",
            },
            //takes the data an converts it to a string
            body: JSON.stringify(copy)

        // TODO: Complete the onChange function
        //!think I did
         }
   }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title} placeholder="Title"
                        onChange={(evt)=>{
                            const copy = { ...currentGame }
                            copy.title = evt.target.value
                            setCurrentGame(copy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.maker} placeholder="Maker"
                        onChange={(evt)=>{
                            const copy = { ...currentGame }
                            copy.maker = evt.target.value
                            setCurrentGame(copy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="title" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers} placeholder="numberOfPlayers"
                        onChange={(evt)=>{
                            const copy = { ...currentGame }
                            copy.numberOfPlayers = evt.target.value
                            setCurrentGame(copy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: Choose between 1 and 5 </label>
                    <input type="number" name="title" required autoFocus className="form-control"
                        value={currentGame.skillLevel} placeholder="skillLevel "min="1" max="5"
                        onChange={(evt)=>{
                            const copy = { ...currentGame }
                            copy.skillLevel = evt.target.value
                            setCurrentGame(copy)
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
           
            <label htmlFor="gameType-select"> Choose a Game Type:</label>
                    <select name="gameType" id="gameType-select" onChange={(evt) => {
                        const copy = { ...currentGame }
                        copy.gameTypeId = parseInt(evt.target.value)
                        setCurrentGame(copy)
                    }} >
                        <option value="">--Game Types-</option>
                        {gameTypes.map((types) => (
                            <option key={types.label} value={types.label}>{types.label}</option>
                        ))}
                    </select>

            </fieldset>
            

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary" onClick={changeGameState}>Create</button>
        </form>
    )
}

