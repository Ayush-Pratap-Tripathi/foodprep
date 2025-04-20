import { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({ url }) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {

    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    try {
      const response = await axios.post(`${url}/api/food/add`, formData)
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.data.data.message);
    }
  }

  return (
    <div className='screen'>
      <div className="container">
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Name</p>
            <input name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder='Type here' />
          </div>
          <div className="add-product-desc flex-col">
            <p>Description</p>
            <textarea name='description' value={data.description} onChange={onChangeHandler} rows='6' placeholder='Write content here'></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Category</p>
              <select onChange={onChangeHandler} name='category' value={data.category} >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Dessert">Dessert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Price</p>
              <input name='price' value={data.price} onChange={onChangeHandler} type="Number" placeholder='₹150' />
            </div>
          </div>
          <button type='submit' className='add-btn'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default Add