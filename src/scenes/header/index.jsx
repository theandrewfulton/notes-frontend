import { useState, useEffect } from 'react'

// import Material-UI components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'


// Import NavLink according to material-ui instructions
import { Link as NavLink, } from 'react-router-dom'
import Link from '@mui/material/Link'

// The name of the app - reduces repeated code
const appName = "Notes App"

// helper function to add custom properties to link and reduce repeated code
const HeaderLink = props => {
    const location = props.location
    const linkText = props.linkText
    return (
        <Link color="inherit" underline="hover" component={NavLink}
        to={location}
    >
        {linkText}
    </Link>
    )
}

// array of pages to show in the header when on the homepage, login and logout
const homePages = [
    <HeaderLink location="/" linkText="Home"/>,
    <HeaderLink location="/sign-up" linkText="Sign Up"/>,
    <HeaderLink location="/log-in" linkText="Log In"/>,
]

// array of pages to show in the header when on pages to do with notes
const notePages = [
  <HeaderLink location="/log-out" linkText="Log Out"/>
]

// the main header object
export const Header = ({pageType}) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  // state for which array of pages to render
  const [pages, setPages] = useState([])

  // event handler for opening the mobile menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  // event handler for closing the mobile menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  // If the header component is called with the param pageType set to "home", display
  // the homePages array of links in the header, otherwise show the notePages array.
  // re-render when pageType changes
  useEffect(() => {
    if (pageType === "home") {
      setPages(homePages)
    } else {
      setPages(notePages)
    }
},[pageType])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Small screen Menu */}
          {/* App Name */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {appName}
          </Typography>

          {/* Small screen menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* map menu items from pages array */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* large screen menu */}
          {/* App Name */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {appName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* map menu items from pages array */}
            {pages.map((page) => (
               <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};