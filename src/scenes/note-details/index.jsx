import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { backend } from '../../data'
import { FormDialog } from '../note-dialog'

// imports for Material-ui
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup';


export const NoteDetails = () => {
    const {id} = useParams()
    const [note, setNote] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    // open dialog
    const [
      // open,
      setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

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
              <FormDialog open={handleClickOpen} onClose={handleClose}/>
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                {/* edit button */}
                <Link key={id} to={`/notes/update/${id}`}><Button>Edit</Button></Link>
                {/* delete button */}
                <Button color="error" onClick={() => deleteNote(id)}>DELETE</Button>
              </ButtonGroup>
            </article>
        </>
    )
}