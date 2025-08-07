'use strict'

const {model, Schema, Types} = require("mongoose"); // Erase if already required

// Init simple schemas

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "products";
// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name:{
        type:String,
        required:true,
    },
    product_thumb: {
        type: String,
        required: true
    },
    product_description: String,
    product_price: {
        type:Number,
        required:true,
    },
    product_quantity: {
        type:Number,
        required:true,
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Furniture']
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required:true,
    },
    product_attributes: {
        type: Schema.Types.Mixed, // Use Mixed type for flexible attributes
        required: true,
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true, // Automatically manage createdAt and updatedAt fields
}
);

// Define the product type = Clothing
const clothingSchema = new Schema ({
    brand: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
}, {
    collection: 'clothes',
    timestamps: true,
}
);

// Define the product type = Electronics
const electronicsSchema = new Schema ({
    manufacturer: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
}, {
    collection: 'electronics',
    timestamps: true,
});


//Export the model
module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronics: model('Electronics', electronicsSchema)
};
