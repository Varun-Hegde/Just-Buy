const express = require('express')
const dotenv = require('dotenv')

//GET THE CONNECTION TO MONGO
const connectDB = require('./config/db')

//LOGGER
const morgan = require('morgan')

//IMPORT ROUTES 
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

//IMPORT ERROR HANDLER AND PAGE NOT FOUND 
const {notFound,errorHandler} = require('./middlewear/errorMiddlewear')

dotenv.config()
 
const app = express()

//CONNECT TO DATABASE
connectDB()

//MIDDLEWEARS
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())

//ROUTES
app.get('/', (req, res) => {
  res.send('API is running...')
})

//PRODUCT ROUTE
app.use('/api/products',productRoutes)

//USER ROUTE
app.use('/api/users',userRoutes)
  
//PAGE NOT FOUND
app.use(notFound)

//ERROR HANDLER
app.use(errorHandler)

//LISTEN 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))