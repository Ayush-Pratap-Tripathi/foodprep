import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
const App = () => {
  // const url = "http://localhost:4000"
  const url = "https://foodprep-uezu.onrender.com"
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Add url={url} />}></Route>
          <Route path='/add' element={<Add url={url} />}></Route>
          <Route path='/list' element={<List url={url} />}></Route>
          <Route path='/orders' element={<Orders url={url} />}></Route>

        </Routes>

      </div>
    </div>
  )
}

export default App