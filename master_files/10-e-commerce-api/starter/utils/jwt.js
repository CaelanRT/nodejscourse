const jwt = require('jsonwebtoken');

const createJWT = ({payload}) =>{
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_LIFETIME
    })

    return token;
}

const isValidToken = ({token})=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}

// if things go wrong with cookies, its this function you'll have to redo
const attachCookiesToResponse = (res, tokenUser) =>{
    const token = createJWT({payload:tokenUser});

    const oneDay = 1000 * 60 * 60 * 24;

    // setting up cookie, secure flag would evaluate the false and thereby use http in testing
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV === 'production',
        signed:true
    })

    return res;
    
}

module.exports = {
    createJWT,
    isValidToken,
    attachCookiesToResponse
}