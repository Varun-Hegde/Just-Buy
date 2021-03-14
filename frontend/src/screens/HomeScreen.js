import React,{ useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import {listProducts} from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'

const HomeScreen = ({match}) => {
  
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products,page,pages} = productList

  useEffect(() => {
     dispatch(listProducts(keyword,pageNumber))
  }, [dispatch,keyword,pageNumber])

  const len = products.length

  return (
    <>
    <Meta />
      
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Products</h1>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <>
        <Row> 
        {len>0 ? products.map((product) => (
          
          <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
            <Product product={product} />
          </Col>
        )) :  (
          <>
            <Message variant='info'>No product found. <Link to='/'>Go Back</Link></Message>
          </>
        )}

      </Row>
      <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
          </>
      )}
      
    </>
  )
}

export default HomeScreen