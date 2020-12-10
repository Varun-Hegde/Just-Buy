const express = require('express');
const  router = express.Router()

//IMPORT MODEL
const Order = require('../models/orderModel') 

const asyncHandler = require('express-async-handler')

//IMPORT MIDDLEWEAR 
const {protect, isAdmin} = require('../middlewear/authMiddlewear'); 


//   @desc   Get orders of a particular person
//   @route  GET /api/products
//   @access Private
router.get(
    '/myorders',
    protect,
    asyncHandler(async (req,res) => {
        const orders = await Order.find({user: req.user._id})
        res.json(orders);
    })
)

//   @desc   Create a new order
//   @route  GET /api/orders/
//   @access Private
router.post(
    '/',
    protect,
    asyncHandler(async (req,res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice } = req.body;
        if(orderItems && orderItems.length === 0){
            res.status(400)
            throw new Error("No order Items")
            return;
        }else{
            const order = new Order({
                orderItems,
                user:  req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
        }

    })
)


//   @desc   Get order by a particular id
//   @route  GET /api/orders/
//   @access Private
router.get(
    '/:id',
    protect,
    asyncHandler(async (req,res) => {
        const order = await Order.findById(req.params.id).populate('user','name email')

        if(order){
            res.json(order)
        }else{
            res.status(404)
            throw new Error('Order not found')
        }

    })
)


//   @desc   Update order to paid
//   @route  GET /api/orders/
//   @access Private
router.put(
    '/:id/pay',
    protect,
    asyncHandler(async (req,res) => {
        const order = await Order.findById(req.params.id)

        if(order){       
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id:req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(404)
            throw new Error('Order not found')
        }

    })
)

//   @desc   Get all orders
//   @route  GET /api/orders/
//   @access Private/Admin
router.get(
    '/',  
    protect,
    isAdmin, 
    asyncHandler(async (req,res) => {
        const orders = await Order.find({}).populate('user','id name email')
        res.json(orders)
    })
)

//   @desc   Update order status
//   @route  PUT /api/orders/deliver
//   @access Private/Admin
router.put(
    '/:id/deliver',
    protect,
    isAdmin,
    asyncHandler(async (req,res) => {
        const order = await Order.findById(req.params.id)
  
        //console.log(req.body);
        if(order){       
            order.isDelivered = true
            order.deliveredAt = Date.now()
              
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(404)
            throw new Error('Order not found')
        }

    })
)


module.exports = router   