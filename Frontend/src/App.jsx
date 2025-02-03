
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './auth/Login'

function App() {

  return (
    
    <BrowserRouter>
    <Navbar />
    <Routes>

    
    <Route path="/login" element={<Login />} />


    </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App
