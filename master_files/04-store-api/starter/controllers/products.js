const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({}).sort('-name price');
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res) => {
    const {featured, company, name} = req.query;

    // empty object, but you're passing in things into the query params and then just checking if they exist in the query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = {$regex:name, $options:'i'};
    }


    const products = await Product.find(queryObject);
    console.log(queryObject);
    
    res.status(200).json({products, nbHits: products.length});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}