const getAllUsers = (req, res) => {
    res.send('getallusers');
};

// get single user
const getSingleUser = (req, res) => {
    res.send('getsingleuser')
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
