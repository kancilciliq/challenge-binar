const jwt = require('jsonwebtoken')

function auth(req,res,next) {
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send('accses denied')
    }

    try {
        const verif = jwt.verify(token, process.env.token)
        req.user = verif

        next()
    } catch (error) {
        res.status(400).send('token invalid')
    }
};

module.exports = auth