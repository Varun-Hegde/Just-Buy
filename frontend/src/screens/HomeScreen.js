import React,{ useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import {listProducts} from '../actions/productActions'

const HomeScreen = ({match}) => {
  
  const keyword = match.params.keyword
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products} = productList

  useEffect(() => {
     dispatch(listProducts(keyword))
  }, [dispatch,keyword])

  const len = products.length

  return (
    <>
    <Meta />
      <h1>Latest Products</h1>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Row> 
        {len>0 ? products.map((product) => (
          
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        )) :  (
          <>
            <Message variant='info'>No product found. <Link to='/'>Go Back</Link></Message>
          </>
        )}

      </Row>
      )}
      
    </>
  )
}

export default HomeScreen