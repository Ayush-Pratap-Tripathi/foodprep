import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
const Header = () => {

  const handleMenuClick = () => {
    
      const exploreSection = document.getElementById("explore-menu");
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth" });
      
    }
    setMenu("menu");
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button onClick={handleMenuClick} className="btn">View Menu</button>
      </div>

    </div>
  )
}

export default Header