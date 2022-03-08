import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState('')

    useEffect (()=> {      
        if (localStorage.jwt) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    },)
    
    // return (
    if (isLoggedIn) {
        console.log(isLoggedIn)
        return (
            <>
                <NavLink
                    to="/"
                    >   
                    Home
                </NavLink>
                <NavLink
                    to="/log-out"
                    >   
                    Log Out
                </NavLink>
            </>
        )
    } else {
        console.log(isLoggedIn)
        return (
            <>
                <NavLink
                to="/"
                >   
                Home
            </NavLink>
            <NavLink
                to="/sign-up"
                >   
                Sign Up
            </NavLink>
            <NavLink
                to="/log-in"
                >   
                Log In
            </NavLink>
            </>
        )
    }
    // )
    // )
    // return (
    //     <>
    //         <NavLink
    //             to="/"
    //             >   
    //             Home
    //         </NavLink>
    //         <NavLink
    //             to="/sign-up"
    //             >   
    //             Sign Up
    //         </NavLink>
    //         <NavLink
    //             to="/log-in"
    //             >   
    //             Log In
    //         </NavLink>
    //         <NavLink
    //             to="/log-out"
    //             >   
    //             Log Out
    //         </NavLink>
    //     </>
    // )
}