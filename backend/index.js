const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

//GET THE CONNECTION TO MONGO
const connectDB = require('./config/db')

//LOGGER
const morgan = require('morgan')

//IMPORT ROUTES 
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

//IMPORT ERROR HANDLER AND PAGE NOT FOUND 
const {notFound,errorHandler} = require('./middlewear/errorMiddlewear')

dotenv.config()
const app = express() 

//CORS
app.use(cors({credentials: true, origin: true})) 


//CONNECT TO DATABASE
connectDB()

//MIDDLEWEARS
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//ROUTES
app.get('/', (req, res) => {
  res.send('API is running...')
})

//PRODUCT ROUTE
app.use('/api/products',productRoutes)

//USER ROUTE
app.use('/api/users',userRoutes)
  
//ORDER ROUTE
app.use('/api/orders',orderRoutes)

//UPLOAD ROUTES
app.use('/api/upload',uploadRoutes);

//PAGE NOT FOUND
app.use(notFound)

//ERROR HANDLER
app.use(errorHandler)

//LISTEN 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))