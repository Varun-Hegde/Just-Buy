import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
import NumberFormat from 'react-number-format'

const Product = ({ product }) => {


  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'><NumberFormat className="noborder" thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} value={product.price}/></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product

