//DATABASE SCHEMA FOR ORDERS
const mongoose = require('mongoose')
const User = require('./userModel')
const Product = require('./productModel')
const Address = require('./addressModel')
const Payment = require('./paymentModel')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Address'
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    paymentResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus:{
      type: String,
      required: true,
      default: 'Ordered',
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },
    isCancelled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order