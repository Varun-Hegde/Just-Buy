import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR
} from '../constants/cartConstants'

//ADD ITEMS TO CART AND SET THE ITEMS TO LOCAL STORAGE
export const addToCart = (id,qty) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    }) 

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));

}

//REMOVE ITEMS FROM CART AND UPDATE IN LOCAL STORAGE
export const removeFromCart = (id) => (dispatch,getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}   
//CLEAR CART
export const clearCart = () => (dispatch,getState) => {
    dispatch({
        type:CART_CLEAR
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}   

//SAVE THE SHIPPING ADDRESS TO LOCAL STORAGE
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

    localStorage.setItem('shippingAddress',JSON.stringify(data));
}   

//SAVE THE PAYMENT MODE TO LOCAL STORAGE
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })

    localStorage.setItem('paymentMethod',JSON.stringify(data));
}   

