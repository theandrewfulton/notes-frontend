import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"

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
          {/* <Link key={id} to={`/notes/${id}`}> */}
            <h2>{title}</h2>
            <p>{body}</p>
          {/* </Link> */}
        </article>
      )
      )}
    </div>
    )
}