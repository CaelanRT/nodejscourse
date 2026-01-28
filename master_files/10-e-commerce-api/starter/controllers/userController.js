const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const {NotFoundError} = require('../errors/index');

const getAllUsers = async (req, res) => {

    // how to remove password
    const users = await User.find({role:'user'}).select('-password');

    res.status(StatusCodes.OK).json({users});
};

// get single user
const getSingleUser = async (req, res) => {

    const user = await User.findOne({_id:req.params.id}).select('-password');

    if (!user) {
        throw new NotFoundError(`No user with id ${id}`);
    }

    res.status(StatusCodes.OK).json({user});
}

// show current user
const showCurrentUser = (req, res) => {
    res.send('showcurrentuser')
}
// update user
const updateUser = (req,res) =>{
    res.send('update user')
}

// update user password
const updateUserPassword = (req,res) =>{
    res.send('updateuserpassword')
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
