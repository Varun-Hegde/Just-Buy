const express = require('express');
const  router = express.Router()

//IMPORT MODEL
const Order = require('../models/orderModel') 
const Address = require('../models/addressModel')
const Payment = require('../models/paymentModel')

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
            const orderAddress = new Address({
                address: shippingAddress.address,
                city: shippingAddress.city,
                postalCode: shippingAddress.postalCode,
                country: shippingAddress.country
            })
            const savedAddress = await orderAddress.save()
            
            
            const order = new Order({
                orderItems,
                user:  req.user._id,
                shippingAddress : savedAddress,
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
        const order = await Order.findById(req.params.id).populate('user','name email').populate('paymentResult').populate('shippingAddress')

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
        const order = await Order.findById(req.params.id).populate('paymentResult').populate('shippingAddress')

        if(order){       
            order.isPaid = true
            order.paidAt = Date.now()
            const orderPayment = new Payment ({
                id:req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            })
            const savedPayment = await orderPayment.save()
            order.paymentResult = savedPayment
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
        const orders = await Order.find({}).populate('user','id name email').populate('paymentResult').populate('shippingAddress')
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
        const order = await Order.findById(req.params.id).populate('paymentResult').populate('shippingAddress')
  
        if(order){     
            order.orderStatus = req.query.status
            if(order.orderStatus === 'Delivered'){
                order.isDelivered = true
                order.deliveredAt = Date.now()
            }
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(404)
            throw new Error('Order not found')
        }
    })
)

//   @desc   Cancel an order which is not yet delivered
//   @route  PUT /api/orders/cancelorder
//   @access Private
router.put(
    '/:id/cancelorder',
    protect,
    asyncHandler(async (req,res) => {
        const order = await Order.findById(req.params.id).populate('paymentResult').populate('shippingAddress')
        console.log("After getting order");

        if(order){
            if(order.isDelivered){
                console.log("If order is delivered");
                res.status(405);
                throw new Error("Aldready delivered, Can't cancel now");
            }else{
                console.log("Initiate cancel");
                order.orderStatus = "Cancelled,Refund initiated"
                order.isCancelled = true
                const updatedOrder = await order.save()
                res.json(updatedOrder)
            }
        }else{
            res.status(404)
            throw new Error('Order not found')
        }
    })
)


module.exports = router   