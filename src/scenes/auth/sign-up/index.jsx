import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// imports for Material-ui
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
            localStorage.setItem('jwt', data.jwt)
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
        <input onChange={(e) => setEmail(e.target.value)} value={email}
        id="email" placeholder="email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)}
        value={password} id="password" placeholder="password" />
        <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}
        value={passwordConfirmation} id="passwordConfirmation" placeholder="confirm password" />
        <input type="submit" value="Submit" />
    </form>

    {/* Link to Log in */}
    <Link to="/log-in">or log into an existing account</Link>
    </Container>
)
}