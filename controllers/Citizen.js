const Citizens = require('../models/Citizens');

class Citizen {
    async create(req, res, next) {
        const level = req.user.level;
        switch (level) {
            case 'B1':
            case 'B2':
                req.body.idAdress = req.user.username;
                const citizen = new Citizens(req.body);
                await citizen.save();
                res.json({
                    result: "success",
                    citizen
                });
                break;
            default:
                res.json({
                    result: "Không có quyền "
                });
                break;
        }
    }

    async get(req, res, next) {
        const id = req.params.id;
        try {
            await Citizens.findById(id)
                .then(user => {
                    if (user) {
                        res.json({
                            result: 'lay citizen thanh cong',
                            user
                        })
                    }
                    else {
                        res.json({
                            result: 'khong ton tai nguoi nay'
                        })
                    }
                })
        } catch (error) {
            res.json({
                result: 'that bai',
            })
        }
    }

    async delete(req, res, next) {
        const level = req.user.level;
        console.log(req.params.id);
        switch (level) {
            case 'B1':
            case 'B2':
                try {
                    await Citizens.findOneAndRemove({ _id: req.params.id })
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
                        result: 'xoa khong thanh cong'
                    })
                }

                break;
            default:
                res.json({
                    result: 'khong co quyen xoa'
                });
        }
    }

    async update(req, res, next) {
        const level = req.user.level;
        console.log(req.body);
        switch (level) {
            case 'B1':
            case 'B2':
                try {
                    await Citizens.findOneAndUpdate({ _id: req.params.id }, req.body)
                        .then(user => {
                            res.json({
                                result: 'update thanh cong',
                                user
                            })
                        })

                } catch (error) {
                    res.json({
                        result: 'xoa khong thanh cong'
                    })
                }

                break;
            default:
                res.json({
                    result: 'khong co quyen xoa'
                });
        }
    }

    async searchByIdAdress(req, res, next) {
        if (req.params.id == 'admin') req.params.id = '';
        const regex = new RegExp('^' + req.params.id);
        try {
            await Citizens.find({ idAdress: regex })
                .then(users => {
                    if (!users) {
                        res.json({
                            result: 'tim kiem khong thanh cong'
                        })
                    }
                    else {
                        res.json({
                            result: 'tim kiem thanh cong',
                            users
                        })
                    }
                })
        }
        catch (err) {
            res.json({
                result: 'loi tim kiem'
            })
        }
    }

    async search(req, res, next) {
        if (req.user.username == 'admin') req.user.username = '';
        const regex = new RegExp('^' + req.user.username);
        const key = new RegExp(req.params.id);
        // const key = req.params.id;
        // console.log(key);
        try {
            await Citizens.find({ $or: [{ idCard: key }, { fullname: key }], idAdress: regex })
                .then(users => {
                    if (users) {
                        res.json({
                            result: 'success',
                            users
                        })
                    }
                    else {
                        res.json({
                            result: 'khong ton tai nguoi nay'
                        })
                    }
                })
        } catch (error) {
            res.json({
                result: 'that bai',
            })
        }
    }
}

module.exports = new Citizen();