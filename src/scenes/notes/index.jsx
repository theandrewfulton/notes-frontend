import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { backend } from '../../data'

export const Notes = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
      backend.get('./notes')
      .then(({ data }) => setNotes(data))
    }, [])
    return (
    <>
        <Link to ="/notes/create"><button>New Note</button></Link>
        <div className="flex-container">
        {notes.map(({id, title, body}, index) => (
            <Link key={id} to={`/notes/${id}`}>
                <article key={id}>
                    <h2>{title}</h2>
                    <p>{body}</p>
                </article>
            </Link>
        )
        )}
        </div>
    </>
    )
}