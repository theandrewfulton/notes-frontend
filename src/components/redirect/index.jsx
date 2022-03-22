import { useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"

export const Redirect = () => {
    // declare navigate as useNavigate cannot be used inside a callback
    const navigate = useNavigate()
    // declare location
    const location = useLocation()

    useEffect (() => {
        // if jwt detected navigate to notes
        // as Redirect is called on the log-in page, location is used to track
        // the previously visited page. This prevents an infinite loop with an invalid jwt:
        // redirected to notes because jwt detected, redirected to log-in because 403 error,
        // redirected to notes because jwt etc.
        if (localStorage.jwt && location.pathname !== '/log-in') {
            navigate("/notes")
        }
    })
}