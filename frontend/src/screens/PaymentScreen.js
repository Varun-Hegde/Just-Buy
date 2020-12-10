import React,{useState } from 'react'
import {Form,Button,Row} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../actions/cartActions'
import CheckOutSteps from '../components/CheckoutSteps'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Meta from '../components/Meta'
const PaymentScreen = ({history}) => {
    
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const dispatch = useDispatch()
    
    const [paymentMethod,setPaymentMethod] = useState(null)

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false
    });

    const submitHandler = (e) => {
        console.log("BUTTON CLICKED",paymentMethod);
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    
    const handleChange = (event,data) => {
    setState({ 
        checkedA:false,
        checkedB: false, 
        checkedC: false,
        checkedD: false,
        [event.target.name]: event.target.checked })
    setPaymentMethod(data)
  };

    return (
        <div>
            <Meta title="Payment" />
            <FormContainer>
                <CheckOutSteps step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>
                            Select a payment method
                        </Form.Label>
    
                        <Row>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state.checkedA}
                                    onChange={ (e) => handleChange(e,'Credit Card') }
                                    name="checkedA"
                                    color="primary"
                                />
                                }
                                label="Credit Card"
                            />
                        </Row>
                        <Row>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state.checkedB}
                                    onChange={ (e) => handleChange(e,"Cash On Delivery") }
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Cash On Delivery"
                            />
                        </Row>
                        <Row>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state.checkedC}
                                    onChange={ (e) => handleChange(e,"Net Banking") }
                                    name="checkedC"
                                    color="primary"
                                />
                                }
                                label="Net Banking"
                            />
                        </Row>
                        <Row>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state.checkedD}
                                    onChange={ (e) => handleChange(e,"UPI") }
                                    name="checkedD"
                                    color="primary"
                                />
                                }
                                label="UPI"
                            />
                        </Row>
                        
                    </Form.Group>
                    <Button type='submit' className='btn btn-block' variant='primary' disabled={paymentMethod==null ? true : false}>Continue</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen

