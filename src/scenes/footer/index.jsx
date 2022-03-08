// imports for Material-ui
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'


export const Footer = () => {
    return (
        <footer>
            <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0}}>
                <Toolbar>
                    <Box margin="auto">
                        Andrew Fulton {new Date().getFullYear()}
                    </Box>
                </Toolbar>
            </AppBar>
        </footer>
    )
}