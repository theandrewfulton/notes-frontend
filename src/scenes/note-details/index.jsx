import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { backend } from '../../data'

export const NoteDetails = () => {
    const {id} = useParams()
    const [note, setNote] = useState("")
    // const navigate = useNavigate()

    // copied from create note - opportunity to make this DRYer in future?
    // title and data not set separately?
    // get list from backend
      useEffect(() => {
        backend.get(`/notes/${id}`)
            .then(({ data }) => setNote(data))
    }, [id])

    return (
        <>
         <article>
              <p>{note.title}</p>
              <p>{note.body}</p>
              {/* edit button */}
              <Link key={id} to={`/notes/update/${id}`}><button>Edit</button></Link>
            </article>
        </>
    )
}