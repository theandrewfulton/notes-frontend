import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// imports for Material-ui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

// grab backend to use based on environment and grab error helper
import { backend } from '../../../data'

export const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const navigate = useNavigate()

    /* sends email, password and password confirmation to the
     Rails Backend /auth/sign_up route
    */
    const signUp = async (e) => {
        // prevent default form behaviour
        e.preventDefault()

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
            navigate("/")
        } catch (error) {
            // If Fail:
            // error messages here
        }
        
    }

return (
    <Container>
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
        />
        <Button
            type="submit"
            value="submit"
            variant="outlined"
            >
                Sign Up
        </Button>
    </form>

    {/* Link to Log in */}
    <Typography>
        Already have an account?
    </Typography>
    <Link to={`/log-in`}><Button variant="outlined">Log In instead</Button></Link>
    </Container>
)
}