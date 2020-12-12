import React,{useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button,Row,Col,ListGroup,Image,Card,Form} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails,payOrder,deliverOrder} from '../actions/orderActions'
import {updateProductQuantity} from '../actions/productActions'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta'


const OrderScreen = ({match,history}) => {

    const [changeOrderStatus,setchangeOrderStatus] = useState('Ordered')
    const orderId = match.params.id
    const orderDetails = useSelector(state => state.orderDetails)
    const {order,error,loading} = orderDetails
    const dispatch = useDispatch()
    
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        
        if (!userInfo) {
            history.push('/login')
        }
        if(!order || successPay || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }
        if(order){
            setchangeOrderStatus(order.orderStatus)
        }
         
    },[dispatch,orderId,order,successPay,successDeliver,history,userInfo])
    
    
    if(!loading){
        const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item) => acc+item.price*item.qty,0))
    }
    const successPaymentHandler = () => {
            const payMentResult = {
                id: order._id,
                status: 'PAID',
                update_time: Date.now(),
                email_address : order.user.email,
            }
        dispatch(payOrder(orderId,payMentResult))
        dispatch(updateProductQuantity(order.orderItems))
        dispatch({type: ORDER_PAY_RESET})
        dispatch({type: ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order,changeOrderStatus))
    }


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <Meta title="All Orders" />
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong className="highlight">NAME: </strong>{order.user.name}</p>
                            <p><strong className="highlight">EMAIL: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong className="highlight">ADDRESS: </strong>
                                {order.shippingAddress.address},{order.shippingAddress.city}{' '},
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {!order.isPaid ? <Message variant='info'> Order Status: Payment Pending</Message> : (
                                <Message variant='info'>Order Status: {order.orderStatus}</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong className="highlight">METHOD: </strong>
                            {order.paymentMethod}</p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map( (item,index) => (
                                        <ListGroup.Item key={index}> 
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${ (item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4} >
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                 <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>  
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && (<Loader />)}
                                    <Button 
                                        onClick = {successPaymentHandler}>
                                            Confirm Payment
                                    </Button>
                                </ListGroup.Item>
                            ) }
                            {loadingDeliver && <Loader />}     
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                <>
                                    <Form className="m-3" onSubmit={deliverHandler}>
                                    <Form.Group controlId="changeOrderStatus">
                                        <Form.Label>Select Order Status</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            custom
                                            value={changeOrderStatus}
                                            onChange={(e) => setchangeOrderStatus(e.target.value)}
                                        >
                                        <option value='Ordered'>Ordered</option>
                                        <option value='Packed'>Packed</option>
                                        <option value='Shipped'>Shipped</option>
                                        <option value='Out For Delivery'>Out For Delivery</option>
                                        <option value='Delivered'>Delivered</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        type='submit'
                                        className='btn btn-block'
                                       
                                        >
                                        Change Order Status
                                        </Button>
                                    </Form>
                                    
                                        
                                    
                                </>
                                )
                                
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}


export default OrderScreen
