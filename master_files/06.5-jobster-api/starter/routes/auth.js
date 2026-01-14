const express = require('express')
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/testUser');

//rate limit
const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max:10,
    msg:'Too many requests from this IP, please try again after 15 minutes.', 
})

const router = express.Router()
const { register, login, updateUser } = require('../controllers/auth')
router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authenticateUser,testUser, updateUser);

module.exports = router
