const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({price:{$gte:30}})
    .sort('price')
    .select('name price');

    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;

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

    // regex to convert the human readable filters to the mongoose ones
    // NUMERIC FILTERING - INTERESTING LOGIC
    if (numericFilters) {

        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }

        const regEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = numericFilters.replace(regEx, (match)=>
            `-${operatorMap[match]}-`
        )

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-');

            if(options.includes(field)) {
                queryObject[field] = {[operator]:Number(value)};
            }
        })

        // console.log(filters);
        
    }

    // you are removing await here because you are no longer trying to get the promise from the find, you are chaining the sort onto the object if it exists so you want to convert it to a promise after that
    // this right away returns the documents
    // sort

    console.log(queryObject);
    
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

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;

    res.status(200).json({products, nbHits: products.length});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}