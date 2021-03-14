//DATABASE SCHEMA FOR address
const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
    {
        address: { 
            type: String, 
            required: true 
        },
        city: { 
            type: String, 
            required: true 
        },
        postalCode: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        },
    }
)

const address = mongoose.model('Address', addressSchema)

module.exports = address