const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = (req.body.token || req.query.token || req.headers['x-access-token']).split(' ')[1];
        if (token) {
            const decodedToken = jwt.verify(token, req.app.get('secret'));
            req.userData = decodedToken;
            next();
        } else {
            res.status(401).json({
                isSuccess: 'false',
                message: 'Unauthorized access'
            });
        }
    } catch {
        res.status(401).json({ message: 'Unauthorized access' });
    }
}