import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItemCard from "../FoodItemCard/FoodItemCard";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list, url } = useContext(StoreContext);

  const foodItems = Array.isArray(food_list) ? food_list : [];

  return (
    <div className="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodItems.map((food) => {
          if (category === "All" || category === food.category) {
            return (
              <FoodItemCard
                key={food._id}
                id={food._id}
                name={food.name}
                price={food.price}
                description={food.description}
                image={food.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;