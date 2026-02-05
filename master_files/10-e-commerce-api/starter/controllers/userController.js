const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const CustomError = require('../errors/index');
const { createTokenUser, attachCookiesToResponse } = require('../utils');

const getAllUsers = async (req, res) => {

    console.log(req.user);
    
    // how to remove password
    const users = await User.find({role:'user'}).select('-password');

    res.status(StatusCodes.OK).json({users});
};

// get single user
const getSingleUser = async (req, res) => {

    const user = await User.findOne({_id:req.params.id}).select('-password');

    if (!user) {
        throw new CustomError.NotFoundError(`No user with id ${id}`);
    }

    res.status(StatusCodes.OK).json({user});
}

// this route just uses the authenticate user middleware and gets the req.user
// used for when you load the page and want to check if there is an active cookie still
const showCurrentUser = (req, res) => {
    res.status(StatusCodes.OK).json({user:req.user});
}
// need to reattach the cookie because you're changing values on the frontend!
const updateUser = async (req,res) =>{
    const {email, name} = req.body;

    if (!email || !name) {
        throw new CustomError.BadRequestError('Missing email or name. Please input both values.'); 
    }

    const user = await User.findOneAndUpdate({_id:req.user.userId}, {email, name}, {new:true, runValidators:true});

    const tokenUser = createTokenUser(user);

    res = attachCookiesToResponse(res, tokenUser);

    res.status(StatusCodes.OK).json({user:tokenUser, msg:"Updated Successfully"});
}

// update user password
const updateUserPassword = async (req,res) =>{
    const {password, newPassword} = req.body;

    if (!password || !newPassword) {
        throw new CustomError.BadRequestError('Missing passwords. Please enter the old and new password.');
    }

    const id = req.user.userId;

    const user = await User.findOne({_id:id});

    if (!user) {
        throw new CustomError.NotFoundError('No user found.')
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
        throw new CustomError.UnauthenticatedError('Invalid password.');
    }

    user.password = newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({msg:'Password updated successfully!'});
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
