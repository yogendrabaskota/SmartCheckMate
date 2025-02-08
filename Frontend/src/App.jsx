
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './auth/Login'
import Register from './auth/Register'
import Home from './pages/Home'
import SchoolDetails from './pages/SchoolDetails'
import AddSchool from './pages/School/AddSchool'
import AddClass from './pages/class/AddClass'
import ClassDetails from './pages/class/classDetails'

function App() {

  return (
    
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/schoolDetails/:id" element={<SchoolDetails />} />
      <Route path="/add-school" element={<AddSchool />} />
      <Route path="/add-class/:id" element={<AddClass />} />
      <Route path="/classDetails/:schoolId/:classId" element={<ClassDetails />} />


    </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App
