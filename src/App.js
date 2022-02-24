import './App.css';

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

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/"
          element={<Notes/>}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App;
