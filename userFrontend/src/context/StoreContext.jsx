import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  // const url = "http://localhost:4000";
  const url = "https://foodprep-uezu.onrender.com";

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
      console.log("Food list fetched successfully:", response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const fetchCartItems = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data || {});
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }

      await fetchFoodList();
    };

    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, [token]);

  const addToCart = async (itemId) => {
    if (!token) {
      if (!cartItems[itemId]) {
        setCartItems({ ...cartItems, [itemId]: 1 });
      } else {
        setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
      }
      return;
    }

    try {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const newCartItems = { ...cartItems };
      if (!newCartItems[itemId]) {
        newCartItems[itemId] = 1;
      } else {
        newCartItems[itemId] += 1;
      }
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) {
      if (cartItems[itemId] === 1) {
        const newCartItems = { ...cartItems };
        delete newCartItems[itemId];
        setCartItems(newCartItems);
      } else if (cartItems[itemId] > 0) {
        setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
      }
      return;
    }

    try {
      await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newCartItems = { ...cartItems };
      if (newCartItems[itemId] === 1) {
        delete newCartItems[itemId];
      } else if (newCartItems[itemId] > 0) {
        newCartItems[itemId] -= 1;
      }
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((food) => food._id === item);
        if (itemInfo) {
          total += itemInfo.price * cartItems[item];
        }
      }
    }
    return total;
  };

  const loadCartData = async (token) => {
    const response = await axios.get(url + "/api/cart/get", {
      headers: { token },
    });
    setCartItems(response.data.cartData);
  };

  const contextValue = {
    getTotalCartAmount,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    loadCartData,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;