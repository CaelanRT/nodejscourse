const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const CustomError = require('../errors');
const {createJWT} = require('../utils')



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

    const tokenUser = {
        name: user.name,
        userId: user._id,
        role: user.role
    }

    const token = createJWT({payload:tokenUser})
    
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token,{
        httpOnly:true,
        expires:new Date(Date.now() + oneDay)
    })
    res.status(StatusCodes.CREATED).json({user:tokenUser});
}

const login = async (req, res) =>{
    res.send('login')
}

const logout = async (req, res) =>{
    res.send('logout')
}



module.exports = {
    register,
    login,
    logout
}