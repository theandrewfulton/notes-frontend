import { useEffect } from 'react'

import { useNavigate } from "react-router-dom"

export const LogOut = () => {
    
    const navigate = useNavigate()

    // clear jwt in local storage
    localStorage.clear()
    // redirect to home page
    useEffect(() => {
        navigate("/")
    },[])
    return (null)
}