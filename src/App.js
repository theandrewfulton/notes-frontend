import './App.css';

import { useState, useEffect } from "react"

import { backend } from './data'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    backend.get('./notes')
    .then(({ data }) => setNotes(data))
  }, [])
  return (
  <div className="flex-container">
    {notes.map(({id, title, body}, index) => (
      <article key={id}>
          <h2>{title}</h2>
          <p>{body}</p>
      </article>
    )
    )}
  </div>
  )
}

export default App;
