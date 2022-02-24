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
    notes.map(({id, title, body}, index) => (
      <article key={id}>
        <p>{title}</p>
        <p>{body}</p>
      </article>
    )
    )
  );
}

export default App;
