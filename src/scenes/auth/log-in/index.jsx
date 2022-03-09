
import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// grab backend
import { backend } from '../../../data'

// imports for Material-ui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    /* sends username and password to the Rails Backend /users route
    */
    const logIn = async (e) => {
        // prevent default form behaviour
        e.preventDefault()
        
        try {
            const { data } = await backend.post("/auth/login", {
                email,
                password,
            })

            // if success:
            // save JWT to local storage
            localStorage.setItem('jwt', data.token)
            // redirect to home page
            navigate("/")
        } catch (error) {
            // If Fail:
            // error message yere
        }
        
    }

    return (
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
    )
    }