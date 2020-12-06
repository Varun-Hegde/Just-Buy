import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './bootstrap.min.css'
import {Container} from 'react-bootstrap'
import './index.css'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <>
      <Header />
        <main className='py-3'>
          <Container>
            <HomeScreen />
          </Container>
        </main>
      <Footer />
    </>
  );
}

export default App;
