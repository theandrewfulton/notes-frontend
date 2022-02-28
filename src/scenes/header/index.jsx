import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <header>
            <NavLink
                to="/"
            >
                Home
            </NavLink>
            <NavLink
                to="/log-in"
            >
                Log In
            </NavLink>
            <NavLink
                to="/log-out"
            >
                Log Out
            </NavLink>
            <NavLink
                to="/sign-up"
            >
                Sign Up
            </NavLink>
        </header>
    )
}