import {useState,useContext} from 'react'
import {assets} from '../../assets/assets'
import './FoodItemCard.css'
import {StoreContext} from '../../context/StoreContext'

const FoodItemCard = ({id,name,price,description,image}) => {
  const {cartItems,setCartItems,addToCart,removeFromCart} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className='food-item-img' src={image} alt="" />
            {
              !cartItems[id]
              ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
              : <div className="food-item-counter">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }
        </div>
        <div className="food-info">
          <p className='food-item-name'>{name}</p>
          <p className='food-item-desc'>{description}</p>
          <div className="price-rating">
              <p className='food-item-price'>₹{price}</p>
              <img src={assets.rating_starts} alt="" />
          </div>
        </div>
    </div>
  )
}

export default FoodItemCard