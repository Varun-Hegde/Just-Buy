const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema(
    {
        id: { 
            type: String 
        },
        status: { 
            type: String 
        },
        update_time: { 
            type: String 
        },
        email_address: { 
            type: String 
        },
    }
)

const payment = mongoose.model('Payment', paymentSchema)

module.exports = payment