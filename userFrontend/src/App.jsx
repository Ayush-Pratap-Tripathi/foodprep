import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './screens/Home/Home'
import Cart from './screens/Cart/Cart'
import Order from './screens/PlaceOrder/PlaceOrder'
import Verify from './screens/Verify/Verify'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import MyOrders from './screens/MyOrders/MyOrders'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./App.css"
const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>

      </div>
      <Footer />

    </>
  )
}

export default App