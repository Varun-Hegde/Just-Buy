const express = require('express');
const  router = express.Router()
const asyncHandler = require('express-async-handler')

//IMPORT MODEL
const Product = require('../models/productModel') 
const Review = require('../models/reviewModel')

//IMPORT MIDDLEWEAR 
const {protect, isAdmin,isReviewAuthor} = require('../middlewear/authMiddlewear'); 

//   @desc   Fetch all products
//   @route  GET /api/products
//   @access Public
router.get(
    '/',
    asyncHandler( async (req,res) => {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'  //CASE INSENSITIVE
            }
        } : {}
        const products = await Product.find({...keyword})
        
        res.json(products)
    })
)


//   @desc   Fetch a particular product based on id
//   @route  GET /api/products/:id
//   @access Public
router.get(
    '/:id',
    asyncHandler( async (req,res) => {
        const product = await Product.findById(req.params.id).populate('reviews');
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

//   @desc   Add a product review
//   @route  POST /api/products/:id/reviews
//   @access Private/Admin
router.post(
    '/:id/reviews',
    protect,
    asyncHandler(async (req,res) => {
        const {
            rating,
            comment,
        } = req.body
        const product = await Product.findById(req.params.id).populate('reviews')

        if (product) {
            const aldreadyReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString())
            if(aldreadyReviewed){
                res.status(400);
                throw new Error("You aldready added a review")
            }else{
                const review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    user: req.user._id
                }
                const newReview = new Review(review)
                product.reviews.push(newReview)
                await newReview.save()
                product.numReviews = product.reviews.length
                product.rating =
                    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                    product.reviews.length
                await product.save()
                res.status(201).json({ message: 'Review added' })
            }
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

//   @desc   Get a product review
//   @route  GET /api/products/:id/reviews/:reviewId
//   @access Private/Admin
router.get(
    '/:id/reviews/:reviewId',
    asyncHandler(async (req,res) => {
        const review = await Review.findById(req.params.reviewId)
        if(!review){
            res.status(404)
            throw new Error("Review not found")
        }
        res.json(review)
    })
)

//   @desc   Update a product review
//   @route  PUT /api/products/:id/reviews/:reviewId
//   @access Private/Admin
router.put(
    '/:id/reviews/:reviewId',
    protect,
    isReviewAuthor,
    asyncHandler(async (req,res,next) => {
        const product = await Product.findById(req.params.id)
        if(!product){
            res.status(404)
            throw new Error("No product found");
        }
        const review = await Review.findById(req.params.reviewId)
        if(!review){
            res.status(404)
            throw new Error("Review not found");
        }
       
        review.rating = req.body.rating || review.rating
        review.comment = req.body.comment || review.comment

        const updatedReview = await review.save()
        res.json(updatedReview)

    })
)

//   @desc   Delete a product review
//   @route  DELETE /api/products/:id/reviews/:reviewID
//   @access Private/Admin
router.delete(
    '/:id/reviews/:reviewId',     
    protect,
    isReviewAuthor,
    asyncHandler(async (req,res,next) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(404)
            throw new Error("No product found");
        }
        const review = await Review.findById(req.params.reviewId);
        if(!review){
            res.status(404)
            throw new Error("No review found");
        }
        await Product.findByIdAndUpdate(req.params.id,{$pull : {reviews: req.params.reviewId}})
        await Review.findByIdAndDelete(req.params.reviewId)
        res.json({message: "Review removed"})
    })
)
module.exports = router