const Users = require('../models/Users');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
class User {
    async create(req, res, next) {
        const levelParent = req.user.level;
        console.log(levelParent);
        switch (levelParent) {
            case 'A1':
                req.body.level = 'A2';
                break;
            case 'A2':
                req.body.level = 'A3';
                break;
            case 'A3':
                req.body.level = 'B1';
                break;
            case 'B1':
                req.body.level = 'B2';
                break;
            default:
                return res.json({
                    result: 'không thể cấp quyền cho đệ tử vì không có đệ tử nào hết'
                });
        };
        try {
            req.body.password = md5(req.body.password);
            if (req.user.username == 'admin') req.user.username = '';
            req.body.username = req.user.username + req.body.username;
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

    async profile(req, res, next) {
        await Users.findById(req.authorization._id)
            .then(user => {
                if (!user) {
                    res.json({
                        result: 'không tồn tại id này!!!'
                    });
                }
                else {
                    res.json({
                        result: 'success',
                        user: user
                    });
                }
            });
    }

    async change(req, res, next) {

        console.log(req.body);
        try {
            const _id = req.authorization._id;
            const password = md5(req.body.password);
            const newPassword = md5(req.body.newPassword);

            const check = await Users.findOneAndUpdate({ _id, password }, { password: newPassword });
            // .then(() => {
            //     res.json({
            //         result: 'change success'
            //     });
            // })
            check ? res.json({ result: 'change success' }) : res.json({ result: 'sai mật khẩu' });
        }
        catch (err) {
            // const _id = req.user._id;
            // const password = md5(req.body.password);
            // const newPassword = md5(req.body.newPassword);
            res.json({
                result: 'changePassword fail',
                // 
            })
        }
    }

    async repair(req, res, next) {

        console.log(req.body);
        try {
            const _id = req.params.id;

            const check = await Users.findOneAndUpdate({ _id }, { ...req.body });
            // .then(() => {
            //     res.json({
            //         result: 'change success'
            //     });
            // })
            check ? res.json({ result: 'success' }) : res.json({ result: 'fail' });
        }
        catch (err) {
            // const _id = req.user._id;
            // const password = md5(req.body.password);
            // const newPassword = md5(req.body.newPassword);
            res.json({
                result: 'fail',
                // 
            })
        }
    }

    async inferior(req, res, next) {
        try {
            var nextLevel = '';
            switch (req.user.level) {
                case 'A1':
                    nextLevel = 'A2';
                    break;
                case 'A2':
                    nextLevel = 'A3';
                    break;
                case 'A3':
                    nextLevel = 'B1';
                    break;
                case 'B1':
                    nextLevel = 'B2';
                    break;
                default:
                    break;
            }
            console.log(req.user);
            if (req.user.username == 'admin') req.user.username = '';
            const regex = new RegExp('^' + req.user.username);
            await Users.find({ username: regex, level: nextLevel })
                .then(user => {
                    if (!user) {
                        res.json({
                            result: 'không tồn tại id này!!!'
                        });
                    }
                    else {
                        res.json({
                            result: 'success',
                            user: user
                        });
                    }
                });
        } catch (error) {
            res.json({
                result: 'khong lay duoc de tu dau lam lai di!!!'
            })
        }
    }

    async turnOffState(req, res, next) {
        console.log(req.params.id);
        try {
            // const regex = new RegExp('^' + req.params.id + '.+');
            const regex = new RegExp('^' + req.params.id);
            await Users.updateMany({ username: regex }, { isToggle: false })
                .then(users => {
                    console.log(users);
                    if (!users) {
                        res.json({
                            result: 'không tồn tại id này!!!'
                        });
                    }
                    else {
                        res.json({
                            result: 'success',
                            user: users
                        });
                    }
                });

        } catch (error) {
            res.json({
                result: 'khong lay duoc de tu dau lam lai di!!!'
            })
        }
    }

    async turnOnState(req, res, next) {
        try {
            // const regex = new RegExp('^' + req.params.id + '.+');
            const regex = new RegExp('^' + req.params.id);
            await Users.updateMany({ username: regex }, { isToggle: true })
                .then(users => {
                    if (!users) {
                        res.json({
                            result: 'không tồn tại id này!!!'
                        });
                    }
                    else {
                        res.json({
                            result: 'success',
                            user: users
                        });
                    }
                });
        } catch (error) {
            res.json({
                result: 'khong lay duoc de tu dau lam lai di!!!'
            })
        }
    }

    async submit(req, res, next) {
        console.log(req.params.id);
        try {
            // const regex = new RegExp('^' + req.params.id + '.+');
            await Users.findOneAndUpdate({ username: req.params.id }, { isToggle: false })
                .then(user => {
                    console.log(user);
                    if (!user) {
                        res.json({
                            result: 'không tồn tại id này!!!'
                        });
                    }
                    else {
                        res.json({
                            result: 'success',
                            user: user
                        });
                    }
                });

        } catch (error) {
            res.json({
                result: 'khong lay duoc de tu dau lam lai di!!!'
            })
        }
    }

    async remove(req, res, next) {
        console.log(req.params.id);
        try {
            // const regex = new RegExp('^' + req.params.id + '.+');
            await Users.findOneAndRemove({ username: req.params.id })
                .then(user => {
                    console.log(user);
                    if (!user) {
                        res.json({
                            result: 'không tồn tại id này!!!'
                        });
                    }
                    else {
                        res.json({
                            result: 'success',
                            user: user
                        });
                    }
                });

        } catch (error) {
            res.json({
                result: 'khong lay duoc de tu dau lam lai di!!!'
            })
        }
    }
}

module.exports = new User();