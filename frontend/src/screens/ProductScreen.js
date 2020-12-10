import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {useSelector,useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import {listProductDetails,createProductReview,deleteProductReview} from '../actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'

const ProductScreen = ({ match,history }) => {
  
  const [qty,setQty] = useState(1)
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState('')
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading,error,product} = productDetails


  const reviewDetails = useSelector(state => state.productReviewDelete)
  const {success:successReviewDelete} = reviewDetails

  const reviewUpdate = useSelector(state => state.productReviewUpdate)
  const {success:successReviewUpdate} = reviewUpdate


  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    error:errorProductReview,
    success:successProductReview
  } = productReviewCreate

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const addToCartHandler = () => {
      //histotry.push makes a redirect to that url 
      history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
      dispatch(createProductReview(match.params.id, {rating,comment}))
      
    }
    const deleteHandler = (reviewId) => {
      //console.log(product._id,reviewId)
      dispatch(deleteProductReview(product._id,reviewId))
    }
  
  useEffect(() => {
    if(successProductReview ){
      setRating(0);
      setComment('');
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    
    dispatch(listProductDetails(match.params.id))
  },[dispatch,match,successProductReview,successReviewDelete,successReviewUpdate])


  return (
    <>
    <Meta title={product.name} />
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
        <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ) }
              
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mt-4">
          <h2>Reviews</h2>
          {product.reviews && product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map(review => (
              <ListGroup.Item key={review._id}>
                <Row>
                  <Col md={8}>
                    <strong className="highlight">{review.name}</strong>
                    <Rating value={review.rating}/>
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                  </Col>
                  <Col className='mt-3' md={4}>
                    {userInfo && (review.user === userInfo._id || userInfo.isAdmin) ? (
                      <>

                      <LinkContainer to={`/product/${product._id}/reviews/${review._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(review._id)}
                      >
                      <i className='fas fa-trash'></i>
                      </Button>
                      </>
                    ) : (null)}
                  </Col>
                </Row>
                                
              </ListGroup.Item>
            ))}
            
            <ListGroup.Item>
              <h2>Add a review</h2>
            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>
                      Rating
                    </Form.Label>
                    <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                    >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                </Form>
              ) : 
              <Message><Link to='/login'>Log in</Link> to add a review</Message>}
            </ListGroup.Item>
          </ListGroup>
          
        </Col>
      </Row>
      </>
      )}
      
    </>
  )
}

export default ProductScreen