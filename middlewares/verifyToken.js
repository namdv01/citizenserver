const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
async function verifyToken(req, res, next) {
    const headers = req.headers['authorization'];
    if (typeof headers !== 'underfined') {
        try {
            const check = jwt.verify(headers.split(' ')[1], process.env.SECRET);
            if (check) {
                await Users.findById(check._id)
                    .then(user => {
                        if (user) {
                            req.authorization = check;
                            req.user = user;
                        }
                        else {
                            req.authorization = 'tồn tại token nhưng không tồn tại id';
                            req.user = user;
                        }
                    })
            }
            return next();
        }
        catch (err) {
            return res.json({
                result: 'token lỗi'
            });
        }
    }
}

module.exports = verifyToken;