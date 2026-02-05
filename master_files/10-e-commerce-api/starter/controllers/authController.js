const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const CustomError = require('../errors');
const {attachCookiesToResponse, createTokenUser} = require('../utils')


// create a user works, need to finish the rest of the vid
const register = async (req, res) =>{
    const {name, email, password} = req.body;

    const tempEmail = await User.findOne({email});

    if (tempEmail) {
        throw new CustomError.BadRequestError('Email in use, please enter a valid email.');
    }

    // first registered user is an admin
    const isFirstAccount = await User.countDocuments() === 0;
    const role = isFirstAccount? 'admin':'user';

    const user = await User.create({name, email, password, role});

    const tokenUser = createTokenUser(user);

    // just going to delete the code here and call the function!

    res = attachCookiesToResponse(res, tokenUser);
    
    res.status(StatusCodes.CREATED).json({user:tokenUser});
}

const login = async (req, res) =>{
    const {email, password} = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError('Missing credentials. Please input an email and password.');
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid email');
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
        throw new CustomError.UnauthenticatedError('Invalid password.');
    }

    const tokenUser = createTokenUser(user);

    res = attachCookiesToResponse(res, tokenUser);

    res.status(StatusCodes.OK).json({user:tokenUser});
}

const logout = async (req, res) =>{
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now())
    });

    res.status(StatusCodes.OK).json({msg:'User is logged out.'});
}



module.exports = {
    register,
    login,
    logout
}