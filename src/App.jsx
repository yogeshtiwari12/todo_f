import React from 'react'
import Todo from './components/todo'
import Navbar from './components/navbar'
import {BrowserRouter,Routes,Route} from "react-router-dom" 
import Showtodo from './components/showtodo'
import Signup from './components/signup'
import Login from './components/login'
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/dashboard/dashboard'
import Allusers from './components/dashboard/allusers'
import UserTodos from './components/usertodo'


function App() {
  return (
    <div  className="bg-green-50 ">
      <BrowserRouter>
      <Navbar />  
     
        <Routes>
          <Route path="/" element={<Showtodo/>} />
        <Route  path="/addtodo" element={<Todo/>} />
        <Route  path="/signup" element={<Signup/>} />
        <Route  path="/login" element={<Login/>} />
        <Route  path="/dashboard" element={<Dashboard/>} />
        <Route path="/allusers" element={<Allusers/>} />
        <Route path="/usertodos/:uid" element={<UserTodos />} />
        

          
        </Routes>
     <ToastContainer />
      </BrowserRouter>


      
    </div>
  )
}
 
export default App
