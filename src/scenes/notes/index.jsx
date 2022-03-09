import { useState, useEffect } from "react"
import { 
        Link,
        // useParams,
        // useNavigate
    } from "react-router-dom"

import { backend } from '../../data'
// import { FormDialog } from '../note-dialog'



// imports for Material-ui
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'


  
  export const Notes = () => {
    // const {id} = useParams()
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // open dialog
    // const [open, setOpen] = useState(false);
    // const handleClickOpen = () => {
    // setOpen(true);
    // };
    // const handleClose = () => {
    // setOpen(false);
    // };


    const dateHelper = (date) => {
        const d = new Date(date.created_at)
        return (
            d.toLocaleString()
        )
    }

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
            {loading && <LinearProgress />}
            {error && <p className="error">{errorMessage}</p>}
            <Box
                display="flex"
                justifyContent="center"
            >
                <Button
                    component={Link}
                    to='/notes/create'
                    variant="outlined"
                    sx={{
                        margin: 1
                    }}
                >
                    New Note
                </Button>
            </Box>
            <Container 
                maxWidth="100"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    mb: 5,
                }}
            >
                {notes.length >0 ? (
                    notes.map(({id, title, body, created_at}, index) => (
                        <Card
                            component={Link}
                            to={`/notes/update/${id}`}
                            key={id}
                            sx={{
                                width: 300,
                                height: 300,
                                margin: 1,
                            }}
                        >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {dateHelper({created_at})}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2">
                                    {/* substring shows characters between 0 and x in the body. This can be used to show more or less characters in the synopsis */}
                                    {body.substring(0, 400)}
                                </Typography>
                                {/* <FormDialog component={Link} open={handleClickOpen} onClose={handleClose} key={id} to={`/notes/${id}`} */}
                                {/* /> */}
                            </CardContent>
                        </Card>
                    )
                    )
                ):(
                    <Typography
                        variant="body2"
                        component="p"
                        textAlign="center"
                    >
                        It looks like you don't have any notes yet. <br/>
                        Click the New Note button create your first one.
                    </Typography>
                )
                }
            </Container>
        </>
    )
  }