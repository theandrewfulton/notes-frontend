
import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

// grab backend
import { backend } from '../../../data'

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
        <>
        {/* Login form */}
        <form onSubmit={logIn}>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
            id="email" placeholder="email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)}
            value={password} id="password" placeholder="password" />
            <input type="submit" value="Submit" />
        </form>
    
        {/* Link to Sign Up */}
        <Link to="/sign-up">or create an account</Link>
        </>
    )
    }