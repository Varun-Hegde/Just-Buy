import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
 
import {
    productListReducer,
    productDetailReducer,
} from './reducers/productReducers'

import {
    cartReducer,
} from './reducers/cartReducer'

const reducer = combineReducers({
    productList     : productListReducer,
    productDetails  : productDetailReducer,
    cart            : cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) :  []


const initialState = {
    cart : {
        cartItems:  cartItemsFromStorage,
    },
}

const middlewear = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewear))
)

export default store