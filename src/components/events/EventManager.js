export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      'Authorization': `Token ${localStorage.getItem('lu_token')}`
    }
  }).then(res => res.json())
}

export const createEvent = (event) => {
  return fetch("http://localhost:8000/events", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}



export const getOrganizer = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}


export const getGameTypes = () => {
  return fetch("http://localhost:8000/gametypes", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}


