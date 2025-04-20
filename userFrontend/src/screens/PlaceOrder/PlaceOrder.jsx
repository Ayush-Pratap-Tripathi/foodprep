import React, { useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Order = () => {
  const { getTotalCartAmount, food_list, cartItems, token, url } = useContext(StoreContext)

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone: ""
  })

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo.quantity = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20
    }
    try {
      let response = await axios.post(url + '/api/order/place', orderData, { headers: { 'Authorization': `Bearer ${token}` } })
      const { session_url } = response.data
      window.location.replace(session_url)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!token)
      navigate("/cart")
    else if (getTotalCartAmount() == 0)
      navigate("/cart")
  }, [token])


  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <h2 className='title'>Delivery Information</h2>
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name='first_name'
            placeholder="First Name"
            value={data.first_name}
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name='last_name'
            placeholder="Last Name"
            value={data.last_name}
            required
          />
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          name='email'
          placeholder='Email Address'
          value={data.email}
          required
        />
        <input
          type="text"
          onChange={onChangeHandler}
          name='street'
          placeholder='Street'
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name='city'
            placeholder="City"
            value={data.city}
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name='state'
            placeholder="State"
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name='zip_code'
            placeholder="Zip Code"
            value={data.zip_code}
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name='country'
            placeholder="Country"
            value={data.country}
            required
          />
        </div>
        <input
          type="tel"
          onChange={onChangeHandler}
          name='phone'
          placeholder='Phone'
          value={data.phone}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() !== 0 ? 20 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() !== 0 ? getTotalCartAmount() + 20 : 0}</b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default Order