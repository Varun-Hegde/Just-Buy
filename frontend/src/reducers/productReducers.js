import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_DELETE_REVIEW_REQUEST,
    PRODUCT_DELETE_REVIEW_RESET,
    PRODUCT_DELETE_REVIEW_FAIL,
    PRODUCT_DELETE_REVIEW_SUCCESS,
    PRODUCT_UPDATE_REVIEW_FAIL,
    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_RESET,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_RESET,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_QUANTITY_FAIL,
    PRODUCT_QUANTITY_REQUEST,
    PRODUCT_QUANTITY_SUCCESS
} from '../constants/productConstants'




//SET THE DETAILS ABOUT ALL THE PRODUCTS
export const productListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            } 
            
        case PRODUCT_LIST_SUCCESS:
            return{
                loading:false,
                products: action.payload,
            }

        case PRODUCT_LIST_FAIL:
            return{
                loading:false, 
                error: action.payload
            }
        default:
            return state
    }
}


//SET THE DETAILS ABOUT A PARTICULAR PRODUCT 
export const productDetailReducer = (state = {product: {reviews:[]} }, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            } 
            
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading:false,
                product: action.payload,
            }

        case PRODUCT_DETAILS_FAIL:
            return{
                loading:false, 
                error: action.payload
            }
        default:
            return state
    }
}


//DELETE A PARTICULAR PRODUCT
export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true,
            } 
            
        case PRODUCT_DELETE_SUCCESS:
            return{
                loading:false,
                error:null,
                success: true
            }

        case PRODUCT_DELETE_FAIL:
            return{
                loading: false,
                success:false,
                error: action.payload
            }
        default:
            return state
    }
}


//CREATE A  PRODUCT
export const productCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true,
            } 
            
        case PRODUCT_CREATE_SUCCESS:
            return{
                loading:false,
                success:true,
                error:null,
                product:action.payload
            }

        case PRODUCT_CREATE_FAIL:
            return{
                loading: false,
                success:false,
                error: action.payload
            }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

//EDIT A  PRODUCT
export const productUpdateReducer = (state = {product:{}}, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true,
            } 
            
        case PRODUCT_UPDATE_SUCCESS:
            return{
                loading:false,
                success:true,
                error:null,
                product:action.payload
            }

        case PRODUCT_UPDATE_FAIL:
            return{
                loading: false,
                success:false,
                error: action.payload
            }
        case PRODUCT_UPDATE_RESET:
            return { product:{}}
        default:
            return state
    }
    
}

//ADD A PRODUCT REVIEW
export const productReviewCreateReducer = (state = {} , action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true,
                error: null
            } 
            
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return{
                loading:false,
                success:true,
                error:null,
            }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return{
                loading: false,
                success:false,
                error: action.payload
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return { }
        default:
            return state
    }
}

//DELETE A PRODUCT REVIEW
export const productReviewDeleteReducer = (state = {} , action) => {
    switch(action.type){
        case PRODUCT_DELETE_REVIEW_REQUEST:
            return {
                loading: true,
                error: null
            } 
            
        case PRODUCT_DELETE_REVIEW_SUCCESS:
            return{
                loading:false,
                success:true,
                error:null,
            }

        case PRODUCT_DELETE_REVIEW_FAIL:
            return{
                loading: false,
                success:false,
                error: action.payload
            }
        case PRODUCT_DELETE_REVIEW_RESET:
            return { }
        default:
            return state
    }
}

//EDIT A  PRODUCT REVIEW
export const productUpdateReviewReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REVIEW_REQUEST:
            return {
                loading: true,
                success:false
            } 
            
        case PRODUCT_UPDATE_REVIEW_SUCCESS:
            return{
                loading:false,
                success:true,
                error:null,
            }

        case PRODUCT_UPDATE_REVIEW_FAIL:
            return{
                loading: false,
                success:false,
                error: action.payload
            }
        case PRODUCT_UPDATE_REVIEW_RESET:
            return { }
        default:
            return state
    }
}

//GET A  PRODUCT REVIEW
export const productReviewDetailReducer = (state = { review: {} }, action) => {
    switch(action.type){
        case PRODUCT_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            } 
            
        case PRODUCT_REVIEW_SUCCESS:
            
            return{
                loading:false,
                error:null,
                review:action.payload
            }

        case PRODUCT_REVIEW_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCT_REVIEW_RESET:
            return { product:{}}
        default:
            return state
    }
}

//Update product quantity when order is placed
export const productQuantityReducer = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_QUANTITY_REQUEST:
            return {
                loading: true,
            } 
            
        case PRODUCT_QUANTITY_SUCCESS:
            
            return{
                loading:false,
                error:null,
                info:action.payload
            }

        case PRODUCT_QUANTITY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        
        default:
            return state
    }
}