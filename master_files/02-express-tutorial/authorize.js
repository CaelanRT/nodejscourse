const authorize = (req, res, next) => {
    const {user} = req.query;

    // setting a user permission sent through the query string
    if (user === 'john') {
        req.user = {name: 'john', id: 3}
        next()
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = authorize;