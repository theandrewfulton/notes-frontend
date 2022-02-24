import { useState, useEffect } from "react"
import { backend } from '../../data'

export const Notes = () => {
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