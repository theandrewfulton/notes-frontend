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

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/"
            element={<Notes/>}
          />
          <Route path='/notes/create'
            element={<CreateNote/>}
          />
          <Route path='/notes/update/:id'
            element={<CreateNote/>}
          />
          <Route path='/notes/:id'
            element={<NoteDetails/>}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App;
