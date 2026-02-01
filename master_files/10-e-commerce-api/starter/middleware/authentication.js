const CustomError = require('../errors');
const {isValidToken} = require('../utils');


// you are checking the tokens here for signed token because we signed them with JWT secret
// this authenticates if a user exists or not!
const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try {
        const payload = isValidToken({token});
        req.user = {
            name: payload.name,
            userId: payload.userId,
            role: payload.role
        }
        next();
        
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    

}

module.exports = {
    authenticateUser
}