const jwt = require('jsonwebtoken');
const protect = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        console.log(req.user.role);
        res.status(403).send('Access denied');
    }
};

module.exports = { protect, isAdmin };