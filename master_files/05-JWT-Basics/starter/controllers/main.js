// check username, password in post(login) request
// if exist, create new JWT - if not, send error
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const {username, password} = req.body;
    
    if (!username || !password) {
        throw new CustomAPIError('please provide email and password', 400);
    }

    console.log(username, password);
    
    
    res.send('Fake Login/Register/Signup')
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({msg:`Hello, John Doe`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}`});
}

module.exports = {
    login, dashboard
}
