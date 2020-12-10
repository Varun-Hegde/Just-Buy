//DATABASE SCHEMA FOR PRODUCTS
const mongoose = require('mongoose');
const User = require('./userModel')
const Review = require('./reviewModel')


const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required:  true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

//DELETE ALL THE REVIEWS RELATED TO A PRODUCTD WHEN A PRODUCTD IS DELETED
productSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await Review.deleteMany ({
            _id: {
                $in : doc.reviews
            }
        })
    }
})  



const Product = mongoose.model('Product', productSchema)

module.exports = Product