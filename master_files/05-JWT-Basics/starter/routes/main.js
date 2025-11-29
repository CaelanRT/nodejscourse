const express = require('express');
const router = express.Router();

const {login, dashboard} = require('../controllers/main');

const authMiddleware = require ('../middleware/auth')

// you add the middleware auth which has next() called that then passes to the dashboard endpoint
//the dashboard endpoint is protected while the login one is not
router.route('/dashboard').get(authMiddleware,dashboard);
router.route('/login').post(login);

module.exports = router;