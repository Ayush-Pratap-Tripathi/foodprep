import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import Loader from '../../components/Loader/Loader'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/listorders`)
      setOrders(response.data.data)
      console.log("Orders fetched:", response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status
      })
      toast.success("Status updated successfully")
      await fetchAllOrders()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status")
      console.log(error)
    }
  }

  const isPaymentFailed = (payment) => {
    return payment === "false";
  }

  return (
    <div className='order screen'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => {
            console.log(`Order ${index} payment status:`, order.payment);

            const paymentFailed = order.payment !== undefined ? isPaymentFailed(order.payment) : false;

            return (
              <div
                className={`order-item ${paymentFailed ? 'failed-order' : ''}`}
                key={order._id || index}
              >
                <img
                  src={assets.parcel_icon}
                  alt=""
                />
                <div className="order-details">
                  <div className="order-header">
                    {paymentFailed && (
                      <div className="payment-failed-badge">Payment Failed</div>
                    )}
                  </div>

                  <p className='order-item-food'>
                    {order.items && order.items.map((item, itemIndex) => (
                      <span key={itemIndex}>
                        {item.name} x {item.quantity}
                        {itemIndex < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>

                  <p className="order-item-name">
                    {order.address && `${order.address.first_name} ${order.address.last_name}`}
                  </p>
                  {order.address && (
                    <div className="order-item-address">
                      <p>{order.address.street + ','}</p>
                      <p>
                        {order.address.city + ', ' +
                          order.address.state + ', ' +
                          order.address.country + ', ' +
                          order.address.zip_code}
                      </p>
                    </div>
                  )}
                  <p>Items: {order.items ? order.items.length : 0}</p>
                  <p>₹{order.amount}</p>

                  {paymentFailed ? (
                    <p className="failed-status">Payment Failed</p>
                  ) : (
                    <select
                      value={order.status || "Food Processing"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-orders">No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders