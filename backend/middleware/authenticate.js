const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, req.app.get('secret'));
            next();
        } else {
            res.status(401).json({
                isSuccess: 'false',
                message: 'Authentication Failed'
            });
        }
    } catch {
        res.status(401).json({ message: 'Authenticatino Failed!' });
    }
}