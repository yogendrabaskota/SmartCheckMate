
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
import AddStudent from './pages/student/AddStudent'
import TodayAttendance from './pages/student/TodayAttendance'
import AttendanceDetails from './pages/student/AttendanceDetails'
import StudentDetails from './pages/student/StudentDetails'
import PersonalAttendance from './pages/student/PresentAttendance'
import Contact from './components/Contact'
import Dashboard from './pages/Dashboard'
import EditSchool from './pages/School/EditSchool'
import EditClass from './pages/class/EditClass'
import SchoolDetail from './pages/student/School-Detail-view'
import ForgetPassword from './auth/ForgetPassword'
import VerifyOtp from './auth/VerifyOtp'
import ResetPassword from './auth/ResetPassword'

function App() {

  return (
    
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/school/edit/:schoolId" element={<EditSchool />} />
      <Route path="/schoolDetail/:id" element={<SchoolDetail />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />








      <Route path="/schoolDetails/:id" element={<SchoolDetails />} />
      <Route path="/add-school" element={<AddSchool />} />
      <Route path="/add-class/:id" element={<AddClass />} />
      <Route path="/edit-class/:schoolId/:classId" element={<EditClass />} />

      <Route path="/classDetails/:schoolId/:classId" element={<ClassDetails />} />
      <Route path="/student/add/:schoolId/:classId" element={<AddStudent />} />
      <Route path="/attendance/today/:schoolId/:classId" element={<TodayAttendance />} />
      <Route path="/studentdetails/:classId/:date" element={<AttendanceDetails />} />
      <Route path="/student/details/:schoolId/:classId/" element={<StudentDetails />} />
      <Route path="/student/detail/:classId/:studentId/" element={<PersonalAttendance />} />




    </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App
