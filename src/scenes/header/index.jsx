import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <header>
            <NavLink
                to="/"
            >
                Home
            </NavLink>
        </header>
    )
}