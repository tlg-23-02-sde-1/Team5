const mongoose = require('mongoose')

const plantSchema = mongoose.Schema( 
    {
        name: {
            type: String
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        careRequirements: {
            type: String
        },
        size: {
            type: String
        },
        price: {
            type: Number
        }
    }
)

const plantModel = mongoose.model('Plant', plantSchema)

module.exports = plantModel