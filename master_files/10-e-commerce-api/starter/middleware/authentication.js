const CustomError = require('../errors');
const {isValidToken} = require('../utils');


// you are checking the tokens here for signed token because we signed them with JWT secret
const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token) {
        console.log('error, no token present.');
    } else {
        console.log('token present');
    }
    
    
    next();
}

module.exports = {
    authenticateUser
}