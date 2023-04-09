const mongoose = require('mongoose')

const orderSchema = mongoose.Schema( 
    {
        orderId: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        plantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plant"
        },
        quantity: {
            type: Number
        },
        shippingInformation: {
            type: String
        },
        paymentDetails: {
            type: String
        }
    }
)

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel