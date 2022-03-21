import './App.css';
// import Roboto font
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// import Material-UI components
import CssBaseline from '@mui/material/CssBaseline'


// import react-router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

// import header
import { Header } from './scenes/header'
// import footer
import { Footer } from './scenes/footer'



// import pages
import { Home } from './scenes/home'
import { Notes } from './scenes/notes'
import { CreateNote } from './scenes/create-note'
import { LogIn } from './scenes/auth/log-in'
import { LogOut } from './scenes/auth/log-out'
import { SignUp } from './scenes/auth/sign-up'
// import { UserDetails } from './scenes/user/view'

function App() {
  const HomeHeader = () => {
    return (
      <Header pageType={"home"}/>
    )
  }
  return (
    <>
      <CssBaseline />
      <Router>
        {/* <Header /> */}
        <Routes>
         <Route
            path="/"
            element={
              <>
                <HomeHeader/>
                <Home/>
              </>
            }
          />
          <Route
            path="/log-in"
            element={
              <>
                <HomeHeader/>
                <LogIn/>
              </>
            }
          />
          <Route
            path="/log-out"
            element={
              <LogOut/>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <HomeHeader/>
                <SignUp/>
              </>
            }
          />
          <Route
            path="/notes"
            element={
              <>
                <Header/>
                <Notes/>
              </>
            }
          />
          <Route
            path='/notes/create'
            element={
              <>
                <Header/>
                <CreateNote/>
              </>
          }
          />
          <Route
            path='/notes/update/:id'
            element={
              <>
                <Header/>
                <CreateNote/>
              </>
            }
            // element={<NoteDialog}
          />
          {/* <Route path='/users/:id'
            element={<UserDetails/>}
          /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
