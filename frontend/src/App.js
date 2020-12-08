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
            </Switch>
          </Container>
        </main>
      <Footer />
    </Router>
    
  );
  
}

export default App;
