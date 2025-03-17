import {createContext,useState} from 'react'
import {food_list} from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContexProvider = (props)=>{
    const [cartItems,setCartItems] = useState({})

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems({...cartItems,[itemId]:1})
        }
        else{
            setCartItems({...cartItems,[itemId]:cartItems[itemId]+1})
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems({...cartItems,[itemId]:cartItems[itemId]-1})
    }

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart        
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContexProvider;