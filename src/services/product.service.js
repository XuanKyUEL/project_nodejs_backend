'use strict'

const { BadRequestError } = require("../core/error.response");
const {product, clothing, electronics, furniture} = require("../models/product.model");


// define Factory class to create product

class ProductFactory {
    /**
     * Type: "Clothing"
     * payload
     */
    static async createProduct(type, payload) {
        console.log("ProductFactory.createProduct called with type:", type, "payload:", payload);
        
        let productInstance;
        switch (type) {
            case 'Clothing':
                console.log("Creating Clothing product with payload:", payload);
                productInstance = new Clothing(payload);
                break;
            case 'Electronics':
                console.log("Creating Electronics product with payload:", payload);
                productInstance = new Electronics(payload);
                break;
            // case 'Furniture':
            //     return new Furniture(payload);
            default:
                throw new BadRequestError(`ERROR: Product type ${type} is not supported`);
        }
        
        // Actually call the createProduct method to save to database
        return await productInstance.createProduct();
    }
}

class Product {
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes
    }) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    // create new product
    async createProduct() {
        return await product.create(this); 
    }
}


// Define subclasses for each product type
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes);
        if (!newClothing) throw new BadRequestError('ERROR: Failed to create clothing product');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('ERROR: Failed to create product');

        return newProduct;
    }
}

class Electronics extends Product {
    async createProduct() {
        const newElectronics = await electronics.create(this.product_attributes);
        if (!newElectronics) throw new BadRequestError('ERROR: Failed to create electronics product');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('ERROR: Failed to create product');

        return newProduct;
    }
}

module.exports = ProductFactory;
