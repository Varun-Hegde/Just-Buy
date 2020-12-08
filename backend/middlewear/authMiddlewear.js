const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Review = require('../models/reviewModel')

//CHECK WHETHER THE USER IS LOGGED IN OR NOT BY CHECKING THE TOKEN IN HEADER. 
//ALLOW ACCESS TO NEXT MIDDLEWEARS AND  ROUTES ONLY IF LOGGED IN
module.exports.protect = asyncHandler(async (req,res,next) => {
    
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next();
        }catch(err){
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    }  
    
    if(!token){
        res.status(401)
        throw new Error('Not authorized,no token')
    }
    
    
})
//CHECK WHETHER THE USER IS ADMIN. 
//ALLOW ACCESS TO NEXT MIDDLEWEARS AND  ROUTES ONLY IF THE USER IS ADMIN
module.exports.isAdmin = asyncHandler(async (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as an admin')
    }
})

module.exports.isReviewAuthor = asyncHandler(async(req,res,next) => {
    const {reviewId} = req.params
    const review = await Review.findById(reviewId)
     /* if(req.user.isAdmin){
        // console.log(req.user.isAdmin);
        return next();
    } 
    else  */
    //console.log("req.user from isReview author is:",req.user);
    if(!req.user.isAdmin && !review.user.equals(req.user._id)){
        res.status(401)
        throw new Error("You don't have permission to delete other reviews");
    }
    else{
        next();
    }
    
})

