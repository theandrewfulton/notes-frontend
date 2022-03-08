// imports for Material-ui
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Link from '@mui/material/Link'


export const Footer = () => {
    return (
        <footer>
            <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0, minHeight: 0}}>
                <Box margin="auto">
                    <Link href="https://andrew-fulton.com" target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
                    Andrew Fulton {new Date().getFullYear()}
                    </Link>
                </Box>
            </AppBar>
        </footer>
    )
}