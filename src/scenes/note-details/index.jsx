import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { backend } from '../../data'

export const NoteDetails = () => {
    const {id} = useParams()
    const [note, setNote] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    // copied from create note - opportunity to make this DRYer in future?
    // title and data not set separately?
    // get list from backend
      useEffect(() => {
        backend.get(`/notes/${id}`)
            .then(({ data }) => setNote(data))
            .catch((error) => {
                setError(true)  
                setErrorMessage(error.message)
                })
              .finally ((setLoading(false)))
    }, [id])

     // List delete method
     const deleteNote = async (id, index) => {
        // set loading to true 
        setLoading(true)
        try {
          // send request to backend
          await backend.delete(`/notes/${id}`)
          navigate("/")
        } catch (error) {
            setError(true)  
            setErrorMessage(error.message)
        }
  
      }

    return (
        <>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{errorMessage}</p>}
         <article>
              <p>{note.title}</p>
              <p>{note.body}</p>
              {/* edit button */}
              <Link key={id} to={`/notes/update/${id}`}><button>Edit</button></Link>
              {/* delete button */}
              <button onClick={() => deleteNote(id)}>DELETE</button>
            </article>
        </>
    )
}