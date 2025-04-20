import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h2>Explore Our Menu</h2>
            <p className="explore-menu-text">
                Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
            </p>
            <div className='explore-menu-list'>
                {
                    menu_list.map((menu_item, index) => (
                        <div onClick={() => setCategory(category => category === menu_item.menu_name ? "All" : menu_item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img src={menu_item.menu_image} alt={menu_item.name} className={category === menu_item.menu_name ? "active" : ""} />
                            <p>{menu_item.menu_name}</p>

                        </div>
                    ))
                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu