const mongoose = require('mongoose');
const User = require('./userModel')

const reviewSchema = mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Review',reviewSchema)