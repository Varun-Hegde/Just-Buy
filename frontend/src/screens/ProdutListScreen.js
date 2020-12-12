import React,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProducts,deleteProduct,createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductListScreen = ({history,match}) => {
    
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const {success: successDelete,loading:loadingDelete,error:errorDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {success: successCreate,loading:loadingCreate,error:errorCreate,product:createdProduct} = productCreate

    
    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit?task=add`)
        }else{
            dispatch(listProducts())
        }
        
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct])
    
    const deleteHandler = (id) => {
        if(window.confirm("Are you Sure")){
            dispatch(deleteProduct(id))
        }
        
    }

    const createProudctHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
        <Meta title="All Products" />
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className = 'my-3' onClick={createProudctHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{error}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>No. of pieces sold</th>
                        <th>REVENUE GENERATED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <LinkContainer className="onhover" to={`/product/${product._id}`}>
                                <td>{product.name}</td>
                            </LinkContainer>
                            <td>${product.price}</td>
                            <td>
                                {product.category}
                            </td>
                            <td>{product.brand}</td>
                            <td>
                                {product.totalPiecesSold}
                            </td>
                            <td>
                                {product.revenueGenerated}
                            </td>
                            <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(product._id)}
                            >
                                <i className='fas fa-trash'></i>
                            </Button>
                            </td>
                        </tr> 
                        ))}
                    </tbody>
                </Table>
            )}   
        </>
    )
}

export default ProductListScreen