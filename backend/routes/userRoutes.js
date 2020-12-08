const express = require('express');
const router = express.Router()

//IMPORT MODEL
const User =   require('../models/userModel') 

const generateToken = require('../utils/generateToken')

const asyncHandler = require('express-async-handler')

//IMPORT MIDDLEWEAR
const {protect,isAdmin} = require('../middlewear/authMiddlewear'); 


//   @desc   Register new user
//   @route  POST /api/users/
//   @access Public
router.post(
    '/',
    asyncHandler( async (req,res) => {
        const {name,email,password} = req.body
        const userExists = await User.findOne({email})

        if(userExists){
            res.status(400);
            throw new Error('A user with this email aldready exists')
        }

        const user = new User(req.body);
        await user.save();  
        if(user){
            res.status(201).json({
                _id:user._id,
                name: user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }else {
            res.status(400)  
            throw new Error("Invalid user data")
        }
    })
)

//   @desc   Login a user
//   @route  POST /api/users/login
//   @access Public
router.post(
    '/login',
    asyncHandler( async (req,res) => {
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name: user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error('Invalid email or password')
        }
        
    })
)

//   @desc   Get user profile
//   @route  GET /api/users/profile
//   @access Private
router.get(
    '/profile',
    protect,
    asyncHandler( async (req,res) => {
        const user = await User.findById(req.user._id);
        if(user){
            res.json({
                _id:user._id,
                name: user.name,
                email:user.email,
                isAdmin: user.isAdmin,
            })
        }else{
            res.status(401);
            throw new Error("User not found")
        }
        
        
    })
)
//   @desc   Update user profile
//   @route  PUT /api/users/profile
//   @access Private
router.put(
    '/profile',
    protect,
    asyncHandler( async (req,res) => {
        const user = await User.findById(req.user._id);
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
             if(req.body.password){
                 user.password = req.body.password
             }
             const updatedUser = await user.save()
             res.json({
                _id:updatedUser._id,
                name: updatedUser.name,
                email:updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        }else{
            res.status(401);
            throw new Error("User not found")
        }
        
        
    })
)

//GET ALL USERS
//ONLY ACCESSED BY ADMIN
router.get(
    '/',
    protect,
    isAdmin,
    asyncHandler( async (req,res) => {
        const users = await User.find({});
        res.json(users)
    })
)

//GET INDIVIDUAL USER
//ONLY ACCESSED BY ADMIN
router.get(
    '/:id',
    protect,
    isAdmin,
    asyncHandler(async(req,res,next) => {
        const user = await User.findById(req.params.id).select('-password')
        if(user){
            res.json(user)
        }else{
            res.status(404)
            throw new Error("User not found")
        }
    })
)

//DELETE A USER
//ONLY ACCESSED BY ADMIN
router.delete(
    '/:id',
    protect,
    isAdmin,
    asyncHandler( async (req,res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        if(user){
            res.json({message: "User removed"})
        }else{
            res.status(404);
            throw new Error("User not found")
        }
    })
)


//UPDATE USER PROFILE OF A PARTICULAR USER
//ONLY ACCESSED BY ADMIN
router.put(
    '/:id',
    protect,
    isAdmin,
    asyncHandler( async (req,res) => {
        const user = await User.findById(req.params.id);
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.isAdmin = req.body.isAdmin || false
             const updatedUser = await user.save()
             res.json({
                _id:updatedUser._id,
                name: updatedUser.name,
                email:updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            })
        }else{
            res.status(401);
            throw new Error("User not found")
        }
        
        
    })
)



module.exports = router