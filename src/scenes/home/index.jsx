import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Home = () => {
    // if there is a JWT in local storage, redirect to /notes
    const navigate = useNavigate()
    useEffect (() => {
        if (localStorage.jwt) {
            navigate("/notes")
        }
    })
    return (
        <p>This is the homepage</p>
    )
}