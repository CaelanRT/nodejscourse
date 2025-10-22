const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(10)
    .skip(1);

    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;

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

    // you are removing await here because you are no longer trying to get the promise from the find, you are chaining the sort onto the object if it exists so you want to convert it to a promise after that
    // this right away returns the documents
    // sort
    let result = Product.find(queryObject);
    
    if (sort) {
        // this splits the list on the comma and joins it with a space
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
        
    } else {
        result = result.sort('createdAt');
    }

    // this is used to select the fields you actually want to view in your returned json
    // select
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }


    const products = await result;

    res.status(200).json({products, nbHits: products.length});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}