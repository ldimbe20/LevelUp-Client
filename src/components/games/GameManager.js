export const getGames = () => {
  return fetch("http://localhost:8000/games", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}


//! need to pass in game as a parameter to create data for it?

//! on line 21 we are taking the response from views and turning to json...isn't it already in json through the serializer

export const createGame = (game) => {
  return fetch("http://localhost:8000/games", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}


export const getGameTypes = (game) => {
  return fetch("http://localhost:8000/gametypes", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}


