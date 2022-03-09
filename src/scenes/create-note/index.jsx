import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { backend } from "../../data"

// imports for Material-ui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import ButtonGroup from '@mui/material/ButtonGroup'
import LinearProgress from '@mui/material/LinearProgress'


export const CreateNote = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(id) {
            setLoading(true)
            backend.get(`/notes/${id}`)
            .then(({ data }) => {
                setTitle(data.title)
                setBody(data.body)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    },[id],)

    const createNote = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        // set loading to true
        setLoading(true)
        // remove error message
        setErrorMessage("")
        try {
            if (id) {
                await backend.put(`/notes/${id}`, {
                    title,
                    body
                })
                // if success:
                setLoading(false)
                navigate(`/`)
            } else {
                await backend.post("/notes", {
                    title,
                    body
                })
                setLoading(false)
                navigate("/")
            }
        } catch (error) {
            // If fail:
            // display error message
            setError(true)  
            setErrorMessage(error.message)
            // stop loading
            setLoading(false)
        }
    }

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

    const EditButtons = () => {
        if (id) {
            return (
                <> 
                    <Button
                    type="submit"
                    value="submit"
                    variant="outlined"
                    >
                        Save
                    </Button>
                    <Button color="error" onClick={() => deleteNote(id)}>
                        DELETE
                    </Button>
                </>
            )
        } else {
            return (
                <>
                    <Button
                        type="submit"
                        value="submit"
                        variant="outlined"
                        >
                            Create
                    </Button>
                </>
            )
        }
    }

    return (
        <>
            {loading && <LinearProgress />}
            {error && <p className="error">{errorMessage}</p>}
            <Container
            sx={{mt:3}}
            >
                <form onSubmit={createNote}>
                    <TextField
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        label="Title"
                        variant="outlined"
                        fullWidth
                        sx={{m: 1}}
                    />
                    <TextField
                        id="body"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        label="Body"
                        placeholder="Body"
                        multiline
                        fullWidth
                        minRows={10}
                        sx={{m: 1}}
                    />
                    {/* conditional show create if new, show save and delete if edit */}
                    <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{m:1}}>
                        <Button
                         component={Link}
                         to='/'>
                            Back
                        </Button>
                        <EditButtons/>
                    </ButtonGroup>
                </form>
            </Container>
        </>
    )
}