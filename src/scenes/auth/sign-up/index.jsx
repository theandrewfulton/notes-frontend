import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// imports for Material-ui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'

// grab backend to use based on environment and grab error helper
import { backend } from '../../../data'

// import error component
import { Error } from '../../../components/error'

// import Redirect helper
import { Redirect } from '../../../components/redirect'

export const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])

    const navigate = useNavigate()

    /* sends email, password and password confirmation to the
     Rails Backend /auth/sign_up route
    */
    const signUp = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        // set loading status
        setLoading(true)
        try {
            const { data } = await backend.post("/users", {
                email,
                password,
                password_confirmation: passwordConfirmation,
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
            } else {
            // set error message state to the data response from the backend
            setErrorMessage(error.response.data.errors)
            }
        }
        
    }

    // Call the redirect helper which redirects to notes if there is a jwt in localStorage
    Redirect()

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
                Sign Up
            </Typography>
            {/* Sign up form */}
            <form onSubmit={signUp}>
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
                <TextField
                    id="passwordConfirmation"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    value={passwordConfirmation}
                    label="confirm password"
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
                        Sign Up
                </Button>
            </form>

            {/* Link to Log in */}
            <Typography
                sx={{
                    m: 1
                }}
            >
                Already have an account?
            </Typography>
            {/* <Link to={`/log-in`}> */}
                <Button
                    component={Link}
                    to={`/log-in`}
                    variant="outlined"
                    sx={{
                        m: 1
                    }}
                >
                    Log In
                </Button>
                {/* </Link> */}
        </Container>
    </>
)
}