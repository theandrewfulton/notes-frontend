import './App.css';
// import Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// import react-router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

// import header
import { Header } from './scenes/header'



// import pages
import { Notes } from './scenes/notes'
import { CreateNote } from './scenes/create-note'
import { NoteDetails } from './scenes/note-details'
import { LogIn } from './scenes/auth/log-in'
import { LogOut } from './scenes/auth/log-out'
import { SignUp } from './scenes/auth/sign-up'
// import { UserDetails } from './scenes/user/view'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/"
            element={<Notes/>}
          />
          <Route path="/log-in"
              element={<LogIn/>}
          />
          <Route path="/log-out"
              element={<LogOut/>}
          />
          <Route path="/sign-up"
              element={<SignUp/>}
          />
          <Route path='/notes/create'
            element={<CreateNote/>}
          />
          <Route path='/notes/update/:id'
            element={<CreateNote/>}
            // element={<NoteDialog}
          />
          <Route path='/notes/:id'
            element={<NoteDetails/>}
          />
          {/* <Route path='/users/:id'
            element={<UserDetails/>}
          /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;
