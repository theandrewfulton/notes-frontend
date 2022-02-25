import { useState, useEffect } from "react"
import { useParams, useNavigate,
    //  Link
     } from "react-router-dom"
import { backend } from "../../data"

// material-ui
import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
// import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {id} = useParams()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
      if(id) {
          backend.get(`/notes/${id}`)
          .then(({ data }) => {
              setTitle(data.title)
              setBody(data.body)
          })
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
              navigate(`/notes/${id}`)
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

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      {/* <Link key={id} to={`/notes/${id}`}></Link> */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
                {/* <Button autoFocus color="inherit" onClick={handleClose}> */}
                {/* save */}
                {/* </Button> */}
          </Toolbar>
        </AppBar>
          {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{errorMessage}</p>}
            <form onSubmit={createNote}>
                <TextField
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    label="Title"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="body"
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    label="Body"
                    placeholder="Body"
                    multiline
                    fullWidth
                />
                {/* conditional show create if new, show update if edit */}
                <Button
                type="submit"
                value="submit"
                variant="outlined"
                onClick={handleClose}
                >
                    Save
                </Button>
                {/* <button value="Discard"/> */}
            </form>
      </Dialog>
    </div>
  );
}