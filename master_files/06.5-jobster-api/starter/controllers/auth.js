const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      email:user.email,
      lastName:user.lastName,
      location:user.location,
      name:user.name,
      token
    }
  });
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      email:user.email,
      lastName:user.lastName,
      location:user.location,
      name:user.name,
      token
    }
  });
}

const updateUser = async (req, res) => {
  const {email, name, lastName, location} = req.body;  

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Missing Fields')
  }

  // you use req.user to find things to do with the userId and you use req.body for the data
  // req.user is added after the user has been authenticated by looking at the JWT in the header
  const user = await User.findOne({_id:req.user.userId});
  
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  // you need to create a new token here because the name value changed is in the JWT so things will get messy
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email:user.email,
      lastName:user.lastName,
      location:user.location,
      name:user.name,
      token
    }
  });
  
  
}

module.exports = {
  register,
  login,
  updateUser,
}
