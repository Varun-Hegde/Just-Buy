 import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register } from '../actions/userActions'

const RegisterScreen = ({location,history}) => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [confirmPassword,setconfirmPassword] = useState('')
    const [message,setMessagge] = useState(null)
    
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }

    },[history,userInfo,redirect ])
  
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessagge("Passwords do not match")
        }else{
            dispatch(register(name,email,password))
        }
        
    }

    return (
        <>
         
        <FormContainer>
            <h1> Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Enter name' 
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter email' 
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter password' 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm password' 
                        value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                Aldready have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log in</Link>
                </Col>
            </Row>
        </FormContainer>
        </>
    )
}

export default RegisterScreen
