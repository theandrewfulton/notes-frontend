import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { backend } from '../../data'



// imports for Material0ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

  
  export const Notes = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

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
            <Link to ="/notes/create"><button>New Note</button></Link>
            <CssBaseline />
        <Container 
        maxWidth="100"
        sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}
        >
            {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', display: 'flex', flexDirection: 'row' }}>     */}
                {/* <div className="flex-container"> */}
                    {notes.map(({id, title, body, created_at}, index) => (
                        <Link key={id} to={`/notes/${id}`}>
                            <Card key={id} sx={{ width: 300, margin: 1 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {/* {created_at} */}
                                        {dateHelper({created_at})}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {/* substring shows characters between 0 and x in the body. This can be used to show more or less characters in the synopsis */}
                                        {body.substring(0, 200)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                    )}
                {/* </div> */}
            {/* </Box> */}
        </Container>
        </>
    );
  }