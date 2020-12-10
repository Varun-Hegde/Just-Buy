import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {PRODUCT_UPDATE_REVIEW_RESET} from '../constants/productConstants'
import {useSelector,useDispatch} from 'react-redux'
import {updateProductReview,getProductReview} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
const ProductReviewEditScreen = ({history,match}) => {
    
    const {id,reviewId} = match.params
    
    const dispatch = useDispatch()
    
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')
    
    const reviewDetail = useSelector(state => state.productReviewDetail)
    const {loading,error,review} = reviewDetail

    const reviewUpdate = useSelector(state => state.productReviewUpdate)
    const {success:successUpdate} = reviewUpdate
    console.log(reviewUpdate);
    
    useEffect(() => {
        /* if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_REVIEW_RESET})
            history.push(`/product/${id}`)
        }
        else{ */ 
            
            if(!review || !review.rating){
            dispatch(getProductReview(id,reviewId))
            }else{
                setRating(Math.round(review.rating))
                setComment(review.comment)
            }
        //}
        
    },[dispatch,history,id,reviewId,review,successUpdate])
    
    const submitHandler = (e) => {
        e.preventDefault()
        const newReview = {
            rating,
            comment
        }
        dispatch(updateProductReview(id,reviewId,newReview))
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_REVIEW_RESET})
            history.push(`/product/${id}`)
        }
    }

    return (
        <div>
            <Meta title="Edit Review" />
            <h1>Edit Review</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}

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
                    <Form.Label>Your Review</Form.Label>
                    <Form.Control 
                        as='textarea' 
                        row={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update Review
                </Button>
            </Form>
        </div>
    )
}

export default ProductReviewEditScreen


