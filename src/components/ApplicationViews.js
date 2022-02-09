import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList.js"
import { EventList } from "./events/EventList.js"
import { GameForm } from "./games/GameForm.js"
import { EventForm } from "./events/EventForm.js"
import {UpdateEvent} from "./events/UpdateEvent.js"
import { UpdateGame} from "./games/UpdateGame.js"

export const ApplicationViews = () => {
  return <>
    <main style={{
      margin: "5rem 2rem",
      lineHeight: "1.75rem"
    }}>
      <Route exact path="/games">
        <GameList />
      </Route>

      <Route exact path="/events">
        <EventList />
      </Route>

      <Route exact path="/games/new">
      <GameForm />
     </Route>

     <Route exact path="/events/new">
      <EventForm />
     </Route>

     <Route exact path="/events/:eventId(\d+)/update">
        < UpdateEvent />
      </Route>

      <Route exact path="/games/:gameId(\d+)/update">
        < UpdateGame />
      </Route>

     

    </main>
  </>
}

