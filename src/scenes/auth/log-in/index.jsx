import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// grab backend
import { backend } from '../../../data'

// import error component
import { Error } from '../../../components/error'


// imports for Material-ui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'

export const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])
    

    const navigate = useNavigate()

    /* sends username and password to the Rails Backend /users route
    */
    const logIn = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        // set loading status
        setLoading(true)
        try {
            const { data } = await backend.post("/auth/login", {
                email,
                password,
            })

            // if success:
            // save JWT to local storage
            localStorage.setItem('jwt', data.token)
            // redirect to home page
            navigate("/notes")
        } catch (error) {
             // set Error state to true so the error message component renders
        setError(true)
        // if axios returns a network error, manually update the error message state
        if (error.message === "Network Error") {
            setErrorMessage("Network error. Please try again")
            // if the backend returns 401 unauthorised - display a custom error message
        } else if (error.response.status === 401) {
            setErrorMessage("We were unable to log you in. Please check your email and password and try again")
        } else {
        // set error message state to the data response from the backend
        setErrorMessage(error.response.data.error)
        }
            setLoading(false)
        }
        
    }

    return (
        <>
            {/* loading indicator */}
            {loading && <LinearProgress />}
            {/* error messages */}
            {error && <Error errorMessage={errorMessage}/>}
            <Container
                sx={{
                    mt:3
                }}
            >
            <Typography
                variant="h3"
                textAlign="center"
            >
                Log In
            </Typography>
                {/* Login form */}
                <form onSubmit={logIn}>
                    <TextField
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        label="email"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{
                            m: 1
                        }}
                    />
                    <TextField
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        label="password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        required
                        sx={{
                            m: 1
                        }}
                    />
                    <Button
                        type="submit"
                        value="submit"
                        variant="outlined"
                        sx={{
                            m: 1
                        }}
                        >
                            Log In
                    </Button>
                </form>

                {/* Link to Sign Up */}
                <Typography
                    sx={{
                        m: 1
                    }}
                >
                    Don't have an account yet?
                </Typography>
                <Button
                    component={Link}
                    to={`/sign-up`}
                    variant="outlined"
                    sx={{
                        m: 1
                    }}
                >
                    Sign Up
                </Button>
            </Container>
        </>
    )
    }