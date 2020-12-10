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
function App() {
 
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route path='/' component={HomeScreen}  exact />
              <Route path='/product/:id' component={ProductScreen}  />
              <Route path='/cart/:id?' component={CartScreen}  />
              <Route path='/login' component={LoginScreen}  />
              <Route path='/register' component={RegisterScreen}  />
              <Route path='/profile' component={ProfileScreen}  />
              <Route path='/shipping' component={ShippingScreen}  />
              <Route path='/payment' component={PaymentScreen}  />
              <Route path='/placeorder' component={PlaceOrderScreen}  />
              <Route path='/order/:id' component={OrderScreen}  />
              <Route path='/admin/userlist' component={UserlistScreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            </Switch>
          </Container>
        </main>
      <Footer />
    </Router>
    
  );
  
}

export default App;
