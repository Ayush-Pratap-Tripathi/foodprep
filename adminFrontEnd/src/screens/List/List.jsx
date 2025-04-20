import { useEffect, useState } from 'react'
import axios from 'axios'
import './List.css'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader'

const List = ({ url }) => {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      setList(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching food list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])


  if (isLoading) {
    return <Loader />
  }


  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove?id=${id}`)
      fetchList()
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing food item")
    }
  }

  return (
    <div className='list screen flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p><b>Image</b></p>
          <p><b>Name</b></p>
          <p><b>Category</b></p>
          <p><b>Price</b></p>
          <p><b>Action</b></p>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/image/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <button onClick={() => removeFood(item._id)}>X</button>
              </div>
            )
          })
        ) : (
          <div className="no-items">No food items found</div>
        )}
      </div>
    </div>
  )
}

export default List