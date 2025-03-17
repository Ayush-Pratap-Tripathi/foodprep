import {useState} from 'react'
import {Link} from 'react-router-dom'
import {assets} from '../../assets/assets'
import './Navbar.css'

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home")
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href="#explore-menu"><li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li></a>
            <a href="#footer"><li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</li></a>
        </ul>
        <div className="navbar-right">
            <div className="basket-dot">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar