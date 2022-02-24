import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { backend } from '../../data'

export const NoteDetails = () => {
    const {id} = useParams()
    const [note, setNote] = useState("")
    const navigate = useNavigate()

    // copied from create note - opportunity to make this DRYer in future?
    // title and data not set separately?
    // get list from backend
      useEffect(() => {
        backend.get(`/notes/${id}`)
            .then(({ data }) => setNote(data))
    }, [id])

     // List delete method
     const deleteNote = async (id, index) => {
        try {
          // send request to backend
          await backend.delete(`/notes/${id}`)
          navigate("/")
        } catch (error) {
        //   error message goes here
        }
  
      }

    return (
        <>
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