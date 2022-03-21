import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Home = () => {
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