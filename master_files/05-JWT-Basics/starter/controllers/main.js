// check username, password in post(login) request
// if exist, create new JWT - if not, send error
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require ('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const {username, password} = req.body;
    
    if (!username || !password) {
        throw new CustomAPIError('please provide email and password', 400);
    }

    // just for demo, noramlly provided by db!
    const id = new Date().getDate();

    //create new token
    //sending 3 things in the web token: 1 - pyaload, 2 - JWT secret, 3 - options
    // keep payloads small, better for speed and users
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'});

    
    
    res.status(200).json({msg:'user created', token});
}

const dashboard = async (req, res) => {

    console.log(req.user);
    

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}`});

}

module.exports = {
    login, dashboard
}
