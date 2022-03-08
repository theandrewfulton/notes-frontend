// imports for Material-ui
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'


export const Footer = () => {
    return (
        <footer>
            <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0, minHeight: 0}}>
                {/* <Toolbar> */}
                    <Box margin="auto">
                       <Link href="https://andrew-fulton.com" target="_blank" rel="noopener noreferrer">
                        Andrew Fulton {new Date().getFullYear()}
                        </Link>
                    </Box>
                {/* </Toolbar> */}
            </AppBar>
        </footer>
    )
}