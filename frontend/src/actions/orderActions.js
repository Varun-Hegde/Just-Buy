import{
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_CANCEL_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_RESET,
    ORDER_CANCEL_SUCCESS,
} from '../constants/orderConstants'
import axios from '../axios'
//CREATE A NEW ORDER
export const createOrder = (order) => async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.post(
            `/api/orders`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}    


//GET DETAILS ABOUT A PARTICULAR ORDER
export const getOrderDetails = (id) => async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(
            `/api/orders/${id}`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



//PAYMENT FOR A PARTICULAR ORDER
export const payOrder = (orderId,paymentResult) => async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//LIST OF ALL THE ORDERS CREATED BY A USER.VIEWED BY USER
export const listMyOrders = () => async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(
            `/api/orders/myorders`,
            config
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//LIST OF ALL THE ORDERS VIEWED BY ADMIN
export const listOrders = () => async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_LIST_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(
            `/api/orders/`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//MAKE THE ORDER DELIVERED,ACCESSED ONLY BY ADMIN
export const deliverOrder = (order,status) => async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(
            `/api/orders/${order._id}/deliver?status=${status}`, 
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

//CANCEL ORDER
export const cancelOrder = (orderId) => async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_CANCEL_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(
            `/api/orders/${orderId}/cancelorder`, 
            {},
            config
        )

        dispatch({
            type: ORDER_CANCEL_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:ORDER_CANCEL_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}