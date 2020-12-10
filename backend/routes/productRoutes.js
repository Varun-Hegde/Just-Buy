const express = require('express');
const  router = express.Router()
const asyncHandler = require('express-async-handler')

//IMPORT MODEL
const Product = require('../models/productModel') 
const Review = require('../models/reviewModel')

//IMPORT MIDDLEWEAR 
const {protect, isAdmin} = require('../middlewear/authMiddlewear'); 

//   @desc   Fetch all products
//   @route  GET /api/products
//   @access Public
router.get(
    '/',
    asyncHandler( async (req,res) => {
        const products = await Product.find({})
        res.json(products)
    })
)


//   @desc   Fetch a particular product based on id
//   @route  GET /api/products/:id
//   @access Public
router.get(
    '/:id',
    asyncHandler( async (req,res) => {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product)
        }else{
            res.status(404).json({message: "Product not found"})
        }
    })
)

//   @desc   Delete a particular product
//   @route  DELETE /api/products/:id
//   @access Private/Admin
router.delete(
    '/:id',
    protect,
    isAdmin,
    asyncHandler( async (req,res) => {
        const product = await Product.findByIdAndDelete(req.params.id)
        
        if(product){
            res.json({message: "Product removed"})
        }else{
            res.status(400)
            throw new Error('Product not found')
        }
    })
)


//   @desc   Add a new product
//   @route  POST /api/products/
//   @access Private/Admin
router.post(
    '/',
    protect,
    isAdmin,
    asyncHandler(async (req,res) => {
        const product = new Product({
            name: 'Name',
            price: 0,
            user: req.user._id,
            image: 'Image',
            brand: 'Brand',
            category: 'Category',
            countInStocks: 0,
            numReviews: 0,
            description: 'Desc'
        })
        const createdProduct = await product.save()
        res.status(201)
        res.json(createdProduct)

    })
)


//   @desc   Update a particular product
//   @route  PUT /api/products/:id
//   @access Private/Admin
router.put(
    '/:id',
    protect,
    isAdmin,
    asyncHandler(async (req,res) => {
        const {
            name,
            price,
            description,
            image,
            brand,
            category,
            countInStock,
        } = req.body

        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name
            product.price = price
            product.description = description
            product.image = image
            product.brand = brand
            product.category = category
            product.countInStock = countInStock

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

module.exports = router