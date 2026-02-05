const {createJWT, isValidToken, attachCookiesToResponse} = require('./jwt')
const {createTokenUser} = require('./createTokenUser')

// you are directly accessing these two functions so when you import this index.js, you can use . notation
module.exports = {
    createJWT,isValidToken, attachCookiesToResponse, createTokenUser
}