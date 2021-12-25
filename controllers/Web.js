const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const md5 = require('md5');
class Web {
    async login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        const level = req.body.level;
        await Users.findOne({ username: username, level: level })
            .then((user) => {
                if (!user) {
                    res.json({
                        result: 'login fail',
                    });
                }
                else {
                    if (md5(password) === user.password) {
                        res.json({
                            result: 'login success',
                            token: jwt.sign({ _id: user._id }, process.env.SECRET),
                            user
                        });
                    }
                    else {
                        res.json({
                            result: 'mat khau sai'
                        })
                    }
                }
                next();
            })

    }
}

module.exports = new Web();