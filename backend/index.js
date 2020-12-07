const express = require('express')
const products = require('./data/products')
const dotenv = require('dotenv')
//GET THE CONNECTION TO MONGO
const connectDB = require('./config/db')

//LOGGER
const morgan = require('morgan')

dotenv.config()
 
const app = express()
connectDB()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))