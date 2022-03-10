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
import Skeleton from '@mui/material/Skeleton'

// Message to display when no notes are retrieved from the backend
const NoNotes = () => {
    return (
        // grid container to horizontally and vertically center the no notes message
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            {/* no notes message */}
            <Grid item xs={3}>
                <Typography
                    variant="body2"
                    component="p"
                    textAlign="center"
                >
                    It doesn't look like you have any notes yet. <br/>
                    Click the New Note button to create your first one.
                </Typography>
            </Grid>   
            
        </Grid>
    )
}
//  SkeletonBox takes a number and repeats the box containing a skeleton 
// element for the date, title and body by mapping it to an array n times
const SkeletonBox = ({notesToRender}) => {
    return (
      <>
            {Array(notesToRender)
                .fill(1)
                .map((card, index) => (
                <Box
                    sx={{
                        width: 300,
                        height: 300,
                        margin: 1,
                        display: "flex",
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    <Skeleton
                        variant="text"
                        width={250}
                    />
                    <Skeleton
                        variant="text"
                        width={250}
                    />
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={250}
                        height={200}
                    />
                </Box>
            ))}
      </>
    );
  };
  
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

// date helper to take the note's created date from the backend and formats it to the browser's locale
    const dateHelper = (date) => {
        const d = new Date(date.created_at)
        return (
            d.toLocaleString()
        )
    }
    // get notes from backend
    const getNotes = async () => {
        await backend.get('./notes')
        // take data from backend and update notes state
        .then(({ data }) => {
            setNotes(data)
        })
        // if it fails, update the error state with the error message
      .catch((error) => {
        setError(true)  
        setErrorMessage(error.message)
        })
        // regardless of success or error, clean up by setting loading state to false
      .finally(() => {
          setLoading(false)
        })
    }
    // get the backend data on first render
    useEffect(() => {
      getNotes()
    }, [])
    return (
        <>
            {/* loading indicator */}
            {loading && <LinearProgress />}
            {/* error messages */}
            {error && <p className="error">{errorMessage}</p>}
            {/* container to centre New Note button */}
            <Box
                display="flex"
                justifyContent="center"
            >
                {/* New Note button */}
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
            {/* flexbox container for note cards */}
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
                {notes.length > 0 ? (
                    notes.map(({id, title, body, created_at}, index) => (
                        // clicking the card opens the view/edit scene
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
                                {/* date created */}
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {dateHelper({created_at})}
                                </Typography>
                                {/* Note title */}
                                <Typography variant="h5" component="div">
                                    {title}
                                </Typography>
                                {/* first 400 characters of note body */}
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
                    // If loading state is still set to true, show the loading animation
                    loading ? (
                        // Show the sloading skeleton box 12 times
                        <SkeletonBox notesToRender={12}/>
                    ): (
                        // otherwise show the No Notes component
                        < NoNotes />
                    )
                )
                }
            </Container>
        </>
    )
  }