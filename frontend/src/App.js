import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './bootstrap.min.css'
import {Container} from 'react-bootstrap'
import './index.css'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserlistScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProdutListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ProductReviewEditScreen from './screens/ProductReviewEditScreen'

function App() {
 
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route path='/' component={HomeScreen}  exact />
              <Route path='/product/:id' component={ProductScreen} exact />
              <Route path='/cart/:id?' component={CartScreen}  exact/>
              <Route path='/login' component={LoginScreen} exact />
              <Route path='/register' component={RegisterScreen}  exact/>
              <Route path='/profile' component={ProfileScreen}  exact/>
              <Route path='/shipping' component={ShippingScreen} exact />
              <Route path='/payment' component={PaymentScreen} exact />
              <Route path='/placeorder' component={PlaceOrderScreen} exact />
              <Route path='/order/:id' component={OrderScreen}  />
              <Route path='/admin/userlist' component={UserlistScreen} exact/>
              <Route path='/admin/user/:id/edit' component={UserEditScreen} exact/>
              <Route path='/admin/productlist' component={ProductListScreen} exact/>
              <Route path='/admin/productlist/:pageNumber' component={ProductListScreen}exact />
              <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact/>
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route path='/product/:id/reviews/:reviewId/edit' component={ProductReviewEditScreen} exact/>
              <Route path='/search/:keyword' component={HomeScreen} exact/>
              <Route path='/page/:pageNumber' component={HomeScreen} exact />
              <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
            </Switch>
          </Container>
        </main>
      <Footer />
    </Router>
    
  );
  
}

export default App;
