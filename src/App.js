import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './Pages/Register'
import Chat from './Pages/Chat'
import Login from './Pages/Login'
import SetAvatar from './Pages/SetAvatar'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/setAvatar' element={<SetAvatar/>}/>
      <Route path='/' element={<Chat/>}/>
      </Routes>
      </BrowserRouter>
  )
  
}

export default App
