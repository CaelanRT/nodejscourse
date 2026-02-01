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

// we're returning a function here so that we can invoke it as a function in the routes. we do this so that we can have many different types of roles in the app
// essentially gives you more freedom as to who can access the route, instead of just saying admin only
const authorizePermissions = (...roles) => {
    // need to return a callback. check if the roles passed in is the same as what is on the user object
    // we have coded admin in the route, so if user doesn't have admin in their role then throw error
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError('Unauthorized to access this route.');
        }
        next();
    }
    
}

// IM KEEPING THIS HERE FOR LEARNING PURPOSES BUT WE REFACTORED
// since this is the 2nd middleware, we know its an authenticated user and we have access to req.user
// const authorizePermissions = (req, res, next) => {

//     // now we check whether the user is admin here!
//     if (req.user.role != 'admin') {
//         throw new CustomError.UnauthorizedError('Unauthorized to access this route.');
//     }


//     next();
    
// }

module.exports = {
    authenticateUser,
    authorizePermissions
}