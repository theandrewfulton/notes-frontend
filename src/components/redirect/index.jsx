import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Redirect = () => {
    // declare navigate as useNavigate cannot be used inside a callback
    const navigate = useNavigate()
    useEffect (() => {
        if (localStorage.jwt) {
            navigate("/notes")
        }
    })
}