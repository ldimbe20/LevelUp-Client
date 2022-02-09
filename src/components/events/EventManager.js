export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      'Authorization': `Token ${localStorage.getItem('lu_token')}`,
      'Content-Type': "application/json"
    }
  }).then(res => res.json())
}


export const getSingleEvents = (id) => {
  return fetch(`http://localhost:8000/events/${id}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('lu_token')}`,
      'Content-Type': "application/json"
    }
  }).then(res => res.json())
}

export const createEvent = (event) => {
  return fetch("http://localhost:8000/events", {
    method: "POST",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      'Content-Type': "application/json"
    },
    body: JSON.stringify(event)
  })
    .then(res => res.json())
}



export const getGameTypes = () => {
  return fetch("http://localhost:8000/gametypes", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
}



export const updateEvent = (event) => {
  return fetch(`http://localhost:8000/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      'Content-Type': "application/json"
    },
    body: JSON.stringify(event)
  })
}

export const deleteEvent = (eventId) => {
  return fetch(`http://localhost:8000/events/${eventId}`, {
    method: "Delete",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`,
    },
  })
}
