const express = require('express');
const route = express.Router();
const middleware = require('../middlewares/verifyToken');
route.get('/', (req, res, next) => {
    res.json({
        result: 'verify token success',
        authorization: req.authorization,
        user: req.user,
        level: req.user.level
    });
});

module.exports = route;