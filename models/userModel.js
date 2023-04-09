const mongoose = require('mongoose')

const userSchema = mongoose.Schema( 
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        hashedPassword: {
            type: String
        },
        shippingAddress: {
            type: String
        }
    }
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel