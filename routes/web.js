const express = require('express');
const route = express.Router();
const controller = require('../controllers/Web');
route.post('/login', controller.login);

module.exports = route;