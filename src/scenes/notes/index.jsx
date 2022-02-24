import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { backend } from '../../data'

export const Notes = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
      backend.get('./notes')
      .then(({ data }) => setNotes(data))
      .catch((error) => {
        setError(true)  
        setErrorMessage(error.message)
        })
      .finally ((setLoading(false)))
    }, [])
    return (
    <>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{errorMessage}</p>}
        <Link to ="/notes/create"><button>New Note</button></Link>
        <div className="flex-container">
        {notes.map(({id, title, body}, index) => (
            <Link key={id} to={`/notes/${id}`}>
                <article className="card" key={id}>
                    <h2>{title}</h2>
                    {/* substring shows characters between 0 and x in the body. This can be used to show more or less characters in the synopsis */}
                    {body.substring(0, 800)}
                </article>
            </Link>
        )
        )}
        </div>
    </>
    )
}