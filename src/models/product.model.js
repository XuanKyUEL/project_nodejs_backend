'use strict'

const {model, Schema, Types} = require("mongoose"); // Erase if already required
const { default: slugify } = require("slugify");

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
    product_slug: String,
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
    // more
    product_ratingAvg: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
        set: (val) => Math.round(val * 10) / 10
    },
    product_variations: {
        type: Array,
        default: [],
        isDraft: {
            type: Boolean,
            default: true,
            index: true,
            select: false
        },
        isPublished: {
            type: Boolean,
            default: false,
            index: true,
            select: false
        }
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true, // Automatically manage createdAt and updatedAt fields
}
);
// Document middleware runs before .save() and .create() ...
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});

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
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    }
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
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,  
    }
}, {
    collection: 'electronics',
    timestamps: true,
});

// Define the product type = Furniture
const furnitureSchema = new Schema ({
    material: {
        type: String,
        required: true,
    },
    dimensions: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    }
}, {
    collection: 'furniture',
    timestamps: true,
});


//Export the model
module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronics: model('Electronics', electronicsSchema),
    furniture: model('Furniture', furnitureSchema),
};
