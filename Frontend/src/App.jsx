
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    
    <BrowserRouter>
    <Navbar />
    <Routes>

    <Route path="/navbar" element={<Navbar />} />


    </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App
