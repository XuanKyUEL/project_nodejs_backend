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
            case 'Furniture':
                console.log("Creating Furniture product with payload:", payload);
                return new Furniture(payload);
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
    async createProduct(product_id) {
        return await product.create({...this, _id: product_id});
    }
}


// Define subclasses for each product type
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newClothing) throw new BadRequestError('ERROR: Failed to create clothing product');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('ERROR: Failed to create product');

        return newProduct;
    }
}

class Electronics extends Product {
    async createProduct() {
        try {
            console.log("Creating Electronics with attributes:", this.product_attributes);
            console.log("Electronics shop:", this.product_shop);
            
            const electronicsData = {
                ...this.product_attributes,
                product_shop: this.product_shop
            };
            
            console.log("Final electronics data:", electronicsData);
            
            const newElectronics = await electronics.create(electronicsData);
            if (!newElectronics) throw new BadRequestError('ERROR: Failed to create electronics product');

            const newProduct = await super.createProduct();
            if (!newProduct) throw new BadRequestError('ERROR: Failed to create product');

            return newProduct;
        } catch (error) {
            console.error("Electronics creation error:", error);
            throw new BadRequestError(`ERROR: Electronics creation failed - ${error.message}`);
        }
    }
}

class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newFurniture) throw new BadRequestError('ERROR: Failed to create furniture product');
        
        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('ERROR: Failed to create product');
        return newProduct;
    }
}

module.exports = ProductFactory;
