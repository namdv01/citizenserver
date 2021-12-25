const Users = require('../models/Users');
const md5 = require('md5');
class Admin {
    async create(req, res, next) {
        // const username = req.body.username;
        // const password = md5(req.body.password);
        // console.log(req.authorization);
        try {
            req.body.password = md5(req.body.password);
            req.body.level = 'A1';
            const user = new Users(req.body);
            await user.save();
            res.status(201).json({
                result: 'success',
                user
            });
        }
        catch (err) {
            res.json({
                result: 'fail'
            });
        }
    }
}

module.exports = new Admin();