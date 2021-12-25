const express = require('express');
const route = express.Router();
const controller = require('../controllers/Admin');
route.post('/', controller.create);

module.exports = route;