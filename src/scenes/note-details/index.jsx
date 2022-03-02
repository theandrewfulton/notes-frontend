import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { backend } from '../../data'

// imports for Material-ui
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'


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
          <Container>
            <Card key={id} sx={{
                margin: 1,
                }}>
                <CardActions
                // align to the right
                >
                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                    {/* back button */}
                    <Link to={`/`}><Button>Back</Button></Link>
                    {/* edit button */}
                    <Link key={id} to={`/notes/update/${id}`}><Button>Edit</Button></Link>
                    {/* delete button */}
                    <Button color="error" onClick={() => deleteNote(id)}>DELETE</Button>
                  </ButtonGroup>
                </CardActions>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {note.title}
                    </Typography>
                    <Typography variant="body2"
                    // respect line breaks
                    >
                        {note.body}
                    </Typography>
                </CardContent>
            </Card>
          </Container>
        </>
    )
}