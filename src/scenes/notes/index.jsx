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
import Grid from '@mui/material/Grid'


  
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

    const getNotes = async () => {
    const { data } = await backend.get('./notes')
        setNotes(data)
        setLoading(false)
    //   .then(({ data }) => setNotes(data))
    //   .catch((error) => {
        // setError(true)  
        // setErrorMessage(error.message)
        // })
    //   .finally ((setLoading(false)))
    }
    useEffect(() => {
      getNotes()
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
                {/* If there are any notes fetched from the backend, map them into cards
                Otherwise display a message saying there aren't any notes */}
                {/* {notes.length >0 ? ( */}
                    {notes.map(({id, title, body, created_at}, index) => (
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
                // ):(
                //     <Grid
                //         container
                //         spacing={0}
                //         direction="column"
                //         alignItems="center"
                //         justifyContent="center"
                //         style={{ minHeight: '100vh' }}
                //   >
                //         <Grid item xs={3}>
                //             <Typography
                //                 variant="body2"
                //                 component="p"
                //                 textAlign="center"
                //             >
                //                 It doesn't look like you have any notes yet. <br/>
                //                 Click the New Note button to create your first one.
                //             </Typography>
                //         </Grid>   
                     
                //     </Grid> 
                // )
                }
            </Container>
        </>
    )
  }