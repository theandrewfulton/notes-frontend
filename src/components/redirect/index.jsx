import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Redirect = () => {
    // declare navigate as useNavigate cannot be used inside a callback
    const navigate = useNavigate()

    useEffect (() => {
        // if jwt detected navigate to notes
        // as Redirect is called on the log-in page, location is used to track
        // the previously visited page. This prevents an infinite loop with an invalid jwt:
        // redirected to notes because jwt detected, redirected to log-in because 403 error,
        // redirected to notes because jwt etc.
        if (localStorage.jwt) {
            navigate("/notes")
        }
    })
}