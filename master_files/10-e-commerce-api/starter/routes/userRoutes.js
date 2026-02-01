const express = require('express')
const router = express.Router();

const {authenticateUser, authorizePermissions} = require('../middleware/authentication');

const { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController');

// placement of middleware is very important, first authenticate the user then check admin
router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;

