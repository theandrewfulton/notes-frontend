import { useState, useEffect } from "react"
import { Link,
        // useParams,
        // useNavigate
    } from "react-router-dom"

import { backend } from '../../data'
// import { FormDialog } from '../note-dialog'



// imports for Material-ui
// import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'


  
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
            // console.log(d)
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
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{errorMessage}</p>}
            <Link to ="/notes/create"><Button variant="outlined">New Note</Button></Link>
            <CssBaseline />
        <Container 
        maxWidth="100"
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            // not working - think it's got something to do with the link
            // alignItems: 'stretch',
            // alignContent: 'stretch',
        }}
        >
                    {notes.map(({id, title, body, created_at}, index) => (
                        <Link key={id} to={`/notes/${id}`}>
                            <Card key={id} sx={{
                                width: 300,
                                margin: 1,
                                // bgcolor: 'background.paper',
                                }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {dateHelper({created_at})}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {/* substring shows characters between 0 and x in the body. This can be used to show more or less characters in the synopsis */}
                                        {body.substring(0, 200)}
                                    </Typography>
                                    {/* <FormDialog component={Link} open={handleClickOpen} onClose={handleClose} key={id} to={`/notes/${id}`} */}
                                    {/* /> */}
                                </CardContent>
                            </Card>
                         </Link>
                    )
                    )}
        </Container>
        </>
    );
  }